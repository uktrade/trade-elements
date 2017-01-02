const $ = require('jquery')
const Autocomplete = require('./../components/autocomplete/autocomplete')

class AddAnother {
  constructor(element) {
    this.element = $(element);
    const formGroups = this.element.find('.form-group');

    this.fieldCount = formGroups.length;
    this.firstGroup = formGroups.filter(':first');
    this.originalField = this.firstGroup.find('.form-control');
    this.fieldName = this.originalField.attr('name');
    this.buttonElement = this.element.find('.add-another-button');

    this.buttonElement.on('click', this.addField);
  }

  addField = (event) => {
    event.preventDefault();
    this.fieldCount += 1;

    // Create a new copy of the field
    const newFormGroup = this.firstGroup.clone();
    const newInput = newFormGroup.find(`[name='${this.fieldName}']`);

    // Give the field a new ID and the label point to it too
    const newId = `${this.fieldName}-${this.fieldCount}`;
    newInput.val('').attr('id', newId);
    newFormGroup.find('label').attr('for', newId);

    const lastField = this.element.find(`[name='${this.fieldName}']`)
      .filter(':last')
      .parent();

    newFormGroup.insertAfter(lastField);

    newInput.focus();

    if (newInput.hasClass('js-autocomplete')) {
      new Autocomplete(newInput);
    }

  };
}

modules.exports = AddAnother;
