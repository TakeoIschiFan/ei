"""CLI / startup: argparse, registry wiring, ThreadingHTTPServer."""

import argparse
import os
import re
import secrets
from http.server import ThreadingHTTPServer
from pathlib import Path

import ei.media.state as _state
from ei.media import cache as _cache
from ei.media import ffmpeg as _ffmpeg
from ei.media.encoder import resolve_video_encoder
from ei.media.library import cache_root_default
from ei.media.readahead import Readahead
from ei.media.registry import Registry
from ei.web.http import Handler
from ei.web.session import SessionStore

DEFAULT_PORT = 8509
DEFAULT_HOST = "0.0.0.0"


def parse_args(argv: list[str] | None = None):
    ap = argparse.ArgumentParser(description="ei video server")
    ap.add_argument("dir", nargs="?", default=".")
    ap.add_argument("--port", type=int, default=DEFAULT_PORT)
    ap.add_argument("--host", default=DEFAULT_HOST)
    ap.add_argument("--cache-dir", default=cache_root_default())
    ap.add_argument(
        "--cache-size",
        default="5GB",
        help="LRU budget for cached video segments (*.m4s only; "
        "init.mp4/meta.json/thumbs are always kept). "
        "Suffixes KB/MB/GB accepted, 0 = unlimited. Default: 5GB.",
    )
    ap.add_argument("--pin", default=None)
    ap.add_argument("--no-pin", action="store_true")
    ap.add_argument(
        "--recursive",
        action="store_true",
        help="descend into subdirectories (default: top level only)",
    )
    ap.add_argument(
        "--transcode",
        action="store_true",
        help="enable the transcode stack: transcode ladder + AAC fallback "
        "(default: direct stream-copy only)",
    )
    ap.add_argument(
        "--nvenc",
        action="store_true",
        help="encode the transcode ladder with NVIDIA NVENC (h264_nvenc) instead "
        "of libx264. Fails fast at startup when no working NVENC is found.",
    )
    a = ap.parse_args(argv)
    if not os.path.isdir(a.dir):
        ap.error(f"media dir not found: {a.dir}")
    if not 1 <= a.port <= 65535:
        ap.error("--port must be 1-65535")
    if a.pin is not None and a.no_pin:
        ap.error("--pin and --no-pin are mutually exclusive")
    if a.pin is not None and not re.fullmatch(r"\d{4}", a.pin):
        ap.error("--pin must be exactly 4 digits")
    try:
        max_cache_bytes = _cache.parse_cache_size(a.cache_size)
    except ValueError as e:
        ap.error(str(e))
    a.max_cache_bytes = max_cache_bytes
    return a


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    _ffmpeg.check_tools()
    video_encoder = resolve_video_encoder(args.nvenc)
    if args.no_pin:
        pin = None
    elif args.pin is not None:
        pin = args.pin
    else:
        pin = f"{secrets.randbelow(10000):04d}"
    reg = Registry(
        args.dir,
        args.cache_dir,
        recursive=args.recursive,
        max_cache_bytes=args.max_cache_bytes,
    )
    _state.bind(
        reg,
        Readahead(reg),
        transcode=args.transcode,
        video_encoder=video_encoder,
        session=SessionStore(pin),
    )
    _state.ctx().registry.rescan()
    pruned_dirs, pruned_thumbs = _state.ctx().registry.prune_orphans()
    if pruned_dirs or pruned_thumbs:
        print(
            f"  cache: pruned {pruned_dirs} orphan asset(s), "
            f"{pruned_thumbs} orphan thumb(s)",
            flush=True,
        )
    freed, removed = _state.ctx().registry.enforce_cache_limit(force=True)
    if removed:
        print(
            f"  cache: evicted {removed} segment(s), freed {freed / 1e6:.1f} MB",
            flush=True,
        )
    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"ei serving {Path(args.dir).resolve()}", flush=True)
    print(f"  http://{args.host}:{args.port}", flush=True)
    if pin is None:
        print("  pin: disabled (--no-pin)", flush=True)
    else:
        print(f"  pin: {pin}", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
