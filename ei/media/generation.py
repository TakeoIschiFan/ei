"""Segment/init generation with ffmpeg."""

from __future__ import annotations

import logging
import os
import shutil
import tempfile
import threading
import time
from dataclasses import dataclass, field

from ei.media import ffmpeg as _ffmpeg
from ei.media import ffmpeg_recipes as _recipes
from ei.media.ffmpeg_recipes import TrimWindow
from ei.media.models import AssetInfo
from ei.media.mp4 import normalize_init_elst, read_mdhd_timescale, shift_tfdt_values
from ei.media.paths import audio_staging_dir, audio_target, video_target
from ei.media.quality import AUDIO_SEG_SECONDS

__all__ = [
    "GenError",
    "GenRequest",
    "AudioPassState",
    "audio_target",
    "video_target",
]

log = logging.getLogger(__name__)


class GenError(_ffmpeg.FfmpegError):
    pass


@dataclass(frozen=True)
class GenRequest:
    info: AssetInfo
    target_dir: str
    cmd_tail: list[str]
    index: int | None
    window: TrimWindow
    preseek: bool = True


@dataclass
class AudioPassState:
    done: bool = False
    ok: bool = False
    started: bool = False
    name: str = ""
    track: int = 0
    arep: str = ""
    lock: threading.Lock = field(default_factory=threading.Lock)


_audio_passes: dict[tuple[str, int, str], AudioPassState] = {}
_audio_passes_lock = threading.Lock()


def _run(cmd: list[str]) -> None:
    try:
        _ffmpeg.ffmpeg_checked(cmd)
    except _ffmpeg.FfmpegError as e:
        raise GenError(str(e)) from e


def _tmp_root(target_dir: str) -> str:
    asset_dir = os.path.dirname(os.path.dirname(target_dir.rstrip(os.sep)))
    d = os.path.join(asset_dir, ".tmp")
    os.makedirs(d, exist_ok=True)
    return d


def _finish(tmpdir: str, target_dir: str, index: int | None) -> None:
    os.makedirs(target_dir, exist_ok=True)
    if index is None:
        os.replace(
            os.path.join(tmpdir, "init.mp4"), os.path.join(target_dir, "init.mp4")
        )
        return
    init_dst = os.path.join(target_dir, "init.mp4")
    if not os.path.exists(init_dst):
        os.replace(os.path.join(tmpdir, "init.mp4"), init_dst)
    os.replace(
        os.path.join(tmpdir, "seg.m4s"), os.path.join(target_dir, f"{index:06d}.m4s")
    )


def _generate(req: GenRequest) -> None:
    tmpdir = tempfile.mkdtemp(prefix="gen-", dir=_tmp_root(req.target_dir))
    try:
        _run(
            _recipes.segment_cmd(
                req.info.path,
                req.window,
                req.cmd_tail,
                os.path.join(tmpdir, "manifest.mpd"),
                preseek=req.preseek,
            )
        )
        init_path = os.path.join(tmpdir, "init.mp4")
        if not _nonempty(init_path):
            raise GenError(
                f"ffmpeg produced empty init segment for {req.info.name} "
                f"(trim={req.window.trim} preseek={req.preseek})"
            )
        if req.index is not None:
            seg_path = os.path.join(tmpdir, "seg.m4s")
            if not _nonempty(seg_path):
                raise GenError(
                    f"ffmpeg produced empty media segment for {req.info.name} "
                    f"(trim={req.window.trim} preseek={req.preseek})"
                )
            with open(os.path.join(tmpdir, "init.mp4"), "rb") as f:
                ts = read_mdhd_timescale(f.read())
            with open(os.path.join(tmpdir, "seg.m4s"), "rb") as f:
                seg = bytearray(f.read())
            shift_tfdt_values(
                seg, max(0, round((req.window.trim + req.info.dts_shift) * ts))
            )
            with open(os.path.join(tmpdir, "seg.m4s"), "wb") as f:
                f.write(seg)
        _finish(tmpdir, req.target_dir, req.index)
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


def _transcode_size(info: AssetInfo, rep_id: str) -> tuple[int, int]:
    for h, bw in info.transcode_ladder:
        if f"{h}p" == rep_id:
            return h, bw
    raise GenError(f"unknown transcode rep {rep_id!r} for {info.name}")


def gen_video_segment(
    info: AssetInfo, rep_id: str, target_dir: str, i: int, nvenc: bool = False
) -> None:
    transcoded = rep_id != "direct"
    starts = info.boundaries if transcoded else info.kf_dts
    trim = starts[i]
    to_time = starts[i + 1] if i + 1 < len(starts) else None
    if transcoded:
        h, bw = _transcode_size(info, rep_id)
        tail = _recipes.video_transcode_tail(h, bw, trim, nvenc=nvenc)
    else:
        tail = _recipes.video_copy_tail(info.video.codec)
    _generate(
        GenRequest(
            info, target_dir, tail, i, TrimWindow(trim, to_time), preseek=transcoded
        )
    )


def gen_audio_segment(
    info: AssetInfo, track: int, target_dir: str, i: int, number: int | None = None
) -> None:
    tr = info.audios[track]
    _generate(
        GenRequest(
            info,
            target_dir,
            _recipes.audio_copy_tail(track, tr.codec),
            i if number is None else number,
            TrimWindow(tr.landings[i], tr.cuts[i]),
            preseek=False,
        )
    )


