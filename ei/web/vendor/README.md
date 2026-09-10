# Vendored browser dependencies — no CDN. Served locally at /vendor/<file>.

Versions are pinned in `pyproject.toml` (`[tool.ei.vendor]`) — that section
is the single source of truth. To refresh, run (uv-only, stdlib, no npm):

```
uv run scripts/vendor_sync.py          # pin latest npm versions, rebuild vendor/
uv run scripts/vendor_sync.py --pinned # re-download current pins (no bump)
uv run scripts/vendor_sync.py --check  # CI freshness: exit 1 if vendor/ differs
```

Only `dash-video-element.js` needs import rewrites (its two static `/npm/`
imports plus the dynamic `import("/npm/dashjs…")`); the other bundles are
self-contained. See `scripts/vendor_sync.py` for the exact mapping.

Pinned versions:

- media-chrome.js — media-chrome (player UI)
- media-chrome-menu.js — media-chrome menu entry (`/menu/+esm`)
- dash-video-element.js — dash-video-element (+ local rewrites, see header)
- custom-media-element.js — dash-video-element's `/npm/` import
- dashjs.js — dash.js (dynamically imported by dash-video-element)
- media-tracks.js — dash-video-element's `/npm/` import
