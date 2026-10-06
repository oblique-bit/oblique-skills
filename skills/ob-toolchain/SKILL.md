---
name: ob-toolchain
description: Oblique CLI and project lifecycle guidance for Angular. Use this whenever a user creates a new Oblique project, adds Oblique to an existing project, updates Oblique or Angular across major versions, runs Oblique schematics, or troubleshoots CLI-driven installation and migration.
license: Proprietary. Oblique documentation content.
metadata:
  author: oblique-bit
  category: toolchain
---

# Oblique Toolchain

Use this skill for Oblique CLI, installation, schematics, and upgrades. When
an Oblique MCP server is available, its information overrules these references
on API specifics only, never on lifecycle semantics.

## References

- Read [ng-add](references/ng-add.md) when adding the Toolchain to an existing
  Angular project.
- Read [add-oblique](references/add-oblique.md) when embedding the Oblique
  master layout into a fresh Angular project.
- Read [i18n](references/i18n.md) when configuring locales and translations.
- Read [linting](references/linting.md) when setting up Oblique ESLint rules.
- Read [logger](references/logger.md) when using Toolchain structured logging.
- Read [exec](references/exec.md) when executing commands through Toolchain or
  migrating from Toolchain 15 to 16.
- Read [getting started](references/getting-started.md) when creating a new
  project or adding Oblique to a project.
- Read [how to update Oblique](references/how-to-update-oblique.md) when
  upgrading between Oblique major versions or handling an unsupported layout.

## Create a project

Before running the CLI:

- Confirm Node.js is version 24.18.0 or newer.
- Confirm the target is an Angular application that can use Oblique
  schematics. Standalone applications and SSR are not supported by the
  schematics.
- Decide whether the project is internal or external. Internal projects use
  the Confederation npm registry configuration; external projects do not.

Create a new project with:

```shell
npx @oblique/cli@latest new <project-name>
```

Use `--npmrc` for an internal project or `--no-npmrc` for an external project.
The command is interactive. Keep its prompts visible and answer them one at a
time. After it completes, inspect the generated configuration and set the
application's accessibility statement information in
`provideObliqueConfiguration` as required by the project.

Validate the new project with its normal start, lint, and test commands. A
project is ready when dependencies install, the application starts, linting
passes, and tests pass.

## Update an existing project

1. Check the current Angular and Oblique major versions, the project layout,
   and the working tree. Preserve unrelated user changes.
2. Check the Oblique lifecycle and changelog. Updates must move through each
   major version between the current version and the target.
3. For Oblique 12.1 and newer, run the next major update:

   ```shell
   npx @oblique/cli@<oblique-version> update
   ```

   The command supports `--force`, `--verbose`, and `--allow-dirty`. Prefer a
   clean working tree so the schematic diff is reviewable.
4. Review every schematic change. Check the changelog for manual adjustments,
   then run the project's lint and test commands and verify the application
   still works.
5. Repeat one major version at a time until the target is installed. Keep the
   migration diff separate from unrelated changes.

For Oblique 12.0 and older, update Angular and its matching CLI, Jest builder,
and ESLint schematics one major at a time, then update Angular Material, then
Oblique. Use the Angular CLI update commands documented by the project's
version-specific migration guidance. Finish each major step with a reviewed
diff, lint run, and test run.

## Unsupported schematic layouts

When the application is standalone, uses SSR, or is not located under `src`,
manual installation or migration is required. Inspect the installed package's
migration guidance and the application's Angular configuration before editing.
Do not force schematics into an unsupported layout.

## Handoff

Use `ob-components` for component usage, `ob-helpers` for application helpers,
and `ob-ax` for accessibility review. Use this skill for the project lifecycle
that gets those capabilities installed and updated.
