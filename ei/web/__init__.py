"""ei.web — HTTP serving layer: routing, auth, pages, API views."""

from ei.web.assets import AUDIO_FALLBACK_REP, DIRECT_REP
from ei.web.auth import (
    COOKIE_NAME,
    clear_session_cookie,
    cookie_token,
    make_session_cookie,
)
from ei.web.context import WebContext, current_context
from ei.web.pages import page_browse, page_login, page_watch
from ei.web.routing import ByteRange, Route, parse_range, resolve_range, route
from ei.web.session import SESSION_TTL_SECONDS, SessionStore
from ei.web.static import MIME, VENDOR_DIR, VENDOR_FILES, cache_control_for, mime_for
from ei.web.views import VideoDetail, VideoEntry, video_detail, video_entry

__all__ = [
    "AUDIO_FALLBACK_REP",
    "DIRECT_REP",
    "COOKIE_NAME",
    "MIME",
    "SESSION_TTL_SECONDS",
    "VENDOR_DIR",
    "VENDOR_FILES",
    "ByteRange",
    "Route",
    "SessionStore",
    "VideoDetail",
    "VideoEntry",
    "WebContext",
    "cache_control_for",
    "clear_session_cookie",
    "cookie_token",
    "current_context",
    "make_session_cookie",
    "mime_for",
    "page_browse",
    "page_login",
    "page_watch",
    "parse_range",
    "resolve_range",
    "route",
    "video_detail",
    "video_entry",
]
