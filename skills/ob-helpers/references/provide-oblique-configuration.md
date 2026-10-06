# provideObliqueConfiguration

## Import

`import {provideObliqueConfiguration} from '@oblique/oblique'`

## How to use

### Functions

#### provideObliqueConfiguration

A function providing the entire configuration for Oblique.

 
 
 `provideObliqueConfiguration(config: ObIObliqueConfiguration): EnvironmentProvider`
 The entry point to configure Oblique. This function must be included in the application's root providers for Oblique to work.
 
 
 
 
 Parameters
 
 
 `config: ObIObliqueConfiguration`
 The configuration for Oblique. Provided optional configuration is merged recursively with the default configuration.
 
 
 
 
 Return Value
 
 
 `EnvironmentProvider`
 An array of providers that can be provided to the application's `providers` array.
 
 

#### provideObliqueTestingConfiguration

**Do not use in production; this is for testing purposes only.**

This function provides the complete Oblique configuration for unit tests. It returns the same configuration as `provideObliqueConfiguration` with the following three differences:

 - 
 The `accessibilityStatement` property is optional. Since this property is not relevant in tests, omitting it significantly reduces boilerplate code.

 

 - 
 A custom loader for the `TranslateService` is provided, which returns an empty object. This eliminates the need to include an HTTP client in unit tests.

 

 
 
 `provideObliqueTestingConfiguration(config?: ObIObliqueTestingConfiguration): EnvironmentProvider`
 The entry point to configure Oblique. This function must be included in the application's root providers for Oblique to work.
 
 
 
 
 Parameters
 
 
 `config?: ObIObliqueTestingConfiguration`
 The configuration for Oblique. Provided optional configuration is merged recursively with the default configuration.
 
 
 
 
 Return Value
 
 
 `EnvironmentProvider`
 An array of providers that can be provided to the application's `providers` array.
 
 

### Interfaces

#### ObIObliqueConfiguration

Properties

 
 
 Name
 Description
 
 
 
 
 `accessibilityStatement: ObIAccessibilityStatementConfiguration`
 Configuration for the mandatory Accessibility Statement page.
 
 
 `material? : ObIMaterialConfig`
 Configuration to overwrite default values for Angular Material Components. Provided values are merged with the default icon configuration.
 
 
 `icon?: ObIconConfig`
 Configuration for the [icons](foundations/icons/api). Provided values are merged with the default icon configuration.
 
 
 `translate?: ObITranslateconfig`
 Configuration for translations. Provided values are merged with the default icon configuration.
 
 
 `hasLanguageInUrl: boolean = false`
 Whether or not Oblique should add the current language code to the URL.
 
 
 `consoleConfiguration?: ObConsoleConfiguration`
 Console messages added by Oblique that should be silenced.
 
 
 `pams?: ObIPamsConfiguration`
 The configuration to connect to PAMS. If not provided, the application won't show any PAMS widget in the service navigation.
 
 

#### ObIObliqueTestingConfiguration

Properties

 
 
 Name
 Description
 
 
 
 
 `accessibilityStatement?: ObIAccessibilityStatementConfiguration`
 Configuration for the mandatory Accessibility Statement page.
 
 
 `material? : ObIMaterialConfig`
 Configuration to overwrite default values for Angular Material Components. Provided values are merged with the default icon configuration.
 

 
 `icon?: ObIconConfig`
 Configuration for the [icons](foundations/icons/api). Provided values are merged with the default icon configuration.
 
 
 `translate?: ObITranslateconfig`
 Configuration for translations. Provided values are merged with the default icon configuration.
 
 
 `hasLanguageInUrl: boolean = false`
 Whether or not Oblique should add the current language code to the URL.
 
 
 `consoleConfiguration?: ObConsoleConfiguration`
 Console messages added by Oblique that should be silenced.
 
 
 `pams?: ObIPamsConfiguration`
 The configuration to connect to PAMS. If not provided, the application won't show any PAMS widget in the service navigation.
 
 

#### ObIAccessibilityStatementConfiguration

Properties

 
 
 Name
 Description
 
 
 
 
 `applicationName: string`
 The name of the application, usually the same that is provided through the `obHeaderTitle` content projection marker. It accepts either a text or a translation key.
 
 
 `applicationOperator: string`
 The name and address of the federal office or other entity that operates the application. It accepts either text or a translation key, both of which support HTML. This information will be wrapped in an `<address>` tag.
 
 
 `contact: ObContactData[]`
 Contact information for the project. At least one mean of contact - be it a phone number, an email or the url to a contact form - must be provided to contact the application's owner. Multiple entries are allowed.
 
 
 `conformity: 'full' | 'partial' | 'none'`
 How the application conforms to the WCAG 2.1, level AA standard. If the conformity is `partial`, then the `exceptions` property must also be provided.
 
 
 `createdOn: Date`
 The date the accessibility statement was first published, which should coincide with the date the application was published with the accessibility statement.
 
 
 `reviewedOn?: Date`
 Optional revision date of the accessibility statement. While the creation date should never be changed, the revision date shows the date of the latest change.
 
 
 `exceptions?: string[]`
 
 A list of exceptions to the application's compliance with WCAG 2.1, Level AA. This is required only if the application partially conforms.

 If the application is fully conformant or non-conformant, no exceptions may be provided.

 This field accepts either an array of text entries or translation keys.

 
 
 

