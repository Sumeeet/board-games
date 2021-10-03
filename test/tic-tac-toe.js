/* eslint-disable no-undef */
const assert = require('assert')
const Board = require('../src/tic-tac-toe/board')

describe('TicTacToe', () => {
  context('(InitializeBoard)', () => {
    it('Board state should be in Ready state', () => {
      const model = new Board()
      assert.strictEqual(model.currentBoardState.BoardState, 0)
      model.board.forEach((arr) => arr.some((val) => assert.strictEqual(val, 0)))
    })
  })

  context('(GetPlayer)', () => {
    it('Player 0 should be O and Player 1 should be X', () => {
      const ticktacmodel = new Board()
      assert.strictEqual(ticktacmodel.getSymbol(1), 'O')
      assert.strictEqual(ticktacmodel.getSymbol(4), 'X')
    })
  })

  context('(GetPlayerValue)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Board()
      assert.strictEqual(ticktacmodel.getSymbolValue('O'), 1)
      assert.strictEqual(ticktacmodel.getSymbolValue('X'), 4)
    })
  })

  context('(IsValidBoardCell)', () => {
    it('Board cell is not valid', () => {
      const ticktacmodel = new Board()
      const numbers = [-1, -2, 9, 10]
      numbers.map((num) => assert.strictEqual(ticktacmodel.isCellValid(num), false))
    })

    it('Board cell is valid', () => {
      const ticktacmodel = new Board()
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      numbers.map((num) => assert.strictEqual(ticktacmodel.isCellValid(num), true))
    })
  })

  context('(Simulate 3X3 board)', () => {
    it('Simulate 3X3 Board', () => {
      const ticktacmodel = new Board()
      // generate random numbers between [0,8]
      const min = 0
      const max = 8
      const moves = 100
      let i = 0
      for (; i < moves; ++i) {
        switch (ticktacmodel.currentBoardState.BoardState) {
          case ticktacmodel.boardStates.Finished:
            ticktacmodel.print()
            ticktacmodel.reset()
            break
          default:
            break
        }
        const cellIndex = Math.floor(Math.random() * (max - min + 1)) + min
        ticktacmodel.makeMove(cellIndex)
      }
      assert.strictEqual(i, moves)
    })
  })

  context('(Simulate 4X4 board)', () => {
    it('Simulate 4X4 Board', () => {
      const model = new Board(4, 4)
      // generate random numbers between [0,8], to get random cell index
      const min = 0
      const max = 15
      const moves = 200
      let i = 0
      for (; i < moves; ++i) {
        switch (model.currentBoardState.BoardState) {
          case model.boardStates.Finished:
            model.print()
            model.reset()
            break
          default:
            break
        }
        const cellIndex = Math.floor(Math.random() * (max - min + 1)) + min
        model.makeMove(cellIndex)
      }
      assert.strictEqual(i, moves)
    })
  })
})
