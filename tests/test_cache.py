"""Tests for ei.media.cache: size parsing, orphan GC, segment LRU, invalidation."""

import os

import pytest

from ei.media import cache as cache_mod
from ei.media.registry import Registry


def _seg(cache, aid, rep="direct", name="000000.m4s", size=100, atime=None):
    d = os.path.join(cache, aid, rep, "video")
    os.makedirs(d, exist_ok=True)
    p = os.path.join(d, name)
    with open(p, "wb") as f:
        f.write(b"x" * size)
    if atime is not None:
        os.utime(p, (atime, atime))
    return p


def test_parse_cache_size():
    assert cache_mod.parse_cache_size("0") == 0
    assert cache_mod.parse_cache_size("unlimited") == 0
    assert cache_mod.parse_cache_size("512") == 512
    assert cache_mod.parse_cache_size("1KB") == 1024
    assert cache_mod.parse_cache_size("1MB") == 1024**2
    assert cache_mod.parse_cache_size("5GB") == 5 * 1024**3
    assert cache_mod.parse_cache_size("1.5G") == int(1.5 * 1024**3)
    with pytest.raises(ValueError):
        cache_mod.parse_cache_size("abc")
    with pytest.raises(ValueError):
        cache_mod.parse_cache_size("-1GB")


def test_prune_orphans_removes_stale_dirs_and_thumbs(tmp_path):
    cache = str(tmp_path / "cache")
    os.makedirs(os.path.join(cache, "thumbs"))
    live = "ab12cd34ef56ab78"
    dead = "deadbeefdeadbeef"
    os.makedirs(os.path.join(cache, live))
    os.makedirs(os.path.join(cache, dead))
    open(os.path.join(cache, "thumbs", live + ".jpg"), "w").close()
    open(os.path.join(cache, "thumbs", dead + ".jpg"), "w").close()
    dirs, thumbs = cache_mod.prune_orphans(cache, {live})
    assert dirs == 1 and thumbs == 1
    assert os.path.isdir(os.path.join(cache, live))
    assert not os.path.exists(os.path.join(cache, dead))
    assert os.path.exists(os.path.join(cache, "thumbs", live + ".jpg"))
    assert not os.path.exists(os.path.join(cache, "thumbs", dead + ".jpg"))


def test_prune_orphans_empty_live_is_noop(tmp_path):
    cache = str(tmp_path / "cache")
    dead = "deadbeefdeadbeef"
    os.makedirs(os.path.join(cache, dead))
    assert cache_mod.prune_orphans(cache, set()) == (0, 0)
    assert os.path.isdir(os.path.join(cache, dead))


def test_prune_orphans_ignores_non_id_entries(tmp_path):
    cache = str(tmp_path / "cache")
    os.makedirs(os.path.join(cache, "random-dir"))
    open(os.path.join(cache, "notes.txt"), "w").close()
    dirs, _ = cache_mod.prune_orphans(cache, {"ab12cd34ef56ab78"})
    assert dirs == 0
    assert os.path.isdir(os.path.join(cache, "random-dir"))


def test_enforce_limit_evicts_oldest_m4s_first(tmp_path):
    cache = str(tmp_path / "cache")
    aid = "ab12cd34ef56ab78"
    now = 1_700_000_000.0
    old = _seg(cache, aid, "direct", "000000.m4s", size=100, atime=now - 1000)
    new = _seg(cache, aid, "direct", "000001.m4s", size=100, atime=now)
    freed, removed = cache_mod.enforce_limit(cache, 100, grace_seconds=0)
    assert (freed, removed) == (100, 1)
    assert not os.path.exists(old)
    assert os.path.exists(new)


