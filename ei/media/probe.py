"""Source inspection: two ffprobe passes per asset (see models.py, meta.py)."""

from __future__ import annotations

import bisect
import csv
import io
import logging
import os

from ei.media import ffmpeg as _ffmpeg
from ei.media.models import (
    AssetInfo,
    AudioTrack,
    TextTrack,
    VideoTrack,
)
from ei.media.quality import AAC_BITRATE, AUDIO_SEG_SECONDS, TRANSCODE_LADDER

log = logging.getLogger(__name__)

TEXT_CODECS = frozenset({"ass", "ssa", "subrip", "srt", "mov_text", "webvtt", "text"})

# ffprobe codec_name -> MPD/MSE codec string. Not an accept-list: unknown
# codecs fall through as-is (direct copy still works if the player copes).
# The profile/level suffixes deliberately over-claim (High@L4.0 etc.):
# players gate on capability, so over-claiming plays while under-claiming
# would refuse.
VIDEO_CODEC_STRINGS = {
    "h264": "avc1.640028",
    "hevc": "hvc1.1.6.L120.90",
    "av1": "av01.0.08M.08",
    "vp9": "vp09.00.10.08",
}
AUDIO_CODEC_STRINGS = {
    "aac": "mp4a.40.2",
    "eac3": "ec-3",
    "ac3": "ac-3",
    "mp3": "mp4a.6B",
}

# Keyframe timeline tolerances.
KEYFRAME_DEDUPE_SEC = 0.05
KEYFRAME_START_TOL_SEC = 0.05
KEYFRAME_END_TOL_SEC = 0.05
KEYFRAME_EARLY_TOL_SEC = 0.001

# Grid edge: ignore a trailing sliver shorter than this.
AUDIO_TAIL_TOL_SEC = 0.05


def _ffprobe_json(args: list[str], src: str) -> dict:
    # Translated: the HTTP layer turns RuntimeError into a 500.
    try:
        return _ffmpeg.ffprobe_json(args, src)
    except _ffmpeg.FfmpegError as e:
        raise RuntimeError(str(e)) from e


def _float(value, default: float | None = None) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


Packet = tuple[float | None, float | None, bool]  # (pts, dts, keyframe)


def _video_timeline(
    pkts: dict[int, list[Packet]], index: int, vstart: float, vend: float
) -> tuple[list[float], list[float]]:
    kpts, kdts = [], []
    for pts, dts, kf in pkts.get(index, []):
        if kf and pts is not None and pts >= vstart - KEYFRAME_EARLY_TOL_SEC:
            kpts.append(pts)
            kdts.append(dts if dts is not None else pts)
    boundaries, kf_dts = [], []
    for pts, dts in zip(kpts, kdts, strict=False):
        if boundaries and pts - boundaries[-1] < KEYFRAME_DEDUPE_SEC:  # dedupe
            continue
        boundaries.append(pts)
        kf_dts.append(dts)
    if not boundaries:
        boundaries, kf_dts = [vstart], [vstart]
    elif boundaries[0] > vstart + KEYFRAME_START_TOL_SEC:
        # stream does not start on a keyframe
        boundaries.insert(0, vstart)
        kf_dts.insert(0, vstart)
    while len(boundaries) > 1 and boundaries[-1] > vend - KEYFRAME_END_TOL_SEC:
        boundaries.pop()  # trailing keyframe too close to EOF: merge
        kf_dts.pop()
    return boundaries, kf_dts


def _audio_landings(apts: list[float], aend: float) -> list[float]:
    # Nominal ~4 s grid snapped to real packet boundaries (not video
    # keyframes: short-GOP sources would otherwise give sub-second audio
    # segments). landings holds the exact packet pts each segment starts at.
    landings: list[float] = []
    t = apts[0]
    while t < aend - AUDIO_TAIL_TOL_SEC:
        k = bisect.bisect_left(apts, t - 1e-9)  # matches the muxer's cut rule exactly
        if k >= len(apts):
            break
        landings.append(apts[k])
        t += AUDIO_SEG_SECONDS
    return landings


def _audio_tracks(
    asrcs: list[dict], pkts: dict[int, list[Packet]], fmt_dur: float
) -> list[AudioTrack]:
    audios: list[AudioTrack] = []
    for a in asrcs:
        astart = _float(a.get("start_time"), 0.0) or 0.0
        aend = astart + (_float(a.get("duration")) or max(0.0, fmt_dur - astart))
        apts = sorted(p for p, _, _ in pkts.get(a["index"], []) if p is not None)
        if not apts:
            continue
        landings = _audio_landings(apts, aend)
        if not landings:
            continue
        cuts: list[float | None] = landings[1:] + [None]
        audios.append(
            AudioTrack(
                stream_index=a["index"],
                codec=a.get("codec_name", "?"),
                codec_str=AUDIO_CODEC_STRINGS.get(
                    a.get("codec_name"), a.get("codec_name", "?")
                ),
                lang=(a.get("tags") or {}).get("language", "und"),
                sample_rate=int(a.get("sample_rate", 48_000)),
                channels=int(a.get("channels", 2)),
                start=astart,
                end=aend,
                bitrate=int(_float(a.get("bit_rate"), 0) or 0),
                landings=landings,
                cuts=cuts,
            )
        )
    return audios


