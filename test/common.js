global.chai = require('chai')
global.expect = global.chai.expect
global.appFolder = process.cwd() + '/src'

process.setMaxListeners(0)
process.stdout.setMaxListeners(0)
