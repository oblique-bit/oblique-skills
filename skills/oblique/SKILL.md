---
name: oblique
description: Route Oblique Angular development tasks to the right skills. Use this whenever a user works with Oblique, is unsure which Oblique skill applies, or describes an outcome that spans areas, such as building a form, settings page, detail page, or full layout, even when they do not name an Oblique component or helper.
license: Proprietary. Oblique documentation content.
metadata:
  author: oblique-bit
  category: router
---

# Oblique Docs Router

Selects the right Oblique skill for a task. The category skills fire on
their own when a prompt names their area; this router covers outcome-style
prompts and tasks that span several areas. When an Oblique MCP server is
available, prefer it for component and helper names, inputs, outputs, and
signatures. For usage rules, behavior, and a11y requirements, follow the
skill references and flag any conflict to the user.

## Skills

- **ob-components**: Oblique UI components (alert, autocomplete, badge,
  breadcrumb, button, card, chips, column layout, dialog, expansion panel,
  external link, file upload, form, html table, list group, master layout,
  material table, nav tree, paginator, popover, progress bar, slide toggle,
  slider, spinner, stepper, tabs, tooltip). Use when building or styling
  UI with these.
- **ob-helpers**: Oblique helpers and services (authentication, banner,
  collapse, date, document meta, error messages, focus handling, global
  events, http interceptor, language, localize, nested forms, notification,
  number format, off-canvas, rxjs operators, schema validation, selectable,
  translations, unsaved changes, version). Use when wiring app behaviour
  around Oblique services.
- **ob-toolchain**: Oblique CLI and project lifecycle (new projects,
  installation, schematics, updates, and migrations). Use when setting up or
  upgrading an Oblique project.
- **ob-ax**: accessibility spec for Oblique apps. Use when a11y, WCAG,
  keyboard access, focus, or screen readers are in scope.

## Intent mapping

| Prompt intent | Skills |
|---|---|
| Build or restyle a UI element | ob-components (+ ob-ax if the element is an interactive control) |
| Wire app behaviour (auth, errors, translations, events) | ob-helpers |
| Project creation or update | ob-toolchain |
| Make something accessible, review a11y | ob-ax |
| Build a form | ob-components (form, inputs) + ob-ax |
| Build a settings or detail page | ob-components (master/column layout) + ob-helpers (unsaved changes) + ob-ax |
| Migrate between Oblique versions | ob-toolchain; add ob-components or ob-helpers only when the changelog shows their APIs changed |
| Task fits none of the skills above (routing, state management, theming) | No skill applies; say so, state which skills were considered, and answer from available Oblique references without inventing APIs. Ask a clarifying question if the intent is unclear |

## Multi-skill tasks

When a task maps to several skills, read each skill's relevant references
before writing code. A form task needs the form reference plus the a11y
rules; a page task needs the layout reference plus the unsaved-changes
helper. Do not guess component APIs from memory when a reference exists.
If a needed reference is missing or unreadable, tell the user and state
which APIs are unverified instead of guessing.

Any task that builds or changes a user-facing control adds `ob-ax`, even
when the prompt does not mention accessibility. A language switcher, a
table filter, or a dialog is a control; its keyboard and screen-reader
behavior is in scope from the start.
