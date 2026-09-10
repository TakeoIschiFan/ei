"""HTML page rendering (templates/ shells + assets/ inlined via {{TOKENS}})."""

from __future__ import annotations

import html
import threading
from pathlib import Path

_PKG = Path(__file__).resolve().parent
TEMPLATES_DIR = _PKG / "templates"
ASSETS_DIR = _PKG / "assets"

_LOGIN_ERROR_HTML = "<p style='color:#f88;text-align:center'>wrong PIN</p>"

# Page token -> assets/ source file. Inlined once and cached.
_JS_TOKENS: dict[str, str] = {
    "JS_LOGIN": "login.js",
    "JS_BROWSE": "browse.js",
    "JS_WATCH": "watch.js",
}

_lock = threading.Lock()
_template_cache: dict[str, str] = {}
_asset_cache: dict[str, str] = {}
_page_cache: dict[str, str] = {}


def _read_text(base: Path, name: str) -> str:
    """Read ``base/name`` guarding against path traversal."""
    candidate = (base / name).resolve()
    if candidate.parent != base.resolve() or not candidate.is_file():
        raise FileNotFoundError(name)
    return candidate.read_text(encoding="utf-8")


def load_template(name: str) -> str:
    with _lock:
        cached = _template_cache.get(name)
    if cached is None:
        text = _read_text(TEMPLATES_DIR, name)
        with _lock:
            _template_cache[name] = text
        return text
    return cached


def load_client_asset(name: str) -> str:
    """Read a file from ``assets/`` (JS/CSS inlined into pages)."""
    with _lock:
        cached = _asset_cache.get(name)
    if cached is None:
        text = _read_text(ASSETS_DIR, name)
        with _lock:
            _asset_cache[name] = text
        return text
    return cached


def _inline_static_shell(template_name: str) -> str:
    """Template with CSS + JS inlined, but per-request tokens intact."""
    with _lock:
        cached = _page_cache.get(template_name)
    if cached is not None:
        return cached
    page = load_template(template_name).replace(
        "{{CSS}}", load_client_asset("style.css").rstrip("\n")
    )
    for token, filename in _JS_TOKENS.items():
        js = "\n" + load_client_asset(filename).rstrip("\n") + "\n"
        page = page.replace("{{" + token + "}}", js)
    with _lock:
        _page_cache[template_name] = page
    return page


def render(name: str, **tokens: str) -> str:
    """Substitute ``{{TOKEN}}`` placeholders with already-escaped values.

    Callers must pass user-controlled values pre-escaped (see
    :func:`page_watch`); static shells are cached so per-request work is
    only the token replacement.
    """
    page = _inline_static_shell(name)
    for key, value in tokens.items():
        if key == "TITLE":
            continue  # TITLE applied last on purpose (see below)
        page = page.replace("{{" + key + "}}", value)
    if "TITLE" in tokens:
        # TITLE appears twice in watch.html (<title> + <h2>); both get the
        # same escaped value. Replacing it last avoids a malicious filename
        # smuggling in a second placeholder like {{AID}}.
        page = page.replace("{{TITLE}}", tokens["TITLE"])
    return page


def clear_caches() -> None:
    """Drop all cached templates/assets (tests / dev reload)."""
    with _lock:
        _template_cache.clear()
        _asset_cache.clear()
        _page_cache.clear()


def page_login(error: bool = False) -> str:
    return render(
        "login.html",
        LOGIN_SHAKE="shake" if error else "",
        LOGIN_ERROR=_LOGIN_ERROR_HTML if error else "",
    )


def page_browse() -> str:
    return render("browse.html")


def page_watch(aid: str, title: str, vcodec: str = "", transcode: bool = False) -> str:
    # vcodec/transcode are stamped onto the element so watch.js can
    # pre-flight MSE codec support without waiting on /api/video.
    # Escape here — render() trusts its inputs.
    return render(
        "watch.html",
        AID=html.escape(aid, quote=True),
        VCODEC=html.escape(vcodec, quote=True),
        TRANSCODE="1" if transcode else "0",
        TITLE=html.escape(title),
    )
