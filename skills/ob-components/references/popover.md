# Popover

## Import

`import {ObPopoverModule} from '@oblique/oblique';`

## Purpose

The Popover component displays additional information or actions in a small overlay when triggered, usually by a click or hover event. It offers contextual information without navigating away from the current view or cluttering the main interface.

## Usage rules

Use it:
- Use it for help or additional actions that are not critical to the application.

Do not use it:
- Do not use it if it distracts from the primary task or overloads the user with information.

General:
- For shorter messages, consider using the [Tooltip](/components/tooltip) component.
- For longer messages, consider using the components [Dialog](/components/dialog), [Off-Canvas](/helpers/off-canvas), or even creating a new page.
- Ensure the Popover content is concise and directly relevant to the triggering element.
- For desktop-first applications where quick, brief hints are needed, set the "toggle handle" option to "hover".

## How to use

A popover provides helpful contextual information in a dedicated container. It is meant for longer descriptions, help or additional actions that are not critical to the application.

The template can be rendered either right after its toggle or at the end of the body. In any case, the template is removed from the DOM when not active. Adding it after the toggle element preserves the tabindex order. Focusable components should receive focus in an order that preserves meaning and usability. See [WCAG 2.0 Supporting Documents 2.4.3: Focus order](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-order). Unfortunately, this can lead to `z-index` problems that can only be solved by adding it at the end of the body.

Accessibility is ensured through the `aria-describedby` attribute and the `tooltip` role. The positioning is achieved with the popper library, for more information see [popper.js.org](https://popper.js.org/).

### Directives

#### ObPopoverDirective
Selector

`[obPopover]`

Exported as

`obPopover`

Usage

This directive renders a template in a container that is inserted at the end of the body.

Since

6.1.0

Last updated

8.1.0

PropertiesName

Description

closeOnlyOnToggle: InputSignal

Indicate if this `ObPopoverDirective` should be closed only when clicking on the toggle element.

**Since:** 8.1.0

obPopover: InputSignal | undefined>

The template to be rendered inside the popover.

**Since:** 6.1.0

placement: InputSignal

Defines the position of the popover relative to its toggle.**Values:** `'auto' | 'auto-start' | 'auto-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'.`

The default value is `'auto'`.

**Since:** 6.1.0

popperOptions: InputSignal

The native options of Popper.js.* See also: [https://popper.js.org/docs/v2/constructors/](https://popper.js.org/docs/v2/constructors/)

**Since:** 6.1.0

*Angular recommends that inputs be immutable, meaning that any changes to this input, should result in the entire object being recreated rather than directly modified. The spread operator inherently provide this behavior, as it returns a new object instead of modifying the original one. However, this approach doesn't work with nested properties, as it only performs a shallow copy.

toggleHandle: InputSignal

Indicate which toggle this `ObPopoverDirective` should handle. The default value is `ObEToggleType.CLICK` .

**Since:** 8.1.0

appendToBody: InputSignal

Controls where the popover is inserted in the DOM. `true` means it will be inserted at the end of the body. `false` means it will be inserted right after its toggle. Default value is `false`. This can be overwritten with the Injection Token `OBLIQUE_POPOVER_APPEND_TO_BODY`.

**Since:** 10.0.0

id: InputSignal

The Id for the popover itself.

**Since:** 6.1.0

panelContentId: InputSignal

Id for the popover panel.

**Since:** 11.0.0

visibilityChange: OutputEmitterRef

Emits each time the visibility of the popover panel is changed.

Since: 12.0.0

### Constants
Injection tokensName

Description

OBLIQUE_POPOVER_TOGGLE_HANDLE: ObEToggleType

The default value for `toggleHandle` property that will be applied to all `ObPopoverDirective` throughout the application.

**Since:** 8.1.0

OBLIQUE_POPOVER_CLOSE_ONLY_ON_TOGGLE: boolean

The default value for `closeOnlyOnToggle` property that will be applied to all `ObPopoverDirective` throughout the application.**Since:** 8.1.0

OBLIQUE_POPOVER_APPEND_TO_BODY: boolean

The default value for `appendToBody` property that will be applied to all `ObPopoverDirective` throughout the application.

**Since:** 10.0.0

## Related

- /components/tooltip
- /components/dialog
- /helpers/off-canvas
