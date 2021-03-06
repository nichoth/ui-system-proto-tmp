const window = require('global/window')
const EventEmitter = require('events')

module.exports = createState

function createState (initialData) {
  var emitter = new EventEmitter()
  var state = initialData
  state.__emitter__ = emitter
  state.update = function update (data) {
    for (var name in data) {
      if (!state.hasOwnProperty(name))  {
        throw new TypeError("Invalid property for state: " + name)
      }
      state[name] = data[name]
      emitter.emit('update:' + name, data[name])
    }
    return state
  }
  state.on = function on (props, fn) {
    if (!Array.isArray(props)) props = [props]
    props.forEach(function (prop) {
      if (!state.hasOwnProperty(prop)) {
        throw new TypeError(`Undefined property '${prop}' for event handler`)
      }
      fn(state[prop])
      function handler (val) { fn(val) }
      emitter.on('update:' + prop, handler)
      if (window && window.__uzu_onBind) {
        window.__uzu_onBind(emitter, 'update:' + prop, handler)
      }
      return state
    })
  }
  return state
}

