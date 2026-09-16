"""Sidecar .srt/.vtt discovery, labelling, and serving."""

from __future__ import annotations

import os
from pathlib import Path

import pytest

import ei.media.state as state
from ei.media import generation, labels, manifest, sidecar
from ei.media import meta as meta_mod
from ei.media.ids import asset_id
from ei.media.models import TextTrack
from ei.media.registry import Asset, Registry
from ei.media.segments import resolve_job
from ei.web import views
from tests.conftest import make_info


@pytest.mark.parametrize(
    ("stem", "filename", "want"),
    [
        ("Movie", "Movie.srt", ("und", False, False)),
        ("Movie", "Movie.en.srt", ("en", False, False)),
        ("Movie", "Movie.eng.srt", ("eng", False, False)),
        ("Movie", "Movie.en.forced.vtt", ("en", True, False)),
        ("Movie", "Movie.forced.en.srt", ("en", True, False)),
        ("Movie", "Movie.sdh.srt", ("und", False, True)),
        ("Movie", "Movie.cc.srt", ("und", False, True)),
        ("Movie", "Movie.FORCED.SRT", ("und", True, False)),
        ("Movie.en", "Movie.en.srt", ("und", False, False)),
        # Strict: unknown token, multiple languages, locale, or full name.
        ("Movie", "Movie.1080p.en.srt", None),
        ("Movie", "Movie.en.zh.srt", None),
        ("Movie", "Movie.en.eng.srt", None),
        ("Movie", "Movie.pt-BR.srt", None),
        ("Movie", "Movie.english.srt", None),
        ("Movie", "MovieX.en.srt", None),
        ("Movie", "Movie.en.txt", None),
    ],
)
def test_parse_tags(stem, filename, want):
    assert sidecar.parse_tags(stem, filename) == want


def test_discover_sorted_and_filtered(tmp_path):
    for name in (
        "Movie.mkv",
        "Movie.cc.srt",
        "Movie.en.forced.vtt",
        "Movie.en.srt",
        "Movie.srt",
        "Movie.1080p.en.srt",
        "Other.srt",
    ):
        (tmp_path / name).write_bytes(b"content")
    (tmp_path / "Movie.empty.srt").write_bytes(b"")
    (tmp_path / "sub").mkdir()
    (tmp_path / "sub" / "Movie.en.srt").touch()
    os.symlink(tmp_path / "Movie.en.srt", tmp_path / "Movie.link.srt")

    tracks = sidecar.discover(str(tmp_path / "Movie.mkv"))
    assert [(os.path.basename(t.sidecar), t.lang, t.forced, t.sdh) for t in tracks] == [
        ("Movie.cc.srt", "und", False, True),
        ("Movie.en.forced.vtt", "en", True, False),
        ("Movie.en.srt", "en", False, False),
        ("Movie.srt", "und", False, False),
    ]
    assert [t.codec for t in tracks] == ["subrip", "webvtt", "subrip", "subrip"]


def test_labels_external():
    assert labels.text_label("eng", False, False, True) == "English (External)"
    assert (
        labels.text_label("en", True, True, True) == "English (Forced) (SDH) (External)"
    )
    assert labels.text_labels([("en", False, False, True)]) == ["English (External)"]


def _with_sidecar(tmp_path, video_name="v.mkv"):
    video = tmp_path / video_name
    video.write_bytes(b"video")
    srt = tmp_path / f"{Path(video_name).stem}.en.forced.srt"
    srt.write_text("1\n00:00:01,000 --> 00:00:02,000\nhi\n", encoding="utf-8")
    info = make_info(
        texts=[
            TextTrack(ordinal=0, stream_index=2, codec="subrip", lang="eng", title=""),
            TextTrack(
                ordinal=0,
                stream_index=0,
                codec="subrip",
                lang="en",
                title="",
                forced=True,
                sidecar=str(srt),
            ),
        ]
    )
    return info, video, srt


def test_manifest_and_detail_show_external_label(tmp_path):
    info, _, _ = _with_sidecar(tmp_path)
    mpd = manifest.build_mpd(info)
    assert 'label="English"' in mpd and 'label="English (Forced) (External)"' in mpd
    assert mpd.count('contentType="text"') == 2

    d = views.video_detail(Asset(info), "v.mkv")
    assert [t["label"] for t in d["texts"]] == [
        "English",
        "English (Forced) (External)",
    ]
    assert [t["external"] for t in d["texts"]] == [False, True]


