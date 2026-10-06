# Alert

## Import

`import {ObAlertModule} from '@oblique/oblique';`

## How to use

Alerts provide persistent contextual messages that are meant to highlight a text. They cannot be closed, if this feature is needed, please do consider using Notifications instead.

Alerts can accommodate any length of text and will be rendered in a colored box with a related icon, denoting the alert's type.

### Angular

Although the alert feature is built on top of Angular, it can still be used without it. First, the `oblique-alert.css` file needs to be loaded. Then an alert can be displayed by setting both the `ob-alert` and one of `ob-alert-info`, `ob-alert-success`, `ob-alert-warning` or `ob-alert-error` classes.

### Components

#### ObAlertComponent

The `ObAlertComponent` provides accessible contextual messages.

Selector
`ob-alert`

Exported as
`obAlert`

Properties

Name
Description

`type: InputSignal`
The type of the alert.**Values:** `'success'` | `'info'` | `'warning'` | `'error'`.
The default value is `'info'`

`hasRoleAlert: InputSignal`
Indicates whether a `role=alert` is added to this `ob-alert` element at runtime. This value overwrites the global configuration for this element. It should only be used if immediate action is required by the user.

### Constants

#### Injection tokens

Name
Description

`OBLIQUE_HAS_ROLE_ALERT: boolean`
The default value for the `hasRoleAlert` property that will be applied to all `ObAlertComponent` components throughout the module-tree. It should only be used when immediate action is required by the user.
