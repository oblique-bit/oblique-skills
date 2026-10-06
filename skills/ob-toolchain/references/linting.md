# Linting Schematic

Source: Directus content version `oui-4570`, Toolchain page `linting`.

Set up the Oblique ESLint configuration with:

```shell
npx @angular/cli@latest generate @oblique/toolchain:linting
```

The schematic removes existing ESLint dependencies and configurations, adds
`angular-eslint`, writes `eslint.config.mjs` and `tsconfig.eslint.json`, adds a
format script, and updates catch variables to `unknown` where required.

The shared configuration is also available through
`@oblique/toolchain/eslint-config` as `eslintConfigOblique`,
`eslintObliquePlugins`, and `eslintObliqueTemplatePlugins`. Keep deviations to
a minimum and run `npm run lint` before every commit.
