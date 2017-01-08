'use strict'

const express = require('express')
const app = express()
const expressNunjucks = require('express-nunjucks')
const path = require('path')
const compression = require('compression')
const fakeData = require('./data/fakedata.json')
const fakePostcodeLookup = require('./data/fakepostcodelookup.json')
const filters = require('../dist/nunjucks/filters/index')
const config = require('./config')

const isDev = app.get('env') === 'development'

app.use(compression())
app.set('view engine', 'html')
app.set('views', [
  path.resolve(__dirname, './views'),
  path.resolve(__dirname, '../dist/nunjucks')
])

expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
  filters
})

app.use('/images/', express.static(path.resolve(__dirname, '../dist/images')))
app.use('/javascripts/', express.static(path.resolve(__dirname, '../dist/javascripts')))
app.use('/css', express.static(path.resolve(__dirname, '../dist/css')))
app.use('/css', express.static(path.resolve(__dirname, './styles')))
app.use('/favicon.ico', express.static(path.resolve(__dirname, '../dist/images')))

app.use(require('./middleware/locals'))

app.get(['/:page', '/'], (req, res) => {
  const page = req.params.page || 'index'

  const errors = {
    'name': [
      'This field may not be null.'
    ],
    'business_type': [
      'This field may not be null.'
    ],
    'sector': [
      'This field may not be null.'
    ],
    'registered_address': [
      'Invalid address'
    ]
  }

  res.render(page, { fakeData, errors })
})

app.get('/lookup', (req, res) => {
  let items = ['George', 'Paul', 'John', 'Ringo']
  let term = req.query.query

  if (!term || term.length === 0) {
    res.json([])
    return
  }

  const matchingItems = items.filter((item) => {
    return item.toLowerCase().indexOf(term.toLowerCase()) !== -1
  })

  if (matchingItems.length > 0) {
    items = matchingItems.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()) })
    res.json(items)
  } else {
    res.json([])
  }
})

app.get('/postcodelookup/:postcode', (req, res) => {
  res.json(fakePostcodeLookup)
})

app.listen(config.port)
