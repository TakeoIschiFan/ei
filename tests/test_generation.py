import struct

import pytest

from ei.media import ffmpeg_recipes
from ei.media.mp4 import (
    Mp4Error,
    find_boxes,
    normalize_init_elst,
    read_mdhd_timescale,
    shift_tfdt_values,
)


def box(typ: bytes, payload: bytes) -> bytes:
    return struct.pack(">I", 8 + len(payload)) + typ + payload


def tfdt_box(version: int, value: int) -> bytes:
    fmt = ">Q" if version else ">I"
    return box(b"tfdt", bytes([version, 0, 0, 0]) + struct.pack(fmt, value))


def seg_with_tfdts(version: int, values: list[int]) -> bytearray:
    trafs = b"".join(box(b"traf", tfdt_box(version, v)) for v in values)
    return bytearray(box(b"moof", trafs))


def tfdt_vals(seg: bytearray, version: int) -> list[int]:
    fmt = ">Q" if version else ">I"
    size = 8 if version else 4
    return [
        struct.unpack(fmt, seg[ps + 4 : ps + 4 + size])[0]
        for ps, _ in find_boxes(seg, (b"moof", b"traf", b"tfdt"))
    ]


def init_with_timescale(ts: int) -> bytes:
    mdhd = box(b"mdhd", bytes([0, 0, 0, 0]) + struct.pack(">IIII", 0, 0, ts, 0))
    return box(b"moov", box(b"trak", box(b"mdia", mdhd)))


def test_find_nesting():
    data = box(b"moof", box(b"traf", box(b"tfdt", b"\x00\x00\x00\x00" + b"\x00" * 4)))
    assert len(list(find_boxes(data, (b"moof", b"traf", b"tfdt")))) == 1


def test_mdhd_timescale():
    assert read_mdhd_timescale(init_with_timescale(90000)) == 90000


def _elst_init(entries: list[bytes], version: int = 0) -> bytes:
    payload = (
        bytes([version, 0, 0, 0]) + struct.pack(">I", len(entries)) + b"".join(entries)
    )
    mdhd = box(b"mdhd", bytes([0, 0, 0, 0]) + struct.pack(">IIII", 0, 0, 48000, 0))
    trak = box(b"trak", box(b"edts", box(b"elst", payload)) + box(b"mdia", mdhd))
    return box(b"moov", trak)


def _elst_entries(data: bytes) -> list[tuple[int, int, int]]:
    out = []
    for ps, _pe in find_boxes(data, (b"moov", b"trak", b"edts", b"elst")):
        ver = data[ps]
        count = struct.unpack(">I", data[ps + 4 : ps + 8])[0]
        size = 20 if ver else 12
        for i in range(count):
            off = ps + 8 + i * size
            if ver:
                segdur, mediatime = struct.unpack(">Qq", data[off : off + 16])
            else:
                segdur, mediatime = struct.unpack(">II", data[off : off + 8])
            out.append((segdur, mediatime, ver))
    return out


def test_normalize_elst_strips_empty_edit():
    empty = struct.pack(">IIHH", 1378, 0xFFFFFFFF, 1, 0)
    start = struct.pack(">IIHH", 0, 0, 1, 0)
    raw = _elst_init([empty, start])
    fixed = normalize_init_elst(raw)
    assert _elst_entries(fixed) == [(0, 0, 0)]
    assert len(fixed) == len(raw) - 12
    assert read_mdhd_timescale(fixed) == 48000
    # Idempotent and structurally sound.
    assert normalize_init_elst(fixed) == fixed


def test_normalize_elst_passthrough():
    assert normalize_init_elst(init_with_timescale(48000)) == init_with_timescale(48000)
    clean = _elst_init([struct.pack(">IIHH", 0, 0, 1, 0)])
    assert normalize_init_elst(clean) == clean


def test_normalize_elst_v1():
    empty = struct.pack(">Qqhh", 1378, -1, 1, 0)
    raw = _elst_init([empty], version=1)
    fixed = normalize_init_elst(raw)
    assert _elst_entries(fixed) == [(0, 0, 1)]
    assert read_mdhd_timescale(fixed) == 48000


def test_finalize_init_normalizes_elst(tmp_path):
    from ei.media import generation

    empty = struct.pack(">IIHH", 1378, 0xFFFFFFFF, 1, 0)
    start = struct.pack(">IIHH", 0, 0, 1, 0)
    staging, final = tmp_path / "s", tmp_path / "f"
    staging.mkdir()
    (staging / "init.mp4").write_bytes(_elst_init([empty, start]))
    generation.finalize_audio_segment(str(staging), str(final), "init.mp4", None)
    assert _elst_entries((final / "init.mp4").read_bytes()) == [(0, 0, 0)]


@pytest.mark.parametrize(
    ("version", "before", "base", "want"),
    [(0, [100], 500, [500]), (0, [100, 100], 500, [500, 500]), (1, [10], 1000, [1000])],
)
def test_shift_uniform(version, before, base, want):
    seg = seg_with_tfdts(version, before)
    shift_tfdt_values(seg, base)
    assert tfdt_vals(seg, version) == want


def test_shift_preserves_offsets():
    seg = seg_with_tfdts(0, [100, 200])
    shift_tfdt_values(seg, 500)
    vals = sorted(tfdt_vals(seg, 0))
    assert vals[1] - vals[0] == 100 and 500 in vals


def test_shift_overflow():
    with pytest.raises(Mp4Error):
        shift_tfdt_values(seg_with_tfdts(0, [0xFFFFFF00]), 0xFFFFFFFF + 10)


def test_shift_no_tfdt():
    with pytest.raises(Mp4Error):
        shift_tfdt_values(bytearray(box(b"moof", b"xxxx")), 5)


def test_dash_segment_type_forced_mp4():
    assert (
        ffmpeg_recipes.DASH_OPTS[
            ffmpeg_recipes.DASH_OPTS.index("-dash_segment_type") + 1
        ]
        == "mp4"
    )
