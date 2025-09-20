import { lib } from "./bindings/bindings.ts";
// import { lib } from "./bindings/bindings.ts";

export const littleEndian =
  new Uint8Array(new Uint32Array([0x12345678]).buffer as ArrayBuffer)[0] ===
  0x78;

export function readStringFromBuffer(buffer: ArrayBuffer): string {
  const view = new Uint8Array(buffer);
  let end = 0;
  while (end < view.length && view[end] !== 0) {
    end++;
  }
  return new TextDecoder().decode(view.slice(0, end));
}

export function createStringBuffer(str: string): ArrayBuffer {
  return new TextEncoder().encode(str + "\0").buffer;
}

export function concatVector2s(vectors: Vector2[]): ArrayBuffer {
  const buffer = new Float32Array(vectors.length * 2);
  for (let i = 0; i < vectors.length; i++) {
    buffer[i * 2] = vectors[i].x;
    buffer[i * 2 + 1] = vectors[i].y;
  }
  return buffer.buffer;
}

export function concatVector3s(vectors: Vector3[]): ArrayBuffer {
  const buffer = new Float32Array(vectors.length * 3);
  for (let i = 0; i < vectors.length; i++) {
    buffer[i * 3] = vectors[i].x;
    buffer[i * 3 + 1] = vectors[i].y;
    buffer[i * 3 + 2] = vectors[i].z;
  }
  return buffer.buffer;
}

export function concatColors(colors: Color[]): ArrayBuffer {
  const buffer = new Uint8Array(colors.length * 4);
  for (let i = 0; i < colors.length; i++) {
    buffer[i * 4] = colors[i].r;
    buffer[i * 4 + 1] = colors[i].g;
    buffer[i * 4 + 2] = colors[i].b;
    buffer[i * 4 + 3] = colors[i].a;
  }
  return buffer.buffer;
}

export function concatRectangles(rectangles: Rectangle[]): ArrayBuffer {
  const buffer = new Float32Array(rectangles.length * 4);
  for (let i = 0; i < rectangles.length; i++) {
    buffer[i * 4] = rectangles[i].x;
    buffer[i * 4 + 1] = rectangles[i].y;
    buffer[i * 4 + 2] = rectangles[i].width;
    buffer[i * 4 + 3] = rectangles[i].height;
  }
  return buffer.buffer;
}

export function concatRays(rays: Ray[]): ArrayBuffer {
  const buffer = new Float32Array(rays.length * 6);
  for (let i = 0; i < rays.length; i++) {
    buffer[i * 6] = rays[i].position.x;
    buffer[i * 6 + 1] = rays[i].position.y;
    buffer[i * 6 + 2] = rays[i].position.z;
    buffer[i * 6 + 3] = rays[i].direction.x;
    buffer[i * 6 + 4] = rays[i].direction.y;
    buffer[i * 6 + 5] = rays[i].direction.z;
  }
  return buffer.buffer;
}

export function concatBoundingBoxes(boundingBoxes: BoundingBox[]): ArrayBuffer {
  const buffer = new Float32Array(boundingBoxes.length * 6);
  for (let i = 0; i < boundingBoxes.length; i++) {
    buffer[i * 6] = boundingBoxes[i].min.x;
    buffer[i * 6 + 1] = boundingBoxes[i].min.y;
    buffer[i * 6 + 2] = boundingBoxes[i].min.z;
    buffer[i * 6 + 3] = boundingBoxes[i].max.x;
    buffer[i * 6 + 4] = boundingBoxes[i].max.y;
    buffer[i * 6 + 5] = boundingBoxes[i].max.z;
  }
  return buffer.buffer;
}

export function concatVector4s(vectors: Vector4[]): ArrayBuffer {
  const buffer = new Float32Array(vectors.length * 4);
  for (let i = 0; i < vectors.length; i++) {
    buffer[i * 4] = vectors[i].x;
    buffer[i * 4 + 1] = vectors[i].y;
    buffer[i * 4 + 2] = vectors[i].z;
    buffer[i * 4 + 3] = vectors[i].w;
  }
  return buffer.buffer;
}

export function concatQuaternions(quaternions: Quaternion[]): ArrayBuffer {
  const buffer = new Float32Array(quaternions.length * 4);
  for (let i = 0; i < quaternions.length; i++) {
    buffer[i * 4] = quaternions[i].x;
    buffer[i * 4 + 1] = quaternions[i].y;
    buffer[i * 4 + 2] = quaternions[i].z;
    buffer[i * 4 + 3] = quaternions[i].w;
  }
  return buffer.buffer;
}

export function concatMatrices(matrices: Matrix[]): ArrayBuffer {
  const buffer = new Float32Array(matrices.length * 16);
  for (let i = 0; i < matrices.length; i++) {
    buffer[i * 16] = matrices[i].m0;
    buffer[i * 16 + 1] = matrices[i].m1;
    buffer[i * 16 + 2] = matrices[i].m2;
    buffer[i * 16 + 3] = matrices[i].m3;
  }
  return buffer.buffer;
}

export function concatImages(images: Image[]): ArrayBuffer {
  const buffer = new Uint8Array(images.length * 24);
  for (let i = 0; i < images.length; i++) {
    buffer.set(new Uint8Array(images[i].buffer as ArrayBuffer), 24 * i);
  }
  return buffer.buffer;
}

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

export const LIGHTGRAY = new Color(200, 200, 200, 255); // Light Gray
export const GRAY = new Color(130, 130, 130, 255); // Gray
export const DARKGRAY = new Color(80, 80, 80, 255); // Dark Gray
export const YELLOW = new Color(253, 249, 0, 255); // Yellow
export const GOLD = new Color(255, 203, 0, 255); // Gold
export const ORANGE = new Color(255, 161, 0, 255); // Orange
export const PINK = new Color(255, 109, 194, 255); // Pink
export const RED = new Color(230, 41, 55, 255); // Red
export const DARKRED = new Color(190, 33, 55, 255); // Dark Red
export const MAROON = new Color(190, 33, 55, 255); // Maroon
export const GREEN = new Color(0, 228, 48, 255); // Green
export const LIME = new Color(0, 158, 47, 255); // Lime
export const DARKGREEN = new Color(0, 117, 44, 255); // Dark Green
export const SKYBLUE = new Color(102, 191, 255, 255); // Sky Blue
export const BLUE = new Color(0, 121, 241, 255); // Blue
export const DARKBLUE = new Color(0, 82, 172, 255); // Dark Blue
export const PURPLE = new Color(200, 122, 255, 255); // Purple
export const VIOLET = new Color(135, 60, 190, 255); // Violet
export const DARKPURPLE = new Color(112, 31, 126, 255); // Dark Purple
export const BEIGE = new Color(211, 176, 131, 255); // Beige
export const BROWN = new Color(127, 106, 79, 255); // Brown
export const DARKBROWN = new Color(76, 63, 47, 255); // Dark Brown
export const WHITE = new Color(255, 255, 255, 255); // White
export const BLACK = new Color(0, 0, 0, 255); // Black
export const BLANK = new Color(0, 0, 0, 0); // Blank (Transparent)
export const MAGENTA = new Color(255, 0, 255, 255); // Magenta
export const RAYWHITE = new Color(245, 245, 245, 255); // My own White (raylib logo)

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

export class Quaternion extends Vector4 {}

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

