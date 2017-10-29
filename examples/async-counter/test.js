var assert = require('assert')
var Counter = require('./counter')

var counter = Counter()

assert.equal(counter.count, 0)
assert.equal(Counter.inc(counter)().count, 1)
assert.equal(Counter.dec(counter)().count, 0)

var effects = Counter.effects(httpEcho)
effects.asyncInc(counter)()

function httpEcho (data, cb) {
    setTimeout(function () {
        cb(null, data)
    }, 1000)
}

