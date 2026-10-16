# Notification

## Import

`import {ObNotificationModule} from '@oblique/oblique';`

## Purpose

The Notification helper informs users of issues, events, or information relevant to the current user flow.

## Usage rules

Use it:
- To display brief, non-critical information that does not require user interaction to dismiss.
- For transient messages that confirm a system's actions (e.g., "Message sent" or "Item saved").

Do not use it:
- For generic information not connected to the user's current task, such as updates on legal regulations or scheduled downtime. For such message types, please consider [Alerts](/components/alerts).

General:
- Make sure the content is clear. If needed, use the second text line to provide additional details explaining the notification's context.

## How to use

Based on Oblique's alerts, notifications provide short, timely, and relevant information for your application users.

### Services

#### ObNotificationService

Should be injected in component's constructor to send notifications to the `NotificationComponent`

Properties

Name
Description

`events: Observable<ObINotification>`
An observable that emits every time a notification is sent or cleared through the service

` clearAllOnNavigate: boolean = this.config.clearAllOnNavigate;`
Defines if all notifications should be cleared upon `NavigationEnd` event. (inferred from `CLEAR_NOTIFICATIONS_ON_ROUTE_CHANGE` injection token). The default value is `undefined`.

`placement: ObENotificationPlacement = this.config.placement;`
Defines the position of the notifications in its containing. The default value is: `'ob-top-right': string`

**Values:**`ObENotificationPlacement.BOTTOM_LEFT`, `ObENotificationPlacement.BOTTOM_RIGHT`, `ObENotificationPlacement.TOP_LEFT`, `ObENotificationPlacement.TOP_RIGHT`

Methods

Name
Description

`info(config: ObINotification | string) : ObINotification`
Triggers an **info** notification. It takes either the notification's text or a full notification config object.

Parameters

`config: ObINotification | string`
[ObINotification](helpers/notification/api#ObINotification) or a string indicating the message

Return Value

`ObINotification`
[ObINotification](helpers/notification/api#ObINotification)

Name
Description

`success(config: ObINotification | string): ObINotification`
Triggers a **success** notification. It takes either the notification's text or a full notification config object.

Parameters

`config: ObINotification | string`
[ObINotification](helpers/notification/api#ObINotification) or a string indicating the message

Return Value

`ObINotification`
[ObINotification](helpers/notification/api#ObINotification)

Name
Description

`warning(config: ObINotification | string): ObINotification`
Triggers a **warning** notification. It takes either the notification's text or a full notification config object.

Parameters

`config: ObINotification | string`
[ObINotification](helpers/notification/api#ObINotification) or a string indicating the message

Return Value

`ObINotification`
[ObINotification](helpers/notification/api#ObINotification)

Name
Description

`error(config: ObINotification | string): ObINotification`
Triggers an **error** notification. It takes either the notification's text or a full notification config object.

Parameters

`config: ObINotification | string`
[ObINotification](helpers/notification/api#ObINotification) or a string indicating the message

Return Value

`ObINotification`
[ObINotification](helpers/notification/api#ObINotification)

Name
Description

`send(config: ObINotification | string, type?: ObENotificationType): ObINotification<`
Triggers a notification whose type is either the one provided as second argument or the one specified in the config. It takes either the notification's text or a full notification config object.

Parameters

`config: ObINotification | string`
[ObINotification](helpers/notification/api#ObINotification) or a string indicating the message

`type?: ObENotificationType`
ObENotificationType

Return Value

`ObINotification`
[ObINotification](helpers/notification/api#ObINotification)

Name
Description

`clear(channel = this.config.channel): void`
Clears all notifications displayed in the specified `channel`. The default value is `'': string`

Parameters

`channel = this.config.channel`
string describing the channel. The default value is "oblique"

Name
Description

`clearAll(): void`
Clears all notification from all channels.

### Components

#### ObNotificationComponent

Selector
`ob-notification`

Exported as
`obNotification`

Properties

Name
Description

`@Input() channel: string = 'oblique';`
The channel name where notifications will be retrieved from. If not specified, the component will listen to the default channel.

Methods

Name
Description

`open(notification: ObINotification): void`
Adds & opens the specified notification.

Parameters

`notification: ObINotification`
ObINotification

Name
Description

`close(notification: ObINotification): void`
Closes & removes the specified notification.

Parameters

`notification: ObINotification`
ObINotification

Name
Description

`remove(notification: ObINotification): void`
Removes the specified notification without triggering a close animation.

Parameters

`notification: ObINotification`
ObINotification

Name
Description

`clear(): void`
Closes all notifications in the current subscribed channel.

### Classes

#### ObNotificationConfig

Should by injected, typically in the AppModule, to customize the values of its properties in order to provide alternate default values for the `NotificationComponent`.

Properties

Name
Description

`sticky: boolean = false`
Defines if notifications should be manually closed or if they should auto-close after some timeout.

`timeout: number = 3500`
The duration delay, in milliseconds, to wait before closing non-sticky notifications.

`channel: string = 'oblique'`
The channel name where notifications will be retrieved from. If not specified, component will listen to the default channel.

`clearAllOnNavigate: boolean = false`
Defines if all notifications should be cleared upon `NavigationEnd` event.

`groupSimilar: boolean = false`
Defines if similar notifications should grouped.

`placement: ObENotificationPlacement = ObENotificationPlacement.TOP_RIGHT`
Defines the position of the notifications in its containing block.

### Interfaces

#### ObINotification

The structure of a notification

Properties

Name
Description

`idPrefix?: string`
Id Prefix of notification

`type? : ObENotificationType`
type of notification
**Values:**`ObENotificationType.INFO`,`ObENotificationType.SUCCESS`,`ObENotificationType.WARNING`,`ObENotificationType.ERROR`

`message?: string`
either a translation key or a string that can include html tags as defined by [Angular sanitization](https://angular.dev/best-practices/security#sanitization-and-security-contexts)

`messageParams?: Record<string, any>`
translation params of message content in notification

`title?: string`
translation key of title content in notification

`titleParams?: Record<string, any>`
translation params of title content in notification

`channel?: string`
channel name of notification. The notification will show up in the container with same channel. If the channel name is not provided, will show up in the default channel.

`sticky?: boolean`
If sticky is set to true, the notification will not automatically close.

`timeout?: number`
How much time (in ms) before the notification automatically close.

`groupSimilar?: boolean`
If set to true, will only show 1 notification if same message is send multiple times.

### Constants

Injection tokens

`CLEAR_NOTIFICATIONS_ON_ROUTE_CHANGE: boolean`
Defines if all notifications should be cleared upon `NavigationEnd` event.

`GROUP_SIMILAR_NOTIFICATIONS: boolean`
Defines if similar notifications should be grouped.

## Additional info

## Alert & Notification

Alerts and Notifications look very similar but are actually very different. Alerts are static elements placed in the document flow. This means they cannot be closed and their content should remain unchanged. Their purpose it to highlight some piece of information.

Notifications on the other hand are dynamic Alerts. They are dynamically added in an overlay and can be closed. Having the `alert` role, they will be read out loud to screen readers when added or removed. Their purpose is to react to a user action.

## Related

- /components/alert
