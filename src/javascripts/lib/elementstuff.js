const regularExp1 = '(\\s|^)'
const regularExp2 = '(\\s|$)'

function addClass (element, className) {
  if (isNodeList(element)) {
    for (let pos = element.length - 1; pos > -1; pos -= 1) {
      addClass(element.item(pos), className)
    }
  } else if (element.classList) {
    element.classList.add(className)
  } else if (!hasClass(element, className)) {
    element.className += ' ' + className
  }
}

function removeClass (element, className) {
  if (isNodeList(element)) {
    for (let pos = element.length - 1; pos > -1; pos -= 1) {
      removeClass(element.item(pos), className)
    }
  } else if (element.classList) {
    element.classList.remove(className)
  } else if (hasClass(element, className)) {
    const regClass = new RegExp(regularExp1 + className + regularExp2)
    element.className = element.className.replace(regClass, ' ')
  }
}

function hasClass (element, className) {
  if (element.classList) {
    return element.classList.contains(className)
  }
  return element.className.match(new RegExp(regularExp1 + className + regularExp2))
}

function toggleClass (element, className) {
  if (isNodeList(element)) {
    for (let pos = element.length - 1; pos > -1; pos -= 1) {
      toggleClass(element.item(pos), className)
    }
  } else if (hasClass(element, className)) {
    removeClass(element, className)
  } else {
    addClass(element, className)
  }
}

function generateID () {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function isNodeList (nodes) {
  const stringRepr = Object.prototype.toString.call(nodes)

  return typeof nodes === 'object' &&
    /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
    (typeof nodes.length === 'number') &&
    (nodes.length === 0 || (typeof nodes[0] === 'object' && nodes[0].nodeType > 0))
}

module.exports = {
  addClass, removeClass, hasClass, toggleClass, generateID, isNodeList
}