export class Texture {
  constructor(
    public id: u32,
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

export class Texture2D extends Texture {}

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

export class NPatchInfo {
  constructor(
    public source: Rectangle,
    public left: i32,
    public top: i32,
    public right: i32,
    public bottom: i32,
    public layout: i32
  ) {}

  static fromBuffer(buffer: ArrayBuffer): NPatchInfo {
    const view = new DataView(buffer);
    return new NPatchInfo(
      Rectangle.fromBuffer(buffer.slice(0, 16)),
      view.getInt32(16, true),
      view.getInt32(20, true),
      view.getInt32(24, true),
      view.getInt32(28, true),
      view.getInt32(32, true)
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(36);
    const view = new DataView(buffer);
    view.setFloat32(0, this.source.x, littleEndian);
    view.setFloat32(4, this.source.y, littleEndian);
    view.setFloat32(8, this.source.width, littleEndian);
    view.setFloat32(12, this.source.height, littleEndian);
    view.setInt32(16, this.left, true);
    view.setInt32(20, this.top, true);
    view.setInt32(24, this.right, true);
    view.setInt32(28, this.bottom, true);
    view.setInt32(32, this.layout, true);
    return buffer;
  }

  toString(): string {
    return `NPatchInfo(${this.source}, ${this.left}, ${this.top}, ${this.right}, ${this.bottom}, ${this.layout})`;
  }
}

export class GlyphInfo {
  constructor(
    public value: i32,
    public offsetX: i32,
    public offsetY: i32,
    public advanceX: i32,
    public image: Image
  ) {}

  static fromBuffer(buffer: ArrayBuffer): GlyphInfo {
    const view = new DataView(buffer);
    return new GlyphInfo(
      view.getInt32(0, true),
      view.getInt32(4, true),
      view.getInt32(8, true),
      view.getInt32(12, true),
      Image.fromBuffer(buffer.slice(16, 40)) // Image is 24 bytes
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(40); // 16 + 24 bytes
    const view = new DataView(buffer);
    view.setInt32(0, this.value, true);
    view.setInt32(4, this.offsetX, true);
    view.setInt32(8, this.offsetY, true);
    view.setInt32(12, this.advanceX, true);

    // Copy image buffer
    const imageBuffer = this.image.buffer;
    new Uint8Array(buffer, 16, 24).set(new Uint8Array(imageBuffer));

    return buffer;
  }

  toString(): string {
    return `GlyphInfo(${this.value}, ${this.offsetX}, ${this.offsetY}, ${this.advanceX}, ${this.image})`;
  }
}

export class Font {
  constructor(
    public baseSize: i32,
    public glyphCount: i32,
    public glyphPadding: i32,
    public texture: Texture2D,
    public recs: Rectangle[],
    public glyphs: GlyphInfo[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Font {
    const view = new DataView(buffer);
    const baseSize = view.getInt32(0, true);
    const glyphCount = view.getInt32(4, true);
    const glyphPadding = view.getInt32(8, true);
    const texture = Texture2D.fromBuffer(buffer.slice(12, 32));

    const recs: Rectangle[] = [];
    for (let i = 0; i < glyphCount; i++) {
      const offset = 32 + i * 16;
      recs.push(Rectangle.fromBuffer(buffer.slice(offset, offset + 16)));
    }

    const glyphs: GlyphInfo[] = [];
    const glyphsOffset = 32 + glyphCount * 16;
    for (let i = 0; i < glyphCount; i++) {
      const offset = glyphsOffset + i * 40;
      glyphs.push(GlyphInfo.fromBuffer(buffer.slice(offset, offset + 40)));
    }

    return new Font(baseSize, glyphCount, glyphPadding, texture, recs, glyphs);
  }

  get buffer(): ArrayBuffer {
    const recsSize = this.recs.length * 16;
    const glyphsSize = this.glyphs.length * 40;
    const buffer = new ArrayBuffer(32 + recsSize + glyphsSize);
    const view = new DataView(buffer);

    view.setInt32(0, this.baseSize, true);
    view.setInt32(4, this.glyphCount, true);
    view.setInt32(8, this.glyphPadding, true);

    const textureBuffer = this.texture.buffer;
    new Uint8Array(buffer, 12, 20).set(new Uint8Array(textureBuffer));

    for (let i = 0; i < this.recs.length; i++) {
      const offset = 32 + i * 16;
      const recBuffer = this.recs[i].buffer;
      new Uint8Array(buffer, offset, 16).set(new Uint8Array(recBuffer));
    }

    // Copy glyphs
    const glyphsOffset = 32 + recsSize;
    for (let i = 0; i < this.glyphs.length; i++) {
      const offset = glyphsOffset + i * 40;
      const glyphBuffer = this.glyphs[i].buffer;
      new Uint8Array(buffer, offset, 40).set(new Uint8Array(glyphBuffer));
    }

    return buffer;
  }

  toString(): string {
    return `Font(${this.baseSize}, ${this.glyphCount}, ${this.glyphPadding}, ${this.texture}, ${this.recs.length} recs, ${this.glyphs.length} glyphs)`;
  }
}

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

export class Camera extends Camera3D {} // Default fallback for Camera

export class Camera2D {
  offset: Vector2;
  target: Vector2;
  rotation: f32;
  zoom: f32;

  constructor(options?: {
    offset?: Vector2;
    target?: Vector2;
    rotation?: f32;
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
    //simplified version - in a real implementation you'd need to handle
    //the complex structure properly
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);
    view.setInt32(0, this.vertexCount, true);
    view.setInt32(4, this.triangleCount, true);
    view.setUint32(8, this.vaoId, true);
    return buffer;
  }
}

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

export class Transform {
  constructor(
    public translation: Vector3,
    public rotation: Quaternion,
    public scale: Vector3
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Transform {
    return new Transform(
      Vector3.fromBuffer(buffer.slice(0, 12)),
      Quaternion.fromBuffer(buffer.slice(12, 28)),
      Vector3.fromBuffer(buffer.slice(28, 40))
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(40);
    new Uint8Array(buffer, 0, 12).set(
      new Uint8Array(this.translation.buffer as ArrayBuffer)
    );
    new Uint8Array(buffer, 12, 28).set(
      new Uint8Array(this.rotation.buffer as ArrayBuffer)
    );
    new Uint8Array(buffer, 28, 12).set(
      new Uint8Array(this.scale.buffer as ArrayBuffer)
    );
    return buffer;
  }

  toString(): string {
    return `Transform(translation: ${this.translation}, rotation: ${this.rotation}, scale: ${this.scale})`;
  }
}

export class BoneInfo {
  constructor(public name: string, public parent: i32) {}

  static fromBuffer(buffer: ArrayBuffer): BoneInfo {
    const view = new DataView(buffer);
    return new BoneInfo(
      readStringFromBuffer(buffer.slice(0, 32)),
      view.getInt32(32, true)
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(32);
    const view = new DataView(buffer);
    view.setUint8(0, this.name.length);
    new Uint8Array(buffer, 1, this.name.length).set(
      new Uint8Array(new TextEncoder().encode(this.name))
    );
    view.setInt32(32, this.parent, true);
    return buffer;
  }

  toString(): string {
    return `BoneInfo(name: ${this.name}, parent: ${this.parent})`;
  }
}

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

export class RayCollision {
  constructor(
    public hit: boolean,
    public distance: f32,
    public point: Vector3,
    public normal: Vector3
  ) {}

  static fromBuffer(buffer: ArrayBuffer): RayCollision {
    const view = new DataView(buffer);
    return new RayCollision(
      !!view.getUint8(0),
      view.getFloat32(1, littleEndian),
      new Vector3(
        view.getFloat32(5, littleEndian),
        view.getFloat32(9, littleEndian),
        view.getFloat32(13, littleEndian)
      ),
      new Vector3(
        view.getFloat32(17, littleEndian),
        view.getFloat32(21, littleEndian),
        view.getFloat32(25, littleEndian)
      )
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.hit ? 1 : 0,
      this.distance,
      this.point.x,
      this.point.y,
      this.point.z,
      this.normal.x,
      this.normal.y,
      this.normal.z,
    ]).buffer;
  }

  toString(): string {
    return `RayCollision(hit: ${this.hit}, distance: ${this.distance}, point: ${this.point}, normal: ${this.normal})`;
  }
}

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

export class Wave {
  constructor(
    public frameCount: i32,
    public sampleRate: i32,
    public sampleSize: i32,
    public channels: i32,
    public data: { buffer: ArrayBuffer }
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Wave {
    const view = new DataView(buffer);
    return new Wave(
      view.getInt32(0, true), // frameCount
      view.getInt32(4, true), // sampleRate
      view.getInt32(8, true), // sampleSize
      view.getInt32(12, true), // channels
      { buffer: buffer.slice(16, buffer.byteLength) }
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setInt32(0, this.frameCount, true);
    view.setInt32(4, this.sampleRate, true);
    view.setInt32(8, this.sampleSize, true);
    view.setInt32(12, this.channels, true);
    return buffer;
  }

  toString(): string {
    return `Wave(frameCount: ${this.frameCount}, sampleRate: ${this.sampleRate}, sampleSize: ${this.sampleSize}, channels: ${this.channels}, data: ${this.data})`;
  }
}

export class rAudioBuffer {}
export class rAudioProcessor {}

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

export class VrDeviceInfo {
  constructor(
    public hResolution: i32,
    public vResolution: i32,
    public hScreenSize: f32,
    public vScreenSize: f32,
    public vCenter: f32,
    public eyeToScreenDistance: f32,
    public lensSeparationDistance: f32,
    public interpupillaryDistance: f32,
    public lensDistortionValues: f32[],
    public chromaAbCorrection: f32[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): VrDeviceInfo {
    const view = new DataView(buffer);
    return new VrDeviceInfo(
      view.getInt32(0, true),
      view.getInt32(4, true),
      view.getFloat32(8, true),
      view.getFloat32(12, true),
      view.getFloat32(16, true),
      view.getFloat32(20, true),
      view.getFloat32(24, true),
      view.getFloat32(28, true),
      [
        view.getFloat32(32, true),
        view.getFloat32(36, true),
        view.getFloat32(40, true),
        view.getFloat32(44, true),
      ],
      [
        view.getFloat32(48, true),
        view.getFloat32(52, true),
        view.getFloat32(56, true),
        view.getFloat32(60, true),
      ]
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(64);
    const view = new DataView(buffer);
    view.setInt32(0, this.hResolution, true);
    view.setInt32(4, this.vResolution, true);
    view.setFloat32(8, this.hScreenSize, true);
    view.setFloat32(12, this.vScreenSize, true);
    view.setFloat32(16, this.vCenter, true);
    view.setFloat32(20, this.eyeToScreenDistance, true);
    view.setFloat32(24, this.lensSeparationDistance, true);
    view.setFloat32(28, this.interpupillaryDistance, true);
    view.setFloat32(32, this.lensDistortionValues[0] || 0, true);
    view.setFloat32(36, this.lensDistortionValues[1] || 0, true);
    view.setFloat32(40, this.lensDistortionValues[2] || 0, true);
    view.setFloat32(44, this.lensDistortionValues[3] || 0, true);
    view.setFloat32(48, this.chromaAbCorrection[0] || 0, true);
    view.setFloat32(52, this.chromaAbCorrection[1] || 0, true);
    view.setFloat32(56, this.chromaAbCorrection[2] || 0, true);
    view.setFloat32(60, this.chromaAbCorrection[3] || 0, true);
    return buffer;
  }
}

export class VrStereoConfig {
  constructor(
    public projection: Matrix[],
    public viewOffset: Matrix[],
    public leftLensCenter: f32[],
    public rightLensCenter: f32[],
    public leftScreenCenter: f32[],
    public rightScreenCenter: f32[],
    public scale: f32[],
    public scaleIn: f32[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): VrStereoConfig {
    let offset = 0;

    // projection[2] - 2 Matrix structs (2 * 64 bytes = 128 bytes)
    const projection = [
      Matrix.fromBuffer(buffer.slice(offset, offset + 64)),
      Matrix.fromBuffer(buffer.slice(offset + 64, offset + 128)),
    ];
    offset += 128;

    // viewOffset[2] - 2 Matrix structs (2 * 64 bytes = 128 bytes)
    const viewOffset = [
      Matrix.fromBuffer(buffer.slice(offset, offset + 64)),
      Matrix.fromBuffer(buffer.slice(offset + 64, offset + 128)),
    ];
    offset += 128;

    // leftLensCenter[2] - 2 floats (8 bytes)
    const leftLensCenter = [
      new DataView(buffer).getFloat32(offset, littleEndian),
      new DataView(buffer).getFloat32(offset + 4, littleEndian),
    ];
    offset += 8;

    // rightLensCenter[2] - 2 floats (8 bytes)
    const rightLensCenter = [
      new DataView(buffer).getFloat32(offset, littleEndian),
      new DataView(buffer).getFloat32(offset + 4, littleEndian),
    ];
    offset += 8;

    // leftScreenCenter[2] - 2 floats (8 bytes)
    const leftScreenCenter = [
      new DataView(buffer).getFloat32(offset, littleEndian),
      new DataView(buffer).getFloat32(offset + 4, littleEndian),
    ];
    offset += 8;

    // rightScreenCenter[2] - 2 floats (8 bytes)
    const rightScreenCenter = [
      new DataView(buffer).getFloat32(offset, littleEndian),
      new DataView(buffer).getFloat32(offset + 4, littleEndian),
    ];
    offset += 8;

    // scale[2] - 2 floats (8 bytes)
    const scale = [
      new DataView(buffer).getFloat32(offset, littleEndian),
      new DataView(buffer).getFloat32(offset + 4, littleEndian),
    ];
    offset += 8;

    // scaleIn[2] - 2 floats (8 bytes)
    const scaleIn = [
      new DataView(buffer).getFloat32(offset, littleEndian),
      new DataView(buffer).getFloat32(offset + 4, littleEndian),
    ];

    return new VrStereoConfig(
      projection,
      viewOffset,
      leftLensCenter,
      rightLensCenter,
      leftScreenCenter,
      rightScreenCenter,
      scale,
      scaleIn
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(384); // 128 + 128 + 8 + 8 + 8 + 8 + 8 + 8 = 384 bytes
    let offset = 0;

    // Copy projection matrices
    const proj0Buffer = new Uint8Array(
      this.projection[0].buffer as ArrayBuffer
    );
    const proj1Buffer = new Uint8Array(
      this.projection[1].buffer as ArrayBuffer
    );
    new Uint8Array(buffer, offset, 64).set(proj0Buffer);
    new Uint8Array(buffer, offset + 64, 64).set(proj1Buffer);
    offset += 128;

    // Copy viewOffset matrices
    const view0Buffer = new Uint8Array(
      this.viewOffset[0].buffer as ArrayBuffer
    );
    const view1Buffer = new Uint8Array(
      this.viewOffset[1].buffer as ArrayBuffer
    );
    new Uint8Array(buffer, offset, 64).set(view0Buffer);
    new Uint8Array(buffer, offset + 64, 64).set(view1Buffer);
    offset += 128;

    // Copy float arrays
    const view = new DataView(buffer);
    view.setFloat32(offset, this.leftLensCenter[0] || 0, littleEndian);
    view.setFloat32(offset + 4, this.leftLensCenter[1] || 0, littleEndian);
    offset += 8;

    view.setFloat32(offset, this.rightLensCenter[0] || 0, littleEndian);
    view.setFloat32(offset + 4, this.rightLensCenter[1] || 0, littleEndian);
    offset += 8;

    view.setFloat32(offset, this.leftScreenCenter[0] || 0, littleEndian);
    view.setFloat32(offset + 4, this.leftScreenCenter[1] || 0, littleEndian);
    offset += 8;

    view.setFloat32(offset, this.rightScreenCenter[0] || 0, littleEndian);
    view.setFloat32(offset + 4, this.rightScreenCenter[1] || 0, littleEndian);
    offset += 8;

    view.setFloat32(offset, this.scale[0] || 0, littleEndian);
    view.setFloat32(offset + 4, this.scale[1] || 0, littleEndian);
    offset += 8;

    view.setFloat32(offset, this.scaleIn[0] || 0, littleEndian);
    view.setFloat32(offset + 4, this.scaleIn[1] || 0, littleEndian);

    return buffer;
  }

  toString(): string {
    return `VrStereoConfig(projection: [${this.projection.length} matrices], viewOffset: [${this.viewOffset.length} matrices], leftLensCenter: [${this.leftLensCenter}], rightLensCenter: [${this.rightLensCenter}], leftScreenCenter: [${this.leftScreenCenter}], rightScreenCenter: [${this.rightScreenCenter}], scale: [${this.scale}], scaleIn: [${this.scaleIn}])`;
  }
}

export class FilePathList {
  constructor(
    public capacity: u32,
    public count: u32,
    public paths: string[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): FilePathList {
    const view = new DataView(buffer);
    const capacity = view.getUint32(0, true);
    const count = view.getUint32(4, true);

    // In a real implementation, you'd dereference the paths pointer here
    // For now, we'll create an empty array as placeholder
    const paths: string[] = [];

    return new FilePathList(capacity, count, paths);
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);
    view.setUint32(0, this.capacity, true);
    view.setUint32(4, this.count, true);
    // Note: In a real implementation, you'd store the paths pointer here
    // For now, we'll store 0 as a placeholder
    view.setUint32(8, 0, true);
    return buffer;
  }

  toString(): string {
    return `FilePathList(capacity: ${this.capacity}, count: ${this.count}, paths: [${this.paths.length} items])`;
  }
}

export class AutomationEvent {
  constructor(public frame: u32, public type: u32, public params: i32[]) {}

  static fromBuffer(buffer: ArrayBuffer): AutomationEvent {
    const view = new DataView(buffer);
    return new AutomationEvent(
      view.getUint32(0, true), // frame
      view.getUint32(4, true), // type
      [
        view.getInt32(8, true), // params[0]
        view.getInt32(12, true), // params[1]
        view.getInt32(16, true), // params[2]
        view.getInt32(20, true), // params[3]
      ]
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(24);
    const view = new DataView(buffer);
    view.setUint32(0, this.frame, true);
    view.setUint32(4, this.type, true);
    view.setInt32(8, this.params[0] || 0, true);
    view.setInt32(12, this.params[1] || 0, true);
    view.setInt32(16, this.params[2] || 0, true);
    view.setInt32(20, this.params[3] || 0, true);
    return buffer;
  }

  toString(): string {
    return `AutomationEvent(frame: ${this.frame}, type: ${this.type}, params: [${this.params}])`;
  }
}

export class AutomationEventList {
  constructor(
    public capacity: u32,
    public count: u32,
    public events: AutomationEvent[]
  ) {}

  static fromBuffer(buffer: ArrayBuffer): AutomationEventList {
    const view = new DataView(buffer);
    return new AutomationEventList(
      view.getUint32(0, true), // capacity
      view.getUint32(4, true), // count
      [] // events - would need proper array handling
    );
  }

  get buffer(): ArrayBuffer {
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);
    view.setUint32(0, this.capacity, true);
    view.setUint32(4, this.count, true);
    // Note: events pointer would be stored here in real implementation
    view.setUint32(8, 0, true); // placeholder for events pointer
    return buffer;
  }

  toString(): string {
    return `AutomationEventList(capacity: ${this.capacity}, count: ${this.count}, events: [${this.events.length} items])`;
  }
}

export enum E_ConfigFlags {
  FLAG_VSYNC_HINT = 0x00000040, // Set to try enabling V-Sync on GPU
  FLAG_FULLSCREEN_MODE = 0x00000002, // Set to run program in fullscreen
  FLAG_WINDOW_RESIZABLE = 0x00000004, // Set to allow resizable window
  FLAG_WINDOW_UNDECORATED = 0x00000008, // Set to disable window decoration (frame and buttons)
  FLAG_WINDOW_HIDDEN = 0x00000080, // Set to hide window
  FLAG_WINDOW_MINIMIZED = 0x00000200, // Set to minimize window (iconify)
  FLAG_WINDOW_MAXIMIZED = 0x00000400, // Set to maximize window (expanded to monitor)
  FLAG_WINDOW_UNFOCUSED = 0x00000800, // Set to window non focused
  FLAG_WINDOW_TOPMOST = 0x00001000, // Set to window always on top
  FLAG_WINDOW_ALWAYS_RUN = 0x00000100, // Set to allow windows running while minimized
  FLAG_WINDOW_TRANSPARENT = 0x00000010, // Set to allow transparent framebuffer
  FLAG_WINDOW_HIGHDPI = 0x00002000, // Set to support HighDPI
  FLAG_WINDOW_MOUSE_PASSTHROUGH = 0x00004000, // Set to support mouse passthrough, only supported when FLAG_WINDOW_UNDECORATED
  FLAG_BORDERLESS_WINDOWED_MODE = 0x00008000, // Set to run program in borderless windowed mode
  FLAG_MSAA_4X_HINT = 0x00000020, // Set to try enabling MSAA 4X
  FLAG_INTERLACED_HINT = 0x00010000, // Set to try enabling interlaced video format (for V3D)
}

export enum E_TraceLogLevel {
  LOG_ALL = 0, // Display all logs
  LOG_TRACE, // Trace logging, intended for internal use only
  LOG_DEBUG, // Debug logging, used for internal debugging, it should be disabled on release builds
  LOG_INFO, // Info logging, used for program execution info
  LOG_WARNING, // Warning logging, used on recoverable failures
  LOG_ERROR, // Error logging, used on unrecoverable failures
  LOG_FATAL, // Fatal logging, used to abort program: exit(EXIT_FAILURE)
  LOG_NONE, // Disable logging
}

export enum E_KeyboardKey {
  KEY_NULL = 0, // Key: NULL, used for no key pressed
  // Alphanumeric keys
  KEY_APOSTROPHE = 39, // Key: '
  KEY_COMMA = 44, // Key: ,
  KEY_MINUS = 45, // Key: -
  KEY_PERIOD = 46, // Key: .
  KEY_SLASH = 47, // Key: /
  KEY_ZERO = 48, // Key: 0
  KEY_ONE = 49, // Key: 1
  KEY_TWO = 50, // Key: 2
  KEY_THREE = 51, // Key: 3
  KEY_FOUR = 52, // Key: 4
  KEY_FIVE = 53, // Key: 5
  KEY_SIX = 54, // Key: 6
  KEY_SEVEN = 55, // Key: 7
  KEY_EIGHT = 56, // Key: 8
  KEY_NINE = 57, // Key: 9
  KEY_SEMICOLON = 59, // Key: ;
  KEY_EQUAL = 61, // Key: =
  KEY_A = 65, // Key: A | a
  KEY_B = 66, // Key: B | b
  KEY_C = 67, // Key: C | c
  KEY_D = 68, // Key: D | d
  KEY_E = 69, // Key: E | e
  KEY_F = 70, // Key: F | f
  KEY_G = 71, // Key: G | g
  KEY_H = 72, // Key: H | h
  KEY_I = 73, // Key: I | i
  KEY_J = 74, // Key: J | j
  KEY_K = 75, // Key: K | k
  KEY_L = 76, // Key: L | l
  KEY_M = 77, // Key: M | m
  KEY_N = 78, // Key: N | n
  KEY_O = 79, // Key: O | o
  KEY_P = 80, // Key: P | p
  KEY_Q = 81, // Key: Q | q
  KEY_R = 82, // Key: R | r
  KEY_S = 83, // Key: S | s
  KEY_T = 84, // Key: T | t
  KEY_U = 85, // Key: U | u
  KEY_V = 86, // Key: V | v
  KEY_W = 87, // Key: W | w
  KEY_X = 88, // Key: X | x
  KEY_Y = 89, // Key: Y | y
  KEY_Z = 90, // Key: Z | z
  KEY_LEFT_BRACKET = 91, // Key: [
  KEY_BACKSLASH = 92, // Key: '\'
  KEY_RIGHT_BRACKET = 93, // Key: ]
  KEY_GRAVE = 96, // Key: `
  // Function keys
  KEY_SPACE = 32, // Key: Space
  KEY_ESCAPE = 256, // Key: Esc
  KEY_ENTER = 257, // Key: Enter
  KEY_TAB = 258, // Key: Tab
  KEY_BACKSPACE = 259, // Key: Backspace
  KEY_INSERT = 260, // Key: Ins
  KEY_DELETE = 261, // Key: Del
  KEY_RIGHT = 262, // Key: Cursor right
  KEY_LEFT = 263, // Key: Cursor left
  KEY_DOWN = 264, // Key: Cursor down
  KEY_UP = 265, // Key: Cursor up
  KEY_PAGE_UP = 266, // Key: Page up
  KEY_PAGE_DOWN = 267, // Key: Page down
  KEY_HOME = 268, // Key: Home
  KEY_END = 269, // Key: End
  KEY_CAPS_LOCK = 280, // Key: Caps lock
  KEY_SCROLL_LOCK = 281, // Key: Scroll down
  KEY_NUM_LOCK = 282, // Key: Num lock
  KEY_PRINT_SCREEN = 283, // Key: Print screen
  KEY_PAUSE = 284, // Key: Pause
  KEY_F1 = 290, // Key: F1
  KEY_F2 = 291, // Key: F2
  KEY_F3 = 292, // Key: F3
  KEY_F4 = 293, // Key: F4
  KEY_F5 = 294, // Key: F5
  KEY_F6 = 295, // Key: F6
  KEY_F7 = 296, // Key: F7
  KEY_F8 = 297, // Key: F8
  KEY_F9 = 298, // Key: F9
  KEY_F10 = 299, // Key: F10
  KEY_F11 = 300, // Key: F11
  KEY_F12 = 301, // Key: F12
  KEY_LEFT_SHIFT = 340, // Key: Shift left
  KEY_LEFT_CONTROL = 341, // Key: Control left
  KEY_LEFT_ALT = 342, // Key: Alt left
  KEY_LEFT_SUPER = 343, // Key: Super left
  KEY_RIGHT_SHIFT = 344, // Key: Shift right
  KEY_RIGHT_CONTROL = 345, // Key: Control right
  KEY_RIGHT_ALT = 346, // Key: Alt right
  KEY_RIGHT_SUPER = 347, // Key: Super right
  KEY_KB_MENU = 348, // Key: KB menu
  // Keypad keys
  KEY_KP_0 = 320, // Key: Keypad 0
  KEY_KP_1 = 321, // Key: Keypad 1
  KEY_KP_2 = 322, // Key: Keypad 2
  KEY_KP_3 = 323, // Key: Keypad 3
  KEY_KP_4 = 324, // Key: Keypad 4
  KEY_KP_5 = 325, // Key: Keypad 5
  KEY_KP_6 = 326, // Key: Keypad 6
  KEY_KP_7 = 327, // Key: Keypad 7
  KEY_KP_8 = 328, // Key: Keypad 8
  KEY_KP_9 = 329, // Key: Keypad 9
  KEY_KP_DECIMAL = 330, // Key: Keypad .
  KEY_KP_DIVIDE = 331, // Key: Keypad /
  KEY_KP_MULTIPLY = 332, // Key: Keypad *
  KEY_KP_SUBTRACT = 333, // Key: Keypad -
  KEY_KP_ADD = 334, // Key: Keypad +
  KEY_KP_ENTER = 335, // Key: Keypad Enter
  KEY_KP_EQUAL = 336, // Key: Keypad =
  // Android key buttons
  KEY_BACK = 4, // Key: Android back button
  KEY_MENU = 82, // Key: Android menu button
  KEY_VOLUME_UP = 24, // Key: Android volume up button
  KEY_VOLUME_DOWN = 25, // Key: Android volume down button
}

export enum E_MouseButton {
  MOUSE_BUTTON_LEFT = 0, // Mouse button left
  MOUSE_BUTTON_RIGHT = 1, // Mouse button right
  MOUSE_BUTTON_MIDDLE = 2, // Mouse button middle (pressed wheel)
  MOUSE_BUTTON_SIDE = 3, // Mouse button side (advanced mouse device)
  MOUSE_BUTTON_EXTRA = 4, // Mouse button extra (advanced mouse device)
  MOUSE_BUTTON_FORWARD = 5, // Mouse button forward (advanced mouse device)
  MOUSE_BUTTON_BACK = 6, // Mouse button back (advanced mouse device)
}

export enum E_MouseCursor {
  MOUSE_CURSOR_DEFAULT = 0, // Default pointer shape
  MOUSE_CURSOR_ARROW = 1, // Arrow shape
  MOUSE_CURSOR_IBEAM = 2, // Text writing cursor shape
  MOUSE_CURSOR_CROSSHAIR = 3, // Cross shape
  MOUSE_CURSOR_POINTING_HAND = 4, // Pointing hand cursor
  MOUSE_CURSOR_RESIZE_EW = 5, // Horizontal resize/move arrow shape
  MOUSE_CURSOR_RESIZE_NS = 6, // Vertical resize/move arrow shape
  MOUSE_CURSOR_RESIZE_NWSE = 7, // Top-left to bottom-right diagonal resize/move arrow shape
  MOUSE_CURSOR_RESIZE_NESW = 8, // The top-right to bottom-left diagonal resize/move arrow shape
  MOUSE_CURSOR_RESIZE_ALL = 9, // The omnidirectional resize/move cursor shape
  MOUSE_CURSOR_NOT_ALLOWED = 10, // The operation-not-allowed shape
}

export enum E_GamepadButton {
  GAMEPAD_BUTTON_UNKNOWN = 0, // Unknown button, just for error checking
  GAMEPAD_BUTTON_LEFT_FACE_UP, // Gamepad left DPAD up button
  GAMEPAD_BUTTON_LEFT_FACE_RIGHT, // Gamepad left DPAD right button
  GAMEPAD_BUTTON_LEFT_FACE_DOWN, // Gamepad left DPAD down button
  GAMEPAD_BUTTON_LEFT_FACE_LEFT, // Gamepad left DPAD left button
  GAMEPAD_BUTTON_RIGHT_FACE_UP, // Gamepad right button up (i.e. PS3: Triangle, Xbox: Y)
  GAMEPAD_BUTTON_RIGHT_FACE_RIGHT, // Gamepad right button right (i.e. PS3: Square, Xbox: X)
  GAMEPAD_BUTTON_RIGHT_FACE_DOWN, // Gamepad right button down (i.e. PS3: Cross, Xbox: A)
  GAMEPAD_BUTTON_RIGHT_FACE_LEFT, // Gamepad right button left (i.e. PS3: Circle, Xbox: B)
  GAMEPAD_BUTTON_LEFT_TRIGGER_1, // Gamepad top/back trigger left (first), it could be a trailing button
  GAMEPAD_BUTTON_LEFT_TRIGGER_2, // Gamepad top/back trigger left (second), it could be a trailing button
  GAMEPAD_BUTTON_RIGHT_TRIGGER_1, // Gamepad top/back trigger right (one), it could be a trailing button
  GAMEPAD_BUTTON_RIGHT_TRIGGER_2, // Gamepad top/back trigger right (second), it could be a trailing button
  GAMEPAD_BUTTON_MIDDLE_LEFT, // Gamepad center buttons, left one (i.e. PS3: Select)
  GAMEPAD_BUTTON_MIDDLE, // Gamepad center buttons, middle one (i.e. PS3: PS, Xbox: XBOX)
  GAMEPAD_BUTTON_MIDDLE_RIGHT, // Gamepad center buttons, right one (i.e. PS3: Start)
  GAMEPAD_BUTTON_LEFT_THUMB, // Gamepad joystick pressed button left
  GAMEPAD_BUTTON_RIGHT_THUMB, // Gamepad joystick pressed button right
}

export enum E_GamepadAxis {
  GAMEPAD_AXIS_LEFT_X = 0, // Gamepad left stick X axis
  GAMEPAD_AXIS_LEFT_Y = 1, // Gamepad left stick Y axis
  GAMEPAD_AXIS_RIGHT_X = 2, // Gamepad right stick X axis
  GAMEPAD_AXIS_RIGHT_Y = 3, // Gamepad right stick Y axis
  GAMEPAD_AXIS_LEFT_TRIGGER = 4, // Gamepad back trigger left, pressure level: [1..-1]
  GAMEPAD_AXIS_RIGHT_TRIGGER = 5, // Gamepad back trigger right, pressure level: [1..-1]
}

export enum E_MaterialMapIndex {
  MATERIAL_MAP_ALBEDO = 0, // Albedo material (same as: MATERIAL_MAP_DIFFUSE)
  MATERIAL_MAP_METALNESS, // Metalness material (same as: MATERIAL_MAP_SPECULAR)
  MATERIAL_MAP_NORMAL, // Normal material
  MATERIAL_MAP_ROUGHNESS, // Roughness material
  MATERIAL_MAP_OCCLUSION, // Ambient occlusion material
  MATERIAL_MAP_EMISSION, // Emission material
  MATERIAL_MAP_HEIGHT, // Heightmap material
  MATERIAL_MAP_CUBEMAP, // Cubemap material (NOTE: Uses GL_TEXTURE_CUBE_MAP)
  MATERIAL_MAP_IRRADIANCE, // Irradiance material (NOTE: Uses GL_TEXTURE_CUBE_MAP)
  MATERIAL_MAP_PREFILTER, // Prefilter material (NOTE: Uses GL_TEXTURE_CUBE_MAP)
  MATERIAL_MAP_BRDF, // Brdf material
}

export enum E_ShaderLocationIndex {
  SHADER_LOC_VERTEX_POSITION = 0, // Shader location: vertex attribute: position
  SHADER_LOC_VERTEX_TEXCOORD01, // Shader location: vertex attribute: texcoord01
  SHADER_LOC_VERTEX_TEXCOORD02, // Shader location: vertex attribute: texcoord02
  SHADER_LOC_VERTEX_NORMAL, // Shader location: vertex attribute: normal
  SHADER_LOC_VERTEX_TANGENT, // Shader location: vertex attribute: tangent
  SHADER_LOC_VERTEX_COLOR, // Shader location: vertex attribute: color
  SHADER_LOC_MATRIX_MVP, // Shader location: matrix uniform: model-view-projection
  SHADER_LOC_MATRIX_VIEW, // Shader location: matrix uniform: view (camera transform)
  SHADER_LOC_MATRIX_PROJECTION, // Shader location: matrix uniform: projection
  SHADER_LOC_MATRIX_MODEL, // Shader location: matrix uniform: model (transform)
  SHADER_LOC_MATRIX_NORMAL, // Shader location: matrix uniform: normal
  SHADER_LOC_VECTOR_VIEW, // Shader location: vector uniform: view
  SHADER_LOC_COLOR_DIFFUSE, // Shader location: vector uniform: diffuse color
  SHADER_LOC_COLOR_SPECULAR, // Shader location: vector uniform: specular color
  SHADER_LOC_COLOR_AMBIENT, // Shader location: vector uniform: ambient color
  SHADER_LOC_MAP_ALBEDO, // Shader location: sampler2d texture: albedo (same as: SHADER_LOC_MAP_DIFFUSE)
  SHADER_LOC_MAP_METALNESS, // Shader location: sampler2d texture: metalness (same as: SHADER_LOC_MAP_SPECULAR)
  SHADER_LOC_MAP_NORMAL, // Shader location: sampler2d texture: normal
  SHADER_LOC_MAP_ROUGHNESS, // Shader location: sampler2d texture: roughness
  SHADER_LOC_MAP_OCCLUSION, // Shader location: sampler2d texture: occlusion
  SHADER_LOC_MAP_EMISSION, // Shader location: sampler2d texture: emission
  SHADER_LOC_MAP_HEIGHT, // Shader location: sampler2d texture: height
  SHADER_LOC_MAP_CUBEMAP, // Shader location: samplerCube texture: cubemap
  SHADER_LOC_MAP_IRRADIANCE, // Shader location: samplerCube texture: irradiance
  SHADER_LOC_MAP_PREFILTER, // Shader location: samplerCube texture: prefilter
  SHADER_LOC_MAP_BRDF, // Shader location: sampler2d texture: brdf
}

export enum E_ShaderUniformDataType {
  SHADER_UNIFORM_FLOAT = 0, // Shader uniform type: float
  SHADER_UNIFORM_VEC2, // Shader uniform type: vec2 (2 float)
  SHADER_UNIFORM_VEC3, // Shader uniform type: vec3 (3 float)
  SHADER_UNIFORM_VEC4, // Shader uniform type: vec4 (4 float)
  SHADER_UNIFORM_INT, // Shader uniform type: int
  SHADER_UNIFORM_IVEC2, // Shader uniform type: ivec2 (2 int)
  SHADER_UNIFORM_IVEC3, // Shader uniform type: ivec3 (3 int)
  SHADER_UNIFORM_IVEC4, // Shader uniform type: ivec4 (4 int)
  SHADER_UNIFORM_SAMPLER2D, // Shader uniform type: sampler2d
}

// Shader attribute data types
export enum E_ShaderAttributeDataType {
  SHADER_ATTRIB_FLOAT = 0, // Shader attribute type: float
  SHADER_ATTRIB_VEC2, // Shader attribute type: vec2 (2 float)
  SHADER_ATTRIB_VEC3, // Shader attribute type: vec3 (3 float)
  SHADER_ATTRIB_VEC4, // Shader attribute type: vec4 (4 float)
}

// Pixel formats
// NOTE: Support depends on OpenGL version and platform
export enum E_PixelFormat {
  PIXELFORMAT_UNCOMPRESSED_GRAYSCALE = 1, // 8 bit per pixel (no alpha)
  PIXELFORMAT_UNCOMPRESSED_GRAY_ALPHA, // 8*2 bpp (2 channels)
  PIXELFORMAT_UNCOMPRESSED_R5G6B5, // 16 bpp
  PIXELFORMAT_UNCOMPRESSED_R8G8B8, // 24 bpp
  PIXELFORMAT_UNCOMPRESSED_R5G5B5A1, // 16 bpp (1 bit alpha)
  PIXELFORMAT_UNCOMPRESSED_R4G4B4A4, // 16 bpp (4 bit alpha)
  PIXELFORMAT_UNCOMPRESSED_R8G8B8A8, // 32 bpp
  PIXELFORMAT_UNCOMPRESSED_R32, // 32 bpp (1 channel - float)
  PIXELFORMAT_UNCOMPRESSED_R32G32B32, // 32*3 bpp (3 channels - float)
  PIXELFORMAT_UNCOMPRESSED_R32G32B32A32, // 32*4 bpp (4 channels - float)
  PIXELFORMAT_UNCOMPRESSED_R16, // 16 bpp (1 channel - half float)
  PIXELFORMAT_UNCOMPRESSED_R16G16B16, // 16*3 bpp (3 channels - half float)
  PIXELFORMAT_UNCOMPRESSED_R16G16B16A16, // 16*4 bpp (4 channels - half float)
  PIXELFORMAT_COMPRESSED_DXT1_RGB, // 4 bpp (no alpha)
  PIXELFORMAT_COMPRESSED_DXT1_RGBA, // 4 bpp (1 bit alpha)
  PIXELFORMAT_COMPRESSED_DXT3_RGBA, // 8 bpp
  PIXELFORMAT_COMPRESSED_DXT5_RGBA, // 8 bpp
  PIXELFORMAT_COMPRESSED_ETC1_RGB, // 4 bpp
  PIXELFORMAT_COMPRESSED_ETC2_RGB, // 4 bpp
  PIXELFORMAT_COMPRESSED_ETC2_EAC_RGBA, // 8 bpp
  PIXELFORMAT_COMPRESSED_PVRT_RGB, // 4 bpp
  PIXELFORMAT_COMPRESSED_PVRT_RGBA, // 4 bpp
  PIXELFORMAT_COMPRESSED_ASTC_4x4_RGBA, // 8 bpp
  PIXELFORMAT_COMPRESSED_ASTC_8x8_RGBA, // 2 bpp
}

// Texture parameters: filter mode
// NOTE 1: Filtering considers mipmaps if available in the texture
// NOTE 2: Filter is accordingly set for minification and magnification
export enum E_TextureFilter {
  TEXTURE_FILTER_POINT = 0, // No filter, just pixel approximation
  TEXTURE_FILTER_BILINEAR, // Linear filtering
  TEXTURE_FILTER_TRILINEAR, // Trilinear filtering (linear with mipmaps)
  TEXTURE_FILTER_ANISOTROPIC_4X, // Anisotropic filtering 4x
  TEXTURE_FILTER_ANISOTROPIC_8X, // Anisotropic filtering 8x
  TEXTURE_FILTER_ANISOTROPIC_16X, // Anisotropic filtering 16x
}

// Texture parameters: wrap mode
export enum E_TextureWrap {
  TEXTURE_WRAP_REPEAT = 0, // Repeats texture in tiled mode
  TEXTURE_WRAP_CLAMP, // Clamps texture to edge pixel in tiled mode
  TEXTURE_WRAP_MIRROR_REPEAT, // Mirrors and repeats the texture in tiled mode
  TEXTURE_WRAP_MIRROR_CLAMP, // Mirrors and clamps to border the texture in tiled mode
}

// Cubemap layouts
export enum E_CubemapLayout {
  CUBEMAP_LAYOUT_AUTO_DETECT = 0, // Automatically detect layout type
  CUBEMAP_LAYOUT_LINE_VERTICAL, // Layout is defined by a vertical line with faces
  CUBEMAP_LAYOUT_LINE_HORIZONTAL, // Layout is defined by a horizontal line with faces
  CUBEMAP_LAYOUT_CROSS_THREE_BY_FOUR, // Layout is defined by a 3x4 cross with cubemap faces
  CUBEMAP_LAYOUT_CROSS_FOUR_BY_THREE, // Layout is defined by a 4x3 cross with cubemap faces
  CUBEMAP_LAYOUT_PANORAMA, // Layout is defined by a panorama image (equirrectangular map)
}

// Font type, defines generation method
export enum E_FontType {
  FONT_DEFAULT = 0, // Default font generation, anti-aliased
  FONT_BITMAP, // Bitmap font generation, no anti-aliasing
  FONT_SDF, // SDF font generation, requires external shader
}

// Color blending modes (pre-defined)
export enum E_BlendMode {
  BLEND_ALPHA = 0, // Blend textures considering alpha (default)
  BLEND_ADDITIVE, // Blend textures adding colors
  BLEND_MULTIPLIED, // Blend textures multiplying colors
  BLEND_ADD_COLORS, // Blend textures adding colors (alternative)
  BLEND_SUBTRACT_COLORS, // Blend textures subtracting colors (alternative)
  BLEND_ALPHA_PREMULTIPLY, // Blend premultiplied textures considering alpha
  BLEND_CUSTOM, // Blend textures using custom src/dst factors (use rlSetBlendFactors())
  BLEND_CUSTOM_SEPARATE, // Blend textures using custom rgb/alpha separate src/dst factors (use rlSetBlendFactorsSeparate())
}

// Gesture
// NOTE: Provided as bit-wise flags to enable only desired gestures
export enum E_Gesture {
  GESTURE_NONE = 0, // No gesture
  GESTURE_TAP = 1, // Tap gesture
  GESTURE_DOUBLETAP = 2, // Double tap gesture
  GESTURE_HOLD = 4, // Hold gesture
  GESTURE_DRAG = 8, // Drag gesture
  GESTURE_SWIPE_RIGHT = 16, // Swipe right gesture
  GESTURE_SWIPE_LEFT = 32, // Swipe left gesture
  GESTURE_SWIPE_UP = 64, // Swipe up gesture
  GESTURE_SWIPE_DOWN = 128, // Swipe down gesture
  GESTURE_PINCH_IN = 256, // Pinch in gesture
  GESTURE_PINCH_OUT = 512, // Pinch out gesture
}

// Camera system modes
export enum E_CameraMode {
  CAMERA_CUSTOM = 0, // Custom camera
  CAMERA_FREE, // Free camera
  CAMERA_ORBITAL, // Orbital camera
  CAMERA_FIRST_PERSON, // First person camera
  CAMERA_THIRD_PERSON, // Third person camera
}

// Camera projection
export enum E_CameraProjection {
  CAMERA_PERSPECTIVE = 0, // Perspective projection
  CAMERA_ORTHOGRAPHIC, // Orthographic projection
}

// N-patch layout
export enum E_NPatchLayout {
  NPATCH_NINE_PATCH = 0, // Npatch layout: 3x3 tiles
  NPATCH_THREE_PATCH_VERTICAL, // Npatch layout: 1x3 tiles
  NPATCH_THREE_PATCH_HORIZONTAL, // Npatch layout: 3x1 tiles
}

export const ConfigFlags = E_ConfigFlags;
export const TraceLogLevel = E_TraceLogLevel;
export const KeyboardKey = E_KeyboardKey;
export const MouseButton = E_MouseButton;
export const MouseCursor = E_MouseCursor;
export const GamepadButton = E_GamepadButton;
export const GamepadAxis = E_GamepadAxis;
export const MaterialMapIndex = E_MaterialMapIndex;
export const ShaderLocationIndex = E_ShaderLocationIndex;
export const ShaderUniformDataType = E_ShaderUniformDataType;
export const ShaderAttributeDataType = E_ShaderAttributeDataType;
export const PixelFormat = E_PixelFormat;
export const TextureFilter = E_TextureFilter;
export const TextureWrap = E_TextureWrap;
export const CubemapLayout = E_CubemapLayout;
export const FontType = E_FontType;
export const BlendMode = E_BlendMode;
export const Gesture = E_Gesture;
export const CameraMode = E_CameraMode;
export const CameraProjection = E_CameraProjection;
export const NPatchLayout = E_NPatchLayout;

export function InitWindow(width: i32, height: i32, title: string): void {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.InitWindow(width, height, createStringBuffer(title));
}
export function CloseWindow(): void {
  lib.symbols.CloseWindow();
}
export function WindowShouldClose(): boolean {
  return !!lib.symbols.WindowShouldClose();
}
export function IsWindowReady(): boolean {
  return !!lib.symbols.IsWindowReady();
}
export function IsWindowFullscreen(): boolean {
  return !!lib.symbols.IsWindowFullscreen();
}
export function IsWindowHidden(): boolean {
  return !!lib.symbols.IsWindowHidden();
}
export function IsWindowMinimized(): boolean {
  return !!lib.symbols.IsWindowMinimized();
}
export function IsWindowMaximized(): boolean {
  return !!lib.symbols.IsWindowMaximized();
}
export function IsWindowFocused(): boolean {
  return !!lib.symbols.IsWindowFocused();
}
export function IsWindowResized(): boolean {
  return !!lib.symbols.IsWindowResized();
}
export function IsWindowState(flag: E_ConfigFlags): boolean {
  return !!lib.symbols.IsWindowState(flag);
}
export function SetWindowState(flags: E_ConfigFlags): void {
  lib.symbols.SetWindowState(flags);
}
export function ClearWindowState(flags: E_ConfigFlags): void {
  lib.symbols.ClearWindowState(flags);
}
export function ToggleFullscreen(): void {
  lib.symbols.ToggleFullscreen();
}
export function ToggleBorderlessWindowed(): void {
  lib.symbols.ToggleBorderlessWindowed();
}
export function MaximizeWindow(): void {
  lib.symbols.MaximizeWindow();
}
export function MinimizeWindow(): void {
  lib.symbols.MinimizeWindow();
}
export function RestoreWindow(): void {
  lib.symbols.RestoreWindow();
}
export function SetWindowIcon(image: Image): void {
  lib.symbols.SetWindowIcon(image.buffer as BufferSource);
}
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
export function SetWindowTitle(title: string): void {
  lib.symbols.SetWindowTitle(createStringBuffer(title));
}
export function SetWindowPosition(x: i32, y: i32): void {
  x = (x | 0) as i32;
  y = (y | 0) as i32;
  lib.symbols.SetWindowPosition(x, y);
}
export function SetWindowMonitor(monitor: i32): void {
  lib.symbols.SetWindowMonitor(monitor);
}
export function SetWindowMinSize(width: i32, height: i32): void {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.SetWindowMinSize(width, height);
}
export function SetWindowMaxSize(width: i32, height: i32): void {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.SetWindowMaxSize(width, height);
}
export function SetWindowSize(width: i32, height: i32): void {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.SetWindowSize(width, height);
}
export function SetWindowOpacity(opacity: f32): void {
  lib.symbols.SetWindowOpacity(opacity);
}
export function SetWindowFocused(): void {
  lib.symbols.SetWindowFocused();
}
export function GetWindowHandle(): Deno.PointerValue {
  return lib.symbols.GetWindowHandle();
}
export function GetScreenWidth(): i32 {
  return lib.symbols.GetScreenWidth();
}
export function GetScreenHeight(): i32 {
  return lib.symbols.GetScreenHeight();
}
export function GetRenderWidth(): i32 {
  return lib.symbols.GetRenderWidth();
}
export function GetRenderHeight(): i32 {
  return lib.symbols.GetRenderHeight();
}
export function GetMonitorCount(): i32 {
  return lib.symbols.GetMonitorCount();
}
export function GetCurrentMonitor(): i32 {
  return lib.symbols.GetCurrentMonitor();
}
export function GetMonitorPosition(monitor: i32): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetMonitorPosition(monitor).buffer as ArrayBuffer
  );
}
export function GetMonitorWidth(monitor: i32): i32 {
  monitor = (monitor | 0) as i32;
  return lib.symbols.GetMonitorWidth(monitor);
}
export function GetMonitorHeight(monitor: i32): i32 {
  monitor = (monitor | 0) as i32;
  return lib.symbols.GetMonitorHeight(monitor);
}
export function GetMonitorPhysicalWidth(monitor: i32): i32 {
  monitor = (monitor | 0) as i32;
  return lib.symbols.GetMonitorPhysicalWidth(monitor);
}
export function GetMonitorPhysicalHeight(monitor: i32): i32 {
  monitor = (monitor | 0) as i32;
  return lib.symbols.GetMonitorPhysicalHeight(monitor);
}
export function GetMonitorRefreshRate(monitor: i32): i32 {
  monitor = (monitor | 0) as i32;
  return lib.symbols.GetMonitorRefreshRate(monitor);
}
export function GetWindowPosition(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWindowPosition().buffer as ArrayBuffer
  );
}
export function GetWindowScaleDPI(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetWindowScaleDPI().buffer as ArrayBuffer
  );
}
export function GetMonitorName(monitor: i32): string {
  monitor = (monitor | 0) as i32;
  const ptr = lib.symbols.GetMonitorName(monitor);
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}
export function SetClipboardText(text: string): void {
  lib.symbols.SetClipboardText(createStringBuffer(text));
}
export function GetClipboardText(): string {
  const ptr = lib.symbols.GetClipboardText();
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}
export function EnableEventWaiting(): void {
  lib.symbols.EnableEventWaiting();
}
export function DisableEventWaiting(): void {
  lib.symbols.DisableEventWaiting();
}

export function ShowCursor(): void {
  lib.symbols.ShowCursor();
}
export function HideCursor(): void {
  lib.symbols.HideCursor();
}
export function IsCursorHidden(): boolean {
  return !!lib.symbols.IsCursorHidden();
}
export function EnableCursor(): void {
  lib.symbols.EnableCursor();
}
export function DisableCursor(): void {
  lib.symbols.DisableCursor();
}
export function IsCursorOnScreen(): boolean {
  return !!lib.symbols.IsCursorOnScreen();
}

export function ClearBackground(color: Color): void {
  lib.symbols.ClearBackground(color.buffer as ArrayBuffer);
}
export function BeginDrawing(): void {
  lib.symbols.BeginDrawing();
}
export function EndDrawing(): void {
  lib.symbols.EndDrawing();
}
export function BeginMode2D(camera: Camera2D): void {
  lib.symbols.BeginMode2D(camera.buffer as ArrayBuffer);
}
export function EndMode2D(): void {
  lib.symbols.EndMode2D();
}
export function BeginMode3D(camera: Camera3D): void {
  lib.symbols.BeginMode3D(camera.buffer as ArrayBuffer);
}
export function EndMode3D(): void {
  lib.symbols.EndMode3D();
}
export function BeginTextureMode(target: RenderTexture2D): void {
  lib.symbols.BeginTextureMode(target.buffer as ArrayBuffer);
}
export function EndTextureMode(): void {
  lib.symbols.EndTextureMode();
}
export function BeginShaderMode(shader: Shader): void {
  lib.symbols.BeginShaderMode(shader.buffer as ArrayBuffer);
}
export function EndShaderMode(): void {
  lib.symbols.EndShaderMode();
}
export function BeginBlendMode(mode: E_BlendMode): void {
  lib.symbols.BeginBlendMode(mode);
}
export function EndBlendMode(): void {
  lib.symbols.EndBlendMode();
}
export function BeginScissorMode(
  x: i32,
  y: i32,
  width: i32,
  height: i32
): void {
  x = (x | 0) as i32;
  y = (y | 0) as i32;
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.BeginScissorMode(x, y, width, height);
}
export function EndScissorMode(): void {
  lib.symbols.EndScissorMode();
}
export function BeginVrStereoMode(config: VrStereoConfig): void {
  lib.symbols.BeginVrStereoMode(config.buffer as ArrayBuffer);
}
export function EndVrStereoMode(): void {
  lib.symbols.EndVrStereoMode();
}

export function LoadVrStereoConfig(device: VrDeviceInfo): VrStereoConfig {
  const buffer = lib.symbols.LoadVrStereoConfig(device.buffer as ArrayBuffer);
  return VrStereoConfig.fromBuffer(buffer.buffer);
}
export function UnloadVrStereoConfig(config: VrStereoConfig): void {
  lib.symbols.UnloadVrStereoConfig(config.buffer as ArrayBuffer);
}

export function LoadShader(vsFileName: string, fsFileName: string): Shader {
  const buffer = lib.symbols.LoadShader(
    createStringBuffer(vsFileName),
    createStringBuffer(fsFileName)
  );
  return Shader.fromBuffer(buffer.buffer);
}
export function LoadShaderFromMemory(vsCode: string, fsCode: string): Shader {
  const buffer = lib.symbols.LoadShaderFromMemory(
    createStringBuffer(vsCode),
    createStringBuffer(fsCode)
  );
  return Shader.fromBuffer(buffer.buffer);
}
export function IsShaderReady(shader: Shader): boolean {
  return !!lib.symbols.IsShaderReady(shader.buffer as ArrayBuffer);
}

export function GetShaderLocation(shader: Shader, uniformName: string): i32 {
  return lib.symbols.GetShaderLocation(
    shader.buffer as ArrayBuffer,
    createStringBuffer(uniformName)
  );
}
export function GetShaderLocationAttrib(
  shader: Shader,
  attribName: string
): i32 {
  return lib.symbols.GetShaderLocationAttrib(
    shader.buffer as ArrayBuffer,
    createStringBuffer(attribName)
  );
}
export function SetShaderValue(
  shader: Shader,
  locIndex: i32,
  value: ArrayBuffer,
  uniformType: i32
): void {
  locIndex = (locIndex | 0) as i32;
  uniformType = (uniformType | 0) as i32;
  lib.symbols.SetShaderValue(
    shader.buffer as ArrayBuffer,
    locIndex,
    Deno.UnsafePointer.of(value as ArrayBuffer),
    uniformType
  );
}
export function SetShaderValueV(
  shader: Shader,
  locIndex: i32,
  value: ArrayBuffer,
  uniformType: i32,
  count: i32
): void {
  locIndex = (locIndex | 0) as i32;
  uniformType = (uniformType | 0) as i32;
  count = (count | 0) as i32;
  lib.symbols.SetShaderValueV(
    shader.buffer as ArrayBuffer,
    locIndex,
    Deno.UnsafePointer.of(value as ArrayBuffer),
    uniformType,
    count
  );
}
export function SetShaderValueMatrix(
  shader: Shader,
  locIndex: i32,
  mat: Matrix
): void {
  locIndex = (locIndex | 0) as i32;
  lib.symbols.SetShaderValueMatrix(
    shader.buffer as ArrayBuffer,
    locIndex,
    mat.buffer as ArrayBuffer
  );
}
export function SetShaderValueTexture(
  shader: Shader,
  locIndex: i32,
  texture: Texture2D
): void {
  locIndex = (locIndex | 0) as i32;
  lib.symbols.SetShaderValueTexture(
    shader.buffer as ArrayBuffer,
    locIndex,
    texture.buffer as ArrayBuffer
  );
}
export function UnloadShader(shader: Shader): void {
  lib.symbols.UnloadShader(shader.buffer as ArrayBuffer);
}

export function GetMouseRay(mousePosition: Vector2, camera: Camera): Ray {
  const buffer = lib.symbols.GetMouseRay(
    mousePosition.buffer as ArrayBuffer,
    camera.buffer as ArrayBuffer
  );
  return Ray.fromBuffer(buffer.buffer);
}
export function GetCameraMatrix(camera: Camera): Matrix {
  const buffer = lib.symbols.GetCameraMatrix(camera.buffer as ArrayBuffer);
  return Matrix.fromBuffer(buffer.buffer);
}
export function GetCameraMatrix2D(camera: Camera2D): Matrix {
  const buffer = lib.symbols.GetCameraMatrix2D(camera.buffer as ArrayBuffer);
  return Matrix.fromBuffer(buffer.buffer);
}
export function GetWorldToScreen(position: Vector3, camera: Camera): Vector2 {
  const buffer = lib.symbols.GetWorldToScreen(
    position.buffer as ArrayBuffer,
    camera.buffer as ArrayBuffer
  );
  return Vector2.fromBuffer(buffer.buffer);
}
export function GetScreenToWorld2D(
  position: Vector2,
  camera: Camera2D
): Vector2 {
  const buffer = lib.symbols.GetScreenToWorld2D(
    position.buffer as ArrayBuffer,
    camera.buffer as ArrayBuffer
  );
  return Vector2.fromBuffer(buffer.buffer);
}
export function GetWorldToScreenEx(
  position: Vector3,
  camera: Camera,
  width: i32,
  height: i32
): Vector2 {
  const buffer = lib.symbols.GetWorldToScreenEx(
    position.buffer as ArrayBuffer,
    camera.buffer as ArrayBuffer,
    width,
    height
  );
  return Vector2.fromBuffer(buffer.buffer);
}
export function GetWorldToScreen2D(
  position: Vector2,
  camera: Camera2D
): Vector2 {
  const buffer = lib.symbols.GetWorldToScreen2D(
    position.buffer as ArrayBuffer,
    camera.buffer as ArrayBuffer
  );
  return Vector2.fromBuffer(buffer.buffer);
}
export function SetTargetFPS(fps: i32): void {
  fps = (fps | 0) as i32;
  lib.symbols.SetTargetFPS(fps);
}

export function GetFrameTime(): f32 {
  return lib.symbols.GetFrameTime();
}
export function GetTime(): f64 {
  return lib.symbols.GetTime();
}
export function GetFPS(): i32 {
  return lib.symbols.GetFPS();
}
export function SwapScreenBuffer(): void {
  lib.symbols.SwapScreenBuffer();
}
export function PollInputEvents(): void {
  lib.symbols.PollInputEvents();
}
export function WaitTime(seconds: f64): void {
  lib.symbols.WaitTime(seconds);
}

export function SetRandomSeed(seed: u32): void {
  seed = (seed | 0) as u32;
  lib.symbols.SetRandomSeed(seed);
}
export function GetRandomValue(min: i32, max: i32): i32 {
  min = (min | 0) as i32;
  max = (max | 0) as i32;
  return lib.symbols.GetRandomValue(min, max);
}
export function LoadRandomSequence(count: u32, min: i32, max: i32): i32[] {
  count = (count | 0) as u32;
  min = (min | 0) as i32;
  max = (max | 0) as i32;
  const ptr = lib.symbols.LoadRandomSequence(count, min, max);
  if (!ptr) {
    return [];
  }
  const buffer = new Uint8Array(count * 4);
  const view = new Deno.UnsafePointerView(ptr);
  for (let i = 0; i < count * 4; i++) {
    buffer[i] = view.getUint8(i);
  }
  const dataView = new DataView(buffer.buffer);
  const result: i32[] = [];
  for (let i = 0; i < count; i++) {
    result.push(dataView.getInt32(i * 4, true));
  }
  return result;
}
export function UnloadRandomSequence(_sequence: i32[]): void {
  // Note: This is a simplified version. In practice, you'd need to store
  // the original pointer from LoadRandomSequence to properly unload it.
  // For now, this is a no-op since we can't unload a JavaScript array.
  console.warn(
    "UnloadRandomSequence: Cannot unload JavaScript array directly. Store the original pointer for proper cleanup."
  );
}
export function TakeScreenshot(fileName: string): void {
  lib.symbols.TakeScreenshot(createStringBuffer(fileName));
}
export function SetConfigFlags(flags: E_ConfigFlags): void {
  lib.symbols.SetConfigFlags(flags);
}
export function OpenURL(url: string): void {
  lib.symbols.OpenURL(createStringBuffer(url));
}

// File management functions using Deno APIs
export async function LoadFileData(
  fileName: string
): Promise<Uint8Array | null> {
  try {
    const data = await Deno.readFile(fileName);
    return data;
  } catch (error) {
    console.error(`Failed to load file data: ${error}`);
    return null;
  }
}

export function UnloadFileData(_data: Uint8Array): void {
  // No-op in JavaScript - garbage collector handles cleanup
  // This function exists for API compatibility
}

export async function SaveFileData(
  fileName: string,
  data: Uint8Array
): Promise<boolean> {
  try {
    await Deno.writeFile(fileName, data);
    return true;
  } catch (error) {
    console.error(`Failed to save file data: ${error}`);
    return false;
  }
}

export async function ExportDataAsCode(
  data: Uint8Array,
  fileName: string
): Promise<boolean> {
  try {
    let code = `// Exported data as C code\n`;
    code += `// Data size: ${data.length} bytes\n\n`;
    code += `unsigned char data[] = {\n`;

    for (let i = 0; i < data.length; i++) {
      if (i % 16 === 0) {
        code += `    `;
      }
      code += `0x${data[i].toString(16).padStart(2, "0")}`;
      if (i < data.length - 1) {
        code += `,`;
      }
      if (i % 16 === 15 || i === data.length - 1) {
        code += `\n`;
      } else {
        code += ` `;
      }
    }

    code += `};\n`;
    code += `unsigned int dataSize = ${data.length};\n`;

    await Deno.writeTextFile(fileName, code);
    return true;
  } catch (error) {
    console.error(`Failed to export data as code: ${error}`);
    return false;
  }
}

export async function LoadFileText(fileName: string): Promise<string | null> {
  try {
    const text = await Deno.readTextFile(fileName);
    return text;
  } catch (error) {
    console.error(`Failed to load file text: ${error}`);
    return null;
  }
}

export function UnloadFileText(_text: string): void {
  // No-op in JavaScript - garbage collector handles cleanup
  // This function exists for API compatibility
}

export async function SaveFileText(
  fileName: string,
  text: string
): Promise<boolean> {
  try {
    await Deno.writeTextFile(fileName, text);
    return true;
  } catch (error) {
    console.error(`Failed to save file text: ${error}`);
    return false;
  }
}

// File system functions using Deno APIs
export async function FileExists(fileName: string): Promise<boolean> {
  try {
    const stat = await Deno.stat(fileName);
    return stat.isFile;
  } catch {
    return false;
  }
}

export async function DirectoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await Deno.stat(dirPath);
    return stat.isDirectory;
  } catch {
    return false;
  }
}

export function IsFileExtension(fileName: string, ext: string): boolean {
  return fileName.toLowerCase().endsWith(ext.toLowerCase());
}

export async function GetFileLength(fileName: string): Promise<number> {
  try {
    const stat = await Deno.stat(fileName);
    return stat.size;
  } catch {
    return 0;
  }
}

export function GetFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot !== -1 ? fileName.substring(lastDot) : "";
}

export function GetFileName(filePath: string): string {
  return filePath.split(/[/\\]/).pop() || "";
}

export function GetFileNameWithoutExt(filePath: string): string {
  const fileName = GetFileName(filePath);
  const lastDot = fileName.lastIndexOf(".");
  return lastDot !== -1 ? fileName.substring(0, lastDot) : fileName;
}

export function GetDirectoryPath(filePath: string): string {
  const parts = filePath.split(/[/\\]/);
  parts.pop(); // Remove filename
  return parts.join("/");
}

export function GetPrevDirectoryPath(dirPath: string): string {
  const parts = dirPath.split(/[/\\]/).filter((part) => part !== "");
  parts.pop(); // Remove last directory
  return parts.length > 0 ? "/" + parts.join("/") : "/";
}

export function GetWorkingDirectory(): string {
  return Deno.cwd();
}

export function GetApplicationDirectory(): string {
  return new URL(".", import.meta.url).pathname;
}

export async function ChangeDirectory(dir: string): Promise<boolean> {
  try {
    await Deno.chdir(dir);
    return true;
  } catch {
    return false;
  }
}

export async function IsPathFile(path: string): Promise<boolean> {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile;
  } catch {
    return false;
  }
}

export async function LoadDirectoryFiles(
  dirPath: string
): Promise<FilePathList> {
  try {
    const entries = [];
    for await (const entry of Deno.readDir(dirPath)) {
      entries.push(entry.name);
    }
    return new FilePathList(entries.length, entries.length, entries);
  } catch (error) {
    console.error(`Failed to load directory files: ${error}`);
    return new FilePathList(0, 0, []);
  }
}

async function scanDirectory(
  path: string,
  filterExt: string,
  scanSubdirs: boolean,
  entries: string[]
): Promise<void> {
  for await (const entry of Deno.readDir(path)) {
    const fullPath = `${path}/${entry.name}`;

    if (entry.isFile && IsFileExtension(entry.name, filterExt)) {
      entries.push(fullPath);
    } else if (entry.isDirectory && scanSubdirs) {
      await scanDirectory(fullPath, filterExt, scanSubdirs, entries);
    }
  }
}

export async function LoadDirectoryFilesEx(
  basePath: string,
  filter: string,
  scanSubdirs: boolean
): Promise<FilePathList> {
  try {
    const entries: string[] = [];
    const filterExt = filter.startsWith(".") ? filter : `.${filter}`;

    await scanDirectory(basePath, filterExt, scanSubdirs, entries);
    return new FilePathList(entries.length, entries.length, entries);
  } catch (error) {
    console.error(`Failed to load directory files with filter: ${error}`);
    return new FilePathList(0, 0, []);
  }
}

export function UnloadDirectoryFiles(_files: FilePathList): void {
  // No-op in JavaScript - garbage collector handles cleanup
  // This function exists for API compatibility
}

export function IsFileDropped(): boolean {
  // This would need to be implemented with a custom event listener
  // For now, return false as a placeholder
  console.warn("IsFileDropped: Not implemented in Deno version");
  return false;
}

export function LoadDroppedFiles(): FilePathList {
  // This would need to be implemented with a custom event listener
  // For now, return empty list as a placeholder
  console.warn("LoadDroppedFiles: Not implemented in Deno version");
  return new FilePathList(0, 0, []);
}

export function UnloadDroppedFiles(_files: FilePathList): void {
  // No-op in JavaScript - garbage collector handles cleanup
  // This function exists for API compatibility
}

export async function GetFileModTime(fileName: string): Promise<number> {
  try {
    const stat = await Deno.stat(fileName);
    return stat.mtime?.getTime() || 0;
  } catch {
    return 0;
  }
}

// Compression/Encoding functionality using Deno APIs
export async function CompressData(
  data: Uint8Array
): Promise<Uint8Array | null> {
  try {
    const stream = new CompressionStream("deflate");
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    await writer.write(data as BufferSource);
    await writer.close();

    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    // Combine all chunks into a single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  } catch (error) {
    console.error(`Compression failed: ${error}`);
    return null;
  }
}

export async function DecompressData(
  compData: Uint8Array
): Promise<Uint8Array | null> {
  try {
    const stream = new DecompressionStream("deflate");
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    await writer.write(compData as BufferSource);
    await writer.close();

    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    // Combine all chunks into a single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  } catch (error) {
    console.error(`Decompression failed: ${error}`);
    return null;
  }
}

export function EncodeDataBase64(data: Uint8Array): string {
  // Convert Uint8Array to base64 string
  const binary = Array.from(data, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary);
}

export function DecodeDataBase64(base64: string): Uint8Array | null {
  try {
    const binary = atob(base64);
    return new Uint8Array(binary.length).map((_, i) => binary.charCodeAt(i));
  } catch (error) {
    console.error(`Base64 decoding failed: ${error}`);
    return null;
  }
}

export function LoadAutomationEventList(fileName: string): AutomationEventList {
  const buffer = lib.symbols.LoadAutomationEventList(
    createStringBuffer(fileName)
  );
  return AutomationEventList.fromBuffer(buffer.buffer);
}

export function UnloadAutomationEventList(list: AutomationEventList): void {
  lib.symbols.UnloadAutomationEventList(
    Deno.UnsafePointer.of(list.buffer as ArrayBuffer)
  );
}

export function ExportAutomationEventList(
  list: AutomationEventList,
  fileName: string
): boolean {
  return !!lib.symbols.ExportAutomationEventList(
    list.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}

export function SetAutomationEventList(list: AutomationEventList): void {
  lib.symbols.SetAutomationEventList(
    Deno.UnsafePointer.of(list.buffer as ArrayBuffer)
  );
}

export function SetAutomationEventBaseFrame(frame: u32): void {
  frame = (frame | 0) as u32;
  lib.symbols.SetAutomationEventBaseFrame(frame);
}

export function StartAutomationEventRecording(): void {
  lib.symbols.StartAutomationEventRecording();
}

export function StopAutomationEventRecording(): void {
  lib.symbols.StopAutomationEventRecording();
}

export function PlayAutomationEvent(event: AutomationEvent): void {
  lib.symbols.PlayAutomationEvent(event.buffer as ArrayBuffer);
}

export function IsKeyPressed(key: E_KeyboardKey): boolean {
  return !!lib.symbols.IsKeyPressed(key);
}
export function IsKeyPressedRepeat(key: E_KeyboardKey): boolean {
  return !!lib.symbols.IsKeyPressedRepeat(key);
}
export function IsKeyDown(key: E_KeyboardKey): boolean {
  return !!lib.symbols.IsKeyDown(key);
}
export function IsKeyReleased(key: E_KeyboardKey): boolean {
  return !!lib.symbols.IsKeyReleased(key);
}
export function IsKeyUp(key: E_KeyboardKey): boolean {
  return !!lib.symbols.IsKeyUp(key);
}

export function GetKeyPressed(): E_KeyboardKey {
  return lib.symbols.GetKeyPressed();
}
export function GetCharPressed(): string {
  //turn int to char
  return String.fromCharCode(lib.symbols.GetCharPressed());
}
export function SetExitKey(key: E_KeyboardKey): void {
  lib.symbols.SetExitKey(key);
}
export function IsGamepadAvailable(gamepad: E_GamepadButton): boolean {
  return !!lib.symbols.IsGamepadAvailable(gamepad);
}
export function GetGamepadName(gamepad: E_GamepadButton): string {
  gamepad = (gamepad | 0) as u32;
  const ptr = lib.symbols.GetGamepadName(gamepad);
  if (ptr) {
    return new Deno.UnsafePointerView(ptr).getCString();
  }
  return "";
}
export function IsGamepadButtonPressed(
  gamepad: E_GamepadButton,
  button: E_GamepadButton
): boolean {
  return !!lib.symbols.IsGamepadButtonPressed(gamepad, button);
}
export function IsGamepadButtonDown(
  gamepad: E_GamepadButton,
  button: E_GamepadButton
): boolean {
  return !!lib.symbols.IsGamepadButtonDown(gamepad, button);
}
export function IsGamepadButtonReleased(
  gamepad: E_GamepadButton,
  button: E_GamepadButton
): boolean {
  return !!lib.symbols.IsGamepadButtonReleased(gamepad, button);
}
export function IsGamepadButtonUp(
  gamepad: E_GamepadButton,
  button: E_GamepadButton
): boolean {
  return !!lib.symbols.IsGamepadButtonUp(gamepad, button);
}
export function GetGamepadButtonPressed(): E_GamepadButton {
  return lib.symbols.GetGamepadButtonPressed();
}
export function GetGamepadAxisCount(gamepad: E_GamepadButton): u32 {
  return lib.symbols.GetGamepadAxisCount(gamepad);
}
export function GetGamepadAxisMovement(
  gamepad: E_GamepadButton,
  axis: E_GamepadAxis
): f32 {
  return lib.symbols.GetGamepadAxisMovement(gamepad, axis);
}
export function SetGamepadMappings(mappings: string): void {
  lib.symbols.SetGamepadMappings(createStringBuffer(mappings));
}

export function IsMouseButtonPressed(button: E_MouseButton): boolean {
  return !!lib.symbols.IsMouseButtonPressed(button);
}
export function IsMouseButtonDown(button: E_MouseButton): boolean {
  return !!lib.symbols.IsMouseButtonDown(button);
}
export function IsMouseButtonReleased(button: E_MouseButton): boolean {
  return !!lib.symbols.IsMouseButtonReleased(button);
}
export function IsMouseButtonUp(button: E_MouseButton): boolean {
  return !!lib.symbols.IsMouseButtonUp(button);
}

export function GetMouseX(): i32 {
  return lib.symbols.GetMouseX();
}
export function GetMouseY(): i32 {
  return lib.symbols.GetMouseY();
}
export function GetMousePosition(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetMousePosition().buffer as ArrayBuffer
  );
}

export function GetMouseDelta(): Vector2 {
  return Vector2.fromBuffer(lib.symbols.GetMouseDelta().buffer as ArrayBuffer);
}
export function SetMousePosition(x: i32, y: i32): void {
  x = (x | 0) as i32;
  y = (y | 0) as i32;
  lib.symbols.SetMousePosition(x, y);
}
export function SetMouseOffset(offsetX: i32, offsetY: i32): void {
  offsetX = (offsetX | 0) as i32;
  offsetY = (offsetY | 0) as i32;
  lib.symbols.SetMouseOffset(offsetX, offsetY);
}
export function SetMouseScale(scaleX: f32, scaleY: f32): void {
  lib.symbols.SetMouseScale(scaleX, scaleY);
}

export function GetMouseWheelMove(): f32 {
  return lib.symbols.GetMouseWheelMove();
}
export function GetMouseWheelMoveV(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetMouseWheelMoveV().buffer as ArrayBuffer
  );
}
export function SetMouseCursor(cursor: E_MouseCursor): void {
  lib.symbols.SetMouseCursor(cursor);
}

export function GetTouchX(): i32 {
  return lib.symbols.GetTouchX();
}
export function GetTouchY(): i32 {
  return lib.symbols.GetTouchY();
}
export function GetTouchPosition(index: i32): Vector2 {
  index = (index | 0) as i32;
  return Vector2.fromBuffer(
    lib.symbols.GetTouchPosition(index).buffer as ArrayBuffer
  );
}
export function GetTouchPointId(index: i32): i32 {
  index = (index | 0) as i32;
  return lib.symbols.GetTouchPointId(index);
}
export function GetTouchPointCount(): i32 {
  return lib.symbols.GetTouchPointCount();
}

export function SetGesturesEnabled(flags: u32): void {
  flags = (flags | 0) as u32;
  lib.symbols.SetGesturesEnabled(flags);
}
export function IsGestureDetected(gesture: E_Gesture): boolean {
  return !!lib.symbols.IsGestureDetected(gesture);
}
export function GetGestureDetected(): E_Gesture {
  return lib.symbols.GetGestureDetected();
}
export function GetGestureHoldDuration(): f32 {
  return lib.symbols.GetGestureHoldDuration();
}
export function GetGestureDragVector(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetGestureDragVector().buffer as ArrayBuffer
  );
}
export function GetGestureDragAngle(): f32 {
  return lib.symbols.GetGestureDragAngle();
}
export function GetGesturePinchVector(): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetGesturePinchVector().buffer as ArrayBuffer
  );
}
export function GetGesturePinchAngle(): f32 {
  return lib.symbols.GetGesturePinchAngle();
}
export function UpdateCamera(camera: Camera, mode: E_CameraMode): void {
  lib.symbols.UpdateCamera(
    Deno.UnsafePointer.of(camera.buffer as ArrayBuffer),
    mode
  );
}
export function UpdateCameraPro(
  camera: Camera,
  movement: Vector3,
  rotation: Vector3,
  zoom: f32
): void {
  lib.symbols.UpdateCameraPro(
    Deno.UnsafePointer.of(camera.buffer as ArrayBuffer),
    movement.buffer,
    rotation.buffer,
    zoom
  );
}

export function SetShapesTexture(texture: Texture2D, source: Rectangle): void {
  lib.symbols.SetShapesTexture(texture.buffer as ArrayBuffer, source.buffer);
}

export function DrawPixel(posX: i32, posY: i32, color: Color): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  lib.symbols.DrawPixel(posX, posY, color.buffer as ArrayBuffer);
}
export function DrawPixelV(position: Vector2, color: Color): void {
  lib.symbols.DrawPixelV(position.buffer, color.buffer as ArrayBuffer);
}

export function DrawLine(
  startPosX: i32,
  startPosY: i32,
  endPosX: i32,
  endPosY: i32,
  color: Color
): void {
  startPosX = (startPosX | 0) as i32;
  startPosY = (startPosY | 0) as i32;
  endPosX = (endPosX | 0) as i32;
  endPosY = (endPosY | 0) as i32;
  lib.symbols.DrawLine(
    startPosX,
    startPosY,
    endPosX,
    endPosY,
    color.buffer as ArrayBuffer
  );
}
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
export function DrawLineStrip(
  points: Vector2[],
  pointCount: i32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawLineStrip(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    color.buffer as ArrayBuffer
  );
}
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
    color.buffer as ArrayBuffer
  );
}

