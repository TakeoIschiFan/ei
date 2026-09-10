"""DASH segment resolution + on-demand generation."""

from __future__ import annotations

import logging
import os
import re
from collections.abc import Callable
from dataclasses import dataclass
from typing import TYPE_CHECKING

import ei.media.state as _state
from ei.media import generation
from ei.media import meta as meta_mod
from ei.media import probe as probe_mod
from ei.media.models import audio_fallback_needed
from ei.media.paths import audio_target, parse_seg_number, seg_filename, video_target

log = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from ei.media.models import AssetInfo
    from ei.media.registry import Asset

Gen = Callable[[], None]

V_SEG = re.compile(
    r"^(?P<rep>direct|\d+p)/video/(?P<file>init\.mp4|(?P<num>\d{6})\.m4s)$"
)
A_SEG = re.compile(
    r"^audio(?P<track>\d+)/(?P<arep>direct|aac192)/"
    r"(?P<file>init\.mp4|(?P<num>\d{6})\.m4s)$"
)
TEXT_SEG = re.compile(r"^text(?P<track>\d+)\.vtt$")


@dataclass(frozen=True)
class SegmentJob:
    target: str
    gen: Gen


@dataclass(frozen=True)
class RepInitJob:
    key: str
    spec: tuple
    media_type: str
    rid: str
    track: int | None


def _nvenc() -> bool:
    return _state.ctx().video_encoder == "h264_nvenc"


def _transcode_on() -> bool:
    return _state.ctx().transcode


def resolve_job(asset: Asset, rel: str) -> SegmentJob | None:
    return (
        _resolve_video(asset, rel)
        or _resolve_audio(asset, rel)
        or _resolve_text(asset, rel)
    )


def _video_spec(info: AssetInfo, rep: str) -> tuple[tuple, int]:
    if rep == "direct":
        return ("v-direct",), len(info.boundaries)
    for h, bw in info.transcode_ladder:
        if f"{h}p" == rep:
            return ("v-transcode", h, bw), len(info.boundaries)
    raise KeyError(rep)


def _resolve_video(asset: Asset, rel: str) -> SegmentJob | None:
    m = V_SEG.match(rel)
    if not m or (m["rep"] != "direct" and not _transcode_on()):
        return None
    info = asset.info
    try:
        spec, n = _video_spec(info, m["rep"])
    except KeyError:
        return None
    tdir = video_target(_state.cache_dir(), info.name, m["rep"])
    if m["file"] == "init.mp4":
        rep = m["rep"]
        return SegmentJob(
            os.path.join(tdir, "init.mp4"),
            lambda: generation.gen_init(info, spec, tdir, nvenc=_nvenc()),
        )
    i = int(m["num"])
    if not 0 <= i < n:
        return None
    rep = m["rep"]
    return SegmentJob(
        os.path.join(tdir, seg_filename(i)),
        lambda i=i: generation.gen_video_segment(info, rep, tdir, i, nvenc=_nvenc()),
    )


def _resolve_audio(asset: Asset, rel: str) -> SegmentJob | None:
    m = A_SEG.match(rel)
    if not m:
        return None
    info = asset.info
    j, arep = int(m["track"]), m["arep"]
    if j >= len(info.audios):
        return None
    if arep != "direct" and not audio_fallback_needed(
        info.audios[j].codec, _transcode_on()
    ):
        return None
    tdir = audio_target(_state.cache_dir(), info.name, j, arep)
    if m["file"] == "init.mp4":
        if arep == "aac192":
            return _aac_pass_job(asset, j, tdir, "init.mp4")
        spec = ("a-direct", j)
        return SegmentJob(
            os.path.join(tdir, "init.mp4"),
            lambda: generation.gen_init(info, spec, tdir),
        )
    num = parse_seg_number(m["file"])
    if num is None:
        return None
    if arep == "aac192":
        if num < 1:
            return None
        return _aac_pass_job(asset, j, tdir, f"{num:06d}.m4s")
    if not 1 <= num <= len(info.audios[j].landings):
        return None
    return SegmentJob(
        os.path.join(tdir, f"{num:06d}.m4s"),
        lambda num=num: generation.gen_audio_segment(
            info, j, tdir, num - 1, number=num
        ),
    )


def _resolve_text(asset: Asset, rel: str) -> SegmentJob | None:
    m = TEXT_SEG.match(rel)
    if not m:
        return None
    info = asset.info
    j = int(m["track"])
    if j >= len(info.texts):
        return None
    dest = os.path.join(_state.cache_dir(), info.name, rel)
    return SegmentJob(dest, lambda: generation.gen_vtt(info, j, dest))


