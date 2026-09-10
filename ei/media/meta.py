"""meta.json persistence for probed AssetInfo."""

from __future__ import annotations

import json
import os
from dataclasses import asdict

from ei.media.models import AssetInfo, AudioTrack, TextTrack, VideoTrack
from ei.media.paths import meta_path

META_VERSION = 9


def load_info(cache_dir: str, name: str, path: str) -> AssetInfo | None:
    try:
        with open(meta_path(cache_dir, name), encoding="utf-8") as f:
            raw = json.load(f)
        st = os.stat(path)
        if (raw.get("v"), raw.get("size"), raw.get("mtime")) != (
            META_VERSION,
            st.st_size,
            st.st_mtime,
        ):
            return None
        return from_dict(raw)
    except (OSError, ValueError, KeyError, TypeError):
        return None


def save_info(cache_dir: str, info: AssetInfo) -> None:
    dest = meta_path(cache_dir, info.name)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    tmp = dest + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(to_dict(info), f)
    os.replace(tmp, dest)


def to_dict(i: AssetInfo) -> dict:
    return {"v": META_VERSION, **asdict(i)}


def from_dict(raw: dict) -> AssetInfo:
    return AssetInfo(
        name=raw["name"],
        path=raw["path"],
        size=raw["size"],
        mtime=raw["mtime"],
        duration=raw["duration"],
        video=VideoTrack(**raw["video"]),
        audios=[AudioTrack(**a) for a in raw["audios"]],
        boundaries=list(raw.get("boundaries", [])),
        kf_dts=list(raw.get("kf_dts", [])),
        transcode_ladder=[(h, bw) for h, bw in raw.get("transcode_ladder", [])],
        rep_ts=dict(raw.get("rep_ts", {})),
        dts_shift=raw.get("dts_shift", 0.0),
        texts=[TextTrack(**t) for t in raw.get("texts", [])],
    )
