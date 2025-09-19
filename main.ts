import * as RL from "raylib";

const Screen = {
  width: 1280,
  height: 720,
};

RL.InitWindow(Screen.width, Screen.height, "Raylib");
RL.HideCursor();
RL.SetTargetFPS(60);
let MousePosition;

while (!RL.WindowShouldClose()) {
  MousePosition = RL.GetMousePosition();

  RL.BeginDrawing();
  RL.ClearBackground(RL.BLACK);
  RL.DrawFPS(10, 10);
  RL.DrawCircle(MousePosition.x, MousePosition.y, 100, RL.RED);
  RL.EndDrawing();
}

RL.CloseWindow();
