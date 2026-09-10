"""ffmpeg/ffprobe subprocess invocation (argv recipes: ffmpeg_recipes.py)."""

from __future__ import annotations

import json
import shutil
import subprocess
import threading

FFMPEG = "ffmpeg"
FFPROBE = "ffprobe"
MAX_FFMPEG = 2
MAX_THUMBS = 4


class FfmpegError(RuntimeError):
    """Any ffmpeg/ffprobe subprocess failure."""

    def __init__(
        self,
        message: str,
        cmd: list[str] | None = None,
        returncode: int | None = None,
        stderr: str | None = None,
    ):
        super().__init__(message)
        self.cmd = cmd or []
        self.returncode = returncode
        self.stderr = stderr or ""


class FfmpegRunner:
    def __init__(
        self,
        ffmpeg_bin: str = FFMPEG,
        ffprobe_bin: str = FFPROBE,
        max_ffmpeg: int = MAX_FFMPEG,
        max_thumbs: int = MAX_THUMBS,
    ):
        self.ffmpeg_bin = ffmpeg_bin
        self.ffprobe_bin = ffprobe_bin
        self._ff_sem = threading.Semaphore(max_ffmpeg)
        self._thumb_sem = threading.Semaphore(max_thumbs)

    def _spawn(self, cmd: list[str], timeout: float | None):
        return subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            stdin=subprocess.DEVNULL,
            timeout=timeout,
        )

    def _checked(self, cmd: list[str], timeout: float | None, what: str, target: str):
        try:
            p = self._spawn(cmd, timeout)
        except subprocess.TimeoutExpired as e:
            raise FfmpegError(f"{what} timed out on {target}: {e}", cmd=cmd) from e
        except OSError as e:
            raise FfmpegError(f"{what} failed to start: {e}", cmd=cmd) from e
        if p.returncode != 0:
            raise FfmpegError(
                f"{what} failed on {target}: {p.stderr[-500:]}",
                cmd=cmd,
                returncode=p.returncode,
                stderr=p.stderr,
            )
        return p

    def with_nostdin(self, cmd: list[str]) -> list[str]:
        if not cmd or "-nostdin" in cmd:
            return list(cmd)
        return cmd[:1] + ["-nostdin"] + cmd[1:]

    def check_tools(self) -> None:
        missing = [
            b for b in (self.ffmpeg_bin, self.ffprobe_bin) if shutil.which(b) is None
        ]
        if missing:
            raise SystemExit(f"error: missing on PATH: {', '.join(missing)}")

    def ffprobe_json(self, args: list[str], src: str, timeout: float | None = None):
        cmd = [
            self.ffprobe_bin,
            "-v",
            "error",
            "-ignore_editlist",
            "1",
            *args,
            "-of",
            "json",
            src,
        ]
        p = self._checked(cmd, timeout, "ffprobe", src)
        try:
            return json.loads(p.stdout or "{}")
        except ValueError as e:
            raise FfmpegError(
                f"ffprobe returned invalid JSON for {src}: {e}",
                cmd=cmd,
                stderr=p.stdout,
            ) from e

    def ffprobe_packets_csv(self, path: str, timeout: float | None = None) -> str:
        cmd = [
            self.ffprobe_bin,
            "-v",
            "error",
            "-ignore_editlist",
            "1",
            "-show_packets",
            "-show_entries",
            "packet=stream_index,pts_time,dts_time,flags",
            "-of",
            "csv=p=0",
            path,
        ]
        return self._checked(cmd, timeout, "packet scan", path).stdout

    def ffmpeg_checked(self, cmd: list[str], timeout: float | None = None):
        p = self.ffmpeg_unchecked(cmd, timeout)
        if p.returncode != 0:
            raise FfmpegError(
                f"ffmpeg failed (rc={p.returncode}): {' '.join(cmd)}\n"
                f"{p.stderr[-1500:]}",
                cmd=cmd,
                returncode=p.returncode,
                stderr=p.stderr,
            )
        return p

    def ffmpeg_unchecked(self, cmd: list[str], timeout: float | None = None):
        with self._ff_sem:
            return self._spawn(self.with_nostdin(cmd), timeout)

    def ffmpeg_thumb(self, cmd: list[str], timeout: float | None = None):
        with self._thumb_sem:
            return self._spawn(self.with_nostdin(cmd), timeout)

    def ffmpeg_long(self, cmd: list[str]):
        return self._spawn(cmd, None)


_runner = FfmpegRunner()


def check_tools() -> None:
    _runner.check_tools()


def ffprobe_json(args: list[str], src: str, timeout: float | None = None) -> dict:
    return _runner.ffprobe_json(args, src, timeout)


def ffprobe_packets_csv(path: str, timeout: float | None = None) -> str:
    return _runner.ffprobe_packets_csv(path, timeout)


def ffmpeg_checked(cmd: list[str], timeout: float | None = None):
    return _runner.ffmpeg_checked(cmd, timeout)


def ffmpeg_unchecked(cmd: list[str], timeout: float | None = None):
    return _runner.ffmpeg_unchecked(cmd, timeout)


def ffmpeg_thumb(cmd: list[str], timeout: float | None = None):
    return _runner.ffmpeg_thumb(cmd, timeout)


def ffmpeg_long(cmd: list[str]):
    return _runner.ffmpeg_long(cmd)
