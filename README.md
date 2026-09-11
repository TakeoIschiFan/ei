# ei

Minimal media server with optional transcoding. Hassle-free streaming of media files to all devices on your LAN.

## Run

Grab a standalone `ei` executable for your operating system from the [releases page](https://github.com/TakeoIschiFan/ei/releases).

Or install from PyPI if you have Python installed and prefer that:

```shell
pip install ei-media
# or
pipx install ei-media
# or
uv tool install ei-media
```

You also need [ffmpeg](https://ffmpeg.org/) available on your system.

Then start the server with:

```shell
ei . --transcode --no-pin
```

## Configuration

All configuration is via CLI flags (`ei --help`):

```shell
ei [DIR] [options]
```

### Filesystem Options:

    DIR                  Media directory to serve.
                         Default: current directory.
    --recursive          Also descend into subdirectories.
                         Default: top level only.
    --extra-extensions EXTS
                         Extra container extensions to scan,
                         comma-separated (e.g. --extra-extensions
                         .nut,.mxf).
                         The built-in list already covers common
                         containers (mkv, mp4, webm, ts, avi, ...).
    --cache-dir DIR      Where probe metadata, segments, and
                         thumbnails are cached.
                         Default: ~/.cache/ei-media on Linux,
                         ~/Library/Caches/ei-media on macOS,
                         %LOCALAPPDATA%/ei-media on Windows.
    --cache-size SIZE    max cache size for video segments
                         Accepts suffixes KB/MB/GB, 0 = unlimited.
                         Default: 5GB.

### Network and Auth Options:

    --host HOST          Interface to listen on.
                         Default: 0.0.0.0 (LAN-wide).
    --port PORT          Port to listen on.
                         Default: 8509.
    --pin PIN            Require a 4-digit PIN. Default
                         behavior generates a random PIN
                         if not provided.
    --no-pin             Disable the PIN (open access).

### Video Options:

    --transcode          Enable the transcode stack
                         Default: off (direct stream-copy only).
    --nvenc              Encode with NVIDIA NVENC instead
                         of CPU. Make sure your ffmpeg and
                         graphics stack supports it.

## Contributing

Issues and PRs welcome.

This project uses `uv`:

```shell
# create .venv with dev tools
uv sync --group dev

# run the program
uv run python -m ei . --no-pin

# run lint and tests
uv run pytest
uv run ruff

# test CI locally: ruff + pytest + wheel + vendor + executables
bash scripts/check.sh --check --exe
```

## License

[GPLv3](LICENSE).
