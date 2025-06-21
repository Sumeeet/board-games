// Block.js - Modern Tetris Block class for ES Modules
import { DIRECTION } from './constants.js';

export class Block {
  constructor(shape, color) {
    // shape: 2D array (e.g. [[0,1,0],[1,1,1],[0,0,0]])
    // color: string (e.g. 'cyan')
    this.shape = shape;
    this.color = color;
  }

  // Rotates the block in the specified direction
  rotate(direction = DIRECTION.CLOCKWISE) {
    this.shape = Block.#rotateMatrix(this.shape, direction);
  }

  // Private static helper to rotate a matrix
  static #rotateMatrix(shape, direction) {
    const len = shape.length;
    const result = Array.from({ length: len }, () => Array(len).fill(0));
    switch (direction) {
      case DIRECTION.CLOCKWISE:
        for (let y = 0; y < len; y++) {
          for (let x = 0; x < len; x++) {
            result[x][len - 1 - y] = shape[y][x];
          }
        }
        break;
      case DIRECTION.ANTICLOCKWISE:
        for (let y = 0; y < len; y++) {
          for (let x = 0; x < len; x++) {
            result[len - 1 - x][y] = shape[y][x];
          }
        }
        break;
      default:
        throw new Error(`Unknown rotation direction: ${direction}`);
    }
    return result;
  }

  // Get a deep copy of the current shape
  getShape() {
    return this.shape.map(row => [...row]);
  }
}
