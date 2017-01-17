function isDate(text) {
  return text.length === 10 && text.charAt(2) === '/' && text.charAt(5) === '/'
}

function convertToDate(string) {
  const parts =string.split('/');
  return new Date(parts[2],parts[1]-1,parts[0]);
}

class TableSort {

  constructor (element) {
    this.element = element
    this.cacheElements()
    this.attachEvents()
    this.parseTable()
    this.direction = 'asc'
    this.currentKey = null
  }

  cacheElements () {
    this.headingElements = this.element.querySelectorAll('thead th')
  }

  attachEvents () {
    for (let pos = 0; pos < this.headingElements.length; pos += 1) {
      const element = this.headingElements.item(pos)
      element.addEventListener('click', this.handleHeadingClick)
    }
  }

  parseTable () {
    this.keys = TableSort.parseTableHeader(this.headingElements)
    this.data = TableSort.parseTableBody(this.element, this.keys)
  }

  handleHeadingClick =  (event) => {
    // Figure get the key to sort from the markup
    const key = event.target.getAttribute('data-key')

    // asc or descending? is the current key the same as the last one

    // sort the data

    // render to html

    // replace the table body

    // mark the column as sorted
  }

  static parseTableHeader (headingElements) {
    let keys = []
    // parse the headings into an array of keys.
    for (let pos = 0; pos < headingElements.length; pos += 1) {
      keys.push(headingElements.item(pos).getAttribute('data-key'))
    }

    return keys
  }

  static parseTableBody (tableElement, keys) {
    let rowsData = [];
    const rows = tableElement.querySelectorAll('tbody tr')

    for (let rowPos = 0; rowPos < rows.length; rowPos += 1) {
      const rowElement = rows.item(rowPos)
      const rowCells = rowElement.querySelectorAll('td')
      rowsData[rowPos] = {}
      for (let col = 0; col < keys.length; col += 1) {
        rowsData[rowPos][keys[col]] = rowCells[col].textContent
      }
    }

    return rowsData
  }

  static sort (data, key, direction = 'asc') {
    const sortAsc = (direction.toLowerCase() === 'asc') ? true : false
    return data.sort( (a,b) => {
      let aValue = a[key]
      let bValue = b[key]

      if (isDate(aValue) && isDate(bValue)) {
        aValue = convertToDate(aValue)
        bValue = convertToDate(bValue)
      }

      let result = 0;
      if (aValue < bValue) result = -1
      if (aValue > bValue) result = 1

      if (!sortAsc) {
        result = result - (result * 2)
      }

      return result
    })
  }

}

module.exports = TableSort
