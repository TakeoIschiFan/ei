"""Shared timeline math (video/audio segment tables + MPD runs)."""

from __future__ import annotations


def segment_durations(
    starts: list[float], end: float, floor: float = 0.1
) -> list[float]:
    """Durations between consecutive starts; last rung floored at ``floor``."""
    if not starts:
        return []
    durs = [starts[i + 1] - starts[i] for i in range(len(starts) - 1)]
    durs.append(max(floor, end - starts[-1]))
    return durs


def monotone_ticks(ticks: list[int], durs: list[int]) -> list[int]:
    """Copy of ``ticks`` pushed forward past rounding collisions."""
    out = list(ticks)
    for i in range(1, len(out)):
        if out[i] <= out[i - 1]:
            out[i] = out[i - 1] + durs[i - 1]
    return out


def timeline_runs(ticks: list[int]) -> list[tuple[int, int, int]]:
    """Compress absolute ticks into (t, d, r) runs for SegmentTimeline.

    ``ticks`` includes the trailing end tick (len = segments + 1).
    """
    if len(ticks) < 2:
        return []
    ds = [ticks[i + 1] - ticks[i] for i in range(len(ticks) - 1)]
    runs: list[tuple[int, int, int]] = []
    i = 0
    while i < len(ds):
        j = i
        while j + 1 < len(ds) and ds[j + 1] == ds[i]:
            j += 1
        runs.append((ticks[i], ds[i], j - i))
        i = j + 1
    return runs


def count_for_window(durs: list[float], window: float, max_segments: int) -> int:
    """How many leading segments cover ``window`` seconds (capped)."""
    total, n = 0.0, 0
    for d in durs:
        total += d
        n += 1
        if total >= window or n >= max_segments:
            break
    return n
