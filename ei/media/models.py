"""Asset model dataclasses (video/audio/text tracks, segment tables)."""

from __future__ import annotations

from dataclasses import dataclass, field

from ei.media.timelines import segment_durations

SEGMENT_FLOOR_SEC = 0.1

# Audio codecs every MSE-capable browser can play straight from the container
# (the aac192 fallback re-encodes to the same family), so offering the
# fallback rep for them only wastes a full-file transcode pass and risks
# timestamp drift in players that auto-prefer the higher-bitrate rep.
DIRECT_ONLY_AUDIO_CODECS = frozenset({"aac"})


def audio_fallback_needed(codec: str, transcode: bool) -> bool:
    """Whether to offer/generate the aac192 fallback for an audio track."""
    return transcode and codec not in DIRECT_ONLY_AUDIO_CODECS


@dataclass
class VideoTrack:
    codec: str
    codec_str: str
    profile: str
    width: int
    height: int
    frame_rate: str
    start: float
    end: float
    timescale: int
    bitrate: int


@dataclass
class AudioTrack:
    stream_index: int
    codec: str
    codec_str: str
    lang: str
    sample_rate: int
    channels: int
    start: float
    end: float
    bitrate: int
    landings: list[float]
    cuts: list[float | None]


@dataclass
class TextTrack:
    ordinal: int
    stream_index: int
    codec: str
    lang: str
    title: str
    forced: bool = False
    sdh: bool = False


@dataclass
class AssetInfo:
    name: str
    path: str
    size: int
    mtime: float
    duration: float
    video: VideoTrack
    audios: list[AudioTrack] = field(default_factory=list)
    boundaries: list[float] = field(default_factory=list)
    kf_dts: list[float] = field(default_factory=list)
    transcode_ladder: list[tuple[int, int]] = field(default_factory=list)
    dts_shift: float = 0.0
    rep_ts: dict[str, int] = field(default_factory=dict)
    texts: list[TextTrack] = field(default_factory=list)

    def video_seg_starts(self, transcoded: bool) -> list[float]:
        return self.boundaries if transcoded else self.kf_dts

    def video_seg_durs(self, transcoded: bool) -> list[float]:
        return segment_durations(
            self.video_seg_starts(transcoded), self.video.end, SEGMENT_FLOOR_SEC
        )

    def audio_seg_durs(self, j: int) -> list[float]:
        tr = self.audios[j]
        durs = [
            c - s for s, c in zip(tr.landings, tr.cuts, strict=False) if c is not None
        ]
        durs.append(max(SEGMENT_FLOOR_SEC, tr.end - tr.landings[-1]))
        return durs