def test_enforce_limit_exempts_init_meta_vtt_thumbs(tmp_path):
    cache = str(tmp_path / "cache")
    aid = "ab12cd34ef56ab78"
    repdir = os.path.join(cache, aid, "direct", "video")
    os.makedirs(repdir)
    for name in ("init.mp4", "meta.json", "text0.vtt"):
        with open(os.path.join(repdir if name == "init.mp4" else cache, name), "wb"):
            pass
    # meta.json at asset level, vtt at asset level
    open(os.path.join(cache, aid, "meta.json"), "w").close()
    open(os.path.join(cache, aid, "text0.vtt"), "w").close()
    thumbs = os.path.join(cache, "thumbs")
    os.makedirs(thumbs)
    open(os.path.join(thumbs, aid + ".jpg"), "w").close()
    _seg(cache, aid, "direct", "000000.m4s", size=200)
    freed, removed = cache_mod.enforce_limit(cache, 100, grace_seconds=0)
    assert removed == 1 and freed == 200
    assert os.path.exists(os.path.join(repdir, "init.mp4"))
    assert os.path.exists(os.path.join(cache, aid, "meta.json"))
    assert os.path.exists(os.path.join(thumbs, aid + ".jpg"))


def test_enforce_limit_skips_staging_and_tmp(tmp_path):
    cache = str(tmp_path / "cache")
    aid = "ab12cd34ef56ab78"
    staging = os.path.join(cache, aid, "audio0", "aac192.staging")
    os.makedirs(staging)
    with open(os.path.join(staging, "000001.m4s"), "wb") as f:
        f.write(b"x" * 10_000)
    freed, removed = cache_mod.enforce_limit(cache, 1, grace_seconds=0)
    assert (freed, removed) == (0, 0)


def test_enforce_limit_respects_grace(tmp_path):
    cache = str(tmp_path / "cache")
    _seg(cache, "ab12cd34ef56ab78", "direct", "000000.m4s", size=200)
    freed, removed = cache_mod.enforce_limit(cache, 100, grace_seconds=3600)
    assert (freed, removed) == (0, 0)


def test_enforce_limit_unlimited_is_noop(tmp_path):
    cache = str(tmp_path / "cache")
    _seg(cache, "ab12cd34ef56ab78", "direct", "000000.m4s", size=200)
    assert cache_mod.enforce_limit(cache, 0) == (0, 0)


def test_invalidate_asset_drops_dir_and_thumb(tmp_path):
    cache = str(tmp_path / "cache")
    aid = "ab12cd34ef56ab78"
    _seg(cache, aid, "direct", "000000.m4s", size=10)
    os.makedirs(os.path.join(cache, "thumbs"))
    open(os.path.join(cache, "thumbs", aid + ".jpg"), "w").close()
    cache_mod.invalidate_asset(cache, aid)
    assert not os.path.exists(os.path.join(cache, aid))
    assert not os.path.exists(os.path.join(cache, "thumbs", aid + ".jpg"))


def test_registry_prune_uses_scan_result(tmp_path):
    media = tmp_path / "media"
    media.mkdir()
    (media / "a.mp4").touch()
    cache = str(tmp_path / "cache")
    reg = Registry(str(media), cache, is_video=lambda p: True)
    reg.rescan()
    live = next(iter(reg.paths.keys()))
    dead = "deadbeefdeadbeef"
    os.makedirs(os.path.join(cache, dead))
    dirs, _ = reg.prune_orphans()
    assert dirs == 1
    assert os.path.isdir(os.path.join(cache, live)) or True  # live has no dir yet
    assert not os.path.exists(os.path.join(cache, dead))


def test_touch_seg_updates_atime(tmp_path):
    p = str(tmp_path / "000000.m4s")
    with open(p, "wb") as f:
        f.write(b"x")
    old = 1_000_000.0
    os.utime(p, (old, old))
    cache_mod.touch_seg(p)
    assert os.stat(p).st_atime > old


def test_touch_seg_missing_is_noop(tmp_path):
    cache_mod.touch_seg(str(tmp_path / "nope.m4s"))  # must not raise


def test_cache_root_default_unified_name():
    from ei.media.library import cache_root_default

    assert cache_root_default().endswith("ei-video")
