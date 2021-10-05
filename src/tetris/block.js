'use strict'

const { SYMBOLS_MAP, SYMBOLS } = require('./constants')

const Block = (row = -1, column = 3, symbol = null) => {
  let symbols = []
  let matrix = []
  const size = { width: 0, height: 0 }
  const position = { row, column }

  const equal = (block) => {
    const blockMatrixLen = block.matrix.length
    const matrixLen = matrix.length
    if (blockMatrixLen !== matrixLen) { return false }

    return matrix.some((row, index) => block.matrix[index].some((e, i) => row[i] !== e))
  }

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
    if (nTimes === 0) { return matrix }
    const rotMatrix = rotate(matrix)
    return rotateAux(rotMatrix, --nTimes, rotate)
  }

  const getBoundedSymbolValue = () => {
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

      // matrix = getBoundedSymbolValue(SYMBOLS_MAP[symbol])
      matrix = SYMBOLS_MAP[symbol]
      symbols.splice(index, 1)
    } else {
      // matrix = getBoundedSymbolValue(SYMBOLS_MAP[symbol])
      matrix = SYMBOLS_MAP[symbol]
    }
    size.width = matrix[0].length
    size.height = matrix.length
  })()

  function rotate90ClockWise (nTimes = 1) {
    const rotatedMatrix = rotateAux([...matrix], nTimes, compose(transpose, reverse))
    const block = { ...this }
    block.matrix = rotatedMatrix
    return block
  }

  const rotate90AntiClockWise = (nTimes = 1) => {
    const rotatedMatrix = rotateAux([...matrix], nTimes, compose(transpose, flipVertical))
    const block = { ...this }
    block.matrix = rotatedMatrix
    return block
  }

  return { size, position, equal, getBoundedSymbolValue, rotate90ClockWise, rotate90AntiClockWise }
}

module.exports = { Block }
