"""Lazy video thumbnails (ffmpeg ``-ss 5`` with ``-ss 0`` retry)."""

from __future__ import annotations

import logging
import os
import subprocess
import tempfile
from typing import TYPE_CHECKING

import ei.media.state as _state
from ei.media import ffmpeg as _ffmpeg
from ei.media import ffmpeg_recipes as _recipes
from ei.media.paths import thumb_path as _thumb_path

log = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from ei.media.registry import Asset

THUMB_SEEKS = ("5", "0")
THUMB_TIMEOUT = 60


def thumb_path(aid: str) -> str:
    return _thumb_path(_state.cache_dir(), aid)


def ensure_thumb(asset: Asset) -> str | None:
    reg = _state.ctx().registry
    dest = _thumb_path(reg.cache_dir, asset.info.name)
    if _fresh(dest):
        return dest
    with reg.thumb_lock_for(asset.info.name):
        if _fresh(dest):
            return dest
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if _generate(asset.info.path, dest):
            return dest
        return None


def _fresh(dest: str) -> bool:
    try:
        return os.path.getsize(dest) > 0
    except OSError:
        return False


def _generate(src: str, dest: str) -> bool:
    try:
        with tempfile.NamedTemporaryFile(
            suffix=".jpg", dir=os.path.dirname(dest), delete=False
        ) as f:
            tmp = f.name
    except OSError:
        return False
    try:
        for seek in THUMB_SEEKS:
            try:
                p = _ffmpeg.ffmpeg_thumb(
                    _recipes.thumb_cmd(src, seek, tmp), timeout=THUMB_TIMEOUT
                )
            except (OSError, subprocess.TimeoutExpired):
                continue
            if p.returncode == 0 and _fresh(tmp):
                break
        else:
            return False
        os.replace(tmp, dest)
        return True
    finally:
        try:
            if os.path.exists(tmp):
                os.unlink(tmp)
        except OSError:
            pass
