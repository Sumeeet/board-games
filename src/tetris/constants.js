/* eslint-disable no-unused-vars */
'use strict'

const SYMBOLS = [' ', 'I', 'J', 'L', 'O', 'S', 'T', 'Z']
Object.freeze(SYMBOLS)

const SYMBOLS_MAP = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  J: [[0, 0, 2], [2, 2, 2], [0, 0, 0]],
  L: [[3, 0, 0], [3, 3, 3], [0, 0, 0]],
  O: [[4, 4], [4, 4]],
  S: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  T: [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  Z: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
}
Object.freeze(SYMBOLS_MAP)

const COLORS = ['none', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red']
Object.freeze(COLORS)

const BOARDSTATES = { Ready: 'BoardReady', Full: 'BoardFull', BlockInMotion: 'BlockInMotion', BlockPlaced: 'BlockPlaced' }
Object.freeze(BOARDSTATES)

const KEYS = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, P: 80, Q: 81 }
Object.freeze(KEYS)

// module.exports = { SYMBOLS, SYMBOLS_MAP, BOARDSTATES }
