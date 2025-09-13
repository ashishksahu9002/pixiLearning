# 🎮 PixiJS Course
**Topic:** Bootstrapping & First Sprite  

---

## 🔑 Concepts Learned
- **`PIXI.Application`** → Creates the renderer, ticker, and canvas.  
- **`PIXI.Assets`** → Loads textures and other resources (async).  
- **`PIXI.Sprite`** → A basic renderable image object.  
- **`anchor`** → Defines the origin point of a sprite (0,0 = top-left; 0.5,0.5 = center).  
- **`stage`** → The root container for everything in your scene.  

---

## 📝 Task
1. Create a Pixi Application (800×600, black background).  
2. Load `bunny.png` using `PIXI.Assets.load`.  
3. Create a `PIXI.Sprite` from the texture.  
4. Set its anchor to center (`0.5, 0.5`).  
5. Position it at the center of the screen.  
6. Add it to the stage. 

---

## ✅ Result
When you open the page, you should see a **bunny sprite centered** on a black canvas.  

---

**Topic:** Containers & Transforms  

---

## 🔑 Concepts Learned
- **`Container`** → Groups multiple sprites into one unit.  
- **Transforms** → `position`, `rotation`, `scale`.  
- **Hierarchy** → child sprites inherit parent transformations.  
- **`app.ticker`** → Game loop for continuous updates.  

---

## 📝 Task
1. Create a `Container` named `group`.  
2. Add **3 bunny sprites** inside the container.  
3. Position them horizontally (-120, 0, +120).  
4. Center the container on screen.  
5. Rotate the container using `app.ticker`.  
6. Add a `Text` UI showing current rotation in degrees. 

---

## ✅ Result
Three bunnies rotate around the center. A text label displays the container’s rotation angle in degrees.

---

**Topic:** Graphics & Text  

---

## 🔑 Concepts Learned
- **`PIXI.Graphics`** → draw shapes (rectangles, circles, polygons, lines).  
- **`PIXI.Text`** → render dynamic text for UI.  
- **Events on Graphics** → shapes can be interactive like sprites.  
- **Scene layering** → combine sprites, shapes, and text together.  

---

## 📝 Task
1. Draw a **blue rectangle** at the top of the screen (like a HUD bar).  
2. Draw a **red circle** in the center of the screen.  
3. Add a **score counter** (`Score: 0`) in the top-left corner.  
4. Make the circle clickable → each click increases the score by 1 and updates the text.  

---

## ✅ Result
The canvas shows:  
- A blue bar at the top  
- A red circle in the middle  
- A score label in the top-left  
- Each click on the circle increases the score  

---

**Topic:** Pointer Events & Drag/Drop  

---

## 🔑 Concepts Learned
- **`eventMode`** → enables interactivity (`"static"` or `"dynamic"` in v7, replaces old `.interactive = true`).  
- **Pointer Events** → `pointerdown`, `pointermove`, `pointerup`, `pointerupoutside`.  
- **Dragging Pattern** → 
  - On `pointerdown`: mark sprite as dragging.  
  - On `pointermove`: update position if dragging.  
  - On `pointerup` or `pointerupoutside`: stop dragging.  
- **Cursor Styles** → `sprite.cursor = "pointer"` shows a hand icon on hover.  

---

## 📝 Task
1. Load **`bunny.png`**.  
2. Add a bunny sprite to the center of the screen.  
3. Make the bunny **draggable** with the mouse.  
   - Hold left-click to drag.  
   - Release mouse to drop.  
   - If released outside canvas, stop dragging gracefully.  
4. Change the cursor style on hover.  

---

## ✅ Result
You can click and drag the bunny around the canvas, and it drops smoothly when released.  

---