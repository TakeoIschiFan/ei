"""Same-directory .srt/.vtt subtitle discovery.

A sidecar matches the video's basename optionally followed by subtitle tags,
e.g. ``Movie.mkv`` -> ``Movie.en.srt`` / ``Movie.en.forced.vtt``. Only the
video's own directory is scanned: no recursion and no subtitle subfolders.

Tags are matched strictly. Every dot/underscore/dash separated token after the
basename must be either a language code (the ISO 639 codes already known to
:mod:`ei.media.labels`) or one of ``forced``/``sdh``/``cc``; ``cc`` is treated
as SDH. At most one language tag is allowed, and a filename without one is
served under the "Original" label. Unknown tokens mean the file is ignored, so
release-style names such as ``Movie.1080p.en.srt`` are not picked up.

Discovery is cheap (a directory listing) and runs when an asset is first loaded
in a process. Results are cached with the loaded asset, so adding, removing,
editing or renaming a sidecar only takes effect after a restart. On load the
cached sidecar conversions are discarded so a restart always re-reads sources.
"""

from __future__ import annotations

import os
import re
import shutil

from ei.media.labels import LANG_NAMES
from ei.media.models import TextTrack
from ei.media.paths import sidecar_dir

SIDECAR_EXTS = frozenset({".srt", ".vtt"})
CODEC_BY_EXT = {".srt": "subrip", ".vtt": "webvtt"}

_TAG_SPLIT = re.compile(r"[._-]")
_SDH_TAGS = frozenset({"sdh", "cc"})


def parse_tags(video_stem: str, filename: str) -> tuple[str, bool, bool] | None:
    """Parse ``filename`` as a sidecar of ``video_stem``.

    Returns ``(lang, forced, sdh)`` (``lang`` is ``"und"`` when untagged), or
    ``None`` when the name is not a strict sidecar match.
    """
    stem, ext = os.path.splitext(filename)
    if ext.lower() not in SIDECAR_EXTS:
        return None
    if not stem.lower().startswith(video_stem.lower()):
        return None
    tail = stem[len(video_stem) :]
    if tail and tail[0] not in "._-":
        return None
    lang = ""
    forced = sdh = False
    for token in _TAG_SPLIT.split(tail.lower()):
        if not token:
            continue
        if token == "forced":
            forced = True
        elif token in _SDH_TAGS:
            sdh = True
        elif token in LANG_NAMES:
            if lang:
                return None  # ambiguous: more than one language tag
            lang = token
        else:
            return None  # strict: unknown tags disqualify the file
    return lang or "und", forced, sdh


def discover(video_path: str) -> list[TextTrack]:
    """List sidecar tracks next to ``video_path``, sorted by filename."""
    directory = os.path.dirname(os.path.abspath(video_path))
    stem = os.path.splitext(os.path.basename(video_path))[0]
    try:
        with os.scandir(directory) as it:
            entries = sorted(it, key=lambda e: e.name)
    except OSError:
        return []
    tracks = []
    for entry in entries:
        tags = parse_tags(stem, entry.name)
        if tags is None:
            continue
        try:
            if not entry.is_file(follow_symlinks=False):
                continue
            if not entry.stat(follow_symlinks=False).st_size:
                continue
        except OSError:
            continue
        lang, forced, sdh = tags
        tracks.append(
            TextTrack(
                ordinal=0,
                stream_index=0,
                codec=CODEC_BY_EXT[os.path.splitext(entry.name)[1].lower()],
                lang=lang,
                title="",
                forced=forced,
                sdh=sdh,
                sidecar=entry.path,
            )
        )
    return tracks


def reset_cache(cache_dir: str, name: str) -> None:
    """Drop cached sidecar conversions; they are regenerated after a restart."""
    shutil.rmtree(sidecar_dir(cache_dir, name), ignore_errors=True)
