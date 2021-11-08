'use strict'

const { SYMBOLS_MAP, SYMBOLS } = require('./constants')

function Block (row = -1, column = 3, symbol = null, rotateBy = 0) {
  let symbols = []
  let boundedMatrix = []
  const position = { row: row, column: column }
  let size = { width: 0, height: 0 }

  const isEqual = (block) => {
    const matrix = getBoundedSymbolValue()
    const blockMatrix = block.getBoundedSymbolValue()

    if (matrix.length !== blockMatrix.length) return false

    return matrix.some((row, index) => blockMatrix[index].some((e, i) => row[i] !== e))
  }

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - 1 - min)) + min

  const getBoundedMatrix = (matrix) => {
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
    let matrix = []
    if (!symbol) {
      if (symbols.length === 0) symbols = [...SYMBOLS]
      const index = getRandomNumber(1, symbols.length)
      symbol = symbols[index]
      matrix = SYMBOLS_MAP[symbol]
      symbols.splice(index, 1)
    } else {
      matrix = SYMBOLS_MAP[symbol]
    }

    if (rotateBy > 0) {
      matrix = rotateAux([...matrix], rotateBy, compose(transpose, reverse))
    } else {
      matrix = rotateAux([...matrix], Math.abs(rotateBy), compose(transpose, flipVertical))
    }
    boundedMatrix = getBoundedMatrix(matrix)
    size = { width: boundedMatrix[0].length, height: boundedMatrix.length }
  })()

  const rotate90ClockWise = (nTimes = 1) => {
    return new Block(position.row, position.column, symbol, nTimes)
  }

  const rotate90AntiClockWise = (nTimes = 1) => {
    return new Block(position.row, position.column, symbol, -nTimes)
  }

  const getBoundedSymbolValue = () => boundedMatrix

  return { rotate90ClockWise, rotate90AntiClockWise, getBoundedSymbolValue, size, position, isEqual }
}

module.exports = { Block }
