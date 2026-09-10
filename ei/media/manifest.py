"""Static VOD MPD generation."""

from __future__ import annotations

from xml.sax.saxutils import escape

from ei.media.labels import audio_labels, text_labels
from ei.media.models import AssetInfo, audio_fallback_needed
from ei.media.quality import AAC_BITRATE
from ei.media.timelines import monotone_ticks, timeline_runs


def _iso(d: float) -> str:
    return f"PT{d:.3f}S"


def _timeline(ticks: list[int]) -> str:
    parts = []
    for t, d, r in timeline_runs(ticks):
        r_attr = f' r="{r}"' if r else ""
        parts.append(f'<S t="{t}" d="{d}"{r_attr}/>')
    return "".join(parts)


def _even_width(info: AssetInfo, height: int) -> int:
    if not info.video.height:
        return max(2, height)
    return max(2, round(info.video.width * height / info.video.height / 2) * 2)


def _video_rep(info: AssetInfo, rep_id: str, bandwidth: int, transcoded: bool) -> str:
    ts = info.rep_ts.get(rep_id) or info.video.timescale
    durs = [round(d * ts) for d in info.video_seg_durs(transcoded)]
    ticks = monotone_ticks(
        [
            max(0, round((t + info.dts_shift) * ts))
            for t in info.video_seg_starts(transcoded)
        ],
        durs,
    )
    if not ticks:
        raise ValueError(f"no video segments for rep {rep_id!r}")
    tl = _timeline(ticks + [ticks[-1] + durs[-1]])
    if transcoded:
        h = int(rep_id.rstrip("p"))
        attrs = f'width="{_even_width(info, h)}" height="{h}" codecs="avc1.640028"'
    else:
        attrs = (
            f'width="{info.video.width}" height="{info.video.height}" '
            f'codecs="{escape(info.video.codec_str)}"'
        )
    fr = f' frameRate="{info.video.frame_rate}"' if info.video.frame_rate else ""
    pto = max(0, round((info.boundaries[0] + info.dts_shift) * ts))
    return (
        f'    <Representation id="{escape(rep_id)}" mimeType="video/mp4" '
        f'bandwidth="{bandwidth}" {attrs}{fr}>\n'
        f'     <SegmentTemplate timescale="{ts}" startNumber="0"\n'
        f'       initialization="$RepresentationID$/video/init.mp4"\n'
        f'       media="$RepresentationID$/video/$Number%06d$.m4s"\n'
        f'       presentationTimeOffset="{pto}">\n'
        f"      <SegmentTimeline>{tl}</SegmentTimeline>\n"
        f"     </SegmentTemplate>\n"
        f"    </Representation>"
    )


def _audio_set(info: AssetInfo, j: int, label: str, transcode: bool) -> str:
    tr = info.audios[j]
    pairs = [("direct", tr.codec_str, tr.bitrate)]
    if audio_fallback_needed(tr.codec, transcode):
        pairs.append(("aac192", "mp4a.40.2", AAC_BITRATE))
    reps = []
    for arep, codec_str, bw in pairs:
        ts = info.rep_ts.get(f"audio{j}-{arep}") or tr.sample_rate
        priming = 1024 if arep == "aac192" else 0
        durs = [round(d * ts) for d in info.audio_seg_durs(j)]
        ticks = monotone_ticks(
            [max(0, round((t + info.dts_shift) * ts) - priming) for t in tr.landings],
            durs,
        )
        tl = _timeline(ticks + [ticks[-1] + durs[-1]])
        reps.append(
            f'   <Representation id="{arep}" mimeType="audio/mp4" bandwidth="{bw}" '
            f'audioSamplingRate="{tr.sample_rate}" codecs="{escape(codec_str)}">\n'
            f'    <SegmentTemplate timescale="{ts}" startNumber="1"\n'
            f'      initialization="audio{j}/{arep}/init.mp4"\n'
            f'      media="audio{j}/{arep}/$Number%06d$.m4s"\n'
            f'      presentationTimeOffset="{ticks[0]}">\n'
            f"     <SegmentTimeline>{tl}</SegmentTimeline>\n"
            f"    </SegmentTemplate>\n"
            f"   </Representation>"
        )
    return (
        f'  <AdaptationSet id="{j + 1}" contentType="audio" '
        f'mimeType="audio/mp4" lang="{escape(tr.lang or "und")}" '
        f'label="{escape(label)}" segmentAlignment="true" startWithSAP="1">\n'
        + "\n".join(reps)
        + "\n  </AdaptationSet>"
    )


def _text_sets(info: AssetInfo) -> list[str]:
    labels = text_labels([(t.lang, t.forced, t.sdh) for t in info.texts])
    return [
        f'  <AdaptationSet id="{len(info.audios) + j + 1}" contentType="text" '
        f'mimeType="text/vtt" lang="{escape(t.lang or "und")}" '
        f'label="{escape(labels[j])}" segmentAlignment="true" startWithSAP="1">\n'
        f'   <Representation id="text{j}" mimeType="text/vtt" codecs="wvtt" bandwidth="1000">\n'
        f"    <BaseURL>text{j}.vtt</BaseURL>\n"
        f"   </Representation>\n"
        f"  </AdaptationSet>"
        for j, t in enumerate(info.texts)
    ]


def build_mpd(info: AssetInfo, only: str | None = None, transcode: bool = True) -> str:
    if not transcode or only == "direct":
        reps = ["direct"]
    elif only in (None, "", "abr"):
        reps = ["direct"] + [f"{h}p" for h, _ in info.transcode_ladder]
    else:
        reps = [only]
    vsets = []
    for rid in reps:
        if rid == "direct":
            vsets.append(_video_rep(info, "direct", info.video.bitrate, False))
        else:
            h = int(rid.rstrip("p"))
            bw = next(b for hh, b in info.transcode_ladder if hh == h)
            vsets.append(_video_rep(info, rid, bw, True))
    fr = f' frameRate="{info.video.frame_rate}"' if info.video.frame_rate else ""
    video_set = (
        '  <AdaptationSet id="0" contentType="video" mimeType="video/mp4" '
        f'segmentAlignment="true" startWithSAP="1" '
        f'maxWidth="{info.video.width}" maxHeight="{info.video.height}"{fr}>\n'
        + "\n".join(vsets)
        + "\n  </AdaptationSet>"
    )
    sets = [video_set] + [
        _audio_set(info, j, label, transcode)
        for j, label in zip(
            range(len(info.audios)),
            audio_labels([t.lang for t in info.audios]),
            strict=True,
        )
    ]
    sets += _text_sets(info)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" '
        'profiles="urn:mpeg:dash:profile:isoff-live:2011" type="static" '
        f'mediaPresentationDuration="{_iso(info.duration)}" minBufferTime="PT2S">\n'
        ' <Period id="0" start="PT0S">\n'
        f"  <BaseURL>/seg/{escape(info.name)}/</BaseURL>\n"
        + "\n".join(sets)
        + "\n </Period>\n</MPD>\n"
    )
