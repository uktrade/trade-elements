/* globals expect: true, describe: true, it: true */
'use strict';
const jsdom = require('jsdom')
const TableSort = require('../../../src/components/table/tablesort')

describe('Sortable Table', () => {

  let window;
  let tableSort;

  const html = `<html><body><table class="table--key-value js-table--sortable">
    <thead>
      <tr>        
          <th id="name-header" data-key="name">Name</th>
          <th id="role-header" data-key="role">Role</th>
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
    </tbody>
  </table></body></html>`;

  beforeEach((done) => {
    jsdom.env(html, (err, jsdomWindow) => {
      window = jsdomWindow
      done()
    })
  })

  describe('Parse headings', () => {
    it('should parse the keys from the headings', () => {
      const headingElements = window.document.querySelectorAll('table thead th')
      const keys = TableSort.parseTableHeader(headingElements)
      expect(keys).to.eql(['name', 'role', 'phone', 'email'])
    })
  })
  describe('Parse table data', () => {
    let data;
    beforeEach(() => {
      const keys = ['name', 'role', 'phone', 'email'];
      data = TableSort.parseTableBody(window.document.querySelector('table'), keys)
    })

    it('parse the correct number of records in a table', () => {
      expect(data.length).to.eq(2)
    })
    it('parses a record with the correct keys and values', () => {
      expect(data[0]).to.deep.equal({
        name: 'Fred Bloggs',
        email: 'fred@acme.org',
        phone: '+44 7888 777 333',
        role: 'Director'
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
        created: '28/01/2016'
      },
      {
        name: 'Wilma Bloggs',
        email: 'Wilma@acme.org',
        phone: '+44 7888 777 333',
        role: 'Computer Analyst',
        created: '10/10/2016'
      },
      {
        name: 'Chris Bloggs',
        email: 'Chris@acme.org',
        phone: '+44 7888 777 333',
        role: 'Architect',
        created: '10/05/2016'
      }
    ]

    it('should sort ascending', () => {
      const sorted = TableSort.sort(data, 'name')
      expect(sorted[0].name).to.equal('Chris Bloggs')
      expect(sorted[2].name).to.equal('Wilma Bloggs')
    })
    it('should sort descending', () => {
      const sorted = TableSort.sort(data, 'name', 'desc')
      expect(sorted[2].name).to.equal('Chris Bloggs')
      expect(sorted[0].name).to.equal('Wilma Bloggs')
    })
    it('should detect dates and sort asc', () => {
      const sorted = TableSort.sort(data, 'created')
      expect(sorted[0].name).to.equal('Fred Bloggs')
      expect(sorted[2].name).to.equal('Wilma Bloggs')
    })
    it('should detect dates and sort desc', () => {
      const sorted = TableSort.sort(data, 'created', 'desc')
      expect(sorted[2].name).to.equal('Fred Bloggs')
      expect(sorted[0].name).to.equal('Wilma Bloggs')
    })
  })
  describe('Re-order table when selected', () => {
    let tableSort;

    beforeEach(() => {
      const tableElement = window.document.querySelector('.js-table--sortable')
      tableSort = new TableSort(tableElement)
    })
    it('should order the table by name when I click on name', () => {
        const nameHeaderElement = window.document.getElementById('name-header')
        const event = {
          target: nameHeaderElement
        }

        tableSort.handleHeadingClick(event)

        // Check the table

    })
    it('should order by name desc if I click on name twice')
  })
  describe('indicate sort order in table heading', () => {

  })

})
