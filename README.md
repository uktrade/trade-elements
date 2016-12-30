# Trade Elements
Front end pattern library for Department of International Trade

** Big First Todo - Replace govuk page template with new one based on UKTI Template **

## What does Trade Elements provide?

* A pattern gallery demonstrating different components and styles, including:
    * Pattern name
    * Description of pattern
    * Example of pattern
    * Markup required
* Sass styles and mixins
* Templates for nunjucks
* Javascript, both for use in combination with components provided and re-usable
  functions for handy things like sorting, combining, validating.

  Note that Javascript is provided in a packaged form, which simply needs to be included
  to add bahaviour to properly marked up HTML and provides access to underlying script
  through a global UKTI variable, and as raw ES6 modules to be included via import or require.


## How to use this library
tbd


### NPM

the npm package has the following folders:
  javascripts      ->  ES6 source modules
  sass             ->  Source Sass Files
  dist
    js             ->  Compiled JS bundles
    images         ->  Image files
    css            ->  Compiled CSS
  templates
    html           ->  Raw HTML fragments for each component
    nunjucks
      filters      ->  Nunjucks filters
      macros       ->  Nunjuck macros to build fragments in nunjucks
