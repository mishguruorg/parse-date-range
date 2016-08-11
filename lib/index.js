const moment = require('moment')
import _ from 'lodash'

function validateISO8601DateString (dateString) {
  // From here
  // http://stackoverflow.com/a/14322189/1092102
  const re = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
  return re.test(dateString)
}

function parseDateRange (startDateString, endDateString, daysIfSecondDateNotGiven = 7) {
  // Prevalidate date strings to stop deprecation notice in moment.js
  if (_.isString(startDateString) && !validateISO8601DateString(startDateString) || _.isString(endDateString) && !validateISO8601DateString(endDateString)) {
    throw new Error('DATE_STRING_IS_INVALID')
  }

  let result
  let startMoment = moment(startDateString, moment.ISO8601, true).utc()
  let endMoment = moment(endDateString, moment.ISO8601, true).utc()
  let extraDaysRequired = daysIfSecondDateNotGiven // Because we include the original day when calculating the extra days

  // Check that if a string was given, it was a valid date
  if (_.isString(startDateString) && !startMoment.isValid() || _.isString(endDateString) && !endMoment.isValid()) {
    throw new Error('DATE_STRING_IS_INVALID')
  }

  // If no dates were specified we give a range of the number of requested days up until today
  if (startDateString === undefined && endDateString === undefined) {
    result = {
      startDate: moment().utc().startOf('day').subtract(extraDaysRequired, 'days').toDate(),
      endDate: moment().utc().endOf('day').toDate()
    }

    // If just a start date was given then give data from that date for the amount of days requested
  } else if (_.isString(startDateString) && endDateString === undefined) {
    result = {
      startDate: startMoment.clone().toDate(),
      endDate: startMoment.clone().add(extraDaysRequired, 'days').toDate()
    }

    // If just an end date was given then give data up to that date for the amount of days requested
  } else if (_.isString(endDateString) && startDateString === undefined) {
    result = {
      startDate: endMoment.clone().subtract(extraDaysRequired, 'days').toDate(),
      endDate: endMoment.clone().toDate()
    }

    // Otherwise we have two valid dates, give the data for the requested range
  } else {
    result = {
      startDate: startMoment.clone().toDate(),
      endDate: endMoment.clone().toDate()
    }
  }

  return result
}

export default parseDateRange
