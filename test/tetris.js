/* eslint-disable dot-notation */
/* eslint-disable no-undef */
const assert = require('assert')
const Board = require('../src/tetris/board')
const Constants = require('../src/tetris/constants')
const Block = require('../src/tetris/block')

describe('Tetris', () => {
  context('(Symbols)', () => {
    const block = Block.Block()
    it('RotateSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = Constants.SYMBOLS_MAP[symbol]
        const rotMatrix = rotate(orgMatrix, 4)
        assert.deepEqual(orgMatrix, rotMatrix)
      }

      Constants.SYMBOLS.slice(1, 8).forEach(s => rotateSymbols(s, (matrix, nTimes) => block.rotate90ClockWise(matrix, nTimes)))
      Constants.SYMBOLS.slice(1, 8).forEach(s => rotateSymbols(s, (matrix, nTimes) => block.rotate90AntiClockWise(matrix, nTimes)))
    })

    it('GetBoundedSymbolValue', () => {
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['L']), [[0, 0, 1], [1, 1, 1]])
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['J']), [[2, 0, 0], [2, 2, 2]])
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['T']), [[0, 7, 0], [7, 7, 7]])
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['I']), [[3, 3, 3, 3]])
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['O']), [[4, 4], [4, 4]])
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['S']), [[0, 5, 5], [5, 5, 0]])
      assert.deepEqual(block.getBoundedSymbolValue(Constants.SYMBOLS_MAP['Z']), [[6, 6, 0], [0, 6, 6]])

      const rotMatrix = block.rotate90ClockWise(Constants.SYMBOLS_MAP['L'], 2)
      assert.deepEqual(block.getBoundedSymbolValue(rotMatrix), [[1, 1, 1], [1, 0, 0]])
    })

    it('RotateBoundedSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = Constants.SYMBOLS_MAP[symbol]
        return rotate(orgMatrix, 2)
      }

      const expectedBoundedSymbol = [
        [[1, 1, 1], [1, 0, 0]], /* L rotated CW 2 times */
        [[2, 2, 2], [0, 0, 2]], /* J rotated CW 2 times */
        [[7, 7, 7], [0, 7, 0]], /* T rotated CW 2 times */
        [[3, 3, 3, 3]], /* I rotated CW 2 times */
        [[4, 4], [4, 4]], /* O rotated CW 2 times */
        [[6, 6, 0], [0, 6, 6]], /* Z rotated CW 2 times */
        [[0, 5, 5], [5, 5, 0]] /* S rotated CW 2 times */
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
      let rows = 20
      while (rows > 0) {
        let block = Block.Block(20, 0, 'I')
        board.moveBlock(block)

        block = Block.Block(20, 4, 'I')
        board.moveBlock(block)

        block = Block.Block(20, 8, 'O')
        board.moveBlock(block)
        --rows
      }
      board.print()
    })
  })
})
