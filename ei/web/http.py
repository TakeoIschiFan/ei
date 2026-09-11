"""HTTP handler: routing + auth gate + static/file serving."""

from __future__ import annotations

import json
import logging
import os
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, unquote, urlparse

from ei.media import generation, manifest
from ei.media.ids import is_valid_id
from ei.media.segments import count_m4s, ensure_rep_metadata, ensure_seg_file
from ei.media.thumbs import ensure_thumb
from ei.web import routing
from ei.web.assets import DIRECT_REP
from ei.web.auth import cookie_token, make_session_cookie
from ei.web.context import WebContext, current_context
from ei.web.files import serve_file
from ei.web.pages import page_browse, page_login, page_watch
from ei.web.routing import Route
from ei.web.static import MIME, VENDOR_DIR, VENDOR_FILES
from ei.web.views import video_detail, video_entry

__all__ = ["Handler", "MIME", "VENDOR_DIR", "VENDOR_FILES"]

log = logging.getLogger(__name__)

_BOUNDARIES_LIMIT = 50
_SEG_CHUNK_FALLBACK_MIME = "application/octet-stream"


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "ei"

    # -- framework hooks -------------------------------------------------
    def log_message(self, fmt, *args):
        log.info("%s %s", self.address_string(), fmt % args)

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (ConnectionResetError, BrokenPipeError):
            self.close_connection = True

    # -- low-level responders --------------------------------------------
    def _send_body(
        self, code: int, body: bytes, ctype: str, cache: str = "no-cache"
    ) -> None:
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", cache)
        self.end_headers()
        if self.command != "HEAD":
            try:
                self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError):
                pass

    def _html(self, code: int, text: str) -> None:
        self._send_body(code, text.encode(), "text/html; charset=utf-8")

    def _json(self, code: int, obj) -> None:
        self._send_body(code, json.dumps(obj).encode(), "application/json")

    def _text(self, code: int, msg: str) -> None:
        self._send_body(code, msg.encode(), "text/plain; charset=utf-8")

    def send_not_found(self, msg: str = "not found") -> None:
        self._send_body(404, msg.encode(), "text/plain; charset=utf-8")

    def send_range_not_satisfiable(self, total: int) -> None:
        self.send_response(416)
        self.send_header("Content-Range", f"bytes */{total}")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def _redirect(self, loc: str, cookie: str | None = None) -> None:
        self.send_response(302)
        self.send_header("Location", loc)
        self.send_header("Content-Length", "0")
        if cookie is not None:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()

    # -- context / auth ---------------------------------------------------
    @property
    def ctx(self) -> WebContext:
        return current_context()

    def _authed(self, ctx: WebContext) -> bool:
        if ctx.session is None:
            return False
        return ctx.session.check_token(cookie_token(self.headers))

    # -- dispatch ---------------------------------------------------------
    def do_GET(self):
        self._dispatch()

    def do_HEAD(self):
        self._dispatch()

    def do_POST(self):
        try:
            path = unquote(urlparse(self.path).path)
            if path == "/login":
                self.post_login(self.ctx)
                return
            self.send_not_found()
        except (BrokenPipeError, ConnectionResetError):
            pass
        except Exception:  # noqa: BLE001
            log.exception("POST %s failed", self.path)
            try:
                self._text(500, "internal error")
            except (BrokenPipeError, ConnectionResetError):
                pass

    def _dispatch(self):
        url = urlparse(self.path)
        path = unquote(url.path)
        qs = parse_qs(url.query)
        try:
            ctx = self.ctx
            name = routing.route(path)
            if name is None:
                # Block encoded traversal (e.g. /vendor/%2e%2e/...) that
                # unquoting turned into a filesystem escape.
                self.send_not_found()
                return
            if name in (Route.ROOT, Route.LOGIN):
                self.get_root(ctx) if name is Route.ROOT else self._html(
                    200, page_login()
                )
                return
            if not self._authed(ctx):
                self._redirect("/")
                return
            handler = _GETTERS.get(name)
            if handler is None:
                self.send_not_found()
                return
            handler(self, ctx, path, qs)
        except RuntimeError as exc:  # GenError + probe failures -> 500
            log.exception("GET %s failed", path)
            try:
                self._text(500, str(exc) or "internal error")
            except (BrokenPipeError, ConnectionResetError):
                pass
        except (BrokenPipeError, ConnectionResetError):
            pass

    # -- pages ------------------------------------------------------------
    def get_root(self, ctx: WebContext) -> None:
        session = ctx.session
        if session is None or session.auth_disabled:
            self._redirect("/browse")
            return
        if self._authed(ctx):
            self._redirect("/browse")
            return
        self._html(200, page_login())

    def post_login(self, ctx: WebContext) -> None:
        session = ctx.session
        if session is None or session.auth_disabled:
            self._redirect("/browse")
            return
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            self._text(400, "bad Content-Length")
            return
        if length < 0 or length > 1_000_000:
            self._text(400, "bad Content-Length")
            return
        raw = (
            self.rfile.read(max(0, length)).decode("utf-8", "replace") if length else ""
        )
        pin = parse_qs(raw).get("pin", [""])[0]
        if session.check_pin(pin):
            self._redirect("/browse", make_session_cookie(session.issue_token()))
        else:
            self._html(200, page_login(error=True))

    def get_browse(self, ctx: WebContext, path: str, qs) -> None:
        ctx.reg.rescan()
        self._html(200, page_browse())

    # -- media ------------------------------------------------------------
    def get_watch(self, ctx: WebContext, path: str, qs) -> None:
        aid = routing.strip_prefix(path, "/watch/")
        resolved = ctx.resolve(aid)
        if resolved is None:
            self.send_not_found(f"unknown asset {aid!r}")
            return
        asset, rel = resolved
        ensure_rep_metadata(asset)
        self._html(
            200,
            page_watch(aid, rel, asset.info.video.codec, ctx.transcode, ",".join(a.codec for a in asset.info.audios)),
        )

    def get_mpd(self, ctx: WebContext, path: str, qs) -> None:
        if ctx.readahead is None:
            self._text(500, "readahead not initialised")
            return
        raw = routing.strip_prefix(path, "/mpd/")
        aid = routing.strip_mpd_suffix(raw)
        asset = ctx.load_asset(aid)
        if asset is None:
            self.send_not_found(f"unknown asset {aid!r}")
            return
        ensure_rep_metadata(asset)
        ctx.kick_audio_first_segments(asset)
        rep = (qs.get("rep") or [ctx.readahead.current(aid) or DIRECT_REP])[0]
        if rep in ctx.valid_reps(asset):
            ctx.readahead.set_quality(aid, rep)
        only = (qs.get("only") or [None])[0]
        allowed_only = [DIRECT_REP, "abr", *ctx.transcode_reps(asset)]
        if only is not None and only not in allowed_only:
            self._text(400, f"invalid only={only!r}")
            return
        self._send_body(
            200,
            manifest.build_mpd(asset.info, only, ctx.transcode).encode(),
            MIME[".mpd"],
        )

    def get_seg(self, ctx: WebContext, path: str, qs) -> None:
        rest = routing.strip_prefix(path, "/seg/")
        aid, sep, rel = rest.partition("/")
        if not sep or rel.endswith("/") or not rel:
            self.send_not_found()
            return
        asset = ctx.load_asset(aid)
        if asset is None:
            self.send_not_found(f"unknown asset {aid!r}")
            return
        # Never serve outside the asset's segment tree: reject absolute
        # paths and ``..`` before touching the encoder cache.
        if rel.startswith("/") or ".." in rel.split("/"):
            self.send_not_found()
            return
        target = ensure_seg_file(asset, rel)
        if target is None:
            self.send_not_found()
            return
        serve_file(self, target, _seg_mime(target))

    def get_thumb(self, ctx: WebContext, path: str, qs) -> None:
        name = routing.strip_prefix(path, "/thumb/")
        if name.endswith(".jpg"):
            name = name[: -len(".jpg")]
        asset = ctx.load_asset(name)
        if asset is None:
            self.send_not_found()
            return
        dest = ensure_thumb(asset)
        if dest is None:
            self.send_not_found()
            return
        serve_file(self, dest, MIME[".jpg"])

    def get_vendor(self, ctx: WebContext, path: str, qs) -> None:
        name = routing.strip_prefix(path, "/vendor/")
        if name not in VENDOR_FILES or "/" in name or "\\" in name:
            self.send_not_found()
            return
        serve_file(self, str(VENDOR_DIR / name), MIME[".js"])

    # -- JSON API ----------------------------------------------------------
    def api_videos(self, ctx: WebContext, path: str, qs) -> None:
        mapping = ctx.reg.rescan()
        out = [
            video_entry(ctx.cache_dir(), aid, abs_path, rel)
            for aid, (abs_path, rel) in sorted(mapping.items(), key=lambda kv: kv[1][1])
        ]
        self._json(200, out)

    def api_video(self, ctx: WebContext, path: str, qs) -> None:
        aid = routing.strip_prefix(path, "/api/video/")
        if not is_valid_id(aid):
            self.send_not_found()
            return
        resolved = ctx.resolve(aid)
        if resolved is None:
            self.send_not_found(f"unknown asset {aid!r}")
            return
        asset, rel = resolved
        self._json(200, video_detail(asset, rel))

    def api_quality(self, ctx: WebContext, path: str, qs) -> None:
        if ctx.readahead is None:
            self._text(500, "readahead not initialised")
            return
        aid = (qs.get("asset") or [""])[0]
        rep = (qs.get("rep") or [""])[0]
        asset = ctx.load_asset(aid)
        if asset is None:
            self.send_not_found(f"unknown asset {aid!r}")
            return
        valid = ctx.valid_reps(asset)
        if rep not in valid:
            self._text(400, f"rep must be one of {valid}")
            return
        ctx.readahead.set_quality(aid, rep)
        self._json(200, {"ok": True, "asset": aid, "rep": rep})

    def api_status(self, ctx: WebContext, path: str, qs) -> None:
        if ctx.readahead is None:
            self._text(500, "readahead not initialised")
            return
        aid = (qs.get("asset") or [""])[0]
        asset = ctx.load_asset(aid)
        if asset is None:
            self.send_not_found()
            return
        info = asset.info
        cache_dir = ctx.cache_dir()
        counts = {
            rid: count_m4s(generation.video_target(cache_dir, aid, rid))
            for rid in [DIRECT_REP, *[f"{h}p" for h, _ in info.transcode_ladder]]
        }
        for index in range(len(info.audios)):
            for arep in ctx.audio_reps():
                counts[f"audio{index}-{arep}"] = count_m4s(
                    generation.audio_target(cache_dir, aid, index, arep)
                )
        self._json(
            200,
            {
                "asset": aid,
                "duration": info.duration,
                "readahead": ctx.readahead.current(aid),
                "segments": counts,
                "boundaries": info.boundaries[:_BOUNDARIES_LIMIT],
            },
        )


def _seg_mime(target: str) -> str:
    ext = os.path.splitext(target)[1].lower()
    if ext in MIME:
        return MIME[ext]
    return _SEG_CHUNK_FALLBACK_MIME


_GETTERS = {
    Route.BROWSE: Handler.get_browse,
    Route.WATCH: Handler.get_watch,
    Route.MPD: Handler.get_mpd,
    Route.SEG: Handler.get_seg,
    Route.THUMB: Handler.get_thumb,
    Route.VENDOR: Handler.get_vendor,
    Route.API_VIDEOS: Handler.api_videos,
    Route.API_VIDEO: Handler.api_video,
    Route.API_QUALITY: Handler.api_quality,
    Route.API_STATUS: Handler.api_status,
}
