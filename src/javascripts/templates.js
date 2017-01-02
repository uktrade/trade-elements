const nunjucks = require('nunjucks');
const filters = require('../nunjucks/filters/index');
const source = require('../nunjucks/macros/forms.html');

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
