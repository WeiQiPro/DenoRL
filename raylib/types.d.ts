// Global type declarations for raylib Deno
declare global {
  // Core numeric types matching raylib bindings
  type i8 = number; // char
  type i32 = number; // int
  type i64 = number; // long
  type u8 = number; // unsigned char / bool
  type u32 = number; // unsigned int
  type u64 = number; // unsigned long
  type f32 = number; // float
  type f64 = number; // double

  // Pointer and buffer types
  type pointer = Deno.PointerValue;
  type buffer = Uint8Array | string;
}

export {}; // This makes the file a module