export function DrawCircle(
  centerX: i32,
  centerY: i32,
  radius: f32,
  color: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  lib.symbols.DrawCircle(centerX, centerY, radius, color.buffer as ArrayBuffer);
}
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
    color.buffer as ArrayBuffer
  );
}
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
    color.buffer as ArrayBuffer
  );
}
export function DrawCircleGradient(
  centerX: i32,
  centerY: i32,
  radius: f32,
  color1: Color,
  color2: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  lib.symbols.DrawCircleGradient(
    centerX,
    centerY,
    radius,
    color1.buffer as ArrayBuffer,
    color2.buffer as ArrayBuffer
  );
}
export function DrawCircleV(center: Vector2, radius: f32, color: Color): void {
  lib.symbols.DrawCircleV(center.buffer, radius, color.buffer as ArrayBuffer);
}
export function DrawCircleLines(
  centerX: i32,
  centerY: i32,
  radius: f32,
  color: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  lib.symbols.DrawCircleLines(
    centerX,
    centerY,
    radius,
    color.buffer as ArrayBuffer
  );
}
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
export function DrawEllipse(
  centerX: i32,
  centerY: i32,
  radiusH: f32,
  radiusV: f32,
  color: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  lib.symbols.DrawEllipse(
    centerX,
    centerY,
    radiusH,
    radiusV,
    color.buffer as ArrayBuffer
  );
}
export function DrawEllipseLines(
  centerX: i32,
  centerY: i32,
  radiusH: f32,
  radiusV: f32,
  color: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  lib.symbols.DrawEllipseLines(
    centerX,
    centerY,
    radiusH,
    radiusV,
    color.buffer as ArrayBuffer
  );
}
export function DrawRing(
  center: Vector2,
  innerRadius: f32,
  outerRadius: f32,
  startAngle: f32,
  endAngle: f32,
  segments: i32,
  color: Color
): void {
  segments = (segments | 0) as i32;
  lib.symbols.DrawRing(
    center.buffer,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    segments,
    color.buffer as ArrayBuffer
  );
}
export function DrawRingLines(
  center: Vector2,
  innerRadius: f32,
  outerRadius: f32,
  startAngle: f32,
  endAngle: f32,
  segments: i32,
  color: Color
): void {
  segments = (segments | 0) as i32;
  lib.symbols.DrawRingLines(
    center.buffer,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    segments,
    color.buffer as ArrayBuffer
  );
}
export function DrawRectangle(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.DrawRectangle(
    posX,
    posY,
    width,
    height,
    color.buffer as ArrayBuffer
  );
}
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
export function DrawRectangleRec(rec: Rectangle, color: Color): void {
  lib.symbols.DrawRectangleRec(rec.buffer, color.buffer as ArrayBuffer);
}
export function DrawRectanglePro(
  rec: Rectangle,
  origin: Vector2,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawRectanglePro(
    rec.buffer,
    origin.buffer,
    rotation,
    color.buffer as ArrayBuffer
  );
}
export function DrawRectangleGradientV(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color1: Color,
  color2: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.DrawRectangleGradientV(
    posX,
    posY,
    width,
    height,
    color1.buffer as ArrayBuffer,
    color2.buffer as ArrayBuffer
  );
}
export function DrawRectangleGradientH(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color1: Color,
  color2: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.DrawRectangleGradientH(
    posX,
    posY,
    width,
    height,
    color1.buffer as ArrayBuffer,
    color2.buffer as ArrayBuffer
  );
}
export function DrawRectangleGradientEx(
  rec: Rectangle,
  color1: Color,
  color2: Color,
  color3: Color,
  color4: Color
): void {
  lib.symbols.DrawRectangleGradientEx(
    rec.buffer,
    color1.buffer as ArrayBuffer,
    color2.buffer as ArrayBuffer,
    color3.buffer as ArrayBuffer,
    color4.buffer as ArrayBuffer
  );
}

