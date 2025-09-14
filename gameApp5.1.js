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

// state / velocities (signed)
let vx = 3; // px per tick (logical velocity)
let vy = 2;
let directionX = Math.sign(vx) || 1;
let directionY = Math.sign(vy) || 1;
let speedMultiplier = parseFloat(speedRange.value);
let paused = false;

// dash helpers
let dashTimer = null;
let dashOriginal = null; // saved {vx, vy} during dash

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
PIXI.Assets.load("./assets/bunny.png")
  .then((texture) => {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    root.addChild(bunny);

    // cache half sizes
    const halfW = bunny.width / 2;
    const halfH = bunny.height / 2;

    // ticker-driven movement & debug
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

      // bounce & clamp edges (flip sign and update direction flags)
      if (bunny.x > app.screen.width - halfW) {
        bunny.x = app.screen.width - halfW;
        vx *= -1;
        directionX *= -1;
      } else if (bunny.x < halfW) {
        bunny.x = halfW;
        vx *= -1;
        directionX *= -1;
      }
      if (bunny.y > app.screen.height - halfH) {
        bunny.y = app.screen.height - halfH;
        vy *= -1;
        directionY *= -1;
      } else if (bunny.y < halfH) {
        bunny.y = halfH;
        vy *= -1;
        directionY *= -1;
      }

      // OPTIONAL: make bunny face movement direction
      // if you want the bunny to rotate toward movement, uncomment:
      bunny.rotation = Math.atan2(vy*speedMultiplier, vx*speedMultiplier);

      // debug UI
      multiplierText.text = `Mult: ${speedMultiplier.toFixed(1)}`;
      deltaText.text = `Delta: ${delta.toFixed(2)}`;
      speedX.text = `Speed X: ${(vx * speedMultiplier * delta).toFixed(1)}`;
      speedY.text = `Speed Y: ${(vy * speedMultiplier * delta).toFixed(1)}`;
      fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
    });
  })
  .catch((err) => {
    console.error("Failed to load bunny:", err);
  });

// UI binding
  speedRange.addEventListener("input", (e) => {
    speedMultiplier = parseFloat(e.target.value);
  });

  // keyboard controls & improved dash
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
      // DASH: short-lived boost in the actual movement direction.
      // If a dash is active, cancel and restore original first.
      if (dashTimer) {
        clearTimeout(dashTimer);
        dashTimer = null;
        if (dashOriginal) {
          vx = dashOriginal.vx;
          vy = dashOriginal.vy;
          dashOriginal = null;
        }
      }

      // compute current speed and normalized direction
      const speed = Math.hypot(vx, vy);
      let nx = 0, ny = 0;
      if (speed === 0) {
        // fallback: use last known direction flags (or default to right)
        nx = directionX || 1;
        ny = directionY || 0;
      } else {
        nx = vx / speed;
        ny = vy / speed;
      }

      // save the original velocity vector for restore
      dashOriginal = { vx, vy };

      // apply dash: boost magnitude while preserving direction
      const dashFactor = 3;
      const dashedSpeed = Math.max(0.0001, speed) * dashFactor; // avoid zero
      vx = nx * dashedSpeed;
      vy = ny * dashedSpeed;

      // restore after short time
      dashTimer = setTimeout(() => {
        if (dashOriginal) {
          vx = dashOriginal.vx;
          vy = dashOriginal.vy;
          dashOriginal = null;
        }
        dashTimer = null;
      }, 220); // 220ms dash
    }
  });
