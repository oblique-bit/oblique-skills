# Badge

## Purpose

The Badge component displays the status or quantity of associated items, such as notifications or tasks within an application.

## Usage rules

Use it:
- Use it to to show new or unread notifications.
- Use it to for status indicators: To show online/offline or active/inactive states.
- Use it to to highlight new or updated content, e.g., menu items.
- Use it to with the type "Warn": If the user must act to avoid danger, loss, or considerable inconvenience.
- Use it to with the default position (after above): Unless there is a good reason for using another position. An example where it might make sense to use a different position could be when another position allows for better visibility on smaller screens.

Do not use it:
- Do not use it with too much content inside the badge: overfilling the badge can make it hard to read.
- Do not use it to overlap a text: By default, the badge overlaps the element behind it. While overlapping an icon or a button makes sense, prevent overlapping text for readability reasons using matBadgeOverlap="false".
- Do not use it if you have more complex content or you want to include an icon: Instead, consider using Chips.

## How to use

This is only a redesign of the Angular Material "Badge" component.

The API definition is available on the Angular Material site: [Badge - opens in a new tab](https://v17.material.angular.io/components/badge/api)

## Additional info

## Severity

- Primary: Normal Severity (gray)

- Warn: High Severity (red)

## Related

- /components/chips
