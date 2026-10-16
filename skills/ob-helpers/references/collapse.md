# Collapse

## Import

`import {ObCollapseModule} from '@oblique/oblique';`

## How to use

The collapse component is a simple component that shows or hides content. Per default, the content (id: `collapse-index-content`) will be hidden and shown on click.

The title (id:`collapse-index-toggle`) is always shown and can be focused to close and open the content. Every collapse component id must be unique. If no id is set manually then the default id uses the index of the collapse component. A manually set id will still increase the index.

Example:

- First component with **default** id (index=0): `collapse-0-toggle` and `collapse-0-content`

- Second component with **id="my-id"** (index=1): `my-id-toggle` and `my-id-content`

- Third component with **default** id (index=2): `collapse-2-toggle` and `collapse-2-content`

This component comes without any styling, it simply animates the height of the content.

### Components

#### ObCollapseComponent

The `ObCollapseComponent` allows you to create content that can be easily toggled between open and closed states, improving the organization and usability of your user interface.

Selector
`ob-collapse`

Exported as
`obCollapse`

Properties

Name
Description

`@Input() active: boolean = false`
Defines the status of the collapse component: opened or closed.

`@Input() iconPosition:'left'| 'right'| 'justified'|'none' = 'left'`
Defines the icon's position within the collapse's header.

`@Input() id: string = 'collapse-[index]'`
Unique id of the collapse element, with '-toggle' and '-content' added to the id for the toggle and collapse elements. A manually set id will still increase the count of the index.

`@Input() duration: 'slow' | 'fast' | number = 'slow'`
Defines the animation speed for the collapse motion. `slow` and `fast` refer to Oblique's predefined speeds of 250 and 600 milliseconds respectively. Alternatively, a duration in milliseconds can be specified.

`@Output() active: Observable<boolean>`
Event that is emitted each time the `active` property is altered.

Content projection

Name
Description

`[obCollapseHeader]`
Content that will be projected into the header, i.e. the part that will always be shown.

`[obCollapseMain]`
Content that will be projected into the main container, i.e. the part that will be hidden or shown.

### Constants

Injection tokens

Name
Description

`OBLIQUE_COLLAPSE_ACTIVE: boolean = false`
The default value for `active` property that will be applied to all `ObCollapseComponent` throughout the application.

`OBLIQUE_COLLAPSE_DURATION: 'slow' | 'fast' | number = 'slow'`
The default value for `duration` property that will be applied to all `ObCollapseComponent` throughout the application.

`OBLIQUE_COLLAPSE_ICON_POSITION: 'left'| 'right'| 'justified'|'none' = 'left'`
The default value for `iconPosition` property that will be applied to all `ObCollapseComponent` throughout the application.
