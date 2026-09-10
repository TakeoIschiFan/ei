"""PIN + session-cookie helpers."""

from __future__ import annotations

from collections.abc import Mapping
from http import cookies

from ei.web.session import SESSION_TTL_SECONDS

COOKIE_NAME = "ei_session"


def cookie_token(headers: Mapping[str, str]) -> str | None:
    """Extract the session token from a ``Cookie`` header mapping.

    Never raises: malformed headers mean "unauthenticated", not an error.
    """
    raw = headers.get("Cookie")
    if not raw:
        return None
    jar = cookies.SimpleCookie()
    try:
        jar.load(raw)
    except cookies.CookieError:
        return None
    morsel = jar.get(COOKIE_NAME)
    if morsel is None:
        return None
    return morsel.value or None


def make_session_cookie(token: str) -> str:
    """Build the ``Set-Cookie`` value issued on successful login."""
    return (
        f"{COOKIE_NAME}={token}; HttpOnly; SameSite=Lax; Path=/; "
        f"Max-Age={SESSION_TTL_SECONDS}"
    )


def clear_session_cookie() -> str:
    """Build a ``Set-Cookie`` value that clears the session."""
    return f"{COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0"
