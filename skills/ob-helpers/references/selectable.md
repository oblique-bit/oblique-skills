# Selectable

## Import

`import {ObSelectableModule} from '@oblique/oblique';`

## How to use

A set of 2 directives that allows to select any element with the mouse or the keyboard in an accessible way. Selected elements are simply marked with the `ob-selected` class but no style is applied to it. The `ObSelectable` directives have to be wrapped into a `ObSelectableGroup` that specifies the selection mode. There are 3 distinct selection modes described below.

### Checkbox mode

In checkbox mode, which is the default one, the selection behaves like checkboxes.

- multiple elements can be selected at the same time

- the selection can be emptied

- the tab key moves the focus to the next element

- individual elements can be toggled with a mouse click

- the focused element can be toggled with the space key

### Radio mode

In radio mode, the selection behaves like radio buttons.

- a single element can be selected at any time

- the selection cannot be emptied

- the tab key moves the focus to the next element

- the arrowDown and arrowRight keys select the next element in a circular manner

- the arrowUp and arrowLeft keys select the previous element in a circular manner

- individual elements can be toggled with a mouse click

- the focused element can be toggled with the space key

### Windows mode

In Windows mode, the selection behaves like the Windows's file explorer.

**Accessibility**

In Windows mode, the accessibility of the feature is not guaranteed. The behavior is not a web standard, which means there are no out-of-the-box roles for it. The accessibility has been done as well as possible but is still limited.

- multiple elements can be selected at the same time

- the selection cannot be emptied

- the tab key moves the focus to the next element

- the arrowDown and arrowRight keys selects the next element

- the arrowUp and arrowLeft keys selects the previous element

- the combination [shift + (arrowUp / arrowDown / arrowRight / arrowLeft)] keys selects all elements between the start and end of selection

- the combination [ctrl + (arrowUp / arrowDown / arrowRight / arrowLeft)] keys moves the focus without altering the selection

- the combination [shift + (click / space)] selects all elements between the element first selected and the last clicked one

- the combination [ctrl + (click / space)] adds the clicked element to the current selection

- individual elements can be toggled with a mouse click

- the focused element can be toggled with the space key

### Directives

#### ObSelectableDirective

A directive placed on each element that should be selectable.

Selector
`[obSelectable]`

Exported as
`obSelectable`

Properties

Name
Description

`value: InputSignal<any> ;`
Defines the value of the selectable element.

`selected: ModelSignal<boolean> ;`
Controls if the element is selected or not.

`tabindex: InputSignal<number> ;`
Sets the tab index of the selectable element.

Methods

Name
Description

`focus(): void`
Focuses this element

#### ObSelectableGroupDirective

A directive placed on the parent element of selectable elements.

Selector
`[obSelectableGroup]`

Exported as
`obSelectableGroup`

Properties

Name
Description

`mode: ModelSignal<"checkbox" | "radio" | "windows"> ;`
The selection mode for the `ObSelectableDirective`s registered to this group.

`disabled: InputSignal<boolean> ;`
Disables selection of `ObSelectableDirective`. It does not change the current selection.

`selected: ModelSignal<ObSelectableDirective<T>[]>([]);`
exposes the group's selection.

Methods

Name
Description

`selectAll(): void`
Selects all registered `ObSelectableDirective`s but does nothing in `radio` mode

Name
Description

`deselectAll(): void`
Deselects all registered `ObSelectableDirective`s but does nothing in `radio` mode

Name
Description

`sort(sortFunction: (a: ObSelectableDirective, b: ObSelectableDirective) => number): void`
Sorts the registered `ObSelectableDirective`s according to the given compare function.

Parameters

`sortFunction: (a: ObSelectableDirective, b: ObSelectableDirective) => number`
A compare function, used to sort the elements according to its return value. A negative number is expected when the first argument comes before the second one. Zero is expected when the original order should be kept, and a positive number is expected when the first argument comes after the second one. If omitted, the elements are sorted in ascending, ASCII character order.

### Constants

#### Injection tokens

Name
Description

`OB_SELECTABLE_RADIO_SINGLE_VALUE: boolean`
Injection token controlling the default value shape of `ObSelectableGroupDirective` when used in `mode="radio"`.
When this token is provided with `true`, the directive emits a single value.
The `radioSingleValue` input has higher priority than this token.
