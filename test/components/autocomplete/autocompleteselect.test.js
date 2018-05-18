/* globals expect: true, describe: true, it: true, beforeEach: true */
const AutocompleteSelect = require('../../../src/components/autocomplete/autocompleteselect')
const { JSDOM } = require('jsdom')

const HTML = `<html>
  <body>
    <select id="test-select">
      <option value="">Select an option</option>
      <option value="1">One</option>
      <option value="2" selected>Two</option>
      <option value="3">Three</option>
    </select>
  </body></html>`

function domTokenToArray (obj) {
  let array = []
  // iterate backwards ensuring that length is an UInt32
  for (let i = obj.length >>> 0; i--;) {
    array[i] = obj[i]
  }
  return array
}

describe('Select Autocomplete', function () {
  let document
  let selectAutocomplete

  beforeEach(function () {
    document = new JSDOM(HTML).window.document
    const selectElement = document.getElementById('test-select')
    selectAutocomplete = new AutocompleteSelect(selectElement)
  })

  describe('Parse existing select', function () {
    it('should parse the options', function () {
      const options = selectAutocomplete.options
      const expectedOptions = {
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
      }
      expect(options).to.deep.equal(expectedOptions)
    })
    it('should know the currently selected value', function () {
      expect(selectAutocomplete.value).to.equal('2')
    })
    it('should hide the existing control', function () {
      const selectElement = document.getElementById('test-select')
      expect(domTokenToArray(selectElement.classList)).to.include('hidden')
    })
    it('should create an text field to show the user', function () {
      const newField = document.querySelector('[aria-owns="test-select"]')
      expect(newField.tagName).to.equal('INPUT')
    })
    it('should show the initial value in the autocomplete field', function () {
      const newField = document.querySelector('[aria-owns="test-select"]')
      expect(newField.value).to.equal('Two')
    })
    it('should not show a value if no value it selected', function () {
      const HTML = `<html>
        <body>
          <select id="test-select">
            <option value="">Select an option</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </body></html>`

      document = new JSDOM(HTML).window.document
      const selectElement = document.getElementById('test-select')
      selectAutocomplete = new AutocompleteSelect(selectElement)
      const newField = document.querySelector('[aria-owns="test-select"]')

      expect(newField.value).to.equal('')
    })
  })

  describe('Lookup options and display as user types', function () {
    it('should show a list of suggestions when the user enters a value', function () {
      selectAutocomplete.displayField.value = 'on'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {},
      }

      selectAutocomplete.keyup(event)
      const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
      const suggestions = document.querySelectorAll('.autocomplete__suggestion')

      expect(suggestionWrapper.tagName).equal('UL')
      expect(suggestions).to.have.length(1)
    })
    it('should not provide the first empty option in results', function () {
      selectAutocomplete.displayField.value = 'select'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {},
      }

      selectAutocomplete.keyup(event)
      const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
      const suggestions = document.querySelectorAll('.autocomplete__suggestion')

      expect(suggestionWrapper).equal(null)
      expect(suggestions).to.have.length(0)
    })
    it('should clear suggestions when the field is cleared', function () {
      selectAutocomplete.displayField.value = 'on'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {},
      }

      selectAutocomplete.keyup(event)

      selectAutocomplete.displayField.value = ''
      event.keyCode = 8
      selectAutocomplete.keyup(event)

      const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
      const suggestions = document.querySelectorAll('.autocomplete__suggestion')
      expect(suggestionWrapper).equal(null)
      expect(suggestions).to.have.length(0)
    })
  })
  describe('Suggestion selection', function () {
    it('should select the empty value when nothing is entered', function () {
      selectAutocomplete.displayField.value = ''
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {},
      }

      selectAutocomplete.keyup(event)

      const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
      const suggestions = document.querySelectorAll('.autocomplete__suggestion')
      expect(suggestionWrapper).equal(null)
      expect(suggestions).to.have.length(0)
    })
  })
})
