class Board {
  constructor (rows = 3, columns = 3) {
    this.rows = rows
    this.columns = columns

    // initialize board
    this.board = this.initializeBoard()

    this.symbolX = 'X'
    this.symbolO = 'O'

    // starting player is 'X'
    this.symbol = this.symbolX

    this.symbolMap = { X: rows + 1, O: 1 }

    // For a 3X3 grid there can be maximum 8 states in a 3X3 matrix 3 rows, 3 columns and 2 diagonals.
    // if any of the triplet are either 0 or 1 then respective player wins
    this.tuple = this.makeTuple()

    this.boardStates = {
      Ready: 0, Progress: 1, Finished: 2
    }

    this.currentBoardState = { BoardState: this.boardStates.Ready, Player: this.symbol, Message: `Player ${this.symbolX} turn` }
  }

  initializeBoard () {
    const board = []
    for (let rIndex = 0; rIndex < this.rows; rIndex++) {
      const row = Array(this.columns).fill(0)
      board.push(row)
    }
    return board
  }

  makeTuple () {
    const tuple = []

    // rows
    for (let rIndex = 0; rIndex < this.rows; rIndex++) {
      const row = []
      for (let cIndex = 0; cIndex < this.columns; cIndex++) {
        row.push(rIndex * this.columns + cIndex)
      }
      tuple.push(row)
    }

    // columns
    for (let cIndex = 0; cIndex < this.columns; cIndex++) {
      const column = []
      for (let rIndex = 0; rIndex < this.rows; rIndex++) {
        column.push(cIndex + rIndex * this.columns)
      }
      tuple.push(column)
    }

    // diagonals
    const leftDiag = []
    for (let rIndex = 0; rIndex < this.rows; rIndex++) {
      leftDiag.push(rIndex * (this.rows + 1))
    }
    tuple.push(leftDiag)

    const rightDiag = []
    for (let rIndex = 1; rIndex <= this.rows; rIndex++) {
      rightDiag.push(rIndex * (this.columns - 1))
    }
    tuple.push(rightDiag)

    return tuple
  }

  makeMove (index) {
    switch (this.currentBoardState.BoardState) {
      case this.boardStates.Ready:
        this.currentBoardState.BoardState = this.boardStates.Progress
        this.markCell(index)
        break
      case this.boardStates.Progress:
        this.currentBoardState.Player = this.symbol
        this.markCell(index)
        break
      default:
        break
    }
    return this.currentBoardState
  }

  markCell (index) {
    if (!this.isCellValid(index)) {
      this.currentBoardState.Message = `${index} : Cell should be in range 0 to 8`
      return
    }

    const cellValue = this.getValueAt(index)
    if (cellValue !== 0) {
      this.currentBoardState.Message = `Cell is already occupied by ${this.getSymbol(cellValue)}`
      return
    }

    const symbolValue = this.getSymbolValue(this.symbol)
    if (symbolValue === 0) { return }

    this.setValueAt(index, symbolValue)
    if (this.isWin()) { return } else if (this.isTie()) { return }
    this.symbol = (this.symbol === this.symbolX) ? this.symbolO : this.symbolX
    this.currentBoardState.Message = `Player ${this.symbol} turn`
  }

  reset () {
    this.board.forEach((arr) => arr.fill(0, 0))
    this.symbol = this.symbolX
    this.currentBoardState = { BoardState: this.boardStates.Ready, Player: this.symbol, Message: `Player ${this.symbolX} turn` }
    return this.currentBoardState
  }

  isCellValid (index) {
    return (index >= 0 && index <= this.rows * this.columns - 1)
  }

  getSymbol (cellValue) {
    if (cellValue !== this.symbolMap.X && cellValue !== this.symbolMap.O) {
      console.error(`Invalid symbol ${cellValue}. Valid symbols are ${this.symbolMap.X} and ${this.symbolMap.O}`)
      return ''
    }
    return Object.keys(this.symbolMap).find((key) => this.symbolMap[key] === cellValue)
  }

  getSymbolValue (symbol) {
    if (symbol !== this.symbolX && symbol !== this.symbolO) {
      console.error(`Invalid symbol ${symbol}. Valid symbols are ${this.symbolX} and ${this.symbolO}`)
      return 0
    }
    return this.symbolMap[symbol]
  }

  getRowIndex (cellIndex) {
    return parseInt(cellIndex / this.rows, 10)
  }

  getColumnIndex (cellIndex) {
    return cellIndex % this.rows
  }

  getValueAt (cellIndex) {
    const rowIndex = this.getRowIndex(cellIndex)
    const colIndex = this.getColumnIndex(cellIndex)
    return this.board[rowIndex][colIndex]
  }

  setValueAt (cellIndex, val) {
    const rowIndex = this.getRowIndex(cellIndex)
    const colIndex = this.getColumnIndex(cellIndex)
    this.board[rowIndex][colIndex] = val
  }

  isWin () {
    const valueTuple = this.tuple.map((tuple) => tuple.map((index) => this.getValueAt(index)))
    const tupleSum = valueTuple.map((tuple) => tuple.reduce((accum, curVal) => accum + curVal))
    if (tupleSum.some((val) => val === this.rows * this.symbolMap.O || val === this.rows * this.symbolMap.X)) {
      this.currentBoardState.Message = `${this.symbol} won the game. Reset to play again.`
      this.currentBoardState.BoardState = this.boardStates.Finished
      return true
    }
    return false
  }

  isTie () {
    const valueTuple = this.tuple.slice(0, this.rows).map((tuple) => tuple.map((index) => this.getValueAt(index)))
    const emptyCellRow = valueTuple.map((tuple) => tuple.some((val) => val === 0))
    if (emptyCellRow.filter((val) => val === true).length === 0) {
      this.currentBoardState.BoardState = this.boardStates.Finished
      this.currentBoardState.Message = 'Its a Tie. Reset to play again'
      return true
    }
    return false
  }

  isEmpty () {
    return this.board.length === 0
  }

  print () {
    //    O | O | O
    //   ---|---|---
    //    X | X | X
    //   ---|---|---
    //    O | O | O

    if (this.isEmpty()) {
      console.error('Board is empty. Create board.')
      return
    }

    const getEmptyRow = (nCells, cellLayout, rowLayout) => {
      if (nCells === 0) return rowLayout
      return getEmptyRow(nCells - 1, cellLayout, rowLayout + cellLayout)
    }

    const valueTuple = this.tuple.slice(0, this.rows).map((tuple) => tuple.map((index) => this.getValueAt(index)))
    for (let index = 0; index < this.rows; index++) {
      console.log(` ${valueTuple[index].reduce((accum, value) => `${accum} | ${value}`)}   ${index}`)

      if (index < this.rows - 1) {
        const emptyRow = getEmptyRow(this.columns, '---|', '')
        console.log(emptyRow.substring(0, emptyRow.length - 1))
      }
    }
    console.log(`${this.currentBoardState.Message}`)
    console.log('')
  }
}
module.exports = Board
