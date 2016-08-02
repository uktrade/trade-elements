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
* Templates for use in your favourite template language, including:
    * Plain HTML
    * NunJucks
    * Django Templates
    * Handlebars
* Javascript, both for use in combination with components provided and re-usable
  functions for handy things like sorting, combining, validating.

  Note that Javascript is provided in a packaged form, which simply needs to be included
  to add bahaviour to properly marked up HTML and provides access to underlying script
  through a global UKTI variable, and as raw ES6 modules to be inculded via import or requrie.


## How do I add my stuff to this library?

One of the biggest reasons for creating this library was to act as a central repository
for code from a wide range of projects, so it can be reused on future projects.

If you want a new feature but dont have the time or skill to create it, then create an
issue in Github and mark it as an enhancement request, or a bug.

If you are a devloper and want to add your component to the project, fork the project,
put your code into the fork and then make a pull request. Alternatively if you have
the correct permissions then simple branch from Master and create your changes there
before creating your pull request.


## How to use this libray

### NPM

the npm package has the following folderd:
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
    handlebars     ->  TBD

### PIP

  tbd, how to get the pip module and what is includes
