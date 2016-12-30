const $ = require('jquery');
const AddAnother = require('./addanother');
const RadioHide = require('./radiohide');
const Edit = require('./edit');
const SearchBar = require('./searchbar');
const SelectionButton = require('./selectionbutton');
const Tabs = require('./tabs');
const Autocomplete = require('./autocomplete');
const AddressControl = require('./addresscontrol');

$('.js-add-another').each((index, element) => {
  new AddAnother(element);
});

$('.js-hidden-edit').each((index, element) => {
  new Edit(element);
});

$('.js-radiohide').each((index, element) => {
  new RadioHide(element);
});

new SearchBar('js-searchbar');
$('.searchbar').each((index, element) => {
  new SearchBar(element);
});

$(':radio').each((index, element) => {
  new SelectionButton(element);
});

new Tabs('.js-tabs');

$('.js-autocomplete').each((index, element) => {
  new Autocomplete(element);
});

$('.js-address').each((index, element) => {
  new AddressControl(element);
});

module.exports = {
  AddAnother, RadioHide, Edit, SearchBar, SelectionButton, Tabs, Autocomplete, AddressControl
};
