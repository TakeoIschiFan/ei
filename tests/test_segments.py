"""Segment resolution gating (audio fallback reps)."""

import ei.media.state as state
from ei.media.registry import Asset, Registry
from ei.media.segments import resolve_job


def test_resolve_audio_skips_aac_fallback(info, tmp_path):
    media = tmp_path / "m"
    cache = tmp_path / "c"
    media.mkdir()
    state.bind(Registry(str(media), str(cache)), None, transcode=True)
    asset = Asset(info)
    assert info.audios[0].codec == "aac"
    assert resolve_job(asset, "audio0/aac192/000001.m4s") is None
    assert resolve_job(asset, "audio0/aac192/init.mp4") is None
    assert resolve_job(asset, "audio0/direct/000001.m4s") is not None
    assert resolve_job(asset, "audio0/direct/init.mp4") is not None


def test_resolve_audio_keeps_fallback_for_ac3(info, tmp_path):
    info.audios[0].codec = "ac3"
    info.audios[0].codec_str = "ac-3"
    media = tmp_path / "m"
    cache = tmp_path / "c"
    media.mkdir()
    state.bind(Registry(str(media), str(cache)), None, transcode=True)
    asset = Asset(info)
    # NOTE: resolving an aac192 rel starts the background audio pass
    # (existing warm-up behaviour); on the fake fixture path ffmpeg fails
    # fast and the thread exits. Only the job routing is asserted here.
    job = resolve_job(asset, "audio0/aac192/000002.m4s")
    assert job is not None and job.target.endswith("000002.m4s")
