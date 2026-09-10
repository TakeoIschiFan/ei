#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">= 3.11"
# ///
"""Rebuild ei/web/vendor/ from jsDelivr +esm bundles."""

import argparse
import json
import os
import re
import sys
import tomllib
import urllib.request

PACKAGES = (
    "media-chrome",
    "dash-video-element",
    "custom-media-element",
    "dashjs",
    "media-tracks",
)

REGISTRY = "https://registry.npmjs.org"
CDN = "https://cdn.jsdelivr.net/npm"
TIMEOUT = 60
REFRESH = "uv run scripts/vendor_sync.py"


def repo_root() -> str:
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def http_get_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "ei vendor_sync"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            if res.status != 200:
                raise RuntimeError(f"GET {url} -> HTTP {res.status}")
            return res.read().decode("utf-8")
    except OSError as e:
        raise RuntimeError(f"GET {url} failed: {e}") from e


def read_pins(pyproject: str) -> dict[str, str]:
    with open(pyproject, "rb") as f:
        data = tomllib.load(f)
    try:
        pins = data["tool"]["ei"]["vendor"]
    except KeyError:
        raise RuntimeError(f"{pyproject}: missing [tool.ei.vendor] pins") from None
    missing = [p for p in PACKAGES if p not in pins]
    if missing:
        raise RuntimeError(f"{pyproject}: missing pins: {', '.join(missing)}")
    return {p: str(pins[p]) for p in PACKAGES}


def latest_version(pkg: str) -> str:
    data = json.loads(http_get_text(f"{REGISTRY}/{pkg}/latest"))
    ver = data.get("version")
    if not ver:
        raise RuntimeError(f"{REGISTRY}/{pkg}/latest: no version field")
    return str(ver)


def update_pins(pyproject: str, versions: dict[str, str]) -> None:
    with open(pyproject, encoding="utf-8") as f:
        lines = f.readlines()
    try:
        start = next(
            i for i, ln in enumerate(lines) if ln.strip() == "[tool.ei.vendor]"
        )
    except StopIteration:
        raise RuntimeError(f"{pyproject}: missing [tool.ei.vendor] section") from None
    end = next(
        (i for i in range(start + 1, len(lines)) if lines[i].lstrip().startswith("[")),
        len(lines),
    )
    want = dict(versions)
    for i in range(start + 1, end):
        name = re.match(r"\s*([\w.-]+)\s*=", lines[i])
        if name is None or name.group(1) not in want:
            continue
        quote = lines[i].index('"')
        lines[i] = lines[i][: quote + 1] + want.pop(name.group(1)) + '"\n'
    if want:
        raise RuntimeError(f"{pyproject}: pin lines not found: {', '.join(want)}")
    with open(pyproject, "w", encoding="utf-8") as f:
        f.writelines(lines)


def header(name: str, ver: str, body: str) -> str:
    return (
        f"/* {name}@{ver} (jsdelivr +esm bundle) with /npm/ imports\n"
        f"   rewritten to local files. Refresh: {REFRESH}. */\n{body}"
    )


def build_plan(pins: dict[str, str]) -> list:
    mc, dve, cme, dj, mt = (pins[p] for p in PACKAGES)

    def dash_rewrite(body: str) -> str:
        return header(
            "dash-video-element",
            dve,
            body.replace(
                f'"/npm/custom-media-element@{cme}/+esm"',
                '"./custom-media-element.js"',
            )
            .replace(f'"/npm/media-tracks@{mt}/+esm"', '"./media-tracks.js"')
            .replace(f'"/npm/dashjs@{dj}/+esm"', '"./dashjs.js"'),
        )

    return [
        ("media-chrome.js", f"{CDN}/media-chrome@{mc}/+esm", None),
        ("media-chrome-menu.js", f"{CDN}/media-chrome@{mc}/menu/+esm", None),
        (
            "dash-video-element.js",
            f"{CDN}/dash-video-element@{dve}/+esm",
            dash_rewrite,
        ),
        ("custom-media-element.js", f"{CDN}/custom-media-element@{cme}/+esm", None),
        ("media-tracks.js", f"{CDN}/media-tracks@{mt}/+esm", None),
        ("dashjs.js", f"{CDN}/dashjs@{dj}/+esm", None),
    ]


def sync(out_dir: str, plan: list, check: bool) -> list[str]:
    os.makedirs(out_dir, exist_ok=True)
    dirty = []
    for name, url, rewrite in plan:
        body = http_get_text(url)
        want = rewrite(body) if rewrite else body
        dest = os.path.join(out_dir, name)
        if check:
            try:
                with open(dest, encoding="utf-8") as f:
                    have = f.read()
            except OSError:
                have = None
            if have != want:
                dirty.append(name)
        else:
            with open(dest, "w", encoding="utf-8") as f:
                f.write(want)
        print(f"{'checked' if check else 'wrote'} {name} ({len(want)} bytes)")
    return dirty


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(
        description="pin latest npm deps, rebuild ei/web/vendor/"
    )
    ap.add_argument(
        "--pinned", action="store_true", help="re-download current pins (no bump)"
    )
    ap.add_argument(
        "--check", action="store_true", help="exit 1 if vendor/ differs from pins"
    )
    ap.add_argument("--out", default=None, help="write elsewhere (testing)")
    args = ap.parse_args(argv)
    root = repo_root()
    pyproject = os.path.join(root, "pyproject.toml")
    pins = read_pins(pyproject)
    if args.check or args.pinned:
        versions = pins
    else:
        versions = {p: latest_version(p) for p in PACKAGES}
        update_pins(pyproject, versions)
        for p in PACKAGES:
            tag = "bumped" if versions[p] != pins[p] else "kept"
            print(f"{tag} {p} {pins[p]} -> {versions[p]}")
    dirty = sync(
        args.out or os.path.join(root, "ei", "web", "vendor"),
        build_plan(versions),
        args.check,
    )
    if args.check and dirty:
        print(
            f"stale vendor files: {', '.join(dirty)} (run {REFRESH})",
            file=sys.stderr,
        )
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
