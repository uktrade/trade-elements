class FlashMessage {
  constructor (element) {
    this.element = element
    this.addCloseLink()
  }

  removeMessage () {
    this.element.parentNode.removeChild(this.element)
  }

  addCloseLink () {
    let removeMessage = this.removeMessage.bind(this)
    let closeLink = document.createElement('a')

    closeLink.innerHTML = 'Close'
    closeLink.href = '#'
    closeLink.onclick = (e) => {
      e.preventDefault()
      removeMessage()
    }

    this.element.appendChild(closeLink)
  }

  static activateAll () {
    const flashes = document.querySelectorAll('.flash-message')
    flashes.forEach((elem) => {
      new FlashMessage(elem)
    })
  }
}

FlashMessage.activateAll()
