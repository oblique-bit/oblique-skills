# Off-canvas

## Import

`import {ObOffCanvasModule} from '@oblique/oblique';`

## Purpose

The off-canvas component adds a panel that slides out from the screen, offering more content. It allows users to access additional information and features without leaving the page.

## Usage rules

Use it:
- To provide access to additional navigation options, settings, or content.

Do not use it:
- If there is enough space on the page to display all of the information.

## How to use

[https://www.figma.com/design/pyx5j9MVIIc3tTPitkc0Hv/OB-Library-12.0.0-%E2%80%93-F1.0?node-id=4569-8778&node-type=frame&t=NfFy8J8KIQtLVjxH-11](https://www.figma.com/design/pyx5j9MVIIc3tTPitkc0Hv/OB-Library-12.0.0-%E2%80%93-F1.0?node-id=4569-8778&node-type=frame&t=NfFy8J8KIQtLVjxH-11)

## API reference for Off Canvas



A toggleable absolute position container to display supplementary info like help. It consists of a sidebar that slides in from the right and takes up 40% of the available space. The sidebar is part of the master layout, but the toggle to control it has to be provided by the project.

The toggle consists of any element, typically a button, with the `obOffCanvasToggle` directive on it.

The content of the sidebar has to be passed to the `ob-master-layout` component through the `[obOffCanvasContent]`content projection option while the title uses the `[obOffCanvasTitle]` one.

### Directives

#### ObOffCanvasToggleDirective

Selector
`[obOffCanvasToggle]`

Exported as
`obOffCanvasToggle`

Methods

Name
Description

`toggle(): voidy`
Toggles the off-canvas.
