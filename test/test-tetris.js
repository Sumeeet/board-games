/* eslint-disable no-undef */

const assert = require('assert')
const constants = require('../src/tetris/constants')
const op = require('../src/tetris/operations')

describe('TetrisUnitTest', () => {
  context('(TetrominoesOps)', () => {
    const ops = op.Operations()
    const assertRotate = ops.curry((rotate, t) => {
      const matrix = constants.SYMBOLS_MAP[t]
      assert.deepEqual(rotate(matrix), matrix)
    })
    it('RotateClockWise', () => {
      ops.forEach(assertRotate(ops.rotateClockwise(4)), constants.SYMBOLS.slice(1, 8))
    })

    it('RotateAntiClockWise', () => {
      ops.forEach(assertRotate(ops.rotateAntiClockwise(0)), constants.SYMBOLS.slice(1, 8))
    })

    it('Transpose', () => {
      const tetrominoI = ops.transpose(constants.SYMBOLS_MAP.I)
      assert.deepEqual(tetrominoI,
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ]
      )
    })

    it('TransposeofTranpose', () => {
      const tetrominoI = ops.transpose(ops.transpose(constants.SYMBOLS_MAP.I))
      assert.deepEqual(tetrominoI, constants.SYMBOLS_MAP.I)
    })

    it('CollapseTetrominoes', () => {
      assert.deepEqual(tetrominoI, constants.SYMBOLS_MAP.I)
    })
  })
})
