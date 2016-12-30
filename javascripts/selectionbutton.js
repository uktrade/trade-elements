const $ = require('jquery');

class SelectionButtons {

  constructor(element) {
    this.selectedClass = 'selected';
    this.focusedClass = 'focused';
    this.element = $(element);
    this.name = this.element.attr('name');
    this.elementType = this.element.attr('type');
    this.form = this.element.closest('form');
    this.allWithName = this.form.find(`input[name="${this.name}"]`);
    this.label = this.element.parent('label');
    this.addEvents();
    this.setInitialState(this.element);
  }

  addEvents() {
    this.element
      .on('click', this.clickHandler)
      .on('focus', this.focusHandler)
      .on('blur', this.blurHandler);
  }

  setInitialState() {
    if (this.element.is(':checked')) {
        this.markSelected();
    }
  }

  markSelected() {
    if (this.elementType === 'radio') {

      const selectedClass = this.selectedClass;
      this.allWithName.each((index, element) => {
        $(element).parent('label').removeClass(selectedClass);
      });

      this.label.addClass(this.selectedClass);

    } else if (this.element.is(':checked')) {
        this.label.addClass(this.selectedClass);
      } else {
        this.label.removeClass(this.selectedClass);
      }
  }

  clickHandler = () => {
    this.markSelected();
  };

  focusHandler = () => {
    this.element.parent('label').addClass(this.focusedClass);
  };

  blurHandler = () => {
    this.element.parent('label').removeClass(this.focusedClass);
  };

}

module.exports = SelectionButtons;