#### ObContactData

Properties

 
 
 Name
 Description
 
 
 
 
 `email: string`
 The email to contact the application's owner. Each entry must contain exactly one of following: `email` or `phone` or `url`.
 
 
 `phone: string`
 The phone number to contact the application's owner. Each entry must contain exactly one of following: `email` or `phone` or `url`.
 
 
 `url: string`
 The url to a contact form to contact the application's owner. Each entry must contain exactly one of following: `email` or `phone` or `url`.
 
 
 `context?: string`
 An optional context that will be displayed below the associated contact method. It can be added to an `email`, `phone`, or `URL` entry.
 
 

#### ObTranslateConfig

Properties

 
 
 Name
 Description
 
 
 
 
 `flatten?: boolean = true`
 
 Whether to flatten the translation file or not. When set to `true`, the JSON will be reduced to a single level. When `false`, the translation files will be used as provided.

 Flattening helps avoid key collisions and makes translation keys easier to search. This parameter is intended for applications that work with large, flat files where flattening can be time-consuming.

 
 
 
 `config?: TranslateModuleConfig`
 Additional optional config options for `TranslateModule`.
 
 
 `additionalFiles?: ObITranslationFile[]`
 Additional translation files to load.
 
 
 `hasLanguageInUrl?: boolean = false`
 Defines whether the current language should be included in the URL.
 
 
 `locales: ObILocale`
 A list of locales supported by the application
 
 

#### ObITranslationFile

This interface represents the location of a translation resource file.

Properties

 
 
 Name
 Description
 
 
 
 
 `prefix: string`
 The prefix of the translation resource file.
 
 
 `suffix: string`
 The suffix of the translation resource file.
 
 

#### ObIMaterialConfig

Properties

 
 
 Name
 Description
 
 
 
 
 `MAT_FORM_FIELD_DEFAULT_OPTIONS?: MatFormFieldDefaultOptions`
 Represents the default options for the form field that can be configured using the `MAT_FORM_FIELD_DEFAULT_OPTIONS` injection token. The API definition is available on the Angular Material site: [Form field - opens in a new tab](https://v19.material.angular.io/components/form-field/api)
 
 
 `STEPPER_GLOBAL_OPTIONS? : StepperOptions`
 Configurable options for stepper. The API definition is available on the Angular Material site: [Stepper - opens in a new tab](https://v19.material.angular.io/components/stepper/api)
 
 
 `MAT_CHECKBOX_OPTIONS?: MatCheckboxDefaultOptions`
 Default `mat-checkbox` options that can be overridden. The API definition is available on the Angular Material site: [Checkbox - opens in a new tab](https://v19.material.angular.io/components/checkbox/api)
 
 
 `MAT_RADIO_OPTIONS?: MatRadioDefaultOptions`
 Default `mat-radio`options that can be overridden. The API definition is available on the Angular Material site: [Radio button - opens in a new tab](https://v19.material.angular.io/components/radio/api)
 
 
 `MAT_SLIDE_TOGGLE_OPTIONS?: MatSlideToggleDefaultOptions`
 
 Default `mat-slide-toggle` options that can be overridden. The API definition is available on the Angular Material site: [Slide toggle - opens in a new tab](https://v19.material.angular.io/components/slide-toggle/api)

 
 
 
 `MAT_TABS_CONFIG?: MatTabsConfig`
 
 Default `mat-tab`options that can be overridden. The API definition is available on the Angular Material site: [Tabs - opens in a new tab](https://v19.material.angular.io/components/tabs/api)

 
 
 

#### ObILocale

Properties

 
 
 Name
 Description
 
 
 
 
 `locales: string[]`
 A list of supported locales, conforming to the ISO 639-1 standard. An optional country code conforming to the ISO 3166-1 alpha-2 standard can be appended with a hyphen.
 
 
 `defaultLanguage: string`
 The default language, used when none is actually chosen or if the chosen one is not valid.
 
 
 `disabled: boolean`
 Let Oblique handles locales (false) or completely disables Oblique language management (true). In ths case, the application have to provide a default language as well as a change language mechanism
 
 
 `languages: Record`
 A map between the ISO 639-1 locale and its written form.
 
 

#### ObConsoleConfiguration

Properties

 
 
 Name
 Description
 
 
 
 
 `silencedLabels?: ReadonlySet<string>`
 A set of strings representing the Oblique console messages to be silenced.
 
 

#### ObIPamsConfiguration

Properties

 
 
 Name
 Description
 
 
 
 
 `environment: ObEPamsEnvironment`
 The PAMS environment to connect to. It will be used to derived the base url for all PAMS HTTP calls.
 
 
 `rootUrl?: string`
 If provided, overwrites the base rul for all PAMS HTTP calls. Useful in development mode where PAMS is not accessible.
