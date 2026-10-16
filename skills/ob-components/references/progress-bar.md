# Progress bar

## Purpose

Progress bars inform users about the status of an ongoing process: loading, submitting a form or saving updates. They can display an estimated completion time for the computer's task.

## Usage rules

Use it:
- Use it to show visibility of system status during lengthy operations such as uploads and downloads, loading data, etc.

Do not use it:
- Do not use it for very short operations.
- Do not use it for operations happening in the background that do not impact the user's ability to interact with the application.

General:
- Limit the use of multiple Progress bars on a single page or view, as this can create visual clutter.

## How to use

This is only a redesign of the Angular Material "Progress bar" component.

The API definition is available on the Angular Material site: [Progress bar - opens in a new tab](https://v17.material.angular.io/components/progress-bar/api)

## Additional info

## Types

- **Determinate**: When it is known how much of the operation has been completed.

- **Indeterminate**: When the user is required to wait and it is not necessary to specify how long it will take.

- **Buffer**: When you want to show activity or server loading.

- **Query**: When you want to show pre-loading before the actual loading starts.

## Progress bar & Spinner

Progress bar and Spinner are very similar. The comparison table can help you choose the one that fits your needs.

Feature
Progress bar
Spinner

Visual Design
Horizontal or vertical bar filling up as progress occurs.
Circular, often spinning or looping animation.

Progress Indication
Can show determinate progress with a visual percentage.
Indicates indeterminate activity without a progress level.

Typical Use Cases
Suitable for tasks with known duration (e.g., file uploads, downloads).
Used for tasks with uncertain duration (e.g., server responses, content loading).

User Expectation
Sets an expectation of remaining time.
Suggests ongoing activity without specific time information.

## Related

- /components/spinner
