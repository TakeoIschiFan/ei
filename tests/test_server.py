import os
from types import SimpleNamespace

import pytest

import ei.media.state as st
from ei.media.ids import asset_id, is_valid_id
from ei.media.library import scan_library
from ei.media.registry import Registry
from ei.web.assets import transcode_reps, valid_reps
from ei.web.auth import cookie_token
from ei.web.http import VENDOR_DIR, VENDOR_FILES
from ei.web.pages import page_browse, page_login, page_watch


def test_asset_id_format_and_stability():
    assert asset_id("/tmp/some/file.mp4").isalnum() and len(asset_id("/x.mp4")) == 16
    assert asset_id("/a/b.mp4") == asset_id("/a/b.mp4") != asset_id("/a/c.mp4")


@pytest.mark.parametrize(
    "bad", ["", "xyz", "AB12CD34EF56AB78", "ab12", "z" * 16, "../etc"]
)
def test_invalid_id_rejected(bad):
    assert not is_valid_id(bad)


def test_valid_id_accepted():
    assert is_valid_id("ab12cd34ef56ab78")


@pytest.mark.parametrize(
    ("header", "want"),
    [
        ("a=1; ei_session=abc123; b=2", "abc123"),
        ("", None),
        ("a@b=c", None),  # malformed Cookie headers: unauthenticated, never raises
        ("ei_session=", None),
    ],
)
def test_cookie_extract(header, want):
    assert cookie_token({"Cookie": header} if header else {}) == want


@pytest.fixture
def lib(tmp_path):
    (tmp_path / "sub").mkdir()
    (tmp_path / ".hdir").mkdir()
    for name in [
        "a.mp4",
        "B.MKV",
        ".hidden.mp4",
        "note.txt",
        "sub/c.webm",
        ".hdir/d.mp4",
    ]:
        (tmp_path / name).touch()
    (tmp_path / "link.mp4").symlink_to(tmp_path / "a.mp4")
    return tmp_path


def test_scan_rules(lib):
    rels = sorted(
        v[1]
        for v in scan_library(
            str(lib), {".mp4", ".mkv", ".webm"}, is_video=None, recursive=True
        ).values()
    )
    assert {"a.mp4", "B.MKV", os.path.join("sub", "c.webm")} <= set(rels)
    assert not {".hidden.mp4", "note.txt", "link.mp4"} & set(rels)
    assert not any(".hdir" in r for r in rels)


def test_scan_flat_by_default(tmp_path):
    (tmp_path / "sub").mkdir()
    (tmp_path / "a.mp4").touch()
    (tmp_path / "sub" / "c.mp4").touch()
    flat = scan_library(str(tmp_path), is_video=None, recursive=False)
    rec = scan_library(str(tmp_path), is_video=None, recursive=True)
    assert "a.mp4" in [v[1] for v in flat.values()]
    assert not any(v[1].startswith("sub") for v in flat.values())
    assert os.path.join("sub", "c.mp4") in [v[1] for v in rec.values()]


def test_scan_probe_filters(tmp_path):
    (tmp_path / "a.mp4").touch()
    (tmp_path / "b.mp4").touch()
    rels = [
        v[1]
        for v in scan_library(
            str(tmp_path), is_video=lambda p: p.endswith("a.mp4")
        ).values()
    ]
    assert "a.mp4" in rels and "b.mp4" not in rels


def test_registry_creates_cache_dirs(tmp_path):
    (tmp_path / "media" / "a.mp4").parent.mkdir(parents=True)
    (tmp_path / "media" / "a.mp4").touch()
    cache = str(tmp_path / "cache" / "ei")
    reg = Registry(str(tmp_path / "media"), cache, is_video=lambda p: True)
    assert all(map(os.path.isdir, (cache, reg.thumbs_dir())))
    st.bind(reg, None)
    assert st.ctx().registry is reg


WATCH_MUST = (
    "<dash-video id=dv slot=media",
    "import '/vendor/media-chrome.js'",
    "import '/vendor/media-chrome-menu.js'",
    "import '/vendor/dash-video-element.js'",
    "<media-rendition-menu hidden anchor=auto>",
    "<media-rendition-menu-button>",
    "<media-audio-track-menu hidden anchor=auto>",
    "<media-audio-track-menu-button>",
    "<media-captions-menu hidden anchor=auto>",
    "<media-captions-menu-button>",
    "addAudioTrack",
    "removeAudioTrack",
    "getTracksFor",
    "setCurrentTrack",
    "LS.set('pos'",
    "/api/quality?asset=",
    "videoRenditions",
    "selectedIndex",
    "a.on('error'",
    "MediaSource.isTypeSupported",
    "showPlayerErr",
    "<media-time-range></media-time-range>",
    "media-volume-range[mediavolumeunavailable]",
    "data-acodec=",
    "id=trackWarn",
    "media-controller:not([breakpointmd])",
    "media-controller:not([breakpointsm])",
)
WATCH_MUST_NOT = (
    "<video id=v slot=media",
    "dash.all.min.js",
    "https://",
    "data-rep",
    "id=apop",
    "ei-pop",
)


def test_watch_player_contract():
    p = page_watch("ab12cd34ef56ab78", "vid.mp4")
    assert all(s in p for s in WATCH_MUST) and all(s not in p for s in WATCH_MUST_NOT)


def test_vendor_allowlist():
    assert all(os.path.isfile(os.path.join(VENDOR_DIR, f)) for f in VENDOR_FILES)
    assert "README.md" not in VENDOR_FILES


def test_browse_and_login_smoke():
    assert "id=grid" in page_browse() and "/api/videos" in page_browse()
    assert "action='/login'" in page_login() and "pin-dots" in page_login()
    assert "wrong PIN" in page_login(error=True)


def test_no_unrendered_tokens():
    # assets/*.js + style.css are inlined at render; no {{TOKEN}} placeholder
    # may survive into served HTML.
    for p in (
        page_browse(),
        page_login(),
        page_login(error=True),
        page_watch("ab12cd34ef56ab78", "T <tle> & Co"),
    ):
        assert "{{" not in p


@pytest.mark.parametrize(
    ("vcodec", "transcode"), [("hevc", True), ("mpeg2video", False)]
)
def test_watch_capability_stamping(vcodec, transcode):
    p = page_watch("ab12cd34ef56ab78", "vid.mp4", vcodec, transcode)
    assert f"data-vcodec='{vcodec}'" in p
    assert f"data-transcode='{int(transcode)}'" in p
    assert all(
        s in p
        for s in ("id=playerErr", "id=ovMsg", "id=ovHint", "class=overlay hidden")
    )


def test_watch_vcodec_attribute_escaped():
    p = page_watch("ab12cd34ef56ab78", "vid.mp4", "h2'5", False)
    assert "data-vcodec='h2&#x27;5'" in p and "data-vcodec='h2'" not in p


@pytest.mark.parametrize("transcode", [False, True])
def test_transcode_gate(transcode):
    from ei.media import state as st_mod

    asset = SimpleNamespace(info=SimpleNamespace(transcode_ladder=[(720, 1)]))
    reg = SimpleNamespace(get=lambda aid: asset)
    st_mod.bind(reg, SimpleNamespace(), transcode=transcode)
    assert valid_reps(asset) == (["direct", "720p"] if transcode else ["direct"])
    assert transcode_reps(asset) == (["720p"] if transcode else [])
