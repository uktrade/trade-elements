const jsdom = require('jsdom')
const proxyquire = require('proxyquire')

const HTML = `<html>
  <body>
    <form>
      <div class="form-group">
        <label class="form-label">Test</label>
        <input class="form-control" id="test" name="test" data-display-value="1234" data-lookup-url="http://localhost/test?term=">
      </div>
    </form>
  </body></html>`

const fakeAxios = {
  get: function (url) {
    let result = (url.indexOf('good') > 0) ? [{ id: 1, name: 'test' }] : []

    return new Promise((resolve, reject) => {
      resolve(
        {
          data: result
        }
      )
    })
  }
}

function makeStubbedAutocomplete (fakeAxios) {
  return proxyquire('../../../src/components/autocomplete/autocompleteajax',
  {'axios': fakeAxios})
}

const StubbedAutocompete = makeStubbedAutocomplete(fakeAxios)

describe('AJAX Autocomplete', function () {
  let document
  let ajaxAutocomplete

  beforeEach(function (done) {
    jsdom.env(HTML, (err, jsdomWindow) => {
      if (err) {
        throw new Error(err)  // eslint-disable-line no-new
      }

      document = jsdomWindow.document
      const inputElement = document.getElementById('test')
      ajaxAutocomplete = new StubbedAutocompete(inputElement)
      done()
    })
  })

  describe('Lookup options and display as user types', function () {
    it('should show a list of suggestions when the user enters a value and there are some', function (done) {
      ajaxAutocomplete.displayField.value = 'good'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {}
      }

      ajaxAutocomplete.keyup(event)

      // Have to do this to allow promises to do their thing and account for debounce
      setTimeout(function () {
        const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
        const suggestions = document.querySelectorAll('.autocomplete__suggestion')

        expect(suggestionWrapper.tagName).equal('UL')
        expect(suggestions).to.have.length(1)
        done()
      }, 300)
    })
    it('should not show suggestions if there are none for the term entered', function (done) {
      ajaxAutocomplete.displayField.value = 'bad'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {}
      }

      ajaxAutocomplete.keyup(event)
      setTimeout(function () {
        const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
        const suggestions = document.querySelectorAll('.autocomplete__suggestion')

        expect(suggestionWrapper).equal(null)
        expect(suggestions).to.have.length(0)
        done()
      }, 300)
    })
    it('should clear suggestions when the field is cleared', function (done) {
      ajaxAutocomplete.displayField.value = 'good'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {}
      }

      ajaxAutocomplete.keyup(event)

      setTimeout(function () {
        ajaxAutocomplete.displayField.value = ''
        event.keyCode = 8
        ajaxAutocomplete.keyup(event)

        setTimeout(function () {
          const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
          const suggestions = document.querySelectorAll('.autocomplete__suggestion')
          expect(suggestionWrapper).equal(null)
          expect(suggestions).to.have.length(0)
          done()
        })
      }, 300)
    })
    it('should clear suggestions when you provide a good then bad term', function (done) {
      ajaxAutocomplete.displayField.value = 'good'
      const event = {
        keyCode: 143,
        stopPropagation: function () {},
        preventDefault: function () {}
      }

      ajaxAutocomplete.keyup(event)

      setTimeout(function () {
        ajaxAutocomplete.displayField.value = 'bad'
        event.keyCode = 8
        ajaxAutocomplete.keyup(event)

        setTimeout(function () {
          const suggestionWrapper = document.querySelector('.autocomplete__suggestions')
          const suggestions = document.querySelectorAll('.autocomplete__suggestion')
          expect(suggestionWrapper).equal(null)
          expect(suggestions).to.have.length(0)
          done()
        })
      }, 300)
    })
  })
})
