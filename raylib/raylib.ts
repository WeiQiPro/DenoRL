/**
 * Raylib Deno - Comprehensive 1:1 raylib bindings for Deno
 * This file consolidates all raylib functionality into a single module
 * @module
 */

import { lib } from "./bindings/bindings.ts";

// ============================================================================
// TYPES
// ============================================================================

// Note: Core numeric types (i8, i32, i64, u8, u32, u64, f32, f64, pointer, buffer)
// are now globally available via types.d.ts

/**
 * Core types and utilities for raylib bindings
 * @module
 */

/**
 * 2D Vector with x, y coordinates
 */
export class Vector2 {
  constructor(public x: f32, public y: f32) {}

  static fromBuffer(buffer: ArrayBuffer): Vector2 {
    const view = new DataView(buffer);
    return new Vector2(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian)
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y]).buffer;
  }

  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }
}

/**
 * 3D Vector with x, y, z coordinates
 */
export class Vector3 {
  constructor(public x: f32, public y: f32, public z: f32) {}

  static fromBuffer(buffer: ArrayBuffer): Vector3 {
    const view = new DataView(buffer);
    return new Vector3(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian)
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y, this.z]).buffer;
  }

  toString(): string {
    return `Vector3(${this.x}, ${this.y}, ${this.z})`;
  }
}

/**
 * 4D Vector with x, y, z, w coordinates
 */
export class Vector4 {
  constructor(public x: f32, public y: f32, public z: f32, public w: f32) {}

  static fromBuffer(buffer: ArrayBuffer): Vector4 {
    const view = new DataView(buffer);
    return new Vector4(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
      view.getFloat32(12, littleEndian)
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y, this.z, this.w]).buffer;
  }

  toString(): string {
    return `Vector4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }
}

/**
 * Rectangle with position and size
 */
export class Rectangle {
  constructor(
    public x: f32,
    public y: f32,
    public width: f32,
    public height: f32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Rectangle {
    const view = new DataView(buffer);
    return new Rectangle(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
      view.getFloat32(12, littleEndian)
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y, this.width, this.height]).buffer;
  }

  toString(): string {
    return `Rectangle(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
  }
}

/**
 * Color with RGBA values (0-255)
 */
