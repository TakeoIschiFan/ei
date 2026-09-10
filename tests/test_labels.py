import pytest

from ei.media import labels, manifest
from ei.media.registry import Asset
from ei.web import views


@pytest.mark.parametrize(
    ("langs", "want"),
    [
        (["und"], ["Original"]),
        (["jpn", "eng"], ["Japanese", "English"]),
        (["und", "und"], ["Original", "Original 2"]),
        (["xyz"], ["xyz"]),
    ],
)
def test_audio_labels(langs, want):
    assert labels.audio_labels(langs) == want


@pytest.mark.parametrize(
    ("lang", "forced", "sdh", "want"),
    [
        ("eng", False, True, "English (SDH)"),
        ("eng", True, False, "English (Forced)"),
        ("und", False, False, "Original"),
    ],
)
def test_text_label(lang, forced, sdh, want):
    assert labels.text_label(lang, forced, sdh) == want


def test_mpd_labels(texted_info):
    mpd = manifest.build_mpd(texted_info)
    assert 'lang="und" label="Original"' in mpd
    assert 'label="English (SDH)"' in mpd and 'label="English (Forced)"' in mpd


def test_detail_labels(texted_info):
    d = views.video_detail(Asset(texted_info), "v.mkv")
    assert d["audios"][0]["label"] == "Original"
    assert [t["label"] for t in d["texts"]] == ["English (SDH)", "English (Forced)"]
