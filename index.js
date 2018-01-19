'use strict'

var configure = require('react-widgets/lib/configure')
var formatWithOptions = require('date-fns/fp/formatWithOptions')
var parseWithOptions = require('date-fns/fp/parseWithOptions')
var addYears = require('date-fns/fp/addYears')
var locales = require('date-fns/locale')
var propOr = require('ramda/src/propOr')
var pathOr = require('ramda/src/pathOr')

var enUS = locales.enUS

var endOfDecade = addYears(10)

var endOfCentury = addYears(100)

function getLocale (culture) {
  return propOr(enUS, culture, locales)
}

function format (date, pattern, culture) {
  return formatWithOptions({ locale: getLocale(culture) }, pattern, date)
}

function parse (date, pattern, culture) {
  return parseWithOptions({ locale: getLocale(culture) }, pattern, date)
}

function getYear (date, culture) {
  return format(date, 'YYYY', culture)
}

function decade (date, culture) {
  return getYear(date, culture) + ' - ' + getYear(endOfDecade(date), culture)
}

function century (date, culture) {
  return getYear(date, culture) + ' - ' + getYear(endOfCentury(date), culture)
}

function firstOfWeek (culture) {
  return pathOr(0, ['options', 'weekStartsOn'], getLocale(culture))
}

var defaultFormats = {
  date: 'L',
  time: 'LT',
  default: 'lll',
  header: 'MMMM YYYY',
  footer: 'LL',
  weekday: 'dd',
  dayOfMonth: 'DD',
  month: 'MMM',
  year: 'YYYY',
  decade: decade,
  century: century
}

/**
 * Configures localization of [react-widgets](http://jquense.github.io/react-widgets/) by calling `configure.setDateLocalizer`
 * @static
 * @param {Object} formats Confguration options.
 * @param {string|Object|function} formats.default  the default date display format, generally a "long" format showing both date and time
 * @param {string|Object|function} formats.date A date only format
 * @param {string|Object|function} formats.time A time only format
 * @param {string|Object|function} formats.header The heading of the Calendar month view, contextualizes the current month, e.g. "Jan 2014"
 * @param {string|Object|function} formats.footer The Calendar footer format, for displaying Today's date
 * @param {string|Object|function} formats.dayOfMonth The day of the month
 * @param {string|Object|function} formats.month  Month name, used in the Year view of the Calendar
 * @param {string|Object|function} formats.year year format, used in the Decade view of the Calendar
 * @param {string|Object|function} formats.decade a decade format, used in the Century view of the Calendar, eg. "2010 - 2019"
 * @param {string|Object|function} formats.century  A century format, used the in the Calendar heading
 * @example
 * import dateFnsLocalizer, { defaultFormats } from 'react-widgets-dates'
 * dateFnsLocalizer()
 * // => Uses default formats (defaultFormats)
 * const newFormats = Object.assign(defaultFormats, { default: 'mmm YY' })
 * dateFnsLocalizer(newFormats)
 * // => Uses new configuration
 */
function dateFnsLocalizer () {
  configure.setDateLocalizer({ formats: defaultFormats, firstOfWeek: firstOfWeek, parse: parse, format: format })
}

module.exports = dateFnsLocalizer
