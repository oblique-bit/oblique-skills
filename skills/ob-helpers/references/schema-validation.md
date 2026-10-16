# Schema validation

## Import

`import {ObSchemaValidationModule} from '@oblique/oblique';`

## How to use

The `ObSchemaValidation` validate forms by harnessing the potential of custom [JSON Schemas.](https://json-schema.org/)

The given schema precisely defines the structure and rules for validating data within your forms. This give you the power to fine-tune form data validation to your exact specifications. You can find examples of how to define the schema in the specification for `Draft07` from [JSON Schema](https://json-schema.org/draft-07/json-schema-release-notes).

### Note on JSON Schema Draft Support

Out of the box, our `ObSchemaValidation` feature fully supports the JSON Schema `Draft07` standard, providing comprehensive tools for defining data structures.

If you prefer older drafts, such as `Draft03`, some configuration of the underlying plugin may be needed. Please see the [ajv documentation](https://github.com/ajv-validator/ajv#ajv-json-schema-validator). If you use the `Draft03` standard, the feature automatically changes it to version `Draft07`. Note that `Draft03` is only partially supported.

### Content-Security-Policy

If your project uses a Content-Secure-Policy, please note that the Schema Validation needs the `unsafe-eval` directive on `script-src` to be activated. This is a security downgrade that cannot be avoided. We are searching for a solution that doesn't require the `unsafe-eval` directive.

### Services

#### ObSchemaValidationService

The `ObSchemaValidationService` is employed within the context of the `ObSchemaValidationDirective`.It leverages the `draft07Convert` decorator to compile the `schema` and subsequently returns the Validator.

### Directives

#### ObSchemaValidationDirective

Have to be used on the form and needs the schema as input. This has to be used together with the `ObSchemaValidateDirective`

Selector
`[obSchemaValidation]`

Exported as
`obSchemaValidation`

Properties

Name
Description

`@Input() obSchemaValidation: any`
The JSON schema of your form validation.

Methods

Name
Description

`isRequired(propertyName: string, path: string[]): boolean`
Tells you if the property at the path is required.

Parameters

`propertyName: string`
The property name in the schema.

`path: string[]`
The property path of the input field.

Name
Description

`
 validate(propertyPath: string, value: any):
 [ValidationErrors](https://angular.io/api/forms/ValidationErrors)
 `
Returns validation errors for the property at the given path with the given value.

Parameters

`propertyPath: string`
The property path of the input field.

`value: any`
The value to validate.

#### ObSchemaValidateDirective

This directive ensures the Validation works for both `ngModel` and `formControlName` in Angular applications. Has to be set on the input fields.

Selector
`[obSchemaValidate][ngModel],[obSchemaValidate][formControlName]`

### Interfaces

#### ObSchemaValidatorInstance

Helper class for validation. It uses `ajv-formats` for setup and handling of the schema.

Methods

Name
Description

`validate(propertyPath: string = '', value: any): ValidationErrors`
Triggers a validation using the `ajv-formats` library

Parameters

`propertyPath: string = ''`
The path to the property in the schema.

`value: any`
The value to validate.

Name
Description

`getValidator(propertyPath: string): (AbstractControl) => ValidationErrors`
Gets the Validator for the given propertyPath.

Parameters

`propertyPath: string = ''`
The path to the property in the schema.

Name
Description

`isRequired(property: string, path: string[]): boolean`
Returns if the property on the path required.

Parameters

`property: string = ''`
The property in the schema.

`path: string[]`
The path to the property in the schema.
