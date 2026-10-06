---
name: ob-ax
description: Oblique accessibility guidance for Angular apps. Use this whenever a user builds or reviews Oblique UI, asks to make a page or component accessible, or mentions a11y, WCAG, screen readers, keyboard access, focus, ARIA, contrast, forms, dialogs, or `ob-` directives, including when accessibility is implied but not explicitly requested.
license: MIT. Adapts content from github/awesome-copilot (MIT).
metadata:
  author: oblique-bit
  category: accessibility
---

# Oblique Accessibility Spec

Accessibility rules for Angular applications built with Oblique. The
conformance target is WCAG 2.2 AA; it is not restated here because models
already know it. Rules are written in MUST/SHOULD form. When an Oblique MCP
server is available, its information overrules this spec on API specifics
only, never on semantics.

## Layered rules

Accessibility guidance is layered. This spec is the top layer:

1. Component references in `ob-components` and `ob-helpers` carry the
   component-specific a11y rules (their Accessibility section). Read those
   first when a specific component is in hand.
2. The cross-cutting MUSTs below apply to every change.
3. This spec adds the full picture: Angular anti-patterns and Oblique
   helpers.

## Cross-cutting MUSTs

- Every interactive element MUST have an accessible name, via visible text,
  `aria-label`, or `aria-labelledby`.
- Icon-only buttons MUST have an accessible label; a tooltip is the
  preferred way to provide it.
- All functionality MUST be operable by keyboard.
- Overlays (dialogs, popovers, off-canvas) MUST close on Escape and MUST
  NOT trap keyboard focus without a way out.
- Information MUST NOT be conveyed by color alone.
- Form errors MUST be programmatically associated with their inputs
  (`aria-describedby`, `aria-invalid`).
- Status changes MUST be announced to screen readers without receiving
  focus (live region, `role="status"`, `role="alert"`).
- Focus indicators MUST stay visible; `outline: none` MUST be replaced by
  a `:focus-visible` style.
- Text contrast MUST meet 4.5:1 (normal text) and 3:1 (large text); UI
  components and focus indicators MUST meet 3:1 against adjacent colors.
- Touch targets MUST be at least 24x24 CSS px or have equivalent spacing.

## Angular anti-patterns

Adapted from [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md)
(MIT), extended with Oblique specifics.

### NG1: `(click)` on a non-interactive element

`(click)` on a `<div>` or `<span>` without `role`, `tabindex`, and a
keyboard handler is not focusable and has no role. Use `<button>`. When a
div is required, add `role="button"`, `tabindex="0"`, and
`(keydown.enter)` plus `(keydown.space)`.

### NG2: Modal without focus management

A modal component without focus trapping keeps keyboard focus able to
wander behind the overlay. Angular CDK's `Dialog` service handles trapping
and restoration automatically; prefer it. For custom overlays, use
`cdkTrapFocus` with `[cdkTrapFocusAutoCapture]="true"`, and return focus to
the trigger element on close.

### NG3: Route change without announcement

A router navigation without announcement leaves screen reader users on the
old page context. Announce the new page title after navigation:

```typescript
router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
	liveAnnouncer.announce(titleService.getTitle(), 'polite');
});
```

Oblique's master layout manages the page structure; when it is present,
verify the announcement still fires for in-app navigations.

### NG4: Form errors not linked to inputs

Forms showing errors without `[attr.aria-invalid]` and
`[attr.aria-describedby]` leave the error text unassociated. Bind both to
the form control state:

```html
<input [attr.aria-invalid]="control.invalid" [attr.aria-describedby]="control.invalid ? 'email-error' : null" />
<span id="email-error" class="error">Invalid email format</span>
```

Oblique's error-messages helper centralizes error text; link its output
with `aria-describedby`.

## Oblique a11y helpers

- **Focus with outline** (`focus-with-outline`): restores a visible focus
  outline where Oblique styling removed it. Use it instead of leaving
  `outline: none` in place.
- **Focus invalid** (`focus-invalid`): focuses the first invalid control on
  submit, so keyboard and screen reader users land on the error. Use it in
  every form with validation.
- **Unsaved changes** (`unsaved-changes`): guards navigation away from
  dirty forms. Announce the guard dialog's decision path to screen readers.
- **Error messages** (`error-messages`): centralized validation text. Pair
  with `aria-describedby` per NG4.

Read the matching reference in `ob-helpers` for the API of each helper.

## Review checklist

- [ ] Every interactive element has an accessible name
- [ ] Icon-only buttons have a label (tooltip preferred)
- [ ] All functionality works by keyboard; overlays close on Escape
- [ ] Errors are linked to inputs; first invalid control gets focus
- [ ] Status changes are announced via live regions
- [ ] Focus indicators are visible; contrast meets 4.5:1 / 3:1
- [ ] Information is not conveyed by color alone
- [ ] Touch targets are at least 24x24 CSS px
