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

const hud = new PIXI.Container();
hud.x = app.screen.width / 2;
hud.y = 20;
rootContainer.addChild(hud);

const rectangle = new PIXI.Graphics();
rectangle.beginFill(0x0000ff);
rectangle.drawRect(0, 0, app.screen.width, 50);
rectangle.endFill();
rectangle.pivot.set(rectangle.width / 2, rectangle.height / 2);

hud.addChild(rectangle);

const mid = new PIXI.Container();
mid.x = app.screen.width / 2;
mid.y = app.screen.height / 2;
rootContainer.addChild(mid);

const circle = new PIXI.Graphics();
circle.beginFill(0xff0000);
circle.drawCircle(0, 0, 20);
circle.endFill();
circle.pivot.set(circle.width / 2, circle.height / 2);

mid.addChild(circle);

circle.eventMode = "static";
circle.cursor = "pointer";

let score = 0;

const scoreText = new PIXI.Text("Score : 0", {
  fontSize: 20,
  align: "center",
  fill: 0xffffff,
});
scoreText.x = 10;
scoreText.y = 10;

rootContainer.addChild(scoreText);

circle.on("pointerdown", () => {
  score++;
  scoreText.text = `Score : ${score}`;
});
