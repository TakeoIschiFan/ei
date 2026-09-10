"""Asset ids: 16-hex digest of the canonical absolute path."""

import hashlib
import os
import re

ID_RE = re.compile(r"^[0-9a-f]{16}$")


def asset_id(abs_path: str) -> str:
    canon = os.path.normpath(os.path.abspath(abs_path)).encode("utf-8")
    return hashlib.blake2b(canon, digest_size=8).hexdigest()


def is_valid_id(s: str) -> bool:
    return bool(ID_RE.match(s or ""))
