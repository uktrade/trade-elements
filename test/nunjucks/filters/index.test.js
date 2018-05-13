/* globals expect: true, describe: true, it: true */
const filters = require('../../../src/nunjucks/filters')

describe('Nunjuck filters', function () {
  describe('Parse a date in form dd/mm/yyyy', function () {
    let date1 = '10/11/2016'
    let date2 = '1/2/2015'

    it('should return the day for a date', function () {
      const day = filters.dateParseDay(date1)
      expect(day).to.equal('10')
    })
    it('should return the month for a date', function () {
      const month = filters.dateParseMonth(date1)
      expect(month).to.equal('11')
    })
    it('should return the year for a date', function () {
      const year = filters.dateParseYear(date1)
      expect(year).to.equal('2016')
    })
    it('should handle short days', function () {
      const day = filters.dateParseDay(date2)
      expect(day).to.equal('01')
    })
    it('should handle short months', function () {
      const month = filters.dateParseMonth(date2)
      expect(month).to.equal('02')
    })
  })
  describe('Parse a date in form yyyy-mm-ddThh:MM:ss', function () {
    let date1 = '2016-11-10T13:10:01.079Z'
    let date2 = '2016-2-1T13:10:01.079Z'

    it('should return the day for a date', function () {
      const day = filters.dateParseDay(date1)
      expect(day).to.equal('10')
    })
    it('should return the month for a date', function () {
      const month = filters.dateParseMonth(date1)
      expect(month).to.equal('11')
    })
    it('should return the year for a date', function () {
      const year = filters.dateParseYear(date1)
      expect(year).to.equal('2016')
    })
    it('should handle short days', function () {
      const day = filters.dateParseDay(date2)
      expect(day).to.equal('01')
    })
    it('should handle short months', function () {
      const month = filters.dateParseMonth(date2)
      expect(month).to.equal('02')
    })
  })
  describe('Parse a date in form yyyy-mm-dd', function () {
    let date1 = '2016-11-10'
    let date2 = '2016-2-1'

    it('should return the day for a date', function () {
      const day = filters.dateParseDay(date1)
      expect(day).to.equal('10')
    })
    it('should return the month for a date', function () {
      const month = filters.dateParseMonth(date1)
      expect(month).to.equal('11')
    })
    it('should return the year for a date', function () {
      const year = filters.dateParseYear(date1)
      expect(year).to.equal('2016')
    })
    it('should handle short days', function () {
      const day = filters.dateParseDay(date2)
      expect(day).to.equal('01')
    })
    it('should handle short months', function () {
      const month = filters.dateParseMonth(date2)
      expect(month).to.equal('02')
    })
  })
  describe('handle native js date', function () {
    it('should handle a regular js date', function () {
      const now = new Date()
      const month = filters.dateParseMonth(now)
      expect(month).to.not.equal(null)
    })
  })
})
