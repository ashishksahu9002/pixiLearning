const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);
globalThis.__PIXI_APP__ = app;

// UI
const uiWrap = document.createElement("div");
uiWrap.style.position = "absolute";
uiWrap.style.left = "12px";
uiWrap.style.top = "12px";
uiWrap.style.color = "#fff";
uiWrap.style.fontFamily = "Arial, sans-serif";
uiWrap.innerHTML = `
  <label for="speedRange">Speed Multiplier</label>
  <input id="speedRange" type="range" min="0.2" max="4" step="0.1" value="1" style="vertical-align:middle; margin-left:8px;">
`;
document.body.appendChild(uiWrap);
const speedRange = document.getElementById("speedRange");

// root
const root = new PIXI.Container();
app.stage.addChild(root);

// state
let vx = 3; // signed x velocity (px per tick)
let vy = 2; // signed y velocity
let directionX = 1;
let directionY = 1;
let speedMultiplier = parseFloat(speedRange.value);
let paused = false;

// debug texts
const multiplierText = new PIXI.Text(`Mult: ${speedMultiplier.toFixed(1)}`, {
  fill: 0xffffff,
  fontSize: 16,
});
multiplierText.x = 12;
multiplierText.y = app.screen.height - 32;
root.addChild(multiplierText);

const deltaText = new PIXI.Text("Delta : 0", { fill: 0xffffff, fontSize: 16 });
deltaText.x = 112;
deltaText.y = app.screen.height - 32;
root.addChild(deltaText);

const speedX = new PIXI.Text("Speed X : 0", { fill: 0xffffff, fontSize: 16 });
speedX.x = 212;
speedX.y = app.screen.height - 32;
root.addChild(speedX);

const speedY = new PIXI.Text("Speed Y : 0", { fill: 0xffffff, fontSize: 16 });
speedY.x = 362;
speedY.y = app.screen.height - 32;
root.addChild(speedY);

const fpsText = new PIXI.Text("FPS: 0", { fill: 0xffffff, fontSize: 14 });
fpsText.x = app.screen.width - 90;
fpsText.y = 6;
root.addChild(fpsText);

// load bunny
PIXI.Assets.load("./assets/bunny.png").then((texture) => {
  const bunny = new PIXI.Sprite(texture);
  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  root.addChild(bunny);

  // cache half sizes
  const halfW = bunny.width / 2;
  const halfH = bunny.height / 2;

  app.ticker.add((delta) => {
    if (paused) {
      fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
      return;
    }

    // move (signed velocities * delta * speedMultiplier)
    const dx = vx * delta * speedMultiplier;
    const dy = vy * delta * speedMultiplier;
    bunny.x += dx;
    bunny.y += dy;

    // bounce with clamping to edge so sprite can't get stuck outside bounds
    if (bunny.x > app.screen.width - halfW) {
      bunny.x = app.screen.width - halfW;
      vx *= -1;
      directionX *= -1
    } else if (bunny.x < halfW) {
      bunny.x = halfW;
      vx *= -1;
      directionX *= -1
    }
    if (bunny.y > app.screen.height - halfH) {
      bunny.y = app.screen.height - halfH;
      vy *= -1;
      directionY *= -1
    } else if (bunny.y < halfH) {
      bunny.y = halfH;
      vy *= -1;
      directionY *= -1
    }

    // OPTIONAL: make bunny face movement direction (uncomment if desired)
    // bunny.rotation = Math.atan2(dy, dx);

    // update debug UI
    multiplierText.text = `Mult: ${speedMultiplier.toFixed(1)}`;
    deltaText.text = `Delta: ${delta.toFixed(2)}`;
    speedX.text = `Speed X: ${dx.toFixed(1)}`;
    speedY.text = `Speed Y: ${dy.toFixed(1)}`;
    fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
  });
});

// UI binding
speedRange.addEventListener("input", (e) => {
  speedMultiplier = parseFloat(e.target.value);
});

let dashTimer;

// keyboard controls
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    speedMultiplier = Math.min(4, speedMultiplier + 0.1);
    speedRange.value = String(speedMultiplier);
  } else if (e.key === "ArrowDown") {
    speedMultiplier = Math.max(0.2, speedMultiplier - 0.1);
    speedRange.value = String(speedMultiplier);
  } else if (e.key === "p" || e.key === "P") {
    paused = !paused;
  } else if (e.code === "Space") {
    // dash: temporarily multiply velocities for a short time
    if (dashTimer) {
      clearTimeout(dashTimer);
      vx = 3 * directionX;
      vy = 2 * directionY;
    }
    const dashFactor = 3;
    const oldVx = vx,
      oldVy = vy;
    vx *= dashFactor * directionX;
    vy *= dashFactor * directionY;
    dashTimer = setTimeout(() => {
      vx = oldVx * directionX;
      vy = oldVy * directionY;
    }, 220); // 220 ms dash
  }
});
