"""PyInstaller build for the ``ei`` executable."""

from PyInstaller.utils.hooks import collect_data_files

a = Analysis(  # noqa: F821 — PyInstaller spec DSL
    ["ei/__main__.py"],
    pathex=[],
    binaries=[],
    datas=collect_data_files("ei"),
    hiddenimports=[],
    hookspath=[],
    excludes=["tkinter", "unittest", "pydoc", "doctest"],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=None,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=None)  # noqa: F821
exe = EXE(  # noqa: F821
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    name="ei",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=True,
)