export class Color {
  constructor(
    public r: i32,
    public g: i32,
    public b: i32,
    public a: i32 = 255
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Color {
    const view = new DataView(buffer);
    return new Color(
      view.getUint8(0),
      view.getUint8(1),
      view.getUint8(2),
      view.getUint8(3)
    );
  }

  get buffer(): ArrayBuffer {
    return new Uint8Array([this.r, this.g, this.b, this.a]).buffer;
  }

  toString(): string {
    return `Color(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}

export const LIGHTGRAY = new Color(200, 200, 200, 255);
export const GRAY = new Color(130, 130, 130, 255);
export const DARKGRAY = new Color(80, 80, 80, 255);
export const YELLOW = new Color(253, 249, 0, 255);
export const GOLD = new Color(255, 203, 0, 255);
export const ORANGE = new Color(255, 161, 0, 255);
export const PINK = new Color(255, 109, 194, 255);
export const RED = new Color(230, 41, 55, 255);
export const MAROON = new Color(190, 33, 55, 255);
export const GREEN = new Color(0, 228, 48, 255);
export const LIME = new Color(0, 158, 47, 255);
export const DARKGREEN = new Color(0, 117, 44, 255);
export const SKYBLUE = new Color(102, 191, 255, 255);
export const BLUE = new Color(0, 121, 241, 255);
export const DARKBLUE = new Color(0, 82, 172, 255);
export const PURPLE = new Color(200, 122, 255, 255);
export const VIOLET = new Color(135, 60, 190, 255);
export const DARKPURPLE = new Color(112, 31, 126, 255);
export const BEIGE = new Color(211, 176, 131, 255);
export const BROWN = new Color(127, 106, 79, 255);
export const DARKBROWN = new Color(76, 63, 47, 255);
export const WHITE = new Color(255, 255, 255, 255);
export const BLACK = new Color(0, 0, 0, 255);
export const BLANK = new Color(0, 0, 0, 0);
export const MAGENTA = new Color(255, 0, 255, 255);
export const RAYWHITE = new Color(245, 245, 245, 255);

/**
 * Ray with position and direction
 */
export class Ray {
  constructor(public position: Vector3, public direction: Vector3) {}

  static fromBuffer(buffer: ArrayBuffer): Ray {
    const view = new DataView(buffer);
    return new Ray(
      new Vector3(
        view.getFloat32(0, littleEndian),
        view.getFloat32(4, littleEndian),
        view.getFloat32(8, littleEndian)
      ),
      new Vector3(
        view.getFloat32(12, littleEndian),
        view.getFloat32(16, littleEndian),
        view.getFloat32(20, littleEndian)
      )
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.position.x,
      this.position.y,
      this.position.z,
      this.direction.x,
      this.direction.y,
      this.direction.z,
    ]).buffer;
  }

  toString(): string {
    return `Ray(${this.position}, ${this.direction})`;
  }
}

/**
 * Bounding box with min and max vectors
 */
export class BoundingBox {
  constructor(public min: Vector3, public max: Vector3) {}

  static fromBuffer(buffer: ArrayBuffer): BoundingBox {
    const view = new DataView(buffer);
    return new BoundingBox(
      new Vector3(
        view.getFloat32(0, littleEndian),
        view.getFloat32(4, littleEndian),
        view.getFloat32(8, littleEndian)
      ),
      new Vector3(
        view.getFloat32(12, littleEndian),
        view.getFloat32(16, littleEndian),
        view.getFloat32(20, littleEndian)
      )
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.min.x,
      this.min.y,
      this.min.z,
      this.max.x,
      this.max.y,
      this.max.z,
    ]).buffer;
  }

  toString(): string {
    return `BoundingBox(${this.min}, ${this.max})`;
  }
}

/**
 * 2D Camera
 */
export class Camera2D {
  /** Camera offset (displacement from target) */
  offset: Vector2;
  /** Camera target (rotation and zoom origin) */
  target: Vector2;
  /** Camera rotation in degrees */
  rotation: f32;
  /** Camera zoom (scaling), 1.0f by default */
  zoom: f32;

  constructor(options?: {
    /** Camera offset (displacement from target) */
    offset?: Vector2;
    /** Camera target (rotation and zoom origin) */
    target?: Vector2;
    /** Camera rotation in degrees */
    rotation?: f32;
    /** Camera zoom (scaling), 1.0f by default */
    zoom?: f32;
  }) {
    this.offset = options?.offset ?? new Vector2(0, 0);
    this.target = options?.target ?? new Vector2(0, 0);
    this.rotation = options?.rotation ?? 0;
    this.zoom = options?.zoom ?? 1;
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.offset.x,
      this.offset.y,
      this.target.x,
      this.target.y,
      this.rotation,
      this.zoom,
    ]).buffer;
  }

  toString(): string {
    return `Camera2D(offset: ${this.offset}, target: ${this.target}, rotation: ${this.rotation}, zoom: ${this.zoom})`;
  }
}

/**
 * 4x4 Matrix
 */
export class Matrix {
  constructor(
    public m0: f32,
    public m1: f32,
    public m2: f32,
    public m3: f32,
    public m4: f32,
    public m5: f32,
    public m6: f32,
    public m7: f32,
    public m8: f32,
    public m9: f32,
    public m10: f32,
    public m11: f32,
    public m12: f32,
    public m13: f32,
    public m14: f32,
    public m15: f32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Matrix {
    const view = new DataView(buffer);
    return new Matrix(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
      view.getFloat32(12, littleEndian),
      view.getFloat32(16, littleEndian),
      view.getFloat32(20, littleEndian),
      view.getFloat32(24, littleEndian),
      view.getFloat32(28, littleEndian),
      view.getFloat32(32, littleEndian),
      view.getFloat32(36, littleEndian),
      view.getFloat32(40, littleEndian),
      view.getFloat32(44, littleEndian),
      view.getFloat32(48, littleEndian),
      view.getFloat32(52, littleEndian),
      view.getFloat32(56, littleEndian),
      view.getFloat32(60, littleEndian)
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.m0,
      this.m1,
      this.m2,
      this.m3,
      this.m4,
      this.m5,
      this.m6,
      this.m7,
      this.m8,
      this.m9,
      this.m10,
      this.m11,
      this.m12,
      this.m13,
      this.m14,
      this.m15,
    ]).buffer;
  }

  toString(): string {
    return `Matrix([${this.m0}, ${this.m1}, ${this.m2}, ${this.m3}], [${this.m4}, ${this.m5}, ${this.m6}, ${this.m7}], [${this.m8}, ${this.m9}, ${this.m10}, ${this.m11}], [${this.m12}, ${this.m13}, ${this.m14}, ${this.m15}])`;
  }
}

// ============================================================================
//  HELPER
// ============================================================================

/**
 * Helper utilities for raylib bindings
 * @module
 */

/**
 * Check if the system is little endian
 */
export const littleEndian =
  new Uint8Array(new Uint32Array([0x12345678]).buffer as ArrayBuffer)[0] ===
  0x78;

/**
 * Concatenate multiple Vector2 arrays into a single buffer
 */
export function concatVector2s(vectors: Vector2[]): ArrayBuffer {
  const buffer = new Float32Array(vectors.length * 2);
  for (let i = 0; i < vectors.length; i++) {
    buffer[i * 2] = vectors[i].x;
    buffer[i * 2 + 1] = vectors[i].y;
  }
  return buffer.buffer;
}

/**
 * Concatenate multiple Vector3 arrays into a single buffer
 */
export function concatVector3s(vectors: Vector3[]): ArrayBuffer {
  const buffer = new Float32Array(vectors.length * 3);
  for (let i = 0; i < vectors.length; i++) {
    buffer[i * 3] = vectors[i].x;
    buffer[i * 3 + 1] = vectors[i].y;
    buffer[i * 3 + 2] = vectors[i].z;
  }
  return buffer.buffer;
}

/**
 * Create a null-terminated string buffer
 */
export function createStringBuffer(str: string): ArrayBuffer {
  return new TextEncoder().encode(str + "\0").buffer;
}

/**
 * Read a null-terminated string from a buffer
 */
export function readStringFromBuffer(buffer: ArrayBuffer): string {
  const view = new Uint8Array(buffer);
  let end = 0;
  while (end < view.length && view[end] !== 0) {
    end++;
  }
  return new TextDecoder().decode(view.slice(0, end));
}

// Import types for the helper functions

// ============================================================================
// WINDOW
// ============================================================================

/**
 * Window management functions - 1:1 raylib bindings
 * @module
 */

// Window state flags
export const FLAG_VSYNC_HINT = 0x00000040;
export const FLAG_FULLSCREEN_MODE = 0x00000002;
export const FLAG_WINDOW_RESIZABLE = 0x00000004;
export const FLAG_WINDOW_UNDECORATED = 0x00000008;
export const FLAG_WINDOW_HIDDEN = 0x00000080;
export const FLAG_WINDOW_MINIMIZED = 0x00000200;
export const FLAG_WINDOW_MAXIMIZED = 0x00000400;
export const FLAG_WINDOW_UNFOCUSED = 0x00000800;
export const FLAG_WINDOW_TOPMOST = 0x00001000;
export const FLAG_WINDOW_ALWAYS_RUN = 0x00000100;
export const FLAG_WINDOW_TRANSPARENT = 0x00000010;
export const FLAG_WINDOW_HIGH_DPI = 0x00002000;
export const FLAG_WINDOW_MOUSE_PASSTHROUGH = 0x00004000;
export const FLAG_BORDERLESS_WINDOWED_MODE = 0x00008000;
export const FLAG_MSAA_4X_HINT = 0x00000020;
export const FLAG_INTERLACED_HINT = 0x00010000;

/**
 * Initialize window and OpenGL context
 */
export function InitWindow(width: i32, height: i32, title: string): void {
  lib.symbols.InitWindow(width, height, createStringBuffer(title));
}

/**
 * Close window and unload OpenGL context
 */
export function CloseWindow(): void {
  lib.symbols.CloseWindow();
}

/**
 * Check if application should close (KEY_ESCAPE pressed or windows close icon clicked)
 */
export function WindowShouldClose(): boolean {
  return !!lib.symbols.WindowShouldClose();
}

/**
 * Check if window has been initialized successfully
 */
export function IsWindowReady(): boolean {
  return !!lib.symbols.IsWindowReady();
}

/**
 * Check if window is currently fullscreen
 */
export function IsWindowFullscreen(): boolean {
  return !!lib.symbols.IsWindowFullscreen();
}

/**
 * Check if window is currently hidden (only PLATFORM_DESKTOP)
 */
export function IsWindowHidden(): boolean {
  return !!lib.symbols.IsWindowHidden();
}

/**
 * Check if window is currently minimized (only PLATFORM_DESKTOP)
 */
export function IsWindowMinimized(): boolean {
  return !!lib.symbols.IsWindowMinimized();
}

/**
 * Check if window is currently maximized (only PLATFORM_DESKTOP)
 */
export function IsWindowMaximized(): boolean {
  return !!lib.symbols.IsWindowMaximized();
}

/**
 * Check if window is currently focused (only PLATFORM_DESKTOP)
 */
export function IsWindowFocused(): boolean {
  return !!lib.symbols.IsWindowFocused();
}

/**
 * Check if window has been resized last frame
 */
export function IsWindowResized(): boolean {
  return !!lib.symbols.IsWindowResized();
}

/**
 * Check if one specific window flag is enabled
 */
export function IsWindowState(flag: u32): boolean {
  return !!lib.symbols.IsWindowState(flag);
}

/**
 * Set window configuration state using flags (only PLATFORM_DESKTOP)
 */
export function SetWindowState(flags: u32): void {
  lib.symbols.SetWindowState(flags);
}

/**
 * Clear window configuration state flags
 */
export function ClearWindowState(flags: u32): void {
  lib.symbols.ClearWindowState(flags);
}

/**
 * Toggle window state: fullscreen/windowed (only PLATFORM_DESKTOP)
 */
export function ToggleFullscreen(): void {
  lib.symbols.ToggleFullscreen();
}

/**
 * Toggle window state: borderless windowed (only PLATFORM_DESKTOP)
 */
export function ToggleBorderlessWindowed(): void {
  lib.symbols.ToggleBorderlessWindowed();
}

/**
 * Set window state: maximized, if resizable (only PLATFORM_DESKTOP)
 */
export function MaximizeWindow(): void {
  lib.symbols.MaximizeWindow();
}

/**
 * Set window state: minimized, if resizable (only PLATFORM_DESKTOP)
 */
export function MinimizeWindow(): void {
  lib.symbols.MinimizeWindow();
}

/**
 * Set window state: not minimized/maximized (only PLATFORM_DESKTOP)
 */
export function RestoreWindow(): void {
  lib.symbols.RestoreWindow();
}

/**
 * Set icon for window (single image, RGBA 32bit, only PLATFORM_DESKTOP)
 */
export function SetWindowIcon(image: { buffer: ArrayBuffer }): void {
  lib.symbols.SetWindowIcon(image.buffer as BufferSource);
}

/**
 * Set icon for window (multiple images, RGBA 32bit, only PLATFORM_DESKTOP)
 */
export function SetWindowIcons(
  images: { buffer: ArrayBuffer }[],
  count: i32
): void {
  const buffer = new Uint8Array(24 * count);
  for (let i = 0; i < count; i++) {
    buffer.set(new Uint8Array(images[i].buffer as ArrayBuffer), 24 * i);
  }
  lib.symbols.SetWindowIcons(Deno.UnsafePointer.of(buffer), count);
}

/**
 * Set title for window (only PLATFORM_DESKTOP and PLATFORM_WEB)
 */
export function SetWindowTitle(title: string): void {
  lib.symbols.SetWindowTitle(createStringBuffer(title));
}

/**
 * Set window position on screen (only PLATFORM_DESKTOP)
 */
export function SetWindowPosition(x: i32, y: i32): void {
  lib.symbols.SetWindowPosition(x, y);
}

/**
 * Set monitor for the current window
 */
export function SetWindowMonitor(monitor: i32): void {
  lib.symbols.SetWindowMonitor(monitor);
}

/**
 * Set window minimum dimensions (for FLAG_WINDOW_RESIZABLE)
 */
export function SetWindowMinSize(width: i32, height: i32): void {
  lib.symbols.SetWindowMinSize(width, height);
}

/**
 * Set window maximum dimensions (for FLAG_WINDOW_RESIZABLE)
 */
export function SetWindowMaxSize(width: i32, height: i32): void {
  lib.symbols.SetWindowMaxSize(width, height);
}

/**
 * Set window dimensions
 */
export function SetWindowSize(width: i32, height: i32): void {
  lib.symbols.SetWindowSize(width, height);
}

/**
 * Set window opacity [0.0f..1.0f] (only PLATFORM_DESKTOP)
 */
export function SetWindowOpacity(opacity: f32): void {
  lib.symbols.SetWindowOpacity(opacity);
}

/**
 * Set window focused (only PLATFORM_DESKTOP)
 */
export function SetWindowFocused(): void {
  lib.symbols.SetWindowFocused();
}

/**
 * Get native window handle
 */
export function GetWindowHandle(): Deno.PointerValue {
  return lib.symbols.GetWindowHandle();
}

/**
 * Get current screen width
 */
export function GetScreenWidth(): i32 {
  return lib.symbols.GetScreenWidth();
}

/**
 * Get current screen height
 */
export function GetScreenHeight(): i32 {
  return lib.symbols.GetScreenHeight();
}

/**
 * Get current render width (it considers HiDPI)
 */
export function GetRenderWidth(): i32 {
  return lib.symbols.GetRenderWidth();
}

/**
 * Get current render height (it considers HiDPI)
 */
export function GetRenderHeight(): i32 {
  return lib.symbols.GetRenderHeight();
}

/**
 * Get number of connected monitors
 */
export function GetMonitorCount(): i32 {
  return lib.symbols.GetMonitorCount();
}

/**
 * Get current connected monitor
 */
export function GetCurrentMonitor(): i32 {
  return lib.symbols.GetCurrentMonitor();
}

/**
 * Get specified monitor position
 */
export function GetMonitorPosition(monitor: i32): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetMonitorPosition(monitor).buffer as ArrayBuffer
  );
}

/**
 * Get specified monitor width (current video mode used by monitor)
 */
export function GetMonitorWidth(monitor: i32): i32 {
  return lib.symbols.GetMonitorWidth(monitor);
}

/**
 * Get specified monitor height (current video mode used by monitor)
 */
export function GetMonitorHeight(monitor: i32): i32 {
  return lib.symbols.GetMonitorHeight(monitor);
}

/**
 * Get specified monitor physical width in millimetres
 */
export function GetMonitorPhysicalWidth(monitor: i32): i32 {
  return lib.symbols.GetMonitorPhysicalWidth(monitor);
}

/**
 * Get specified monitor physical height in millimetres
 */
export function GetMonitorPhysicalHeight(monitor: i32): i32 {
  return lib.symbols.GetMonitorPhysicalHeight(monitor);
}

/**
 * Get specified monitor refresh rate
 */
export function GetMonitorRefreshRate(monitor: i32): i32 {
  return lib.symbols.GetMonitorRefreshRate(monitor);
}

/**
 * Get window position XY on monitor
 */
export function GetWindowPosition(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWindowPosition().buffer as ArrayBuffer
  );
}

/**
 * Get window scale DPI factor
 */
export function GetWindowScaleDPI(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWindowScaleDPI().buffer as ArrayBuffer
  );
}

/**
 * Get the human-readable, UTF-8 encoded name of the primary monitor
 */
export function GetMonitorName(monitor: i32): string {
  const ptr = lib.symbols.GetMonitorName(monitor);
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Set clipboard text content
 */
export function SetClipboardText(text: string): void {
  lib.symbols.SetClipboardText(createStringBuffer(text));
}

/**
 * Get clipboard text content
 */
export function GetClipboardText(): string {
  const ptr = lib.symbols.GetClipboardText();
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Enable waiting for events on EndDrawing(), no automatic event polling
 */
export function EnableEventWaiting(): void {
  lib.symbols.EnableEventWaiting();
}

/**
 * Disable waiting for events on EndDrawing(), resume automatic event polling
 */
export function DisableEventWaiting(): void {
  lib.symbols.DisableEventWaiting();
}

// ============================================================================
// CURSOR
// ============================================================================

/**
 * Cursor management functions - 1:1 raylib bindings
 * @module
 */

/**
 * Shows cursor
 */
export function ShowCursor(): void {
  lib.symbols.ShowCursor();
}

/**
 * Hides cursor
 */
export function HideCursor(): void {
  lib.symbols.HideCursor();
}

/**
 * Check if cursor is not visible
 */
export function IsCursorHidden(): boolean {
  return !!lib.symbols.IsCursorHidden();
}

/**
 * Enables cursor (unlock cursor)
 */
export function EnableCursor(): void {
  lib.symbols.EnableCursor();
}

/**
 * Disables cursor (lock cursor)
 */
export function DisableCursor(): void {
  lib.symbols.DisableCursor();
}

/**
 * Check if cursor is on the current screen
 */
export function IsCursorOnScreen(): boolean {
  return !!lib.symbols.IsCursorOnScreen();
}

// ============================================================================
// DRAWING
// ============================================================================

/**
 * Drawing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Set background color (framebuffer clear color)
 */
export function ClearBackground(color: Color): void {
  lib.symbols.ClearBackground(color.buffer as BufferSource);
}

/**
 * Setup canvas (framebuffer) to start drawing
 */
export function BeginDrawing(): void {
  lib.symbols.BeginDrawing();
}

/**
 * End canvas drawing and swap buffers (double buffering)
 */
export function EndDrawing(): void {
  lib.symbols.EndDrawing();
}

/**
 * Initialize 2D mode with custom camera (2D)
 */
export function BeginMode2D(camera: Camera2D): void {
  lib.symbols.BeginMode2D(camera.buffer as BufferSource);
}

/**
 * Ends 2D mode with custom camera
 */
export function EndMode2D(): void {
  lib.symbols.EndMode2D();
}

/**
 * Initializes 3D mode with custom camera (3D)
 */
export function BeginMode3D(camera: Camera3D): void {
  lib.symbols.BeginMode3D(camera.buffer as BufferSource);
}

/**
 * Ends 3D mode and returns to default 2D orthographic mode
 */
export function EndMode3D(): void {
  lib.symbols.EndMode3D();
}

/**
 * Begin drawing to render texture
 */
export function BeginTextureMode(target: { buffer: ArrayBuffer }): void {
  lib.symbols.BeginTextureMode(target.buffer as BufferSource);
}

/**
 * Ends drawing to render texture
 */
export function EndTextureMode(): void {
  lib.symbols.EndTextureMode();
}

/**
 * Begin custom shader drawing
 */
export function BeginShaderMode(shader: { buffer: ArrayBuffer }): void {
  lib.symbols.BeginShaderMode(shader.buffer as BufferSource);
}

/**
 * End custom shader drawing (use default shader)
 */
export function EndShaderMode(): void {
  lib.symbols.EndShaderMode();
}

/**
 * Begin blending mode (alpha, additive, multiplied, subtract, custom)
 */
export function BeginBlendMode(mode: i32): void {
  lib.symbols.BeginBlendMode(mode);
}

/**
 * End blending mode (reset to default: alpha blending)
 */
export function EndBlendMode(): void {
  lib.symbols.EndBlendMode();
}

/**
 * Begin scissor mode (define screen area for following drawing)
 */
export function BeginScissorMode(
  x: i32,
  y: i32,
  width: i32,
  height: i32
): void {
  lib.symbols.BeginScissorMode(x, y, width, height);
}

/**
 * End scissor mode
 */
export function EndScissorMode(): void {
  lib.symbols.EndScissorMode();
}

/**
 * Begin stereo rendering (requires VR simulator)
 */
export function BeginVrStereoMode(config: { buffer: ArrayBuffer }): void {
  lib.symbols.BeginVrStereoMode(config.buffer as BufferSource);
}

/**
 * End stereo rendering (requires VR simulator)
 */
export function EndVrStereoMode(): void {
  lib.symbols.EndVrStereoMode();
}

// ============================================================================
// TIMING
// ============================================================================

/**
 * Timing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Set target FPS (maximum)
 */
export function SetTargetFPS(fps: i32): void {
  lib.symbols.SetTargetFPS(fps);
}

/**
 * Get time in seconds for last frame drawn (delta time)
 */
export function GetFrameTime(): f32 {
  return lib.symbols.GetFrameTime();
}

/**
 * Get elapsed time in seconds since InitWindow()
 */
export function GetTime(): f64 {
  return lib.symbols.GetTime();
}

/**
 * Returns current FPS
 */
export function GetFPS(): i32 {
  return lib.symbols.GetFPS();
}

/**
 * Swap back buffer with front buffer (screen drawing)
 */
export function SwapScreenBuffer(): void {
  lib.symbols.SwapScreenBuffer();
}

/**
 * Register all input events
 */
export function PollInputEvents(): void {
  lib.symbols.PollInputEvents();
}

/**
 * Wait for some time (halt program execution)
 */
export function WaitTime(seconds: f32): void {
  lib.symbols.WaitTime(seconds);
}

/**
 * Set the seed for the random number generator
 */
export function SetRandomSeed(seed: u32): void {
  lib.symbols.SetRandomSeed(seed);
}

/**
 * Get a random value between min and max (both included)
 */
export function GetRandomValue(min: i32, max: i32): i32 {
  return lib.symbols.GetRandomValue(min, max);
}

// ============================================================================
// AUDIO
// ============================================================================

/**
 * Audio device functions - 1:1 raylib bindings
 * @module
 */

/**
 * Initialize audio device and context
 */
export function InitAudioDevice(): void {
  lib.symbols.InitAudioDevice();
}

/**
 * Close the audio device and context
 */
export function CloseAudioDevice(): void {
  lib.symbols.CloseAudioDevice();
}

/**
 * Check if audio device has been initialized successfully
 */
export function IsAudioDeviceReady(): boolean {
  return !!lib.symbols.IsAudioDeviceReady();
}

/**
 * Set master volume (listener)
 */
export function SetMasterVolume(volume: f32): void {
  lib.symbols.SetMasterVolume(volume);
}

/**
 * Get master volume (listener)
 */
export function GetMasterVolume(): f32 {
  return lib.symbols.GetMasterVolume();
}

// ============================================================================
// AUDIO STREAM
// ============================================================================

/**
 * Audio stream management functions - 1:1 raylib bindings
 * @module
 */

/**
 * AudioStream type
 */
export class AudioStream {
  constructor(
    public audioBuffer: { buffer: ArrayBuffer },
    public processor: { buffer: ArrayBuffer },
    public sampleRate: u32,
    public sampleSize: u32,
    public channels: u32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): AudioStream {
    const view = new DataView(buffer);
    return new AudioStream(
      { buffer: buffer.slice(0, 8) }, // audioBuffer
      { buffer: buffer.slice(8, 16) }, // processor
      view.getUint32(16, true), // sampleRate
      view.getUint32(20, true), // sampleSize
      view.getUint32(24, true) // channels
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(28);
    const view = new DataView(buffer);
    // Copy audioBuffer and processor data
    new Uint8Array(buffer, 0, 8).set(
      new Uint8Array(this.audioBuffer.buffer as ArrayBuffer)
    );
    new Uint8Array(buffer, 8, 8).set(
      new Uint8Array(this.processor.buffer as ArrayBuffer)
    );
    view.setUint32(16, this.sampleRate, true);
    view.setUint32(20, this.sampleSize, true);
    view.setUint32(24, this.channels, true);
    return buffer;
  }
}

/**
 * Load audio stream (to stream raw audio pcm data)
 */
export function LoadAudioStream(
  sampleRate: u32,
  sampleSize: u32,
  channels: u32
): AudioStream {
  return AudioStream.fromBuffer(
    lib.symbols.LoadAudioStream(sampleRate, sampleSize, channels).buffer
  );
}

/**
 * Check if audio stream is ready
 */
export function IsAudioStreamReady(stream: AudioStream): boolean {
  return !!lib.symbols.IsAudioStreamReady(stream.buffer as BufferSource);
}

/**
 * Unload audio stream and free memory
 */
export function UnloadAudioStream(stream: AudioStream): void {
  lib.symbols.UnloadAudioStream(stream.buffer as BufferSource);
}

/**
 * Update audio stream buffers with data
 */
export function UpdateAudioStream(
  stream: AudioStream,
  data: f32[],
  frameCount: i32
): void {
  const buffer = new Float32Array(data);
  lib.symbols.UpdateAudioStream(
    stream.buffer,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    frameCount
  );
}

/**
 * Check if any audio stream buffers requires refill
 */
export function IsAudioStreamProcessed(stream: AudioStream): boolean {
  return !!lib.symbols.IsAudioStreamProcessed(stream.buffer as BufferSource);
}

/**
 * Play audio stream
 */
export function PlayAudioStream(stream: AudioStream): void {
  lib.symbols.PlayAudioStream(stream.buffer as BufferSource);
}

/**
 * Pause audio stream
 */
export function PauseAudioStream(stream: AudioStream): void {
  lib.symbols.PauseAudioStream(stream.buffer as BufferSource);
}

/**
 * Resume audio stream
 */
export function ResumeAudioStream(stream: AudioStream): void {
  lib.symbols.ResumeAudioStream(stream.buffer as BufferSource);
}

/**
 * Check if audio stream is playing
 */
export function IsAudioStreamPlaying(stream: AudioStream): boolean {
  return !!lib.symbols.IsAudioStreamPlaying(stream.buffer as BufferSource);
}

/**
 * Stop audio stream
 */
export function StopAudioStream(stream: AudioStream): void {
  lib.symbols.StopAudioStream(stream.buffer as BufferSource);
}

/**
 * Set volume for audio stream (1.0 is max level)
 */
export function SetAudioStreamVolume(stream: AudioStream, volume: f32): void {
  lib.symbols.SetAudioStreamVolume(stream.buffer as ArrayBuffer, volume);
}

/**
 * Set pitch for audio stream (1.0 is base level)
 */
export function SetAudioStreamPitch(stream: AudioStream, pitch: f32): void {
  lib.symbols.SetAudioStreamPitch(stream.buffer, pitch);
}

/**
 * Set pan for audio stream (0.5 is center)
 */
export function SetAudioStreamPan(stream: AudioStream, pan: f32): void {
  lib.symbols.SetAudioStreamPan(stream.buffer, pan);
}

// ============================================================================
// SOUND
// ============================================================================

/**
 * Sound loading and playing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Sound type
 */
export class Sound {
  constructor(public stream: { buffer: ArrayBuffer }, public frameCount: i32) {}

  static fromBuffer(buffer: ArrayBuffer): Sound {
    const view = new DataView(buffer);
    return new Sound(
      { buffer: buffer.slice(0, 8) }, // stream
      view.getUint32(8, true) // frameCount
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(12);
    new Uint8Array(buffer, 0, 8).set(
      new Uint8Array(this.stream.buffer as ArrayBuffer)
    );
    const view = new DataView(buffer);
    view.setUint32(8, this.frameCount, true);
    return buffer;
  }
}

/**
 * Load sound from file
 */
export function LoadSound(fileName: string): Sound {
  return Sound.fromBuffer(
    lib.symbols.LoadSound(createStringBuffer(fileName)).buffer
  );
}

/**
 * Load sound from wave data
 */
export function LoadSoundFromWave(wave: { buffer: ArrayBuffer }): Sound {
  return Sound.fromBuffer(
    lib.symbols.LoadSoundFromWave(wave.buffer as BufferSource)
      .buffer as ArrayBuffer
  );
}

/**
 * Check if a sound is ready
 */
export function IsSoundReady(sound: Sound): boolean {
  return !!lib.symbols.IsSoundReady(sound.buffer as BufferSource);
}

/**
 * Unload sound
 */
export function UnloadSound(sound: Sound): void {
  lib.symbols.UnloadSound(sound.buffer as BufferSource);
}

/**
 * Play a sound
 */
export function PlaySound(sound: Sound): void {
  lib.symbols.PlaySound(sound.buffer as BufferSource);
}

/**
 * Stop playing a sound
 */
export function StopSound(sound: Sound): void {
  lib.symbols.StopSound(sound.buffer as BufferSource);
}

/**
 * Pause a sound
 */
export function PauseSound(sound: Sound): void {
  lib.symbols.PauseSound(sound.buffer as BufferSource);
}

/**
 * Resume a paused sound
 */
export function ResumeSound(sound: Sound): void {
  lib.symbols.ResumeSound(sound.buffer as BufferSource);
}

/**
 * Check if a sound is currently playing
 */
export function IsSoundPlaying(sound: Sound): boolean {
  return !!lib.symbols.IsSoundPlaying(sound.buffer as BufferSource);
}

/**
 * Set volume for a sound (1.0 is max level)
 */
export function SetSoundVolume(sound: Sound, volume: f32): void {
  lib.symbols.SetSoundVolume(sound.buffer, volume);
}

/**
 * Set pitch for a sound (1.0 is base level)
 */
export function SetSoundPitch(sound: Sound, pitch: f32): void {
  lib.symbols.SetSoundPitch(sound.buffer, pitch);
}

/**
 * Set pan for a sound (0.5 is center)
 */
export function SetSoundPan(sound: Sound, pan: f32): void {
  lib.symbols.SetSoundPan(sound.buffer, pan);
}

// ============================================================================
// MUSIC
// ============================================================================

/**
 * Music streaming functions - 1:1 raylib bindings
 * @module
 */

/**
 * Music type
 */
export class Music {
  constructor(
    public stream: { buffer: ArrayBuffer },
    public frameCount: i32,
    public looping: boolean,
    public ctxType: i32,
    public ctxData: { buffer: ArrayBuffer }
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Music {
    const view = new DataView(buffer);
    return new Music(
      { buffer: buffer.slice(0, 8) }, // stream
      view.getUint32(8, true), // frameCount
      !!view.getUint8(12), // looping
      view.getInt32(13, true), // ctxType
      { buffer: buffer.slice(17, 25) } // ctxData
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(25);
    new Uint8Array(buffer, 0, 8).set(
      new Uint8Array(this.stream.buffer as ArrayBuffer)
    );
    const view = new DataView(buffer);
    view.setUint32(8, this.frameCount, true);
    view.setUint8(12, this.looping ? 1 : 0);
    view.setInt32(13, this.ctxType, true);
    new Uint8Array(buffer, 17, 8).set(
      new Uint8Array(this.ctxData.buffer as ArrayBuffer)
    );
    return buffer;
  }
}

/**
 * Load music stream from file
 */
export function LoadMusicStream(fileName: string): Music {
  return Music.fromBuffer(
    lib.symbols.LoadMusicStream(createStringBuffer(fileName)).buffer
  );
}

/**
 * Load music stream from data
 */
export function LoadMusicStreamFromMemory(
  fileType: string,
  data: Uint8Array,
  dataSize: i32
): Music {
  return Music.fromBuffer(
    lib.symbols.LoadMusicStreamFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
      dataSize
    ).buffer
  );
}

/**
 * Check if a music stream is ready
 */

/**
 * Unload music stream
 */
export function UnloadMusicStream(music: Music): void {
  lib.symbols.UnloadMusicStream(music.buffer as BufferSource);
}

/**
 * Start music playing
 */
export function PlayMusicStream(music: Music): void {
  lib.symbols.PlayMusicStream(music.buffer as BufferSource);
}

/**
 * Check if music is playing
 */
export function IsMusicStreamPlaying(music: Music): boolean {
  return !!lib.symbols.IsMusicStreamPlaying(music.buffer as BufferSource);
}

/**
 * Updates buffers for music streaming
 */
export function UpdateMusicStream(music: Music): void {
  lib.symbols.UpdateMusicStream(music.buffer as BufferSource);
}

/**
 * Stop music playing
 */
export function StopMusicStream(music: Music): void {
  lib.symbols.StopMusicStream(music.buffer as BufferSource);
}

/**
 * Pause music playing
 */
export function PauseMusicStream(music: Music): void {
  lib.symbols.PauseMusicStream(music.buffer as BufferSource);
}

/**
 * Resume music playing
 */
export function ResumeMusicStream(music: Music): void {
  lib.symbols.ResumeMusicStream(music.buffer as BufferSource);
}

/**
 * Seek music to a position (in seconds)
 */
export function SeekMusicStream(music: Music, position: f32): void {
  lib.symbols.SeekMusicStream(music.buffer, position);
}

/**
 * Set volume for music (1.0 is max level)
 */
export function SetMusicVolume(music: Music, volume: f32): void {
  lib.symbols.SetMusicVolume(music.buffer, volume);
}

/**
 * Set pitch for a music (1.0 is base level)
 */
export function SetMusicPitch(music: Music, pitch: f32): void {
  lib.symbols.SetMusicPitch(music.buffer, pitch);
}

/**
 * Set pan for a music (0.5 is center)
 */
export function SetMusicPan(music: Music, pan: f32): void {
  lib.symbols.SetMusicPan(music.buffer, pan);
}

/**
 * Get music time length (in seconds)
 */
export function GetMusicTimeLength(music: Music): f32 {
  return lib.symbols.GetMusicTimeLength(music.buffer as BufferSource);
}

/**
 * Get current music time played (in seconds)
 */
export function GetMusicTimePlayed(music: Music): f32 {
  return lib.symbols.GetMusicTimePlayed(music.buffer as BufferSource);
}

// ============================================================================
// KEYBOARD
// ============================================================================

/**
 * Keyboard input functions - 1:1 raylib bindings
 * @module
 */

// Keyboard keys
export const KEY_NULL = 0;
export const KEY_APOSTROPHE = 39;
export const KEY_COMMA = 44;
export const KEY_MINUS = 45;
export const KEY_PERIOD = 46;
export const KEY_SLASH = 47;
export const KEY_ZERO = 48;
export const KEY_ONE = 49;
export const KEY_TWO = 50;
export const KEY_THREE = 51;
export const KEY_FOUR = 52;
export const KEY_FIVE = 53;
export const KEY_SIX = 54;
export const KEY_SEVEN = 55;
export const KEY_EIGHT = 56;
export const KEY_NINE = 57;
export const KEY_SEMICOLON = 59;
export const KEY_EQUAL = 61;
export const KEY_A = 65;
export const KEY_B = 66;
export const KEY_C = 67;
export const KEY_D = 68;
export const KEY_E = 69;
export const KEY_F = 70;
export const KEY_G = 71;
export const KEY_H = 72;
export const KEY_I = 73;
export const KEY_J = 74;
export const KEY_K = 75;
export const KEY_L = 76;
export const KEY_M = 77;
export const KEY_N = 78;
export const KEY_O = 79;
export const KEY_P = 80;
export const KEY_Q = 81;
export const KEY_R = 82;
export const KEY_S = 83;
export const KEY_T = 84;
export const KEY_U = 85;
export const KEY_V = 86;
export const KEY_W = 87;
export const KEY_X = 88;
export const KEY_Y = 89;
export const KEY_Z = 90;
export const KEY_LEFT_BRACKET = 91;
export const KEY_BACKSLASH = 92;
export const KEY_RIGHT_BRACKET = 93;
export const KEY_GRAVE = 96;
export const KEY_SPACE = 32;
export const KEY_ESCAPE = 256;
export const KEY_ENTER = 257;
export const KEY_TAB = 258;
export const KEY_BACKSPACE = 259;
export const KEY_INSERT = 260;
export const KEY_DELETE = 261;
export const KEY_RIGHT = 262;
export const KEY_LEFT = 263;
export const KEY_DOWN = 264;
export const KEY_UP = 265;
export const KEY_PAGE_UP = 266;
export const KEY_PAGE_DOWN = 267;
export const KEY_HOME = 268;
export const KEY_END = 269;
export const KEY_CAPS_LOCK = 280;
export const KEY_SCROLL_LOCK = 281;
export const KEY_NUM_LOCK = 282;
export const KEY_PRINT_SCREEN = 283;
export const KEY_PAUSE = 284;
export const KEY_F1 = 290;
export const KEY_F2 = 291;
export const KEY_F3 = 292;
export const KEY_F4 = 293;
export const KEY_F5 = 294;
export const KEY_F6 = 295;
export const KEY_F7 = 296;
export const KEY_F8 = 297;
export const KEY_F9 = 298;
export const KEY_F10 = 299;
export const KEY_F11 = 300;
export const KEY_F12 = 301;
export const KEY_LEFT_SHIFT = 340;
export const KEY_LEFT_CONTROL = 341;
export const KEY_LEFT_ALT = 342;
export const KEY_LEFT_SUPER = 343;
export const KEY_RIGHT_SHIFT = 344;
export const KEY_RIGHT_CONTROL = 345;
export const KEY_RIGHT_ALT = 346;
export const KEY_RIGHT_SUPER = 347;
export const KEY_KB_MENU = 348;
export const KEY_KP_0 = 320;
export const KEY_KP_1 = 321;
export const KEY_KP_2 = 322;
export const KEY_KP_3 = 323;
export const KEY_KP_4 = 324;
export const KEY_KP_5 = 325;
export const KEY_KP_6 = 326;
export const KEY_KP_7 = 327;
export const KEY_KP_8 = 328;
export const KEY_KP_9 = 329;
export const KEY_KP_DECIMAL = 330;
export const KEY_KP_DIVIDE = 331;
export const KEY_KP_MULTIPLY = 332;
export const KEY_KP_SUBTRACT = 333;
export const KEY_KP_ADD = 334;
export const KEY_KP_ENTER = 335;
export const KEY_KP_EQUAL = 336;

/**
 * Check if a key has been pressed once
 */
export function IsKeyPressed(key: i32): boolean {
  return !!lib.symbols.IsKeyPressed(key);
}

/**
 * Check if a key has been pressed again (Only PLATFORM_DESKTOP)
 */
export function IsKeyPressedRepeat(key: i32): boolean {
  return !!lib.symbols.IsKeyPressedRepeat(key);
}

/**
 * Check if a key is being pressed
 */
export function IsKeyDown(key: i32): boolean {
  return !!lib.symbols.IsKeyDown(key);
}

/**
 * Check if a key has been released once
 */
export function IsKeyReleased(key: i32): boolean {
  return !!lib.symbols.IsKeyReleased(key);
}

/**
 * Check if a key is NOT being pressed
 */
export function IsKeyUp(key: i32): boolean {
  return !!lib.symbols.IsKeyUp(key);
}

/**
 * Get key pressed (keycode), call it multiple times for keys queued, returns 0 when the queue is empty
 */
export function GetKeyPressed(): i32 {
  return lib.symbols.GetKeyPressed();
}

/**
 * Get char pressed (unicode), call it multiple times for chars queued, returns 0 when the queue is empty
 */
export function GetCharPressed(): i32 {
  return lib.symbols.GetCharPressed();
}

/**
 * Set a custom key to exit program (default is ESC)
 */
export function SetExitKey(key: i32): void {
  lib.symbols.SetExitKey(key);
}

// ============================================================================
// MOUSE
// ============================================================================

/**
 * Mouse input functions - 1:1 raylib bindings
 * @module
 */

// Mouse buttons
export const MOUSE_BUTTON_LEFT = 0;
export const MOUSE_BUTTON_RIGHT = 1;
export const MOUSE_BUTTON_MIDDLE = 2;
export const MOUSE_BUTTON_SIDE = 3;
export const MOUSE_BUTTON_EXTRA = 4;
export const MOUSE_BUTTON_FORWARD = 5;
export const MOUSE_BUTTON_BACK = 6;

// Mouse cursor
export const MOUSE_CURSOR_DEFAULT = 0;
export const MOUSE_CURSOR_ARROW = 1;
export const MOUSE_CURSOR_IBEAM = 2;
export const MOUSE_CURSOR_CROSSHAIR = 3;
export const MOUSE_CURSOR_POINTING_HAND = 4;
export const MOUSE_CURSOR_RESIZE_EW = 5;
export const MOUSE_CURSOR_RESIZE_NS = 6;
export const MOUSE_CURSOR_RESIZE_NWSE = 7;
export const MOUSE_CURSOR_RESIZE_NESW = 8;
export const MOUSE_CURSOR_RESIZE_ALL = 9;
export const MOUSE_CURSOR_NOT_ALLOWED = 10;

/**
 * Check if a mouse button has been pressed once
 */
export function IsMouseButtonPressed(button: i32): boolean {
  return !!lib.symbols.IsMouseButtonPressed(button);
}

/**
 * Check if a mouse button is being pressed
 */
export function IsMouseButtonDown(button: i32): boolean {
  return !!lib.symbols.IsMouseButtonDown(button);
}

/**
 * Check if a mouse button has been released once
 */
export function IsMouseButtonReleased(button: i32): boolean {
  return !!lib.symbols.IsMouseButtonReleased(button);
}

/**
 * Check if a mouse button is NOT being pressed
 */
export function IsMouseButtonUp(button: i32): boolean {
  return !!lib.symbols.IsMouseButtonUp(button);
}

/**
 * Get mouse position X
 */
export function GetMouseX(): i32 {
  return lib.symbols.GetMouseX();
}

/**
 * Get mouse position Y
 */
export function GetMouseY(): i32 {
  return lib.symbols.GetMouseY();
}

/**
 * Get mouse position XY
 */
export function GetMousePosition(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetMousePosition().buffer as ArrayBuffer
  );
}

/**
 * Get mouse delta between frames
 */
export function GetMouseDelta(): Vector2 {
  return Vector2.fromBuffer(lib.symbols.GetMouseDelta().buffer as ArrayBuffer);
}

/**
 * Set mouse position XY
 */
export function SetMousePosition(x: i32, y: i32): void {
  lib.symbols.SetMousePosition(x, y);
}

/**
 * Set mouse offset
 */
export function SetMouseOffset(offsetX: i32, offsetY: i32): void {
  lib.symbols.SetMouseOffset(offsetX, offsetY);
}

/**
 * Set mouse scaling
 */
export function SetMouseScale(scaleX: f32, scaleY: f32): void {
  lib.symbols.SetMouseScale(scaleX, scaleY);
}

/**
 * Get mouse wheel movement Y
 */
export function GetMouseWheelMove(): i32 {
  return lib.symbols.GetMouseWheelMove();
}

/**
 * Get mouse wheel movement for both X and Y
 */
export function GetMouseWheelMoveV(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetMouseWheelMoveV().buffer as ArrayBuffer
  );
}

/**
 * Set mouse cursor
 */
export function SetMouseCursor(cursor: i32): void {
  lib.symbols.SetMouseCursor(cursor);
}

/**
 * Get touch position X for touch point 0 (relative to screen size)
 */
export function GetTouchX(): i32 {
  return lib.symbols.GetTouchX();
}

/**
 * Get touch position Y for touch point 0 (relative to screen size)
 */
export function GetTouchY(): i32 {
  return lib.symbols.GetTouchY();
}

/**
 * Get touch position XY for a given touch point index (relative to screen size)
 */
export function GetTouchPosition(index: i32): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetTouchPosition(index).buffer as ArrayBuffer
  );
}

/**
 * Get touch point identifier for given index
 */
export function GetTouchPointId(index: i32): i32 {
  return lib.symbols.GetTouchPointId(index);
}

/**
 * Get number of touch points
 */
export function GetTouchPointCount(): i32 {
  return lib.symbols.GetTouchPointCount();
}

// ============================================================================
// GAMEPAD
// ============================================================================

/**
 * Gamepad input functions - 1:1 raylib bindings
 * @module
 */

// Gamepad buttons
export const GAMEPAD_BUTTON_UNKNOWN = 0;
export const GAMEPAD_BUTTON_LEFT_FACE_UP = 1;
export const GAMEPAD_BUTTON_LEFT_FACE_RIGHT = 2;
export const GAMEPAD_BUTTON_LEFT_FACE_DOWN = 3;
export const GAMEPAD_BUTTON_LEFT_FACE_LEFT = 4;
export const GAMEPAD_BUTTON_RIGHT_FACE_UP = 5;
export const GAMEPAD_BUTTON_RIGHT_FACE_RIGHT = 6;
export const GAMEPAD_BUTTON_RIGHT_FACE_DOWN = 7;
export const GAMEPAD_BUTTON_RIGHT_FACE_LEFT = 8;
export const GAMEPAD_BUTTON_LEFT_TRIGGER_1 = 9;
export const GAMEPAD_BUTTON_LEFT_TRIGGER_2 = 10;
export const GAMEPAD_BUTTON_RIGHT_TRIGGER_1 = 11;
export const GAMEPAD_BUTTON_RIGHT_TRIGGER_2 = 12;
export const GAMEPAD_BUTTON_MIDDLE_LEFT = 13;
export const GAMEPAD_BUTTON_MIDDLE = 14;
export const GAMEPAD_BUTTON_MIDDLE_RIGHT = 15;
export const GAMEPAD_BUTTON_LEFT_THUMB = 16;
export const GAMEPAD_BUTTON_RIGHT_THUMB = 17;

// Gamepad axis
export const GAMEPAD_AXIS_LEFT_X = 0;
export const GAMEPAD_AXIS_LEFT_Y = 1;
export const GAMEPAD_AXIS_RIGHT_X = 2;
export const GAMEPAD_AXIS_RIGHT_Y = 3;
export const GAMEPAD_AXIS_LEFT_TRIGGER = 4;
export const GAMEPAD_AXIS_RIGHT_TRIGGER = 5;

/**
 * Check if a gamepad is available
 */
export function IsGamepadAvailable(gamepad: i32): boolean {
  return !!lib.symbols.IsGamepadAvailable(gamepad);
}

/**
 * Get gamepad internal name id
 */
export function GetGamepadName(gamepad: i32): string {
  const ptr = lib.symbols.GetGamepadName(gamepad);
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Check if a gamepad button has been pressed once
 */
export function IsGamepadButtonPressed(gamepad: i32, button: i32): boolean {
  return !!lib.symbols.IsGamepadButtonPressed(gamepad, button);
}

/**
 * Check if a gamepad button is being pressed
 */
export function IsGamepadButtonDown(gamepad: i32, button: i32): boolean {
  return !!lib.symbols.IsGamepadButtonDown(gamepad, button);
}

/**
 * Check if a gamepad button has been released once
 */
export function IsGamepadButtonReleased(gamepad: i32, button: i32): boolean {
  return !!lib.symbols.IsGamepadButtonReleased(gamepad, button);
}

/**
 * Check if a gamepad button is NOT being pressed
 */
export function IsGamepadButtonUp(gamepad: i32, button: i32): boolean {
  return !!lib.symbols.IsGamepadButtonUp(gamepad, button);
}

/**
 * Get the last gamepad button pressed
 */
export function GetGamepadButtonPressed(): i32 {
  return lib.symbols.GetGamepadButtonPressed();
}

/**
 * Get gamepad axis count for a gamepad
 */
export function GetGamepadAxisCount(gamepad: i32): i32 {
  return lib.symbols.GetGamepadAxisCount(gamepad);
}

/**
 * Get axis movement value for a gamepad axis
 */
export function GetGamepadAxisMovement(gamepad: i32, axis: i32): f32 {
  return lib.symbols.GetGamepadAxisMovement(gamepad, axis);
}

/**
 * Set internal gamepad mappings (SDL_GameControllerDB)
 */
export function SetGamepadMappings(mappings: string): i32 {
  return lib.symbols.SetGamepadMappings(createStringBuffer(mappings));
}

// ============================================================================
// TEXT
// ============================================================================

/**
 * Text drawing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Draw text (using default font)
 */
export function DrawText(
  text: string,
  posX: i32,
  posY: i32,
  fontSize: i32,
  color: Color
): void {
  lib.symbols.DrawText(
    createStringBuffer(text),
    posX,
    posY,
    fontSize,
    color.buffer
  );
}

export function DrawFPS(posX: i32, posY: i32): void {
  lib.symbols.DrawFPS(posX, posY);
}

/**
 * Draw text (using default font) with position defined as Vector2
 */
export function DrawTextEx(
  font: { buffer: ArrayBuffer },
  text: string,
  position: Vector2,
  fontSize: i32,
  spacing: i32,
  tint: Color
): void {
  lib.symbols.DrawTextEx(
    font.buffer,
    createStringBuffer(text),
    position.buffer,
    fontSize,
    spacing,
    tint.buffer
  );
}

/**
 * Draw text using font and additional parameters
 */
export function DrawTextPro(
  font: { buffer: ArrayBuffer },
  text: string,
  position: Vector2,
  origin: Vector2,
  rotation: f32,
  fontSize: f32,
  spacing: f32,
  tint: Color
): void {
  lib.symbols.DrawTextPro(
    font.buffer,
    createStringBuffer(text),
    position.buffer,
    origin.buffer,
    rotation,
    fontSize,
    spacing,
    tint.buffer
  );
}

/**
 * Draw one character (codepoint)
 */
export function DrawTextCodepoint(
  font: { buffer: ArrayBuffer },
  codepoint: i32,
  position: Vector2,
  fontSize: i32,
  tint: Color
): void {
  lib.symbols.DrawTextCodepoint(
    font.buffer,
    codepoint,
    position.buffer,
    fontSize,
    tint.buffer
  );
}

/**
 * Draw multiple character (codepoint)
 */
export function DrawTextCodepoints(
  font: { buffer: ArrayBuffer },
  codepoints: f32[],
  count: i32,
  position: Vector2,
  fontSize: f32,
  spacing: f32,
  tint: Color
): void {
  const buffer = new Uint32Array(codepoints);
  lib.symbols.DrawTextCodepoints(
    font.buffer,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    count,
    position.buffer,
    fontSize,
    spacing,
    tint.buffer
  );
}

/**
 * Set vertical line spacing when drawing with line-breaks
 */
export function SetTextLineSpacing(spacing: i32): void {
  lib.symbols.SetTextLineSpacing(spacing);
}

/**
 * Measure string width for default font
 */
export function MeasureText(text: string, fontSize: i32): i32 {
  return lib.symbols.MeasureText(createStringBuffer(text), fontSize);
}

/**
 * Measure string size for Font
 */
export function MeasureTextEx(
  font: { buffer: ArrayBuffer },
  text: string,
  fontSize: f32,
  spacing: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.MeasureTextEx(
      font.buffer,
      createStringBuffer(text),
      fontSize,
      spacing
    ).buffer
  );
}

/**
 * Get glyph index position in font for a codepoint (unicode character), fallback to '?' if not found
 */
export function GetGlyphIndex(
  font: { buffer: ArrayBuffer },
  codepoint: i32
): i32 {
  return lib.symbols.GetGlyphIndex(font.buffer, codepoint);
}

/**
 * Get glyph font info data for a codepoint (unicode character), fallback to '?' if not found
 */
export function GetGlyphInfo(
  font: { buffer: ArrayBuffer },
  codepoint: i32
): {
  value: i32;
  offsetX: i32;
  offsetY: i32;
  advanceX: i32;
  image: { buffer: ArrayBuffer };
} {
  const result = lib.symbols.GetGlyphInfo(font.buffer, codepoint);
  const view = new DataView(result.buffer);
  return {
    value: view.getInt32(0, littleEndian),
    offsetX: view.getInt32(4, littleEndian),
    offsetY: view.getInt32(8, littleEndian),
    advanceX: view.getInt32(12, littleEndian),
    image: { buffer: result.buffer.slice(16, 16 + 4) }, // pointer size
  };
}

/**
 * Get glyph rectangle in font atlas for a codepoint (unicode character), fallback to '?' if not found
 */
export function GetGlyphAtlasRec(
  font: { buffer: ArrayBuffer },
  codepoint: i32
): Rectangle {
  return Rectangle.fromBuffer(
    lib.symbols.GetGlyphAtlasRec(font.buffer, codepoint).buffer
  );
}

/**
 * Load UTF-8 text encoded from codepoints array
 */
export function LoadUTF8(codepoints: i32[], length: i32): string {
  const buffer = new Uint32Array(codepoints);
  const ptr = lib.symbols.LoadUTF8(
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    length
  );
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Unload UTF-8 text encoded from codepoints array
 */
export function UnloadUTF8(text: string): void {
  lib.symbols.UnloadUTF8(createStringBuffer(text));
}

/**
 * Load all codepoints from a UTF-8 text string, codepoints count returned by parameter
 */
export function LoadCodepoints(text: string, count: { value: i32 }): i32[] {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.LoadCodepoints(
    createStringBuffer(text),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    const result = new Uint32Array(
      Deno.UnsafePointerView.getArrayBuffer(ptr, count.value * 4)
    );
    return Array.from(result);
  }
  return [];
}

/**
 * Unload codepoints data from memory
 */
export function UnloadCodepoints(codepoints: i32[]): void {
  const buffer = new Uint32Array(codepoints);
  lib.symbols.UnloadCodepoints(Deno.UnsafePointer.of(buffer.buffer));
}

/**
 * Get total number of codepoints in a UTF-8 encoded string
 */
export function GetCodepointCount(text: string): i32 {
  return lib.symbols.GetCodepointCount(createStringBuffer(text));
}

/**
 * Get next codepoint in a UTF-8 encoded string, 0x3f('?') if not found
 */
export function GetCodepoint(text: string, bytesSize: { value: i32 }): i32 {
  const buffer = new Uint32Array(1);
  const result = lib.symbols.GetCodepoint(
    createStringBuffer(text),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  bytesSize.value = buffer[0];
  return result;
}

/**
 * Encode one codepoint into UTF-8 string (array of bytes), return byte count
 */
export function CodepointToUTF8(
  codepoint: i32,
  byteSize: { value: i32 }
): string {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.CodepointToUTF8(
    codepoint,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  byteSize.value = buffer[0];
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Copy one string to another, returns bytes copied
 */
export function TextCopy(dst: string, src: string): i32 {
  return lib.symbols.TextCopy(createStringBuffer(dst), createStringBuffer(src));
}

/**
 * Check if two text string are equal
 */
export function TextIsEqual(text1: string, text2: string): boolean {
  return !!lib.symbols.TextIsEqual(
    createStringBuffer(text1),
    createStringBuffer(text2)
  );
}

/**
 * Get text length, checks for '\0' ending
 */
export function TextLength(text: string): i32 {
  return lib.symbols.TextLength(createStringBuffer(text));
}

/**
 * Text formatting with variables (sprintf style)
 */
export function TextFormat(text: string, ..._args: unknown[]): string {
  // This is a simplified version - in a real implementation you'd need to handle
  // the formatting properly with the native function
  return text;
}

/**
 * Get a piece of a text string
 */
export function TextSubtext(text: string, position: i32, length: i32): string {
  const ptr = lib.symbols.TextSubtext(
    createStringBuffer(text),
    position,
    length
  );
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Replace text string (memory must be freed!)
 */
export function TextReplace(text: string, replace: string, by: string): string {
  const ptr = lib.symbols.TextReplace(
    createStringBuffer(text),
    createStringBuffer(replace),
    createStringBuffer(by)
  );
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Insert text in a position (memory must be freed!)
 */
export function TextInsert(
  text: string,
  insert: string,
  position: i32
): string {
  const ptr = lib.symbols.TextInsert(
    createStringBuffer(text),
    createStringBuffer(insert),
    position
  );
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Join text strings with delimiter
 */
export function TextJoin(
  textList: string[],
  count: i32,
  delimiter: string
): string {
  // Create array of string pointers
  const stringPointers = new BigUint64Array(count);
  for (let i = 0; i < count; i++) {
    stringPointers[i] = BigInt(
      Deno.UnsafePointer.value(
        Deno.UnsafePointer.of(createStringBuffer(textList[i]) as ArrayBuffer)
      )
    );
  }

  const ptr = lib.symbols.TextJoin(
    Deno.UnsafePointer.of(stringPointers.buffer as ArrayBuffer),
    count,
    createStringBuffer(delimiter)
  );
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Split text into multiple strings
 */
export function TextSplit(
  text: string,
  delimiter: i8,
  _count: { value: f32 }
): string[] {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.TextSplit(
    createStringBuffer(text),
    delimiter,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    const count = buffer[0];
    const result: string[] = [];
    const view = new Deno.UnsafePointerView(ptr);

    for (let i = 0; i < count; i++) {
      const stringPtr = view.getBigUint64(i * 8);
      if (stringPtr) {
        const stringView = new Deno.UnsafePointerView(
          Deno.UnsafePointer.create(stringPtr)!
        );
        result.push(stringView.getCString());
      }
    }
    return result;
  }
  return [];
}

/**
 * Append text at specific position and move cursor!
 */
export function TextAppend(
  text: string,
  append: string,
  _position: { value: f32 }
): void {
  const buffer = new Uint32Array(1);
  lib.symbols.TextAppend(
    createStringBuffer(text),
    createStringBuffer(append),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
}

/**
 * Find first text occurrence within a string
 */
export function TextFindIndex(text: string, find: string): i32 {
  return lib.symbols.TextFindIndex(
    createStringBuffer(text),
    createStringBuffer(find)
  );
}

/**
 * Get upper case version of provided string
 */
export function TextToUpper(text: string): string {
  const ptr = lib.symbols.TextToUpper(createStringBuffer(text));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get lower case version of provided string
 */
export function TextToLower(text: string): string {
  const ptr = lib.symbols.TextToLower(createStringBuffer(text));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get Pascal case notation version of provided string
 */
export function TextToPascal(text: string): string {
  const ptr = lib.symbols.TextToPascal(createStringBuffer(text));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get integer value from text (negative values not supported)
 */
export function TextToInteger(text: string): i32 {
  return lib.symbols.TextToInteger(createStringBuffer(text));
}

// ============================================================================
// FONT
// ============================================================================

/**
 * Font loading and text drawing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Font type
 */
export interface Font {
  buffer: ArrayBuffer;
}

/**
 * Get the default Font
 */
export function GetFontDefault(): Font {
  return { buffer: lib.symbols.GetFontDefault().buffer };
}

/**
 * Load font from file
 */
export function LoadFont(fileName: string): Font {
  return { buffer: lib.symbols.LoadFont(createStringBuffer(fileName)).buffer };
}

/**
 * Load font from file with extended parameters
 */
export function LoadFontEx(
  fileName: string,
  fontSize: i32,
  fontChars: f32[],
  glyphCount: i32
): Font {
  const buffer = new Uint32Array(fontChars);
  return {
    buffer: lib.symbols.LoadFontEx(
      createStringBuffer(fileName),
      fontSize,
      Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
      glyphCount
    ).buffer,
  };
}

/**
 * Load font from Image (XNA style)
 */
export function LoadFontFromImage(
  image: Image,
  key: Color,
  firstChar: i32
): Font {
  return {
    buffer: lib.symbols.LoadFontFromImage(image.buffer, key.buffer, firstChar)
      .buffer,
  };
}

/**
 * Load font from memory (fileType refers to extension: i.e. ".ttf")
 */
export function LoadFontFromMemory(
  fileType: string,
  fileData: Uint8Array,
  dataSize: i32,
  fontSize: i32,
  fontChars: f32[],
  glyphCount: i32
): Font {
  const buffer = new Uint32Array(fontChars);
  return {
    buffer: lib.symbols.LoadFontFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
      dataSize,
      fontSize,
      Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
      glyphCount
    ).buffer,
  };
}

/**
 * Check if a font is ready
 */
export function IsFontReady(font: Font): boolean {
  if (!font || !font.buffer) {
    return false;
  }
  return !!lib.symbols.IsFontReady(font.buffer as ArrayBuffer);
}

/**
 * Load font data for further use
 */
export function LoadFontData(
  fileData: Uint8Array,
  dataSize: i32,
  fontSize: i32,
  fontChars: f32[],
  glyphCount: i32,
  type: i32
): { buffer: ArrayBuffer }[] {
  const buffer = new Uint32Array(fontChars);
  const ptr = lib.symbols.LoadFontData(
    Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
    dataSize,
    fontSize,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    glyphCount,
    type
  );
  if (ptr) {
    const result: { buffer: ArrayBuffer }[] = [];
    const view = new Deno.UnsafePointerView(ptr);

    for (let i = 0; i < glyphCount; i++) {
      const glyphPtr = view.getBigUint64(i * 8);
      if (glyphPtr) {
        // Each glyph is a struct, we need to read its size
        // This is a simplified implementation - actual glyph struct size would need to be determined
        const glyphSize = 64; // Approximate size for GlyphInfo struct
        const glyphBuffer = new Uint8Array(glyphSize);
        const glyphView = new Deno.UnsafePointerView(
          Deno.UnsafePointer.create(glyphPtr)!
        );
        for (let j = 0; j < glyphSize; j++) {
          glyphBuffer[j] = glyphView.getUint8(j);
        }
        result.push({ buffer: glyphBuffer.buffer });
      }
    }
    return result;
  }
  return [];
}

/**
 * Generate image font atlas using chars info
 */
export function GenImageFontAtlas(
  chars: { buffer: ArrayBuffer }[],
  recs: Rectangle[],
  glyphCount: i32,
  fontSize: i32,
  padding: i32,
  packMethod: i32
): Image {
  const recsBuffer = new Float32Array(recs.length * 4);
  for (let i = 0; i < recs.length; i++) {
    recsBuffer[i * 4] = recs[i].x;
    recsBuffer[i * 4 + 1] = recs[i].y;
    recsBuffer[i * 4 + 2] = recs[i].width;
    recsBuffer[i * 4 + 3] = recs[i].height;
  }

  // Create array of glyph pointers
  const glyphPointers = new BigUint64Array(glyphCount);
  for (let i = 0; i < glyphCount; i++) {
    glyphPointers[i] = BigInt(
      Deno.UnsafePointer.value(Deno.UnsafePointer.of(chars[i].buffer))
    );
  }

  return Image.fromBuffer(
    lib.symbols.GenImageFontAtlas(
      Deno.UnsafePointer.of(glyphPointers.buffer as ArrayBuffer),
      Deno.UnsafePointer.of(recsBuffer.buffer as ArrayBuffer),
      glyphCount,
      fontSize,
      padding,
      packMethod
    ).buffer
  );
}

/**
 * Unload font chars info data (RAM)
 */
export function UnloadFontData(
  chars: { buffer: ArrayBuffer }[],
  glyphCount: i32
): void {
  // Create array of glyph pointers
  const glyphPointers = new BigUint64Array(glyphCount);
  for (let i = 0; i < glyphCount; i++) {
    glyphPointers[i] = BigInt(
      Deno.UnsafePointer.value(Deno.UnsafePointer.of(chars[i].buffer))
    );
  }

  lib.symbols.UnloadFontData(
    Deno.UnsafePointer.of(glyphPointers.buffer as ArrayBuffer),
    glyphCount
  );
}

/**
 * Unload font from GPU memory (VRAM)
 */
export function UnloadFont(font: Font): void {
  lib.symbols.UnloadFont(font.buffer as ArrayBuffer);
}

/**
 * Export font as code file, returns true on success
 */
export function ExportFontAsCode(font: Font, fileName: string): boolean {
  return !!lib.symbols.ExportFontAsCode(
    font.buffer,
    createStringBuffer(fileName)
  );
}

// ============================================================================
// IMAGE
// ============================================================================

/**
 * Image loading, drawing, manipulation functions - 1:1 raylib bindings
 * @module
 */

/**
 * Image type
 */
export class Image {
  constructor(
    public data: Uint8Array,
    public width: i32,
    public height: i32,
    public mipmaps: i32,
    public format: i32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Image {
    const view = new DataView(buffer);
    return new Image(
      new Uint8Array(buffer, 0, view.getUint32(0, true)), // data
      view.getInt32(8, true), // width
      view.getInt32(12, true), // height
      view.getInt32(16, true), // mipmaps
      view.getInt32(20, true) // format
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(24);
    const view = new DataView(buffer);
    view.setUint32(0, this.data.length, true); // data size
    view.setInt32(8, this.width, true);
    view.setInt32(12, this.height, true);
    view.setInt32(16, this.mipmaps, true);
    view.setInt32(20, this.format, true);
    return buffer;
  }
}

// Image formats
export const PIXELFORMAT_UNCOMPRESSED_GRAYSCALE = 1;
export const PIXELFORMAT_UNCOMPRESSED_GRAY_ALPHA = 2;
export const PIXELFORMAT_UNCOMPRESSED_R5G6B5 = 3;
export const PIXELFORMAT_UNCOMPRESSED_R8G8B8 = 4;
export const PIXELFORMAT_UNCOMPRESSED_R5G5B5A1 = 5;
export const PIXELFORMAT_UNCOMPRESSED_R4G4B4A4 = 6;
export const PIXELFORMAT_UNCOMPRESSED_R8G8B8A8 = 7;
export const PIXELFORMAT_UNCOMPRESSED_R32 = 8;
export const PIXELFORMAT_UNCOMPRESSED_R32G32B32 = 9;
export const PIXELFORMAT_UNCOMPRESSED_R32G32B32A32 = 10;
export const PIXELFORMAT_COMPRESSED_DXT1_RGB = 11;
export const PIXELFORMAT_COMPRESSED_DXT1_RGBA = 12;
export const PIXELFORMAT_COMPRESSED_DXT3_RGBA = 13;
export const PIXELFORMAT_COMPRESSED_DXT5_RGBA = 14;
export const PIXELFORMAT_COMPRESSED_ETC1_RGB = 15;
export const PIXELFORMAT_COMPRESSED_ETC2_RGB = 16;
export const PIXELFORMAT_COMPRESSED_ETC2_EAC_RGBA = 17;
export const PIXELFORMAT_COMPRESSED_PVRT_RGB = 18;
export const PIXELFORMAT_COMPRESSED_PVRT_RGBA = 19;
export const PIXELFORMAT_COMPRESSED_ASTC_4x4_RGBA = 20;
export const PIXELFORMAT_COMPRESSED_ASTC_8x8_RGBA = 21;
export const PIXELFORMAT_COMPRESSED_ASTC_16x16_RGBA = 22;

/**
 * Load image from file into CPU memory (RAM)
 */
export function LoadImage(fileName: string): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImage(createStringBuffer(fileName)).buffer
  );
}

/**
 * Load image from RAW file data
 */
export function LoadImageRaw(
  fileName: string,
  width: i32,
  height: i32,
  format: i32,
  headerSize: i32
): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImageRaw(
      createStringBuffer(fileName),
      width,
      height,
      format,
      headerSize
    ).buffer
  );
}

/**
 * Load image sequence from file (frames)
 */
export function LoadImageAnim(
  fileName: string,
  _frames: { value: i32 }
): Image {
  const buffer = new Uint32Array(1);
  return Image.fromBuffer(
    lib.symbols.LoadImageAnim(
      createStringBuffer(fileName),
      Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
    ).buffer
  );
}

/**
 * Load image from memory buffer, fileType refers to extension: i.e. ".png"
 */
export function LoadImageFromMemory(
  fileType: string,
  fileData: Uint8Array,
  dataSize: i32
): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImageFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
      dataSize
    ).buffer
  );
}

/**
 * Load image from GPU texture data
 */
export function LoadImageFromTexture(texture: { buffer: ArrayBuffer }): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImageFromTexture(texture.buffer as ArrayBuffer).buffer
  );
}

/**
 * Load image from screen buffer and (screenshot)
 */
export function LoadImageFromScreen(): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImageFromScreen().buffer as ArrayBuffer
  );
}

/**
 * Check if an image is ready
 */
export function IsImageReady(image: Image): boolean {
  return !!lib.symbols.IsImageReady(image.buffer as ArrayBuffer);
}

/**
 * Unload image from CPU memory (RAM)
 */
export function UnloadImage(image: Image): void {
  lib.symbols.UnloadImage(image.buffer as ArrayBuffer);
}

/**
 * Export image data to file, returns true on success
 */
export function ExportImage(image: Image, fileName: string): boolean {
  return !!lib.symbols.ExportImage(image.buffer, createStringBuffer(fileName));
}

/**
 * Export image to memory buffer
 */
export function ExportImageToMemory(
  image: Image,
  fileType: string,
  fileSize: { value: i32 }
): Uint8Array {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.ExportImageToMemory(
    image.buffer,
    createStringBuffer(fileType),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    return new Uint8Array(
      Deno.UnsafePointerView.getArrayBuffer(ptr, fileSize.value)
    );
  }
  return new Uint8Array(0);
}

/**
 * Export image as code file defining an array of bytes, returns true on success
 */
export function ExportImageAsCode(image: Image, fileName: string): boolean {
  return !!lib.symbols.ExportImageAsCode(
    image.buffer,
    createStringBuffer(fileName)
  );
}

/**
 * Generate image: plain color
 */
export function GenImageColor(width: i32, height: i32, color: Color): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageColor(width, height, color.buffer as ArrayBuffer).buffer
  );
}

/**
 * Generate image: linear gradient, direction in degrees [0..360], 0=Vertical, 90=Horizontal
 */
export function GenImageGradientLinear(
  width: i32,
  height: i32,
  direction: i32,
  start: Color,
  end: Color
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageGradientLinear(
      width,
      height,
      direction,
      start.buffer,
      end.buffer
    ).buffer
  );
}

/**
 * Generate image: radial gradient
 */
export function GenImageGradientRadial(
  width: i32,
  height: i32,
  density: f32,
  inner: Color,
  outer: Color
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageGradientRadial(
      width,
      height,
      density,
      inner.buffer,
      outer.buffer
    ).buffer
  );
}

/**
 * Generate image: square gradient
 */
export function GenImageGradientSquare(
  width: i32,
  height: i32,
  density: f32,
  inner: Color,
  outer: Color
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageGradientSquare(
      width,
      height,
      density,
      inner.buffer,
      outer.buffer
    ).buffer
  );
}

/**
 * Generate image: checked
 */
export function GenImageChecked(
  width: i32,
  height: i32,
  checksX: i32,
  checksY: i32,
  col1: Color,
  col2: Color
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageChecked(
      width,
      height,
      checksX,
      checksY,
      col1.buffer,
      col2.buffer
    ).buffer
  );
}

/**
 * Generate image: white noise
 */
export function GenImageWhiteNoise(
  width: i32,
  height: i32,
  factor: f32
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageWhiteNoise(width, height, factor).buffer
  );
}

/**
 * Generate image: perlin noise
 */
export function GenImagePerlinNoise(
  width: i32,
  height: i32,
  offsetX: i32,
  offsetY: i32,
  scale: f32
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImagePerlinNoise(width, height, offsetX, offsetY, scale)
      .buffer
  );
}

/**
 * Generate image: cellular algorithm. Bigger tileSize means bigger cells
 */
export function GenImageCellular(
  width: i32,
  height: i32,
  tileSize: i32
): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageCellular(width, height, tileSize).buffer
  );
}

/**
 * Generate image: grayscale image from text data
 */
export function GenImageText(width: i32, height: i32, text: string): Image {
  return Image.fromBuffer(
    lib.symbols.GenImageText(width, height, createStringBuffer(text)).buffer
  );
}

/**
 * Create an image duplicate (useful for transformations)
 */
export function ImageCopy(image: Image): Image {
  return Image.fromBuffer(
    lib.symbols.ImageCopy(image.buffer as ArrayBuffer).buffer as ArrayBuffer
  );
}

/**
 * Create an image from another image piece
 */
export function ImageFromImage(image: Image, rec: Rectangle): Image {
  return Image.fromBuffer(
    lib.symbols.ImageFromImage(image.buffer, rec.buffer as ArrayBuffer).buffer
  );
}

/**
 * Create an image from text (default font)
 */
export function ImageText(text: string, fontSize: i32, color: Color): Image {
  return Image.fromBuffer(
    lib.symbols.ImageText(
      createStringBuffer(text),
      fontSize,
      color.buffer as ArrayBuffer
    ).buffer
  );
}

/**
 * Create an image from text (custom sprite font)
 */
export function ImageTextEx(
  font: { buffer: ArrayBuffer },
  text: string,
  fontSize: f32,
  spacing: f32,
  tint: Color
): Image {
  return Image.fromBuffer(
    lib.symbols.ImageTextEx(
      font.buffer,
      createStringBuffer(text),
      fontSize,
      spacing,
      tint.buffer as ArrayBuffer
    ).buffer
  );
}

/**
 * Convert image data to desired format
 */
export function ImageFormat(image: Image, newFormat: i32): void {
  lib.symbols.ImageFormat(Deno.UnsafePointer.of(image.buffer), newFormat);
}

/**
 * Convert image to POT (power-of-2)
 */
export function ImageToPOT(image: Image, fill: Color): void {
  lib.symbols.ImageToPOT(
    Deno.UnsafePointer.of(image.buffer),
    fill.buffer as ArrayBuffer
  );
}

/**
 * Crop an image to a defined rectangle
 */
export function ImageCrop(image: Image, crop: Rectangle): void {
  lib.symbols.ImageCrop(
    Deno.UnsafePointer.of(image.buffer),
    crop.buffer as ArrayBuffer
  );
}

/**
 * Crop image depending on alpha value
 */
export function ImageAlphaCrop(image: Image, threshold: f32): void {
  lib.symbols.ImageAlphaCrop(Deno.UnsafePointer.of(image.buffer), threshold);
}

/**
 * Clear alpha channel to desired color
 */
export function ImageAlphaClear(
  image: Image,
  color: Color,
  threshold: f32
): void {
  lib.symbols.ImageAlphaClear(
    Deno.UnsafePointer.of(image.buffer),
    color.buffer,
    threshold
  );
}

/**
 * Apply alpha mask to image
 */
export function ImageAlphaMask(image: Image, alphaMask: Image): void {
  lib.symbols.ImageAlphaMask(
    Deno.UnsafePointer.of(image.buffer),
    alphaMask.buffer as ArrayBuffer
  );
}

/**
 * Premultiply alpha channel
 */
export function ImageAlphaPremultiply(image: Image): void {
  lib.symbols.ImageAlphaPremultiply(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Apply Gaussian blur using a box blur approximation
 */
export function ImageBlurGaussian(image: Image, blurSize: i32): void {
  lib.symbols.ImageBlurGaussian(Deno.UnsafePointer.of(image.buffer), blurSize);
}

/**
 * Resize image (Bicubic scaling algorithm)
 */
export function ImageResize(image: Image, newWidth: i32, newHeight: i32): void {
  lib.symbols.ImageResize(
    Deno.UnsafePointer.of(image.buffer),
    newWidth,
    newHeight
  );
}

/**
 * Resize image (Nearest-Neighbor scaling algorithm)
 */
export function ImageResizeNN(
  image: Image,
  newWidth: i32,
  newHeight: i32
): void {
  lib.symbols.ImageResizeNN(
    Deno.UnsafePointer.of(image.buffer),
    newWidth,
    newHeight
  );
}

/**
 * Resize canvas and fill with color
 */
export function ImageResizeCanvas(
  image: Image,
  newWidth: i32,
  newHeight: i32,
  offsetX: i32,
  offsetY: i32,
  fill: Color
): void {
  lib.symbols.ImageResizeCanvas(
    Deno.UnsafePointer.of(image.buffer),
    newWidth,
    newHeight,
    offsetX,
    offsetY,
    fill.buffer
  );
}

/**
 * Compute all mipmap levels for a provided image
 */
export function ImageMipmaps(image: Image): void {
  lib.symbols.ImageMipmaps(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Dither image data to 16bpp or lower (Floyd-Steinberg dithering)
 */
export function ImageDither(
  image: Image,
  rBpp: i32,
  gBpp: i32,
  bBpp: i32,
  aBpp: i32
): void {
  lib.symbols.ImageDither(
    Deno.UnsafePointer.of(image.buffer),
    rBpp,
    gBpp,
    bBpp,
    aBpp
  );
}

/**
 * Flip image vertically
 */
export function ImageFlipVertical(image: Image): void {
  lib.symbols.ImageFlipVertical(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Flip image horizontally
 */
export function ImageFlipHorizontal(image: Image): void {
  lib.symbols.ImageFlipHorizontal(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Rotate image by input angle in degrees (-359 to +359)
 */
export function ImageRotate(image: Image, degrees: i32): void {
  lib.symbols.ImageRotate(Deno.UnsafePointer.of(image.buffer), degrees);
}

/**
 * Rotate image clockwise 90deg
 */
export function ImageRotateCW(image: Image): void {
  lib.symbols.ImageRotateCW(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Rotate image counter-clockwise 90deg
 */
export function ImageRotateCCW(image: Image): void {
  lib.symbols.ImageRotateCCW(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Modify image color: tint
 */
export function ImageColorTint(image: Image, color: Color): void {
  lib.symbols.ImageColorTint(
    Deno.UnsafePointer.of(image.buffer),
    color.buffer as ArrayBuffer
  );
}

/**
 * Modify image color: invert
 */
export function ImageColorInvert(image: Image): void {
  lib.symbols.ImageColorInvert(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Modify image color: grayscale
 */
export function ImageColorGrayscale(image: Image): void {
  lib.symbols.ImageColorGrayscale(Deno.UnsafePointer.of(image.buffer));
}

/**
 * Modify image color: contrast (-100 to 100)
 */
export function ImageColorContrast(image: Image, contrast: f32): void {
  lib.symbols.ImageColorContrast(Deno.UnsafePointer.of(image.buffer), contrast);
}

/**
 * Modify image color: brightness (-255 to 255)
 */
export function ImageColorBrightness(image: Image, brightness: f32): void {
  lib.symbols.ImageColorBrightness(
    Deno.UnsafePointer.of(image.buffer),
    brightness
  );
}

/**
 * Modify image color: replace color
 */
export function ImageColorReplace(
  image: Image,
  color: Color,
  replace: Color
): void {
  lib.symbols.ImageColorReplace(
    Deno.UnsafePointer.of(image.buffer),
    color.buffer,
    replace.buffer as ArrayBuffer
  );
}

/**
 * Load color data from image as a Color array (RGBA - 32bit)
 */
export function LoadImageColors(image: Image): Color[] {
  const ptr = lib.symbols.LoadImageColors(image.buffer as ArrayBuffer);
  if (ptr) {
    const pixelCount = image.width * image.height;
    const result: Color[] = [];
    const view = new Deno.UnsafePointerView(ptr);

    for (let i = 0; i < pixelCount; i++) {
      const colorBuffer = new Uint8Array(4);
      for (let j = 0; j < 4; j++) {
        colorBuffer[j] = view.getUint8(i * 4 + j);
      }
      result.push(Color.fromBuffer(colorBuffer.buffer));
    }
    return result;
  }
  return [];
}

/**
 * Load colors palette from image as a Color array (RGBA - 32bit)
 */
export function LoadImagePalette(
  image: Image,
  maxPaletteSize: i32,
  _colorCount: { value: f32 }
): Color[] {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.LoadImagePalette(
    image.buffer,
    maxPaletteSize,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    const colorCount = buffer[0];
    const result: Color[] = [];
    const view = new Deno.UnsafePointerView(ptr);

    for (let i = 0; i < colorCount; i++) {
      const colorBuffer = new Uint8Array(4);
      for (let j = 0; j < 4; j++) {
        colorBuffer[j] = view.getUint8(i * 4 + j);
      }
      result.push(Color.fromBuffer(colorBuffer.buffer));
    }
    return result;
  }
  return [];
}

/**
 * Unload color data loaded with LoadImageColors()
 */
export function UnloadImageColors(_colors: Color[]): void {
  lib.symbols.UnloadImageColors(Deno.UnsafePointer.of(new Uint8Array(0)));
}

/**
 * Unload colors palette loaded with LoadImagePalette()
 */
export function UnloadImagePalette(_colors: Color[]): void {
  lib.symbols.UnloadImagePalette(Deno.UnsafePointer.of(new Uint8Array(0)));
}

/**
 * Get image alpha border rectangle
 */
export function GetImageAlphaBorder(image: Image, threshold: f32): Rectangle {
  return Rectangle.fromBuffer(
    lib.symbols.GetImageAlphaBorder(image.buffer, threshold).buffer
  );
}

/**
 * Get image pixel color at (x, y) position
 */
export function GetImageColor(image: Image, x: i32, y: i32): Color {
  return Color.fromBuffer(
    lib.symbols.GetImageColor(image.buffer, x, y).buffer as ArrayBuffer
  );
}

/**
 * Set image pixel color at (x, y) position
 */
export function ImageClearBackground(image: Image, color: Color): void {
  lib.symbols.ImageClearBackground(
    Deno.UnsafePointer.of(image.buffer),
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw pixel within an image
 */
export function ImageDrawPixel(
  image: Image,
  posX: i32,
  posY: i32,
  color: Color
): void {
  lib.symbols.ImageDrawPixel(
    Deno.UnsafePointer.of(image.buffer),
    posX,
    posY,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw pixel within an image (Vector version)
 */
export function ImageDrawPixelV(
  image: Image,
  position: Vector2,
  color: Color
): void {
  lib.symbols.ImageDrawPixelV(
    Deno.UnsafePointer.of(image.buffer),
    position.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw line within an image
 */
export function ImageDrawLine(
  image: Image,
  startPosX: i32,
  startPosY: i32,
  endPosX: i32,
  endPosY: i32,
  color: Color
): void {
  lib.symbols.ImageDrawLine(
    Deno.UnsafePointer.of(image.buffer),
    startPosX,
    startPosY,
    endPosX,
    endPosY,
    color.buffer
  );
}

/**
 * Draw line within an image (Vector version)
 */
export function ImageDrawLineV(
  image: Image,
  start: Vector2,
  end: Vector2,
  color: Color
): void {
  lib.symbols.ImageDrawLineV(
    Deno.UnsafePointer.of(image.buffer),
    start.buffer,
    end.buffer,
    color.buffer
  );
}

/**
 * Draw circle within an image
 */
export function ImageDrawCircle(
  image: Image,
  centerX: i32,
  centerY: i32,
  radius: i32,
  color: Color
): void {
  lib.symbols.ImageDrawCircle(
    Deno.UnsafePointer.of(image.buffer),
    centerX,
    centerY,
    radius,
    color.buffer
  );
}

/**
 * Draw circle within an image (Vector version)
 */
export function ImageDrawCircleV(
  image: Image,
  center: Vector2,
  radius: i32,
  color: Color
): void {
  lib.symbols.ImageDrawCircleV(
    Deno.UnsafePointer.of(image.buffer),
    center.buffer,
    radius,
    color.buffer
  );
}

/**
 * Draw rectangle within an image
 */
export function ImageDrawRectangle(
  image: Image,
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color: Color
): void {
  lib.symbols.ImageDrawRectangle(
    Deno.UnsafePointer.of(image.buffer),
    posX,
    posY,
    width,
    height,
    color.buffer
  );
}

/**
 * Draw rectangle within an image (Vector version)
 */
export function ImageDrawRectangleV(
  image: Image,
  position: Vector2,
  size: Vector2,
  color: Color
): void {
  lib.symbols.ImageDrawRectangleV(
    Deno.UnsafePointer.of(image.buffer),
    position.buffer,
    size.buffer,
    color.buffer
  );
}

/**
 * Draw rectangle within an image
 */
export function ImageDrawRectangleRec(
  image: Image,
  rec: Rectangle,
  color: Color
): void {
  lib.symbols.ImageDrawRectangleRec(
    Deno.UnsafePointer.of(image.buffer),
    rec.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw rectangle lines within an image
 */
export function ImageDrawRectangleLines(
  image: Image,
  rec: Rectangle,
  thick: i32,
  color: Color
): void {
  lib.symbols.ImageDrawRectangleLines(
    Deno.UnsafePointer.of(image.buffer),
    rec.buffer,
    thick,
    color.buffer
  );
}

/**
 * Draw a source image within a destination image (tint applied to source)
 */
export function ImageDraw(
  dst: Image,
  src: Image,
  srcRec: Rectangle,
  dstRec: Rectangle,
  tint: Color
): void {
  lib.symbols.ImageDraw(
    Deno.UnsafePointer.of(dst.buffer),
    src.buffer,
    srcRec.buffer,
    dstRec.buffer,
    tint.buffer
  );
}

/**
 * Draw text (using default font) within an image (destination)
 */
export function ImageDrawText(
  dst: Image,
  text: string,
  posX: i32,
  posY: i32,
  fontSize: i32,
  color: Color
): void {
  lib.symbols.ImageDrawText(
    Deno.UnsafePointer.of(dst.buffer),
    createStringBuffer(text),
    posX,
    posY,
    fontSize,
    color.buffer
  );
}

/**
 * Draw text (custom sprite font) within an image (destination)
 */
export function ImageDrawTextEx(
  dst: Image,
  font: { buffer: ArrayBuffer },
  text: string,
  position: Vector2,
  fontSize: f32,
  spacing: f32,
  tint: Color
): void {
  lib.symbols.ImageDrawTextEx(
    Deno.UnsafePointer.of(dst.buffer),
    font.buffer,
    createStringBuffer(text),
    position.buffer,
    fontSize,
    spacing,
    tint.buffer
  );
}

// ============================================================================
// TEXTURE
// ============================================================================

/**
 * Texture loading, drawing, manipulation functions - 1:1 raylib bindings
 * @module
 */

/**
 * Texture2D type
 */
export class Texture2D {
  constructor(
    public id: i32,
    public width: i32,
    public height: i32,
    public mipmaps: i32,
    public format: i32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Texture2D {
    const view = new DataView(buffer);
    return new Texture2D(
      view.getUint32(0, true), // id
      view.getInt32(4, true), // width
      view.getInt32(8, true), // height
      view.getInt32(12, true), // mipmaps
      view.getInt32(16, true) // format
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(20);
    const view = new DataView(buffer);
    view.setUint32(0, this.id, true);
    view.setInt32(4, this.width, true);
    view.setInt32(8, this.height, true);
    view.setInt32(12, this.mipmaps, true);
    view.setInt32(16, this.format, true);
    return buffer;
  }
}

/**
 * RenderTexture2D type
 */
export class RenderTexture2D {
  constructor(
    public id: i32,
    public texture: Texture2D,
    public depth: Texture2D
  ) {}

  static fromBuffer(buffer: ArrayBuffer): RenderTexture2D {
    const view = new DataView(buffer);
    return new RenderTexture2D(
      view.getUint32(0, true), // id
      Texture2D.fromBuffer(buffer.slice(4, 24)), // texture
      Texture2D.fromBuffer(buffer.slice(24, 44)) // depth
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(44);
    const view = new DataView(buffer);
    view.setUint32(0, this.id, true);
    // Copy texture and depth buffers
    const textureBuffer = this.texture.buffer;
    const depthBuffer = this.depth.buffer;
    new Uint8Array(buffer, 4, 20).set(new Uint8Array(textureBuffer));
    new Uint8Array(buffer, 24, 20).set(new Uint8Array(depthBuffer));
    return buffer;
  }
}

// Texture parameters
export const TEXTURE_FILTER_POINT = 0;
export const TEXTURE_FILTER_BILINEAR = 1;
export const TEXTURE_FILTER_TRILINEAR = 2;
export const TEXTURE_FILTER_ANISOTROPIC_4X = 3;
export const TEXTURE_FILTER_ANISOTROPIC_8X = 4;
export const TEXTURE_FILTER_ANISOTROPIC_16X = 5;

export const TEXTURE_WRAP_REPEAT = 0;
export const TEXTURE_WRAP_CLAMP = 1;
export const TEXTURE_WRAP_MIRROR_REPEAT = 2;
export const TEXTURE_WRAP_MIRROR_CLAMP = 3;

/**
 * Load texture from file into GPU memory (VRAM)
 */
export function LoadTexture(fileName: string): Texture2D {
  return Texture2D.fromBuffer(
    lib.symbols.LoadTexture(createStringBuffer(fileName)).buffer
  );
}

/**
 * Load texture from image data
 */
export function LoadTextureFromImage(image: {
  buffer: ArrayBuffer;
}): Texture2D {
  return Texture2D.fromBuffer(
    lib.symbols.LoadTextureFromImage(image.buffer as ArrayBuffer).buffer
  );
}

/**
 * Load cubemap from image, 6 images
 */
export function LoadTextureCubemap(
  image: { buffer: ArrayBuffer },
  layout: i32
): Texture2D {
  return Texture2D.fromBuffer(
    lib.symbols.LoadTextureCubemap(image.buffer, layout).buffer
  );
}

/**
 * Load texture for rendering (framebuffer)
 */
export function LoadRenderTexture(width: i32, height: i32): RenderTexture2D {
  return RenderTexture2D.fromBuffer(
    lib.symbols.LoadRenderTexture(width, height).buffer
  );
}

/**
 * Check if a texture is ready
 */
export function IsTextureReady(texture: Texture2D): boolean {
  return !!lib.symbols.IsTextureReady(texture.buffer as ArrayBuffer);
}

/**
 * Unload texture from GPU memory (VRAM)
 */
export function UnloadTexture(texture: Texture2D): void {
  lib.symbols.UnloadTexture(texture.buffer as ArrayBuffer);
}

/**
 * Unload render texture from GPU memory (VRAM)
 */
export function UnloadRenderTexture(target: RenderTexture2D): void {
  lib.symbols.UnloadRenderTexture(target.buffer as ArrayBuffer);
}

/**
 * Update GPU texture with new data
 */
export function UpdateTexture(texture: Texture2D, pixels: Uint8Array): void {
  lib.symbols.UpdateTexture(
    texture.buffer,
    Deno.UnsafePointer.of(pixels.buffer as ArrayBuffer)
  );
}

/**
 * Update GPU texture rectangle with new data
 */
export function UpdateTextureRec(
  texture: Texture2D,
  rec: Rectangle,
  pixels: Uint8Array
): void {
  lib.symbols.UpdateTextureRec(
    texture.buffer,
    rec.buffer,
    Deno.UnsafePointer.of(pixels.buffer as ArrayBuffer)
  );
}

/**
 * Generate GPU mipmaps for a texture
 */
export function GenTextureMipmaps(texture: Texture2D): void {
  lib.symbols.GenTextureMipmaps(Deno.UnsafePointer.of(texture.buffer));
}

/**
 * Set texture scaling filter mode
 */
export function SetTextureFilter(texture: Texture2D, filter: i32): void {
  lib.symbols.SetTextureFilter(texture.buffer, filter);
}

/**
 * Set texture wrapping mode
 */
export function SetTextureWrap(texture: Texture2D, wrap: i32): void {
  lib.symbols.SetTextureWrap(texture.buffer, wrap);
}

/**
 * Draw a Texture2D
 */
export function DrawTexture(
  texture: Texture2D,
  posX: i32,
  posY: i32,
  tint: Color
): void {
  lib.symbols.DrawTexture(
    texture.buffer,
    posX,
    posY,
    tint.buffer as ArrayBuffer
  );
}

/**
 * Draw a Texture2D with position defined as Vector2
 */
export function DrawTextureV(
  texture: Texture2D,
  position: Vector2,
  tint: Color
): void {
  lib.symbols.DrawTextureV(
    texture.buffer,
    position.buffer,
    tint.buffer as ArrayBuffer
  );
}

/**
 * Draw a Texture2D with extended parameters
 */
export function DrawTextureEx(
  texture: Texture2D,
  position: Vector2,
  rotation: f32,
  scale: f32,
  tint: Color
): void {
  lib.symbols.DrawTextureEx(
    texture.buffer,
    position.buffer,
    rotation,
    scale,
    tint.buffer
  );
}

/**
 * Draw a part of a texture defined by a rectangle
 */
export function DrawTextureRec(
  texture: Texture2D,
  source: Rectangle,
  position: Vector2,
  tint: Color
): void {
  lib.symbols.DrawTextureRec(
    texture.buffer,
    source.buffer,
    position.buffer,
    tint.buffer
  );
}

/**
 * Draw a part of a texture defined by a rectangle with 'pro' parameters
 */
export function DrawTexturePro(
  texture: Texture2D,
  source: Rectangle,
  dest: Rectangle,
  origin: Vector2,
  rotation: f32,
  tint: Color
): void {
  lib.symbols.DrawTexturePro(
    texture.buffer,
    source.buffer,
    dest.buffer,
    origin.buffer,
    rotation,
    tint.buffer
  );
}

/**
 * Draws a texture (or part of it) that stretches or shrinks nicely
 */
export function DrawTextureNPatch(
  texture: Texture2D,
  nPatchInfo: { buffer: ArrayBuffer },
  dest: Rectangle,
  origin: Vector2,
  rotation: f32,
  tint: Color
): void {
  lib.symbols.DrawTextureNPatch(
    texture.buffer,
    nPatchInfo.buffer,
    dest.buffer,
    origin.buffer,
    rotation,
    tint.buffer
  );
}

/**
 * Get color with alpha applied, alpha goes from 0.0f to 1.0f
 */
export function Fade(color: Color, alpha: f32): Color {
  return Color.fromBuffer(
    lib.symbols.Fade(color.buffer, alpha).buffer as ArrayBuffer
  );
}

/**
 * Get hexadecimal value for a Color
 */
export function ColorToInt(color: Color): i32 {
  return lib.symbols.ColorToInt(color.buffer as ArrayBuffer);
}

/**
 * Get Color normalized as float [0.0f..1.0f]
 */
export function ColorNormalize(color: Color): Vector4 {
  return Vector4.fromBuffer(
    lib.symbols.ColorNormalize(color.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

/**
 * Get Color from normalized values [0.0f..1.0f]
 */
export function ColorFromNormalized(normalized: Vector4): Color {
  return Color.fromBuffer(
    lib.symbols.ColorFromNormalized(normalized.buffer as ArrayBuffer).buffer
  );
}

/**
 * Get HSV values for a Color, hue [0..360], saturation/value [0..1]
 */
export function ColorToHSV(color: Color): Vector3 {
  return Vector3.fromBuffer(
    lib.symbols.ColorToHSV(color.buffer as ArrayBuffer).buffer as ArrayBuffer
  );
}

/**
 * Get a Color from HSV values, hue [0..360], saturation/value [0..1]
 */
export function ColorFromHSV(hue: f32, saturation: f32, value: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorFromHSV(hue, saturation, value).buffer
  );
}

/**
 * Get color multiplied with another color
 */
export function ColorTint(color: Color, tint: Color): Color {
  return Color.fromBuffer(
    lib.symbols.ColorTint(color.buffer, tint.buffer as ArrayBuffer).buffer
  );
}

/**
 * Get color with brightness correction, brightness goes from -1.0f to 1.0f
 */
export function ColorBrightness(color: Color, factor: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorBrightness(color.buffer, factor).buffer
  );
}

/**
 * Get color with contrast correction, contrast values between -1.0f and 1.0f
 */
export function ColorContrast(color: Color, contrast: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorContrast(color.buffer, contrast).buffer
  );
}

/**
 * Get color with alpha applied, alpha goes from 0.0f to 1.0f
 */
export function ColorAlpha(color: Color, alpha: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorAlpha(color.buffer, alpha).buffer as ArrayBuffer
  );
}

/**
 * Get src-alpha-blended color
 */
export function ColorAlphaBlend(dst: Color, src: Color, tint: Color): Color {
  return Color.fromBuffer(
    lib.symbols.ColorAlphaBlend(
      dst.buffer,
      src.buffer,
      tint.buffer as ArrayBuffer
    ).buffer
  );
}

/**
 * Get Color structure from hexadecimal value
 */
export function GetColor(hexValue: u32): Color {
  return Color.fromBuffer(lib.symbols.GetColor(hexValue).buffer as ArrayBuffer);
}

/**
 * Get Color from a source pixel pointer of certain format
 */
export function GetPixelColor(srcPtr: Uint8Array, format: i32): Color {
  return Color.fromBuffer(
    lib.symbols.GetPixelColor(
      Deno.UnsafePointer.of(srcPtr.buffer as ArrayBuffer),
      format
    ).buffer
  );
}

/**
 * Set color formatted into destination pixel pointer
 */
export function SetPixelColor(
  dstPtr: Uint8Array,
  color: Color,
  format: i32
): void {
  lib.symbols.SetPixelColor(
    Deno.UnsafePointer.of(dstPtr.buffer as ArrayBuffer),
    color.buffer,
    format
  );
}

/**
 * Get pixel data size in bytes for certain format
 */
export function GetPixelDataSize(width: i32, height: i32, format: i32): i32 {
  return lib.symbols.GetPixelDataSize(width, height, format);
}

// ============================================================================
// SHAPES
// ============================================================================

/**
 * Basic shapes drawing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Draw a pixel
 */
export function DrawPixel(posX: i32, posY: i32, color: Color): void {
  lib.symbols.DrawPixel(posX, posY, color.buffer as ArrayBuffer);
}

/**
 * Draw a pixel (Vector version)
 */
export function DrawPixelV(position: Vector2, color: Color): void {
  lib.symbols.DrawPixelV(position.buffer, color.buffer as ArrayBuffer);
}

/**
 * Draw a line
 */
export function DrawLine(
  startPosX: i32,
  startPosY: i32,
  endPosX: i32,
  endPosY: i32,
  color: Color
): void {
  lib.symbols.DrawLine(
    startPosX,
    startPosY,
    endPosX,
    endPosY,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a line (using gl lines)
 */
export function DrawLineV(
  startPos: Vector2,
  endPos: Vector2,
  color: Color
): void {
  lib.symbols.DrawLineV(
    startPos.buffer,
    endPos.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a line (using triangles/quads)
 */
export function DrawLineEx(
  startPos: Vector2,
  endPos: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawLineEx(
    startPos.buffer,
    endPos.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw lines sequence (using gl lines)
 */
export function DrawLineStrip(
  points: Vector2[],
  pointCount: i32,
  color: Color
): void {
  const buffer = concatVector2s(points);
  lib.symbols.DrawLineStrip(
    Deno.UnsafePointer.of(buffer),
    pointCount,
    color.buffer
  );
}

/**
 * Draw line segment cubic-bezier in-out interpolation
 */
export function DrawLineBezier(
  startPos: Vector2,
  endPos: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawLineBezier(
    startPos.buffer,
    endPos.buffer,
    thick,
    color.buffer
  );
}

/**
 * Draw a color-filled circle
 */
export function DrawCircle(
  centerX: i32,
  centerY: i32,
  radius: f32,
  color: Color
): void {
  lib.symbols.DrawCircle(centerX, centerY, radius, color.buffer as ArrayBuffer);
}

/**
 * Draw a piece of a circle
 */
export function DrawCircleSector(
  center: Vector2,
  radius: f32,
  startAngle: f32,
  endAngle: f32,
  segments: i32,
  color: Color
): void {
  lib.symbols.DrawCircleSector(
    center.buffer,
    radius,
    startAngle,
    endAngle,
    segments,
    color.buffer
  );
}

/**
 * Draw circle sector outline
 */
export function DrawCircleSectorLines(
  center: Vector2,
  radius: f32,
  startAngle: f32,
  endAngle: f32,
  segments: i32,
  color: Color
): void {
  lib.symbols.DrawCircleSectorLines(
    center.buffer,
    radius,
    startAngle,
    endAngle,
    segments,
    color.buffer
  );
}

/**
 * Draw a gradient-filled circle
 */
export function DrawCircleGradient(
  centerX: i32,
  centerY: i32,
  radius: f32,
  color1: Color,
  color2: Color
): void {
  lib.symbols.DrawCircleGradient(
    centerX,
    centerY,
    radius,
    color1.buffer,
    color2.buffer
  );
}

/**
 * Draw a color-filled circle (Vector version)
 */
export function DrawCircleV(center: Vector2, radius: f32, color: Color): void {
  lib.symbols.DrawCircleV(center.buffer, radius, color.buffer as ArrayBuffer);
}

/**
 * Draw circle outline
 */
export function DrawCircleLines(
  centerX: i32,
  centerY: i32,
  radius: f32,
  color: Color
): void {
  lib.symbols.DrawCircleLines(
    centerX,
    centerY,
    radius,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw circle outline (Vector version)
 */
export function DrawCircleLinesV(
  center: Vector2,
  radius: f32,
  color: Color
): void {
  lib.symbols.DrawCircleLinesV(
    center.buffer,
    radius,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw ellipse
 */
export function DrawEllipse(
  centerX: i32,
  centerY: i32,
  radiusH: f32,
  radiusV: f32,
  color: Color
): void {
  lib.symbols.DrawEllipse(
    centerX,
    centerY,
    radiusH,
    radiusV,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw ellipse outline
 */
export function DrawEllipseLines(
  centerX: i32,
  centerY: i32,
  radiusH: f32,
  radiusV: f32,
  color: Color
): void {
  lib.symbols.DrawEllipseLines(
    centerX,
    centerY,
    radiusH,
    radiusV,
    color.buffer
  );
}

/**
 * Draw ring
 */
export function DrawRing(
  center: Vector2,
  innerRadius: f32,
  outerRadius: f32,
  startAngle: f32,
  endAngle: f32,
  segments: i32,
  color: Color
): void {
  lib.symbols.DrawRing(
    center.buffer,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    segments,
    color.buffer
  );
}

/**
 * Draw ring outline
 */
export function DrawRingLines(
  center: Vector2,
  innerRadius: f32,
  outerRadius: f32,
  startAngle: f32,
  endAngle: f32,
  segments: i32,
  color: Color
): void {
  lib.symbols.DrawRingLines(
    center.buffer,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    segments,
    color.buffer
  );
}

/**
 * Draw a color-filled rectangle
 */
export function DrawRectangle(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color: Color
): void {
  lib.symbols.DrawRectangle(
    posX,
    posY,
    width,
    height,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a color-filled rectangle (Vector version)
 */
export function DrawRectangleV(
  position: Vector2,
  size: Vector2,
  color: Color
): void {
  lib.symbols.DrawRectangleV(
    position.buffer,
    size.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a color-filled rectangle
 */
export function DrawRectangleRec(rect: Rectangle, color: Color): void {
  lib.symbols.DrawRectangleRec(rect.buffer, color.buffer as ArrayBuffer);
}

/**
 * Draw a color-filled rectangle with pro parameters
 */
export function DrawRectanglePro(
  rect: Rectangle,
  origin: Vector2,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawRectanglePro(
    rect.buffer,
    origin.buffer,
    rotation,
    color.buffer
  );
}

/**
 * Draw a vertical-gradient-filled rectangle
 */
export function DrawRectangleGradientV(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color1: Color,
  color2: Color
): void {
  lib.symbols.DrawRectangleGradientV(
    posX,
    posY,
    width,
    height,
    color1.buffer,
    color2.buffer
  );
}

/**
 * Draw a horizontal-gradient-filled rectangle
 */
export function DrawRectangleGradientH(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color1: Color,
  color2: Color
): void {
  lib.symbols.DrawRectangleGradientH(
    posX,
    posY,
    width,
    height,
    color1.buffer,
    color2.buffer
  );
}

/**
 * Draw a gradient-filled rectangle with custom vertex colors
 */
export function DrawRectangleGradientEx(
  rect: Rectangle,
  col1: Color,
  col2: Color,
  col3: Color,
  col4: Color
): void {
  lib.symbols.DrawRectangleGradientEx(
    rect.buffer,
    col1.buffer,
    col2.buffer,
    col3.buffer,
    col4.buffer
  );
}

/**
 * Draw rectangle outline
 */
export function DrawRectangleLines(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color: Color
): void {
  lib.symbols.DrawRectangleLines(
    posX,
    posY,
    width,
    height,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw rectangle outline with extended parameters
 */
export function DrawRectangleLinesEx(
  rect: Rectangle,
  lineThick: f32,
  color: Color
): void {
  lib.symbols.DrawRectangleLinesEx(
    rect.buffer,
    lineThick,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw rectangle with rounded edges
 */
export function DrawRectangleRounded(
  rect: Rectangle,
  roundness: f32,
  segments: i32,
  color: Color
): void {
  lib.symbols.DrawRectangleRounded(
    rect.buffer,
    roundness,
    segments,
    color.buffer
  );
}

/**
 * Draw rectangle with rounded edges outline
 */
export function DrawRectangleRoundedLines(
  rect: Rectangle,
  roundness: f32,
  segments: i32,
  lineThick: f32,
  color: Color
): void {
  lib.symbols.DrawRectangleRoundedLines(
    rect.buffer,
    roundness,
    segments,
    lineThick,
    color.buffer
  );
}

/**
 * Draw a color-filled triangle (vertex in counter-clockwise order!)
 */
export function DrawTriangle(
  v1: Vector2,
  v2: Vector2,
  v3: Vector2,
  color: Color
): void {
  lib.symbols.DrawTriangle(
    v1.buffer,
    v2.buffer,
    v3.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw triangle outline (vertex in counter-clockwise order!)
 */
export function DrawTriangleLines(
  v1: Vector2,
  v2: Vector2,
  v3: Vector2,
  color: Color
): void {
  lib.symbols.DrawTriangleLines(
    v1.buffer,
    v2.buffer,
    v3.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a triangle fan defined by points (first vertex is the center)
 */
export function DrawTriangleFan(
  points: Vector2[],
  pointCount: i32,
  color: Color
): void {
  const buffer = concatVector2s(points);
  lib.symbols.DrawTriangleFan(
    Deno.UnsafePointer.of(buffer),
    pointCount,
    color.buffer
  );
}

/**
 * Draw a triangle strip defined by points
 */
export function DrawTriangleStrip(
  points: Vector2[],
  pointCount: i32,
  color: Color
): void {
  const buffer = concatVector2s(points);
  lib.symbols.DrawTriangleStrip(
    Deno.UnsafePointer.of(buffer),
    pointCount,
    color.buffer
  );
}

/**
 * Draw a regular polygon (Vector version)
 */
export function DrawPoly(
  center: Vector2,
  sides: i32,
  radius: f32,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawPoly(
    center.buffer,
    sides,
    radius,
    rotation,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a polygon outline of n sides
 */
export function DrawPolyLines(
  center: Vector2,
  sides: i32,
  radius: f32,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawPolyLines(
    center.buffer,
    sides,
    radius,
    rotation,
    color.buffer
  );
}

/**
 * Draw a polygon outline of n sides with extended parameters
 */
export function DrawPolyLinesEx(
  center: Vector2,
  sides: i32,
  radius: f32,
  rotation: f32,
  lineThick: f32,
  color: Color
): void {
  lib.symbols.DrawPolyLinesEx(
    center.buffer,
    sides,
    radius,
    rotation,
    lineThick,
    color.buffer
  );
}

/**
 * Set texture and rectangle to be used on shapes drawing
 */
export function SetShapesTexture(
  texture: { buffer: ArrayBuffer },
  source: Rectangle
): void {
  lib.symbols.SetShapesTexture(texture.buffer, source.buffer as ArrayBuffer);
}

// ============================================================================
// SHAPES3D
// ============================================================================

/**
 * 3D shapes drawing functions - 1:1 raylib bindings
 * @module
 */

/**
 * Draw a line in 3D world space
 */
export function DrawLine3D(
  startPos: Vector3,
  endPos: Vector3,
  color: Color
): void {
  lib.symbols.DrawLine3D(
    startPos.buffer,
    endPos.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw point in 3D world space
 */
export function DrawPoint3D(position: Vector3, color: Color): void {
  lib.symbols.DrawPoint3D(position.buffer, color.buffer as ArrayBuffer);
}

/**
 * Draw circle in 3D world space
 */
export function DrawCircle3D(
  center: Vector3,
  radius: f32,
  rotationAxis: Vector3,
  rotationAngle: f32,
  color: Color
): void {
  lib.symbols.DrawCircle3D(
    center.buffer,
    radius,
    rotationAxis.buffer,
    rotationAngle,
    color.buffer
  );
}

/**
 * Draw triangle in 3D world space
 */
export function DrawTriangle3D(
  v1: Vector3,
  v2: Vector3,
  v3: Vector3,
  color: Color
): void {
  lib.symbols.DrawTriangle3D(
    v1.buffer,
    v2.buffer,
    v3.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw triangle strip (vertex in counter-clockwise order!)
 */
export function DrawTriangleStrip3D(
  points: Vector3[],
  pointCount: i32,
  color: Color
): void {
  const buffer = concatVector3s(points);
  lib.symbols.DrawTriangleStrip3D(
    Deno.UnsafePointer.of(buffer),
    pointCount,
    color.buffer
  );
}

/**
 * Draw cube
 */
export function DrawCube(
  position: Vector3,
  width: f32,
  height: f32,
  length: f32,
  color: Color
): void {
  lib.symbols.DrawCube(
    position.buffer,
    width,
    height,
    length,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw cube (Vector version)
 */
export function DrawCubeV(
  position: Vector3,
  size: Vector3,
  color: Color
): void {
  lib.symbols.DrawCubeV(
    position.buffer,
    size.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw cube wires
 */
export function DrawCubeWires(
  position: Vector3,
  width: f32,
  height: f32,
  length: f32,
  color: Color
): void {
  lib.symbols.DrawCubeWires(
    position.buffer,
    width,
    height,
    length,
    color.buffer
  );
}

/**
 * Draw cube wires (Vector version)
 */
export function DrawCubeWiresV(
  position: Vector3,
  size: Vector3,
  color: Color
): void {
  lib.symbols.DrawCubeWiresV(
    position.buffer,
    size.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw sphere
 */
export function DrawSphere(
  centerPos: Vector3,
  radius: f32,
  color: Color
): void {
  lib.symbols.DrawSphere(centerPos.buffer, radius, color.buffer as ArrayBuffer);
}

/**
 * Draw sphere with extended parameters
 */
export function DrawSphereEx(
  centerPos: Vector3,
  radius: f32,
  rings: i32,
  slices: i32,
  color: Color
): void {
  lib.symbols.DrawSphereEx(
    centerPos.buffer,
    radius,
    rings,
    slices,
    color.buffer
  );
}

/**
 * Draw sphere wires
 */
export function DrawSphereWires(
  centerPos: Vector3,
  radius: f32,
  rings: i32,
  slices: i32,
  color: Color
): void {
  lib.symbols.DrawSphereWires(
    centerPos.buffer,
    radius,
    rings,
    slices,
    color.buffer
  );
}

/**
 * Draw cylinder
 */
export function DrawCylinder(
  position: Vector3,
  radiusTop: f32,
  radiusBottom: f32,
  height: f32,
  slices: i32,
  color: Color
): void {
  lib.symbols.DrawCylinder(
    position.buffer,
    radiusTop,
    radiusBottom,
    height,
    slices,
    color.buffer
  );
}

/**
 * Draw cylinder with base at startPos and top at endPos
 */
export function DrawCylinderEx(
  startPos: Vector3,
  endPos: Vector3,
  startRadius: f32,
  endRadius: f32,
  sides: i32,
  color: Color
): void {
  lib.symbols.DrawCylinderEx(
    startPos.buffer,
    endPos.buffer,
    startRadius,
    endRadius,
    sides,
    color.buffer
  );
}

/**
 * Draw cylinder wires
 */
export function DrawCylinderWires(
  position: Vector3,
  radiusTop: f32,
  radiusBottom: f32,
  height: f32,
  slices: i32,
  color: Color
): void {
  lib.symbols.DrawCylinderWires(
    position.buffer,
    radiusTop,
    radiusBottom,
    height,
    slices,
    color.buffer
  );
}

/**
 * Draw cylinder wires with base at startPos and top at endPos
 */
export function DrawCylinderWiresEx(
  startPos: Vector3,
  endPos: Vector3,
  startRadius: f32,
  endRadius: f32,
  sides: i32,
  color: Color
): void {
  lib.symbols.DrawCylinderWiresEx(
    startPos.buffer,
    endPos.buffer,
    startRadius,
    endRadius,
    sides,
    color.buffer
  );
}

/**
 * Draw a plane XZ
 */
export function DrawPlane(
  centerPos: Vector3,
  size: Vector2,
  color: Color
): void {
  lib.symbols.DrawPlane(
    centerPos.buffer,
    size.buffer,
    color.buffer as ArrayBuffer
  );
}

/**
 * Draw a ray line
 */
export function DrawRay(ray: { buffer: ArrayBuffer }, color: Color): void {
  lib.symbols.DrawRay(ray.buffer, color.buffer as ArrayBuffer);
}

/**
 * Draw a grid (centered at (0, 0, 0))
 */
export function DrawGrid(slices: i32, spacing: f32): void {
  lib.symbols.DrawGrid(slices, spacing);
}

// ============================================================================
// MODEL
// ============================================================================

/**
 * Model loading, drawing, manipulation functions - 1:1 raylib bindings
 * @module
 */

/**
 * Model type
 */
export class Model {
  constructor(
    public transform: Matrix,
    public meshCount: i32,
    public meshes: { buffer: ArrayBuffer }[],
    public materials: { buffer: ArrayBuffer }[],
    public meshMaterial: i32,
    public boneCount: i32,
    public bones: { buffer: ArrayBuffer }[],
    public bindPose: { buffer: ArrayBuffer }[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Model {
    const view = new DataView(buffer);
    let offset = 0;

    // Extract transform matrix (20 f32 values = 80 bytes)
    const transform = Matrix.fromBuffer(buffer.slice(offset, offset + 80));
    offset += 80;

    // Extract meshCount (i32 = 4 bytes)
    const meshCount = view.getInt32(offset, true);
    offset += 4;

    // Extract boneCount (i32 = 4 bytes)
    const boneCount = view.getInt32(offset, true);
    offset += 4;

    // Extract meshes pointer (pointer = 8 bytes on 64-bit)
    const meshesPtr = view.getBigUint64(offset, true);
    offset += 8;

    // Extract materials pointer (pointer = 8 bytes on 64-bit)
    const materialsPtr = view.getBigUint64(offset, true);
    offset += 8;

    // Extract bones pointer (pointer = 8 bytes on 64-bit)
    const bonesPtr = view.getBigUint64(offset, true);
    offset += 8;

    // Extract meshMaterial (i32 = 4 bytes)
    const meshMaterial = view.getInt32(offset, true);
    offset += 4;

    // Extract bindPose pointer (pointer = 8 bytes on 64-bit)
    const bindPosePtr = view.getBigUint64(offset, true);
    offset += 8;

    // Extract additional pointer (pointer = 8 bytes on 64-bit)
    const _additionalPtr = view.getBigUint64(offset, true);

    // Convert pointers to ArrayBuffer objects for array handling
    const meshes = Model.readPointerArray(meshesPtr, meshCount, 152); // Mesh struct size
    const materials = Model.readPointerArray(materialsPtr, meshCount, 28); // Material struct size
    const bones = Model.readPointerArray(bonesPtr, boneCount, 64); // Bone struct size
    const bindPose = Model.readPointerArray(bindPosePtr, boneCount, 64); // Matrix struct size

    return new Model(
      transform,
      meshCount,
      meshes,
      materials,
      meshMaterial,
      boneCount,
      bones,
      bindPose
    );
  }

  /**
   * Helper method to read an array of structs from a pointer
   *
   * This method safely dereferences C pointers and reads array data from memory.
   * It handles the conversion from C-style arrays to JavaScript ArrayBuffer objects.
   *
   * @param ptr - The memory pointer to the array
   * @param count - Number of elements in the array
   * @param structSize - Size of each struct in bytes
   * @returns Array of objects with buffer property containing the struct data
   */
  private static readPointerArray(
    ptr: bigint,
    count: i32,
    structSize: i32
  ): { buffer: ArrayBuffer }[] {
    if (ptr === 0n || count === 0) {
      return [];
    }

    const result: { buffer: ArrayBuffer }[] = [];
    const pointer = Deno.UnsafePointer.create(ptr);

    if (!pointer) {
      console.warn("Failed to create pointer from bigint:", ptr);
      return [];
    }

    try {
      const view = new Deno.UnsafePointerView(pointer);

      for (let i = 0; i < count; i++) {
        const structBuffer = new ArrayBuffer(structSize);
        const structView = new Uint8Array(structBuffer);

        // Read the struct data from memory
        for (let j = 0; j < structSize; j++) {
          structView[j] = view.getUint8(i * structSize + j);
        }

        result.push({ buffer: structBuffer });
      }
    } catch (error) {
      console.warn("Error reading pointer array:", error);
      return [];
    }

    return result;
  }

  get buffer(): ArrayBuffer {
    // Calculate total buffer size: 20 f32 + 2 i32 + 6 pointers = 80 + 8 + 48 = 136 bytes
    const buffer = new ArrayBuffer(136);
    const view = new DataView(buffer);
    let offset = 0;

    // Copy transform matrix (20 f32 values = 80 bytes)
    const transformData = new Uint8Array(this.transform.buffer as ArrayBuffer);
    new Uint8Array(buffer, offset, 80).set(transformData.slice(0, 80));
    offset += 80;

    // Copy meshCount (i32 = 4 bytes)
    view.setInt32(offset, this.meshCount, true);
    offset += 4;

    // Copy boneCount (i32 = 4 bytes)
    view.setInt32(offset, this.boneCount, true);
    offset += 4;

    // Copy meshes pointer (pointer = 8 bytes)
    // Note: In a real implementation, you'd need to allocate memory for the arrays
    // and store the pointers. This is a placeholder.
    view.setBigUint64(offset, 0n, true);
    offset += 8;

    // Copy materials pointer (pointer = 8 bytes)
    view.setBigUint64(offset, 0n, true);
    offset += 8;

    // Copy bones pointer (pointer = 8 bytes)
    view.setBigUint64(offset, 0n, true);
    offset += 8;

    // Copy meshMaterial (i32 = 4 bytes)
    view.setInt32(offset, this.meshMaterial, true);
    offset += 4;

    // Copy bindPose pointer (pointer = 8 bytes)
    view.setBigUint64(offset, 0n, true);
    offset += 8;

    // Copy additional pointer (pointer = 8 bytes)
    view.setBigUint64(offset, 0n, true);

    return buffer;
  }
}

/**
 * ModelAnimation type
 */
export class ModelAnimation {
  constructor(
    public boneCount: i32,
    public frameCount: i32,
    public bones: { buffer: ArrayBuffer }[],
    public framePoses: { buffer: ArrayBuffer }[][]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): ModelAnimation {
    const view = new DataView(buffer);
    return new ModelAnimation(
      view.getInt32(0, true), // boneCount
      view.getInt32(4, true), // frameCount
      [], // bones - would need proper array handling
      [] // framePoses - would need proper array handling
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setInt32(0, this.boneCount, true);
    view.setInt32(4, this.frameCount, true);
    return buffer;
  }
}

/**
 * Load model from files (meshes and materials)
 */
export function LoadModel(fileName: string): Model {
  return Model.fromBuffer(
    lib.symbols.LoadModel(createStringBuffer(fileName)).buffer
  );
}

/**
 * Load model from generated mesh (default material)
 */
export function LoadModelFromMesh(mesh: { buffer: ArrayBuffer }): Model {
  return Model.fromBuffer(
    lib.symbols.LoadModelFromMesh(mesh.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

/**
 * Check if a model is ready
 */
export function IsModelReady(model: Model): boolean {
  return !!lib.symbols.IsModelReady(model.buffer as ArrayBuffer);
}

/**
 * Unload model (including meshes) from memory (RAM and/or VRAM)
 */
export function UnloadModel(model: Model): void {
  lib.symbols.UnloadModel(model.buffer as ArrayBuffer);
}

/**
 * Compute model bounding box limits (considers all meshes)
 */
export function GetModelBoundingBox(model: Model): BoundingBox {
  return BoundingBox.fromBuffer(
    lib.symbols.GetModelBoundingBox(model.buffer as ArrayBuffer).buffer
  );
}

/**
 * Draw a model (with texture if set)
 */
export function DrawModel(
  model: Model,
  position: Vector3,
  scale: f32,
  tint: Color
): void {
  lib.symbols.DrawModel(
    model.buffer,
    position.buffer,
    scale,
    tint.buffer as ArrayBuffer
  );
}

/**
 * Draw a model with extended parameters
 */
export function DrawModelEx(
  model: Model,
  position: Vector3,
  rotationAxis: Vector3,
  rotationAngle: f32,
  scale: Vector3,
  tint: Color
): void {
  lib.symbols.DrawModelEx(
    model.buffer,
    position.buffer,
    rotationAxis.buffer,
    rotationAngle,
    scale.buffer,
    tint.buffer
  );
}

/**
 * Draw a model wires (with texture if set)
 */
export function DrawModelWires(
  model: Model,
  position: Vector3,
  scale: f32,
  tint: Color
): void {
  lib.symbols.DrawModelWires(
    model.buffer,
    position.buffer,
    scale,
    tint.buffer as ArrayBuffer
  );
}

/**
 * Draw a model wires (with texture if set) with extended parameters
 */
export function DrawModelWiresEx(
  model: Model,
  position: Vector3,
  rotationAxis: Vector3,
  rotationAngle: f32,
  scale: Vector3,
  tint: Color
): void {
  lib.symbols.DrawModelWiresEx(
    model.buffer,
    position.buffer,
    rotationAxis.buffer,
    rotationAngle,
    scale.buffer,
    tint.buffer
  );
}

/**
 * Draw bounding box (wires)
 */
export function DrawBoundingBox(box: BoundingBox, color: Color): void {
  lib.symbols.DrawBoundingBox(box.buffer, color.buffer as ArrayBuffer);
}

/**
 * Draw a billboard texture
 */
export function DrawBillboard(
  camera: { buffer: ArrayBuffer },
  texture: { buffer: ArrayBuffer },
  position: Vector3,
  size: f32,
  tint: Color
): void {
  lib.symbols.DrawBillboard(
    camera.buffer,
    texture.buffer,
    position.buffer,
    size,
    tint.buffer
  );
}

/**
 * Draw a billboard texture defined by source
 */
export function DrawBillboardRec(
  camera: { buffer: ArrayBuffer },
  texture: { buffer: ArrayBuffer },
  source: { buffer: ArrayBuffer },
  position: Vector3,
  size: Vector2,
  tint: Color
): void {
  lib.symbols.DrawBillboardRec(
    camera.buffer,
    texture.buffer,
    source.buffer,
    position.buffer,
    size.buffer,
    tint.buffer
  );
}

/**
 * Draw a billboard texture defined by source and rotation
 */
export function DrawBillboardPro(
  camera: { buffer: ArrayBuffer },
  texture: { buffer: ArrayBuffer },
  source: { buffer: ArrayBuffer },
  position: Vector3,
  up: Vector3,
  size: Vector2,
  origin: Vector2,
  rotation: f32,
  tint: Color
): void {
  lib.symbols.DrawBillboardPro(
    camera.buffer,
    texture.buffer,
    source.buffer,
    position.buffer,
    up.buffer,
    size.buffer,
    origin.buffer,
    rotation,
    tint.buffer
  );
}

/**
 * Upload mesh vertex data in GPU and provide VAO/VBO ids
 */
export function UploadMesh(mesh: { buffer: ArrayBuffer }, dynamic: i32): void {
  lib.symbols.UploadMesh(Deno.UnsafePointer.of(mesh.buffer), dynamic);
}

/**
 * Update mesh vertex data in GPU for a specific buffer index
 */
export function UpdateMeshBuffer(
  mesh: { buffer: ArrayBuffer },
  index: i32,
  data: Uint8Array,
  dataSize: i32,
  offset: i32
): void {
  lib.symbols.UpdateMeshBuffer(
    mesh.buffer,
    index,
    Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
    dataSize,
    offset
  );
}

/**
 * Unload mesh from memory (RAM and/or VRAM)
 */
export function UnloadMesh(mesh: { buffer: ArrayBuffer }): void {
  lib.symbols.UnloadMesh(mesh.buffer as ArrayBuffer);
}

/**
 * Draw a 3D mesh with material and transform
 */
export function DrawMesh(
  mesh: { buffer: ArrayBuffer },
  material: { buffer: ArrayBuffer },
  transform: Matrix
): void {
  lib.symbols.DrawMesh(
    mesh.buffer,
    material.buffer,
    transform.buffer as ArrayBuffer
  );
}

/**
 * Draw multiple mesh instances with material and different transforms
 */
export function DrawMeshInstanced(
  mesh: { buffer: ArrayBuffer },
  material: { buffer: ArrayBuffer },
  transforms: Matrix[],
  instances: i32
): void {
  const buffer = new Float32Array(transforms.length * 16);
  for (let i = 0; i < transforms.length; i++) {
    buffer.set(new Float32Array(transforms[i].buffer as ArrayBuffer), i * 16);
  }

  lib.symbols.DrawMeshInstanced(
    mesh.buffer,
    material.buffer,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    instances
  );
}

/**
 * Check mesh collision against another mesh
 */
export function CheckCollisionSpheres(
  center1: Vector3,
  radius1: f32,
  center2: Vector3,
  radius2: f32
): boolean {
  return !!lib.symbols.CheckCollisionSpheres(
    center1.buffer,
    radius1,
    center2.buffer,
    radius2
  );
}

/**
 * Check collision between two bounding boxes
 */
export function CheckCollisionBoxes(
  box1: BoundingBox,
  box2: BoundingBox
): boolean {
  return !!lib.symbols.CheckCollisionBoxes(
    box1.buffer,
    box2.buffer as ArrayBuffer
  );
}

/**
 * Check collision between box and sphere
 */
export function CheckCollisionBoxSphere(
  box: BoundingBox,
  center: Vector3,
  radius: f32
): boolean {
  return !!lib.symbols.CheckCollisionBoxSphere(
    box.buffer,
    center.buffer,
    radius
  );
}

/**
 * Get collision info between ray and sphere
 */
export function GetRayCollisionSphere(
  ray: Ray,
  center: Vector3,
  radius: f32
): { hit: boolean; distance: f32; point: Vector3; normal: Vector3 } {
  const result = lib.symbols.GetRayCollisionSphere(
    ray.buffer,
    center.buffer,
    radius
  );
  const view = new DataView(result.buffer);
  return {
    hit: !!view.getUint8(0),
    distance: view.getFloat32(1, littleEndian),
    point: new Vector3(
      view.getFloat32(5, littleEndian),
      view.getFloat32(9, littleEndian),
      view.getFloat32(13, littleEndian)
    ),
    normal: new Vector3(
      view.getFloat32(17, littleEndian),
      view.getFloat32(21, littleEndian),
      view.getFloat32(25, littleEndian)
    ),
  };
}

/**
 * Get collision info between ray and box
 */
export function GetRayCollisionBox(
  ray: Ray,
  box: BoundingBox
): { hit: boolean; distance: f32; point: Vector3; normal: Vector3 } {
  const result = lib.symbols.GetRayCollisionBox(
    ray.buffer,
    box.buffer as ArrayBuffer
  );
  const view = new DataView(result.buffer);
  return {
    hit: !!view.getUint8(0),
    distance: view.getFloat32(1, littleEndian),
    point: new Vector3(
      view.getFloat32(5, littleEndian),
      view.getFloat32(9, littleEndian),
      view.getFloat32(13, littleEndian)
    ),
    normal: new Vector3(
      view.getFloat32(17, littleEndian),
      view.getFloat32(21, littleEndian),
      view.getFloat32(25, littleEndian)
    ),
  };
}

/**
 * Get collision info between ray and mesh
 */
export function GetRayCollisionMesh(
  ray: Ray,
  mesh: { buffer: ArrayBuffer },
  transform: Matrix
): { hit: boolean; distance: f32; point: Vector3; normal: Vector3 } {
  const result = lib.symbols.GetRayCollisionMesh(
    ray.buffer,
    mesh.buffer,
    transform.buffer
  );
  const view = new DataView(result.buffer);
  return {
    hit: !!view.getUint8(0),
    distance: view.getFloat32(1, littleEndian),
    point: new Vector3(
      view.getFloat32(5, littleEndian),
      view.getFloat32(9, littleEndian),
      view.getFloat32(13, littleEndian)
    ),
    normal: new Vector3(
      view.getFloat32(17, littleEndian),
      view.getFloat32(21, littleEndian),
      view.getFloat32(25, littleEndian)
    ),
  };
}

/**
 * Get collision info between ray and triangle
 */
export function GetRayCollisionTriangle(
  ray: Ray,
  p1: Vector3,
  p2: Vector3,
  p3: Vector3
): { hit: boolean; distance: f32; point: Vector3; normal: Vector3 } {
  const result = lib.symbols.GetRayCollisionTriangle(
    ray.buffer,
    p1.buffer,
    p2.buffer,
    p3.buffer
  );
  const view = new DataView(result.buffer);
  return {
    hit: !!view.getUint8(0),
    distance: view.getFloat32(1, littleEndian),
    point: new Vector3(
      view.getFloat32(5, littleEndian),
      view.getFloat32(9, littleEndian),
      view.getFloat32(13, littleEndian)
    ),
    normal: new Vector3(
      view.getFloat32(17, littleEndian),
      view.getFloat32(21, littleEndian),
      view.getFloat32(25, littleEndian)
    ),
  };
}

/**
 * Get collision info between ray and quad
 */
export function GetRayCollisionQuad(
  ray: Ray,
  p1: Vector3,
  p2: Vector3,
  p3: Vector3,
  p4: Vector3
): { hit: boolean; distance: f32; point: Vector3; normal: Vector3 } {
  const result = lib.symbols.GetRayCollisionQuad(
    ray.buffer,
    p1.buffer,
    p2.buffer,
    p3.buffer,
    p4.buffer
  );
  const view = new DataView(result.buffer);
  return {
    hit: !!view.getUint8(0),
    distance: view.getFloat32(1, littleEndian),
    point: new Vector3(
      view.getFloat32(5, littleEndian),
      view.getFloat32(9, littleEndian),
      view.getFloat32(13, littleEndian)
    ),
    normal: new Vector3(
      view.getFloat32(17, littleEndian),
      view.getFloat32(21, littleEndian),
      view.getFloat32(25, littleEndian)
    ),
  };
}

// ============================================================================
// MESH
// ============================================================================

/**
 * Mesh generation and manipulation functions - 1:1 raylib bindings
 * @module
 */

/**
 * Mesh type
 */
export class Mesh {
  constructor(
    public vertexCount: i32,
    public triangleCount: i32,
    public vertices: f32[],
    public texcoords: f32[],
    public texcoords2: f32[],
    public normals: f32[],
    public tangents: f32[],
    public colors: f32[],
    public indices: i32[],
    public animVertices: f32[],
    public animNormals: f32[],
    public boneIds: i32[],
    public boneWeights: f32[],
    public vaoId: i32,
    public vboId: i32[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Mesh {
    // This is a simplified version - in a real implementation you'd need to handle
    // the complex structure properly
    const view = new DataView(buffer);
    return new Mesh(
      view.getInt32(0, true), // vertexCount
      view.getInt32(4, true), // triangleCount
      [], // vertices - would need proper array handling
      [], // texcoords - would need proper array handling
      [], // texcoords2 - would need proper array handling
      [], // normals - would need proper array handling
      [], // tangents - would need proper array handling
      [], // colors - would need proper array handling
      [], // indices - would need proper array handling
      [], // animVertices - would need proper array handling
      [], // animNormals - would need proper array handling
      [], // boneIds - would need proper array handling
      [], // boneWeights - would need proper array handling
      view.getUint32(8, true), // vaoId
      [] // vboId - would need proper array handling
    );
  }

  get buffer(): ArrayBuffer {
    // This is a simplified version - in a real implementation you'd need to handle
    // the complex structure properly
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);
    view.setInt32(0, this.vertexCount, true);
    view.setInt32(4, this.triangleCount, true);
    view.setUint32(8, this.vaoId, true);
    return buffer;
  }
}

/**
 * Generate polygonal mesh
 */
export function GenMeshPoly(sides: i32, radius: f32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshPoly(sides, radius).buffer as ArrayBuffer
  );
}

/**
 * Generate plane mesh (with subdivisions)
 */
export function GenMeshPlane(
  width: f32,
  length: f32,
  resX: i32,
  resZ: i32
): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshPlane(width, length, resX, resZ).buffer
  );
}

/**
 * Generate cuboid mesh
 */
export function GenMeshCube(width: f32, height: f32, length: f32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCube(width, height, length).buffer as ArrayBuffer
  );
}

/**
 * Generate sphere mesh (standard sphere)
 */
export function GenMeshSphere(radius: f32, rings: i32, slices: i32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshSphere(radius, rings, slices).buffer
  );
}

/**
 * Generate half-sphere mesh (no bottom cap)
 */
export function GenMeshHemiSphere(radius: f32, rings: i32, slices: i32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshHemiSphere(radius, rings, slices).buffer
  );
}

/**
 * Generate cylinder mesh
 */
export function GenMeshCylinder(radius: f32, height: f32, slices: i32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCylinder(radius, height, slices).buffer
  );
}

/**
 * Generate cone/pyramid mesh
 */
export function GenMeshCone(radius: f32, height: f32, slices: i32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCone(radius, height, slices).buffer
  );
}

/**
 * Generate torus mesh
 */
export function GenMeshTorus(
  radius: f32,
  size: f32,
  radSeg: i32,
  sides: i32
): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshTorus(radius, size, radSeg, sides).buffer
  );
}

/**
 * Generate trefoil knot mesh
 */
export function GenMeshKnot(
  radius: f32,
  size: f32,
  radSeg: i32,
  sides: i32
): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshKnot(radius, size, radSeg, sides).buffer
  );
}

/**
 * Generate heightmap mesh from image data
 */
export function GenMeshHeightmap(
  heightmap: { buffer: ArrayBuffer },
  size: Vector3
): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshHeightmap(heightmap.buffer, size.buffer as ArrayBuffer)
      .buffer
  );
}

/**
 * Generate cubes-based mesh from image data
 */
export function GenMeshCubicmap(
  cubicmap: { buffer: ArrayBuffer },
  cubeSize: Vector3
): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCubicmap(cubicmap.buffer, cubeSize.buffer as ArrayBuffer)
      .buffer
  );
}

/**
 * Compute mesh bounding box limits
 */
export function GetMeshBoundingBox(mesh: Mesh): {
  min: Vector3;
  max: Vector3;
} {
  const result = lib.symbols.GetMeshBoundingBox(mesh.buffer as ArrayBuffer);
  const view = new DataView(result.buffer);
  return {
    min: new Vector3(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian)
    ),
    max: new Vector3(
      view.getFloat32(12, littleEndian),
      view.getFloat32(16, littleEndian),
      view.getFloat32(20, littleEndian)
    ),
  };
}

/**
 * Compute mesh tangents
 */
export function GenMeshTangents(mesh: Mesh): void {
  lib.symbols.GenMeshTangents(Deno.UnsafePointer.of(mesh.buffer));
}

/**
 * Compute mesh binormals
 */

/**
 * Export mesh data to file, returns true on success
 */
export function ExportMesh(mesh: Mesh, fileName: string): boolean {
  return !!lib.symbols.ExportMesh(
    mesh.buffer,
    new TextEncoder().encode(fileName + "\0").buffer
  );
}

/**
 * Export mesh as code file (.h) defining multiple arrays of vertex attributes
 */

// ============================================================================
// SHADER
// ============================================================================

/**
 * Shader management functions - 1:1 raylib bindings
 * @module
 */

/**
 * Shader type
 */
export class Shader {
  constructor(public id: i32, public locs: i32[]) {}

  static fromBuffer(buffer: ArrayBuffer): Shader {
    const view = new DataView(buffer);
    return new Shader(
      view.getUint32(0, true), // id
      [] // locs - would need proper array handling
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, this.id, true);
    return buffer;
  }
}

/**
 * Load shader from files and bind default locations
 */
export function LoadShader(vsFileName: string, fsFileName: string): Shader {
  return Shader.fromBuffer(
    lib.symbols.LoadShader(
      createStringBuffer(vsFileName),
      createStringBuffer(fsFileName)
    ).buffer
  );
}

/**
 * Load shader from code strings and bind default locations
 */
export function LoadShaderFromMemory(vsCode: string, fsCode: string): Shader {
  return Shader.fromBuffer(
    lib.symbols.LoadShaderFromMemory(
      createStringBuffer(vsCode),
      createStringBuffer(fsCode)
    ).buffer
  );
}

/**
 * Check if a shader is ready
 */
export function IsShaderReady(shader: Shader): boolean {
  return !!lib.symbols.IsShaderReady(shader.buffer as ArrayBuffer);
}

/**
 * Get shader uniform location
 */
export function GetShaderLocation(shader: Shader, uniformName: string): i32 {
  return lib.symbols.GetShaderLocation(
    shader.buffer,
    createStringBuffer(uniformName)
  );
}

/**
 * Get shader attribute location
 */
export function GetShaderLocationAttrib(
  shader: Shader,
  attribName: string
): i32 {
  return lib.symbols.GetShaderLocationAttrib(
    shader.buffer,
    createStringBuffer(attribName)
  );
}

/**
 * Set shader uniform value
 */
export function SetShaderValue(
  shader: Shader,
  locIndex: i32,
  value: f32[],
  uniformType: i32
): void {
  const buffer = new Float32Array(value);
  lib.symbols.SetShaderValue(
    shader.buffer,
    locIndex,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    uniformType
  );
}

/**
 * Set shader uniform value vector
 */
export function SetShaderValueV(
  shader: Shader,
  locIndex: i32,
  value: f32[],
  uniformType: i32,
  count: i32
): void {
  const buffer = new Float32Array(value);
  lib.symbols.SetShaderValueV(
    shader.buffer,
    locIndex,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer),
    uniformType,
    count
  );
}

/**
 * Set shader uniform value (matrix 4x4)
 */
export function SetShaderValueMatrix(
  shader: Shader,
  locIndex: i32,
  mat: Matrix
): void {
  lib.symbols.SetShaderValueMatrix(
    shader.buffer,
    locIndex,
    mat.buffer as ArrayBuffer
  );
}

/**
 * Set shader uniform value for texture (sampler2d)
 */
export function SetShaderValueTexture(
  shader: Shader,
  locIndex: i32,
  texture: { buffer: ArrayBuffer }
): void {
  lib.symbols.SetShaderValueTexture(
    shader.buffer,
    locIndex,
    texture.buffer as ArrayBuffer
  );
}

/**
 * Unload shader from GPU memory (VRAM)
 */
export function UnloadShader(shader: Shader): void {
  lib.symbols.UnloadShader(shader.buffer as ArrayBuffer);
}

// ============================================================================
// CAMERA3D
// ============================================================================

/**
 * 3D camera functions - 1:1 raylib bindings
 * @module
 */

/**
 * Camera3D type
 */
export class Camera3D {
  constructor(
    public position: Vector3,
    public target: Vector3,
    public up: Vector3,
    public fovy: f32,
    public projection: i32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Camera3D {
    const view = new DataView(buffer);
    return new Camera3D(
      Vector3.fromBuffer(buffer.slice(0, 12)),
      Vector3.fromBuffer(buffer.slice(12, 24)),
      Vector3.fromBuffer(buffer.slice(24, 36)),
      view.getFloat32(36, true),
      view.getInt32(40, true)
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(44);
    new Uint8Array(buffer, 0, 12).set(
      new Uint8Array(this.position.buffer as ArrayBuffer)
    );
    new Uint8Array(buffer, 12, 12).set(
      new Uint8Array(this.target.buffer as ArrayBuffer)
    );
    new Uint8Array(buffer, 24, 12).set(
      new Uint8Array(this.up.buffer as ArrayBuffer)
    );
    const view = new DataView(buffer);
    view.setFloat32(36, this.fovy, true);
    view.setInt32(40, this.projection, true);
    return buffer;
  }
}

// Camera projection types
export const CAMERA_PERSPECTIVE = 0;
export const CAMERA_ORTHOGRAPHIC = 1;

// Camera modes
export const CAMERA_CUSTOM = 0;
export const CAMERA_FREE = 1;
export const CAMERA_ORBITAL = 2;
export const CAMERA_FIRST_PERSON = 3;
export const CAMERA_THIRD_PERSON = 4;

/**
 * Get camera transform matrix (view matrix)
 */
export function GetCameraMatrix(camera: Camera3D): Matrix {
  return Matrix.fromBuffer(
    lib.symbols.GetCameraMatrix(camera.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

/**
 * Get camera 2d transform matrix
 */
export function GetCameraMatrix2D(camera: { buffer: ArrayBuffer }): Matrix {
  return Matrix.fromBuffer(
    lib.symbols.GetCameraMatrix2D(camera.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

/**
 * Get the screen space position for a 3d world space position
 */
export function GetWorldToScreen(position: Vector3, camera: Camera3D): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWorldToScreen(position.buffer, camera.buffer as ArrayBuffer)
      .buffer
  );
}

/**
 * Get the screen space position for a 2d camera world space position
 */
export function GetWorldToScreen2D(
  position: Vector2,
  camera: { buffer: ArrayBuffer }
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWorldToScreen2D(
      position.buffer,
      camera.buffer as ArrayBuffer
    ).buffer
  );
}

/**
 * Get size position for a 3d world space position
 */
export function GetWorldToScreenEx(
  position: Vector3,
  camera: Camera3D,
  width: i32,
  height: i32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWorldToScreenEx(
      position.buffer,
      camera.buffer,
      width,
      height
    ).buffer
  );
}

/**
 * Get the world space position for a 2d camera screen space position
 */
export function GetScreenToWorld2D(
  position: Vector2,
  camera: { buffer: ArrayBuffer }
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetScreenToWorld2D(
      position.buffer,
      camera.buffer as ArrayBuffer
    ).buffer
  );
}

/**
 * Get the screen space position for a 3d world space position
 */

/**
 * Get a ray trace from mouse position
 */
export function GetMouseRay(mousePosition: Vector2, camera: Camera3D): Ray {
  return Ray.fromBuffer(
    lib.symbols.GetMouseRay(mousePosition.buffer, camera.buffer as ArrayBuffer)
      .buffer
  );
}

// ============================================================================
// MATERIAL
// ============================================================================

/**
 * Material management functions - 1:1 raylib bindings
 * @module
 */

/**
 * Material type
 */
export class Material {
  constructor(
    public shader: { buffer: ArrayBuffer },
    public maps: { buffer: ArrayBuffer }[],
    public params: f32[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Material {
    // This is a simplified version - in a real implementation you'd need to handle
    // the complex structure properly
    return new Material(
      { buffer: buffer.slice(0, 8) }, // shader
      [], // maps - would need proper array handling
      [] // params - would need proper array handling
    );
  }

  get buffer(): ArrayBuffer {
    // This is a simplified version - in a real implementation you'd need to handle
    // the complex structure properly
    const buffer = new ArrayBuffer(8);
    new Uint8Array(buffer, 0, 8).set(
      new Uint8Array(this.shader.buffer as ArrayBuffer)
    );
    return buffer;
  }
}

/**
 * MaterialMap type
 */
export class MaterialMap {
  constructor(
    public texture: { buffer: ArrayBuffer },
    public color: Color,
    public value: f32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): MaterialMap {
    const view = new DataView(buffer);
    return new MaterialMap(
      { buffer: buffer.slice(0, 8) }, // texture
      Color.fromBuffer(buffer.slice(8, 12)), // color
      view.getFloat32(12, true) // value
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(16);
    new Uint8Array(buffer, 0, 8).set(
      new Uint8Array(this.texture.buffer as ArrayBuffer)
    );
    new Uint8Array(buffer, 8, 4).set(
      new Uint8Array(this.color.buffer as ArrayBuffer)
    );
    const view = new DataView(buffer);
    view.setFloat32(12, this.value, true);
    return buffer;
  }
}

// Material map types
export const MATERIAL_MAP_ALBEDO = 0;
export const MATERIAL_MAP_METALNESS = 1;
export const MATERIAL_MAP_NORMAL = 2;
export const MATERIAL_MAP_ROUGHNESS = 3;
export const MATERIAL_MAP_OCCLUSION = 4;
export const MATERIAL_MAP_EMISSION = 5;
export const MATERIAL_MAP_HEIGHT = 6;
export const MATERIAL_MAP_CUBEMAP = 7;
export const MATERIAL_MAP_IRRADIANCE = 8;
export const MATERIAL_MAP_PREFILTER = 9;
export const MATERIAL_MAP_BRDF = 10;

// Material map index
export const MATERIAL_MAP_ALBEDO_INDEX = 0;
export const MATERIAL_MAP_METALNESS_INDEX = 1;
export const MATERIAL_MAP_NORMAL_INDEX = 2;
export const MATERIAL_MAP_ROUGHNESS_INDEX = 3;
export const MATERIAL_MAP_OCCLUSION_INDEX = 4;
export const MATERIAL_MAP_EMISSION_INDEX = 5;
export const MATERIAL_MAP_HEIGHT_INDEX = 6;
export const MATERIAL_MAP_CUBEMAP_INDEX = 7;
export const MATERIAL_MAP_IRRADIANCE_INDEX = 8;
export const MATERIAL_MAP_PREFILTER_INDEX = 9;
export const MATERIAL_MAP_BRDF_INDEX = 10;

// Shader location index
export const SHADER_LOC_VERTEX_POSITION = 0;
export const SHADER_LOC_VERTEX_TEXCOORD01 = 1;
export const SHADER_LOC_VERTEX_TEXCOORD02 = 2;
export const SHADER_LOC_VERTEX_NORMAL = 3;
export const SHADER_LOC_VERTEX_TANGENT = 4;
export const SHADER_LOC_VERTEX_COLOR = 5;
export const SHADER_LOC_MATRIX_MVP = 6;
export const SHADER_LOC_VECTOR_VIEW = 7;
export const SHADER_LOC_COLOR_DIFFUSE = 8;
export const SHADER_LOC_COLOR_SPECULAR = 9;
export const SHADER_LOC_COLOR_AMBIENT = 10;
export const SHADER_LOC_MAP_ALBEDO = 11;
export const SHADER_LOC_MAP_METALNESS = 12;
export const SHADER_LOC_MAP_NORMAL = 13;
export const SHADER_LOC_MAP_ROUGHNESS = 14;
export const SHADER_LOC_MAP_OCCLUSION = 15;
export const SHADER_LOC_MAP_EMISSION = 16;
export const SHADER_LOC_MAP_HEIGHT = 17;
export const SHADER_LOC_MAP_CUBEMAP = 18;
export const SHADER_LOC_MAP_IRRADIANCE = 19;
export const SHADER_LOC_MAP_PREFILTER = 20;
export const SHADER_LOC_MAP_BRDF = 21;

// Shader uniform data type
export const SHADER_UNIFORM_FLOAT = 0;
export const SHADER_UNIFORM_VEC2 = 1;
export const SHADER_UNIFORM_VEC3 = 2;
export const SHADER_UNIFORM_VEC4 = 3;
export const SHADER_UNIFORM_INT = 4;
export const SHADER_UNIFORM_IVEC2 = 5;
export const SHADER_UNIFORM_IVEC3 = 6;
export const SHADER_UNIFORM_IVEC4 = 7;
export const SHADER_UNIFORM_SAMPLER2D = 8;

/**
 * Load materials from model file
 */
export function LoadMaterials(
  fileName: string,
  _materialCount: { value: i32 }
): Material[] {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.LoadMaterials(
    new TextEncoder().encode(fileName + "\0").buffer,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    const materialCount = buffer[0];
    const result: Material[] = [];
    const view = new Deno.UnsafePointerView(ptr);

    for (let i = 0; i < materialCount; i++) {
      const materialPtr = view.getBigUint64(i * 8);
      if (materialPtr) {
        // Material struct size - this is approximate
        const materialSize = 128; // Approximate size for Material struct
        const materialBuffer = new Uint8Array(materialSize);
        const materialView = new Deno.UnsafePointerView(
          Deno.UnsafePointer.create(materialPtr)!
        );
        for (let j = 0; j < materialSize; j++) {
          materialBuffer[j] = materialView.getUint8(j);
        }
        result.push(Material.fromBuffer(materialBuffer.buffer));
      }
    }
    return result;
  }
  return [];
}

/**
 * Load default material (Supports: DIFFUSE, SPECULAR, NORMAL maps)
 */
export function LoadMaterialDefault(): Material {
  return Material.fromBuffer(
    lib.symbols.LoadMaterialDefault().buffer as ArrayBuffer
  );
}

/**
 * Check if a material is ready
 */
export function IsMaterialReady(material: Material): boolean {
  return !!lib.symbols.IsMaterialReady(material.buffer as ArrayBuffer);
}

/**
 * Unload material from GPU memory (VRAM)
 */
export function UnloadMaterial(material: Material): void {
  lib.symbols.UnloadMaterial(material.buffer as ArrayBuffer);
}

/**
 * Set texture for a material map type (MATERIAL_MAP_DIFFUSE, MATERIAL_MAP_SPECULAR...)
 */
export function SetMaterialTexture(
  material: Material,
  mapType: i32,
  texture: { buffer: ArrayBuffer }
): void {
  lib.symbols.SetMaterialTexture(
    Deno.UnsafePointer.of(material.buffer),
    mapType,
    texture.buffer as ArrayBuffer
  );
}

/**
 * Set material for a mesh
 */
export function SetModelMeshMaterial(
  model: { buffer: ArrayBuffer },
  meshId: i32,
  materialId: i32
): void {
  lib.symbols.SetModelMeshMaterial(
    Deno.UnsafePointer.of(model.buffer as ArrayBuffer),
    meshId,
    materialId
  );
}

// ============================================================================
// FILES
// ============================================================================

/**
 * File management functions - 1:1 raylib bindings
 * @module
 */

/**
 * Load file data as byte array (read)
 */
export function LoadFileData(
  fileName: string,
  bytesRead: { value: i32 }
): Uint8Array {
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.LoadFileData(
    createStringBuffer(fileName),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    return new Uint8Array(
      Deno.UnsafePointerView.getArrayBuffer(ptr, bytesRead.value)
    );
  }
  return new Uint8Array(0);
}

/**
 * Unload file data from memory
 */
export function UnloadFileData(data: Uint8Array): void {
  lib.symbols.UnloadFileData(Deno.UnsafePointer.of(data.buffer as ArrayBuffer));
}

/**
 * Save data to file from byte array (write)
 */
export function SaveFileData(
  fileName: string,
  data: Uint8Array,
  bytesToWrite: i32
): boolean {
  return !!lib.symbols.SaveFileData(
    createStringBuffer(fileName),
    Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
    bytesToWrite
  );
}

/**
 * Export data to code (C header), returns true on success
 */
export function ExportDataAsCode(
  data: Uint8Array,
  size: i32,
  fileName: string
): boolean {
  return !!lib.symbols.ExportDataAsCode(
    Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
    size,
    createStringBuffer(fileName)
  );
}

/**
 * Load text data from file (read)
 */
export function LoadFileText(fileName: string): string {
  const ptr = lib.symbols.LoadFileText(createStringBuffer(fileName));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Unload file text data from memory
 */
export function UnloadFileText(text: string): void {
  lib.symbols.UnloadFileText(createStringBuffer(text));
}

/**
 * Save text data to file (write)
 */
export function SaveFileText(fileName: string, text: string): boolean {
  return !!lib.symbols.SaveFileText(
    createStringBuffer(fileName),
    createStringBuffer(text)
  );
}

/**
 * Check if file exists
 */
export function FileExists(fileName: string): boolean {
  return !!lib.symbols.FileExists(createStringBuffer(fileName));
}

/**
 * Check if directory exists
 */
export function DirectoryExists(dirPath: string): boolean {
  return !!lib.symbols.DirectoryExists(createStringBuffer(dirPath));
}

/**
 * Check file extension (including point: .png, .wav)
 */
export function IsFileExtension(fileName: string, ext: string): boolean {
  return !!lib.symbols.IsFileExtension(
    createStringBuffer(fileName),
    createStringBuffer(ext)
  );
}

/**
 * Get file length in bytes (NOTE: GetFileSize() conflicts with windows.h)
 */
export function GetFileLength(fileName: string): i32 {
  return lib.symbols.GetFileLength(createStringBuffer(fileName));
}

/**
 * Get pointer to extension for a filename string (includes dot: '.png')
 */
export function GetFileExtension(fileName: string): string {
  const ptr = lib.symbols.GetFileExtension(createStringBuffer(fileName));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get pointer to filename for a path string
 */
export function GetFileName(filePath: string): string {
  const ptr = lib.symbols.GetFileName(createStringBuffer(filePath));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get filename string without extension (uses static string)
 */
export function GetFileNameWithoutExt(filePath: string): string {
  const ptr = lib.symbols.GetFileNameWithoutExt(createStringBuffer(filePath));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get full path for a given fileName with path (uses static string)
 */
export function GetDirectoryPath(filePath: string): string {
  const ptr = lib.symbols.GetDirectoryPath(createStringBuffer(filePath));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get previous directory path for a given path (uses static string)
 */
export function GetPrevDirectoryPath(dirPath: string): string {
  const ptr = lib.symbols.GetPrevDirectoryPath(createStringBuffer(dirPath));
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get current working directory (uses static string)
 */
export function GetWorkingDirectory(): string {
  const ptr = lib.symbols.GetWorkingDirectory();
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Get the directory if the running application (uses static string)
 */
export function GetApplicationDirectory(): string {
  const ptr = lib.symbols.GetApplicationDirectory();
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}

/**
 * Change working directory, return true on success
 */
export function ChangeDirectory(dir: string): boolean {
  return !!lib.symbols.ChangeDirectory(createStringBuffer(dir));
}

/**
 * Check if a given path is a file or a directory
 */
export function IsPathFile(path: string): boolean {
  return !!lib.symbols.IsPathFile(createStringBuffer(path));
}

/**
 * Load directory filepaths
 */
export function LoadDirectoryFiles(dirPath: string): string[] {
  const result = lib.symbols.LoadDirectoryFiles(createStringBuffer(dirPath));
  if (result && result[2]) {
    const fileList: string[] = [];
    const view = new Deno.UnsafePointerView(
      Deno.UnsafePointer.create(BigInt(result[2]!))!
    );
    const count = result[0];

    for (let i = 0; i < count; i++) {
      const stringPtr = view.getBigUint64(i * 8);
      if (stringPtr) {
        const stringView = new Deno.UnsafePointerView(
          Deno.UnsafePointer.create(stringPtr)!
        );
        fileList.push(stringView.getCString());
      }
    }
    return fileList;
  }
  return [];
}

/**
 * Load directory filepaths with extension filtering and recursive directory scan
 */
export function LoadDirectoryFilesEx(
  basePath: string,
  filter: string,
  scanSubdirs: boolean
): string[] {
  const result = lib.symbols.LoadDirectoryFilesEx(
    createStringBuffer(basePath),
    createStringBuffer(filter),
    scanSubdirs ? 1 : 0
  );
  if (result && result[2]) {
    const fileList: string[] = [];
    const view = new Deno.UnsafePointerView(
      Deno.UnsafePointer.create(BigInt(result[2]!))!
    );
    const count = result[0];

    for (let i = 0; i < count; i++) {
      const stringPtr = view.getBigUint64(i * 8);
      if (stringPtr) {
        const stringView = new Deno.UnsafePointerView(
          Deno.UnsafePointer.create(stringPtr)!
        );
        fileList.push(stringView.getCString());
      }
    }
    return fileList;
  }
  return [];
}

/**
 * Unload filepaths
 */
export function UnloadDirectoryFiles(_files: string[]): void {
  lib.symbols.UnloadDirectoryFiles(new Uint8Array(0).buffer as ArrayBuffer);
}

/**
 * Check if a file has been dropped into window
 */
export function IsFileDropped(): boolean {
  return !!lib.symbols.IsFileDropped();
}

/**
 * Load dropped filepaths
 */
export function LoadDroppedFiles(): string[] {
  const result = lib.symbols.LoadDroppedFiles();
  if (result && result[2]) {
    const fileList: string[] = [];
    const view = new Deno.UnsafePointerView(
      Deno.UnsafePointer.create(BigInt(result[2]!))!
    );
    const count = result[0];

    for (let i = 0; i < count; i++) {
      const stringPtr = view.getBigUint64(i * 8);
      if (stringPtr) {
        const stringView = new Deno.UnsafePointerView(
          Deno.UnsafePointer.create(stringPtr)!
        );
        fileList.push(stringView.getCString());
      }
    }
    return fileList;
  }
  return [];
}

/**
 * Unload dropped filepaths
 */
export function UnloadDroppedFiles(_files: string[]): void {
  lib.symbols.UnloadDroppedFiles(new Uint8Array(0).buffer as ArrayBuffer);
}

/**
 * Get file modification time (last write time)
 */
export function GetFileModTime(fileName: string): i32 {
  return Number(lib.symbols.GetFileModTime(createStringBuffer(fileName)));
}

// ============================================================================
// GESTURE
// ============================================================================

/**
 * Gesture and touch functions - 1:1 raylib bindings
 * @module
 */

// Gesture types
export const GESTURE_NONE = 0;
export const GESTURE_TAP = 1;
export const GESTURE_DOUBLETAP = 2;
export const GESTURE_HOLD = 4;
export const GESTURE_DRAG = 8;
export const GESTURE_SWIPE_RIGHT = 16;
export const GESTURE_SWIPE_LEFT = 32;
export const GESTURE_SWIPE_UP = 64;
export const GESTURE_SWIPE_DOWN = 128;
export const GESTURE_PINCH_IN = 256;
export const GESTURE_PINCH_OUT = 512;

/**
 * Enable a set of gestures using flags
 */
export function SetGesturesEnabled(flags: u32): void {
  lib.symbols.SetGesturesEnabled(flags);
}

/**
 * Check if a gesture have been detected
 */
export function IsGestureDetected(gesture: u32): boolean {
  return !!lib.symbols.IsGestureDetected(gesture);
}

/**
 * Get latest detected gesture
 */
export function GetGestureDetected(): i32 {
  return lib.symbols.GetGestureDetected();
}

/**
 * Get gesture hold time in milliseconds
 */
export function GetGestureHoldDuration(): i32 {
  return lib.symbols.GetGestureHoldDuration();
}

/**
 * Get gesture drag vector
 */
export function GetGestureDragVector(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetGestureDragVector().buffer as ArrayBuffer
  );
}

/**
 * Get gesture drag angle
 */
export function GetGestureDragAngle(): f32 {
  return lib.symbols.GetGestureDragAngle();
}

/**
 * Get gesture pinch delta
 */
export function GetGesturePinchVector(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetGesturePinchVector().buffer as ArrayBuffer
  );
}

/**
 * Get gesture pinch angle
 */
export function GetGesturePinchAngle(): i32 {
  return lib.symbols.GetGesturePinchAngle();
}

/**
 * Update camera position for selected mode
 */
export function UpdateCamera(camera: { buffer: ArrayBuffer }, mode: i32): void {
  lib.symbols.UpdateCamera(
    Deno.UnsafePointer.of(camera.buffer as ArrayBuffer),
    mode
  );
}
