# Chips

## Purpose

The Chip component is used to display tags, contacts, or filters, that can be easily added, removed, or interacted with.

## Usage rules

Use it:
- Use it for making one or more selections from a group of options, use selectable chips. They are suitable for tagging items, filtering content, or selecting categories in a form.
- Use it to quickly add or remove user choices like languages or skill sets.

Do not use it:
- Do not use it in place of buttons. Multiple chips should appear together, while no more than three buttons should be displayed as a group.

General:
- By default, chips are displayed horizontally. Vertical orientation can be activated on smaller screens or in side panels.
- If you want to display the quantity only, consider using the [Badge ](/components/badge/ui-ux)component.

## How to use

This is only a redesign of the Angular Material "Chips" component.

The API definition is available on the Angular Material site: [Chips - opens in a new tab](https://v17.material.angular.io/components/chips/api)

Severity is controlled by setting the following classes on the `mat-chips-option`:

- `info`

- `success`

- `warning`

- `error`

## Additional info

## Severity

- **Default**: Use for general display purposes, where no specific emphasis is required.

- **Info**: Use to convey neutral information that doesn't pertain to success, error, or potential risks.

- **Success**: Use to confirm an action was completed successfully.

- **Error**: Use to inform the user when an action failed or a problem occurred.

- **Warning**: Use to signal potential issues or risks before an action is taken.

## Related

- /components/button
- components/badge
