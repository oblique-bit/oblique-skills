---
name: ob-helpers
description: Oblique helper and service guidance for Angular. Use this whenever a user wires application behavior with Oblique, including authentication, errors, HTTP, localization, forms, notifications, formatting, routing guards, translations, unsaved changes, RxJS, or any Oblique helper, even when the user describes the outcome instead of naming the service.
license: Proprietary. Oblique documentation content.
metadata:
  author: oblique-bit
  category: helpers
---

# Oblique Helpers

Docs for Oblique helpers and services, distilled from the Oblique
documentation. Each reference carries the helper's purpose, usage rules,
how to use it, and accessibility rules where the docs provide them. When an
Oblique MCP server is available, its information overrules these references on
API specifics only, never on semantics.

## Cross-cutting accessibility MUSTs

- Every interactive element MUST have an accessible name.
- Form errors MUST be associated with their inputs through
  `aria-describedby` and `aria-invalid`.
- Focus indicators MUST remain visible.
- Status changes MUST be announced without moving focus.
- Navigation away from dirty forms MUST give users a clear, accessible choice.

The full spec lives in `ob-ax`; the references below carry helper-specific
rules and are useful when `ob-ax` is not installed.

These are the current supported Oblique helper references. Use
the applicable version's migration instructions in `references/migrations/` for
historical version changes instead of selecting
an older helper reference.

## References

Read the relevant reference before using an Oblique helper or service.

- [authentication](references/authentication.md): authentication setup and behavior
- [banner](references/banner.md): environment banner configuration
- [collapse](references/collapse.md): collapsible content
- [date](references/date.md): date parsing, formatting, and locale behavior
- [document meta](references/document-meta.md): document title and metadata
- [error messages](references/error-messages.md): translated validation errors
- [focus invalid](references/focus-invalid.md): focus management for invalid forms
- [focus with outline](references/focus-with-outline.md): visible focus styling
- [global events](references/global-events.md): application-wide events
- [HTTP interceptor](references/http-interceptor.md): API loading and error behavior
- [localize](references/localize.md): localization helpers
- [nested form](references/nested-form.md): nested Angular forms
- [notification](references/notification.md): user notifications
- [number format](references/number-format.md): number formatting
- [off-canvas](references/off-canvas.md): off-canvas panels
- [Oblique configuration](references/provide-oblique-configuration.md): global configuration
- [RxJS operators](references/rxjs-operators.md): Oblique RxJS helpers
- [schema validation](references/schema-validation.md): schema validation
- [selectable](references/selectable.md): selectable content
- [translate params](references/translate-params.md): translation parameters
- [translations](references/translations.md): translation setup and runtime behavior
- [unknown route](references/unknown-route.md): unknown-route handling
- [unsaved changes](references/unsaved-changes.md): dirty-form navigation guards
- [version](references/version.md): Oblique version information

## Migration

When migrating between Oblique versions, read
[15-to-16 migration](references/migrations/15-to-16.md) for helper changes
between those releases.
