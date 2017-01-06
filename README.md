# Trade Elements
Front end pattern library for Department of International Trade

## What does Trade Elements provide?

The primary goal of the **Trade Elements** project it to provide front-end resources for developers 
creating web sites and services for DIT in a GDS style. The toolkit consists of an NPM package and a 
[pattern library available to view online](https://trade-elements.herokuapp.com/)

### NPM Package
The Frontend toolkit currently 

the npm package has a 'dist' folder containing pre-processed files. The 'dist' folder contains:
  
  
| File/Folder         | Description |
| ------------------- | ----------- |
| css                 | Compiled CSS for users who do not want to use the sass styles. Also contains compiled css used by base layouts |
| images              | Image assets typically references from style |
| index.js            | A bundle of helper functions for javascript, some functions are for use in the browser, others for the server or both. Include as a standard npm module, e.g. ***const guid = require('trade-elements').guid***  |
| javascripts         | A folder to add to your static assets mappings in node to host the javascript bundle to add behaviour to the page. This folder contains trade-elements-components.js, this is the code that enhances parts of a page, such as readio buttons. The cookie and component scripts in this folder are called by the base layout by default. |
| nunjucks/filters    | Helpful filters for nunjucks, such as date formatting and console logging |
| nunjucks/layouts    | Base page layouts for pages to provide a consistant layout, header and footer. |
| nunjucks/macros/trade.html | A collection of macros for nunjucks for generating layout. Using the macros produces consistent markup designed to be used in conjuction with the sass styles. |
| sass                | The sass folder contains all the sass source for styling a site to be consistent with .gov.uk. The majority of projects can simply include 'trade-elements.scss' which in turn will pull in all the required files. The sass files are a combination of the gov.uk toolkit, gov.uk elements and the Department of Trade styles. The files are combined to make it easier for projects to pull all these styles in without having to learn complex sass configurations.

### Online Gallery ###
The [Online Gallery](https://trade-elements.herokuapp.com/) demonstrates the layouts, components and styles that make up the Trade Elements toolkit. The gallery includes:

* Pattern name
* Descriptiong
* A working example
* Static markup
* Macro call example


## How to use this library
A tutorial is in the process of being written, for now though take a look at the source for the gallery [here](https://github.com/uktrade/trade-elements/tree/master/gallery), this project can show you how to:

* Build sass that uses the library to output css
* Use the base page layouts for pages
* Add filters to your nunjucks view renderer
* Add fields and buttons into pages using nunjucks macros

### Notes
JS for components are 'self registering'. The control searches for all elements that have a given class name and progressively enhance the page. Parameters are specified in html attributes


