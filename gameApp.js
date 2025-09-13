const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
});

document.body.appendChild(app.view);
globalThis.__PIXI_APP__ = app;

const rootContainer = new PIXI.Container();
rootContainer.name = "rootContainer";
app.stage.addChild(rootContainer);

let bunnyTexture;

PIXI.Assets.load("./assets/bunny.png").then((texture) => {
  bunnyTexture = texture;
  createBunny();
  console.log("bunny loaded");
});

function createBunny() {
  const group = new PIXI.Container();
  group.name = "group";
  group.x = app.screen.width / 2;
  group.y = app.screen.height / 2;
  rootContainer.addChild(group);

  for (let i = 0; i < 3; i++) {
    const bunny = new PIXI.Sprite(bunnyTexture);
    bunny.anchor.set(0.5);
    bunny.name = `bunny${i + 1}`;
    bunny.x = (i - 1) * 120; // positions: -120, 0, +120
    bunny.y = 0;

    bunny.eventMode = "static";
    bunny.cursor = "pointer";

    bunny.on("pointerenter", () => {
      group.scale.set(1.2);
    });

    bunny.on("pointerleave", () => {
      group.scale.set(1);
    });

    group.addChild(bunny);
  }

  const rotationText = new PIXI.Text("Rotation : 0°", {
    fontSize: 30,
    fill: 0xffffff,
  });

  rotationText.x = 10;
  rotationText.y = 10;

  rootContainer.addChild(rotationText);

  app.ticker.add((delta) => {
    group.rotation += delta * 0.01;
    const deg = ((group.rotation * 180) / Math.PI) % 360;
    rotationText.text = `Rotation: ${deg.toFixed(2)}°`;
  });
}
