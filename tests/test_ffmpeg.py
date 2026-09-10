import pytest

from ei.cli import parse_args
from ei.media import ffmpeg as ff
from ei.media import ffmpeg_recipes as rc
from ei.media import generation
from ei.media.encoder import resolve_video_encoder
from ei.media.ffmpeg_recipes import TrimWindow
from ei.media.quality import DEFAULT_VIDEO_ENCODER


@pytest.mark.parametrize(
    ("name", "want"),
    [
        ("a.mp4", ["-ignore_editlist", "1"]),
        ("A.MOV", ["-ignore_editlist", "1"]),
        ("a.mkv", []),
        ("a.ts", []),
    ],
)
def test_input_flags_mov_only(name, want):
    assert rc.ffmpeg_input_flags(name) == want


def test_summary_probe_args():
    args = rc.summary_probe_args()
    assert "format=duration,size" in args
    assert "ffprobe" not in args and "/x/v.mp4" not in args


def test_thumb_cmd():
    cmd = rc.thumb_cmd("/x/v.mp4", "5", "/tmp/t.jpg")
    assert cmd[0] == "ffmpeg"
    assert {"-ss", "5", "scale=320:-2"} <= set(cmd)


def test_vtt_cmd():
    cmd = rc.vtt_cmd("/x/v.mp4", 2, "/tmp/t.vtt")
    assert {"0:s:2", "webvtt"} <= set(cmd)


def test_gen_error_is_ffmpeg_error():
    assert issubclass(generation.GenError, ff.FfmpegError)
    assert issubclass(ff.FfmpegError, RuntimeError)


def test_default_encoder_is_libx264():
    assert resolve_video_encoder(False) == DEFAULT_VIDEO_ENCODER == "libx264"
    tail = rc.video_transcode_tail(480, 1_000_000, 4.0)
    assert "libx264" in tail and "h264_nvenc" not in tail and "veryfast" in tail


def test_nvenc_tail():
    tail = rc.video_transcode_tail(480, 1_000_000, 4.0, nvenc=True)
    assert "h264_nvenc" in tail and "libx264" not in tail and "p4" in tail
    assert tail[tail.index("-force_key_frames") + 1] == "4.000000"
    assert "-forced-idr" in tail
    assert tail[tail.index("-bf") + 1] == "0"  # pts == dts on both encoders


def test_has_nvenc_returns_bool():
    from ei.media.encoder import has_nvenc

    assert isinstance(has_nvenc(), bool)


@pytest.mark.parametrize(
    ("fn", "args", "present", "absent"),
    [
        (rc.video_copy_tail, ("hevc",), ("hvc1",), ("avc1",)),
        (rc.video_copy_tail, ("h264",), ("avc1",), ("hvc1",)),
        (rc.audio_copy_tail, (2, "aac"), ("mp4a",), ()),
        (rc.audio_copy_tail, (2, "mp3"), (), ("mp4a",)),
    ],
)
def test_copy_tails(fn, args, present, absent):
    tail = fn(*args)
    assert all(p in tail for p in present) and all(a not in tail for a in absent)


def test_audio_aac_tail():
    tail = rc.audio_aac_tail(1)
    assert {"0:a:1", "192k"} <= set(tail)


def test_segment_cmd_structure():
    cmd = rc.segment_cmd("a.mp4", TrimWindow(4.0, 8.0), ["-map", "0:v:0"], "m.mpd")
    assert cmd[0] == "ffmpeg" and cmd[-1] == "m.mpd"
    assert {"-ignore_editlist", "4.000000", "8.000000", "-dash_segment_type"} <= set(
        cmd
    )
    assert cmd.count("-ss") == 2


def test_segment_cmd_skips_redundant_trim_at_zero():
    cmd = rc.segment_cmd("a.mkv", TrimWindow(0.0, 4.0), ["-map", "0:v:0"], "m.mpd")
    assert cmd.count("-ss") == 1 and "-ignore_editlist" not in cmd


def test_segment_cmd_no_preseek_for_stream_copy():
    # Stream copy + -copyts + mpegts input seek intermittently yields empty
    # dash output, so copy paths use output-only seeking.
    cmd = rc.segment_cmd(
        "a.ts",
        TrimWindow(93.477333, 97.467333),
        ["-map", "0:a:0", "-c:a", "copy"],
        "m.mpd",
        preseek=False,
    )
    assert cmd.count("-ss") == 1
    assert cmd[cmd.index("-ss") + 1] == "93.477333"
    assert cmd.index("-ss") > cmd.index("-i")


@pytest.mark.parametrize(
    ("idx", "mode", "codec", "present", "absent"),
    [
        (0, "direct", "aac", ("copy", "mp4a", "4.0", "$Number%06d$.m4s"), ()),
        (1, "aac192", "ac3", ("192k",), ("copy",)),
    ],
)
def test_audio_pass_cmd(idx, mode, codec, present, absent):
    cmd = rc.audio_pass_cmd("s.mkv", idx, mode, codec, "m.mpd", 4.0)
    assert cmd[-1] == "m.mpd"
    assert all(p in cmd for p in present) and all(a not in cmd for a in absent)


@pytest.mark.parametrize(("argv", "want"), [([], False), (["--nvenc"], True)])
def test_nvenc_cli_flag(argv, want):
    assert parse_args(argv).nvenc is want
