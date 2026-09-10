import json
import os

import pytest

from tests.conftest import req

FORM = {"Content-Type": "application/x-www-form-urlencoded", "Content-Length": "8"}


def login(httpd, pin):
    return req(httpd, "POST", "/login", body=f"pin={pin}", headers=FORM)


def test_pin_flow(make_server):
    httpd = make_server(["a.mp4", "b.mkv"], "1234")
    assert req(httpd, "GET", "/")[0] == 200  # landing page is public
    assert req(httpd, "GET", "/api/videos")[0] == 302
    assert "Set-Cookie" not in login(httpd, "0000")[1]  # wrong PIN rejected
    st, h, _ = login(httpd, "1234")
    assert st == 302 and "Set-Cookie" in h
    cookie = h["Set-Cookie"].split(";")[0].split("=")[1]

    videos = lambda: json.loads(req(httpd, "GET", "/api/videos", cookie=cookie)[2])  # noqa: E731
    assert len(videos()) == 2
    # rescan picks up adds/removes without restart
    open(os.path.join(httpd.media_dir, "c.mp4"), "w").close()
    assert len(videos()) == 3
    os.unlink(os.path.join(httpd.media_dir, "c.mp4"))
    assert len(videos()) == 2


@pytest.mark.parametrize(
    "f",
    ["media-chrome.js", "media-chrome-menu.js", "dash-video-element.js", "dashjs.js"],
)
def test_vendor_served(make_server, f):
    httpd = make_server(["a.mp4"], None)
    st, h, body = req(httpd, "GET", f"/vendor/{f}")
    assert st == 200 and "javascript" in h.get("Content-Type", "") and len(body) > 1000


def test_vendor_unknown_404(make_server):
    assert req(make_server(["a.mp4"], None), "GET", "/vendor/nope.js")[0] == 404


def test_no_pin_open(make_server):
    httpd = make_server(["a.mp4"], None)
    assert req(httpd, "GET", "/")[0] == 302
    assert req(httpd, "GET", "/api/videos")[0] == 200
    assert req(httpd, "GET", "/browse")[0] == 200


DEAD = "deadbeefdeadbeef"
UNKNOWN_PATHS = [
    f"/mpd/{DEAD}.mpd",
    f"/seg/{DEAD}/direct/video/init.mp4",
    f"/watch/{DEAD}",
    f"/thumb/{DEAD}.jpg",
    f"/api/video/{DEAD}",
    "/mpd/zzz.mpd",
    "/watch/nothex",
    "/thumb/xyz.jpg",
]


@pytest.mark.parametrize("path", UNKNOWN_PATHS)
def test_unknown_asset_404(make_server, path):
    assert req(make_server(["a.mp4"], None), "GET", path)[0] == 404


@pytest.mark.parametrize("path", ["/vendor/../secret.txt", "/vendor/%2e%2e/secret.txt"])
def test_path_traversal_rejected(make_server, path):
    assert req(make_server(["a.mp4"], None), "GET", path)[0] == 404
