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