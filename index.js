import configure from 'react-widgets/lib/configure'
import formatWithOptions from 'date-fns/esm/fp/formatWithOptions'
import parse from 'date-fns/esm/fp/parse'
import addYears from 'date-fns/esm/fp/addYears'
import * as locales from 'date-fns/esm/locale'
import propOr from 'ramda/src/propOr'
import pathOr from 'ramda/src/pathOr'

const { enUS } = locales

const endOfDecade = addYears(10)

const endOfCentury = addYears(100)

const getLocale = culture => propOr(enUS, culture, locales)

const format = (date, pattern, culture) =>
  formatWithOptions({ locale: getLocale(culture) }, pattern, date)

const getYear = (date, culture) => format(date, 'YYYY', culture)

const decade = (date, culture) =>
  `${getYear(date, culture)} - ${getYear(endOfDecade(date), culture)}`

const century = (date, culture) =>
  `${getYear(date, culture)} - ${getYear(endOfCentury(date), culture)}`

const firstOfWeek = culture => pathOr(0, ['options', 'weekStartsOn'], getLocale(culture))

export const defaultFormats = {
  default: 'lll',
  date: 'L',
  time: 'LT',
  header: 'MMMM YYYY',
  footer: 'LL',
  weekday: 'dd',
  dayOfMonth: 'DD',
  month: 'MMM',
  year: 'YYYY',
  decade,
  century
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
const dateFnsLocalizer = (formats = defaultFormats) =>
  configure.setDateLocalizer({ formats, firstOfWeek, parse, format })

export default dateFnsLocalizer
