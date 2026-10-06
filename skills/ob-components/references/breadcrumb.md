# Breadcrumb

## Purpose

The Breadcrumb component serves as a navigational trail, showing where a user is within a hierarchical structure.

## Usage rules

Use it:
- Use it to help users navigate through complex websites or apps.

Do not use it:
- Do not use it on simple websites or apps, where they are not necessary.

## How to use


`import ObBreadcrumbModule from '@oblique/oblique';`

This component supports wayfinding by including breadcrumbs that reflect the information hierarchy of your site. The route configuration is used to discover the current page hierarchy. The breadcrumb property of the route data (`{path:..., data: {breadcrumb: 'Label'}}`) will be used as label. If no label is provided, the url is used as fallback. Dynamic routes are supported as well. The component will try to replace the parameter key (including `:`, i.e. `:id`) with the parameter value in the label of a dynamic route. URLs and parameter values displayed in a label are beautified, unless the input `beautifyUrls` is set to `false`. If a breadcrumb is cut off by the `maxWidth` input, a tooltip with the entire text is shown on hover.

The root route ('/') will not be included in the breadcrumbs. The federal logo or application title should be used to navigate to the root page. The current page is displayed but not clickable, since there's no point in navigating to the current location. Other mechanisms should be used for reloading.

Good to know: The breadcrumbs follows the route definition and creates only one breadcrumb per route. That means, if you have one route with the path `user/:userId/profile`, only one breadcrumb (not three) will be displayed. E.g. the default configuration applied to the route `user/123/profile` will yield the label `User - 123 - Profile`. If you want separate breadcrumbs, you need to define separate routes:

{
 path: 'user',
 children: [{
 path: ':id',
 children: [{path: 'profile'}]}
 ]
}

### Components

#### ObBreadcrumbComponent

Selector
`ob-breadcrumb`

Exported as
`obBreadcrumb`

Properties

Name
Description

` @Input() maxWidth: string = '32ch'`

Defines a maximum width for each breadcrumb item. Overflowing text is hidden and an ellipsis is displayed.

It should be noted that very small width values, expressed in character units such as `1ch` or `2ch`, do not reliably cause overflow in Firefox. Firefox calculates the minimum text width differently than Chromium in these edge cases and does not produce visible overflow with ellipses.

We therefore advise not to use `maxWidth` values below `3ch` if consistent ellipsis behavior is required in Firefox. This is a technical characteristic of the Firefox layout engine.

` @Input() separator: string = ' &ndash; '`
Defines a separator, which is inserted between `/` separated parts of a route in the label. Example: the route `user/:id` will be displayed with the label `User - U1234`. The separator is ignored for routes with a breadcrumb label.

` @Input() beautifyUrl: boolean = true`
If there's no breadcrumb label defined for a route, the url will be used as label. If this option is set to true, the url will be beautified by splitting on `-`, uppercasing the first letter and joining with `' '` (`custom-page` becomes `Custom Page`).

### Interfaces

#### ObBreadcrumbConfig

The default configuration for `ob-breadcrumb` components.

Properties

Name
Description

`maxWidth: string`
Defines a maximum width for each breadcrumb item. Overflowing text is hidden and an ellipsis is displayed.

`separator: string`
Defines a separator, which is inserted between `/` separated parts of a route in the label. Example: the route `user/:id` will be displayed with the label `User - U1234`. The separator is ignored for routes with a breadcrumb label.

`beautifyUrl: boolean`
If there's no breadcrumb label defined for a route, the url will be used as label. If this option is set to true, the url will be beautified by splitting on `-`, uppercasing the first letter and joining with `' '` (`custom-page` becomes `Custom Page`).

## Related

- /components/master-layout
