# Translations

## How to use


Oblique provides a full internationalization (i18n) solution built on `ngx-translate`, enhanced with automatic configuration, runtime locale handling, and predictable translation behaviors.

Translations are runtime-based, allowing the language to be changed without reloading the page. Users can switch languages without losing unsaved work.

### Translations

#### Built-in Translations

Oblique ships built-in translations for all its components in the following languages:

- German (`de`)

- French (`fr`)

- Italian (`it`)

- English (`en`)

By default, new applications support the Swiss locales:

- `de-CH`

- `fr-CH`

- `it-CH`

#### Translations Structure

Avoid dynamically constructing translation keys, as this makes it harder to trace usage, reduces static analysis effectiveness, and complicates maintenance. Using explicit, statically defined keys ensures better readability, predictable behavior, easier refactoring, and reliable translation extraction.

Translation key prefix
All Oblique translation keys are prefixed with `i18n`:

Context
Key Prefix

Oblique components
`i18n.oblique.*`

Material components (overridden by Oblique)
`i18n.datepicker.*`, `i18n.pagination.*`, `i18n.stepper.*`

Input validation messages
`i18n.validation.*`

Flat Translation files
Oblique uses a flat translation structure for immediate visibility of the full key, simplifying searching and maintenance. Flat keys also produce cleaner, smaller diffs-making code reviews easier- and are the recommended approach for predictable, developer-friendly translation files.

Oblique automatically flattens a project's translation files to prevent conflicts when merging multiple files. This behavior can be disabled; see the [Configuration > Advanced Options > flatten](#flatten) section below.

#### Overriding Keys

Because project translation files are loaded after Oblique's, any key can be overridden simply by redefining it:

`{"i18n.oblique.external": "My own translation"}`

### Installation & Automatic Setup

Installing Oblique via the CLI automates most of the configuration:

npx @oblique/cli@latest new my-project
This calls Oblique's Schematics which:

- Prompt for desired locales

- Register selected locales with Angular & Oblique

- Configure ngx-translate

- Create `assets/i18n` folder

- Generate translation JSON files for the project

- Merge Oblique's built-in translations

The system works immediately - no manual setup required.

#### Generated Code by Schematics

Assuming the default locales are kept:

Angular locale registration
import {registerLocaleData} from '@angular/common';
import localeDeCH from '@angular/common/locales/de-CH';
import localeFrCH from '@angular/common/locales/fr-CH';
import localeItCH from '@angular/common/locales/it-CH';

registerLocaleData (localeDeCH);
registerLocaleData (localeFrCH);
registerLocaleData (localeItCH);

Angular default locale
`providers: [{provide: LOCALE_ID, useValue: 'de-CH'}] // first registered locale is used`

Generated translation files

- `assets/i18n/de.json `

- `assets/i18n/fr.json `

- `assets/i18n/it.json `

Oblique merges its internal translations automatically.

### Configuration

Translations can be configured partially via `ObMasterLayoutConfig.locale` and partially via `provideObliqueConfiguration`.

#### Overriding default locales

The `ObMasterLayoutConfig.locale.locales` property controls which languages are available in the language selection widget. It is not possible to have two locales for the same language.

const config = inject(ObMasterLayoutConfig);
locale.locales = ['de-CH', 'fr-CH'];
Locales defined in `ObMasterLayoutConfig.locale.locales` must be kept in sync with those registered with `registerLocaleData`.

#### Adding a New Locale Beyond Oblique's Built-ins

To add a language not shipped by Oblique (e.g., Spanish `es`): 

- Register Angular locale:
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

- Register locale with Oblique
const config = inject(ObMasterLayoutConfig);
config.locale.locales = ['de-CH', 'fr-CH', 'it-CH', 'es'];

- Provide project's translations in `assets/i18n/assets/i18n/es.json`

- Provide Oblique's translations in `assets/i18n/assets/i18n/oblique-es.json`

#### Default language

The default language is the one used when a translation is missing in the current locale:

const config = inject(ObMasterLayoutConfig);
config.locale.defaultLanguage = 'fr';

#### Disabling Oblique Translations

Oblique's translation system can be completely bypassed:

const config = inject(ObMasterLayoutConfig);
config.locale.disabled = true;
Projects are then responsible to completely handle translations.

#### Add Language in URL

Oblique can prepend the current language (not locale) to the URL:

`provideObliqueConfiguration({hasLanguageInUrl: true});`
With this option, Oblique automatically adds a parent `Route` with the current language to the `Routes` configuration. It also updates the main navigation and nav-tree items to include the current language. Other project links must include the language manually.

The language in the URL is always synchronized with the language selection widget. If an invalid language is provided in the URL, the application will redirect to `ObMasterLayoutConfig.locale.defaultLanguage`.

#### Advanced options

`provideObliqueConfiguration` has an optional `translate` property with the following options:

Property
Type
Default value
Description

`flatten`
`boolean`
`true`
Controls whether the project's translation files are flattened

`config`
`TranslateModuleConfig`
`undefined`
Configuration object passed directly to `ngx-translate`

`additionalFiles`
`ObITranslationFile[]`
`undefined`
Extra translation files to load for each locale

### Runtime Behavior

#### Translation Loading

All translation files - including Oblique's default files, the application's own files, and any additional files - are loaded at application startup. Lazy loading of translations is not supported.

All supported locales must be defined at application startup and cannot be changed afterwards.

#### Active Language Decision Tree

Oblique determines the initial language in this order:

- LocalStorage - if present and valid

- Browser language - if valid

- `ObMasterLayoutConfig.locale.defaultLanguage` - if valid

- First registered locale - fallback

#### Automatic Updates on Locale Change

When the active locale changes, Oblique automatically updates:

- Angular Material `DateAdapter` - date pickers and other locale dependent features use correct locale

- `<html lang="">` attribute - improves accessibility and SEO

- The language in the URL

- The language stored in `LocalStorage`

#### Language Selection widget

- Shown automatically if more than one locale is configured

- Hidden if only a single locale exists

- Switches the active language without page reload
