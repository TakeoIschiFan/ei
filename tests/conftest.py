"""Shared pytest fixtures and helpers for the ei test suite."""

from __future__ import annotations

import http.client
import itertools
import threading
import time
from collections.abc import Iterator
from http.server import ThreadingHTTPServer

import pytest

import ei.media.state as state
from ei.media import models as models_mod
from ei.media.readahead import Readahead
from ei.media.registry import Registry
from ei.web.auth import COOKIE_NAME
from ei.web.http import Handler
from ei.web.session import SessionStore


def make_info(
    name: str = "ab12cd34ef56ab78",
    duration: float = 12.0,
    boundaries: list[float] | None = None,
    kf_dts: list[float] | None = None,
    texts: list[models_mod.TextTrack] | None = None,
    transcode_ladder: list[tuple[int, int]] | None = None,
) -> models_mod.AssetInfo:
    video = models_mod.VideoTrack(
        codec="h264",
        codec_str="avc1.640028",
        profile="High",
        width=1280,
        height=720,
        frame_rate="30/1",
        start=0.0,
        end=duration,
        timescale=90000,
        bitrate=2000000,
    )
    audio = models_mod.AudioTrack(
        stream_index=1,
        codec="aac",
        codec_str="mp4a.40.2",
        lang="und",
        sample_rate=48000,
        channels=2,
        start=0.0,
        end=duration,
        bitrate=128000,
        landings=[0.0, 4.0, 8.0],
        cuts=[4.0, 8.0, None],
    )
    return models_mod.AssetInfo(
        name=name,
        path="/x/v.mp4",
        size=100,
        mtime=1234.0,
        duration=duration,
        video=video,
        audios=[audio],
        boundaries=boundaries if boundaries is not None else [0.0, 4.0, 8.0],
        kf_dts=kf_dts if kf_dts is not None else [0.0, 4.0, 8.0],
        transcode_ladder=transcode_ladder
        if transcode_ladder is not None
        else [(480, 1_000_000), (360, 700_000)],
        dts_shift=0.0,
        rep_ts={"direct": 90000},
        texts=texts if texts is not None else [],
    )


def make_texted_info() -> models_mod.AssetInfo:
    return make_info(
        texts=[
            models_mod.TextTrack(
                ordinal=0,
                stream_index=2,
                codec="subrip",
                lang="eng",
                title="English (CC)",
                sdh=True,
            ),
            models_mod.TextTrack(
                ordinal=1,
                stream_index=3,
                codec="ass",
                lang="eng",
                title="English (Signs)",
                forced=True,
            ),
        ]
    )


@pytest.fixture
def info() -> models_mod.AssetInfo:
    return make_info()


@pytest.fixture
def texted_info() -> models_mod.AssetInfo:
    return make_texted_info()


@pytest.fixture(autouse=True)
def _clean_globals() -> Iterator[None]:
    saved = state._ctx
    yield
    state._ctx = saved


def touch(directory, *names: str) -> None:
    for name in names:
        (directory / name).touch()


def req(httpd, method: str, path: str, body=None, headers=None, cookie=None):
    conn = http.client.HTTPConnection("127.0.0.1", httpd.server_address[1], timeout=5)
    hdrs = dict(headers or {})
    if cookie:
        hdrs["Cookie"] = f"{COOKIE_NAME}={cookie}"
    conn.request(method, path, body=body, headers=hdrs)
    r = conn.getresponse()
    data = r.read()
    h = dict(r.getheaders())
    conn.close()
    return r.status, h, data


@pytest.fixture
def make_server(tmp_path):
    servers: list[ThreadingHTTPServer] = []
    counter = itertools.count(1)

    def _make(files: list[str], pin):
        tag = next(counter)
        media = tmp_path / f"media{tag}"
        cache = tmp_path / f"cache{tag}" / "ei"
        media.mkdir(parents=True)
        touch(media, *files)
        reg = Registry(str(media), str(cache), is_video=lambda p: True)
        state.bind(reg, Readahead(reg), session=SessionStore(pin))
        reg.rescan()
        httpd = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        httpd.media_dir = str(media)  # type: ignore[attr-defined]
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        time.sleep(0.05)
        servers.append(httpd)
        return httpd

    yield _make
    for httpd in servers:
        httpd.shutdown()