def _aac_pass_job(asset: Asset, j: int, pass_dir: str, filename: str) -> SegmentJob:
    info = asset.info
    staging = pass_dir + ".staging"
    tr = info.audios[j]
    st = generation.ensure_audio_pass(info, j, "aac192", pass_dir)
    target = os.path.join(pass_dir, filename)

    def gen():
        if filename == "init.mp4":
            if not generation.wait_audio_segment(staging, filename, st):
                raise generation.GenError("audio pass did not produce init.mp4")
            generation.finalize_audio_segment(staging, pass_dir, filename, None)
            return
        k = int(filename[:6])
        target_ticks = max(
            0, round((tr.landings[k - 1] + info.dts_shift) * tr.sample_rate) - 1024
        )
        if not generation.wait_audio_segment(staging, filename, st):
            raise generation.GenError(
                f"audio pass did not produce {filename} in time "
                f"(done={st.done} ok={st.ok})"
            )
        generation.finalize_audio_segment(staging, pass_dir, filename, target_ticks)

    return SegmentJob(target, gen)


def _fresh(target: str) -> bool:
    if os.path.exists(target):
        if target.endswith(".m4s"):
            from ei.media.cache import touch_seg

            touch_seg(target)
        return True
    return False


def ensure_seg_file(asset: Asset, rel: str) -> str | None:
    job = resolve_job(asset, rel)
    if job is None:
        return None
    if _fresh(job.target):
        _heal_aac_init(rel, job.target)
        return job.target
    with asset.lock_for(job.target):
        if _fresh(job.target):
            _heal_aac_init(rel, job.target)
            return job.target
        log.info("[gen] %s/%s", asset.info.name, rel)
        job.gen()
        if not os.path.exists(job.target):
            raise generation.GenError(f"generation did not produce {rel}")
        _heal_aac_init(rel, job.target)
        if job.target.endswith(".m4s"):
            reg = _state.ctx().registry
            reg.cache_limiter.maybe_enforce(reg.cache_dir, reg.max_cache_bytes)
        return job.target


def _heal_aac_init(rel: str, target: str) -> None:
    # Inits generated before the elst normalization need a one-time,
    # idempotent rewrite on serve (fresh inits are normalized at finalize).
    m = A_SEG.match(rel)
    if m and m["arep"] == "aac192" and m["file"] == "init.mp4":
        generation.normalize_aac_init(target)


def _rep_init_jobs(info: AssetInfo) -> list[RepInitJob]:
    jobs = [RepInitJob("direct", ("v-direct",), "video", "direct", None)]
    for h, bw in info.transcode_ladder:
        jobs.append(RepInitJob(f"{h}p", ("v-transcode", h, bw), "video", f"{h}p", None))
    for j in range(len(info.audios)):
        jobs.append(
            RepInitJob(f"audio{j}-direct", ("a-direct", j), "audio", f"audio{j}", j)
        )
    return jobs


def ensure_rep_metadata(asset: Asset) -> None:
    info = asset.info
    cdir = _state.cache_dir()
    changed = False
    for job in _rep_init_jobs(info):
        if job.key in info.rep_ts:
            continue
        tdir = (
            video_target(cdir, info.name, job.rid)
            if job.media_type == "video"
            else audio_target(cdir, info.name, job.track, "direct")
        )
        init = os.path.join(tdir, "init.mp4")
        if not os.path.exists(init):
            with asset.lock_for(init):
                if not os.path.exists(init):
                    log.info("[gen] %s: init for %s", info.name, job.key)
                    generation.gen_init(info, job.spec, tdir, nvenc=_nvenc())
        try:
            ts = probe_mod.probe_track_timescale(init, job.media_type)
        except RuntimeError as e:
            raise generation.GenError(f"cannot probe init for {job.key}: {e}") from e
        if ts:
            info.rep_ts[job.key] = ts
            changed = True
    for j in range(len(info.audios)):
        if f"audio{j}-aac192" not in info.rep_ts:
            info.rep_ts[f"audio{j}-aac192"] = info.audios[j].sample_rate
            changed = True
    if changed:
        meta_mod.save_info(cdir, info)


def count_m4s(d: str) -> int:
    try:
        return sum(1 for f in os.listdir(d) if f.endswith(".m4s"))
    except OSError:
        return 0