export function DrawRectangleLines(
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.DrawRectangleLines(
    posX,
    posY,
    width,
    height,
    color.buffer as ArrayBuffer
  );
}

export function DrawRectangleLinesEx(
  rec: Rectangle,
  lineThick: f32,
  color: Color
): void {
  lib.symbols.DrawRectangleLinesEx(
    rec.buffer,
    lineThick,
    color.buffer as ArrayBuffer
  );
}

export function DrawRectangleRounded(
  rec: Rectangle,
  roundness: f32,
  segments: i32,
  color: Color
): void {
  segments = (segments | 0) as i32;
  lib.symbols.DrawRectangleRounded(
    rec.buffer,
    roundness,
    segments,
    color.buffer as ArrayBuffer
  );
}

export function DrawRectangleRoundedLines(
  rec: Rectangle,
  roundness: f32,
  segments: i32,
  lineThick: f32,
  color: Color
): void {
  segments = (segments | 0) as i32;
  lib.symbols.DrawRectangleRoundedLines(
    rec.buffer,
    roundness,
    segments,
    lineThick,
    color.buffer as ArrayBuffer
  );
}

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
export function DrawTriangleFan(
  points: Vector2[],
  pointCount: i32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawTriangleFan(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    color.buffer as ArrayBuffer
  );
}
export function DrawTriangleStrip(
  points: Vector2[],
  pointCount: i32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawTriangleStrip(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    color.buffer as ArrayBuffer
  );
}
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
    color.buffer as ArrayBuffer
  );
}
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
    color.buffer as ArrayBuffer
  );
}
export function DrawSplineLinear(
  points: Vector2[],
  pointCount: i32,
  thick: f32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawSplineLinear(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    thick,
    color.buffer as ArrayBuffer
  );
}
export function DrawSplineBasis(
  points: Vector2[],
  pointCount: i32,
  thick: f32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawSplineBasis(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    thick,
    color.buffer as ArrayBuffer
  );
}

