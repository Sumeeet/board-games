# Modern Tetris Project Plan

## Project Structure & Bootstrapping
- **Monorepo/Modular Structure:**
  - `/src/core/` — Shared game logic (tetrominoes, board, rules)
  - `/src/2d/` — 2D rendering, input, UI
  - `/src/3d/` — 3D rendering, input, UI
  - `/public/` — HTML, assets
- **ES Modules:** Use ES modules for all code. Set `"type": "module"` in `package.json`.
- **Tooling:** ESLint, Prettier, and a bundler (Vite, Parcel, or Webpack).

## Core Game Logic (Shared)
- Tetromino definitions as 4x4 matrices with ASCII art comments.
- Board as a 2D array, tetromino as an object with position, rotation, and type.
- Handle movement, rotation, collision, line clearing, scoring, and game over in pure JS.

## 2D Implementation
- **Rendering:** HTML5 Canvas for 2D rendering.
- **Input:** Keyboard for movement/rotation, optional touch controls.
- **UI:** Score, next piece, level, pause, and game over overlays.

## 3D Implementation
- **Rendering:** Three.js (WebGL), Babylon.js, or WebGPU.
- **Input:** Keyboard/mouse for movement, rotation, and camera control.
- **UI:** Overlay 2D UI with HTML/CSS or render in 3D space.

## Development Approach
- Start with core logic and unit tests.
- Build 2D first, then 3D.
- Reuse core logic, focus on rendering/input differences.
- Add animations, sound, effects, and responsive UI.

## Optional Enhancements
- Themes/skins, multiplayer, AI, accessibility.

## Libraries & Tools
- **2D:** HTML5 Canvas, PixiJS (optional).
- **3D:** Three.js, Babylon.js, or WebGPU.
- **Testing:** Mocha/Chai or Jest.
- **Bundler:** Vite, Parcel, or Webpack.

## Deployment
- Host on GitHub Pages, Vercel, or Netlify.
- Make it a PWA for installability.

---

**Prompt & Recommendations Saved:**

> Ok like i said earlier i would like rehaul the whole tetris game. So here are my end goals. I would like to develop a tetris game both in 2d and 3d format from scratch. whats your suggestion, dont generate code, because i would like see your approach. Remember you are an experienced game developer and ofcourse i would like to bootstrap this in javascript. I am fine to use webgl or webgpu libs

**(See above for the detailed approach and recommendations.)**
