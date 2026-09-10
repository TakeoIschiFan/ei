"""Output quality tunables: bitrates, ladder, presets.

Single place to change how output looks/sounds. Nothing here runs at import
time; ``encoder.py`` owns the runtime encoder choice (libx264 vs NVENC).
"""

# Transcode ladder: (output height, target video bitrate in bits/s).
# Rungs at or below the source height are offered; the same-height rung
# exists for players that can't play direct.
# To change e.g. the 1080p transcode bitrate, edit the (1080, ...) entry.
TRANSCODE_LADDER: list[tuple[int, int]] = [
    (2160, 15_000_000),
    (1440, 8_000_000),
    (1080, 5_000_000),
    (720, 2_500_000),
    (480, 1_000_000),
    (360, 700_000),
]

# AAC fallback encode (the "aac192" audio rep), in bits/s. Also advertised
# as the representation bandwidth in the MPD and used when a source audio
# track reports no bitrate.
AAC_BITRATE = 192_000


def aac_bitrate_arg() -> str:
    """ffmpeg ``-b:a`` value matching :data:`AAC_BITRATE` (e.g. ``"192k"``)."""
    if AAC_BITRATE % 1000 == 0:
        return f"{AAC_BITRATE // 1000}k"
    return f"{AAC_BITRATE / 1000:g}k"


# Software x264 speed/quality tradeoff for the transcode ladder.
X264_PRESET = "veryfast"

# NVENC speed/quality tradeoff for the transcode ladder (used with --nvenc).
NVENC_PRESET = "p4"

# Default video encoder for the transcode ladder. ``--nvenc`` flips the live
# selection in :mod:`ei.media.encoder` to ``"h264_nvenc"`` at startup.
DEFAULT_VIDEO_ENCODER = "libx264"

# Canonical audio segment length in seconds: the packet-index grid, the AAC
# grid math, and the continuous audio-pass ``-seg_duration`` all derive from
# this. Video keyframe boundaries are source-driven, not grid-driven.
AUDIO_SEG_SECONDS = 4.0
