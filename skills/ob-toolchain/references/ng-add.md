# `ng-add` Toolchain Schematic

Source: Directus content version `oui-4570`, Toolchain page `ng-add-16`.

Use the schematic to add the Oblique Toolchain to an existing Angular project:

```shell
npx @angular/cli@latest add @oblique/toolchain
```

It adds `@oblique/toolchain` as a dev dependency and creates a
`.browserslistrc` compatible with Oblique. For projects in the Confederation
or federal network, it can also create a BIT-specific `.npmrc`. A proxy port
can create `proxy.conf.json` and wire it into every project's serve target in
`angular.json`.

Install the Toolchain through the Oblique CLI when creating a project. Keep
schematic-generated files under the schematic's control and review changes
before customizing them.
