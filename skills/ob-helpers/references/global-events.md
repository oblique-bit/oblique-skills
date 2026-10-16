# Global events

## Import

`import {ObGlobalEventsService} from '@oblique/oblique';`

## How to use

This is a simple service that acts as a proxy for some of the most used global events. It replaces the use of `@HostListener` for events triggered on `Document` or `Window`. Its goal is to reduce the number of listeners on global events and to provide a way to register those events only when necessary. For instance, one could listen to a `Document` click only when an element is in a given state. It also provides a function named `outsideClick$` that returns an observable that emits when a click is performed outside a given array of HTML elements.

### Services

#### ObGlobalEventsService

This service serves as a single entry point for global events, so that there is only 1 registered listener per event.

Properties

Name
Description

`beforeUnload$: Observable<BeforeUnloadEvent>`
Emits before the page is unloaded.

`click$: Observable<MouseEvent>`
Emits when the mouse's left button is clicked.

`mouseDown$: Observable<MouseEvent>`
Emits when any mouse button is pressed and before it is released.

`mouseMove$: Observable<MouseEvent>`
Emits the mouse moves.

`keyDown$: Observable<KeyboardEvent>`
Emits when any key is pressed and before it is released.

`keyUp$: Observable<KeyboardEvent>`
Emits when any key is released.

`scroll$: Observable<Event>`
Emits when the `Document` is scrolled. The scroll$ observable won't fire if the MasterLayout has a sticky header and/or footer, because scrolling occurs on an internal element rather than on the `Document` itself.

`wheel$: Observable<Event>`
Emits when the `Window` detects the user rotates a wheel button.

`resize$: Observable<UIEvent>`
Emits when the `Window` is resized.

`navigate$: Observable<NavigateEvent>`
Emits when there is a new navigation.

### Functions

#### obOutsideFilter

This function is a custom rxjs operator and is meant to be used with `ObGlobalEventsService` mouse and keyboard events: `obGlobalEventsService.click$.pipe(obOutsideFilter(HTMLElement))`

obOutsideFilter(...elements: HTMLElement[]): (source$: Observable<Event>) => Observable<Event>
A custom RxJs operator that filters event happening outside the elements given as parameters.

Parameters

`...elements: HTMLElement[]`
List of elements whose events will be filtered out.
