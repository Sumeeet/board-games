'use strict'

// const { SYMBOLS_MAP, SYMBOLS } = require('./constants')

function Block (row = -1, column = 3, symbol = null) {
  let matrix = []
  let symbols = []
  let boundedMatrix = []
  const position = { row: row, column: column }
  let size = { width: 0, height: 0 }

  const isEqual = (block) => {
    const blockMatrix = block.boundedMatrix
    if (boundedMatrix.length !== blockMatrix.length) return false
    return boundedMatrix.some((row, index) => blockMatrix[index].some((e, i) => row[i] !== e))
  }

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - 1 - min)) + min

  const clipToBounds = (matrix) => {
    const rowEmpty = row => row.every(value => value === 0)
    const width = matrix[0].length
    let rowStart = width; let colStart = width; let rowEnd = 0; let colEnd = 0
    matrix.forEach((row, ri) => {
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
    return matrix.slice(rowStart, rowEnd + 1).map(row => row.slice(colStart, colEnd + 1))
  }

  const compose = (a, b) => (value) => b(a(value))

  const transpose = (matrix) => {
    const rowToCol = (row, tmatrix) => row.map((cell, index) => tmatrix[index].push(cell))
    const transMatrix = matrix.map(row => [])
    matrix.map(row => rowToCol(row, transMatrix))
    return transMatrix
  }

  const flipVertical = (matrix) => matrix.reverse()

  const reverse = (matrix) => matrix.map(row => row.reverse())

  const rotateAux = (matrix, nTimes, rotate) => {
    if (nTimes === 0) { return matrix }
    const rotMatrix = rotate(matrix)
    return rotateAux(rotMatrix, --nTimes, rotate)
  };

  (() => {
    if (!symbol) {
      if (symbols.length === 0) symbols = [...SYMBOLS]
      const index = getRandomNumber(1, symbols.length)
      symbol = symbols[index]
      matrix = SYMBOLS_MAP[symbol]
      symbols.splice(index, 1)
    } else {
      matrix = SYMBOLS_MAP[symbol]
    }

    boundedMatrix = clipToBounds(matrix)
    size = { width: boundedMatrix[0].length, height: boundedMatrix.length }
  })()

  function rotate90ClockWise (nTimes = 1) {
    const block = new Block(position.row, position.column, symbol)
    block.matrix = rotateAux([...this.matrix], nTimes, compose(transpose, reverse))
    block.boundedMatrix = clipToBounds(block.matrix)
    block.size = { width: block.boundedMatrix[0].length, height: block.boundedMatrix.length }
    return block
  }

  function rotate90AntiClockWise (nTimes = 1) {
    const block = new Block(position.row, position.column, symbol)
    block.matrix = rotateAux([...this.matrix], nTimes, compose(transpose, flipVertical))
    block.boundedMatrix = clipToBounds(block.matrix)
    block.size = { width: block.boundedMatrix[0].length, height: block.boundedMatrix.length }
    return block
  }

  return { rotate90ClockWise, rotate90AntiClockWise, boundedMatrix, matrix, size, position, isEqual }
}

// module.exports = { Block }
