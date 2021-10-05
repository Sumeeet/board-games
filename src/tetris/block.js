'use strict'

const { SYMBOLS_MAP, SYMBOLS } = require('./constants')

const Block = (row = -1, column = 3, symbol = null) => {
  let symbols = []
  let matrix = []
  const size = { width: 0, height: 0 }
  const position = { row, column }

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - 1 - min)) + min

  const compose = (a, b) => (value) => b(a(value))

  const transpose = (matrix) => {
    const rowToCol = (row, tmatrix) => row.map((cell, index) => tmatrix[index].push(cell))
    const transMatrix = matrix.map(row => [])
    matrix.map(row => rowToCol(row, transMatrix))
    return transMatrix
  }

  const flipVertical = matrix => matrix.reverse()

  const reverse = matrix => matrix.map(row => row.reverse())

  const rotateAux = (matrix, nTimes, rotate) => {
    if (nTimes === 0) return matrix
    const rotMatrix = rotate(matrix)
    return rotateAux(rotMatrix, --nTimes, rotate)
  }

  const getBoundedSymbolValue = (matrix) => {
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

  (() => {
    if (!symbol) {
      if (symbols.length === 0) symbols = [...SYMBOLS]
      const index = getRandomNumber(1, symbols.length)
      symbol = symbols[index]

      matrix = getBoundedSymbolValue(SYMBOLS_MAP[symbol])
      symbols.splice(index, 1)
    } else {
      matrix = getBoundedSymbolValue(SYMBOLS_MAP[symbol])
    }
    size.width = matrix[0].length
    size.height = matrix.length
  })()

  const rotate90ClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, reverse))

  const rotate90AntiClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, flipVertical))

  return { matrix, size, position, getBoundedSymbolValue, rotate90ClockWise, rotate90AntiClockWise }
}

module.exports = { Block }
