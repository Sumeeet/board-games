/* eslint-disable no-useless-call */
const Operations = () => {
  const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

  const curry = (fn) => {
    const arity = fn.length
    return function $curry (...args) {
      if (args.length < arity) {
        return $curry.bind(null, ...args)
      }
      return fn.call(null, ...args)
    }
  }

  // const map = curry((func, functor) => functor.map(func))

  const forEach = curry((func, functor) => functor.forEach((e, i) => func(e, i)))

  const transpose = curry((matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
  })

  const flip = (matrix) => matrix.reverse()

  const reverse = (matrix) => matrix.map(row => row.reverse())

  const rotateClockwise = curry((nTimes, matrix) => {
    if (nTimes <= 0) return matrix
    const rotate = compose(
      reverse,
      transpose
    )
    return rotateClockwise(--nTimes, rotate(matrix))
  })

  const rotateAntiClockwise = curry((nTimes, matrix) => {
    if (nTimes === 0) return matrix

    const rotate = compose(
      flip,
      transpose
    )
    return rotate(matrix)
  })

  // const collapse = curry(() => {})

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - 1 - min)) + min

  const memoize = (func) => {
    const cache = new Map()
    return function (...args) {
      const [key, options] = args
      if (cache.has(key)) {
        return cache[key]
      }

      return func.apply(this, [options])
        .then(result => {
          cache.set(key, result)
          return result
        })
        .catch(e => console.log(`Unable to fetch cache data: ${e.message}`))
    }
  }

  return { compose, curry, forEach, transpose, rotateClockwise, rotateAntiClockwise, getRandomNumber, memoize }
}

module.exports = { Operations }
