"""Asset registry: library paths + per-asset locks."""

from __future__ import annotations

import logging
import os
import threading
from collections.abc import Callable

from ei.media import cache as cache_mod
from ei.media import meta as meta_mod
from ei.media import probe as probe_mod
from ei.media.ids import is_valid_id
from ei.media.library import has_video_stream, scan_library
from ei.media.models import AssetInfo
from ei.media.paths import meta_path

log = logging.getLogger(__name__)


class KeyedLocks:
    def __init__(self):
        self._guard = threading.Lock()
        self._locks: dict[str, threading.Lock] = {}

    def lock_for(self, key: str) -> threading.Lock:
        with self._guard:
            return self._locks.setdefault(key, threading.Lock())


class Asset:
    def __init__(self, info: AssetInfo):
        self.info = info
        self.locks = KeyedLocks()

    def lock_for(self, key: str) -> threading.Lock:
        return self.locks.lock_for(key)


class Registry:
    def __init__(
        self,
        media_dir: str,
        cache_dir: str,
        recursive: bool = False,
        is_video: Callable[[str], bool] | None = has_video_stream,
        max_cache_bytes: int = cache_mod.DEFAULT_CACHE_SIZE,
    ):
        self.media_dir = os.path.abspath(media_dir)
        self.cache_dir = cache_dir
        self.recursive = recursive
        self.is_video = is_video
        self.max_cache_bytes = max_cache_bytes
        self.lock = threading.Lock()
        self.assets: dict[str, Asset] = {}
        self.paths: dict[str, tuple[str, str]] = {}
        self.load_locks = KeyedLocks()
        self.thumb_locks = KeyedLocks()
        self.cache_limiter = cache_mod.CacheLimiter()
        os.makedirs(cache_dir, exist_ok=True)
        os.makedirs(self.thumbs_dir(), exist_ok=True)

    def thumbs_dir(self) -> str:
        return os.path.join(self.cache_dir, "thumbs")

    def thumb_lock_for(self, key: str) -> threading.Lock:
        return self.thumb_locks.lock_for(key)

    def prune_orphans(self) -> tuple[int, int]:
        with self.lock:
            live = set(self.paths.keys())
        return cache_mod.prune_orphans(self.cache_dir, live)

    def enforce_cache_limit(self, force: bool = False) -> tuple[int, int]:
        return self.cache_limiter.maybe_enforce(
            self.cache_dir, self.max_cache_bytes, force=force
        )

    def rescan(self):
        m = scan_library(
            self.media_dir, is_video=self.is_video, recursive=self.recursive
        )
        with self.lock:
            self.paths = m
        return dict(m)

    def lookup(self, aid: str):
        with self.lock:
            hit = self.paths.get(aid)
        if hit is not None:
            return hit
        return self.rescan().get(aid)

    def get(self, aid: str) -> Asset | None:
        if not is_valid_id(aid):
            return None
        with self.lock:
            asset = self.assets.get(aid)
        if asset is not None:
            return asset
        with self.load_locks.lock_for(aid):
            with self.lock:
                asset = self.assets.get(aid)
            if asset is not None:
                return asset
            return self._load(aid)

    def _load(self, aid: str) -> Asset | None:
        found = self.lookup(aid)
        if found is None:
            return None
        abs_path, _rel = found
        if not os.path.isfile(abs_path):
            return None
        info = meta_mod.load_info(self.cache_dir, aid, abs_path)
        if info is None:
            info = self._reprobe(aid, abs_path)
            if info is None:
                return None
        asset = Asset(info)
        with self.lock:
            self.assets[aid] = asset
        return asset

    def _reprobe(self, aid: str, abs_path: str) -> AssetInfo | None:
        if os.path.exists(meta_path(self.cache_dir, aid)):
            log.info("[probe] %s: source changed, purging cached segments", aid)
            cache_mod.invalidate_asset(self.cache_dir, aid)
        try:
            info = probe_mod.build_info(aid, abs_path)
        except Exception as e:
            log.warning("[probe] %s: %s", aid, e)
            return None
        try:
            meta_mod.save_info(self.cache_dir, info)
        except OSError as e:
            log.warning("[probe] save %s: %s", aid, e)
        return info
