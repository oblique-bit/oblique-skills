# Spinner

## Import

`import {ObSpinnerModule} from '@oblique/oblique';`

## Purpose

Spinner inform users about the status of an ongoing process: loading, submitting a form or saving updates.

## Usage rules

Use it:
- Use it to visually communicate the loading or processing status of an application or specific content area.
- Use it to provide feedback that an action is being processed.

Do not use it:
- Do not use it for immediate actions, where the visual feedback may be more distracting than informative.
- Do not use it for actions longer than 10 seconds. Instead, consider using a progress bar (type "determinate") to show users an estimate of when the system will be finished.
- Do not use multiple progress spinners on a single page or view, as this can create visual clutter. You may determine this is necessary in special cases, but try to limit it as much as possible.

## How to use

A global spinner that blocks the entire application is already integrated into the master layout. It can be controlled by calling any function of `ObSpinnerService` without passing parameters.

To block only a specific section of the application, an `ObSpinnerComponent` with a defined channel must be embedded in that section. The `ObSpinnerService` functions should then be called with the corresponding channel as a parameter to target that specific area. In this case, the spinner will cover the parent element of the component in which it is embedded.
Ensure the spinner is activated **after the view has been initialized**. Otherwise, the spinner won't be able to find the channel and won't show up.
Typical ways to achieve this would be using the [`AfterViewInit`](https://angular.dev/api/core/AfterViewInit) lifecycle hook or [`afterRenderEffect`](https://angular.dev/api/core/afterRenderEffect).

### Services

#### ObSpinnerService

Properties

Name
Description

`events$: Observable`
An observable that emits every time a spinner is triggered or canceled.

`CHANNEL: string`

The channel name for the `ObSpinnerComponent` used by the master layout.

Methods

Name
Description

`activate(channel = ObSpinnerService.CHANNEL)`
Shows the spinner in the `ObSpinnerComponent` matching this channel. For this to work, the view has to be initialized **before** this method is called.

Parameters

`channel: string = ObSpinnerService.CHANNEL`

Specifies in which `ObSpinnerComponent` the spinner will be activated.

If no channel is provided, the global `ObSpinnerComponent` in the master layout will be used.

If a channel is provided, then an`ObSpinnerComponent` with a corresponding channel must be embedded in the application.

Name
Description

`deactivate(channel = ObSpinnerService.CHANNEL)`
Hides the spinner in the `ObSpinnerComponent` matching this channel, but only when it has been called as many times as the `activate` method.

Parameters

`channel: string = ObSpinnerService.CHANNEL`

Specifies in which `ObSpinnerComponent` the spinner will be deactivated.

If no channel is provided, the global `ObSpinnerComponent` in the master layout will be used.

If a channel is provided, then an`ObSpinnerComponent` with a corresponding channel must be embedded in the application.

Name
Description

`forceDeactivate(channel = ObSpinnerService.CHANNEL)`
Hides the spinner in the `ObSpinnerComponent` matching this channel, no matter how many times `activate` method has been called.

Parameters

`channel: string = ObSpinnerService.CHANNEL`

Specifies in which `ObSpinnerComponent` the spinner will be deactivated.

If no channel is provided, the global `ObSpinnerComponent` in the master layout will be used.

If a channel is provided, then an`ObSpinnerComponent` with a corresponding channel must be embedded in the application.

### Components

#### ObSpinnerComponent

Selector
`ob-spinner`

Exported as
`obSpinner`

Properties

Name
Description

`@Input() channel: string = ObSpinnerService.CHANNEL;`
The channel this spinner component listens to. An `ObSpinnerComponent` with the default channel is already embedded in the master layout

`@Input() fixed: boolean = false;`
Defines if the spinner overlay covers the whole viewport or only the componen't s parent

### Interfaces

#### ObISpinnerEvent

Event emitted by `activate` and `deactivate` methods.

Properties

Name
Description

`active: boolean`
Defines if the spinner should be displayed or removed.

`channel: string`
The channel where this event is destined to.

## Additional info

## Progress bar & Spinner

The progress bar and Spinner are very similar. The following comparison table can help you choose the one that best fits your needs.

Feature
Progress bar
Spinner

Visual Design
Horizontal or vertical bar filling up as progress occurs
Circular, with a spinning or looping animation

Progress Indication
Can show determinate progress with a visual percentage
Indicates indeterminate activity without a progress level

Typical Use Cases
Suitable for tasks with known duration (e.g., file uploads, downloads).
Used for tasks with uncertain duration (e.g., server responses, content loading).

User Expectation
Sets an expectation of remaining time
Suggests ongoing activity without specific time information

## Related

- /components/progress-bar
