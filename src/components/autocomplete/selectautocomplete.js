/* eslint no-useless-escape: 0, no-new: 0 */
const { addClass, removeClass, insertAfter, findDoc } = require('../../javascripts/lib/elementstuff')
const ACTIVECLASS = 'autosuggest__suggestion--active'
const SUGGESTIONCLASS = 'autosuggest__suggestion'

// A Select autocomplete, turns an existing autocomplete into
// an autosuggest field. Changes you make update select.
class SelectAutocomplete {

  constructor (element) {
    this.element = element
    this.document = findDoc(this.element)
    this.mousedover = false
    this.focused = false
    this.getOptions()
    this.getCurrentValue()
    this.hideCurrentControl()
    this.createInput()
    this.attachEvents()
    addClass(this.element.parentNode, 'autosuggest__container')
  }

  hideCurrentControl () {
    addClass(this.element, 'hidden')
  }

  getOptions () {
    const options = {}
    const optionElements = this.element.querySelectorAll('option')
    for (let pos = 0; pos < optionElements.length; pos += 1) {
      const element = optionElements.item(pos)
      if (element.value.length > 0) {
        options[element.value] = element.innerHTML
      }
    }

    this.options = options
  }

  getCurrentValue () {
    this.value = this.element.value
    if (typeof this.options[this.value] !== 'undefined') {
      this.displayValue = this.options[this.value]
    } else {
      this.displayValue = ''
    }
  }

  createInput () {
    const input = this.document.createElement('input')
    input.setAttribute('aria-owns', this.element.id)
    input.setAttribute('aria-hidden', true)
    input.setAttribute('type', 'text')
    addClass(input, 'form-control')
    input.value = this.displayValue
    insertAfter(input, this.element)
    this.displayField = input
  }

  lookup () {
    this.hide()
    const term = this.displayField.value.toLowerCase().trim()

    if (term.length === 0) {
      this.hide()
      return
    }

    const matches = {}
    let found = false
    for (const key of Object.keys(this.options)) {
      const option = this.options[key]
      if (option.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
        found = true
        matches[key] = option
      }
    }

    if (found) {
      this.renderSuggestions(matches, term)
    }
  }

  renderSuggestions (matches, term) {
    console.log('render suggestions')
    let markup = ''
    const keys = Object.keys(matches)
    for (const key of keys) {
      const option = matches[key]
      markup += `<li class="${SUGGESTIONCLASS}" data-value="${key}">${this.highlighter(option, term)}</li>`
    }

    this.suggestionsElement = this.document.createElement('ul')
    this.suggestionsElement.setAttribute('aria-hidden', true)
    addClass(this.suggestionsElement, 'autosuggest__suggestions')
    this.suggestionsElement.innerHTML = markup
    this.attachSuggestionEvents(this.suggestionsElement)
    insertAfter(this.suggestionsElement, this.displayField)
  }

  highlighter (item, term) {
    const highlightTerm = term.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
    return item.replace(new RegExp('(' + highlightTerm + ')', 'ig'), ($1, match) => {
      return '<strong>' + match + '</strong>'
    })
  }

  select (target) {
    if (!target) {
      target = this.suggestionsElement.querySelector(`.${ACTIVECLASS}`)
    }
    if (!target) return

    const value = target.getAttribute('data-value')
    const display = target.textContent
    this.element.value = value
    this.displayField.value = display
    this.hide()
  }

  // Event Handers

  focus = (event) => {
    this.focused = true
  }

  blur = (event) => {
    this.focused = false
    if (!this.mousedover) {
      this.hide()
    }
  }

  move = (event) => {
    if (!this.suggestionsElement) return

    switch (event.keyCode) {
      case 9: // tab
      case 13: // enter
      case 27: // escape
        event.preventDefault()
        break

      case 38: // up arrow
        event.preventDefault()
        this.prev()
        break

      case 40: // down arrow
        event.preventDefault()
        this.next()
        break
    }

    event.stopPropagation()
  };

  keypress = (event) => {
    if (this.suppressKeyPressRepeat) return
    this.move(event)
  }

  keyDown = (event) => {
    this.suppressKeyPressRepeat = [40, 38, 9, 13, 27].includes(event.keyCode)
    this.move(event)
  }

  keyup = (event) => {
    switch (event.keyCode) {
      case 40: // down arrow
      case 38: // up arrow
      case 16: // shift
      case 17: // ctrl
      case 18: // alt
        break

      case 9: // tab
      case 13: // enter
        if (!this.suggestionsElement) return
        this.select()
        break

      case 27: // escape
        if (!this.suggestionsElement) return
        this.hide()
        break

      default:
        this.lookup()
    }

    event.stopPropagation()
    event.preventDefault()
  }

  suggestionClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    this.select(event.target)
    this.displayField.focus()
  }

  next () {
    let currentActive = this.suggestionsElement.querySelector(`.${ACTIVECLASS}`)
    if (!currentActive) {
      addClass(this.suggestionsElement.querySelector(`.${SUGGESTIONCLASS}:first-child`), ACTIVECLASS)
      return
    }

    removeClass(currentActive, ACTIVECLASS)
    let next = currentActive.nextSibling
    if (!next) {
      next = this.suggestionsElement.querySelector(`.${SUGGESTIONCLASS}:first-child`)
    }

    addClass(next, ACTIVECLASS)
  }

  prev () {
    const currentActive = this.suggestionsElement.querySelector(`.${ACTIVECLASS}`)

    if (!currentActive) {
      addClass(this.suggestionsElement.querySelector(`.${SUGGESTIONCLASS}:last-child`), ACTIVECLASS)
      return
    }

    removeClass(currentActive, ACTIVECLASS)
    let prev = currentActive.previousSibling

    if (!prev) {
      prev = this.suggestionsElement.querySelector(`.${SUGGESTIONCLASS}:last-child`)
    }

    addClass(prev, ACTIVECLASS)
  }

  mouseEnter = (event) => {
    this.mousedover = true
    removeClass(this.suggestionsElement.querySelector(`.${ACTIVECLASS}`), ACTIVECLASS)
    addClass(event.target, ACTIVECLASS)
  }

  mouseLeave = (event) => {
    this.mousedover = false
    removeClass(event.target, ACTIVECLASS)
  }

  hide () {
    if (this.suggestionsElement) {
      this.element.parentNode.removeChild(this.suggestionsElement)
      this.suggestionsElement = null
    }
  }

  attachEvents () {
    this.displayField.addEventListener('focus', this.focus, false)
    this.displayField.addEventListener('blur', this.blur, false)
    this.displayField.addEventListener('keydown', this.keyDown, false)
    this.displayField.addEventListener('keyup', this.keyup, false)
  }

  attachSuggestionEvents (suggestionsElement) {
    suggestionsElement.addEventListener('click', this.suggestionClick)
    suggestionsElement.addEventListener('mouseenter', this.mouseEnter)
    suggestionsElement.addEventListener('mouseleave', this.mouseLeave)
  }
}

if (typeof document !== 'undefined') {
  const selects = document.querySelectorAll('.select-autocomplete-js select')
  for (let pos = 0; pos < selects.length; pos += 1) {
    const select = selects.item(pos)
    new SelectAutocomplete(select)
  }
}

module.exports = SelectAutocomplete
