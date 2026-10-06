# External link

## Purpose

An external link leads to a website outside of your own. The icon indicates to the users that they will be leaving the website or application.

## Usage rules

Use it:
- Use it with a leave-icon when you are linking to a website outside your own.

Do not use it:
- Do not use it with a leave-icon if the user does not leave the main domain admin.ch

## How to use

`import ObExternalLinkModule from '@oblique/oblique';`

This feature automatically enhance external links - that is links that lead outside of the application - on both the accessibility and security levels.

The accessibility is enforced by opening the link in a new tab while providing both a visual hint - in the form of an icon - and an audio description for screen readers.

The security is enforced by adding the `rel` attribute with the value `noopener noreferrer` to hide the source page from the destination.

As part of the Oblique's base styling, all external links are assigned with `display: inline-flex`.

### Directives

#### ObExternalLinkDirective
This directive is transparent and automatically enhance external links. It is applied by simply importing the `ObExternalLinkModule`. For more control, the directive can be controlled link-wise by mean of inputs.

Selector

`a`

PropertiesName

Description

`rel: InputSignal`

Defines the `rel` attribute value for external links. The default value `noopener noreferrer`is the safest one and should not be overwritten.

`target: InputSignal`

Defines the `target` attribute value for external links. The default value `'_blank'` is the safest one and should not be overwritten.

`icon: InputSignal`

Defines the presence and position of an additional icon that marks links as external. Default value is `'left'.`
It is strongly recommended, for accessibility reasons, to keep the icon.

`isExternalLink: InputSignal`

Defines how the link is treated. Default value is`'auto'. `With `true`, the link will always be treated as an external one, regardless of its `href` attribute.
With `false` the link will always be treated as an internal one, regardless of its `href` attribute.
With `auto` the link will be treated as internal if its `href` attribute matches the current url and external otherwise.

### Interfaces

#### ObIExternalLink
The default external links configuration

PropertiesName

Description

`rel: string`

The default value for the `rel` attribute.

`target: string`

The default value for the `target` attribute.

`icon: 'left' | 'right' | 'none'`

The default value for the `icon` attribute.

`isExternalLink: boolean | 'auto'`

The default value for the `isExternalLink` attribute.

### Constants

#### Injection tokens
Name

Description

`EXTERNAL_LINK: ObIExternalLink`

The default configuration for external links
