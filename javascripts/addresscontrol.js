const $ = require('jquery')
const Autocomplete = require('./autocomplete')
const countries = require('./countries.js')

class AddressControl {

  constructor(element, postcodeUrl = '/postcodelookup/') {
    this.postcodeUrl = postcodeUrl;
    this.element = $(element);
    this.setInitialState();
    this.setInitialView();
    this.updateVisibility();
    this.addEvents();
    new Autocomplete(this.addressCountryInput, countries);
    if (this.element.data('error').length > 0) {
      this.showAddress();
    }
  }

  setInitialView() {
    // Create a postcode lookup section just below the country.
    let template = `
      <div>
        <div class="address__lookup-wrapper">
          <div class="form-group form-group--postcode" id="operatingAddress.postcode-wrapper">
            <label class="form-label" for="${this.name}-postcodelookup">Postcode</label>
            <input
              class="form-control postcode-lookup-value"
              id="${this.name}-postcodelookup"
              autocomplete="off"
              value="" />
            <button class="button button-secondary lookup-postcode-button">Find UK Address</button>
          </div>
          <div class="form-group form-group--pick-address">
            <label class="form-label">Pick an address</label>
            <select class="form-control"></select>
          </div>
        </div>
        <a href="#" class="reveal-manual-entry">Enter address manually</a>
      </div>`;

    this.lookupSection = $(template);
    this.lookupSection.insertAfter(this.addressCountryInput.parent());
    this.addressPickerWrapper = this.lookupSection.find('.form-group--pick-address');
    this.addressPickerWrapper.hide();
    this.lookupPostcodeButton = this.lookupSection.find('.lookup-postcode-button');
    this.lookupPostcodeInput = this.lookupSection.find('.postcode-lookup-value');
    this.revealManualEntryLink = this.lookupSection.find('.reveal-manual-entry');
    this.addressDropdown = this.addressPickerWrapper.find('select.form-control');
  }

  setInitialState() {

    this.name = this.element.attr('data-name');

    this.address1Input = this.element.find(`[name="${this.name}.address1"]`);
    this.address2Input = this.element.find(`[name="${this.name}.address2"]`);
    this.addressCityInput = this.element.find(`[name="${this.name}.city"]`);
    this.addressCountyInput = this.element.find(`[name="${this.name}.county"]`);
    this.addressPostcodeInput = this.element.find(`[name="${this.name}.postcode"]`);
    this.addressCountryInput = this.element.find(`[name="${this.name}.country"]`);
    this.errors = {};
    this.forceManualEntry = false;

    let optionalNonUk = this.element.data('optional-non-uk') || 'no';
    this.optionalNonUk = optionalNonUk.toLocaleLowerCase() !== 'no';

    let optional = this.element.data('optional') || 'no';
    this.optional = optional.toLocaleLowerCase() !== 'no';
  }

  showAddress() {
    this.address1Input.parent().show();
    this.address2Input.parent().show();
    this.addressCityInput.parent().show();
    this.addressCountyInput.parent().show();
    this.addressPostcodeInput.parent().show();
    this.revealManualEntryLink.hide();
  }

  hideAddress() {
    this.address1Input.parent().hide();
    this.address2Input.parent().hide();
    this.addressCityInput.parent().hide();
    this.addressCountyInput.parent().hide();
    this.addressPostcodeInput.parent().hide();
    this.revealManualEntryLink.show();
  }

  updateVisibility() {
    let country = this.addressCountryInput.val().toLocaleLowerCase();

    if (this.address1Input.val().length > 0 ||
        this.address2Input.val().length > 0 ||
        this.addressCityInput.val().length > 0 ||
        this.addressCountyInput.val().length > 0 ||
        this.addressPostcodeInput.val().length > 0 ||
        this.forceManualEntry ||
        country.length > 0 && country !== 'united kingdom')
    {
      this.showAddress();
    } else {
      this.hideAddress();
    }

    if (country === 'united kingdom') {
      this.lookupSection.show();
    } else {
      this.lookupSection.hide();
    }

    let addressOptions = this.addressDropdown.find('option');
    if (addressOptions.length > 1) {
      this.addressPickerWrapper.show();
    } else {
      this.addressPickerWrapper.hide();
    }
  }

