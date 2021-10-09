'use strict'

const { SYMBOLS_MAP, SYMBOLS } = require('./constants')

class Block {
  constructor (row = -1, column = 3, symbol = null) {
    this.symbols = []
    this.matrix = []
    this.symbol = symbol

    this.position = { row, column }

    if (!symbol) {
      if (this.symbols.length === 0) this.symbols = [...SYMBOLS]
      const index = this.getRandomNumber(1, this.symbols.length)
      this.symbol = this.symbols[index]
      this.matrix = SYMBOLS_MAP[this.symbol]
      this.symbols.splice(index, 1)
    } else {
      this.matrix = SYMBOLS_MAP[symbol]
    }
    // const boundedMatrix = this.getBoundedSymbolValue()
    this.size = { width: this.matrix[0].length, height: this.matrix.length }
  }

  equal (block) {
    const blockMatrixLen = block.matrix.length
    const matrixLen = this.matrix.length
    if (blockMatrixLen !== matrixLen) { return false }

    return this.matrix.some((row, index) => block.matrix[index].some((e, i) => row[i] !== e))
  }

  getRandomNumber (min, max) { return Math.floor(Math.random() * (max - 1 - min)) + min }

  compose (a, b) { return function (value) { return b(a(value)) } }

  transpose (matrix) {
    const rowToCol = (row, tmatrix) => row.map((cell, index) => tmatrix[index].push(cell))
    const transMatrix = matrix.map(row => [])
    matrix.map(row => rowToCol(row, transMatrix))
    return transMatrix
  }

  flipVertical (matrix) { return matrix.reverse() }

  reverse (matrix) { return matrix.map(row => row.reverse()) }

  rotateAux (matrix, nTimes, rotate) {
    if (nTimes === 0) { return matrix }
    const rotMatrix = rotate(matrix)
    return this.rotateAux(rotMatrix, --nTimes, rotate)
  }

  getBoundedSymbolValue () {
    const rowEmpty = row => row.every(value => value === 0)
    const width = this.matrix[0].length
    let rowStart = width; let colStart = width; let rowEnd = 0; let colEnd = 0
    this.matrix.forEach((row, ri) => {
      if (!rowEmpty(row)) {
        rowStart = Math.min(ri, rowStart)
        rowEnd = Math.max(ri, rowEnd)
        row.forEach((value, ci) => {
          if (value !== 0) {
            colStart = Math.min(ci, colStart)
            colEnd = Math.max(ci, colEnd)
          }
        })
      }
    })
    return this.matrix.slice(rowStart, rowEnd + 1).map(row => row.slice(colStart, colEnd + 1))
  }

  rotate90ClockWise (nTimes = 1) {
    const rotatedMatrix = this.rotateAux([...this.matrix], nTimes, this.compose(this.transpose, this.reverse))
    const block = new Block(this.position.row, this.position.column, this.symbol)
    block.matrix = rotatedMatrix
    return block
  }

  rotate90AntiClockWise (nTimes = 1) {
    const rotatedMatrix = this.rotateAux([...this.matrix], nTimes, this.compose(this.transpose, this.flipVertical))
    const block = new Block(this.position.row, this.position.column, this.symbol)
    block.matrix = rotatedMatrix
    return block
  }
}

module.exports = { Block }
