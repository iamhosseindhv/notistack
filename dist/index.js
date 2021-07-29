
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./notistack.cjs.production.min.js')
} else {
  module.exports = require('./notistack.cjs.development.js')
}