export function DrawSplineCatmullRom(
  points: Vector2[],
  pointCount: i32,
  thick: f32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawSplineCatmullRom(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    thick,
    color.buffer as ArrayBuffer
  );
}

export function DrawSplineBezierQuadratic(
  points: Vector2[],
  pointCount: i32,
  thick: f32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawSplineBezierQuadratic(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    thick,
    color.buffer as ArrayBuffer
  );
}

export function DrawSplineBezierCubic(
  points: Vector2[],
  pointCount: i32,
  thick: f32,
  color: Color
): void {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawSplineBezierCubic(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    thick,
    color.buffer as ArrayBuffer
  );
}

export function DrawSplineSegmentLinear(
  p1: Vector2,
  p2: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawSplineSegmentLinear(
    p1.buffer,
    p2.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}
export function DrawSplineSegmentBasis(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawSplineSegmentBasis(
    p1.buffer,
    p2.buffer,
    p3.buffer,
    p4.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}
export function DrawSplineSegmentCatmullRom(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawSplineSegmentCatmullRom(
    p1.buffer,
    p2.buffer,
    p3.buffer,
    p4.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}
export function DrawSplineSegmentBezierQuadratic(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawSplineSegmentBezierQuadratic(
    p1.buffer,
    p2.buffer,
    p3.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}

export function DrawSplineSegmentBezierCubic(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
  thick: f32,
  color: Color
): void {
  lib.symbols.DrawSplineSegmentBezierCubic(
    p1.buffer,
    p2.buffer,
    p3.buffer,
    p4.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}

export function GetSplinePointLinear(
  startPos: Vector2,
  endPos: Vector2,
  t: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetSplinePointLinear(startPos.buffer, endPos.buffer, t)
      .buffer as ArrayBuffer
  );
}
export function GetSplinePointBasis(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
  t: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetSplinePointBasis(
      p1.buffer,
      p2.buffer,
      p3.buffer,
      p4.buffer,
      t
    ).buffer as ArrayBuffer
  );
}
export function GetSplinePointCatmullRom(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
  t: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetSplinePointCatmullRom(
      p1.buffer,
      p2.buffer,
      p3.buffer,
      p4.buffer,
      t
    ).buffer as ArrayBuffer
  );
}
export function GetSplinePointBezierQuad(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  t: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetSplinePointBezierQuad(p1.buffer, p2.buffer, p3.buffer, t)
      .buffer as ArrayBuffer
  );
}
export function GetSplinePointBezierCubic(
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
  t: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.GetSplinePointBezierCubic(
      p1.buffer,
      p2.buffer,
      p3.buffer,
      p4.buffer,
      t
    ).buffer as ArrayBuffer
  );
}

export function CheckCollisionRecs(rec1: Rectangle, rec2: Rectangle): boolean {
  return !!lib.symbols.CheckCollisionRecs(rec1.buffer, rec2.buffer);
}
export function CheckCollisionCircles(
  center1: Vector2,
  radius1: f32,
  center2: Vector2,
  radius2: f32
): boolean {
  return !!lib.symbols.CheckCollisionCircles(
    center1.buffer,
    radius1,
    center2.buffer,
    radius2
  );
}
export function CheckCollisionCircleRec(
  center: Vector2,
  radius: f32,
  rec: Rectangle
): boolean {
  return !!lib.symbols.CheckCollisionCircleRec(
    center.buffer,
    radius,
    rec.buffer
  );
}
export function CheckCollisionPointRec(
  point: Vector2,
  rec: Rectangle
): boolean {
  return !!lib.symbols.CheckCollisionPointRec(point.buffer, rec.buffer);
}

export function CheckCollisionPointCircle(
  point: Vector2,
  center: Vector2,
  radius: f32
): boolean {
  return !!lib.symbols.CheckCollisionPointCircle(
    point.buffer,
    center.buffer,
    radius
  );
}
export function CheckCollisionPointTriangle(
  point: Vector2,
  p1: Vector2,
  p2: Vector2,
  p3: Vector2
): boolean {
  return !!lib.symbols.CheckCollisionPointTriangle(
    point.buffer,
    p1.buffer,
    p2.buffer,
    p3.buffer
  );
}
export function CheckCollisionPointPoly(
  point: Vector2,
  points: Vector2[],
  pointCount: i32
): boolean {
  const pointsBuffer = concatVector2s(points);
  pointCount = (pointCount | 0) as i32;
  return !!lib.symbols.CheckCollisionPointPoly(
    point.buffer,
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount
  );
}

export function CheckCollisionLines(
  startPos1: Vector2,
  endPos1: Vector2,
  startPos2: Vector2,
  endPos2: Vector2,
  collisionPoint: Vector2
): boolean {
  return !!lib.symbols.CheckCollisionLines(
    startPos1.buffer,
    endPos1.buffer,
    startPos2.buffer,
    endPos2.buffer,
    Deno.UnsafePointer.of(collisionPoint.buffer as ArrayBuffer)
  );
}
export function CheckCollisionPointLine(
  point: Vector2,
  p1: Vector2,
  p2: Vector2,
  threshold: i32
): boolean {
  return !!lib.symbols.CheckCollisionPointLine(
    point.buffer,
    p1.buffer,
    p2.buffer,
    threshold
  );
}

export function GetCollisionRec(rec1: Rectangle, rec2: Rectangle): Rectangle {
  return Rectangle.fromBuffer(
    lib.symbols.GetCollisionRec(rec1.buffer, rec2.buffer).buffer as ArrayBuffer
  );
}

export function LoadImage(fileName: string): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImage(createStringBuffer(fileName)).buffer as ArrayBuffer
  );
}
export function LoadImageRaw(
  fileName: string,
  width: i32,
  height: i32,
  format: E_PixelFormat,
  headerSize: i32
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  headerSize = (headerSize | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.LoadImageRaw(
      createStringBuffer(fileName),
      width,
      height,
      format,
      headerSize
    ).buffer as ArrayBuffer
  );
}
export function LoadImageSvg(fileName: string, width: i32, height: i32): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.LoadImageSvg(createStringBuffer(fileName), width, height)
      .buffer as ArrayBuffer
  );
}
export function LoadImageAnim(fileName: string, frames: i32[]): Image {
  const framesBuffer = new Uint32Array(frames);
  return Image.fromBuffer(
    lib.symbols.LoadImageAnim(
      createStringBuffer(fileName),
      Deno.UnsafePointer.of(framesBuffer.buffer as ArrayBuffer)
    ).buffer as ArrayBuffer
  );
}

