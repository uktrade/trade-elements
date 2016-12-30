const $ = require('jquery');

class RadioHideComponent {

  constructor(element) {
    this.element = $(element);
    this.radioButtons = this.element.find('input[type=radio]');
    this.content = this.element.find('.js-radiohide-content');
    this.revealFor = this.element.data('reveal-for') || 'yes';
    this.radioButtons.on('change', this.updateView);
    this.content.hide();
    this.updateView();

  }

  updateView = () => {
    let revealFor = this.revealFor.toLocaleLowerCase();
    this.radioButtons.each((index, element) => {
      if (element.checked === true) {
        if (element.value.toLocaleLowerCase() === revealFor) {
          this.content.show();
        } else {
          this.content.hide();
        }
      }
    });
  };

}

module.exports = RadioHideComponent;
