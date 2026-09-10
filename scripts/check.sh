#!/usr/bin/env bash
# Local CI: the exact steps .github/workflows/ci.yml runs.
# Run before every release: `bash scripts/check.sh [--exe]`.
set -euo pipefail
cd "$(dirname "$0")/.."

uv run ruff check ei tests scripts
uv run ruff format --check ei tests scripts
uv run pytest -q
uv build
uv run scripts/vendor_sync.py --check

if [[ "${1:-}" == "--exe" ]]; then
    uv run pyinstaller --clean --noconfirm ei.spec
fi
