"""File serving: streaming bodies + single-range support."""

from __future__ import annotations

import os
from typing import TYPE_CHECKING

from ei.media import cache as cache_mod
from ei.web.routing import ByteRange, resolve_range
from ei.web.static import cache_control_for

if TYPE_CHECKING:  # pragma: no cover
    from ei.web.http import Handler

_CHUNK = 256 * 1024


def _mark_segment(path: str) -> None:
    if path.endswith(".m4s"):
        try:
            cache_mod.touch_seg(path)
        except OSError:
            pass


def serve_file(handler: Handler, path: str, ctype: str) -> None:
    """Stream *path* with ``200`` (or ``206`` when a valid Range is present)."""
    _mark_segment(path)
    try:
        size = os.path.getsize(path)
    except OSError:
        handler.send_not_found()
        return
    range_header = handler.headers.get("Range")
    if range_header:
        from ei.web.routing import parse_range

        parsed = parse_range(range_header)
        if parsed is not None:
            if _serve_range(handler, path, ctype, size, parsed):
                return
            # Unparseable/unsatisfiable handled below: unsatisfiable -> 416,
            # parse failure -> fall through to 200.
            if parsed is not None and resolve_range(size, parsed) is None:
                handler.send_range_not_satisfiable(size)
                return
    _send_stream(handler, path, ctype, size, start=0, stop=size, status=200)


def _serve_range(
    handler: Handler, path: str, ctype: str, size: int, rng: ByteRange
) -> bool:
    """Serve a ``206`` for *rng*; returns False when it needs a 416/200."""
    resolved = resolve_range(size, rng)
    if resolved is None:
        # Signal the caller to emit 416. Returning False keeps the
        # parse-failure (serve 200) and unsatisfiable (serve 416) paths
        # distinct without overloading the return type.
        return False
    start, stop = resolved
    # Empty files fall back to 200 with an empty body.
    _send_stream(handler, path, ctype, size, start=start, stop=stop, status=206)
    return True


def _send_stream(
    handler: Handler,
    path: str,
    ctype: str,
    total: int,
    *,
    start: int,
    stop: int,
    status: int,
) -> None:
    length = max(0, stop - start)
    try:
        handler.send_response(status)
        handler.send_header("Content-Type", ctype)
        handler.send_header("Content-Length", str(length))
        handler.send_header("Accept-Ranges", "bytes")
        handler.send_header("Cache-Control", cache_control_for(path, ctype))
        if status == 206:
            handler.send_header("Content-Range", f"bytes {start}-{stop - 1}/{total}")
        handler.end_headers()
        if handler.command == "HEAD" or length == 0:
            return
        with open(path, "rb") as fh:
            fh.seek(start)
            remaining = length
            while remaining > 0:
                chunk = fh.read(min(_CHUNK, remaining))
                if not chunk:
                    break
                handler.wfile.write(chunk)
                remaining -= len(chunk)
    except (BrokenPipeError, ConnectionResetError):
        pass
