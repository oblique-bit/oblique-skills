# Autocomplete

## Import

`import {ObAutocompleteModule} from '@oblique/oblique';`

## Purpose

The Autocomplete component allows users to quickly complete words or phrases as they type, saving time and reducing errors.

## Usage rules

Use it:
- Use it to when users are likely to type in the same words frequently.

Do not use it:
- Do not use it if the set of possible inputs is small. A List group or Cards could be more appropriate: Users can quickly choose from the limited options available.

General:
- Make sure that the suggestions are relevant and accurate.

## How to use

### Components

#### ObAutocompleteComponent

`ObAutocompleteComponent` implements the `ControlValueAccessor`. You can use it like a custom form control directive that integrates with Angular forms.

Selector
`ob-autocomplete`

Properties

Name
Description

`inputLabelKey: InputSignal('i18n.oblique.search.title')`
Translation key for input's label.

`noResultKey: InputSignal('i18n.oblique.search.no-results')`

Translation key for the message displayed when the option list is empty. There will be no message if `noResultKey` is provided with an empty string.

`autocompleteOptions: InputSignal([])`

Options to display in the autocomplete.*

*Angular recommends that inputs be immutable, meaning that any changes to this input, should result in the entire array being recreated rather than directly modified. Functions like map or filter as well as the spread operator, inherently provide this behavior, as they return new arrays instead of modifying the original one.

`filterRegexFlag: InputSignal('gi')`

Input to override the regex flag used for highlighting text of the options.

`highlightCssClass: InputSignal('ob-highlight-text')`

The class used to highlight options that match the input text.

`optionIconPosition: InputSignal('end')`

Sets the position of the icon of every option if the iconName in `ObAutocompleteInputOption` is defined.

`displayWith: InputSignal string>(value => value)`

A function that maps an option's control value to its display value in the trigger.

`withErrorMessages: InputSignal(false)`

Makes the autocomplete react to validators by setting an error state and showing error message in case of an invalid input.

`selectedOptionChange: OutputEmitterRef`

Emits the selected option when an autocomplete option is selected.

### Interfaces

#### ObIAutocompleteInputOption

The structure of an option.

Properties

Name
Description

`label: T`
The label that will be printed. If not a string, then it must be used together with `displayWith`

`iconName?: ObEIcon`

An optional icon displayed next to the label.

`disabled?: boolean`

Disables the corresponding option.

`ariaLabel?: string`

`aria-label`, if provided, is applied to the icon; otherwise, the icon is `aria-hidden="true"`. It has no effect when there is no icon.

#### ObIAutocompleteInputOptionGroup

The structure of a group option.

Properties

Name
Description

`groupLabel: T`
The label that will be printed. If not a string, then it must be used together with `displayWith`

`groupOptions: ObIAutocompleteInputOption[]`

All the options belonging to this group.

`disabled?: boolean`

Disables the corresponding group.

Content projection

Name
Description

``
One or more `` elements to be projected into the underlying `mat-form-field`. The standard Angular Material `align` attribute is also respected.

## Related

- /components/list-group
- /components/card
