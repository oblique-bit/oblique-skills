# Focus Invalid

## Import

`import {ObFocusInvalidModule} from '@oblique/oblique'`

## How to use

This directive recreates a standard behavior of HTML forms that Angular breaks. It automatically focuses the first erroneous form field when the form is submitted. 

### Directives

#### ObFocusInvalidDirective

The `obFocusInvalid` directive simply needs to be put on a form

Selector
`form[obFocusInvalid]`

Exported as
`obFocusInvalid`

Methods

Name
Description

`focusFirstInvalidField(): void`
Focuses the first invalid form element. It is automatically called on submit.
