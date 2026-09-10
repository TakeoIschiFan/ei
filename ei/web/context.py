"""Request-scoped server context (single gateway to process-global state).

All HTTP handlers go through :class:`WebContext` instead of touching
``ei.media.state`` directly. In production the context is built from the
globals bound by :func:`ei.media.state.bind`; in tests it can be
constructed explicitly with fakes.
"""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field
from typing import TYPE_CHECKING

import ei.media.state as _state
from ei.media.models import audio_fallback_needed

if TYPE_CHECKING:  # pragma: no cover
    from ei.media.readahead import Readahead
    from ei.media.registry import Asset, Registry
    from ei.web.session import SessionStore

from ei.web.assets import audio_reps as _audio_reps
from ei.web.assets import first_audio_rel as _first_audio_rel
from ei.web.assets import transcode_reps as _transcode_reps
from ei.web.assets import valid_reps as _valid_reps

_preload_executor = ThreadPoolExecutor(max_workers=4, thread_name_prefix="ei-preload")


@dataclass(slots=True)
class WebContext:
    reg: Registry
    readahead: Readahead | None = None
    session: SessionStore | None = None
    transcode: bool = False
    preload_executor: ThreadPoolExecutor = field(default=_preload_executor)

    # -- assets ------------------------------------------------------
    def load_asset(self, aid: str) -> Asset | None:
        from ei.media.ids import is_valid_id

        if not is_valid_id(aid):
            return None
        return self.reg.get(aid)

    def resolve(self, aid: str) -> tuple[Asset, str] | None:
        """Return ``(asset, rel_path)`` or ``None`` for unknown/invalid ids."""
        found = self.reg.lookup(aid)
        if found is None:
            return None
        asset = self.reg.get(aid)
        if asset is None:
            return None
        return (asset, found[1])

    # -- representations ---------------------------------------------
    def transcode_reps(self, asset: Asset) -> list[str]:
        return _transcode_reps(asset, self.transcode)

    def valid_reps(self, asset: Asset) -> list[str]:
        return _valid_reps(asset, self.transcode)

    def audio_reps(self) -> tuple[str, ...]:
        return _audio_reps(self.transcode)

    def cache_dir(self) -> str:
        return self.reg.cache_dir

    # -- behaviour ----------------------------------------------------
    def kick_audio_first_segments(self, asset: Asset) -> None:
        """Pre-warm the first audio segment(s) in the background.

        dash.js requests audio before video; starting the ``aac192`` encode
        early hides first-segment latency for tracks that need the fallback
        (direct AAC plays as-is). Failures are swallowed — the on-demand
        path will retry synchronously.
        """

        areps = self.audio_reps()
        for index in range(len(asset.info.audios)):
            for arep in areps:
                if arep != "direct" and not audio_fallback_needed(
                    asset.info.audios[index].codec, self.transcode
                ):
                    continue
                rel = _first_audio_rel(index, arep)
                self.preload_executor.submit(_logged_ensure, asset, rel)

    # -- auth ---------------------------------------------------------
    def authed(self, token: str | None) -> bool:
        if self.session is None:
            return False
        return self.session.check_token(token)


def _logged_ensure(asset: Asset, rel: str) -> None:
    import logging

    from ei.media.segments import ensure_seg_file

    try:
        ensure_seg_file(asset, rel)
    except Exception:  # noqa: BLE001 - background pre-warm must never crash
        logging.getLogger(__name__).exception("preload failed for %s", rel)


def current_context() -> WebContext:
    """Build a context from the process globals (raises if unbound)."""
    ctx = _state.ctx()
    return WebContext(
        reg=ctx.registry,
        readahead=ctx.readahead,
        session=ctx.session,
        transcode=ctx.transcode,
    )
