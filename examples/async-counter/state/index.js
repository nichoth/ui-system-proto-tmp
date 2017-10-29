var state = require('../../../')
var Counter = require('./counter')
var Requests = require('./requests')

function App () {
    return state({
        counter: Counter(),
        requests: Requests()
    })
}

App.Counter = Counter
App.Requests = Requests

module.exports = App

