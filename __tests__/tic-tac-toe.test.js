import { strict as assert } from 'assert'
import { Board } from '../src/tic-tac-toe/board.js'

describe('TicTacToe', () => {
  describe('(InitializeBoard)', () => {
    it('Board state should be in Ready state', () => {
      const model = new Board()
      assert.strictEqual(model.currentBoardState.BoardState, 0)
      model.board.forEach((arr) => arr.some((val) => assert.strictEqual(val, 0)))
    })
  })

  describe('(GetPlayer)', () => {
    it('Player 0 should be O and Player 1 should be X', () => {
      const ticktacmodel = new Board()
      assert.strictEqual(ticktacmodel.getSymbol(1), 'O')
      assert.strictEqual(ticktacmodel.getSymbol(4), 'X')
    })
  })

  describe('(GetPlayerValue)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Board()
      assert.strictEqual(ticktacmodel.getSymbolValue('O'), 1)
      assert.strictEqual(ticktacmodel.getSymbolValue('X'), 4)
    })
  })

  describe('(IsValidBoardCell)', () => {
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

  describe('(Simulate 3X3 board)', () => {
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

  describe('(Simulate 4X4 board)', () => {
    it('Simulate 4X4 Board', () => {
      const model = new Board(4, 4)
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

  describe('(Simulate 5X5 board)', () => {
    it('Simulate 5X5 Board', () => {
      const board = new Board(5, 5)
      const min = 0
      const max = 24
      const moves = 400
      let i = 0
      for (; i < moves; ++i) {
        switch (board.currentBoardState.BoardState) {
          case board.boardStates.Finished:
            board.print()
            board.reset()
            break
          default:
            break
        }
        const cellIndex = Math.floor(Math.random() * (max - min + 1)) + min
        board.makeMove(cellIndex)
      }
      assert.strictEqual(i, moves)
    })
  })
})
