"""Static content config: MIME types + vendored browser deps (no CDN)."""

from __future__ import annotations

import os
from pathlib import Path

_PKG = Path(__file__).resolve().parent

#: Directory holding vendored browser JS served at ``/vendor/<file>``.
VENDOR_DIR = _PKG / "vendor"

#: Allowlist of files servable under ``/vendor/`` — the handler never
#: touches the filesystem outside these fixed names.
VENDOR_FILES: tuple[str, ...] = (
    "media-chrome.js",
    "media-chrome-menu.js",
    "dash-video-element.js",
    "custom-media-element.js",
    "dashjs.js",
    "media-tracks.js",
)

MIME: dict[str, str] = {
    ".mpd": "application/dash+xml",
    ".mp4": "video/mp4",
    ".m4s": "video/iso.segment",
    ".vtt": "text/vtt",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".json": "application/json",
    ".js": "application/javascript",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
}

_FALLBACK_MIME = "application/octet-stream"

#: Content-Types that are immutable versioned blobs — safe for long caching.
_IMMUTABLE_PREFIXES = ("video/", "image/jpeg")
_IMMUTABLE_PATH_SUFFIXES = (".js",)


def mime_for(path_or_suffix: str) -> str:
    """Look up the MIME type by file suffix; falls back to octet-stream."""
    suffix = os.path.splitext(path_or_suffix)[1].lower()
    return MIME.get(suffix, _FALLBACK_MIME)


def cache_control_for(path: str, ctype: str) -> str:
    """Return the ``Cache-Control`` value appropriate for *path*/*ctype*."""
    name = os.path.basename(path)
    if name in VENDOR_FILES or path.endswith(_IMMUTABLE_PATH_SUFFIXES):
        return "public, max-age=31536000, immutable"
    if name == "init.mp4":
        # Init bytes change across server versions (e.g. edit-list fixes)
        # under a fixed URL; they are tiny and fetched once per rep, so
        # always revalidate instead of trusting the hour-long media cache.
        return "no-cache"
    if ctype.startswith(_IMMUTABLE_PREFIXES) or path.endswith(".m4s"):
        return "public, max-age=3600"
    if ctype.startswith("application/dash+xml"):
        return "no-cache"
    return "no-cache"
