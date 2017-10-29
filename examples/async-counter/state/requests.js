var state = require('../../../')

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

function without (fn, list) {
  var i = list.findIndex(el => fn(el))
  list.splice(i, 1)
  return list
}

module.exports = Request