def _text_tracks(tsrcs: list[dict]) -> list[TextTrack]:
    texts: list[TextTrack] = []
    for ordinal, s in enumerate(tsrcs):
        if s.get("codec_name") not in TEXT_CODECS:
            continue
        tags = s.get("tags") or {}
        disp = s.get("disposition") or {}
        texts.append(
            TextTrack(
                ordinal=ordinal,
                stream_index=s["index"],
                codec=s.get("codec_name", "?"),
                lang=tags.get("language", "und"),
                title=tags.get("title", ""),
                forced=bool(disp.get("forced")),
                sdh=bool(disp.get("hearing_impaired")),
            )
        )
    return texts


def _video_track(vsrc: dict, vstart: float, vend: float) -> VideoTrack:
    vbitrate = int(_float(vsrc.get("bit_rate"), 0) or 0)
    tb = _timescale_of(vsrc.get("time_base"), 90_000)
    return VideoTrack(
        codec=vsrc.get("codec_name", "?"),
        codec_str=VIDEO_CODEC_STRINGS.get(
            vsrc.get("codec_name"), vsrc.get("codec_name", "?")
        ),
        profile=vsrc.get("profile", ""),
        width=int(vsrc.get("width", 0)),
        height=int(vsrc.get("height", 0)),
        frame_rate=vsrc.get("avg_frame_rate") or vsrc.get("r_frame_rate") or "",
        start=vstart,
        end=vend,
        timescale=tb,
        bitrate=vbitrate,
    )


def _fill_bitrates(
    video: VideoTrack, audios: list[AudioTrack], size: int, fmt_dur: float
) -> None:
    # mkv/ts often lack stream bit_rate; ts/m2ts often lack format duration.
    est_total = int(size * 8 / fmt_dur) if fmt_dur else 0
    if not video.bitrate:
        audio_sum = sum(t.bitrate for t in audios)
        video.bitrate = max(100_000, est_total - audio_sum)
    for t in audios:
        if not t.bitrate:
            t.bitrate = AAC_BITRATE


def _resolve_duration(
    fmt_dur: float, video_end: float, audios: list[AudioTrack], boundaries: list[float]
) -> float:
    candidates = [fmt_dur, video_end]
    candidates += [t.end for t in audios]
    if boundaries:
        candidates.append(boundaries[-1])
    return max((c for c in candidates if c), default=0.0)


def build_info(name: str, path: str) -> AssetInfo:
    st = os.stat(path)
    data = _ffprobe_json(["-show_streams", "-show_format"], path)
    streams = data.get("streams", [])
    fmt = data.get("format", {})
    fmt_dur = _float(fmt.get("duration"), 0.0) or 0.0

    vsrc = next((s for s in streams if s.get("codec_type") == "video"), None)
    if vsrc is None:
        raise RuntimeError(f"no video stream in {path}")
    asrcs = [s for s in streams if s.get("codec_type") == "audio"]

    # ---- pass 2: full packet index (one demux pass) ----
    wanted = {vsrc["index"]} | {s["index"] for s in asrcs}
    pkts = _packet_index(path, wanted)

    # ---- canonical video timeline from keyframe packets ----
    vstart = _float(vsrc.get("start_time"), 0.0) or 0.0
    vend = vstart + (_float(vsrc.get("duration")) or max(0.0, fmt_dur - vstart))
    boundaries, kf_dts = _video_timeline(pkts, vsrc["index"], vstart, vend)

    video = _video_track(vsrc, vstart, vend)

    # ---- audio tracks: packet-exact landing/cut tables ----
    audios = _audio_tracks(asrcs, pkts, fmt_dur)

    # ---- subtitle streams -> side-car WebVTT (converted on demand) ----
    tsrcs = [s for s in streams if s.get("codec_type") == "subtitle"]
    texts = _text_tracks(tsrcs)

    _fill_bitrates(video, audios, st.st_size, fmt_dur)
    duration = _resolve_duration(fmt_dur, video.end, audios, boundaries)

    # Raise the whole timeline so the first stamp is >= 0 (mp4 edit lists).
    first_stamps = [kf_dts[0]] + [t.landings[0] for t in audios]
    return AssetInfo(
        name=name,
        path=os.path.abspath(path),
        size=st.st_size,
        mtime=st.st_mtime,
        duration=duration,
        video=video,
        audios=audios,
        boundaries=boundaries,
        kf_dts=kf_dts,
        transcode_ladder=[(h, bw) for h, bw in TRANSCODE_LADDER if h <= video.height],
        dts_shift=max(0.0, -min(first_stamps)),
        texts=texts,
    )


def _packet_index(path: str, wanted: set[int]) -> dict[int, list[Packet]]:
    try:
        stdout = _ffmpeg.ffprobe_packets_csv(path)
    except _ffmpeg.FfmpegError as e:
        raise RuntimeError(str(e)) from e
    out: dict[int, list] = {i: [] for i in wanted}
    reader = csv.reader(io.StringIO(stdout))
    for parts in reader:
        if len(parts) < 4:
            continue
        try:
            idx = int(parts[0])
        except ValueError:
            continue
        if idx not in out:
            continue
        pts = _float(parts[1])
        dts = _float(parts[2])
        out[idx].append((pts, dts, parts[3].startswith("K")))
    return out


def _timescale_of(time_base: str | None, default: int) -> int:
    if not time_base:
        return default
    try:
        n, d = time_base.split("/")
        num, den = int(n), int(d)
    except ValueError:
        return default
    return den if num == 1 and den > 0 else default


def probe_track_timescale(init_path: str, media_type: str) -> int | None:
    sel = "v:0" if media_type == "video" else "a:0"
    data = _ffprobe_json(
        ["-select_streams", sel, "-show_entries", "stream=time_base"], init_path
    )
    streams = data.get("streams", [])
    if not streams:
        return None
    ts = _timescale_of(streams[0].get("time_base"), 0)
    return ts or None
