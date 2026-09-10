"""Background readahead worker: pre-generate upcoming segments per asset."""

from __future__ import annotations

import concurrent.futures
import logging
import threading
from dataclasses import dataclass

from ei.media import generation
from ei.media.models import AssetInfo, audio_fallback_needed
from ei.media.paths import audio_target
from ei.media.registry import Asset, Registry
from ei.media.segments import ensure_seg_file
from ei.media.timelines import count_for_window

log = logging.getLogger(__name__)

READAHEAD_SECONDS = 300.0
READAHEAD_MAX_SEGMENTS = 400


@dataclass
class ReadaheadState:
    epoch: int = 0
    rep: str | None = None


class Readahead:
    def __init__(self, reg: Registry, max_workers: int = 1):
        self.reg = reg
        self.lock = threading.Lock()
        self.state: dict[str, ReadaheadState] = {}
        self._executor = concurrent.futures.ThreadPoolExecutor(
            max_workers=max_workers, thread_name_prefix="readahead"
        )

    def set_quality(self, aid: str, rep: str) -> None:
        with self.lock:
            st = self.state.setdefault(aid, ReadaheadState())
            if st.rep == rep:
                return
            st.rep, st.epoch = rep, st.epoch + 1
            epoch = st.epoch
        self._executor.submit(self._run, aid, rep, epoch)
        log.info("[readahead] %s: quality -> %s", aid, rep)

    def current(self, aid: str) -> str | None:
        with self.lock:
            st = self.state.get(aid)
            return st.rep if st else None

    def _live(self, aid: str, rep: str, epoch: int) -> bool:
        with self.lock:
            st = self.state.get(aid)
            return st is not None and (st.epoch, st.rep) == (epoch, rep)

    def shutdown(self, wait: bool = False) -> None:
        self._executor.shutdown(wait=wait, cancel_futures=True)

    def _run(self, aid: str, rep: str, epoch: int) -> None:
        import ei.media.state as _state

        asset = self.reg.get(aid)
        if not asset:
            return
        try:
            self._readahead_video(asset, asset.info, aid, rep, epoch)
            self._readahead_audio(
                asset,
                asset.info,
                aid,
                rep,
                epoch,
                transcode=_state.ctx().transcode,
                cache_dir=_state.cache_dir(),
            )
        except generation.GenError as e:
            log.warning("[readahead] %s: %s", aid, e)
        except OSError as e:
            log.warning("[readahead] %s I/O: %s", aid, e)

    def _readahead_video(
        self, asset: Asset, info: AssetInfo, aid: str, rep: str, epoch: int
    ) -> None:
        n = count_for_window(
            info.video_seg_durs(rep != "direct"),
            READAHEAD_SECONDS,
            READAHEAD_MAX_SEGMENTS,
        )
        for i in range(n):
            if not self._live(aid, rep, epoch):
                return
            ensure_seg_file(asset, f"{rep}/video/{i:06d}.m4s")

    def _readahead_audio(
        self,
        asset: Asset,
        info: AssetInfo,
        aid: str,
        rep: str,
        epoch: int,
        transcode: bool,
        cache_dir: str,
    ) -> None:
        for j in range(len(info.audios)):
            if audio_fallback_needed(info.audios[j].codec, transcode):
                generation.ensure_audio_pass(
                    info, j, "aac192", audio_target(cache_dir, aid, j, "aac192")
                )
            n = count_for_window(
                info.audio_seg_durs(j), READAHEAD_SECONDS, READAHEAD_MAX_SEGMENTS
            )
            for i in range(1, n + 1):
                if not self._live(aid, rep, epoch):
                    return
                ensure_seg_file(asset, f"audio{j}/direct/{i:06d}.m4s")
