const $ = require('jquery')

class SearchBar {

  constructor(element) {
    this.element = $(element);

    this.input = this.element.find('.searchbar__input');
    this.label = this.element.find('.searchbar__label');

    this.bindEvents();
    this.inputBlurHandler();
  }


  bindEvents() {
    this.input.on('focus', this.inputFocusHandler);
    this.input.on('blur', this.inputBlurHandler);
  }

  inputFocusHandler = () => {
    this.label.hide();
  };

  inputBlurHandler = () => {
    if (this.input.val() === '') {
      this.label.show();
    } else {
      this.label.hide();
    }
  };

}

$('.searchbar-js').each((index, element) => {
  new SearchBar(element)
})

