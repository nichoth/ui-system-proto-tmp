const html = require('bel')
const App = require('./state')
const Effects = require('./effects')
const view = require('./view')

document.body.appendChild( view(App(), Effects()) )


