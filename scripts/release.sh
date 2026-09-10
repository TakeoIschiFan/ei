#!/usr/bin/env bash
# Release recipe: bump pyproject version, commit, tag, push.
# Usage: bash scripts/release.sh 0.2.0
# The v0.2.0 tag push triggers .github/workflows/release.yml, which builds
# the wheel + all three executables and attaches them to a GitHub Release.
set -euo pipefail
cd "$(dirname "$0")/.."

ver="${1:-}"
if ! [[ "$ver" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "usage: bash scripts/release.sh X.Y.Z" >&2
    exit 1
fi
git rev-parse --is-inside-work-tree >/dev/null
if [[ -n "$(git status --porcelain)" ]]; then
    echo "error: working tree not clean" >&2
    exit 1
fi
if ! grep -q "^version = " pyproject.toml; then
    echo "error: no version line in pyproject.toml" >&2
    exit 1
fi
sed -i "s/^version = \".*\"/version = \"$ver\"/" pyproject.toml
bash scripts/check.sh
git add pyproject.toml uv.lock
git commit -m "release v$ver"
git tag "v$ver"
git push origin HEAD --tags
echo "pushed v$ver — watch the release workflow build the artifacts"
