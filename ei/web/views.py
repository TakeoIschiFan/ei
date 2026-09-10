"""JSON views for /api/videos and /api/video/<id>."""

from __future__ import annotations

import os
from typing import TYPE_CHECKING, TypedDict

from ei.media import meta as meta_mod
from ei.media.labels import audio_labels, text_labels
from ei.media.library import probe_summary

if TYPE_CHECKING:  # pragma: no cover
    from ei.media.registry import Asset


class VideoEntry(TypedDict):
    id: str
    name: str
    rel_path: str
    size: int
    mtime: float
    duration: float
    width: int
    height: int
    vcodec: str
    acodec: str
    audios: int
    texts: int


class VideoDetail(TypedDict):
    id: str
    name: str
    rel_path: str
    size: int
    mtime: float
    duration: float
    width: int
    height: int
    vcodec: str
    acodec: str
    frame_rate: str
    transcode_ladder: list[dict]
    audios: list[dict]
    texts: list[dict]


_EMPTY = {
    "size": 0,
    "mtime": 0,
    "duration": 0,
    "width": 0,
    "height": 0,
    "vcodec": "",
    "acodec": "",
    "audios": 0,
    "texts": 0,
}


def _cached_info(cache_dir: str, aid: str, abs_path: str):
    return meta_mod.load_info(cache_dir, aid, abs_path)


def _safe_probe_duration(abs_path: str) -> float:
    if not os.path.isfile(abs_path):
        return 0
    try:
        return probe_summary(abs_path).get("duration", 0) or 0
    except Exception:  # probe failures must not break /api/videos
        return 0


def _entry_from_info(aid: str, rel: str, info, abs_path: str) -> dict:
    dur = info.duration or _safe_probe_duration(abs_path)
    v = info.video
    return {
        "id": aid,
        "name": os.path.basename(rel),
        "rel_path": rel,
        "size": info.size,
        "mtime": info.mtime,
        "duration": dur,
        "width": v.width,
        "height": v.height,
        "vcodec": v.codec,
        "acodec": info.audios[0].codec if info.audios else "",
        "audios": len(info.audios),
        "texts": len(info.texts),
    }


def _entry_from_quick(aid: str, abs_path: str, rel: str) -> dict:
    try:
        st = os.stat(abs_path)
        size, mtime = st.st_size, st.st_mtime
    except OSError:
        return {"id": aid, "name": os.path.basename(rel), "rel_path": rel, **_EMPTY}
    try:
        q = probe_summary(abs_path)
    except Exception:
        q = {}
    return {
        "id": aid,
        "name": os.path.basename(rel),
        "rel_path": rel,
        "size": size,
        "mtime": mtime,
        "duration": q.get("duration", 0),
        "width": q.get("width", 0),
        "height": q.get("height", 0),
        "vcodec": q.get("vcodec", ""),
        "acodec": q.get("acodec", ""),
        "audios": 0,
        "texts": 0,
    }


def video_entry(cache_dir: str, aid: str, abs_path: str, rel: str) -> VideoEntry:
    info = _cached_info(cache_dir, aid, abs_path)
    if info is not None:
        return _entry_from_info(aid, rel, info, abs_path)
    return _entry_from_quick(aid, abs_path, rel)


def video_detail(asset: Asset, rel: str) -> VideoDetail:
    info = asset.info
    v = info.video
    labels = audio_labels([a.lang for a in info.audios])
    return {
        "id": info.name,
        "name": os.path.basename(rel),
        "rel_path": rel,
        "size": info.size,
        "mtime": info.mtime,
        "duration": info.duration,
        "width": v.width,
        "height": v.height,
        "vcodec": v.codec,
        "acodec": info.audios[0].codec if info.audios else "",
        "frame_rate": v.frame_rate,
        "transcode_ladder": [
            {"height": h, "bitrate": bw} for h, bw in info.transcode_ladder
        ],
        "audios": [
            {
                "codec": a.codec,
                "lang": a.lang,
                "label": lab,
                "sample_rate": a.sample_rate,
                "channels": a.channels,
            }
            for a, lab in zip(info.audios, labels, strict=True)
        ],
        "texts": [
            {
                "codec": t.codec,
                "lang": t.lang,
                "label": lab,
                "title": t.title,
                "forced": t.forced,
                "sdh": t.sdh,
            }
            for t, lab in zip(
                info.texts,
                text_labels([(t.lang, t.forced, t.sdh) for t in info.texts]),
                strict=True,
            )
        ],
    }
