import json

import pytest

from ei.media import meta as meta_mod
from ei.media import probe as probe_mod
from tests.conftest import make_info


@pytest.fixture
def small_info():
    return make_info(
        duration=10.0,
        boundaries=[0.0, 3.0, 7.0],
        kf_dts=[0.0, 2.5, 6.5],
        transcode_ladder=[],
    )


def test_video_seg_durs(small_info):
    assert small_info.video_seg_durs(True) == [3.0, 4.0, 3.0]
    assert small_info.video_seg_durs(False) == pytest.approx([2.5, 4.0, 3.5])


def test_audio_seg_durs(small_info):
    assert small_info.audio_seg_durs(0) == [4.0, 4.0, 2.0]


@pytest.mark.parametrize(
    ("spec", "fallback", "want"),
    [("1/90000", 0, 90000), ("bogus", 42, 42), (None, 7, 7)],
)
def test_timescale_of(spec, fallback, want):
    assert probe_mod._timescale_of(spec, fallback) == want


def test_meta_roundtrip(small_info):
    back = meta_mod.from_dict(json.loads(json.dumps(meta_mod.to_dict(small_info))))
    assert (back.name, back.boundaries) == (small_info.name, small_info.boundaries)
    assert back.audios[0].landings == [0.0, 4.0, 8.0]


def test_load_rejects_stale(tmp_path, small_info):
    src = tmp_path / "v.mp4"
    src.write_bytes(b"0123456789")
    small_info.path = str(src)
    st = src.stat()
    small_info.size, small_info.mtime = st.st_size, st.st_mtime
    cache = str(tmp_path / "cache")
    meta_mod.save_info(cache, small_info)
    assert meta_mod.load_info(cache, small_info.name, str(src)) is not None
    src.write_bytes(b"0123456789more")
    assert meta_mod.load_info(cache, small_info.name, str(src)) is None
