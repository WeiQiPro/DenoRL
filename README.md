# raylib_deno

A Deno-first, low-level binding layer that mirrors raylib's C API as closely as practical.

## Credits

This work builds on, and would not be possible without, the excellent prior art by Lino Le Van:
- Project: https://github.com/lino-levan/raylib-deno
- Package: jsr.io/@lino/raylib

I wanted to remove the higher-level, idiomatic class wrappers and expose a near 1:1 API to raylib so existing C examples and mental models translate directly.

## Goals
- Stick close to raylib's function names, constants, and structs.
- Favor simple FFI bindings over abstractions.
- Keep examples runnable with Deno permissions and idioms.

## Caveats
- File I/O (loading files from disk, etc.) should be done via Deno APIs when possible. Avoid calling into raylib for generic file operations; feed raylib buffers instead.
- Not everything is tested yet, especially some 3D APIs. Contributions are welcome.

## Usage

See `main.ts` for a working example. It demonstrates:
- Window setup and teardown
- DrawFPS and text
- Drawing multiple shapes
- A simple “plexus” style animation

Run in dev:

```bash
# Build native blobs if needed, then run
deno task dev
```

Or run the prebuilt app:

```bash
deno task run
```

## Testing status
- Many 2D drawing and window functions validated.
- Input and timing basics validated.
- Audio validated for basic playback.
- 3D functions: not fully tested. If you can help test/fix, please open a PR.

## Contributing
- Bug reports and small PRs welcome (particularly for 3D coverage).
- Please prefer keeping the API surface close to raylib C, and add helpers as separate utilities if needed.

## License & Disclaimer
- This project is licensed under the MIT License (see `LICENSE`). Free to use, modify, and distribute.
- raylib itself is licensed under the zlib/libpng license; those terms apply to raylib binaries/headers used by these bindings.
- These bindings are provided “as is”, without warranty of any kind. I am not responsible for any damages or issues arising from use of these bindings or the underlying libraries.

Thanks again to Lino for the original Deno bindings that inspired this work.