def test_gen_vtt_copies_vtt_unchanged(tmp_path):
    src = tmp_path / "Movie.en.vtt"
    payload = b"WEBVTT\n\n00:00.000 --> 00:01.000\nhello\n"
    src.write_bytes(payload)
    info = make_info(
        texts=[
            TextTrack(
                ordinal=0,
                stream_index=0,
                codec="webvtt",
                lang="en",
                title="",
                sidecar=str(src),
            )
        ]
    )
    dest = tmp_path / "out" / "text0.vtt"
    generation.gen_vtt(info, 0, str(dest))
    assert dest.read_bytes() == payload


def test_gen_vtt_converts_srt_with_sidecar_as_input(tmp_path, monkeypatch):
    src = tmp_path / "Movie.en.srt"
    src.write_text("1\n00:00:01,000 --> 00:00:02,000\nhi\n", encoding="utf-8")
    info = make_info(
        texts=[
            TextTrack(
                ordinal=0,
                stream_index=0,
                codec="subrip",
                lang="en",
                title="",
                sidecar=str(src),
            )
        ]
    )
    calls = []

    def fake_run(cmd):
        calls.append(cmd)
        Path(cmd[-1]).write_bytes(b"WEBVTT\n")

    monkeypatch.setattr(generation, "_run", fake_run)
    dest = tmp_path / "out" / "text0.vtt"
    generation.gen_vtt(info, 0, str(dest))
    assert str(src) in calls[0] and "0:s:0" in calls[0]
    assert dest.exists()


def test_resolve_text_sidecar_target_and_missing(tmp_path):
    media = tmp_path / "media"
    media.mkdir()
    cache = tmp_path / "cache"
    state.bind(Registry(str(media), str(cache)), None)
    info, _, srt = _with_sidecar(media)

    embedded = resolve_job(Asset(info), "text0.vtt")
    assert embedded is not None and embedded.target == os.path.join(
        cache, info.name, "text0.vtt"
    )

    job = resolve_job(Asset(info), "text1.vtt")
    assert job is not None
    assert job.target == os.path.join(cache, info.name, "sidecar", "text1.vtt")

    srt.unlink()
    assert resolve_job(Asset(info), "text1.vtt") is None


def test_meta_does_not_persist_sidecars(tmp_path):
    info, _, srt = _with_sidecar(tmp_path)
    raw = meta_mod.to_dict(info)
    assert [t["lang"] for t in raw["texts"]] == ["eng"]
    assert srt.name  # source stays on disk; only discovery is process-scoped


def test_registry_sidecar_discovery_is_restart_only(tmp_path):
    media = tmp_path / "media"
    media.mkdir()
    cache = tmp_path / "cache"
    video = media / "v.mkv"
    video.write_bytes(b"video")
    aid = asset_id(os.path.abspath(str(video)))

    st = video.stat()
    info = make_info(name=aid)
    info.path, info.size, info.mtime = str(video), st.st_size, st.st_mtime
    meta_mod.save_info(str(cache), info)

    (cache / aid / "sidecar").mkdir()
    (cache / aid / "sidecar" / "text0.vtt").write_bytes(b"stale")

    reg = Registry(str(media), str(cache), is_video=lambda p: True)
    reg.rescan()
    (media / "v.en.srt").write_text("hi", encoding="utf-8")

    first = reg.get(aid)
    assert first is not None
    assert [t.lang for t in first.info.texts] == ["en"]
    # Load discards cached conversions so a restart re-reads the source.
    assert not (cache / aid / "sidecar").exists()

    # New sidecars are invisible until the process is recreated.
    (media / "v.fr.srt").write_text("salut", encoding="utf-8")
    assert [t.lang for t in reg.get(aid).info.texts] == ["en"]

    restarted = Registry(str(media), str(cache), is_video=lambda p: True)
    restarted.rescan()
    assert [t.lang for t in restarted.get(aid).info.texts] == ["en", "fr"]
