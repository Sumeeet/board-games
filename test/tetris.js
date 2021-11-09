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
        const block = new Block.Block(-1, 3, s)
        const rotBlock = rotate(block, 4)
        block.isEqual(rotBlock)
      }

      Constants.SYMBOLS.slice(1, 8).forEach(s => rotateSymbols(s, (block, nTimes) => block.rotate90ClockWise(nTimes)))
      Constants.SYMBOLS.slice(1, 8).forEach(s => rotateSymbols(s, (block, nTimes) => block.rotate90AntiClockWise(nTimes)))
    })

    it('GetBoundedSymbolValue', () => {
      let block = new Block.Block(-1, 3, 'I')
      assert.deepEqual(block.boundedMatrix, [[1, 1, 1, 1]])

      block = new Block.Block(-1, 3, 'J')
      assert.deepEqual(block.boundedMatrix, [[0, 0, 2], [2, 2, 2]])

      block = new Block.Block(-1, 3, 'L')
      assert.deepEqual(block.boundedMatrix, [[3, 0, 0], [3, 3, 3]])

      block = new Block.Block(-1, 3, 'O')
      assert.deepEqual(block.boundedMatrix, [[4, 4], [4, 4]])

      block = new Block.Block(-1, 3, 'S')
      assert.deepEqual(block.boundedMatrix, [[0, 5, 5], [5, 5, 0]])

      block = new Block.Block(-1, 3, 'T')
      assert.deepEqual(block.boundedMatrix, [[0, 6, 0], [6, 6, 6]])

      block = new Block.Block(-1, 3, 'Z')
      assert.deepEqual(block.boundedMatrix, [[7, 7, 0], [0, 7, 7]])
    })

    it('RotateBoundedSymbol', () => {
      function rotateSymbols (s, rotate) {
        const block = new Block.Block(-1, 3, s)
        return rotate(block, 2)
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

      const rotateSymbCWFunc = (block, nTimes) => block.rotate90ClockWise(nTimes)
      const actualCWBoundedSymbols = Constants.SYMBOLS.slice(1, 8).map(s => rotateSymbols(s, rotateSymbCWFunc)).map(block => block.boundedMatrix)
      deepEqual(actualCWBoundedSymbols, expectedBoundedSymbol)

      const rotateSymbACWFunc = (block, nTimes) => block.rotate90AntiClockWise(nTimes)
      const actualACWBoundedSymbols = Constants.SYMBOLS.slice(1, 8).map(s => rotateSymbols(s, rotateSymbACWFunc)).map(block => block.boundedMatrix)
      deepEqual(actualACWBoundedSymbols, expectedBoundedSymbol)
    })
  })

  context(('Board'), () => {
    it('fillRandomSymbol', () => {
      const board = new Board.Board()
      let symbols = []
      const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min
      const getRandomSymbol = () => {
        if (symbols.length <= 1) symbols = [...Constants.SYMBOLS]
        const index = getRandomValue(1, symbols.length)
        const symbol = symbols[index]
        symbols.splice(index, 1)
        return symbol
      }
      const getRandomCol = (min, max) => getRandomValue(min, max)

      let block
      for (let boards = 0; boards < 4; boards++) {
        while (!board.isBoardFull()) {
          const state = board.getState()
          if (state === Constants.BOARDSTATES.Ready) {
            const column = getRandomCol(0, 10)
            block = new Block.Block(row = -1, column, getRandomSymbol())
            board.moveBlock(block)
          } else if (state === Constants.BOARDSTATES.BlockInMotion) {
            board.moveBlock(block)
          } else if (state === Constants.BOARDSTATES.BlockPlaced) {
            const column = getRandomCol(0, 10)
            block = new Block.Block(row = -1, column, getRandomSymbol())
            board.setState(Constants.BOARDSTATES.BlockInMotion)
          }
        }
        board.print()
        board.reset()
      }
    })

    it('collapseBoardRow', () => {
      const board = new Board.Board()

      let block
      // 2 rows of O block
      for (let i = 0; i < 5; ++i) {
        block = new Block.Block(20, i * 2, 'O')
        board.moveBlock(block)
      }
      assert.equal(true, board.isBoardEmpty())
      board.print()

      // a row containing L, 180 rotated L, O, 2 I's
      block = new Block.Block(20, 0, 'L')
      board.moveBlock(block)

      block = new Block.Block(20, 1, 'L')
      let rotBlock = block.rotate90ClockWise(2)
      board.moveBlock(rotBlock)

      block = new Block.Block(20, 4, 'L')
      board.moveBlock(block)

      block = new Block.Block(20, 5, 'L')
      rotBlock = block.rotate90ClockWise(2)
      board.moveBlock(rotBlock)

      block = new Block.Block(20, 8, 'O')
      board.moveBlock(block)

      assert.equal(true, board.isBoardEmpty())
      board.print()
    })
  })
})
