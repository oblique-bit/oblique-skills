# `add-oblique` Schematic

Source: Directus content version `oui-4570`, Toolchain page `add-oblique`.

Use this schematic to embed the Oblique master layout into a fresh Angular
project:

```shell
npx @angular/cli@latest generate @oblique/toolchain:add-oblique
```

It adds the Oblique favicon, replaces the app template with the master layout,
adds `ObMasterLayoutModule` to the app module and generated TestBed, and calls
the `i18n` schematic for the selected locales. It also updates the generated
footer copyright year and removes the obsolete title test.

The schematic requires the application title, operator name and address, and
supported locales. The Oblique CLI runs it as part of `ob new`; prefer the CLI
for new projects.
