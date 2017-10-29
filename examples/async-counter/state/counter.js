const state = require('../../../')

function Counter () {
  return state({
    count: 0
  })
}

Counter.inc = state => () => state.update({ count: state.count + 1 })
Counter.dec = state => () => state.update({ count: state.count - 1 })

module.exports = Counter

