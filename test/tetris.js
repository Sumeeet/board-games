/* eslint-disable dot-notation */
/* eslint-disable no-undef */
const assert = require('assert')
const Board = require('../src/tetris/board')
const Constants = require('../src/tetris/constants')
const Block = require('../src/tetris/block')

describe('Tetris', () => {
  context('(Symbols)', () => {
    it('RotateSymbol', () => {
      function rotateSymbols (s, rotate) {
        const block = Block.Block(-1, 3, s)
        const rotBlock = rotate(block, 4)
        block.equal(rotBlock)
      }

      Constants.SYMBOLS.slice(1, 8).forEach(s => rotateSymbols(s, (block, nTimes) => block.rotate90ClockWise(nTimes)))
      Constants.SYMBOLS.slice(1, 8).forEach(s => rotateSymbols(s, (block, nTimes) => block.rotate90AntiClockWise(nTimes)))
    })

    it('GetBoundedSymbolValue', () => {
      let block = Block.Block(-1, 3, 'I')
      assert.deepEqual(block.getBoundedSymbolValue(), [[1, 1, 1, 1]])

      block = Block.Block(-1, 3, 'J')
      assert.deepEqual(block.getBoundedSymbolValue(), [[0, 0, 2], [2, 2, 2]])

      block = Block.Block(-1, 3, 'L')
      assert.deepEqual(block.getBoundedSymbolValue(), [[3, 0, 0], [3, 3, 3]])

      block = Block.Block(-1, 3, 'O')
      assert.deepEqual(block.getBoundedSymbolValue(), [[4, 4], [4, 4]])

      block = Block.Block(-1, 3, 'S')
      assert.deepEqual(block.getBoundedSymbolValue(), [[0, 5, 5], [5, 5, 0]])

      block = Block.Block(-1, 3, 'T')
      assert.deepEqual(block.getBoundedSymbolValue(), [[0, 6, 0], [6, 6, 6]])

      block = Block.Block(-1, 3, 'Z')
      assert.deepEqual(block.getBoundedSymbolValue(), [[7, 7, 0], [0, 7, 7]])
    })

    it('RotateBoundedSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = Constants.SYMBOLS_MAP[symbol]
        return rotate(orgMatrix, 2)
      }

      const expectedBoundedSymbol = [
        [[1, 1, 1, 1]], /* I rotated CW 2 times */
        [[2, 2, 2], [2, 0, 0]], /* J rotated CW 2 times */
        [[3, 3, 3], [0, 0, 3]], /* L rotated CW 2 times */
        [[4, 4], [4, 4]], /* O rotated CW 2 times */
        [[0, 5, 5], [5, 5, 0]], /* S rotated CW 2 times */
        [[6, 6, 6], [0, 6, 0]], /* T rotated CW 2 times */
        [[7, 7, 0], [0, 7, 7]] /* Z rotated CW 2 times */
      ]

      const deepEqual = (actual, expected) => {
        for (let index = 0; index < actual.length; ++index) {
          assert.deepEqual(actual[index], expected[index])
        }
      }

      const rotateSymbCWFunc = (matrix, nTimes) => block.rotate90ClockWise(matrix, nTimes)
      const actualCWBoundedSymbols = Constants.SYMBOLS.slice(1, 8).map(s => rotateSymbols(s, rotateSymbCWFunc)).map(actual => block.getBoundedSymbolValue(actual))
      deepEqual(actualCWBoundedSymbols, expectedBoundedSymbol)

      const rotateSymbACWFunc = (matrix, nTimes) => block.rotate90AntiClockWise(matrix, nTimes)
      const actualACWBoundedSymbols = Constants.SYMBOLS.slice(1, 8).map(s => rotateSymbols(s, rotateSymbACWFunc)).map(actual => block.getBoundedSymbolValue(actual))
      deepEqual(actualACWBoundedSymbols, expectedBoundedSymbol)
    })
  })

  context(('Board'), () => {
    it('fillRandomSymbol', () => {
      const board = Board.Board()
      const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min
      const getRandomCol = (min, max) => getRandomValue(min, max)

      let block
      while (!board.isBoardFull()) {
        const state = board.getState()
        if (state === Constants.BOARDSTATES.Ready) {
          block = Block.Block()
          block.position.column = getRandomCol(0, 10)
          board.moveBlock(block)
        } else if (state === Constants.BOARDSTATES.BlockInMotion) {
          board.moveBlock(block)
        } else if (state === Constants.BOARDSTATES.BlockPlaced) {
          block = Block.Block()
          block.position.column = getRandomCol(0, 10)
          board.setState(Constants.BOARDSTATES.BlockInMotion)
        }
      }
      board.print()
    })

    it('collapseBoardRow', () => {
      const board = Board.Board()

      let block
      // 2 rows of O block
      for (let i = 0; i < 5; ++i) {
        block = Block.Block(20, i * 2, 'O')
        board.moveBlock(block)
      }
      assert.equal(true, board.isBoardEmpty())
      board.print()

      // a row containing L, 180 rotated L, O, 2 I's
      block = Block.Block(20, 0, 'L')
      board.moveBlock(block)

      block = Block.Block(20, 0, 'L')
      block.rotate90ClockWise(2)
      board.moveBlock(block)

      block = Block.Block(20, 0, 'L')
      board.moveBlock(block)

      block = Block.Block(20, 0, 'L')
      board.moveBlock(block)

      block = Block.Block(20, 0, 'L')
      board.moveBlock(block)
      board.print()
    })
  })
})
