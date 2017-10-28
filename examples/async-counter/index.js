const html = require('bel')
const Counter = require('./counter')
const dom = require('../../dom')

function view (state) {
  const btn = html`<button onclick=${Counter.inc(state)}> Count </button>`

  const countSpan = document.createElement('span')
  state.on('count', c => countSpan.textContent = c)

  console.log('here', state.requests)
  const container = html`<ul></ul>`
  const resolving = dom.childSync(resolvingView, container, state.requests,
    'resolving')

  return html`<div>
    <div>
      <p> Counter </p>
      <p> ${countSpan} ${btn} </p>
      <button onclick=${Counter.asyncInc(state)}>async increment</button>
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

document.body.appendChild(view(Counter()))

