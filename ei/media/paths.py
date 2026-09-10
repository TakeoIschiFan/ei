"""Cache-tree path helpers (single place for on-disk layout)."""

from __future__ import annotations

import os


def asset_dir(cache_dir: str, name: str) -> str:
    return os.path.join(cache_dir, name)


def meta_path(cache_dir: str, name: str) -> str:
    return os.path.join(cache_dir, name, "meta.json")


def video_target(cache_dir: str, name: str, rep_id: str) -> str:
    return os.path.join(cache_dir, name, rep_id, "video")


def audio_target(cache_dir: str, name: str, track: int, arep: str) -> str:
    return os.path.join(cache_dir, name, f"audio{track}", arep)


def audio_staging_dir(pass_dir: str) -> str:
    return pass_dir + ".staging"


def thumbs_dir(cache_dir: str) -> str:
    return os.path.join(cache_dir, "thumbs")


def thumb_path(cache_dir: str, aid: str) -> str:
    return os.path.join(cache_dir, "thumbs", aid + ".jpg")


def seg_filename(index: int) -> str:
    return f"{index:06d}.m4s"


def parse_seg_number(filename: str) -> int | None:
    stem, dot, ext = filename.partition(".")
    if dot != "." or ext != "m4s" or len(stem) != 6 or not stem.isdigit():
        return None
    return int(stem)
