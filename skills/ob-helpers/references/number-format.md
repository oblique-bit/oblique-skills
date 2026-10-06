# Number format

## Import

`import {ObNumberFormatModule} from '@oblique/oblique';`

## How to use

The `obNumberFormat` directive allows formatting to fixed decimals of input numbers.

### Directives

#### ObNumberFormatDirective

Selector
`[obNumberFormat]`

Exported as
`obNumberFormat`

Properties

Name
Description

`@Input( decimals: number = 2)`
The number of decimals to display.

`@Input() persistent: boolean = true`
Indicates that the formatted value will be reported to the model.

### Usage

#### Behavior

Attribute / Result
Visible value
Stored Value
Display on Focus

`[persistent]="true"`
Rounded
Rounded
Rounded

`[persistent]="false"`
Rounded
Unchanged
Unchanged
