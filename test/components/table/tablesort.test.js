/* globals expect: true, describe: true, it: true, beforeEach: true */
'use strict'
const { JSDOM } = require('jsdom')
const TableSort = require('../../../src/components/table/tablesort')

const FIRST_NAME_SELECTOR = '.js-table--sortable tbody tr:first-child td:first-child'
const LAST_NAME_SELECTOR = '.js-table--sortable tbody tr:last-child td:first-child'
const HTML = `<html><body><table class="table--data table--sortable js-table--sortable">
    <thead>
      <tr>
          <th data-key="name">Name</th>
          <th data-key="role">Role</th>
          <th data-key="phone">Phone</th>
          <th data-key="email">Email</th>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td>Fred Bloggs</td>
          <td>Director</td>
          <td>+44 7888 777 333</td>
          <td>fred@acme.org</td>
        </tr>
        <tr>
          <td>Wilma Bloggs</td>
          <td>Director</td>
          <td>+44 7888 777 333</td>
          <td>wilma@acme.org</td>
        </tr>
        <tr>
          <td>Chris Bloggs</td>
          <td>Architect</td>
          <td>+44 7888 777 333</td>
          <td>chris@acme.org</td>
        </tr>
    </tbody>
  </table></body></html>`

function domTokenToArray (obj) {
  let array = []
  // iterate backwards ensuring that length is an UInt32
  for (let i = obj.length >>> 0; i--;) {
    array[i] = obj[i]
  }
  return array
}

describe('Sortable Table', () => {
  let document

  beforeEach(() => {
    document = new JSDOM(HTML).window.document
  })

  describe('Parse headings', () => {
    it('should parse the keys from the headings', () => {
      const headingElements = document.querySelectorAll('table thead th')
      const keys = TableSort.parseTableHeader(headingElements)
      expect(keys).to.eql(['name', 'role', 'phone', 'email'])
    })
  })
  describe('Parse table data', () => {
    let data
    beforeEach(() => {
      const keys = ['name', 'role', 'phone', 'email']
      data = TableSort.parseTableBody(document.querySelector('table'), keys)
    })

    it('parse the correct number of records in a table', () => {
      expect(data.length).to.eq(3)
    })
    it('parses a record with the correct keys and values', () => {
      expect(data[0]).to.deep.equal({
        name: 'Fred Bloggs',
        email: 'fred@acme.org',
        phone: '+44 7888 777 333',
        role: 'Director',
      })
    })
  })
  describe('Sort data', () => {
    const data = [
      {
        name: 'Fred Bloggs',
        email: 'fred@acme.org',
        phone: '+44 7888 777 333',
        role: 'Director',
        created: '28/01/2016',
      },
      {
        name: 'Wilma Bloggs',
        email: 'Wilma@acme.org',
        phone: '+44 7888 777 333',
        role: 'Computer Analyst',
        created: '10/10/2016',
      },
      {
        name: 'Chris Bloggs',
        email: 'chris@acme.org',
        phone: '+44 7888 777 333',
        role: 'Architect',
        created: '10/05/2016',
      },
    ]

    it('should sort ascending', () => {
      const sorted = TableSort.sort(data, 'name')
      expect(sorted[0].name).to.equal('Chris Bloggs')
      expect(sorted[2].name).to.equal('Wilma Bloggs')
    })
    it('should sort descending', () => {
      const sorted = TableSort.sort(data, 'name', false)
      expect(sorted[2].name).to.equal('Chris Bloggs')
      expect(sorted[0].name).to.equal('Wilma Bloggs')
    })
    it('should detect dates and sort asc', () => {
      const sorted = TableSort.sort(data, 'created')
      expect(sorted[0].name).to.equal('Fred Bloggs')
      expect(sorted[2].name).to.equal('Wilma Bloggs')
    })
    it('should detect dates and sort desc', () => {
      const sorted = TableSort.sort(data, 'created', false)
      expect(sorted[2].name).to.equal('Fred Bloggs')
      expect(sorted[0].name).to.equal('Wilma Bloggs')
    })
  })
  describe('Re-order table when selected', () => {
    let tableSort
    let nameHeaderElement
    let event

    beforeEach(() => {
      const tableElement = document.querySelector('.js-table--sortable')
      tableSort = new TableSort(tableElement, document) // eslint-disable-line no-new
      nameHeaderElement = document.querySelector('[data-key="name"]')
      event = {
        target: nameHeaderElement,
      }
    })
    it('should order the table by name when I click on name', () => {
      tableSort.handleHeadingClick(event)

      // Get the first row and the last row to check.
      const firstName = document.querySelector(FIRST_NAME_SELECTOR).textContent
      const lastName = document.querySelector(LAST_NAME_SELECTOR).textContent

      expect(firstName).to.equal('Chris Bloggs')
      expect(lastName).to.equal('Wilma Bloggs')
    })
    it('should order by name desc if I click on name twice', () => {
      tableSort.handleHeadingClick(event)
      tableSort.handleHeadingClick(event)

      // Get the first row and the last row to check.
      const firstName = document.querySelector(FIRST_NAME_SELECTOR).textContent
      const lastName = document.querySelector(LAST_NAME_SELECTOR).textContent

      expect(firstName).to.equal('Wilma Bloggs')
      expect(lastName).to.equal('Chris Bloggs')
    })
  })
  describe('indicate sort order in table heading', () => {
    let tableSort
    let nameHeaderElement
    let roleHeaderElement

    beforeEach(() => {
      const tableElement = document.querySelector('.js-table--sortable')
      tableSort = new TableSort(tableElement, document) // eslint-disable-line no-new
      nameHeaderElement = document.querySelector('[data-key="name"]')
      roleHeaderElement = document.querySelector('[data-key="role"]')
    })
    it('should indicate sort ascending when clicking on a column', () => {
      tableSort.handleHeadingClick({ target: nameHeaderElement })
      expect(domTokenToArray(nameHeaderElement.classList)).to.include('table--sortable__sort-asc')
    })
    it('should indicate sort descending when clicking on a column twice', () => {
      tableSort.handleHeadingClick({ target: nameHeaderElement })
      tableSort.handleHeadingClick({ target: nameHeaderElement })

      expect(domTokenToArray(nameHeaderElement.classList)).to.include('table--sortable__sort-desc')
    })
    it('should indicate sort ascending on a column and clear previous if previous ascending', () => {
      tableSort.handleHeadingClick({ target: nameHeaderElement })
      tableSort.handleHeadingClick({ target: roleHeaderElement })

      expect(nameHeaderElement.className).to.equal('')
      expect(domTokenToArray(roleHeaderElement.classList)).to.include('table--sortable__sort-asc')
    })
    it('should indicate sort ascending on a column and clear previous if previous descending', () => {
      tableSort.handleHeadingClick({ target: nameHeaderElement })
      tableSort.handleHeadingClick({ target: nameHeaderElement })
      tableSort.handleHeadingClick({ target: roleHeaderElement })

      expect(nameHeaderElement.className).to.equal('')
      expect(domTokenToArray(roleHeaderElement.classList)).to.include('table--sortable__sort-asc')
    })
  })
})
