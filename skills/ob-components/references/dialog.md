# Dialog

## Purpose

The Dialog component shows a modal window that covers the main content, requiring user interaction before proceeding.

## Usage rules

Use it:
- Use it to display important information or collect input critical to completing a task.
- Use it for warnings to prevent or correct critical errors.
- Use it to fragment a complex workflow into simpler steps.
- Use it to sparingly since it interrupts the user flow. Consider non-modal as [Alert](components/alert), [Notification ](/components/notification)or [Off-Canvas](/helpers/off-canvas/examples).

Do not use it:
- Do not use it for non-essential tasks that manageable in the main UI.
- Do not use it for complex decisions requiring external information.

General:
- Always include a clear option for closing a dialog so users can quickly return to the main UI.
- Consider the component's configuration options "Title" and "Column Layout" to add more visual structure to the content.

## How to use

This is only a redesign of the Angular Material "Dialog" component.

The API definition is available on the Angular Material site: [Dialog - opens in a new tab](https://v17.material.angular.io/components/dialog/api)

## Additional Info

## Notifications and overlay

By default Oblique displays notifications below any overlays, such as from dialog. To display a notification above the overlay, check the [Notification ](/components/notification) page for more information.

## Related

- components/alert
- /components/notification
- /helpers/off-canvas/examples
