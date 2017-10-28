const state = require('../../')

function Counter () {
  return state({
    count: 0,
    requests: Request()
  })
}

Counter.inc = state => () => state.update({ count: state.count + 1 })
Counter.dec = state => () => state.update({ count: state.count - 1 })

Counter.asyncInc = state => ev => {
  var req = { type: 'inc', id: getId() }
  Request.start(state.requests)(req)
  setTimeout(() => {
    Request.resolve(state.requests)(req)
    Counter.inc(state)()
  }, 1000)
}

function Request () {
  return state({
    resolving: [],
    isResolving: false,
    error: null
  })
}

Request.start = state => (req) => state.update({
  isResolving: true,
  resolving: state.resolving.concat([req])
})

Request.resolve = state => (req, res) => {
  var list = without(r => r.id === req.id, state.resolving)
  state.update({
    isResolving: !!list.length,
    resolving: list
  })
}

Request.error = state => (req, err) => {
  var list = without(r => r.id === req.id, state.resolving)
  state.update({
    isResolving: !!list.length,
    resolving: list,
    error: err
  })
}

var _id = 0
function getId () {
  return _id++
}

function without (fn, list) {
  var i = list.findIndex(el => fn(el))
  list.splice(i, 1)
  return list
}

module.exports = Counter

