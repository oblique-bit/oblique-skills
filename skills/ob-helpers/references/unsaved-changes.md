# Unsaved changes

## Import

`import {ObUnsavedChangesModule} from '@oblique/oblique';`

## How to use

Tracks and notifies about unsaved form changes and ask for confirmation in case of:

- navigating to another route, see `ObUnsavedChangesGuard & ObUnsavedChangesDirective`

- reloading the current browser tab, see `ObUnsavedChangesDirective`

- closing the current browser tab, see `ObUnsavedChangesDirective`

- closing the browser itself, see `ObUnsavedChangesDirective`

The custom message shown in the popup asking for confirmation can be changed by overriding `i18n.validation.unsavedChanges`. It is only shown when navigating to another route but not when leaving or reloading the page. In the latter case, the message comes directly from the browser and cannot be changed.

#### ObUnsavedChangesDirective

It should be applied on a `<form>` or any element with `ngModelGroup` directive. The host element needs an `id`.

Selector
`[obUnsavedChanges]`

Exported as
`obUnsavedChanges`

Properties

Name
Description

`readonly id = input.required<string>()`
The HTML `id` attribute. It is mandatory for the directive to work.

`readonly isActive = input(true)`
Controls activation of the directive. When false, changes on the linked form will be ignored.

### Guards

#### ObUnsavedChangesGuard

It have to be applied to each route that have to be protected. It will check for changes in each element marked with `ObUnsavedChangesDirective`.

When the unsaved changes guard is used together with another guard that triggers a new navigation, then the confirm dialog will be shown twice. This is a design choice by Angular because there is no concept of redirection. The current navigation is simply aborted and a new one is created, which triggers all the guards again.

### Services

#### ObUnsavedChangesService

This service handles the unsaved changes monitored by the `ObUnsavedChangesDirective`. It should only be accessed through the `ObUnsavedChangesGuard` or the `ObUnsavedChangesDirective`

Properties

Name
Description

`public readonly isActive = signal(true)`
Controls activation of the feature. When false, changes are globally not monitored anymore.

Methods

Name
Description

`activate(): void`
when called, changes are globally monitored.

Name
Description

`deactivate(): void`
When called, changes are no longer globally monitored.

Name
Description

`watch(formId: string, form: ControlContainer): void`
Starts watching the given form for changes.

Parameters

`formId: string`
The id of the form

`form: ControlContainer`
[ControlContainer](https://angular.io/api/forms/ControlContainer)

Name
Description

`unWatch(formId: string): void`
Stops watching the given form for changes.

Parameters

`formId: string`
The id of the form

Name
Description

`canDeactivate(): boolean`
Checks if there are unsaved changes in the watched forms and ask for confirmation if there are.

Return value

`boolean`
flag indicating success / failure

Name
Description

`ignoreChanges(formsIds: string[]): boolean`
Same as `canDeactivate` but limited to the given form.

Parameters

`formsIds: string[]`
array of id of forms

Return value

`boolean`
flag indicating success / failure

## Example

A runnable example lives in the [oblique-stackblitz](https://stackblitz.com/github/oblique-bit/oblique-stackblitz/tree/master/oblique-unsaved-changes?file=package.json) repository (MIT):

```ts
import {ObUnsavedChangesModule} from '@oblique/oblique';

@NgModule({
  imports: [ObUnsavedChangesModule],
})
export class AppModule {}
```

```html
<form id="my-form" [formGroup]="form" obUnsavedChanges>
  <!-- form fields -->
</form>
```

```ts
// Protect routes with the guard
const routes: Routes = [
  {path: 'edit', component: EditComponent, canDeactivate: [ObUnsavedChangesGuard]},
];
```
