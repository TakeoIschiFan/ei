"""Content-based library scan: listed iff ffprobe finds a video stream."""

from __future__ import annotations

import os
import sys
import threading
from collections import OrderedDict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from ei.media import ffmpeg as _ffmpeg
from ei.media import ffmpeg_recipes as _recipes
from ei.media.ids import asset_id

SCAN_PROBE_TIMEOUT = 15
SUMMARY_CACHE_SIZE = 4096
SCAN_WORKERS = 8

# Container extensions checked for a video stream. This is only a pre-filter:
# ffprobe decides what is actually video. Anything not listed here is skipped,
# so code, archives and build output never cost a probe. Additional extensions
# can be passed with --extra-extensions.
VIDEO_EXTS = frozenset(
    {
        ".mkv",
        ".mp4",
        ".m4v",
        ".mov",
        ".webm",
        ".ts",
        ".m2ts",
        ".mts",
        ".avi",
        ".mpg",
        ".mpeg",
        ".flv",
        ".wmv",
        ".3gp",
    }
)


class SummaryCache:
    def __init__(self, maxsize: int = SUMMARY_CACHE_SIZE):
        self.maxsize = maxsize
        self._lock = threading.Lock()
        self._items: OrderedDict[str, tuple[int, float, dict]] = OrderedDict()

    def get(self, key: str, size: int, mtime: float) -> dict | None:
        with self._lock:
            hit = self._items.get(key)
            if hit is None or (hit[0], hit[1]) != (size, mtime):
                return None
            self._items.move_to_end(key)
            return hit[2]

    def put(self, key: str, size: int, mtime: float, res: dict) -> None:
        with self._lock:
            self._items[key] = (size, mtime, res)
            self._items.move_to_end(key)
            while len(self._items) > self.maxsize:
                self._items.popitem(last=False)


_summaries = SummaryCache()


def probe_summary(path: str) -> dict:
    try:
        st = os.stat(path)
    except OSError:
        return {}
    key = os.path.abspath(path)
    hit = _summaries.get(key, st.st_size, st.st_mtime)
    if hit is not None:
        return hit
    try:
        data = _ffmpeg.ffprobe_json(
            _recipes.summary_probe_args(), path, timeout=SCAN_PROBE_TIMEOUT
        )
        res = _parse_summary(data, st)
    except _ffmpeg.FfmpegError:
        res = {}
    _summaries.put(key, st.st_size, st.st_mtime, res)
    return res


def _parse_summary(data: dict, st: os.stat_result) -> dict:
    streams = data.get("streams", []) or []
    vsrc = next((s for s in streams if s.get("codec_type") == "video"), None)
    if vsrc is None:
        return {}
    fmt = data.get("format", {}) or {}
    try:
        dur = float(fmt.get("duration") or 0.0)
    except (TypeError, ValueError):
        dur = 0.0
    if not dur:
        for s in streams:
            try:
                dur = max(dur, float(s.get("duration") or 0.0))
            except (TypeError, ValueError):
                continue
    asrc = next((s for s in streams if s.get("codec_type") == "audio"), None)
    return {
        "duration": dur,
        "size": st.st_size,
        "mtime": st.st_mtime,
        "width": int(vsrc.get("width") or 0),
        "height": int(vsrc.get("height") or 0),
        "vcodec": vsrc.get("codec_name") or "",
        "acodec": (asrc or {}).get("codec_name") or "",
    }


def has_video_stream(path: str) -> bool:
    return bool(probe_summary(path))


def _walk_files(root: str, recursive: bool):
    stack = [os.path.abspath(root)]
    while stack:
        try:
            with os.scandir(stack.pop()) as it:
                entries = sorted(it, key=lambda e: e.name)
        except OSError:
            continue
        subdirs = []
        for e in entries:
            yield e
            if not recursive or e.name.startswith("."):
                continue
            try:
                if not e.is_symlink() and e.is_dir(follow_symlinks=False):
                    subdirs.append(e.path)
            except OSError:
                continue
        stack.extend(reversed(subdirs))


def _is_candidate(e: os.DirEntry, recursive: bool, exts: set[str] | None) -> bool:
    if e.name.startswith("."):
        return False
    try:
        if e.is_symlink():
            return False
        if recursive and e.is_dir(follow_symlinks=False):
            return False
        if not e.is_file(follow_symlinks=False):
            return False
    except OSError:
        return False
    if exts is not None and os.path.splitext(e.name)[1].lower() not in exts:
        return False
    return True


def scan_library(
    root: str,
    exts: set[str] | None = None,
    is_video=has_video_stream,
    recursive: bool = False,
):
    # exts=None selects the built-in container list. Each probe runs ffprobe
    # in its own process, so the checks run in threads.
    base = os.path.abspath(root)
    allowed = VIDEO_EXTS if exts is None else exts
    cands = []
    for e in _walk_files(root, recursive):
        try:
            if not _is_candidate(e, recursive, allowed):
                continue
            cands.append((e.path, os.path.relpath(e.path, base)))
        except OSError:
            continue
    if is_video is None:
        found = cands
    else:
        hits = _check_all(is_video, [abs_p for abs_p, _ in cands])
        found = [c for c, hit in zip(cands, hits, strict=True) if hit]
    found.sort(key=lambda t: t[1])
    return {asset_id(abs_p): (abs_p, rel) for abs_p, rel in found}


def _check_all(is_video, paths: list[str]) -> list[bool]:
    def check(p: str) -> bool:
        try:
            return bool(is_video(p))
        except OSError:
            return False

    if len(paths) < 2:
        return [check(p) for p in paths]
    with ThreadPoolExecutor(
        max_workers=min(SCAN_WORKERS, len(paths)), thread_name_prefix="ei-scan"
    ) as ex:
        return list(ex.map(check, paths))


def cache_root_default() -> str:
    if sys.platform == "win32":
        base = os.environ.get("LOCALAPPDATA") or str(Path.home() / "AppData" / "Local")
        return str(Path(base) / "ei-media")
    if sys.platform == "darwin":
        return str(Path.home() / "Library" / "Caches" / "ei-media")
    return str(Path.home() / ".cache" / "ei-media")
