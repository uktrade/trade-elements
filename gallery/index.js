'use strict';

const express = require('express');
const router = express.Router();
const fakeData = require('../data/fakedata.json');
const fakePostcodeLookup = require('../data/fakepostcodelookup.json');
const path = require('path');


router.get('/', function(req, res) {
  res.render('index', fakeData);
});

router.get('/lookup', function(req, res) {
  let items = ['George', 'Paul', 'John', 'Ringo'];
  let term = req.query.query;

  if (!term || term.length === 0) {
    res.json([]);
    return;
  }

  const matchingItems = items.filter((item) => {
    return item.toLowerCase().indexOf(term.toLowerCase()) !== -1;
  });

  if (matchingItems.length > 0) {
    items = matchingItems.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
    res.json(items);
  } else {
    res.json([]);
  }
});

router.get('/postcodelookup/:postcode', (req, res) => {
  res.json(fakePostcodeLookup);
});

router.use(express.static(path.resolve('./dist')));


module.exports = router;
