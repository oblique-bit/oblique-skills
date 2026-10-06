# Getting Started with Oblique

Source: Oblique getting-started documentation.

## Prerequisites

- Node.js 24.18.0 or newer.
- An Angular project layout supported by Oblique schematics.
- SSR disabled. Standalone applications are not supported by the schematics.

## Create a project

Create a new application with:

```shell
npx @oblique/cli@latest new <my-project-name>
```

For an internal Confederation project, add the internal npm configuration:

```shell
npx @oblique/cli@latest new <my-project-name> --npmrc
```

For an external project, disable that configuration:

```shell
npx @oblique/cli@latest new <my-project-name> --no-npmrc
```

After creation, configure the application's accessibility statement through
`provideObliqueConfiguration` and start the application with its normal npm
start command.

## Verification

The project is ready when dependencies install, the application starts, and
its normal lint and test commands pass. Keep CLI prompts visible because the
setup is interactive.

## HTTP/2 compatibility

Oblique-created applications use the legacy Angular browser builder for
infrastructure that does not support HTTP/2. Projects created outside the
Oblique CLI may need the corresponding Angular builder configuration adjusted
manually. Confirm the target infrastructure before changing it.
