"""Disk-cache hygiene: orphan GC + LRU eviction for segment files."""

from __future__ import annotations

import os
import re
import shutil
import time
from dataclasses import dataclass
from pathlib import Path

from ei.media.ids import is_valid_id
from ei.media.paths import thumb_path as _thumb_path

DEFAULT_CACHE_SIZE = 5 * 1024**3  # 5 GiB
EVICT_GRACE_SECONDS = 60.0  # never evict a file touched this recently
ENFORCE_MIN_INTERVAL = 30.0  # throttle for the post-gen enforce hook

_SIZE_RE = re.compile(r"^(\d+(?:\.\d+)?)([a-z]*)$")
_SUFFIX_FACTORS = (
    ("gb", 1024**3),
    ("g", 1024**3),
    ("mb", 1024**2),
    ("m", 1024**2),
    ("kb", 1024),
    ("k", 1024),
    ("b", 1),
    ("", 1),
)


@dataclass(frozen=True)
class SegmentFile:
    atime: float
    size: int
    path: str


class CacheLimiter:
    def __init__(self, min_interval: float = ENFORCE_MIN_INTERVAL):
        self.min_interval = min_interval
        self._last_enforce = 0.0

    def maybe_enforce(
        self, cache_dir: str, max_bytes: int, force: bool = False
    ) -> tuple[int, int]:
        now = time.time()
        if not force and now - self._last_enforce < self.min_interval:
            return 0, 0
        self._last_enforce = now
        return enforce_limit(cache_dir, max_bytes)


def parse_cache_size(s: str) -> int:
    """Parse ``--cache-size`` into bytes. ``0`` means unlimited."""
    t = s.strip().lower().replace(" ", "")
    if t in ("0", "0b", "unlimited", "none"):
        return 0
    m = _SIZE_RE.match(t)
    if not m:
        raise ValueError(f"invalid --cache-size {s!r}")
    number, suffix = m.groups()
    for suf, factor in _SUFFIX_FACTORS:
        if suffix == suf:
            mult = factor
            break
    else:
        raise ValueError(f"invalid --cache-size {s!r}: unknown suffix {suffix!r}")
    value = float(number)
    if value < 0:
        raise ValueError(f"invalid --cache-size {s!r}: must be >= 0")
    return int(value * mult)


def touch_seg(path: str) -> None:
    try:
        os.utime(path, None)
    except OSError:
        pass


def _is_staging_or_tmp(path: str) -> bool:
    parts = Path(path).parts
    return ".tmp" in parts or any(p.endswith(".staging") for p in parts)


def iter_segment_files(cache_dir: str) -> list[SegmentFile]:
    out: list[SegmentFile] = []
    stack = [cache_dir]
    while stack:
        try:
            with os.scandir(stack.pop()) as it:
                entries = list(it)
        except OSError:
            continue
        for e in entries:
            try:
                p = e.path
                if _is_staging_or_tmp(p):
                    continue
                if e.is_dir(follow_symlinks=False):
                    if e.name == "thumbs":
                        continue
                    stack.append(p)
                elif e.is_file(follow_symlinks=False) and e.name.endswith(".m4s"):
                    try:
                        st = e.stat(follow_symlinks=False)
                    except OSError:
                        continue
                    out.append(SegmentFile(st.st_atime, st.st_size, p))
            except OSError:
                continue
    return out


def m4s_total(cache_dir: str) -> tuple[int, int]:
    files = iter_segment_files(cache_dir)
    return sum(f.size for f in files), len(files)


def enforce_limit(
    cache_dir: str,
    max_bytes: int,
    grace_seconds: float = EVICT_GRACE_SECONDS,
) -> tuple[int, int]:
    """Delete oldest ``*.m4s`` until within budget. Returns (freed, removed)."""
    if max_bytes <= 0:
        return 0, 0
    files = iter_segment_files(cache_dir)
    total = sum(f.size for f in files)
    if total <= max_bytes:
        return 0, 0
    files.sort(key=lambda f: f.atime)
    now = time.time()
    freed, removed = 0, 0
    for f in files:
        if total - freed <= max_bytes:
            break
        if now - f.atime < grace_seconds:
            continue
        try:
            os.unlink(f.path)
        except OSError:
            continue
        freed += f.size
        removed += 1
    return freed, removed


def prune_orphans(cache_dir: str, live_ids: set[str]) -> tuple[int, int]:
    """Delete asset dirs (and orphan thumbs) for ids no longer in the library."""
    if not live_ids:
        return 0, 0
    try:
        top = os.listdir(cache_dir)
    except OSError:
        return 0, 0
    dirs_removed = 0
    for name in top:
        if name == "thumbs":
            continue
        if not is_valid_id(name) or name in live_ids:
            continue
        shutil.rmtree(os.path.join(cache_dir, name), ignore_errors=True)
        dirs_removed += 1
    try:
        thumbs = os.listdir(os.path.join(cache_dir, "thumbs"))
    except OSError:
        return dirs_removed, 0
    thumbs_removed = 0
    for name in thumbs:
        stem, ext = os.path.splitext(name)
        if ext.lower() != ".jpg" or not is_valid_id(stem) or stem in live_ids:
            continue
        try:
            os.unlink(os.path.join(cache_dir, "thumbs", name))
            thumbs_removed += 1
        except OSError:
            continue
    return dirs_removed, thumbs_removed


def invalidate_asset(cache_dir: str, aid: str) -> None:
    """Drop all cached output for an asset whose source changed."""
    if not is_valid_id(aid):
        return
    shutil.rmtree(os.path.join(cache_dir, aid), ignore_errors=True)
    try:
        os.unlink(_thumb_path(cache_dir, aid))
    except OSError:
        pass
