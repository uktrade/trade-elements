'use strict';

const express = require('express');
const app = express();
const nunjucks = require('express-nunjucks');
const filters = require('./templates/nunjucks/filters/index');
const config = require('./config');
const path = require('path');
const compression = require('compression');

let nunjucksConfig = {
  autoescape: true
};

if (config.env !== 'production') {
  nunjucksConfig.noCache = true;
}

app.use(compression());
app.set('view engine', 'html');
app.set('views', [
  path.resolve('./gallery/views'),
  path.resolve('./node_modules/govuk_template_jinja/views'),
  path.resolve('./templates/nunjucks')
]);

nunjucks.setup(nunjucksConfig, app);

// Add extra filters to nunjucks
nunjucks.ready(function(nj) {
  Object.keys(filters).forEach(function(filterName) {
    nj.addFilter(filterName, filters[filterName]);
  });
});

app.use(express.static(path.resolve('./dist')));
app.use(express.static(path.resolve('./node_modules/govuk_template_jinja/assets')));

app.use('/gallery', require('./gallery/'));
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.port);