def gen_init(
    info: AssetInfo, spec: tuple, target_dir: str, nvenc: bool = False
) -> None:
    kind = spec[0]
    if kind == "v-direct":
        trim, tail = info.kf_dts[0], _recipes.video_copy_tail(info.video.codec)
        preseek = False
    elif kind == "v-transcode":
        trim = info.boundaries[0]
        tail = _recipes.video_transcode_tail(spec[1], spec[2], trim, nvenc=nvenc)
        preseek = True
    elif kind == "a-direct":
        tr = info.audios[spec[1]]
        trim, tail = tr.landings[0], _recipes.audio_copy_tail(spec[1], tr.codec)
        preseek = False
    else:
        tr = info.audios[spec[1]]
        trim, tail = tr.landings[0], _recipes.audio_aac_tail(spec[1])
        preseek = True
    _generate(
        GenRequest(
            info, target_dir, tail, None, TrimWindow(trim, trim + 0.5), preseek=preseek
        )
    )


def gen_vtt(info: AssetInfo, track: int, dest_path: str) -> None:
    tr = info.texts[track]
    tmpdir = os.path.join(os.path.dirname(dest_path), ".tmp")
    os.makedirs(tmpdir, exist_ok=True)
    tmp = os.path.join(tmpdir, f"text{track}.vtt.tmp")
    _run(_recipes.vtt_cmd(info.path, tr.ordinal, tmp))
    os.replace(tmp, dest_path)


def ensure_audio_pass(
    info: AssetInfo, track: int, arep: str, pass_dir: str
) -> AudioPassState:
    key = (info.name, track, arep)
    staging = audio_staging_dir(pass_dir)
    with _audio_passes_lock:
        st = _audio_passes.get(key)
        if (
            st is not None
            and st.done
            and not os.path.exists(os.path.join(staging, "manifest.mpd"))
        ):
            del _audio_passes[key]
            st = None
        if st is None:
            st = AudioPassState(name=info.name, track=track, arep=arep)
            _audio_passes[key] = st
        should_start = not st.started
        if should_start:
            st.started = True
    if should_start:
        threading.Thread(
            target=_run_audio_pass,
            args=(info, track, arep, pass_dir, st),
            daemon=True,
            name=f"audio-pass-{info.name}-{track}-{arep}",
        ).start()
    return st


def _run_audio_pass(
    info: AssetInfo, track: int, arep: str, pass_dir: str, st: AudioPassState
) -> None:
    staging = audio_staging_dir(pass_dir)
    os.makedirs(staging, exist_ok=True)
    manifest = os.path.join(staging, "manifest.mpd")
    try:
        with open(manifest, "w", encoding="utf-8") as f:
            f.write("")
        cmd = _recipes.audio_pass_cmd(
            info.path,
            track,
            arep,
            info.audios[track].codec,
            manifest,
            AUDIO_SEG_SECONDS,
        )
        p = _ffmpeg.ffmpeg_long(cmd)
        st.ok = p.returncode == 0
        if p.returncode != 0:
            log.warning("[audio-pass] %s %s: %s", info.name, arep, p.stderr[-500:])
    except Exception as e:  # noqa: BLE001
        log.warning("[audio-pass] %s %s: %s", info.name, arep, e)
    finally:
        st.done = True


def _nonempty(path: str) -> bool:
    try:
        return os.path.getsize(path) > 0
    except OSError:
        return False


def wait_audio_segment(
    staging: str, filename: str, st: AudioPassState, timeout: float = 120.0
) -> bool:
    from ei.media.paths import parse_seg_number

    path = os.path.join(staging, filename)
    n = parse_seg_number(filename)
    nxt = (
        os.path.join(staging, f"{n + 1:06d}.m4s")
        if n is not None
        else os.path.join(staging, "000001.m4s")
    )
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if (
            os.path.exists(path)
            and _nonempty(path)
            and (os.path.exists(nxt) or st.done)
        ):
            return True
        if st.done:
            return os.path.exists(path) and _nonempty(path)
        time.sleep(0.05)
    return os.path.exists(path) and _nonempty(path)


def finalize_audio_segment(
    staging: str, final_dir: str, filename: str, target_ticks: int | None
) -> None:
    os.makedirs(final_dir, exist_ok=True)
    src = os.path.join(staging, filename)
    dst = os.path.join(final_dir, filename)
    if target_ticks is None:
        os.replace(src, dst)
        normalize_aac_init(dst)
        return
    with open(src, "rb") as f:
        data = bytearray(f.read())
    shift_tfdt_values(data, target_ticks)
    tmp = dst + ".tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, dst)


def normalize_aac_init(path: str) -> bool:
    """Strip pass-generated edit lists from an aac192 init (see mp4 docs).

    Returns True when the file was rewritten. Never raises: stale or
    unreadable files are left for the caller to handle.
    """
    try:
        with open(path, "rb") as f:
            raw = f.read()
        fixed = normalize_init_elst(raw)
        if fixed == raw:
            return False
        tmp = path + ".tmp"
        with open(tmp, "wb") as f:
            f.write(fixed)
        os.replace(tmp, path)
        return True
    except OSError as e:
        log.warning("[audio-pass] normalize %s: %s", path, e)
        return False
