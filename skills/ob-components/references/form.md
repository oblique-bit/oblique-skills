# Form

## Purpose

A form is a section that allows users to enter and submit information. A label for a required form element includes an asterisk * at the end to indicate mandatory fields.

## How to use


Oblique redesigns the Angular Material Form components as well as providing a couple of additional features. These features are outlined below.

The API definitions of the redesigned components are available on the Angular Material site:

- [Checkbox - opens in a new tab](https://v17.material.angular.io/components/checkbox/overview)

- [Form field - opens in a new tab](https://v17.material.angular.io/components/form-field/overview)

- [Input - opens in a new tab](https://v17.material.angular.io/components/input/overview)

- [Radio button - opens in a new tab](https://v17.material.angular.io/components/radio/overview)

- [Select - opens in a new tab](https://v17.material.angular.io/components/radio/overview)

- [Datepicker- opens in a new tab](https://v17.material.angular.io/components/datepicker/api)

Import material/oblique modules as relevant:

`import {MatCheckboxModule} from '@angular/material/checkbox';`

`import {MatFormFieldModule} from '@angular/material/form-field';`

`import {MatInputModule} from '@angular/material/input';`

`import {MatRadioModule} from '@angular/material/radio';`

`import {MatSelectModule} from '@angular/material/select';`

### Directives

#### ObInputClearDirective

A directive which can be added to an input to give the input a `clear` button.

Selector
`[obInputClear]`

Exported as
`obInputClear`

Properties

Name
Description

`@Input() control: AbstractControl | HTMLInputElement | NgModel`
The input clear control.

`@Input() focusOnClear: boolean = true`
Determines whether the input should be focused on clear.

`@Input() datePickerRef: MatDatepicker`
The datepicker reference.

`@Output() readonly onClear: EventEmitter`
Emits mouse events on clear.

The `color` property (which is provided by [Angular Material's `MatFormField`](https://v17.material.angular.io/components/form-field/api#MatFormField)) was supported up to Oblique 10. Its support has been discontinued as of Oblique 11, and it should not be used anymore as a result.

### Additional Notes

Since Angular 13, reactive forms don't need the `required` attribute anymore to display the asterisk indicating mandatory elements. However, if the validator is dynamically set, a call to the `updateValueAndValidity` function is necessary for the asterisk to appear.

#### Horizontal Forms

The class `.ob-inline-form` vertically centers all direct children elements.

#### Form element sizes

The classes `.ob-form-sm` and `.ob-form-lg` can be used to control the size of `mat-form-field`s like inputs, selects, datepickers and textfields. The different sizes only change the paddings and margins. The font-size remains constant.

## Additional info

## Datepicker

The Datepicker component allows users to select a date or a date range.

Use it:

- When users select a specific date to book appointments, make reservations, or set deadlines.

- When the selection should be limited to a particular range, like expiration dates or event dates within a certain period.

### General

- Enable the [Touch UI mode](https://material.angular.io/components/datepicker/overview#touch-ui-mode) to enhance the UX on devices with limited screen space.

## Radio Button

Use Radio Buttons to present a set of mutually exclusive choices, ensuring users can select only one option.

## Checkbox

Use Checkboxes when allowing users to make multiple selections from a set of options.

## Select

Use Select when space is limited or when presenting a long list of options.

## Form layouts

Defines how form elements are arranged, vertically or horizontally.

### Vertical Form

#### General

- The user reads and interacts with the form from top to bottom.

#### Dos

- Use it for a standard-size form or a longer form.

#### Don'ts

- Do not use it if there's limited vertical space but enough horizontal space.

### Horizontal Form

#### General

- The user reads and interacts with the form from left to right.

#### Dos

- Use it for tabular input where data must be entered in a row-column format.
Use it if there's limited vertical space.
Use it for forms with only a few fields.

#### Don'ts

- Do not use it if mobile/small screen is the primary use case.
Do not use it for longer forms with many fields.

## Form element sizes

- Default: A standard size applicable for most of the forms.

- Large: Use on forms with few inputs (e.g., Login).

- Small: in a high-density UI with a lot of form controls.

## Text input with clear control

### Dos

- Use it in search boxes to simplify refining queries.

- Use it for long inputs to quickly clear lengthy text.

- Use it in data filters to quickly reset specific filters.

- Use it for regularly updated inputs to facilitate frequent changes.

### Don'ts

- Do not use it excessively in forms to avoid clutter in multi-field forms.

- Do not use it where there is a risk of accidental clears, if it is too prominent or easy to click mistakenly.

## Fieldset

### Dos

- Use it to group related fields when a form has related elements, such as address details (street, city, canton).

- Use it to improve accessibility: Screen readers utilize fieldset and legend to provide context to the grouped controls.

- Use it to simplify form validation by targeting specific inputs within the fieldset.

- Use it for dynamic forms when sections of a form appear or disappear based on user actions.

### Don'ts

- Do not use it as a styling container. Avoid using it solely for layout without semantic intent.

- Do not use it to overcomplicate. Excessive nesting of fieldsets can be counterproductive.
