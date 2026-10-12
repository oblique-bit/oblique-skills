---
name: ob-components
description: Oblique UI component guidance for Angular. Use this whenever a user builds, styles, reviews, or chooses UI with Oblique, including outcome-style requests for forms, tables, dialogs, navigation, layouts, tabs, popovers, buttons, or any `ob-` component, even when the user does not know the component name.
license: Proprietary. Oblique documentation content.
metadata:
  author: oblique-bit
  category: components
---

# Oblique Components

Docs for the Oblique UI components, distilled from the Oblique
documentation. Each reference carries the component's purpose, usage rules,
how to use it, and its accessibility rules. When an Oblique MCP server is
available, its information overrules these references on API specifics
only, never on semantics.

## Cross-cutting accessibility MUSTs

- Every interactive element MUST have an accessible name.
- Icon-only buttons MUST have an accessible label; a tooltip is preferred.
- Overlays MUST close on Escape and MUST NOT trap keyboard focus without a way
  out. Modal dialogs MUST keep Tab and Shift+Tab inside the dialog while it is
  open and MUST return focus to the trigger on close.
- Information MUST NOT be conveyed by color alone.
- Only one primary button per page or dialog.

The full spec lives in `ob-ax`; the references below carry the
component-specific rules.

These are the current supported Oblique component references. Use
`references/migration.md` for historical version changes instead of selecting
an older component reference.

## References

Read the reference for a component before using it. Each file covers one
component: purpose, usage rules, how to use, accessibility, and migration
where applicable.

- [alert](references/alert.md)
- [autocomplete](references/autocomplete.md)
- [badge](references/badge.md)
- [breadcrumb](references/breadcrumb.md)
- [button](references/button.md)
- [card](references/card.md)
- [chips](references/chips.md)
- [column layout](references/column-layout.md)
- [dialog](references/dialog.md)
- [expansion panel](references/expansion-panel.md)
- [external link](references/external-link.md)
- [file upload and dropzone](references/file-upload.md)
- [form](references/form.md)
- [html table](references/html-table.md)
- [list group](references/list-group.md)
- [master layout](references/master-layout.md)
- [material table](references/material-table.md)
- [nav tree](references/nav-tree.md)
- [paginator](references/paginator.md)
- [popover](references/popover.md)
- [progress bar](references/progress-bar.md)
- [slide toggle](references/slide-toggle.md)
- [slider](references/slider.md)
- [spinner](references/spinner.md)
- [stepper](references/stepper.md)
- [tabs](references/tabs.md)
- [tooltip](references/tooltip.md)

## Migration

When migrating between Oblique versions, read
[15-to-16 migration](references/migrations/15-to-16.md) for the component
changes between those releases.