  addEvents() {
    // Keyup and change for country field, update visibility.
    this.addressCountryInput.on('change', $.proxy(this.updateVisibility, this));

    // click on find uk address should trigger call to lookup address
    this.lookupPostcodeButton.on('click', $.proxy(this.postcodeLookup, this));

    // Click reveal manual address
    this.revealManualEntryLink.on('click', $.proxy(this.revealManualEntry, this));

    // when an address is selected
    this.addressDropdown.on('change', $.proxy(this.postcodeSelect, this));

    this.element.closest('form').on('submit', $.proxy(this.validate, this));
  }

  postcodeLookup(event) {

    event.preventDefault();

    let postcode = this.lookupPostcodeInput.val();

    if (!postcode || postcode.length === 0) {
      return;
    }

    const xmlhttp = new XMLHttpRequest();
    const postcodeLookupResultHandler = this.postcodeLookupResultHandler.bind(this);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        const myArr = JSON.parse(xmlhttp.responseText);
        postcodeLookupResultHandler(myArr);
      }
    };

    xmlhttp.open('GET', `${this.postcodeUrl}${postcode}`, true);
    xmlhttp.send();

  }

  postcodeLookupResultHandler(result) {

    if (!result || result.length === 0) {
      this.addressDropdown.html('');
      this.updateVisibility();
      return;
    }

    let options = '';

    if (result.length > 1) {
      options = result.map((address) => {
        return `<option
          data-address1="${address.address1}"
          data-address2="${address.address2}"
          data-city="${address.city}"
          data-county="${address.county}"
          data-postcode="${address.postcode}"
          value="${address.address1}-${address.address2}">${address.address1}, ${address.address2}</option>`;
      });
    }

    this.address1Input.val(result[0].address1);
    this.address2Input.val(result[0].address2);
    this.addressCityInput.val(result[0].city);
    this.addressCountyInput.val(result[0].county);
    this.addressPostcodeInput.val(result[0].postcode);

    this.addressDropdown.html(options);
    this.updateVisibility();
  }

  postcodeSelect() {
    let selected = this.addressDropdown.find('option:selected');
    this.address1Input.val(selected.data('address1'));
    this.address2Input.val(selected.data('address2'));
    this.addressCityInput.val(selected.data('city'));
    this.addressCountyInput.val(selected.data('county'));
    this.addressPostcodeInput.val(selected.data('postcode'));
  }

  revealManualEntry(event) {
    event.preventDefault();
    this.forceManualEntry = true;
    this.updateVisibility();
  }

  validate() {
    this.errors = {};

    if (this.optional) {
      return true;
    }

    if (!this.addressCountryInput.val() || this.addressCountryInput.val().length === 0) {
      this.errors.country = {
        message: 'Invalid or missing country',
        field: this.addressCountryInput
      };
    }

    const country = this.addressCountryInput.val().toLocaleLowerCase();

    if ( !this.optionalNonUk && country !== 'united kingdom' || country === 'united kingdom') {
      if (!this.address1Input.val() || this.address1Input.val().length === 0) {
        this.errors.address1 = {
          message: 'Address incomplete',
          field: this.address1Input
        };
      }
      if (!this.addressCityInput.val() || this.addressCityInput.val().length === 0) {
        this.errors.city = {
          message: 'Address incomplete',
          field: this.addressCityInput
        };
      }
    }

    let keys = Object.keys(this.errors);
    let contentWrapper = this.element.closest('.js-radiohide-content');
    let errorElement;
    if (contentWrapper.length > 0) {
      errorElement = contentWrapper;
    } else {
      errorElement = this.element;
    }

    this.element.find('.error-message').remove();
    this.element.find('.form-group--incomplete').removeClass('form-group--incomplete');
    errorElement.removeClass('incomplete');

    if (keys.length > 0) {
      errorElement.addClass('incomplete');

      $('<span class="error-message">The address supplied is incomplete</span>')
        .insertBefore(this.addressCountryInput.parent());

      for (let key of keys) {
        let error = this.errors[key];
        error.field.parent().addClass('form-group--incomplete');
      }

      return false;
    }

    return true;

  }

}

module.exports = AddressControl
