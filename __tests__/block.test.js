/* eslint-env jest */
// Example test for Block class
import { Block } from "tetris/core/Block.js";
import { DIRECTION } from "tetris/core/constants.js";

describe("Block rotation", () => {
  it("rotates a T tetromino clockwise", () => {
    const block = new Block("T", 10, 20); // Use type string and board size
    const original = block.getShape();
    block.rotate(DIRECTION.CLOCKWISE);
    expect(block.getShape()).not.toEqual(original);
  });

  it("rotates a T tetromino anticlockwise", () => {
    const block = new Block("T", 10, 20); // Use type string and board size
    const original = block.getShape();
    block.rotate(DIRECTION.ANTICLOCKWISE);
    expect(block.getShape()).not.toEqual(original);
  });
});
