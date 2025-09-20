import * as RL from "raylib";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const SCREEN_CONFIG = {
  width: 1280,
  height: 720,
  targetFPS: 60,
} as const;

const PLEXUS_CONFIG = {
  numPoints: 120,
  maxLinkDistance: 130, // pixels
  nodeRadius: 2,
  nodeRadiusVariation: 1.2,
  linkAlpha: 200,
} as const;

const ANIMATION_SPEEDS = {
  cube: 0.02,
  sphere: 0.015,
  cylinder: 0.025,
  line: 0.01,
  points: 0.005,
  extraCube: 0.03,
  triangles: 0.012,
  camera: 0.3,
  cameraHeight: 0.2,
} as const;

// ============================================================================
// 3D SCENE SETUP
// ============================================================================

const CAMERA = new RL.Camera3D(
  new RL.Vector3(0, 10, 10), // position
  new RL.Vector3(0, 0, 0), // target
  new RL.Vector3(0, 1, 0), // up
  45, // fovy
  RL.CameraProjection.CAMERA_PERSPECTIVE // projection
);

const OBJECT_POSITIONS = {
  cube: new RL.Vector3(0, 0, 0),
  sphere: new RL.Vector3(3, 0, 0),
  cylinder: new RL.Vector3(-3, 0, 0),
} as const;

// ============================================================================
// TYPES
// ============================================================================

interface PlexusPoint {
  pos: RL.Vector2;
  vel: RL.Vector2;
}

// ============================================================================
// MAIN PROGRAM
// ============================================================================

function main(): void {
  // Initialize window and create plexus points
  setupWindow();
  const plexusPoints = createPlexusPoints(
    PLEXUS_CONFIG.numPoints,
    SCREEN_CONFIG.width,
    SCREEN_CONFIG.height
  );

  let frameCount = 0;

  // Main game loop
  while (!RL.WindowShouldClose()) {
    const mousePosition = RL.GetMousePosition();
    frameCount++;

    // Update systems
    updatePlexus(plexusPoints, SCREEN_CONFIG.width, SCREEN_CONFIG.height);
    updateCamera();

    // Begin rendering
    RL.BeginDrawing();
    RL.ClearBackground(RL.BLACK);

    drawPlexus(plexusPoints, frameCount);

    // Render 3D scene
    RL.BeginMode3D(CAMERA);
    draw3DScene(frameCount);
    RL.EndMode3D();

    // Render 2D overlay
    drawHUD();
    drawMouseIndicator(mousePosition);
    drawShapesAndText(frameCount);

    RL.EndDrawing();
  }

  RL.CloseWindow();
}

// Start the program
main();

// ============================================================================
// WINDOW AND INITIALIZATION
// ============================================================================

function setupWindow(): void {
  RL.InitWindow(
    SCREEN_CONFIG.width,
    SCREEN_CONFIG.height,
    "Raylib Deno - Demo"
  );
  RL.HideCursor();
  RL.SetTargetFPS(SCREEN_CONFIG.targetFPS);
}

// ============================================================================
// PLEXUS SYSTEM
// ============================================================================

function createPlexusPoints(
  count: number,
  width: number,
  height: number
): PlexusPoint[] {
  const points: PlexusPoint[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const speed = 0.6 + Math.random() * 0.8;
    const angle = Math.random() * Math.PI * 2;

    points.push({
      pos: new RL.Vector2(x, y),
      vel: new RL.Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed),
    });
  }

  return points;
}

