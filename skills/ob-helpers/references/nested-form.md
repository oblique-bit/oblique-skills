# Nested form

## Import

`import {ObNestedFormModule} from '@oblique/oblique';`

## How to use

A component and related directive to simplify nesting of forms. Forms can also be nested within nested forms. They can be integrated in 2 simple steps:

- Create the sub-form

a simple component with a form (without implementing either `ControlValueAccessor` or `Validator`)

- set the `exportAs` property in the component's `decorator`

- template driven forms also need to expose `NgForm` via a `ViewChild`

- In the parent's component template

With Reactive form

add the `obParentForm` directive on the parent form, i.e. the element with the `formGroup` directive

- wrap you sub-form with the `ob-nested-form` component

- pass the sub-form's `formGroup` to the `ob-nested-form` component's `nestedForm` input using the `exportAs` property.

- With template driven form

add the `obParentForm` directive on the form element

- wrap you sub-form with the `ob-nested-form` component

- pass the sub-form's `NgForm.control` to the `ob-nested-form` component's `nestedForm` input using the `exportAs` property.

### Components

#### ObNestedFormComponent

Should wrap a custom sub-component which contains a form.

Selector
`ob-nested-form`

Exported as
`obNestedForm`

Properties

Name
Description

`@Input() nestedForm: FormGroup`
The `formGroup` of the sub-component that is projected.

### Directives

#### ObParentFormDirective

Should be applied to the root element with a `formGroup` directive. It will simply forward its `submit` and `reset` events.

Selector
`[obParentForm]`

Exported as
`obParentFormDirective`

Properties

Name
Description

`submit$: Observable<void>`
An observable that emits each time the underlying form is submitted.

`reset$: Observable<void>`
An observable that emits each time the underlying form is reset.
