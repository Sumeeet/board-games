/* eslint-disable no-undef */
'use strict'

let block, context, nextContext, oldTimeStamp, timeElapsed//, fps
const level = 200
let requestId = null
let symbols = []
const board = new Board()

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - 1 - min)) + min

const getRandomSymbol = () => {
  if (symbols.length <= 1) symbols = [...SYMBOLS]
  const index = getRandomNumber(1, symbols.length)
  const symbol = symbols[index]
  symbols.splice(index, 1)
  return symbol
}

window.onload = () => {
  // get reference to canvas context
  const canvas = document.getElementById('boardcanvas')
  context = canvas.getContext('2d')
  context.scale(20, 20)
  const nextcanvas = document.getElementById('nextcanvas')
  nextContext = nextcanvas.getContext('2d')
  nextContext.scale(20, 20)
  reset()
  addEventListeners()
}

const play = (event) => {
  window.requestAnimationFrame(gameLoop)
}

const reset = () => {
  board.reset()
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  cancelAnimationFrame(requestId)
  requestId = null
  oldTimeStamp = performance.now()
}

const pause = () => {
  cancelAnimationFrame(requestId)
  requestId = null

  context.fillStyle = 'black'
  context.fillRect(1, 9, 8, 1.2)
  context.font = '1px Arial'
  context.fillStyle = 'yellow'
  context.fillText('PAUSED', 3, 10)
}

const gameOver = () => {
  cancelAnimationFrame(requestId)
  requestId = null

  context.fillStyle = 'black'
  context.fillRect(1, 9, 8, 1.2)
  context.font = '1px Arial'
  context.fillStyle = 'red'
  context.fillText('GAME OVER', 2, 10)
}

const gameLoop = (timestamp = 0) => {
  timeElapsed = (timestamp - oldTimeStamp)

  if (timeElapsed > level) {
    oldTimeStamp = timestamp
    if (board.isBoardFull()) {
      gameOver()
      return
    }
    const state = board.getState()
    if (state === BOARDSTATES.Ready) {
      const symbol = getRandomSymbol()
      block = new Block(-1, 3, symbol)
      board.moveBlock(block)
    } else if (state === BOARDSTATES.BlockInMotion) {
      board.moveBlock(block)
    } else if (state === BOARDSTATES.BlockPlaced) {
      const symbol = getRandomSymbol()
      block = new Block(-1, 3, symbol)
      board.setState(BOARDSTATES.BlockInMotion)
    }
  }

  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  drawBlock(context, block)

  board.drawBoard(context)
  requestId = window.requestAnimationFrame(gameLoop)
}

const drawBlock = (context, block) => {
  const boundedMatrix = block.boundedMatrix
  boundedMatrix.forEach((row, ri) => {
    row.forEach((value, ci) => {
      if (value > 0) {
        context.fillStyle = COLORS[value]
        context.fillRect(block.position.column + ci, block.position.row + ri, 1, 1)
      }
    })
  })
}

const addEventListeners = () => {
  const playElement = document.getElementById('play')
  playElement.addEventListener('click', event => { play() })

  const pauseElement = document.getElementById('pause')
  pauseElement.addEventListener('click', event => { pause() })

  const resetElement = document.getElementById('reset')
  resetElement.addEventListener('click', event => { reset() })

  document.addEventListener('keydown', handleKeyDownEvents)
}

const handleKeyDownEvents = (event) => {
  event.preventDefault()
  switch (event.code) {
    case 'ArrowDown':
      if (board.isBlockFloat(block) && board.isValidMove(block.position.row + 1, block.position.column, block)) {
        block.position.row += 1
        board.keepWithinBoard(block)
      }
      break
    case 'ArrowLeft':
      if (board.isValidMove(block.position.row, block.position.column - 1, block)) {
        block.position.column -= 1
        board.keepWithinBoard(block)
      }
      break
    case 'ArrowRight':
      if (board.isValidMove(block.position.row, block.position.column + 1, block)) {
        block.position.column += 1
        board.keepWithinBoard(block)
      }
      break
    case 'ArrowUp':
      block = block.rotate90ClockWise()
      board.keepWithinBoard(block)
      break
  }
}
