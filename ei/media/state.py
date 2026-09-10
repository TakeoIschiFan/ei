"""Process-global server state (single ServerContext)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:  # pragma: no cover
    from ei.media.readahead import Readahead
    from ei.media.registry import Registry
    from ei.web.session import SessionStore


@dataclass
class ServerContext:
    registry: Registry
    readahead: Readahead | None = None
    transcode: bool = False
    video_encoder: str = "libx264"
    session: SessionStore | None = None


_ctx: ServerContext | None = None


class ServerNotInitialised(RuntimeError):
    pass


def bind(
    registry: Registry,
    readahead: Readahead | None = None,
    transcode: bool = False,
    video_encoder: str = "libx264",
    session: SessionStore | None = None,
) -> ServerContext:
    global _ctx
    _ctx = ServerContext(
        registry=registry,
        readahead=readahead,
        transcode=transcode,
        video_encoder=video_encoder,
        session=session,
    )
    return _ctx


def ctx() -> ServerContext:
    if _ctx is None:
        raise ServerNotInitialised("server state not initialised")
    return _ctx


def cache_dir() -> str:
    return ctx().registry.cache_dir
