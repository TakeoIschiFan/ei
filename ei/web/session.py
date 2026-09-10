"""PIN session store (owns the PIN + issued tokens; no media knowledge)."""

from __future__ import annotations

import hmac
import secrets
import threading
import time

#: Lifetime of an issued login token, in seconds.
SESSION_TTL_SECONDS = 24 * 3600


class SessionStore:
    """In-memory PIN + bearer-token store with expiring tokens."""

    def __init__(self, pin: str | None = None):
        self._pin = pin
        self._tokens: dict[str, float] = {}
        self._lock = threading.Lock()

    @property
    def pin(self) -> str | None:
        return self._pin

    @property
    def auth_disabled(self) -> bool:
        """True when running with ``--no-pin`` (open mode)."""
        return self._pin is None

    def issue_token(self, ttl: float = SESSION_TTL_SECONDS) -> str:
        token = secrets.token_hex(16)
        with self._lock:
            self._tokens[token] = time.time() + ttl
            self._prune_expired_locked()
        return token

    def check_token(self, token: str | None) -> bool:
        if self._pin is None:
            return True
        if not token:
            return False
        with self._lock:
            expiry = self._tokens.get(token)
            if expiry is None:
                return False
            if expiry < time.time():
                del self._tokens[token]
                return False
            return True

    def check_pin(self, candidate: str) -> bool:
        """Constant-time PIN comparison."""
        if self._pin is None:
            return True
        return hmac.compare_digest(candidate.strip(), self._pin)

    def revoke(self, token: str) -> None:
        with self._lock:
            self._tokens.pop(token, None)

    def prune_expired(self) -> int:
        with self._lock:
            return self._prune_expired_locked()

    def _prune_expired_locked(self) -> int:
        now = time.time()
        expired = [t for t, exp in self._tokens.items() if exp < now]
        for token in expired:
            del self._tokens[token]
        return len(expired)
