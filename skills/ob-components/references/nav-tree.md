# Nav tree

## Import

`import {ObNavTreeModule} from '@oblique/oblique';`

## Purpose

The Nav tree component allows users to explore and access different levels of navigation in a tree-like structure.

## How to use

`NavTreeComponent` provides a multi-level navigation bar structure for users to navigate through tree structures. It includes an optional input field that allows filtering of tree items, making it easier to locate specific elements. Each tree item that is a child and not a parent is also a link, which sets a new active route. The component is, using the ARIA role `tree` for better screen reader support. Ideal for complex menus with numerous options.

`NavTreeComponent` _must _be used inside a router and its children can only contains links. In fact, its main purpose is navigating inside the application. Even if used in the context of selecting or browsing content inside a tree data structure, the action triggered when a child is clicked is navigating to a different location. Even in a [master-detail interface](https://en.wikipedia.org/wiki/Master%E2%80%93detail_interface), associating the detail view of the selected item to a specific location (or URL) is considered a best practice, therefore the `NavTreeComponent` component can be used in this particular use case and not only in a more common website navigation pattern.

The Nav Tree component uses Angular signals and `OnPush` change detection. In templates, inputs and models are still used with normal Angular bindings. When accessed from TypeScript, signal values must be read by calling the signal, for example `component.items()`, and writable signals must be changed with `.set()` or `.update()`.

### Components

#### ObNavTreeComponent

Selector
`ob-nav-tree`

Exported as
`obNavTree`

Properties

Name
Description

`items: InputSignal = input([])`

An hierarchical array of nav entries.*

*Angular recommends that inputs be immutable, meaning that any changes to this input, should result in the entire array being recreated rather than directly modified. Functions like map or filter as well as the spread operator, inherently provide this behavior, as they return new arrays instead of modifying the original one.

`prefix: InputSignal = input('nav-tree')`
A prefix for the `id`of child routes.

`hasFilter: InputSignal = input(false)`
Whether to display an embedded filter input field above the tree.

`filterPattern: ModelSignal = model()`

A string to match against all nav entries. It is a writable model: bind it with `[filterPattern]` or `[(filterPattern)]`. From TypeScript, read it with `filterPattern()` and update it with `filterPattern.set(...)` or `filterPattern.update(...)`.

`labelFormatter: InputSignal string> = input()`
A function to format each nav entry label. Defaults to `ObNavTreeComponent.DEFAULTS.LABEL_FORMATTER`.

`treeAriaLabelledBy: InputSignal = input()`

The ID of the element that labels the purpose of the nav-tree. If there is no visible text labeling the nav-tree, use `aria-label` instead. When both attributes are defined, `aria-labelledby` takes precedence.

`treeAriaLabel: InputSignal = input()`

Defines a string that labels the purpose of the nav-tree.If there is a visible text labeling the nav-tree, use `aria-labelledby` instead. When both attributes are defined, `aria-labelledby` takes precedence.

`patternMatcher: InputSignal boolean> = input()`

A function to determine whether a nav entry matches the filter pattern. Defaults to a matcher that checks the entry label and its children.

Methods

Name
Description

`collapseAll(): void`
Collapses the whole tree.

`expandAll(): void`
Expands the whole tree.

### Interfaces

#### ObNavTreeItemModel

This is the item model to fill the `ob-nav-tree`. The `ObNavTreeItemModel` is a navigation tree element for Angular that supports IDs, labels, and routing options. It can contain sub-elements, manage states and has a link to parent elements.

Properties

Name
Description

id: string
The unique identifier of the navigation element.

label: string
The displayed name of the navigation element.

labelParams?: Record
Optional parameters for localizing and formatting the label.

items?: ObNavTreeItemModel[]
Optional list of sub-elements, each an instance of `ObNavTreeItemModel`.

path?: string
The path in the router that the navigation element links to (comparable to [routerLink](https://angular.io/api/router/RouterLink)).

fragment?: string

The URL fragment added to the link (for anchor links). See [fragment](https://angular.io/api/router/RouterLink) in Angular docs.

queryParams?: any
Optional query parameters added to the link. See [queryParams](https://angular.io/api/router/RouterLink) in Angular docs.

disabled?: boolean
Indicates whether the navigation element is disabled. Default is `false`.

collapsed?: boolean
Indicates whether the navigation element is collapsed by default. Default is `true`.

parent?: ObNavTreeItemModel
Reference to the parent `ObNavTreeItemModel`, if any.

routes: any[]
List of all routes from the root element to this element.

## Example

A runnable example lives in the [oblique-stackblitz](https://stackblitz.com/github/oblique-bit/oblique-stackblitz/tree/master/oblique-nav-tree-default?file=package.json) repository (MIT):

```ts
import {ObNavTreeModule} from '@oblique/oblique';

export class HomeComponent implements OnInit {
  public items: ObNavTreeItemModel[] = [];

  ngOnInit(): void {
    this.items = [{
      id: 'tree-item-1',
      label: 'Tree item 1',
      items: [
        {id: 'tree-item-1-1', label: 'Child 1', path: 'child-1'},
        {id: 'tree-item-1-2', label: 'Disabled child', disabled: true},
      ],
    }];
  }
}
```

```html
<ob-nav-tree [items]="items" />
```
