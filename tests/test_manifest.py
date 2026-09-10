import pytest

from ei.media import manifest
from ei.media.models import audio_fallback_needed
from ei.web.static import cache_control_for


@pytest.mark.parametrize(
    ("codec", "transcode", "want"),
    [
        ("aac", True, False),
        ("aac", False, False),
        ("ac3", True, True),
        ("eac3", True, True),
        ("mp3", True, True),
        ("ac3", False, False),
    ],
)
def test_audio_fallback_needed(codec, transcode, want):
    assert audio_fallback_needed(codec, transcode) is want


@pytest.mark.parametrize(
    ("path", "ctype", "want"),
    [
        ("/c/a/direct/init.mp4", "video/mp4", "no-cache"),
        ("/c/a/aac192/init.mp4", "video/mp4", "no-cache"),
        ("/c/direct/video/000001.m4s", "video/iso.segment", "public, max-age=3600"),
        ("/x/m.mpd", "application/dash+xml", "no-cache"),
    ],
)
def test_cache_control_init_revalidates(path, ctype, want):
    assert cache_control_for(path, ctype) == want


@pytest.mark.parametrize(
    ("ticks", "present", "absent"),
    [
        ([0, 100, 200, 300, 450], ('r="2"', 'd="100"', 'd="150"'), ()),
        ([0, 90, 200], (), ("r=",)),
    ],
)
def test_timeline_runs(ticks, present, absent):
    tl = manifest._timeline(ticks)
    assert all(p in tl for p in present) and all(a not in tl for a in absent)


@pytest.mark.parametrize("ticks", [[5], []])
def test_timeline_single_tick_edge(ticks):
    assert manifest._timeline(ticks) == ""


@pytest.mark.parametrize(
    ("kw", "count", "rep"),
    [
        ({}, 3, None),
        ({"only": "direct"}, 1, 'id="direct"'),
        ({"only": "480p"}, 1, 'id="480p"'),
    ],
)
def test_build_mpd_rep_filtering(info, kw, count, rep):
    mpd = manifest.build_mpd(info, **kw)
    assert mpd.count('mimeType="video/mp4" bandwidth') == count
    if rep:
        assert rep in mpd
    else:
        assert "/seg/ab12cd34ef56ab78/" in mpd and "presentationTimeOffset" in mpd


def test_build_mpd_audio_and_text(info):
    from ei.media import models as models_mod

    info.texts = [
        models_mod.TextTrack(
            ordinal=0, stream_index=2, codec="subrip", lang="eng", title="CC"
        )
    ]
    mpd = manifest.build_mpd(info)
    assert all(
        s in mpd
        for s in (
            "text/vtt",
            "text0.vtt",
            "audio0/direct/init.mp4",
        )
    )
    # AAC plays direct everywhere aac192 would: no fallback rep offered.
    assert "audio0/aac192/init.mp4" not in mpd


def test_build_mpd_audio_fallback_for_non_aac(info):
    info.audios[0].codec = "ac3"
    info.audios[0].codec_str = "ac-3"
    mpd = manifest.build_mpd(info)
    assert "audio0/direct/init.mp4" in mpd
    assert "audio0/aac192/init.mp4" in mpd


def test_build_mpd_transcode_off_direct_only(info):
    mpd = manifest.build_mpd(info, transcode=False)
    assert mpd.count('mimeType="video/mp4" bandwidth') == 1
    assert "audio0/direct/init.mp4" in mpd
    assert 'id="direct"' in mpd and "aac192" not in mpd
