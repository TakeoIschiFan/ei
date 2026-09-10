"""Asset helpers for HTTP handlers: lookup, rep gating, audio kick-off."""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from typing import TYPE_CHECKING

import ei.media.state as _state
from ei.media.ids import is_valid_id
from ei.media.segments import ensure_seg_file

if TYPE_CHECKING:  # pragma: no cover
    from ei.media.registry import Asset

DIRECT_REP = "direct"
AUDIO_FALLBACK_REP = "aac192"


def load_asset(aid: str) -> Asset | None:
    if not is_valid_id(aid):
        return None
    return _state.ctx().registry.get(aid)


def _transcode_on(transcode: bool | None) -> bool:
    return _state.ctx().transcode if transcode is None else transcode


def valid_reps(asset: Asset, transcode: bool | None = None) -> list[str]:
    reps = [DIRECT_REP]
    if _transcode_on(transcode):
        reps += [f"{h}p" for h, _ in asset.info.transcode_ladder]
    return reps


def transcode_reps(asset: Asset, transcode: bool | None = None) -> list[str]:
    if not _transcode_on(transcode):
        return []
    return [f"{h}p" for h, _ in asset.info.transcode_ladder]


def audio_reps(transcode: bool | None = None) -> tuple[str, ...]:
    if _transcode_on(transcode):
        return (DIRECT_REP, AUDIO_FALLBACK_REP)
    return (DIRECT_REP,)


def first_audio_rel(index: int, arep: str) -> str:
    return f"audio{index}/{arep}/000001.m4s"


def kick_audio_first_segments(asset: Asset) -> None:
    """Pre-warm first audio segments via the shared executor.

    Fire-and-forget: failures are logged and swallowed — the
    on-demand path retries synchronously.
    """
    executor = _preload_executor()
    for j in range(len(asset.info.audios)):
        for arep in audio_reps():
            executor.submit(_logged_ensure, asset, first_audio_rel(j, arep))


_executor: ThreadPoolExecutor | None = None


def _preload_executor() -> ThreadPoolExecutor:
    global _executor
    if _executor is None:
        _executor = ThreadPoolExecutor(max_workers=4, thread_name_prefix="ei-preload")
    return _executor


def _logged_ensure(asset: Asset, rel: str) -> None:
    import logging

    try:
        ensure_seg_file(asset, rel)
    except Exception:  # noqa: BLE001 - background pre-warm must never crash
        logging.getLogger(__name__).exception("preload failed for %s", rel)
