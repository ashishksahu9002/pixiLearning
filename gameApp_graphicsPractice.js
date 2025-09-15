const app = new PIXI.Application({
  width: 1080,
  heigth: 720,
  backgroundColor: 0x000000
})

document.body.appendChild(app.view)

globalThis.__PIXI_APP__ = app;

const rootContainer = new PIXI.Container()
app.stage.addChild(rootContainer)

const rectangle = new PIXI.Graphics()
const circle = new PIXI.Graphics()

const colorPalette = [0xff0000, 0x00ff00, 0x0000ff]

const randomColor = ()=> {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)]
}

rectangle.beginFill(0xff0000)
rectangle.drawRect(100,100, 100, 200)
rectangle.endFill()

rectangle.eventMode = 'static'
rectangle.cursor = 'pointer'

rectangle.on('pointerdown', ()=> {
  const color = randomColor()
  rectangle.clear()
  rectangle.beginFill(color)
  rectangle.drawRect(100,100,100,200)
  rectangle.endFill()
})

circle.beginFill(0xff0000)
circle.drawCircle(300,300, 50)
circle.endFill()

circle.eventMode = 'static'
circle.cursor = 'pointer'

circle.on('pointerdown', ()=> {
  const color = randomColor()
  circle.clear()
  circle.beginFill(color)
  circle.drawCircle(300,300, 50)
  circle.endFill()
})

rootContainer.addChild(rectangle, circle)