export function LoadImageFromMemory(
  fileType: string,
  fileData: Uint8Array,
  dataSize: i32
): Image {
  dataSize = (dataSize | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.LoadImageFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
      dataSize
    ).buffer as ArrayBuffer
  );
}
export function LoadImageFromTexture(texture: Texture2D): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImageFromTexture(texture.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function LoadImageFromScreen(): Image {
  return Image.fromBuffer(
    lib.symbols.LoadImageFromScreen().buffer as ArrayBuffer
  );
}
export function IsImageReady(image: Image): boolean {
  return !!lib.symbols.IsImageReady(image.buffer as ArrayBuffer);
}
export function UnloadImage(image: Image): void {
  lib.symbols.UnloadImage(image.buffer as ArrayBuffer);
}
export function ExportImage(image: Image, fileName: string): boolean {
  return !!lib.symbols.ExportImage(
    image.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}
export function ExportImageToMemory(
  image: Image,
  fileType: string,
  fileSize: i32
): Uint8Array {
  fileSize = (fileSize | 0) as i32;
  const ptr = lib.symbols.ExportImageToMemory(
    image.buffer as ArrayBuffer,
    createStringBuffer(fileType),
    Deno.UnsafePointer.of(new Uint32Array([fileSize]).buffer as ArrayBuffer)
  );
  if (!ptr) {
    return new Uint8Array(0);
  }
  const buffer = new Uint8Array(fileSize);
  const view = new Deno.UnsafePointerView(ptr);
  for (let i = 0; i < fileSize; i++) {
    buffer[i] = view.getUint8(i);
  }
  return buffer;
}
export function ExportImageAsCode(image: Image, fileName: string): boolean {
  return !!lib.symbols.ExportImageAsCode(
    image.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}

export function GenImageColor(width: i32, height: i32, color: Color): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.GenImageColor(width, height, color.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function GenImageGradientLinear(
  width: i32,
  height: i32,
  direction: i32,
  start: Color,
  end: Color
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  direction = (direction | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.GenImageGradientLinear(
      width,
      height,
      direction,
      start.buffer as ArrayBuffer,
      end.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function GenImageGradientRadial(
  width: i32,
  height: i32,
  density: f32,
  inner: Color,
  outer: Color
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  density = (density | 0) as f32;
  return Image.fromBuffer(
    lib.symbols.GenImageGradientRadial(
      width,
      height,
      density,
      inner.buffer as ArrayBuffer,
      outer.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function GenImageGradientSquare(
  width: i32,
  height: i32,
  density: f32,
  inner: Color,
  outer: Color
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  density = (density | 0) as f32;
  return Image.fromBuffer(
    lib.symbols.GenImageGradientSquare(
      width,
      height,
      density,
      inner.buffer as ArrayBuffer,
      outer.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function GenImageChecked(
  width: i32,
  height: i32,
  checksX: i32,
  checksY: i32,
  col1: Color,
  col2: Color
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  checksX = (checksX | 0) as i32;
  checksY = (checksY | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.GenImageChecked(
      width,
      height,
      checksX,
      checksY,
      col1.buffer as ArrayBuffer,
      col2.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function GenImageWhiteNoise(
  width: i32,
  height: i32,
  factor: f32
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  factor = (factor | 0) as f32;
  return Image.fromBuffer(
    lib.symbols.GenImageWhiteNoise(width, height, factor).buffer as ArrayBuffer
  );
}
export function GenImagePerlinNoise(
  width: i32,
  height: i32,
  offsetX: i32,
  offsetY: i32,
  scale: f32
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  offsetX = (offsetX | 0) as i32;
  offsetY = (offsetY | 0) as i32;
  scale = (scale | 0) as f32;
  return Image.fromBuffer(
    lib.symbols.GenImagePerlinNoise(width, height, offsetX, offsetY, scale)
      .buffer as ArrayBuffer
  );
}
export function GenImageCellular(
  width: i32,
  height: i32,
  tileSize: i32
): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  tileSize = (tileSize | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.GenImageCellular(width, height, tileSize).buffer as ArrayBuffer
  );
}
export function GenImageText(width: i32, height: i32, text: string): Image {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  return Image.fromBuffer(
    lib.symbols.GenImageText(width, height, createStringBuffer(text))
      .buffer as ArrayBuffer
  );
}
export function ImageCopy(image: Image): Image {
  return Image.fromBuffer(
    lib.symbols.ImageCopy(image.buffer as ArrayBuffer).buffer as ArrayBuffer
  );
}
export function ImageFromImage(image: Image, rec: Rectangle): Image {
  return Image.fromBuffer(
    lib.symbols.ImageFromImage(image.buffer as ArrayBuffer, rec.buffer)
      .buffer as ArrayBuffer
  );
}
export function ImageText(text: string, fontSize: i32, color: Color): Image {
  return Image.fromBuffer(
    lib.symbols.ImageText(
      createStringBuffer(text),
      fontSize,
      color.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function ImageTextEx(
  font: Font,
  text: string,
  fontSize: f32,
  spacing: f32,
  color: Color
): Image {
  return Image.fromBuffer(
    lib.symbols.ImageTextEx(
      font.buffer as ArrayBuffer,
      createStringBuffer(text),
      fontSize,
      spacing,
      color.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}

export function ImageFormat(image: Image, newFormat: E_PixelFormat): void {
  lib.symbols.ImageFormat(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    newFormat
  );
}
export function ImageToPOT(image: Image, fill: Color): void {
  lib.symbols.ImageToPOT(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    fill.buffer as ArrayBuffer
  );
}
export function ImageCrop(image: Image, crop: Rectangle): void {
  lib.symbols.ImageCrop(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    crop.buffer
  );
}
export function ImageAlphaCrop(image: Image, threshold: f32): void {
  lib.symbols.ImageAlphaCrop(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    threshold
  );
}
export function ImageAlphaClear(
  image: Image,
  color: Color,
  threshold: f32
): void {
  lib.symbols.ImageAlphaClear(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    color.buffer as ArrayBuffer,
    threshold
  );
}
export function ImageAlphaMask(image: Image, alphaMask: Image): void {
  lib.symbols.ImageAlphaMask(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    alphaMask.buffer as ArrayBuffer
  );
}
export function ImageAlphaPremultiply(image: Image): void {
  lib.symbols.ImageAlphaPremultiply(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer)
  );
}
export function ImageBlurGaussian(image: Image, blurSize: i32): void {
  blurSize = (blurSize | 0) as i32;
  lib.symbols.ImageBlurGaussian(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    blurSize
  );
}
export function ImageResize(image: Image, newWidth: i32, newHeight: i32): void {
  newWidth = (newWidth | 0) as i32;
  newHeight = (newHeight | 0) as i32;
  lib.symbols.ImageResize(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    newWidth,
    newHeight
  );
}
export function ImageResizeNN(
  image: Image,
  newWidth: i32,
  newHeight: i32
): void {
  newWidth = (newWidth | 0) as i32;
  newHeight = (newHeight | 0) as i32;
  lib.symbols.ImageResizeNN(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    newWidth,
    newHeight
  );
}

export function ImageResizeCanvas(
  image: Image,
  newWidth: i32,
  newHeight: i32,
  offsetX: i32,
  offsetY: i32,
  fill: Color
): void {
  newWidth = (newWidth | 0) as i32;
  newHeight = (newHeight | 0) as i32;
  offsetX = (offsetX | 0) as i32;
  offsetY = (offsetY | 0) as i32;
  lib.symbols.ImageResizeCanvas(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    newWidth,
    newHeight,
    offsetX,
    offsetY,
    fill.buffer as ArrayBuffer
  );
}
export function ImageMipmaps(image: Image): void {
  lib.symbols.ImageMipmaps(Deno.UnsafePointer.of(image.buffer as ArrayBuffer));
}
export function ImageDither(
  image: Image,
  rBpp: i32,
  gBpp: i32,
  bBpp: i32,
  aBpp: i32
): void {
  rBpp = (rBpp | 0) as i32;
  gBpp = (gBpp | 0) as i32;
  bBpp = (bBpp | 0) as i32;
  aBpp = (aBpp | 0) as i32;
  lib.symbols.ImageDither(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    rBpp,
    gBpp,
    bBpp,
    aBpp
  );
}
export function ImageFlipVertical(image: Image): void {
  lib.symbols.ImageFlipVertical(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer)
  );
}
export function ImageFlipHorizontal(image: Image): void {
  lib.symbols.ImageFlipHorizontal(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer)
  );
}
export function ImageRotate(image: Image, degrees: i32): void {
  degrees = (degrees | 0) as i32;
  lib.symbols.ImageRotate(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    degrees
  );
}
export function ImageRotateCW(image: Image): void {
  lib.symbols.ImageRotateCW(Deno.UnsafePointer.of(image.buffer as ArrayBuffer));
}
export function ImageRotateCCW(image: Image): void {
  lib.symbols.ImageRotateCCW(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer)
  );
}
export function ImageColorTint(image: Image, color: Color): void {
  lib.symbols.ImageColorTint(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    color.buffer as ArrayBuffer
  );
}
export function ImageColorInvert(image: Image): void {
  lib.symbols.ImageColorInvert(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer)
  );
}
export function ImageColorGrayscale(image: Image): void {
  lib.symbols.ImageColorGrayscale(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer)
  );
}
export function ImageColorContrast(image: Image, contrast: f32): void {
  lib.symbols.ImageColorContrast(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    contrast
  );
}
export function ImageColorBrightness(image: Image, brightness: i32): void {
  brightness = (brightness | 0) as i32;
  lib.symbols.ImageColorBrightness(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    brightness
  );
}
export function ImageColorReplace(
  image: Image,
  color: Color,
  replace: Color
): void {
  lib.symbols.ImageColorReplace(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    color.buffer as ArrayBuffer,
    replace.buffer as ArrayBuffer
  );
}
export function LoadImageColors(image: Image): Color[] {
  const ptr = lib.symbols.LoadImageColors(image.buffer as ArrayBuffer);
  if (ptr) {
    const result: Color[] = [];
    const view = new Deno.UnsafePointerView(ptr);
    for (let i = 0; i < image.width * image.height; i++) {
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
export function LoadImagePalette(
  image: Image,
  maxPaletteSize: i32,
  colorCount: i32
): Color[] {
  maxPaletteSize = (maxPaletteSize | 0) as i32;
  colorCount = (colorCount | 0) as i32;
  const buffer = new Uint32Array(1);
  const ptr = lib.symbols.LoadImagePalette(
    image.buffer as ArrayBuffer,
    maxPaletteSize,
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
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
export function UnloadImageColors(colors: Color[]): void {
  const colorsBuffer = concatColors(colors);
  lib.symbols.UnloadImageColors(Deno.UnsafePointer.of(colorsBuffer));
}
export function UnloadImagePalette(colors: Color[]): void {
  const colorsBuffer = concatColors(colors);
  lib.symbols.UnloadImagePalette(Deno.UnsafePointer.of(colorsBuffer));
}
export function GetImageAlphaBorder(image: Image, threshold: f32): Rectangle {
  return Rectangle.fromBuffer(
    lib.symbols.GetImageAlphaBorder(image.buffer as ArrayBuffer, threshold)
      .buffer as ArrayBuffer
  );
}
export function GetImageColor(image: Image, x: i32, y: i32): Color {
  x = (x | 0) as i32;
  y = (y | 0) as i32;
  return Color.fromBuffer(
    lib.symbols.GetImageColor(image.buffer as ArrayBuffer, x, y)
      .buffer as ArrayBuffer
  );
}
export function ImageClearBackground(image: Image, color: Color): void {
  lib.symbols.ImageClearBackground(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawPixel(
  image: Image,
  x: i32,
  y: i32,
  color: Color
): void {
  x = (x | 0) as i32;
  y = (y | 0) as i32;
  lib.symbols.ImageDrawPixel(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    x,
    y,
    color.buffer as ArrayBuffer
  );
}

export function ImageDrawPixelV(
  image: Image,
  position: Vector2,
  color: Color
): void {
  lib.symbols.ImageDrawPixelV(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    position.buffer,
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawLine(
  image: Image,
  startX: i32,
  startY: i32,
  endX: i32,
  endY: i32,
  color: Color
): void {
  startX = (startX | 0) as i32;
  startY = (startY | 0) as i32;
  endX = (endX | 0) as i32;
  endY = (endY | 0) as i32;
  lib.symbols.ImageDrawLine(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    startX,
    startY,
    endX,
    endY,
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawLineV(
  image: Image,
  start: Vector2,
  end: Vector2,
  color: Color
): void {
  lib.symbols.ImageDrawLineV(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    start.buffer,
    end.buffer,
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawCircle(
  image: Image,
  centerX: i32,
  centerY: i32,
  radius: i32,
  color: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  radius = (radius | 0) as i32;
  lib.symbols.ImageDrawCircle(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    centerX,
    centerY,
    radius,
    color.buffer as ArrayBuffer
  );
}

export function ImageDrawCircleV(
  image: Image,
  center: Vector2,
  radius: i32,
  color: Color
): void {
  radius = (radius | 0) as i32;
  lib.symbols.ImageDrawCircleV(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    center.buffer,
    radius,
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawCircleLines(
  image: Image,
  centerX: i32,
  centerY: i32,
  radius: i32,
  color: Color
): void {
  centerX = (centerX | 0) as i32;
  centerY = (centerY | 0) as i32;
  radius = (radius | 0) as i32;
  lib.symbols.ImageDrawCircleLines(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    centerX,
    centerY,
    radius,
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawCircleLinesV(
  image: Image,
  center: Vector2,
  radius: i32,
  color: Color
): void {
  radius = (radius | 0) as i32;
  lib.symbols.ImageDrawCircleLinesV(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    center.buffer,
    radius,
    color.buffer as ArrayBuffer
  );
}

export function ImageDrawRectangle(
  image: Image,
  posX: i32,
  posY: i32,
  width: i32,
  height: i32,
  color: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  lib.symbols.ImageDrawRectangle(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    posX,
    posY,
    width,
    height,
    color.buffer as ArrayBuffer
  );
}

export function ImageDrawRectangleV(
  image: Image,
  position: Vector2,
  size: Vector2,
  color: Color
): void {
  lib.symbols.ImageDrawRectangleV(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    position.buffer,
    size.buffer,
    color.buffer as ArrayBuffer
  );
}
export function ImageDrawRectangleRec(
  image: Image,
  rec: Rectangle,
  color: Color
): void {
  lib.symbols.ImageDrawRectangleRec(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    rec.buffer,
    color.buffer as ArrayBuffer
  );
}

export function ImageDrawRectangleLines(
  image: Image,
  rec: Rectangle,
  thick: i32,
  color: Color
): void {
  thick = (thick | 0) as i32;
  lib.symbols.ImageDrawRectangleLines(
    Deno.UnsafePointer.of(image.buffer as ArrayBuffer),
    rec.buffer,
    thick,
    color.buffer as ArrayBuffer
  );
}
export function ImageDraw(
  dst: Image,
  src: Image,
  srcRec: Rectangle,
  dstRec: Rectangle,
  tint: Color
): void {
  lib.symbols.ImageDraw(
    Deno.UnsafePointer.of(dst.buffer as ArrayBuffer),
    src.buffer as ArrayBuffer,
    srcRec.buffer,
    dstRec.buffer,
    tint.buffer as ArrayBuffer
  );
}

export function ImageDrawText(
  dst: Image,
  text: string,
  posX: i32,
  posY: i32,
  fontSize: i32,
  color: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  fontSize = (fontSize | 0) as i32;
  lib.symbols.ImageDrawText(
    Deno.UnsafePointer.of(dst.buffer as ArrayBuffer),
    createStringBuffer(text),
    posX,
    posY,
    fontSize,
    color.buffer as ArrayBuffer
  );
}

export function ImageDrawTextEx(
  dst: Image,
  font: Font,
  text: string,
  position: Vector2,
  fontSize: f32,
  spacing: f32,
  color: Color
): void {
  lib.symbols.ImageDrawTextEx(
    Deno.UnsafePointer.of(dst.buffer as ArrayBuffer),
    font.buffer as ArrayBuffer,
    createStringBuffer(text),
    position.buffer,
    fontSize,
    spacing,
    color.buffer as ArrayBuffer
  );
}

export function LoadTexture(fileName: string): Texture2D {
  return Texture2D.fromBuffer(
    lib.symbols.LoadTexture(createStringBuffer(fileName)).buffer as ArrayBuffer
  );
}
export function LoadTextureFromImage(image: Image): Texture2D {
  return Texture2D.fromBuffer(
    lib.symbols.LoadTextureFromImage(image.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function LoadTextureCubemap(
  image: Image,
  layout: E_CubemapLayout
): Texture2D {
  return Texture2D.fromBuffer(
    lib.symbols.LoadTextureCubemap(image.buffer as ArrayBuffer, layout)
      .buffer as ArrayBuffer
  );
}
export function LoadRenderTexture(width: i32, height: i32): Texture2D {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  return Texture2D.fromBuffer(
    lib.symbols.LoadRenderTexture(width, height).buffer as ArrayBuffer
  );
}

export function IsTextureReady(texture: Texture2D): boolean {
  return !!lib.symbols.IsTextureReady(texture.buffer as ArrayBuffer);
}
export function UnloadTexture(texture: Texture2D): void {
  lib.symbols.UnloadTexture(texture.buffer as ArrayBuffer);
}
export function IsRenderTextureReady(texture: Texture2D): boolean {
  return !!lib.symbols.IsRenderTextureReady(texture.buffer as ArrayBuffer);
}
export function UnloadRenderTexture(texture: Texture2D): void {
  lib.symbols.UnloadRenderTexture(texture.buffer as ArrayBuffer);
}
export function UpdateTexture(texture: Texture2D, pixels: Uint8Array): void {
  lib.symbols.UpdateTexture(
    texture.buffer as ArrayBuffer,
    Deno.UnsafePointer.of(pixels.buffer as ArrayBuffer)
  );
}

export function UpdateTextureRec(
  texture: Texture2D,
  rec: Rectangle,
  pixels: Uint8Array
): void {
  lib.symbols.UpdateTextureRec(
    texture.buffer as ArrayBuffer,
    rec.buffer,
    Deno.UnsafePointer.of(pixels.buffer as ArrayBuffer)
  );
}

export function GenTextureMipmaps(texture: Texture2D): void {
  lib.symbols.GenTextureMipmaps(
    Deno.UnsafePointer.of(texture.buffer as ArrayBuffer)
  );
}
export function SetTextureFilter(
  texture: Texture2D,
  filter: E_TextureFilter
): void {
  lib.symbols.SetTextureFilter(texture.buffer as ArrayBuffer, filter);
}
export function SetTextureWrap(texture: Texture2D, wrap: E_TextureWrap): void {
  lib.symbols.SetTextureWrap(texture.buffer as ArrayBuffer, wrap);
}

export function DrawTexture(
  texture: Texture2D,
  posX: i32,
  posY: i32,
  color: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  lib.symbols.DrawTexture(
    texture.buffer as ArrayBuffer,
    posX,
    posY,
    color.buffer as ArrayBuffer
  );
}
export function DrawTextureV(
  texture: Texture2D,
  position: Vector2,
  color: Color
): void {
  lib.symbols.DrawTextureV(
    texture.buffer as ArrayBuffer,
    position.buffer,
    color.buffer as ArrayBuffer
  );
}

export function DrawTextureEx(
  texture: Texture2D,
  position: Vector2,
  rotation: f32,
  scale: f32,
  color: Color
): void {
  lib.symbols.DrawTextureEx(
    texture.buffer as ArrayBuffer,
    position.buffer,
    rotation,
    scale,
    color.buffer as ArrayBuffer
  );
}
export function DrawTextureRec(
  texture: Texture2D,
  rec: Rectangle,
  position: Vector2,
  color: Color
): void {
  lib.symbols.DrawTextureRec(
    texture.buffer as ArrayBuffer,
    rec.buffer,
    position.buffer,
    color.buffer as ArrayBuffer
  );
}
export function DrawTexturePro(
  texture: Texture2D,
  source: Rectangle,
  dest: Rectangle,
  origin: Vector2,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawTexturePro(
    texture.buffer as ArrayBuffer,
    source.buffer,
    dest.buffer,
    origin.buffer,
    rotation,
    color.buffer as ArrayBuffer
  );
}

export function DrawTextureNPatch(
  texture: Texture2D,
  nPatchInfo: NPatchInfo,
  dest: Rectangle,
  origin: Vector2,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawTextureNPatch(
    texture.buffer as ArrayBuffer,
    nPatchInfo.buffer,
    dest.buffer,
    origin.buffer,
    rotation,
    color.buffer as ArrayBuffer
  );
}

export function Fade(color: Color, alpha: f32): Color {
  return Color.fromBuffer(
    lib.symbols.Fade(color.buffer as ArrayBuffer, alpha).buffer as ArrayBuffer
  );
}
export function ColorToInt(color: Color): i32 {
  return lib.symbols.ColorToInt(color.buffer as ArrayBuffer);
}
export function ColorNormalize(color: Color): Vector4 {
  return Vector4.fromBuffer(
    lib.symbols.ColorNormalize(color.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function ColorFromNormalized(normalized: Vector4): Color {
  return Color.fromBuffer(
    lib.symbols.ColorFromNormalized(normalized.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function ColorToHSV(color: Color): Vector3 {
  return Vector3.fromBuffer(
    lib.symbols.ColorToHSV(color.buffer as ArrayBuffer).buffer as ArrayBuffer
  );
}

export function ColorFromHSV(hue: f32, saturation: f32, value: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorFromHSV(hue, saturation, value).buffer as ArrayBuffer
  );
}
export function ColorTint(color: Color, tint: Color): Color {
  return Color.fromBuffer(
    lib.symbols.ColorTint(
      color.buffer as ArrayBuffer,
      tint.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function ColorBrightness(color: Color, factor: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorBrightness(color.buffer as ArrayBuffer, factor)
      .buffer as ArrayBuffer
  );
}
export function ColorContrast(color: Color, contrast: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorContrast(color.buffer as ArrayBuffer, contrast)
      .buffer as ArrayBuffer
  );
}

export function ColorAlpha(color: Color, alpha: f32): Color {
  return Color.fromBuffer(
    lib.symbols.ColorAlpha(color.buffer as ArrayBuffer, alpha)
      .buffer as ArrayBuffer
  );
}
export function ColorAlphaBlend(dst: Color, src: Color, tint: Color): Color {
  return Color.fromBuffer(
    lib.symbols.ColorAlphaBlend(
      dst.buffer as ArrayBuffer,
      src.buffer as ArrayBuffer,
      tint.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}

export function GetColor(hexValue: i32): Color {
  hexValue = (hexValue | 0) as i32;
  return Color.fromBuffer(lib.symbols.GetColor(hexValue).buffer as ArrayBuffer);
}
export function GetPixelColor(
  srcPtr: Uint8Array,
  format: E_PixelFormat
): Color {
  return Color.fromBuffer(
    lib.symbols.GetPixelColor(
      Deno.UnsafePointer.of(srcPtr.buffer as ArrayBuffer),
      format
    ).buffer as ArrayBuffer
  );
}

export function SetPixelColor(
  dstPtr: Uint8Array,
  color: Color,
  format: E_PixelFormat
): void {
  lib.symbols.SetPixelColor(
    Deno.UnsafePointer.of(dstPtr.buffer as ArrayBuffer),
    color.buffer as ArrayBuffer,
    format
  );
}

export function GetPixelDataSize(
  width: i32,
  height: i32,
  format: E_PixelFormat
): i32 {
  width = (width | 0) as i32;
  height = (height | 0) as i32;
  return lib.symbols.GetPixelDataSize(width, height, format);
}

export function GetFontDefault(): Font {
  return Font.fromBuffer(lib.symbols.GetFontDefault().buffer as ArrayBuffer);
}
export function LoadFont(fileName: string): Font {
  return Font.fromBuffer(
    lib.symbols.LoadFont(createStringBuffer(fileName)).buffer as ArrayBuffer
  );
}
export function LoadFontEx(
  fileName: string,
  fontSize: i32,
  codepoints: i32[],
  codepointCount: i32
): Font {
  fontSize = (fontSize | 0) as i32;
  codepointCount = (codepointCount | 0) as i32;
  const codepointsBuffer = new Uint32Array(codepoints);
  return Font.fromBuffer(
    lib.symbols.LoadFontEx(
      createStringBuffer(fileName),
      fontSize,
      Deno.UnsafePointer.of(codepointsBuffer.buffer as ArrayBuffer),
      codepointCount
    ).buffer as ArrayBuffer
  );
}
export function LoadFontFromImage(
  image: Image,
  key: Color,
  firstChar: i32
): Font {
  firstChar = (firstChar | 0) as i32;
  return Font.fromBuffer(
    lib.symbols.LoadFontFromImage(
      image.buffer as ArrayBuffer,
      key.buffer as ArrayBuffer,
      firstChar
    ).buffer as ArrayBuffer
  );
}

export function LoadFontFromMemory(
  fileType: string,
  fileData: Uint8Array,
  dataSize: i32,
  fontSize: i32,
  codepoints: i32[],
  codepointCount: i32
): Font {
  dataSize = (dataSize | 0) as i32;
  fontSize = (fontSize | 0) as i32;
  codepointCount = (codepointCount | 0) as i32;
  const codepointsBuffer = new Uint32Array(codepoints);
  return Font.fromBuffer(
    lib.symbols.LoadFontFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
      dataSize,
      fontSize,
      Deno.UnsafePointer.of(codepointsBuffer.buffer),
      codepointCount
    ).buffer as ArrayBuffer
  );
}
export function IsFontReady(font: Font): boolean {
  return !!lib.symbols.IsFontReady(font.buffer as ArrayBuffer);
}

export function LoadFontData(
  fileData: Uint8Array,
  dataSize: i32,
  fontSize: i32,
  codepoints: i32[],
  codepointCount: i32,
  type: i32
): GlyphInfo[] {
  dataSize = (dataSize | 0) as i32;
  fontSize = (fontSize | 0) as i32;
  codepointCount = (codepointCount | 0) as i32;
  type = (type | 0) as i32;
  const codepointsBuffer = new Uint32Array(codepoints);
  const result = lib.symbols.LoadFontData(
    Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
    dataSize,
    fontSize,
    Deno.UnsafePointer.of(codepointsBuffer.buffer as ArrayBuffer),
    codepointCount,
    type
  );

  if (!result) return [];

  // Parse the array of GlyphInfo structs
  const glyphs: GlyphInfo[] = [];
  for (let i = 0; i < codepointCount; i++) {
    const glyphPtr = Deno.UnsafePointer.create(BigInt(Number(result) + i * 20)); // GlyphInfo is 20 bytes
    const glyphBuffer = new Uint8Array(20);
    new Deno.UnsafePointerView(glyphPtr as Deno.PointerObject).copyInto(
      glyphBuffer
    );
    glyphs.push(GlyphInfo.fromBuffer(glyphBuffer.buffer));
  }

  return glyphs;
}

export function GenImageFontAtlas(
  glyphs: GlyphInfo[],
  glyphRecs: Rectangle[],
  glyphCount: i32,
  fontSize: i32,
  padding: i32,
  packMethod: i32
): Image {
  glyphCount = (glyphCount | 0) as i32;
  fontSize = (fontSize | 0) as i32;
  padding = (padding | 0) as i32;
  packMethod = (packMethod | 0) as i32;

  const glyphsBuffer = new Uint8Array(glyphs.length * 20);
  for (let i = 0; i < glyphs.length; i++) {
    const glyphBuffer = glyphs[i].buffer;
    glyphsBuffer.set(new Uint8Array(glyphBuffer), i * 20);
  }

  const glyphRecsBuffer = new Uint8Array(glyphRecs.length * 16);
  for (let i = 0; i < glyphRecs.length; i++) {
    const rectBuffer = glyphRecs[i].buffer;
    glyphRecsBuffer.set(new Uint8Array(rectBuffer), i * 16);
  }

  return Image.fromBuffer(
    lib.symbols.GenImageFontAtlas(
      Deno.UnsafePointer.of(glyphsBuffer.buffer as ArrayBuffer),
      Deno.UnsafePointer.of(glyphRecsBuffer.buffer as ArrayBuffer),
      glyphCount,
      fontSize,
      padding,
      packMethod
    ).buffer as ArrayBuffer
  );
}

export function UnloadFontData(glyphs: GlyphInfo[]): void {
  const glyphsBuffer = new Uint8Array(glyphs.length * 20);
  for (let i = 0; i < glyphs.length; i++) {
    const glyphBuffer = glyphs[i].buffer;
    glyphsBuffer.set(new Uint8Array(glyphBuffer), i * 20);
  }

  lib.symbols.UnloadFontData(
    Deno.UnsafePointer.of(glyphsBuffer.buffer as ArrayBuffer),
    glyphs.length
  );
}

export function UnloadFont(font: Font): void {
  lib.symbols.UnloadFont(font.buffer as ArrayBuffer);
}

export function ExportFontAsCode(font: Font, fileName: string): boolean {
  return !!lib.symbols.ExportFontAsCode(
    font.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}

export function DrawFPS(posX: i32, posY: i32): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  lib.symbols.DrawFPS(posX, posY);
}

export function DrawText(
  text: string,
  posX: i32,
  posY: i32,
  fontSize: i32,
  color: Color
): void {
  posX = (posX | 0) as i32;
  posY = (posY | 0) as i32;
  fontSize = (fontSize | 0) as i32;
  lib.symbols.DrawText(
    createStringBuffer(text),
    posX,
    posY,
    fontSize,
    color.buffer as ArrayBuffer
  );
}

export function DrawTextEx(
  font: Font,
  text: string,
  position: Vector2,
  fontSize: f32,
  spacing: f32,
  color: Color
): void {
  lib.symbols.DrawTextEx(
    font.buffer as ArrayBuffer,
    createStringBuffer(text),
    position.buffer,
    fontSize,
    spacing,
    color.buffer as ArrayBuffer
  );
}

export function DrawTextPro(
  font: Font,
  text: string,
  position: Vector2,
  origin: Vector2,
  rotation: f32,
  fontSize: f32,
  spacing: f32,
  color: Color
): void {
  lib.symbols.DrawTextPro(
    font.buffer as ArrayBuffer,
    createStringBuffer(text),
    position.buffer,
    origin.buffer,
    rotation,
    fontSize,
    spacing,
    color.buffer as ArrayBuffer
  );
}

export function DrawTextCodepoint(
  font: Font,
  codepoint: i32,
  position: Vector2,
  fontSize: f32,
  color: Color
): void {
  lib.symbols.DrawTextCodepoint(
    font.buffer as ArrayBuffer,
    codepoint,
    position.buffer,
    fontSize,
    color.buffer as ArrayBuffer
  );
}

export function DrawTextCodepoints(
  font: Font,
  codepoints: i32[],
  count: i32,
  position: Vector2,
  fontSize: f32,
  spacing: f32,
  color: Color
): void {
  count = (count | 0) as i32;
  const codepointsBuffer = new Uint32Array(codepoints);
  lib.symbols.DrawTextCodepoints(
    font.buffer as ArrayBuffer,
    Deno.UnsafePointer.of(codepointsBuffer.buffer as ArrayBuffer),
    count,
    position.buffer,
    fontSize,
    spacing,
    color.buffer as ArrayBuffer
  );
}

export function SetTextLineSpacing(spacing: i32): void {
  spacing = (spacing | 0) as i32;
  lib.symbols.SetTextLineSpacing(spacing);
}

export function MeasureText(text: string, fontSize: i32): i32 {
  fontSize = (fontSize | 0) as i32;
  return lib.symbols.MeasureText(createStringBuffer(text), fontSize);
}

export function MeasureTextEx(
  font: Font,
  text: string,
  fontSize: f32,
  spacing: f32
): Vector2 {
  return Vector2.fromBuffer(
    lib.symbols.MeasureTextEx(
      font.buffer as ArrayBuffer,
      createStringBuffer(text),
      fontSize,
      spacing
    ).buffer as ArrayBuffer
  );
}

export function GetGlyphIndex(font: Font, codepoint: i32): i32 {
  codepoint = (codepoint | 0) as i32;
  return lib.symbols.GetGlyphIndex(font.buffer as ArrayBuffer, codepoint);
}

export function GetGlyphInfo(font: Font, codepoint: i32): GlyphInfo {
  codepoint = (codepoint | 0) as i32;
  return GlyphInfo.fromBuffer(
    lib.symbols.GetGlyphInfo(font.buffer as ArrayBuffer, codepoint)
      .buffer as ArrayBuffer
  );
}

export function GetGlyphAtlasRec(font: Font, codepoint: i32): Rectangle {
  codepoint = (codepoint | 0) as i32;
  return Rectangle.fromBuffer(
    lib.symbols.GetGlyphAtlasRec(font.buffer as ArrayBuffer, codepoint)
      .buffer as ArrayBuffer
  );
}

export function LoadUTF8(codepoints: i32[], length: i32): string {
  length = (length | 0) as i32;
  const codepointsBuffer = new Uint32Array(codepoints);
  const result = lib.symbols.LoadUTF8(
    Deno.UnsafePointer.of(codepointsBuffer.buffer as ArrayBuffer),
    length
  );

  if (!result) return "";

  // Read the C string from the pointer
  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function UnloadUTF8(text: string): void {
  lib.symbols.UnloadUTF8(createStringBuffer(text));
}

export function LoadCodepoints(text: string, count: i32[]): i32[] {
  const buffer = new Uint32Array(count);
  const ptr = lib.symbols.LoadCodepoints(
    createStringBuffer(text),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
  if (ptr) {
    const result = new Uint32Array(
      Deno.UnsafePointerView.getArrayBuffer(ptr, count.length * 4)
    );
    return Array.from(result);
  }
  return [];
}

export function UnloadCodepoints(codepoints: i32[]): void {
  const buffer = new Uint32Array(codepoints);
  lib.symbols.UnloadCodepoints(
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
}

export function GetCodepointCount(text: string): i32 {
  return lib.symbols.GetCodepointCount(createStringBuffer(text));
}

export function GetCodepoint(text: string, codepointSize: i32[]): i32 {
  const buffer = new Uint32Array(codepointSize);
  return lib.symbols.GetCodepoint(
    createStringBuffer(text),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
}

export function GetCodepointNext(text: string, codepointSize: i32[]): i32 {
  const buffer = new Uint32Array(codepointSize);
  return lib.symbols.GetCodepointNext(
    createStringBuffer(text),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
}

export function GetCodepointPrevious(text: string, codepointSize: i32[]): i32 {
  const buffer = new Uint32Array(codepointSize);
  return lib.symbols.GetCodepointPrevious(
    createStringBuffer(text),
    Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  );
}

export function CodepointToUTF8(codepoint: i32, utf8Size: i32[]): string {
  codepoint = (codepoint | 0) as i32;
  const sizeBuffer = new Uint32Array(1);
  const result = lib.symbols.CodepointToUTF8(
    codepoint,
    Deno.UnsafePointer.of(sizeBuffer.buffer as ArrayBuffer)
  );

  if (!result) return "";

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  const utf8String = view.getCString();

  utf8Size[0] = sizeBuffer[0];

  return utf8String;
}

export function TextCopy(dst: string, src: string): i32 {
  return lib.symbols.TextCopy(createStringBuffer(dst), createStringBuffer(src));
}

export function TextIsEqual(text1: string, text2: string): boolean {
  return !!lib.symbols.TextIsEqual(
    createStringBuffer(text1),
    createStringBuffer(text2)
  );
}

export function TextLength(text: string): i32 {
  return lib.symbols.TextLength(createStringBuffer(text));
}

// deno-lint-ignore no-explicit-any
export function TextFormat(text: string, ...args: any[]): string {
  // Use JavaScript's built-in string formatting instead of C's printf
  // This is safer and more reliable than trying to pass variadic args to C
  try {
    // Simple printf-style formatting for common cases
    let result = text;
    let argIndex = 0;

    result = result.replace(/%[sdioxXucfeEgG]/g, (match) => {
      if (argIndex < args.length) {
        const value = args[argIndex++];
        switch (match) {
          case "%d":
          case "%i":
            return Math.floor(Number(value)).toString();
          case "%f":
          case "%e":
          case "%E":
          case "%g":
          case "%G":
            return Number(value).toString();
          case "%s":
            return String(value);
          case "%c":
            return String.fromCharCode(Number(value));
          case "%x":
            return Number(value).toString(16);
          case "%X":
            return Number(value).toString(16).toUpperCase();
          case "%o":
            return Number(value).toString(8);
          case "%u":
            return Math.abs(Number(value)).toString();
          default:
            return match;
        }
      }
      return match;
    });

    return result;
  } catch {
    return text;
  }
}

export function TextSubtext(text: string, position: i32, length: i32): string {
  position = (position | 0) as i32;
  length = (length | 0) as i32;
  const result = lib.symbols.TextSubtext(
    createStringBuffer(text),
    position,
    length
  );

  if (!result) return "";

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextReplace(text: string, replace: string, by: string): string {
  const result = lib.symbols.TextReplace(
    createStringBuffer(text),
    createStringBuffer(replace),
    createStringBuffer(by)
  );

  if (!result) return text;

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextInsert(
  text: string,
  insert: string,
  position: i32
): string {
  position = (position | 0) as i32;
  const result = lib.symbols.TextInsert(
    createStringBuffer(text),
    createStringBuffer(insert),
    position
  );

  if (!result) return text;

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextJoin(
  textList: string[],
  count: i32,
  delimiter: string
): string {
  count = (count | 0) as i32;

  const textBuffers = textList.map(createStringBuffer);
  const textPtrs = textBuffers.map((buf) => Deno.UnsafePointer.of(buf));

  const ptrArray = new Uint8Array(textPtrs.length * 8);
  for (let i = 0; i < textPtrs.length; i++) {
    if (textPtrs[i]) {
      const ptrBytes = new Uint8Array(
        Deno.UnsafePointerView.getArrayBuffer(
          textPtrs[i] as Deno.PointerObject,
          8
        )
      );
      ptrArray.set(ptrBytes, i * 8);
    }
  }

  const result = lib.symbols.TextJoin(
    Deno.UnsafePointer.of(ptrArray.buffer as ArrayBuffer),
    count,
    createStringBuffer(delimiter)
  );

  if (!result) return "";

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextSplit(
  text: string,
  delimiter: string,
  count: i32[]
): string[] {
  const countBuffer = new Uint32Array(1);
  const result = lib.symbols.TextSplit(
    createStringBuffer(text),
    delimiter.charCodeAt(0),
    Deno.UnsafePointer.of(countBuffer.buffer as ArrayBuffer)
  );

  if (!result) {
    count[0] = 0;
    return [];
  }

  const actualCount = countBuffer[0];
  count[0] = actualCount;

  const strings: string[] = [];
  for (let i = 0; i < actualCount; i++) {
    const stringPtr = Deno.UnsafePointer.create(BigInt(Number(result) + i * 8));
    const view = new Deno.UnsafePointerView(stringPtr as Deno.PointerObject);
    const stringPtrValue = view.getBigUint64(0);
    if (stringPtrValue !== 0n) {
      const stringView = new Deno.UnsafePointerView(
        Deno.UnsafePointer.create(stringPtrValue) as Deno.PointerObject
      );
      strings.push(stringView.getCString());
    }
  }

  return strings;
}

export function TextAppend(
  text: string,
  append: string,
  position: i32[]
): void {
  const posBuffer = new Uint32Array([position[0]]);
  lib.symbols.TextAppend(
    createStringBuffer(text),
    createStringBuffer(append),
    Deno.UnsafePointer.of(posBuffer.buffer as ArrayBuffer)
  );
  position[0] = posBuffer[0];
}

export function TextFindIndex(text: string, find: string): i32 {
  return lib.symbols.TextFindIndex(
    createStringBuffer(text),
    createStringBuffer(find)
  );
}

export function TextToUpper(text: string): string {
  const result = lib.symbols.TextToUpper(createStringBuffer(text));

  if (!result) return text;

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextToLower(text: string): string {
  const result = lib.symbols.TextToLower(createStringBuffer(text));

  if (!result) return text;

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextToPascal(text: string): string {
  const result = lib.symbols.TextToPascal(createStringBuffer(text));

  if (!result) return text;

  const view = new Deno.UnsafePointerView(result as Deno.PointerObject);
  return view.getCString();
}

export function TextToInteger(text: string): i32 {
  return lib.symbols.TextToInteger(createStringBuffer(text));
}

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

export function DrawPoint3D(position: Vector3, color: Color): void {
  lib.symbols.DrawPoint3D(position.buffer, color.buffer as ArrayBuffer);
}

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
    color.buffer as ArrayBuffer
  );
}
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
export function DrawTriangleStrip3D(
  points: Vector3[],
  pointCount: i32,
  color: Color
): void {
  const pointsBuffer = concatVector3s(points);
  pointCount = (pointCount | 0) as i32;
  lib.symbols.DrawTriangleStrip3D(
    Deno.UnsafePointer.of(pointsBuffer),
    pointCount,
    color.buffer as ArrayBuffer
  );
}

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
    color.buffer as ArrayBuffer
  );
}
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

export function DrawSphere(
  centerPos: Vector3,
  radius: f32,
  color: Color
): void {
  lib.symbols.DrawSphere(centerPos.buffer, radius, color.buffer as ArrayBuffer);
}
export function DrawSphereEx(
  centerPos: Vector3,
  radius: f32,
  rings: i32,
  slices: i32,
  color: Color
): void {
  rings = (rings | 0) as i32;
  slices = (slices | 0) as i32;
  lib.symbols.DrawSphereEx(
    centerPos.buffer,
    radius,
    rings,
    slices,
    color.buffer as ArrayBuffer
  );
}
export function DrawSphereWires(
  centerPos: Vector3,
  radius: f32,
  rings: i32,
  slices: i32,
  color: Color
): void {
  rings = (rings | 0) as i32;
  slices = (slices | 0) as i32;
  lib.symbols.DrawSphereWires(
    centerPos.buffer,
    radius,
    rings,
    slices,
    color.buffer as ArrayBuffer
  );
}
export function DrawCylinder(
  position: Vector3,
  radiusTop: f32,
  radiusBottom: f32,
  height: f32,
  slices: i32,
  color: Color
): void {
  slices = (slices | 0) as i32;
  lib.symbols.DrawCylinder(
    position.buffer,
    radiusTop,
    radiusBottom,
    height,
    slices,
    color.buffer as ArrayBuffer
  );
}
export function DrawCylinderEx(
  startPos: Vector3,
  endPos: Vector3,
  startRadius: f32,
  endRadius: f32,
  sides: i32,
  color: Color
): void {
  sides = (sides | 0) as i32;
  lib.symbols.DrawCylinderEx(
    startPos.buffer,
    endPos.buffer,
    startRadius,
    endRadius,
    sides,
    color.buffer as ArrayBuffer
  );
}
export function DrawCylinderWires(
  position: Vector3,
  radiusTop: f32,
  radiusBottom: f32,
  height: f32,
  slices: i32,
  color: Color
): void {
  slices = (slices | 0) as i32;
  lib.symbols.DrawCylinderWires(
    position.buffer,
    radiusTop,
    radiusBottom,
    height,
    slices,
    color.buffer as ArrayBuffer
  );
}
export function DrawCylinderWiresEx(
  startPos: Vector3,
  endPos: Vector3,
  startRadius: f32,
  endRadius: f32,
  sides: i32,
  color: Color
): void {
  sides = (sides | 0) as i32;
  lib.symbols.DrawCylinderWiresEx(
    startPos.buffer,
    endPos.buffer,
    startRadius,
    endRadius,
    sides,
    color.buffer as ArrayBuffer
  );
}
export function DrawCapsule(
  startPos: Vector3,
  endPos: Vector3,
  radius: f32,
  slices: i32,
  rings: i32,
  color: Color
): void {
  slices = (slices | 0) as i32;
  rings = (rings | 0) as i32;
  lib.symbols.DrawCapsule(
    startPos.buffer,
    endPos.buffer,
    radius,
    slices,
    rings,
    color.buffer as ArrayBuffer
  );
}
export function DrawCapsuleWires(
  startPos: Vector3,
  endPos: Vector3,
  radius: f32,
  slices: i32,
  rings: i32,
  color: Color
): void {
  slices = (slices | 0) as i32;
  rings = (rings | 0) as i32;
  lib.symbols.DrawCapsuleWires(
    startPos.buffer,
    endPos.buffer,
    radius,
    slices,
    rings,
    color.buffer as ArrayBuffer
  );
}
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
export function DrawRay(ray: Ray, color: Color): void {
  lib.symbols.DrawRay(ray.buffer, color.buffer as ArrayBuffer);
}
export function DrawGrid(slices: i32, spacing: f32): void {
  lib.symbols.DrawGrid(slices, spacing);
}

export function LoadModel(fileName: string): Model {
  return Model.fromBuffer(
    lib.symbols.LoadModel(createStringBuffer(fileName)).buffer as ArrayBuffer
  );
}
export function LoadModelFromMesh(mesh: Mesh): Model {
  return Model.fromBuffer(
    lib.symbols.LoadModelFromMesh(mesh.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function IsModelReady(model: Model): boolean {
  return !!lib.symbols.IsModelReady(model.buffer as ArrayBuffer);
}

export function UnloadModel(model: Model): void {
  lib.symbols.UnloadModel(model.buffer as ArrayBuffer);
}
export function GetModelBoundingBox(model: Model): BoundingBox {
  return BoundingBox.fromBuffer(
    lib.symbols.GetModelBoundingBox(model.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

export function DrawModel(
  model: Model,
  position: Vector3,
  scale: f32,
  color: Color
): void {
  lib.symbols.DrawModel(
    model.buffer as ArrayBuffer,
    position.buffer,
    scale,
    color.buffer as ArrayBuffer
  );
}
export function DrawModelEx(
  model: Model,
  position: Vector3,
  rotationAxis: Vector3,
  rotationAngle: f32,
  scale: Vector3,
  color: Color
): void {
  lib.symbols.DrawModelEx(
    model.buffer as ArrayBuffer,
    position.buffer,
    rotationAxis.buffer,
    rotationAngle,
    scale.buffer,
    color.buffer as ArrayBuffer
  );
}
export function DrawModelWires(
  model: Model,
  position: Vector3,
  scale: f32,
  color: Color
): void {
  lib.symbols.DrawModelWires(
    model.buffer as ArrayBuffer,
    position.buffer,
    scale,
    color.buffer as ArrayBuffer
  );
}

export function DrawModelWiresEx(
  model: Model,
  position: Vector3,
  rotationAxis: Vector3,
  rotationAngle: f32,
  scale: Vector3,
  color: Color
): void {
  lib.symbols.DrawModelWiresEx(
    model.buffer as ArrayBuffer,
    position.buffer,
    rotationAxis.buffer,
    rotationAngle,
    scale.buffer,
    color.buffer as ArrayBuffer
  );
}
export function DrawBoundingBox(box: BoundingBox, color: Color): void {
  lib.symbols.DrawBoundingBox(box.buffer, color.buffer as ArrayBuffer);
}
export function DrawBillboard(
  camera: Camera,
  texture: Texture2D,
  position: Vector3,
  size: f32,
  color: Color
): void {
  lib.symbols.DrawBillboard(
    camera.buffer,
    texture.buffer as ArrayBuffer,
    position.buffer,
    size,
    color.buffer as ArrayBuffer
  );
}

export function DrawBillboardRec(
  camera: Camera,
  texture: Texture2D,
  source: Rectangle,
  position: Vector3,
  size: Vector2,
  color: Color
): void {
  lib.symbols.DrawBillboardRec(
    camera.buffer,
    texture.buffer as ArrayBuffer,
    source.buffer,
    position.buffer,
    size.buffer,
    color.buffer as ArrayBuffer
  );
}
export function DrawBillboardPro(
  camera: Camera,
  texture: Texture2D,
  source: Rectangle,
  position: Vector3,
  up: Vector3,
  size: Vector2,
  origin: Vector2,
  rotation: f32,
  color: Color
): void {
  lib.symbols.DrawBillboardPro(
    camera.buffer,
    texture.buffer as ArrayBuffer,
    source.buffer,
    position.buffer,
    up.buffer,
    size.buffer,
    origin.buffer,
    rotation,
    color.buffer as ArrayBuffer
  );
}
export function UploadMesh(mesh: Mesh, dynamic: boolean): void {
  //convert bool to u8;
  const dynamicBuffer = new Uint8Array(1);
  dynamicBuffer[0] = dynamic ? 1 : 0;
  lib.symbols.UploadMesh(
    Deno.UnsafePointer.of(mesh.buffer as ArrayBuffer),
    dynamicBuffer[0]
  );
}

export function UpdateMeshBuffer(
  mesh: Mesh,
  index: i32,
  data: Uint8Array,
  dataSize: i32,
  offset: i32
): void {
  index = (index | 0) as i32;
  dataSize = (dataSize | 0) as i32;
  offset = (offset | 0) as i32;
  lib.symbols.UpdateMeshBuffer(
    mesh.buffer as ArrayBuffer,
    index,
    Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
    dataSize,
    offset
  );
}
export function UnloadMesh(mesh: Mesh): void {
  lib.symbols.UnloadMesh(mesh.buffer as ArrayBuffer);
}
export function DrawMesh(
  mesh: Mesh,
  material: Material,
  transform: Matrix
): void {
  lib.symbols.DrawMesh(
    mesh.buffer as ArrayBuffer,
    material.buffer as ArrayBuffer,
    transform.buffer as ArrayBuffer
  );
}

export function DrawMeshInstanced(
  mesh: Mesh,
  material: Material,
  transforms: Matrix[],
  instances: i32
): void {
  instances = (instances | 0) as i32;
  const transformsBuffer = concatMatrices(transforms);
  lib.symbols.DrawMeshInstanced(
    mesh.buffer as ArrayBuffer,
    material.buffer as ArrayBuffer,
    Deno.UnsafePointer.of(transformsBuffer),
    instances
  );
}
export function ExportMesh(mesh: Mesh, fileName: string): boolean {
  return !!lib.symbols.ExportMesh(
    mesh.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}
export function GetMeshBoundingBox(mesh: Mesh): BoundingBox {
  return BoundingBox.fromBuffer(
    lib.symbols.GetMeshBoundingBox(mesh.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}
export function GenMeshTangents(mesh: Mesh): void {
  lib.symbols.GenMeshTangents(
    Deno.UnsafePointer.of(mesh.buffer as ArrayBuffer)
  );
}

export function GenMeshPoly(sides: i32, radius: f32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshPoly(sides, radius).buffer as ArrayBuffer
  );
}
export function GenMeshPlane(
  width: f32,
  length: f32,
  resX: i32,
  resZ: i32
): Mesh {
  resX = (resX | 0) as i32;
  resZ = (resZ | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshPlane(width, length, resX, resZ).buffer as ArrayBuffer
  );
}
export function GenMeshCube(width: f32, height: f32, length: f32): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCube(width, height, length).buffer as ArrayBuffer
  );
}
export function GenMeshSphere(radius: f32, rings: i32, slices: i32): Mesh {
  rings = (rings | 0) as i32;
  slices = (slices | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshSphere(radius, rings, slices).buffer as ArrayBuffer
  );
}
export function GenMeshHemiSphere(radius: f32, rings: i32, slices: i32): Mesh {
  rings = (rings | 0) as i32;
  slices = (slices | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshHemiSphere(radius, rings, slices).buffer as ArrayBuffer
  );
}
export function GenMeshCylinder(radius: f32, height: f32, slices: i32): Mesh {
  slices = (slices | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCylinder(radius, height, slices).buffer as ArrayBuffer
  );
}
export function GenMeshCone(radius: f32, height: f32, slices: i32): Mesh {
  slices = (slices | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCone(radius, height, slices).buffer as ArrayBuffer
  );
}
export function GenMeshTorus(
  radius: f32,
  size: f32,
  radSeg: i32,
  sides: i32
): Mesh {
  radSeg = (radSeg | 0) as i32;
  sides = (sides | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshTorus(radius, size, radSeg, sides).buffer as ArrayBuffer
  );
}
export function GenMeshKnot(
  radius: f32,
  size: f32,
  radSeg: i32,
  sides: i32
): Mesh {
  radSeg = (radSeg | 0) as i32;
  sides = (sides | 0) as i32;
  return Mesh.fromBuffer(
    lib.symbols.GenMeshKnot(radius, size, radSeg, sides).buffer as ArrayBuffer
  );
}
export function GenMeshHeightmap(heightmap: Image, size: Vector3): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshHeightmap(
      heightmap.buffer as ArrayBuffer,
      size.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}
export function GenMeshCubicmap(cubicmap: Image, cubeSize: Vector3): Mesh {
  return Mesh.fromBuffer(
    lib.symbols.GenMeshCubicmap(
      cubicmap.buffer as ArrayBuffer,
      cubeSize.buffer as ArrayBuffer
    ).buffer as ArrayBuffer
  );
}

export function LoadMaterials(
  fileName: string,
  materialCount: i32[]
): Material[] {
  const countBuffer = new Uint32Array(1);
  const result = lib.symbols.LoadMaterials(
    createStringBuffer(fileName),
    Deno.UnsafePointer.of(countBuffer.buffer as ArrayBuffer)
  );

  if (!result) {
    materialCount[0] = 0;
    return [];
  }

  const actualCount = countBuffer[0];
  materialCount[0] = actualCount;

  const materials: Material[] = [];
  for (let i = 0; i < actualCount; i++) {
    const materialPtr = Deno.UnsafePointer.create(
      BigInt(Number(result) + i * 32)
    ); // Material size estimate
    const materialBuffer = new Uint8Array(32);
    new Deno.UnsafePointerView(materialPtr as Deno.PointerObject).copyInto(
      materialBuffer
    );
    materials.push(Material.fromBuffer(materialBuffer.buffer));
  }

  return materials;
}

export function LoadMaterialDefault(): Material {
  return Material.fromBuffer(
    lib.symbols.LoadMaterialDefault().buffer as ArrayBuffer
  );
}

export function IsMaterialReady(material: Material): boolean {
  return !!lib.symbols.IsMaterialReady(material.buffer as ArrayBuffer);
}

export function UnloadMaterial(material: Material): void {
  lib.symbols.UnloadMaterial(material.buffer as ArrayBuffer);
}

export function SetMaterialTexture(
  material: Material,
  mapType: i32,
  texture: Texture2D
): void {
  mapType = (mapType | 0) as i32;
  lib.symbols.SetMaterialTexture(
    Deno.UnsafePointer.of(material.buffer as ArrayBuffer),
    mapType,
    texture.buffer as ArrayBuffer
  );
}

export function SetModelMeshMaterial(
  model: Model,
  meshId: i32,
  materialId: i32
): void {
  meshId = (meshId | 0) as i32;
  materialId = (materialId | 0) as i32;
  lib.symbols.SetModelMeshMaterial(
    Deno.UnsafePointer.of(model.buffer as ArrayBuffer),
    meshId,
    materialId
  );
}

export function LoadModelAnimations(
  fileName: string,
  animCount: i32[]
): ModelAnimation[] {
  const countBuffer = new Uint32Array(1);
  const result = lib.symbols.LoadModelAnimations(
    createStringBuffer(fileName),
    Deno.UnsafePointer.of(countBuffer.buffer as ArrayBuffer)
  );

  if (!result) {
    animCount[0] = 0;
    return [];
  }

  const actualCount = countBuffer[0];
  animCount[0] = actualCount;

  const animations: ModelAnimation[] = [];
  for (let i = 0; i < actualCount; i++) {
    const animPtr = Deno.UnsafePointer.create(BigInt(Number(result) + i * 24)); // ModelAnimation size estimate
    const animBuffer = new Uint8Array(24);
    new Deno.UnsafePointerView(animPtr as Deno.PointerObject).copyInto(
      animBuffer
    );
    animations.push(ModelAnimation.fromBuffer(animBuffer.buffer));
  }

  return animations;
}

export function UpdateModelAnimation(
  model: Model,
  anim: ModelAnimation,
  frame: i32
): void {
  frame = (frame | 0) as i32;
  lib.symbols.UpdateModelAnimation(
    model.buffer as ArrayBuffer,
    anim.buffer as ArrayBuffer,
    frame
  );
}

export function UnloadModelAnimation(anim: ModelAnimation): void {
  lib.symbols.UnloadModelAnimation(anim.buffer as ArrayBuffer);
}

export function UnloadModelAnimations(
  animations: ModelAnimation[],
  animCount: i32
): void {
  animCount = (animCount | 0) as i32;

  // Convert animations array to buffer
  const animsBuffer = new Uint8Array(animations.length * 24);
  for (let i = 0; i < animations.length; i++) {
    const animBuffer = animations[i].buffer;
    animsBuffer.set(new Uint8Array(animBuffer), i * 24);
  }

  lib.symbols.UnloadModelAnimations(
    Deno.UnsafePointer.of(animsBuffer.buffer as ArrayBuffer),
    animCount
  );
}

export function IsModelAnimationValid(
  model: Model,
  anim: ModelAnimation
): boolean {
  return !!lib.symbols.IsModelAnimationValid(
    model.buffer as ArrayBuffer,
    anim.buffer as ArrayBuffer
  );
}

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

export function CheckCollisionBoxes(
  box1: BoundingBox,
  box2: BoundingBox
): boolean {
  return !!lib.symbols.CheckCollisionBoxes(box1.buffer, box2.buffer);
}

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

export function GetRayCollisionSphere(
  ray: Ray,
  center: Vector3,
  radius: f32
): RayCollision {
  return RayCollision.fromBuffer(
    lib.symbols.GetRayCollisionSphere(ray.buffer, center.buffer, radius)
      .buffer as ArrayBuffer
  );
}

export function GetRayCollisionBox(ray: Ray, box: BoundingBox): RayCollision {
  return RayCollision.fromBuffer(
    lib.symbols.GetRayCollisionBox(ray.buffer, box.buffer).buffer as ArrayBuffer
  );
}

export function GetRayCollisionMesh(
  ray: Ray,
  mesh: Mesh,
  transform: Matrix
): RayCollision {
  return RayCollision.fromBuffer(
    lib.symbols.GetRayCollisionMesh(
      ray.buffer,
      mesh.buffer as ArrayBuffer,
      transform.buffer
    ).buffer as ArrayBuffer
  );
}

export function GetRayCollisionTriangle(
  ray: Ray,
  p1: Vector3,
  p2: Vector3,
  p3: Vector3
): RayCollision {
  return RayCollision.fromBuffer(
    lib.symbols.GetRayCollisionTriangle(
      ray.buffer,
      p1.buffer,
      p2.buffer,
      p3.buffer
    ).buffer as ArrayBuffer
  );
}

export function GetRayCollisionQuad(
  ray: Ray,
  p1: Vector3,
  p2: Vector3,
  p3: Vector3,
  p4: Vector3
): RayCollision {
  return RayCollision.fromBuffer(
    lib.symbols.GetRayCollisionQuad(
      ray.buffer,
      p1.buffer,
      p2.buffer,
      p3.buffer,
      p4.buffer
    ).buffer as ArrayBuffer
  );
}

export function InitAudioDevice(): void {
  lib.symbols.InitAudioDevice();
}
export function CloseAudioDevice(): void {
  lib.symbols.CloseAudioDevice();
}
export function IsAudioDeviceReady(): boolean {
  return !!lib.symbols.IsAudioDeviceReady();
}
export function SetMasterVolume(volume: f32): void {
  lib.symbols.SetMasterVolume(volume);
}
export function GetMasterVolume(): f32 {
  return lib.symbols.GetMasterVolume();
}
export function LoadWave(fileName: string): Wave {
  return Wave.fromBuffer(
    lib.symbols.LoadWave(createStringBuffer(fileName)).buffer as ArrayBuffer
  );
}

export function LoadWaveFromMemory(
  fileType: string,
  fileData: Uint8Array,
  dataSize: i32
): Wave {
  dataSize = (dataSize | 0) as i32;
  return Wave.fromBuffer(
    lib.symbols.LoadWaveFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(fileData.buffer as ArrayBuffer),
      dataSize
    ).buffer as ArrayBuffer
  );
}

export function IsWaveReady(wave: Wave): boolean {
  return !!lib.symbols.IsWaveReady(wave.buffer as ArrayBuffer);
}

export function LoadSound(fileName: string): Sound {
  return Sound.fromBuffer(
    lib.symbols.LoadSound(createStringBuffer(fileName)).buffer as ArrayBuffer
  );
}

export function LoadSoundFromWave(wave: Wave): Sound {
  return Sound.fromBuffer(
    lib.symbols.LoadSoundFromWave(wave.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

export function LoadSoundAlias(source: Sound): Sound {
  return Sound.fromBuffer(
    lib.symbols.LoadSoundAlias(source.buffer as ArrayBuffer)
      .buffer as ArrayBuffer
  );
}

export function IsSoundReady(sound: Sound): boolean {
  return !!lib.symbols.IsSoundReady(sound.buffer as ArrayBuffer);
}

export function UpdateSound(
  sound: Sound,
  data: Uint8Array,
  sampleCount: i32
): void {
  sampleCount = (sampleCount | 0) as i32;
  lib.symbols.UpdateSound(
    sound.buffer as ArrayBuffer,
    Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
    sampleCount
  );
}

export function UnloadWave(wave: Wave): void {
  lib.symbols.UnloadWave(wave.buffer as ArrayBuffer);
}

export function UnloadSound(sound: Sound): void {
  lib.symbols.UnloadSound(sound.buffer as ArrayBuffer);
}

export function UnloadSoundAlias(alias: Sound): void {
  lib.symbols.UnloadSoundAlias(alias.buffer as ArrayBuffer);
}

export function ExportWave(wave: Wave, fileName: string): boolean {
  return !!lib.symbols.ExportWave(
    wave.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}

export function ExportWaveAsCode(wave: Wave, fileName: string): boolean {
  return !!lib.symbols.ExportWaveAsCode(
    wave.buffer as ArrayBuffer,
    createStringBuffer(fileName)
  );
}

export function PlaySound(sound: Sound): void {
  lib.symbols.PlaySound(sound.buffer as ArrayBuffer);
}

export function StopSound(sound: Sound): void {
  lib.symbols.StopSound(sound.buffer as ArrayBuffer);
}

export function PauseSound(sound: Sound): void {
  lib.symbols.PauseSound(sound.buffer as ArrayBuffer);
}

export function ResumeSound(sound: Sound): void {
  lib.symbols.ResumeSound(sound.buffer as ArrayBuffer);
}

export function IsSoundPlaying(sound: Sound): boolean {
  return !!lib.symbols.IsSoundPlaying(sound.buffer as ArrayBuffer);
}

export function SetSoundVolume(sound: Sound, volume: f32): void {
  lib.symbols.SetSoundVolume(sound.buffer as ArrayBuffer, volume);
}

export function SetSoundPitch(sound: Sound, pitch: f32): void {
  lib.symbols.SetSoundPitch(sound.buffer as ArrayBuffer, pitch);
}

export function SetSoundPan(sound: Sound, pan: f32): void {
  lib.symbols.SetSoundPan(sound.buffer as ArrayBuffer, pan);
}

export function WaveCopy(wave: Wave): Wave {
  return Wave.fromBuffer(
    lib.symbols.WaveCopy(wave.buffer as ArrayBuffer).buffer as ArrayBuffer
  );
}

export function WaveCrop(wave: Wave, initSample: i32, finalSample: i32): void {
  initSample = (initSample | 0) as i32;
  finalSample = (finalSample | 0) as i32;
  lib.symbols.WaveCrop(
    Deno.UnsafePointer.of(wave.buffer as ArrayBuffer),
    initSample,
    finalSample
  );
}

export function WaveFormat(
  wave: Wave,
  sampleRate: i32,
  sampleSize: i32,
  channels: i32
): void {
  sampleRate = (sampleRate | 0) as i32;
  sampleSize = (sampleSize | 0) as i32;
  channels = (channels | 0) as i32;
  lib.symbols.WaveFormat(
    Deno.UnsafePointer.of(wave.buffer as ArrayBuffer),
    sampleRate,
    sampleSize,
    channels
  );
}

export function LoadWaveSamples(wave: Wave): Float32Array {
  const result = lib.symbols.LoadWaveSamples(wave.buffer as ArrayBuffer);

  if (!result) return new Float32Array(0);

  // Calculate the number of samples from the wave data
  const waveData = new Uint8Array(wave.buffer);
  const frameCount = new DataView(waveData.buffer).getInt32(0, true); // frameCount is first field
  const sampleCount = frameCount * 2; // Assuming stereo (2 channels)

  // Read the float array from the pointer
  const samples = new Float32Array(sampleCount);
  new Deno.UnsafePointerView(result as Deno.PointerObject).copyInto(
    new Uint8Array(samples.buffer)
  );

  return samples;
}

export function UnloadWaveSamples(samples: Float32Array): void {
  lib.symbols.UnloadWaveSamples(
    Deno.UnsafePointer.of(samples.buffer as ArrayBuffer)
  );
}

export function LoadMusicStream(fileName: string): Music {
  return Music.fromBuffer(
    lib.symbols.LoadMusicStream(createStringBuffer(fileName))
      .buffer as ArrayBuffer
  );
}

export function LoadMusicStreamFromMemory(
  fileType: string,
  data: Uint8Array,
  dataSize: i32
): Music {
  dataSize = (dataSize | 0) as i32;
  return Music.fromBuffer(
    lib.symbols.LoadMusicStreamFromMemory(
      createStringBuffer(fileType),
      Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
      dataSize
    ).buffer as ArrayBuffer
  );
}

export function IsMusicReady(music: Music): boolean {
  return !!lib.symbols.IsMusicReady(music.buffer as ArrayBuffer);
}

export function UnloadMusicStream(music: Music): void {
  lib.symbols.UnloadMusicStream(music.buffer as ArrayBuffer);
}

export function PlayMusicStream(music: Music): void {
  lib.symbols.PlayMusicStream(music.buffer as ArrayBuffer);
}

export function IsMusicStreamPlaying(music: Music): boolean {
  return !!lib.symbols.IsMusicStreamPlaying(music.buffer as ArrayBuffer);
}

export function UpdateMusicStream(music: Music): void {
  lib.symbols.UpdateMusicStream(music.buffer as ArrayBuffer);
}

export function StopMusicStream(music: Music): void {
  lib.symbols.StopMusicStream(music.buffer as ArrayBuffer);
}

export function PauseMusicStream(music: Music): void {
  lib.symbols.PauseMusicStream(music.buffer as ArrayBuffer);
}

export function ResumeMusicStream(music: Music): void {
  lib.symbols.ResumeMusicStream(music.buffer as ArrayBuffer);
}

export function SeekMusicStream(music: Music, position: f32): void {
  lib.symbols.SeekMusicStream(music.buffer as ArrayBuffer, position);
}

export function SetMusicVolume(music: Music, volume: f32): void {
  lib.symbols.SetMusicVolume(music.buffer as ArrayBuffer, volume);
}

export function SetMusicPitch(music: Music, pitch: f32): void {
  lib.symbols.SetMusicPitch(music.buffer as ArrayBuffer, pitch);
}

export function SetMusicPan(music: Music, pan: f32): void {
  lib.symbols.SetMusicPan(music.buffer as ArrayBuffer, pan);
}

export function GetMusicTimeLength(music: Music): f32 {
  return lib.symbols.GetMusicTimeLength(music.buffer as ArrayBuffer);
}

export function GetMusicTimePlayed(music: Music): f32 {
  return lib.symbols.GetMusicTimePlayed(music.buffer as ArrayBuffer);
}

export function LoadAudioStream(
  sampleRate: u32,
  sampleSize: u32,
  channels: u32
): AudioStream {
  sampleRate = (sampleRate | 0) as u32;
  sampleSize = (sampleSize | 0) as u32;
  channels = (channels | 0) as u32;
  return AudioStream.fromBuffer(
    lib.symbols.LoadAudioStream(sampleRate, sampleSize, channels)
      .buffer as ArrayBuffer
  );
}

export function IsAudioStreamReady(stream: AudioStream): boolean {
  return !!lib.symbols.IsAudioStreamReady(stream.buffer as ArrayBuffer);
}

export function UnloadAudioStream(stream: AudioStream): void {
  lib.symbols.UnloadAudioStream(stream.buffer as ArrayBuffer);
}

export function UpdateAudioStream(
  stream: AudioStream,
  data: Uint8Array,
  frameCount: i32
): void {
  frameCount = (frameCount | 0) as i32;
  lib.symbols.UpdateAudioStream(
    stream.buffer as ArrayBuffer,
    Deno.UnsafePointer.of(data.buffer as ArrayBuffer),
    frameCount
  );
}

export function IsAudioStreamProcessed(stream: AudioStream): boolean {
  return !!lib.symbols.IsAudioStreamProcessed(stream.buffer as ArrayBuffer);
}

export function PlayAudioStream(stream: AudioStream): void {
  lib.symbols.PlayAudioStream(stream.buffer as ArrayBuffer);
}

export function PauseAudioStream(stream: AudioStream): void {
  lib.symbols.PauseAudioStream(stream.buffer as ArrayBuffer);
}

export function ResumeAudioStream(stream: AudioStream): void {
  lib.symbols.ResumeAudioStream(stream.buffer as ArrayBuffer);
}

export function IsAudioStreamPlaying(stream: AudioStream): boolean {
  return !!lib.symbols.IsAudioStreamPlaying(stream.buffer as ArrayBuffer);
}

export function StopAudioStream(stream: AudioStream): void {
  lib.symbols.StopAudioStream(stream.buffer as ArrayBuffer);
}

export function SetAudioStreamVolume(stream: AudioStream, volume: f32): void {
  lib.symbols.SetAudioStreamVolume(stream.buffer as ArrayBuffer, volume);
}

export function SetAudioStreamPitch(stream: AudioStream, pitch: f32): void {
  lib.symbols.SetAudioStreamPitch(stream.buffer as ArrayBuffer, pitch);
}

export function SetAudioStreamPan(stream: AudioStream, pan: f32): void {
  lib.symbols.SetAudioStreamPan(stream.buffer as ArrayBuffer, pan);
}

export function SetAudioStreamBufferSizeDefault(size: i32): void {
  size = (size | 0) as i32;
  lib.symbols.SetAudioStreamBufferSizeDefault(size);
}

export function SetAudioStreamCallback(
  stream: AudioStream,
  callback: (bufferData: Uint8Array, frames: i32) => void
): void {
  // Note: AudioCallback is a C function pointer type
  // This is a simplified implementation - in practice, you'd need to
  // create a proper C callback function that can be called from the audio thread
  // For now, this is a placeholder that shows the expected signature
  console.warn("SetAudioStreamCallback: C callback implementation needed");
}

export function AttachAudioStreamProcessor(
  stream: AudioStream,
  processor: (bufferData: Float32Array, frames: i32) => void
): void {
  // Note: AudioCallback is a C function pointer type
  // This is a simplified implementation - in practice, you'd need to
  // create a proper C callback function that can be called from the audio thread
  // For now, this is a placeholder that shows the expected signature
  console.warn("AttachAudioStreamProcessor: C callback implementation needed");
}

export function DetachAudioStreamProcessor(
  stream: AudioStream,
  processor: (bufferData: Float32Array, frames: i32) => void
): void {
  // Note: AudioCallback is a C function pointer type
  // This is a simplified implementation - in practice, you'd need to
  // create a proper C callback function that can be called from the audio thread
  // For now, this is a placeholder that shows the expected signature
  console.warn("DetachAudioStreamProcessor: C callback implementation needed");
}

export function AttachAudioMixedProcessor(
  processor: (bufferData: Float32Array, frames: i32) => void
): void {
  // Note: AudioCallback is a C function pointer type
  // This is a simplified implementation - in practice, you'd need to
  // create a proper C callback function that can be called from the audio thread
  // For now, this is a placeholder that shows the expected signature
  console.warn("AttachAudioMixedProcessor: C callback implementation needed");
}

export function DetachAudioMixedProcessor(
  processor: (bufferData: Float32Array, frames: i32) => void
): void {
  // Note: AudioCallback is a C function pointer type
  // This is a simplified implementation - in practice, you'd need to
  // create a proper C callback function that can be called from the audio thread
  // For now, this is a placeholder that shows the expected signature
  console.warn("DetachAudioMixedProcessor: C callback implementation needed");
}
