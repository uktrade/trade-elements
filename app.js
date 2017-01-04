'use strict'

const express = require('express')
const app = express()
const expressNunjucks = require('express-nunjucks');
const filters = require('./dist/nunjucks/filters/index')
const config = require('./config')
const path = require('path')
const compression = require('compression')

const isDev = app.get('env') === 'development'

app.use(compression())
app.set('view engine', 'html')
app.set('views', [
  path.resolve('./gallery/views'),
  path.resolve('./dist/nunjucks')
])

expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
  filters
})

app.use('/images/', express.static(path.resolve('./dist/images')))
app.use('/javascripts/', express.static(path.resolve('./dist/javascripts')))
app.use('/sass/', express.static(path.resolve('./dist/sass')))

app.use('/gallery/', require('./gallery/'))

app.listen(config.port)
