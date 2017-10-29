var Counter = require('./state/counter')
var Request = require('./state/requests')

function asyncInc (state) {
    return function (ev) {
        var req = { type: 'inc', id: getId() }
        Request.start(state.requests)(req)
        setTimeout(function () {
            Request.resolve(state.requests)(req)
            Counter.inc(state.counter)()
        }, 1000)
    }
}

var _id = 0
function getId () {
    return _id++
}

module.exports = function Effects () {
    return {
        asyncInc: asyncInc
    }
}

