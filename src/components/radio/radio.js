/* global document: true */
const { addClass, removeClass } = require('../../javascripts/lib/elementstuff')

const radioElements = document.querySelectorAll('.block-label input[type="radio"]')

function handleBlur (event) {
  removeClass(event.target.parentElement, 'focused')
}

function handleFocus (event) {
  addClass(event.target.parentElement, 'focused')
}

function handleChange (event) {
  const allWithName = document.querySelectorAll(`input[name="${event.target.name}"]`)
  removeClass(allWithName, 'selected')
  addClass(event.target.parentElement, 'selected')
}

  // replace with a for loop and element.item(index)
for (let pos = 0; pos < radioElements.length; pos += 1) {
  const element = radioElements.item(pos)
  element.addEventListener('change', handleChange, true)
  const label = element.parentElement
  label.addEventListener('focus', handleFocus, true)
  label.addEventListener('blur', handleBlur, true)
}
