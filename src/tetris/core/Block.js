// Block.js - Modern Tetris Block class for ES Modules
import { DIRECTION, TETROMINOES } from "./constants.js";

export class Block {
  constructor(type, boardWidth, boardHeight) {
    this.type = type;
    this.shape = TETROMINOES[type].shape;
    this.color = TETROMINOES[type].color;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    // Default position: top center, possibly above visible board
    this.position = {
      x: Math.floor((boardWidth - this.shape[0].length) / 2),
      y: -this.shape.length + 1,
    };
  }

  // Rotates the block in the specified direction
  rotate(direction = DIRECTION.CLOCKWISE) {
    this.shape = Block.#rotateMatrix(this.shape, direction);
  }

  // Get a deep copy of the current shape
  getShape() {
    return this.shape.map((row) => [...row]);
  }

  /**
   * Update the block's position if within boundaries.
   * @param {Object} newPosition - Object with x and y properties.
   * @returns {boolean} True if position updated, false if out of bounds.
   */
  setPosition(newPosition) {
    if (!this.#isWithinBoundaries(newPosition, this.shape)) return false;
    this.position = { ...newPosition };
    return true;
  }

  /**
   * Private method to check if the block is within board boundaries.
   * @param {Object} pos - Position with x and y.
   * @param {Array<Array<number>>} shape - The block's shape matrix.
   * @returns {boolean}
   */
  #isWithinBoundaries(pos, shape) {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = pos.x + x;
          const boardY = pos.y + y;
          if (
            boardX < 0 ||
            boardX >= this.boardWidth ||
            boardY >= this.boardHeight
          ) {
            return false;
          }
        }
      }
    }
    return true;
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
}
