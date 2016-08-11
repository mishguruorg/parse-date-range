/* globals describe, it */

import { expect } from 'chai'
import parseDateRange from '../lib'

describe('parse-date-range', () => {
  it('Should parse valid ISO 8601 dates', () => {
    const res = parseDateRange('2016-08-11T10:39:56+00:00', '2016-08-11T10:39:56+00:00')
    expect(res.startDate).to.exist
    expect(res.endDate).to.exist
  })
  it('Should not parse invalid ISO 8601 dates', () => {
    try {
      parseDateRange('baddate', 'baddate')
      expect(false)
    } catch (e) {
      expect(e.toString()).to.contain('DATE_STRING_IS_INVALID')
    }
  })
  it('Should return a date range if no dates supplied', () => {
    const res = parseDateRange()
    expect(res.startDate).to.exist
    expect(res.endDate).to.exist
  })
})
