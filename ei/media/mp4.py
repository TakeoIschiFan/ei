"""Minimal MP4 box utilities (init timescale + tfdt patching)."""

from __future__ import annotations

from collections.abc import Iterator
from struct import pack, pack_into, unpack


class Mp4Error(RuntimeError):
    """Malformed or unexpected MP4 structure."""


def iter_boxes(
    data: bytes | bytearray, start: int, end: int
) -> Iterator[tuple[bytes, int, int]]:
    """Yield (type, payload_start, payload_end) for each box in range."""
    pos = start
    total = len(data)
    end = min(end, total)
    while pos + 8 <= end:
        size = unpack(">I", data[pos : pos + 4])[0]
        typ = bytes(data[pos + 4 : pos + 8])
        hdr = 8
        if size == 1:
            if pos + 16 > end:
                raise Mp4Error("truncated large-size box header")
            size = unpack(">Q", data[pos + 8 : pos + 16])[0]
            hdr = 16
        elif size == 0:
            size = end - pos
        if size < hdr or pos + size > end:
            raise Mp4Error(f"invalid box size {size} for {typ!r}")
        yield typ, pos + hdr, pos + size
        pos += size


def find_boxes(
    data: bytes | bytearray, path: tuple[bytes, ...]
) -> Iterator[tuple[int, int]]:
    """Yield (payload_start, payload_end) for boxes matching the type path."""
    if not path:
        return
    stack = [(path, 0, len(data))]
    while stack:
        remaining, start, end = stack.pop()
        for typ, ps, pe in iter_boxes(data, start, end):
            if typ == remaining[0]:
                if len(remaining) == 1:
                    yield ps, pe
                else:
                    stack.append((remaining[1:], ps, pe))


def read_mdhd_timescale(init_data: bytes) -> int:
    for ps, _pe in find_boxes(init_data, (b"moov", b"trak", b"mdia", b"mdhd")):
        version = init_data[ps]
        off = ps + 4 + (8 if version else 4) * 2
        if off + 4 > len(init_data):
            raise Mp4Error("truncated mdhd box")
        return unpack(">I", init_data[off : off + 4])[0]
    raise Mp4Error("no mdhd timescale in init segment")


def read_tfdt_values(seg_data: bytes | bytearray) -> list[int]:
    out: list[int] = []
    for ps, _pe in find_boxes(seg_data, (b"moof", b"traf", b"tfdt")):
        ver = seg_data[ps]
        width = 8 if ver else 4
        fmt = ">Q" if ver else ">I"
        out.append(unpack(fmt, seg_data[ps + 4 : ps + 4 + width])[0])
    return out


def shift_tfdt_values(seg_data: bytearray, target_ticks: int) -> None:
    tfdts = list(find_boxes(seg_data, (b"moof", b"traf", b"tfdt")))
    if not tfdts:
        raise Mp4Error("no tfdt box in media segment")
    first_ps = tfdts[0][0]
    ver = seg_data[first_ps]
    width = 8 if ver else 4
    fmt = ">Q" if ver else ">I"
    cur = unpack(fmt, seg_data[first_ps + 4 : first_ps + 4 + width])[0]
    delta = target_ticks - cur
    for ps, _pe in tfdts:
        v = unpack(fmt, seg_data[ps + 4 : ps + 4 + width])[0] + delta
        if v < 0 or (not ver and v > 0xFFFFFFFF):
            raise Mp4Error(f"tfdt {v} does not fit tfdt v{ver}")
        pack_into(fmt, seg_data, ps + 4, v)


def _first_dirty_elst(
    data: bytes | bytearray,
) -> tuple[int, int, int, list[int]] | None:
    """Locate the first elst needing normalization.

    Returns ``(elst_start, elst_end, version, ancestor_starts)`` where
    ancestors are the moov/trak/edts header offsets enclosing it.
    """
    for typ, moov_ps, moov_pe in iter_boxes(data, 0, len(data)):
        if typ != b"moov":
            continue
        for typ, trak_ps, trak_pe in iter_boxes(data, moov_ps, moov_pe):
            if typ != b"trak":
                continue
            for typ, edts_ps, edts_pe in iter_boxes(data, trak_ps, trak_pe):
                if typ != b"edts":
                    continue
                for typ, elst_ps, elst_pe in iter_boxes(data, edts_ps, edts_pe):
                    if typ != b"elst":
                        continue
                    elst_start = elst_ps - 8
                    size = unpack(">I", data[elst_start : elst_start + 4])[0]
                    if size in (0, 1) or elst_start + size > len(data):
                        continue
                    ver = data[elst_ps]
                    if ver not in (0, 1):
                        continue
                    count = unpack(">I", data[elst_ps + 4 : elst_ps + 8])[0]
                    entry_size = 20 if ver == 1 else 12
                    if elst_pe - (elst_ps + 8) != entry_size * count:
                        continue
                    canon = (
                        pack(">Qqhh", 0, 0, 1, 0)
                        if ver == 1
                        else pack(">IIHH", 0, 0, 1, 0)
                    )
                    if (
                        count == 1
                        and bytes(data[elst_ps + 8 : elst_ps + 8 + entry_size]) == canon
                    ):
                        continue
                    return (
                        elst_start,
                        elst_start + size,
                        ver,
                        [
                            moov_ps - 8,
                            trak_ps - 8,
                            edts_ps - 8,
                        ],
                    )
    return None


def normalize_init_elst(init_data: bytes) -> bytes:
    """Collapse init-segment edit lists to a single empty ``(0, 0)`` entry.

    The DASH audio pass emits ``elst`` empty edits covering the source start
    offset (e.g. ~1378 ms), while our manifest ``presentationTimeOffset`` and
    shifted ``tfdt`` values already place segments absolutely (as do the
    stream-copy inits, which carry no such edit). The extra edit makes audio
    presentation player-dependent by ~1 s, so strip it. Inits that are
    already clean (or have unexpected structure) are returned unchanged.
    """
    out = bytearray(init_data)
    changed = False
    while True:
        found = _first_dirty_elst(out)
        if found is None:
            break
        elst_start, elst_end, ver, ancestors = found
        payload = bytes([ver, 0, 0, 0]) + pack(">I", 1)
        payload += pack(">Qqhh", 0, 0, 1, 0) if ver == 1 else pack(">IIHH", 0, 0, 1, 0)
        new_box = pack(">I", 8 + len(payload)) + b"elst" + payload
        out[elst_start:elst_end] = new_box
        delta = (elst_end - elst_start) - len(new_box)
        for astart in ancestors:
            size = unpack(">I", out[astart : astart + 4])[0]
            if size in (0, 1):
                return init_data
            pack_into(">I", out, astart, size - delta)
        changed = True
    if not changed:
        return init_data
    try:
        for _typ, _ps, _pe in iter_boxes(out, 0, len(out)):
            pass
        read_mdhd_timescale(bytes(out))
    except Mp4Error:
        return init_data
    return bytes(out)
