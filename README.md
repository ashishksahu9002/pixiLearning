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