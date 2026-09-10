"""Video encoder selection for the transcode ladder."""

from __future__ import annotations

import threading

from ei.media import ffmpeg as _ffmpeg
from ei.media import ffmpeg_recipes as _recipes
from ei.media.quality import DEFAULT_VIDEO_ENCODER, NVENC_PRESET

_cached: bool | None = None
_lock = threading.Lock()


def has_nvenc() -> bool:
    global _cached
    if _cached is not None:
        return _cached
    with _lock:
        if _cached is not None:
            return _cached
        try:
            if (
                _ffmpeg.ffmpeg_unchecked(
                    _recipes.nvenc_info_cmd(), timeout=30
                ).returncode
                != 0
            ):
                _cached = False
            else:
                _cached = (
                    _ffmpeg.ffmpeg_unchecked(
                        _recipes.nvenc_probe_cmd(), timeout=60
                    ).returncode
                    == 0
                )
        except Exception:  # noqa: BLE001 — missing binary, timeout, anything
            _cached = False
        return _cached


def resolve_video_encoder(nvenc_requested: bool) -> str:
    if not nvenc_requested:
        return DEFAULT_VIDEO_ENCODER
    if not has_nvenc():
        raise SystemExit(
            "error: --nvenc requested but h264_nvenc is not usable "
            "(no NVIDIA GPU/driver, or ffmpeg built without nvenc)"
        )
    print(
        f"ei: NVENC hardware encoding enabled (h264_nvenc, preset {NVENC_PRESET})",
        flush=True,
    )
    return "h264_nvenc"
