"""ffmpeg argument-list recipes (no execution; see ffmpeg.py to run them)."""

from __future__ import annotations

import os
from dataclasses import dataclass

from ei.media import quality as _quality
from ei.media.ffmpeg import FFMPEG

MOV_EXTS = frozenset({".mp4", ".mov", ".m4v", ".m4a"})
PRE_SEEK_OFFSET = 2.0
TRIM_EPSILON = 1e-9

DASH_OPTS: tuple[str, ...] = (
    "-f",
    "dash",
    "-dash_segment_type",
    "mp4",
    "-seg_duration",
    "2000",
    "-use_template",
    "0",
    "-use_timeline",
    "0",
    "-init_seg_name",
    "init.mp4",
    "-media_seg_name",
    "seg.m4s",
    "-avoid_negative_ts",
    "disabled",
)


@dataclass(frozen=True)
class TrimWindow:
    trim: float | None = None
    to_time: float | None = None


def dash_opts() -> list[str]:
    return list(DASH_OPTS)


def ffmpeg_input_flags(src: str) -> list[str]:
    if os.path.splitext(src)[1].lower() in MOV_EXTS:
        return ["-ignore_editlist", "1"]
    return []


def _s(x: float) -> str:
    return f"{max(0.0, x):.6f}"


def video_transcode_tail(
    height: int, bw: int, trim: float, nvenc: bool = False
) -> list[str]:
    base = ["-map", "0:v:0", "-an", "-vf", f"scale=-2:{height}"]
    codec = (
        [
            "-c:v",
            "h264_nvenc",
            "-preset",
            _quality.NVENC_PRESET,
            "-b:v",
            str(bw),
            "-bf",
            "0",
            "-force_key_frames",
            _s(trim),
            "-forced-idr",
            "1",
        ]
        if nvenc
        else [
            "-c:v",
            "libx264",
            "-preset",
            _quality.X264_PRESET,
            "-b:v",
            str(bw),
            "-bf",
            "0",
            "-force_key_frames",
            _s(trim),
        ]
    )
    return base + codec


def video_copy_tail(codec: str) -> list[str]:
    tail = ["-map", "0:v:0", "-c:v", "copy"]
    if codec == "hevc":
        tail += ["-tag:v", "hvc1"]
    elif codec == "h264":
        tail += ["-tag:v", "avc1"]
    return tail


def audio_copy_tail(track: int, codec: str) -> list[str]:
    tail = ["-map", f"0:a:{track}", "-c:a", "copy"]
    if codec == "aac":
        tail += ["-tag:a", "mp4a"]
    return tail


def audio_aac_tail(track: int) -> list[str]:
    return [
        "-map",
        f"0:a:{track}",
        "-c:a",
        "aac",
        "-b:a",
        _quality.aac_bitrate_arg(),
        "-ac",
        "2",
    ]


def segment_cmd(
    src: str, window: TrimWindow, tail: list[str], out_mpd: str, preseek: bool = True
) -> list[str]:
    trim, to_time = window.trim, window.to_time
    cmd = [FFMPEG, *ffmpeg_input_flags(src), "-v", "error", "-y"]
    if preseek:
        # Fast pre-seek: input seek is only safe when re-encoding.
        # With stream copy + -copyts on mpegts, an input seek close to the
        # output trim intermittently yields empty dash output (no packets),
        # so copy paths must pass preseek=False and rely on output seeking.
        cmd += [
            "-ss",
            _s(trim - PRE_SEEK_OFFSET if trim and trim > PRE_SEEK_OFFSET else 0.0),
        ]
    cmd += ["-copyts", "-i", src]
    if trim is not None and trim > TRIM_EPSILON:
        cmd += ["-ss", _s(trim)]
    if to_time is not None:
        cmd += ["-to", _s(to_time)]
    return cmd + tail + dash_opts() + [out_mpd]


def audio_pass_cmd(
    src: str, track: int, arep: str, codec: str, manifest: str, seg_duration: float
) -> list[str]:
    cmd = [
        FFMPEG,
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-copyts",
        "-i",
        src,
        *(audio_copy_tail(track, codec) if arep == "direct" else audio_aac_tail(track)),
    ]
    return cmd + [
        "-f",
        "dash",
        "-seg_duration",
        str(seg_duration),
        "-use_template",
        "1",
        "-use_timeline",
        "1",
        "-init_seg_name",
        "init.mp4",
        "-media_seg_name",
        "$Number%06d$.m4s",
        "-avoid_negative_ts",
        "disabled",
        manifest,
    ]


def summary_probe_args() -> list[str]:
    return [
        "-show_entries",
        "format=duration,size",
        "-show_entries",
        "stream=codec_type,codec_name,width,height,duration",
    ]


def thumb_cmd(src: str, seek: str, dest_tmp: str) -> list[str]:
    return [
        FFMPEG,
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-ss",
        seek,
        "-i",
        src,
        "-frames:v",
        "1",
        "-vf",
        "scale=320:-2",
        "-q:v",
        "5",
        dest_tmp,
    ]


def vtt_cmd(src: str, subtitle_ordinal: int, dest_tmp: str) -> list[str]:
    return [
        FFMPEG,
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-i",
        src,
        "-map",
        f"0:s:{subtitle_ordinal}",
        "-f",
        "webvtt",
        dest_tmp,
    ]


def nvenc_info_cmd() -> list[str]:
    return [FFMPEG, "-hide_banner", "-h", "encoder=h264_nvenc"]


def nvenc_probe_cmd() -> list[str]:
    return [
        FFMPEG,
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "color=size=256x256:rate=1:duration=1",
        "-frames:v",
        "1",
        "-c:v",
        "h264_nvenc",
        "-preset",
        _quality.NVENC_PRESET,
        "-f",
        "null",
        "-",
    ]
