/* global document: true */
const { addClass, removeClass } = require('../../javascripts/lib/');

const radioElements = document.querySelectorAll('.block-label input[type="radio"]')

function handleBlur (event) {
  removeClass(event.target.parentElement, 'focused')
}

function handleFocus (event) {
  addClass(event.target.parentElement, 'focused')
}

function handleChange (event) {
  const allWithName = document.querySelectorAll(`input[name="${event.target.name}"]`)
  allWithName.forEach(element => removeClass(element.parentElement, 'selected'))
  addClass(event.target.parentElement, 'selected')
}

radioElements.forEach((element) => {
  element.addEventListener('change', handleChange, true)
  const label = element.parentElement
  label.addEventListener('focus', handleFocus, true)
  label.addEventListener('blur', handleBlur, true)
})
