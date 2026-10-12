# Column layout

## Import

`import {ObColumnLayoutModule} from '@oblique/oblique';`

## Purpose

The Column layout component is designed to display content in the central part of the layout while allowing users to hide the side panels.

## Usage rules

Use it:
- Use it in scenarios where the navigation might distract from critical tasks.
- Use it when users require an intense focus on central content, such as when analyzing complex data visualizations or detailed maps.

General:
- A two-column layout is available as well. In this case, you can choose which column is collapsible.
- The component is not required to occupy the complete width of the viewport. If necessary, it can also be placed in a more compact container in exceptional circumstances.

## How to use

### Full Height
Applying the `ob-full-height` CSS class to the column layout component enables full height mode. In this mode, the layout expands to fill the available viewport height, and each column scrolls independently.

To enable this mode, both the `header` and `footer` of the master layout must be configured as sticky.

### Components

#### ObColumnLayoutComponent
The purpose of the column layout component is to display data in a central main column with a complementary drawer on each side. Both drawers are optional and feature the `complementary` role

Selector

`ob-column-layout`

Exported as

`obColumnLayout`

PropertiesName

Description

`left: InputSignal = input('OPENED')`

Defines if the left panel should be rendered and if it should be initially opened or closed.

- `'OPENED'`: means that the panel is present and initially opened.

- `'CLOSED'`: means that the panel is present and initially closed.

- `'NONE'`: means that the panel is absent.

`right: InputSignal = input('OPENED')`

Defines if the right panel should be rendered and if it should be initially opened or closed.

- `'OPENED'`: means that the panel is present and initially opened.

- `'CLOSED'`: means that the panel is present and initially closed.

- `'NONE'`: means that the panel is absent.

`noLayout: InputSignal = input(false)`

Defines if the panels should have default layout.

`wider: InputSignal = input(false)`

Defines if the side panels should be wider (40% each).

Content projectionName

Description

`[column-left-content]`

Selects the content to project into the left panel.

`[column-main-content]`

Selects the content to project into the main panel.

`[column-right-content]`

Selects the content to project into the right panel.

TypeName

Description

`ObTColumnState = 'OPENED' | 'CLOSED' | 'NONE'`

The state of the column layout panel.

### Internationalization

#### Translation keys
Name

Description

`i18n.oblique.column.left.toggle`

Screen-reader only label for the left toggle button.

`i18n.oblique.column.right.toggle`

Screen-reader only label for the right toggle button.

## Related

- /components/expansion-panel
- /components/off-canvas

## Example

A runnable example lives in the [oblique-stackblitz](https://stackblitz.com/github/oblique-bit/oblique-stackblitz/tree/master/oblique-column-layout?file=package.json) repository (MIT):

```ts
import {ObColumnLayoutModule} from '@oblique/oblique';

@NgModule({
  imports: [ObColumnLayoutModule],
})
export class AppModule {}
```

```html
<ob-column-layout>
  <ng-container column-left-content>Left panel</ng-container>
  <ng-container column-main-content>Main content</ng-container>
  <ng-container column-right-content>Right panel</ng-container>
</ob-column-layout>
```
