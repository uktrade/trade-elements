# 0.0.7

- The bond release... Remove dependencies to reduce download and build times.
- Add this changelog

# 0.0.8
- Fix issue exporting common javascript functions

# 1.0.0
- Bug fixes, new release

# 1.1.0
- Fix bug with stripey param in table
- Add feature to set sort oder of keys in key value table
- Add feature to set order of columns in data table
- Allow empty strings in table values
- Added ability to include markup in table cells
- Added new badge colour and size
- Added array support in key value tables

# 1.2.0
- Add Styles for pre and post heading

# 1.2.1
- Fix issue again with showing table cells when the key doesn't exist

# 1.2.2
- Minor changes to striped tables

# 1.2.3
- Make read only table font black to improve contrast

# 1.2.4
- Made path for css image assets relative

# 1.3.0
- Automatically rev asset names to break caches

# 1.4.0
- Change page headings in a distinct style instead of overriding just xlarge

# 1.5.0
- Add a top border to key value tables

# 1.5.1
- Minor tweek to spacing in panels

# 2.0.0
- Remove jquery, none of the JS needs it.

# 2.1.0
- Fixed a bug with radio button highlight that meant the old version simply didn't work

# 2.1.1
- Stray log statement

# 2.2.0
- Fix small bugs in dropdown 
- Add a info strip class that can be used in flash messages or regular messages. 
- Added more features to element helper
- Added an autocomplete component that enhances a regular select.

# 2.3.0
- Added a new style of table modifier for small key value tables
- Tweeked search result layout to allow elements to be absolutely positioned in a search result
- Added a close link style in search results for use when expanding or closing more info in a search result
- Added a column-three-quarters style for some layouts that need it and not found in gds elements

# 2.3.1
- Fine tuned the result close link. Moves inside title and with titles with and without links

# 2.4.0
- Added more useful methods to element stuff
- Changed button styles to use prebuild helpers

# 2.5.0
- Added support for labels in error panel

# 2.5.1
- Minor spacing changes and additional styles for button bars

# 2.6.0
- Split autocomplete into 2 variations, select based and ajax based
- Changed css names for autocomplete to use consistant naming convention
- Added documentation for autocomplete to gallery
- Added support for passing dates in yyyy-mm-ddTHH:MM:SS format to date fields.

# 2.6.1
- Fixed a bug in autosuggest when using ajax to lookup results

# 2.6.2
- Allow create element to accept reference to document for testing.
- Added a helper to remove elements off the page.

# 3.0.0
- Change header style to new simpler header with no crown
- Disabled revision tools in develop mode

# 3.0.1
- Fix support for IE11 and below by including polyfill

# 3.0.2
- Split out polyfill so that it fixes clashes with including polyfill in child projects.

# 3.0.3
- Fix issue with IE browser detection as not supported >= IE10
- Switch from polyfill to babel-runtime to avoid side effects
- Remove dependency on Array.prototype.includes as not supported in IE <= 11
- Improve rendering of searchbar on IE by using padding instead of line-height

# 3.0.4
- Improve NPM package to reduce asset size

# 3.1.0
- Add a new 'plain' style table, with no ruler and subtle label
- Deprecate use of 'readonly' property in tables to switch to use 'variation' property instead
- Change flash messsages to create new control 'infostrip'
- Added a new 'card' component to show details in a card like view
