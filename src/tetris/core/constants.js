// Tetromino definitions for Tetris (4x4 grid)
// Each shape uses 1 for filled, 0 for empty. Color is for rendering.
// ASCII art above each for clarity.

export const TETROMINOES = {
  // I
  // ....
  // ....
  // ####
  // ....
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00ffff", // Cyan
  },
  // J
  // #...
  // ###.
  // ....
  // ....
  J: {
    shape: [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#0000ff", // Blue
  },
  // L
  // ..#.
  // ###.
  // ....
  // ....
  L: {
    shape: [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#ff7f00", // Orange
  },
  // O
  // .##.
  // .##.
  // ....
  // ....
  O: {
    shape: [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#ffff00", // Yellow
  },
  // S
  // .##.
  // ##..
  // ....
  // ....
  S: {
    shape: [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00ff00", // Green
  },
  // T
  // .#..
  // ###.
  // ....
  // ....
  T: {
    shape: [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#800080", // Purple
  },
  // Z
  // ##..
  // .##.
  // ....
  // ....
  Z: {
    shape: [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#ff0000", // Red
  },
};
Object.freeze(TETROMINOES);

export const DIRECTION = Object.freeze({
  CLOCKWISE: "clockwise",
  ANTICLOCKWISE: "anticlockwise",
});