function updatePlexus(
  points: PlexusPoint[],
  width: number,
  height: number
): void {
  for (const point of points) {
    // Update position
    point.pos.x += point.vel.x;
    point.pos.y += point.vel.y;

    // Bounce off screen edges
    if (point.pos.x < 0 || point.pos.x > width) {
      point.vel.x *= -1;
    }
    if (point.pos.y < 0 || point.pos.y > height) {
      point.vel.y *= -1;
    }
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

function drawPlexus(points: PlexusPoint[], frame: number): void {
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i].pos;

    // Draw pulsing node
    const nodeRadius =
      PLEXUS_CONFIG.nodeRadius +
      (Math.sin((frame + i * 7) * 0.05) + 1) *
        PLEXUS_CONFIG.nodeRadiusVariation;

    RL.DrawCircle(
      Math.floor(pointA.x),
      Math.floor(pointA.y),
      nodeRadius,
      RL.GRAY
    );

    // Draw connections to nearby points
    for (let j = i + 1; j < points.length; j++) {
      const pointB = points[j].pos;
      const distance = Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);

      if (distance < PLEXUS_CONFIG.maxLinkDistance) {
        const linkStrength = 1 - distance / PLEXUS_CONFIG.maxLinkDistance; // 0..1
        const alpha = Math.min(
          255,
          Math.max(0, Math.floor(PLEXUS_CONFIG.linkAlpha * linkStrength))
        );

        RL.DrawLine(
          Math.floor(pointA.x),
          Math.floor(pointA.y),
          Math.floor(pointB.x),
          Math.floor(pointB.y),
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
  // Position shapes at bottom of viewport
  const baseY = SCREEN_CONFIG.height - 100; // 100 pixels from bottom

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

  // Text information above the shapes
  let NewBaseY = baseY - 260;
  RL.DrawText("2D Shapes:", 10, NewBaseY - 40, 20, RL.WHITE);
  RL.DrawText("Text Sizes & Colors:", 10, NewBaseY - 15, 16, RL.WHITE);
  RL.DrawText("Size 12 - Light Gray", 10, NewBaseY + 5, 12, RL.LIGHTGRAY);
  RL.DrawText("Size 20 - Ray White", 10, NewBaseY + 25, 20, RL.RAYWHITE);
  RL.DrawText("Size 28 - Yellow", 10, NewBaseY + 45, 28, RL.YELLOW);
}

// ============================================================================
// 3D RENDERING
// ============================================================================

function updateCamera(): void {
  const time = RL.GetTime();
  const orbitRadius = 15;
  const baseHeight = 8;
  const heightVariation = 3;

  // Orbit around the scene
  CAMERA.position.x = Math.cos(time * ANIMATION_SPEEDS.camera) * orbitRadius;
  CAMERA.position.z = Math.sin(time * ANIMATION_SPEEDS.camera) * orbitRadius;
  CAMERA.position.y =
    baseHeight +
    Math.sin(time * ANIMATION_SPEEDS.cameraHeight) * heightVariation;

  // Always look at the center
  CAMERA.target.x = 0;
  CAMERA.target.y = 0;
  CAMERA.target.z = 0;
}

function draw3DScene(frame: number): void {
  // Draw reference grid
  RL.DrawGrid(20, 1);

  // Animated cube - circular motion
  const cubeRotation = frame * ANIMATION_SPEEDS.cube;
  const cubeOffset = new RL.Vector3(
    Math.cos(cubeRotation) * 1,
    0,
    Math.sin(cubeRotation) * 1
  );
  const animatedCubePos = new RL.Vector3(
    OBJECT_POSITIONS.cube.x + cubeOffset.x,
    OBJECT_POSITIONS.cube.y + cubeOffset.y,
    OBJECT_POSITIONS.cube.z + cubeOffset.z
  );
  RL.DrawCube(animatedCubePos, 2, 2, 2, RL.RED);
  RL.DrawCubeWires(animatedCubePos, 2, 2, 2, RL.DARKRED);

  // Animated sphere - orbital motion
  const sphereRotation = frame * ANIMATION_SPEEDS.sphere;
  const sphereOffset = new RL.Vector3(
    Math.cos(sphereRotation) * 0.5,
    0,
    Math.sin(sphereRotation) * 0.5
  );
  const animatedSpherePos = new RL.Vector3(
    OBJECT_POSITIONS.sphere.x + sphereOffset.x,
    OBJECT_POSITIONS.sphere.y + sphereOffset.y,
    OBJECT_POSITIONS.sphere.z + sphereOffset.z
  );
  RL.DrawSphere(animatedSpherePos, 1, RL.BLUE);
  RL.DrawSphereWires(animatedSpherePos, 1, 8, 8, RL.DARKBLUE);

  // Animated cylinder - height variation
  const cylinderAnimation = frame * ANIMATION_SPEEDS.cylinder;
  const cylinderHeight = 2 + Math.sin(cylinderAnimation) * 0.5;
  RL.DrawCylinder(
    OBJECT_POSITIONS.cylinder,
    0.5,
    0.5,
    cylinderHeight,
    8,
    RL.GREEN
  );
  RL.DrawCylinderWires(
    OBJECT_POSITIONS.cylinder,
    0.5,
    0.5,
    cylinderHeight,
    8,
    RL.DARKGREEN
  );

  // Animated 3D line
  const lineRotation = frame * ANIMATION_SPEEDS.line;
  const lineStart = new RL.Vector3(
    -5 + Math.cos(lineRotation) * 2,
    2 + Math.sin(lineRotation) * 1,
    0
  );
  const lineEnd = new RL.Vector3(
    5 + Math.cos(lineRotation + Math.PI) * 2,
    2 + Math.sin(lineRotation + Math.PI) * 1,
    0
  );
  RL.DrawLine3D(lineStart, lineEnd, RL.YELLOW);

  // 3D points in wave pattern
  for (let i = 0; i < 5; i++) {
    const angle = (frame * ANIMATION_SPEEDS.points + i) * 0.5;
    const radius = 3;
    const pointPos = new RL.Vector3(
      Math.cos(angle) * radius,
      Math.sin(frame * ANIMATION_SPEEDS.points + i) * 2,
      Math.sin(angle) * radius
    );
    RL.DrawPoint3D(pointPos, RL.MAGENTA);
  }

  // Ground plane
  const planeCenter = new RL.Vector3(0, -2, 0);
  const planeSize = new RL.Vector2(10, 10);
  RL.DrawPlane(planeCenter, planeSize, RL.GRAY);

  // Additional animated cube - vertical bounce
  const extraAnimation = frame * ANIMATION_SPEEDS.extraCube;
  const extraPos = new RL.Vector3(0, 3 + Math.sin(extraAnimation) * 1, 0);
  const extraSize = new RL.Vector3(1, 1, 1);
  RL.DrawCubeV(extraPos, extraSize, RL.PURPLE);
  RL.DrawCubeWiresV(extraPos, extraSize, RL.VIOLET);

  // Rotating triangles around the scene
  const triangleRotation = frame * ANIMATION_SPEEDS.triangles;
  for (let i = 0; i < 3; i++) {
    const angle = triangleRotation + (i * Math.PI * 2) / 3;
    const radius = 4;
    const trianglePos = new RL.Vector3(
      Math.cos(angle) * radius,
      1,
      Math.sin(angle) * radius
    );
    RL.DrawTriangle3D(
      new RL.Vector3(trianglePos.x, trianglePos.y + 0.5, trianglePos.z),
      new RL.Vector3(trianglePos.x - 0.5, trianglePos.y - 0.5, trianglePos.z),
      new RL.Vector3(trianglePos.x + 0.5, trianglePos.y - 0.5, trianglePos.z),
      RL.ORANGE
    );
  }
}
