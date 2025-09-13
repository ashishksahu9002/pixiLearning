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
  const bunnySprite = new PIXI.Sprite(bunnyTexture);

  bunnySprite.anchor.set(0.5);
  bunnySprite.x = app.screen.width / 2;
  bunnySprite.y = app.screen.height / 2;

  rootContainer.addChild(bunnySprite);
}
