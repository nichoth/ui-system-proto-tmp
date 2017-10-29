var test = require('tape')
var State = require('./state')
var Counter = State.Counter
var Effects = require('./effects')

test('counter', function (assert) {
    var counter = Counter()
    assert.equal(counter.count, 0)
    assert.equal(Counter.inc(counter)().count, 1)
    assert.equal(Counter.dec(counter)().count, 0)
    assert.end()
})

test('effects', function (t) {
    var state = State()
    t.plan(5)

    var effects = Effects() // would need to give mock IO functions here
    var expect = [0, 1]
    var i = 0
    state.counter.on('count', function () {
        t.equal(state.counter.count, expect[i++])
    })

    function expectResolving (state) {
        return [
            [state.requests.resolving[0], undefined],
            [(state.requests.resolving[0] || {}).type, 'inc'],
            [state.requests.resolving[0], undefined]
        ]
    }

    var _i = 0
    state.requests.on('resolving', function () {
        t.equal.apply(t, expectResolving(state)[_i++])
    })

    effects.asyncInc(state)()
})


