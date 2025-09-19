import * as RL from "raylib";

// Screen configuration
const Screen = {
  width: 1280,
  height: 720,
};

// Plexus configuration
const NUM_POINTS = 120;
const MAX_LINK_DIST = 130; // pixels

// Types
type Point = { pos: RL.Vector2; vel: RL.Vector2 };

// Entry
setupWindow();
const points = createPlexusPoints(NUM_POINTS, Screen.width, Screen.height);
let frame = 0;

while (!RL.WindowShouldClose()) {
  const mouse = RL.GetMousePosition();
  frame++;

  updatePlexus(points, Screen.width, Screen.height);

  RL.BeginDrawing();
  RL.ClearBackground(RL.BLACK);

  drawHUD();
  drawPlexus(points, frame);
  drawMouseIndicator(mouse);
  drawShapesAndText(frame);

  RL.EndDrawing();
}

RL.CloseWindow();

// ---------- Helpers ----------

function setupWindow(): void {
  RL.InitWindow(Screen.width, Screen.height, "Raylib Deno - Demo");
  RL.HideCursor();
  RL.SetTargetFPS(60);
}

function createPlexusPoints(
  count: number,
  width: number,
  height: number
): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const speed = 0.6 + Math.random() * 0.8;
    const angle = Math.random() * Math.PI * 2;
    out.push({
      pos: new RL.Vector2(x, y),
      vel: new RL.Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed),
    });
  }
  return out;
}

function updatePlexus(points: Point[], width: number, height: number): void {
  for (const p of points) {
    p.pos.x += p.vel.x;
    p.pos.y += p.vel.y;
    if (p.pos.x < 0 || p.pos.x > width) p.vel.x *= -1;
    if (p.pos.y < 0 || p.pos.y > height) p.vel.y *= -1;
  }
}

function drawHUD(): void {
  RL.DrawFPS(10, 10);
  RL.DrawText("Raylib Deno - 2D Demo + Plexus", 10, 36, 22, RL.RAYWHITE);
  RL.DrawText(
    "Move mouse. Plexus animates. Shapes/Text show below.",
    10,
    62,
    16,
    RL.LIGHTGRAY
  );
}

function drawPlexus(points: Point[], frame: number): void {
  for (let i = 0; i < points.length; i++) {
    const a = points[i].pos;

    // Node (round coordinates to int for FFI safety)
    const nodeRadius = 2 + (Math.sin((frame + i * 7) * 0.05) + 1) * 1.2;
    RL.DrawCircle(Math.round(a.x), Math.round(a.y), nodeRadius, RL.GRAY);

    // Links
    for (let j = i + 1; j < points.length; j++) {
      const b = points[j].pos;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MAX_LINK_DIST) {
        const t = 1 - dist / MAX_LINK_DIST; // 0..1
        const alpha = Math.min(255, Math.max(0, Math.floor(200 * t)));
        RL.DrawLine(
          Math.floor(a.x),
          Math.floor(a.y),
          Math.floor(b.x),
          Math.floor(b.y),
          new RL.Color(200, 200, 200, alpha)
        );
      }
    }
  }
}

function drawMouseIndicator(mouse: RL.Vector2): void {
  RL.DrawCircle(Math.floor(mouse.x), Math.floor(mouse.y), 8, RL.YELLOW);
}

function drawShapesAndText(frame: number): void {
  const baseY = 420;

  // Rectangles (ints expected)
  RL.DrawRectangle(40, baseY - 40, 120, 80, RL.DARKBLUE);
  RL.DrawRectangleLines(40, baseY - 40, 120, 80, RL.SKYBLUE);

  // Circles (center ints, radius float)
  const rPulse = 28 + Math.sin(frame * 0.07) * 6;
  RL.DrawCircle(220, baseY, rPulse, RL.DARKGREEN);
  RL.DrawCircleLines(220, baseY, 36, RL.LIME);

  // Lines (ints expected)
  RL.DrawLine(280, baseY - 40, 360, baseY + 40, RL.RED);
  RL.DrawLine(360, baseY - 40, 280, baseY + 40, RL.ORANGE);

  // Triangle (Vector2-based)
  RL.DrawTriangle(
    new RL.Vector2(420, baseY - 48),
    new RL.Vector2(380, baseY + 44),
    new RL.Vector2(460, baseY + 44),
    RL.MAGENTA
  );

  // Polygon (Vector2 center, sides int, radius/rotation float)
  const rotation = (frame * 0.9) % 360;
  RL.DrawPoly(new RL.Vector2(540, baseY + 4), 6, 36, rotation, RL.GOLD);

  // Rounded rectangle (Rectangle + floats)
  RL.DrawRectangleRounded(
    new RL.Rectangle(600, baseY - 36, 120, 72),
    0.3,
    8,
    RL.BEIGE
  );
  RL.DrawRectangleRoundedLines(
    new RL.Rectangle(600, baseY - 36, 120, 72),
    0.3,
    8,
    2,
    RL.BROWN
  );

  // Text
  RL.DrawText("Shapes:", 40, baseY - 80, 20, RL.WHITE);
  RL.DrawText("Text sizes: 12, 20, 28", 40, baseY + 80, 12, RL.LIGHTGRAY);
  RL.DrawText("Sample Text 20", 240, baseY + 70, 20, RL.RAYWHITE);
  RL.DrawText("Sample Text 28", 420, baseY + 60, 28, RL.YELLOW);
}
