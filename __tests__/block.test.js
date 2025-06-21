// Example test for Block class
import { Block } from '../modern-tetris/src/core/Block.js';
import { DIRECTION, TETROMINOES } from '../modern-tetris/src/core/constants.js';

describe('Block rotation', () => {
  it('rotates a T tetromino clockwise', () => {
    const block = new Block(TETROMINOES.T.shape, TETROMINOES.T.color);
    const original = block.getShape();
    block.rotate(DIRECTION.CLOCKWISE);
    expect(block.getShape()).not.toEqual(original);
  });

  it('rotates a T tetromino anticlockwise', () => {
    const block = new Block(TETROMINOES.T.shape, TETROMINOES.T.color);
    const original = block.getShape();
    block.rotate(DIRECTION.ANTICLOCKWISE);
    expect(block.getShape()).not.toEqual(original);
  });
});
