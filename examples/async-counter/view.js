var html = require('bel')
const App = require('./state')
const dom = require('../../dom')
const Counter = App.Counter

function view (state, effects) {
  const btn = html`<button onclick=${Counter.inc(state.counter)}>
      Count
  </button>`

  const countSpan = document.createElement('span')
  state.counter.on('count', c => countSpan.textContent = c)

  const resolving = dom.childSync(resolvingView, 'ul', state.requests,
    'resolving')

  return html`<div>
    <div>
      <p> Counter </p>
      <p> ${countSpan} ${btn} </p>
      <button onclick=${effects.asyncInc(state)}>async increment</button>
    </div>

    <div class="resolving">
      <h2>resolving</h2>
      ${resolving}
    </div>
  </div>`
}

function resolvingView (req) {
  return html`<li>${req.type + ' ' + req.id}</li>`
}

module.exports = view

