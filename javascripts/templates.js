'use strict';

var nunjucks = require('nunjucks');
var filters = require('../nunjucks/filters/index');
var source = require('../nunjucks/macros/forms.html');

nunjucks.configure({ autoescape: true });

nunjucks.ready(function(nj) {
  Object.keys(filters).forEach(function(filterName) {
    nj.addFilter(filterName, filters[filterName]);
  });
});

var compiledTemplate = nunjucks.precompileString(source, {
  name: this.resourcePath.replace(root, '')
});

module.exports = compiledTemplate;
