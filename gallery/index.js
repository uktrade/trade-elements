'use strict'

const express = require('express')
const router = express.Router()
const fakeData = require('./data/fakedata.json')
const fakePostcodeLookup = require('./data/fakepostcodelookup.json')

router.use(require('./middleware/locals'))

router.get('/:page', (req, res) => {
  const page = req.params.page || 'index'
  res.render(page, { fakeData })
})

router.get('/lookup', function(req, res) {
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

router.get('/postcodelookup/:postcode', (req, res) => {
  res.json(fakePostcodeLookup)
})

module.exports = router
