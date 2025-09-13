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

PIXI.Assets.load("./assets/bunny.png").then((texture) => {
  draggableBunny(texture);
  console.log("bunny loaded");
});

function draggableBunny(texture) {
  const bunny = new PIXI.Sprite(texture);
  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  rootContainer.addChild(bunny);

  bunny.eventMode = "static";
  bunny.cursor = "pointer";

  let dragData = null;

  bunny
    .on("pointerdown", (event) => {
      dragData = event.data;
      console.log("dragData : ", dragData);
    })
    .on("pointerup", () => {
      dragData = null;
    })
    .on("pointerupoutside", () => {
      dragData = null;
    })
    .on("pointermove", () => {
      if (dragData) {
        const pos = dragData.getLocalPosition(bunny.parent);
        bunny.x = pos.x;
        bunny.y = pos.y;
      }
    });
}
