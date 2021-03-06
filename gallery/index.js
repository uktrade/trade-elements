const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const path = require('path')
const compression = require('compression')
const fakeData = require('./data/fakedata.json')
const fakePostcodeLookup = require('./data/fakepostcodelookup.json')
const filters = require('../dist/nunjucks/filters')
const config = require('./config')

app.use(compression())
app.set('view engine', 'html')

const env = nunjucks.configure([
  path.resolve(__dirname, './views'),
  path.resolve(__dirname, '../dist/nunjucks'),
], {
  autoescape: true,
  express: app,
  watch: config.isDev,
  noCache: config.isDev,
})

// Custom filters
Object.keys(filters).forEach((filter) => {
  env.addFilter(filter, filters[filter])
})

app.use('/images/', express.static(path.resolve(__dirname, '../dist/images')))
app.use('/javascripts/', express.static(path.resolve(__dirname, '../dist/javascripts')))
app.use('/css', express.static(path.resolve(__dirname, '../dist/css')))
app.use('/css', express.static(path.resolve(__dirname, './styles')))
app.use('/favicon.ico', express.static(path.resolve(__dirname, '../dist/images')))
app.use('/themes', express.static(path.resolve(__dirname, '../node_modules/prismjs/themes')))
app.use('/prism.js', express.static(path.resolve(__dirname, '../node_modules/prismjs/prism.js')))

app.use(require('./middleware/locals'))

app.get(['/:page', '/'], (req, res) => {
  const page = req.params.page || 'index'

  const options = ['one', 'two', 'three']
  const messages = {
    success: ['Hi there this is a message'],
    errors: ['Some error'],
  }

  const errors = {
    'name': [
      'This field may not be null.',
    ],
    'business_type': [
      'This field may not be null.',
    ],
    'sector': [
      'This field may not be null.',
    ],
    'registered_address': [
      'Invalid address',
    ],
  }

  const errorLabels = {
    name: 'Name',
    sector: 'Sector',
    registered_address: 'Registered address',
  }

  const company = {
    registeredName: 'Marriot Hotels',
    type: '<span class="status-badge status-badge--xsmall status-badge--action">TO DO</span>',
    sector: 'Leisure and tourism',
    subSector: 'Unknown',
    tradingName: 'Unknown',
    pet: '',
    codes: ['1', '2', '3'],
  }

  const companyLabels = {
    registeredName: 'Registered name',
    type: 'Type of business',
    sector: 'Primary sector',
    subSector: 'Subsector',
    tradingName: 'Trading name',
    pet: 'Pet',
  }

  const contactLabels = {
    name: 'Name',
    role: 'Role',
    phone: 'Phone',
    email: 'Email',
  }

  const contacts = [
    {
      name: '<a href="/table">Fred Bloggs</a>',
      role: 'Director',
      phone: '+44 7888 777 333',
      email: 'fred@acme.org',
    },
    {
      name: '<a href="/table">Wilma Bloggs</a>',
      role: 'Director',
      phone: '+44 7888 777 333',
      email: 'wilma@acme.org',
    },
  ]

  res.render(page, {
    fakeData,
    errors,
    options,
    messages,
    company,
    companyLabels,
    contacts,
    contactLabels,
    errorLabels,
    advisors,
  })
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

const advisors = [
  { id: 1, name: 'Fred' },
  { id: 2, name: 'Andrew' },
]

app.get('/api/advisorlookup', (req, res) => {
  const term = req.query.term.toLocaleLowerCase()

  const results = advisors.filter((advisor) => {
    const name = advisor.name.toLocaleLowerCase()
    return name.substr(0, term.length) === term
  })

  res.json(results)
})

app.get('/postcodelookup/:postcode', (req, res) => {
  res.json(fakePostcodeLookup)
})

app.listen(config.port)
