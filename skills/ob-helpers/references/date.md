# Date

## How to use


`import &#123;ObLanguageModule} from '@oblique/oblique';`

 Oblique provides its own date [parsing](/helpers/date-16/api#parser) and formatting capabilities.

 Oblique also provides a `DateAdapter` that is applied automatically and can be
 overridden by providing a custom adapter after
 `provideObliqueConfiguration`.
 It always formats dates using the Swiss date format, regardless of the active
 locale.

 
### Pipes

 
#### ObDatePipe

 
 
 
 Selector
 `obDate`
 
 
 
 
 Parameters
 
 
 `value: Date | number | string | null | undefined`
 The raw value to be transformed into a date. A `number` is interpreted as a timestamp, while a `string` is parsed using the Oblique [parser](#parser).
 
 
 `dateFormat: [ObDateFormat](/helpers/date-16/api#ObDateFormat) | [ObTimeFormat](#ObTimeFormat)`
 The date or time components to include in the output. If both are needed, pass `ObDateFormat` to `dateFormat`.
 
 
 `timeFormat?: [ObTimeFormat](/helpers/date-16/api#ObTimeFormat)`
 The time components to include in the output. Only needed when formatting both date and time components.
 
 
 
 
 Return value
 
 
 `string`
 A string representing the input date in the specified format.
 
 
 

 
### Components

 
#### ObDateComponent

 
 
 
 Selector
 `obDate`
 
 
 Parameters
 
 
 `date: SignalInput<Date | number | string | null | undefined>`
 The raw value to be transformed into a date. A `number` is interpreted as a timestamp, while a `string` is parsed using the Oblique [parser](#parser).
 
 
 `dateFormat: InputSignal<[ObDateFormat](/helpers/date-16/api#ObDateFormat) | null | undefined>`
 The date components to include in the output.
 
 
 `timeFormat: InputSignal<[ObTimeFormat](/helpers/date-16/api#ObTimeFormat) | null | undefined>`
 The time components to include in the output.
 
 
 
 
 Return value
 
 
 `string`
 A string representing the input date in the given format.
 
 
 

 
### Types

 
#### ObDateFormat

 
 
 
 Name
 Example value
 
 
 
 
 `'isoDate'`
 `2029-09-26`
 
 
 `'fullDate'`
 `Friday, 26 September 2026`
 
 
 `'longDate'`
 `26 Sep 2026`
 
 
 `'mediumDate'`
 `26 Sep 2026`
 
 
 `'shortDate'`
 `26.09.2026`
 
 
 `'longMonthYear'`
 `September 2026`
 
 
 `'mediumMonthYear'`
 `Sep 2026`
 
 
 `'longMonth'`
 `September`
 
 
 

 
#### ObTimeFormat

 
 
 
 Name
 Example value
 
 
 
 
 `'longTime'`
 `16:13:26.214`
 
 
 `'mediumTime'`
 `16:13:26`
 
 
 `'shortTime'`
 `16:13`
 
 
 

 
### Date and time parsing

 
 Oblique's parser recognizes four kinds of date/time components:
 

 
 - ISO dates: `YYYY-MM-DD`

 - Swiss dates: `DD.MM.YYYY`, with several alternative separators

 - Times: `HH:MM`, with optional seconds, milliseconds and timezone

 - Combined date and time: an ISO or Swiss date followed by a time

 

 
 
#### ISO dates

 
 An ISO date strictly follows the `YYYY-MM-DD` format:
 

 
 - The year must contain exactly four digits.

 - The month and day must each contain exactly two digits.

 - Date components must be separated by hyphens (`-`).

 

 
 
 
#### Swiss dates

 A Swiss date loosely follows the `DD.MM.YYYY` format:

 
 - The day and month may contain either one or two digits. 

 - The year may contain either two or four digits.

 - When a two-digit year is used:
 
 Years `70` - `99` are interpreted as `1970` - `1999`.

 - Years `00` - `69` are interpreted as `2000` - `2069`.

 

 
 - The separators must be one of:
 
 Dot (`.`)

 - Hyphen (`-`)

 - Space (` `)

 - Forward slash (`/`)

 

 
 

 
 
 
#### Times

 A time loosely follows `HH:MM:SS.ssss` format:

 
 - Hours, minutes, and seconds may contain one or two digits.

 - Hours, minutes, and seconds must be separated by colons (`:`).

 - Seconds and milliseconds are optional.

 - Milliseconds may contain one to four digits.

 - Milliseconds are separated from seconds by a dot (`.`).

 - 
 A timezone may optionally be appended and consists of:
 
 A sign (`+` or `-`)

 - Two hour digits

 - An optional colon (`:`)

 - Two minute digits

 

 
 - `Z` can also be used as a timezone to indicate UTC.

 

 
 
 
#### Date and time combinations

 The parser recognizes these combinations:

 
 - Swiss date, for example `25.09.2026`

 - Swiss date with time, for example `25.09.2026 12:18`

 - ISO date, for example `2026-09-25`

 - ISO date with time, for example `2026-09-25T12:18`

 - Time, for example `12:18`

## Example

A runnable example lives in the [oblique-stackblitz](https://stackblitz.com/github/oblique-bit/oblique-stackblitz/tree/master/oblique-date-component?file=package.json) repository (MIT):

```html
<ob-date date="2025-05-12" format="longDate" />
<ob-date date="2025-05-12" format="shortDate" />
```

```ts
export class HomeComponent {
  exampleDate = new Date('2025-05-12');
}
```
