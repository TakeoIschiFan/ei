"""URL routing: path -> route name + helpers (pure functions, no server state)."""

from __future__ import annotations

import re
from dataclasses import dataclass
from enum import StrEnum


class Route(StrEnum):
    ROOT = "root"
    LOGIN = "login"
    BROWSE = "browse"
    WATCH = "watch"
    MPD = "mpd"
    SEG = "seg"
    THUMB = "thumb"
    VENDOR = "vendor"
    API_VIDEOS = "api_videos"
    API_VIDEO = "api_video"
    API_QUALITY = "api_quality"
    API_STATUS = "api_status"


_EXACT: dict[str, Route] = {
    "/": Route.ROOT,
    "/index.html": Route.ROOT,
    "/login": Route.LOGIN,
    "/browse": Route.BROWSE,
    "/api/videos": Route.API_VIDEOS,
    "/api/quality": Route.API_QUALITY,
    "/api/status": Route.API_STATUS,
}

_PREFIXES: tuple[tuple[str, Route], ...] = (
    ("/watch/", Route.WATCH),
    ("/mpd/", Route.MPD),
    ("/seg/", Route.SEG),
    ("/thumb/", Route.THUMB),
    ("/vendor/", Route.VENDOR),
    ("/api/video/", Route.API_VIDEO),
)


def route(path: str) -> Route | None:
    """Map a URL path to a :class:`Route` (``None`` = unknown)."""
    if path in _EXACT:
        return _EXACT[path]
    for prefix, name in _PREFIXES:
        if path.startswith(prefix):
            return name
    return None


def strip_prefix(path: str, prefix: str) -> str:
    """Remove *prefix* from *path*; raises ``ValueError`` if missing."""
    if not path.startswith(prefix):
        raise ValueError(f"path {path!r} does not start with {prefix!r}")
    return path[len(prefix) :]


def strip_mpd_suffix(name: str) -> str:
    """Turn ``<id>[/manifest].mpd`` into ``<id>``; pass anything else through."""
    if name.endswith("/manifest.mpd"):
        return name[: -len("/manifest.mpd")]
    if name.endswith(".mpd"):
        return name[: -len(".mpd")]
    return name


@dataclass(frozen=True, slots=True)
class ByteRange:
    """Parsed ``Range: bytes=...`` header.

    ``start`` is the first byte index (``None`` = suffix range);
    ``suffix_length`` is set only for suffix ranges (``bytes=-N``);
    ``end`` is the inclusive last byte (``None`` = open-ended).
    """

    start: int | None
    end: int | None
    suffix_length: int | None = None

    @property
    def is_suffix(self) -> bool:
        return self.start is None


_RANGE_RE = re.compile(r"bytes=(\d*)-(\d*)$")


def parse_range(header: str) -> ByteRange | None:
    """Parse a single-range ``Range`` header; ``None`` = ignore (serve 200)."""
    match = _RANGE_RE.match(header.strip())
    if not match:
        return None
    start_s, end_s = match.group(1), match.group(2)
    if not start_s and not end_s:
        return None
    try:
        if start_s and end_s:
            start, end = int(start_s), int(end_s)
            if start > end:
                return None
            return ByteRange(start=start, end=end)
        if start_s:
            return ByteRange(start=int(start_s), end=None)
        return ByteRange(start=None, end=None, suffix_length=int(end_s))
    except ValueError:
        return None


def resolve_range(total: int, rng: ByteRange) -> tuple[int, int] | None:
    """Clamp *rng* to ``[0, total)``; returns ``(start, stop_excl)`` or ``None``.

    ``None`` means unsatisfiable (caller should answer ``416``).
    """
    if total <= 0:
        return None
    if rng.is_suffix:
        length = rng.suffix_length or 0
        if length <= 0:
            return None
        start = max(0, total - length)
        return (start, total)
    start = rng.start or 0
    if start >= total:
        return None
    stop = total if rng.end is None else min(rng.end + 1, total)
    if stop <= start:
        return None
    return (start, stop)
