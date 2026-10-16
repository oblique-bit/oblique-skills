# Button

## Import

`import {ObButtonModule} from '@oblique/oblique';`

## Purpose

The Button component allows users to take action and make choices with a single click.

## Usage rules

Use it:
- Use it to initiate actions or confirm user intent, providing clear affordances for interaction and promoting tasks that directly influence the system or user progress.

Do not use it:
- Do not use it in body-text.

General:
- Secondary and tertiary buttons: You can use multiple secondary and tertiary buttons per page/dialog. Use secondary and tertiary buttons only if a primary button exists on the page/dialog
- Use only one primary button per page/dialog.
- Write only one text line of the button-label.
- Secondary and tertiary buttons: - You can use multiple secondary and tertiary buttons per page/dialog. - Use secondary and tertiary buttons only if a primary button exists on the page/dialog.
- The order from right to left: - Save and Close (if applicable) - Save - Cancel

## How to use

Material Design proposes a lot of button variants, but for consistency reasons, Oblique limits this selection to just three alternatives. For that, Oblique proposes a directive, that, when used in conjunction with the `mat-button` directive, applies the correct styles to the underlying button. The three variants are intended to reflect the importance of the button and are named `primary`, `secondary` and `tertiary`. Oblique only styles buttons that are marked with the `obButton` directive.

### How to use

The `obButton` directive is meant to be used with the `mat-button` directive for text buttons with or without icons.

For icon buttons, i.e. buttons without text, the `mat-icon-button` directive is expected instead. While material's other button variants are still possible, it is not advised to use them as this could lead to undesirable effects.

An accessible label is mandatory on icon buttons. The best way to achieve this is by adding a tooltip. This provides context for all users &mdash; sighted users see the tooltip on hover, and screen reader users benefit because Oblique automatically links the tooltip content with `aria-labelledby`.

### Directives

#### MatButton

This directive is to be used in conjunction with a `matButton` directive to give it an oblique style.

Selector
`[obButton]`

Exported as
`obButton`

Properties

Name
Description

`@Input() obButton: 'primary' | 'secondary' | 'tertiary' = 'primary'`
Indicates the button's type.

## Additional info

## Types

- Primary Button - filled

- Secondary Button - outlined

- Tertiary Button - text only

- Icon only

## Related

- /components/external-link
- /components/chips
