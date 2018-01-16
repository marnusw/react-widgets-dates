# react-widgets-dates *0.0.4*

> A date-fns localizer for react-widgets


### index.js


#### dateFnsLocalizer(formats) 

Configures localization of [react-widgets](http://jquense.github.io/react-widgets/) by calling `configure.setDateLocalizer`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| formats | `Object`  | Confguration options. | &nbsp; |
| formats.default | `string` `Object` `function`  | the default date display format, generally a "long" format showing both date and time | &nbsp; |
| formats.date | `string` `Object` `function`  | A date only format | &nbsp; |
| formats.time | `string` `Object` `function`  | A time only format | &nbsp; |
| formats.header | `string` `Object` `function`  | The heading of the Calendar month view, contextualizes the current month, e.g. "Jan 2014" | &nbsp; |
| formats.footer | `string` `Object` `function`  | The Calendar footer format, for displaying Today's date | &nbsp; |
| formats.dayOfMonth | `string` `Object` `function`  | The day of the month | &nbsp; |
| formats.month | `string` `Object` `function`  | Month name, used in the Year view of the Calendar | &nbsp; |
| formats.year | `string` `Object` `function`  | year format, used in the Decade view of the Calendar | &nbsp; |
| formats.decade | `string` `Object` `function`  | a decade format, used in the Century view of the Calendar, eg. "2010 - 2019" | &nbsp; |
| formats.century | `string` `Object` `function`  | A century format, used the in the Calendar heading | &nbsp; |




##### Examples

```javascript
import dateFnsLocalizer, { defaultFormats } from 'react-widgets-dates'
dateFnsLocalizer()
// => Uses default formats (defaultFormats)
const newFormats = Object.assign(defaultFormats, { default: 'mmm YY' })
dateFnsLocalizer(newFormats)
// => Uses new configuration
```


##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
