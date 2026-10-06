# Error Messages

## Import

`import {ObErrorMessagesModule} from '@oblique/oblique';`

## How to use

The Error messages feature enhances the display of error messages.

To utilize this feature, add the `ObErrorMessagesDirective` to a `mat-form-field` component. Ensure the `mat-error` component is included in your code, even if it's initially empty. It will automatically populate with the translated validation error messages.

### Default Error Messages
Oblique includes default error messages for common validation errors. The error message keys can be overridden in the project translation files. All of Oblique's default error messages are listed, along with parameters that can be passed to the component. These parameters can be integrated into your translations using interpolation.

Be mindful of long error messages – they are condensed to fit the available space but can be fully displayed upon hovering or when the associated input field is focused.

### Angular Validators
emailKeyi18n.validation.email

DEUngültiges Format, bitte geben Sie eine gültige E-Mail-Adresse an

FRErreur de format : merci de saisir un e-mail valide

ITFormato non valido. Inserire un indirizzo e-mail valido

ENBad format: please enter a valid e-mail address

maxKeyi18n.validation.max

DEBitte geben Sie eine Zahl kleiner oder gleich {{max}} ein

FRLa valeur doit être inférieure ou égale à {{max}}

ITInserire un numero più piccolo o uguale {{max}}

ENThe value has to be less or equal to {{max}}

ParametersactualThe actual value

maxThe greatest allowed value

maxLengthKeyi18n.validation.maxlength

DEBitte geben Sie höchstens {{requiredLength}} Zeichen ein

FRLa longueur maximale est de {{requiredLength}} caractères

ITInserire al massimo {{requiredLength}} caratteri

ENAt most {{requiredLength}} characters are supported

ParametersactualLengthThe actual length

requiredLengthThe greatest allowed length

minKeyi18n.validation.min

DEBitte geben Sie eine Zahl grösser oder gleich {{min}} ein

FRLa valeur doit être supérieure ou égale à {{min}}

ITInserire un numero maggiore o uguale {{min}}

ENThe value has to be greater or equal to {{min}}

ParametersactualThe actual value

minThe smallest allowed value

minLengthKeyi18n.validation.minlength

DEBitte geben Sie mindestens {{requiredLength}} Zeichen ein

FRLa longueur minimale est de {{requiredLength}} caractères

ITInserire almeno {{requiredLength}} caratteri

ENAt least {{requiredLength}} characters are needed

ParametersactualLengthThe actual length

requiredLengthThe smallest allowed length

patternKeyi18n.validation.pattern

DEBitte geben Sie Zeichen ein, die dem Muster entsprechen

FRVeuillez entrer des caractères respectant le modèle donné

ITSi prega di inserire i caratteri corrispondenti allo schema

ENPlease enter characters matching the pattern

ParametersactualValueThe actual value

requiredPatternThe pattern that has to be matched

required, requiredTrueAs Angular returns the same error for both validators, they cannot be differentiated.

Keyi18n.validation.required

DEDieses Feld wird benötigt

FRCe champ est requis

ITCampo obbligatorio

ENThis field is required

### Schema validation with AJV
enumKeyi18n.validation.ajv.enum.allowedValues

DEDer ausgewählte Wert ist nicht gültig

FRLa valeur sélectionnée n'est pas valide

ITIl valore selezionato non è valido

ENThe selected value is not allowed

ParametersallowedValuesAn array containing the allowed values

exclusiveMaximumKeyi18n.validation.ajv.exclusiveMaximum

DEBitte geben Sie eine Zahl kleiner {{limit}} ein

FRLa valeur doit être inférieure à {{limit}}

ITInserire un numero più piccolo {{limit}}

ENThe value has to be less than {{limit}}

Parameterscomparison"<", the comparator used

exclusive"true", the given limit is not allowed

limitThe first value that is considered too big

exclusiveMinimumKeyi18n.validation.ajv.exclusiveMinimum

DEBitte geben Sie eine Zahl grösser {{limit}} ein

FRLa valeur doit être supérieure à {{limit}}

ITInserire un numero maggiore {{limit}}

ENThe value has to be greater than {{limit}}

Parameterscomparison">", the comparator used

exclusive"true", the given limit is not allowed

limitThe first value that is considered too small

format date-timeKeyi18n.validation.ajv.format.date

DEFalsches Format, bitte geben sie ein valides Datum im "tt.mm.jjjj" Format ein

FRLa date doit être au format "jj.mm.aaaa"

ITFormato della data non valido, "gg.mm.aaaa" è atteso

ENIncorrect date format, "dd.mm.yyyy" is expected

maximumKeyi18n.validation.ajv.maximum

DEBitte geben Sie eine Zahl kleiner oder gleich {{limit}} ein

FRLa valeur doit être inférieure ou égale à {{limit}}

ITInserire un numero più piccolo o uguale {{limit}}

ENThe value has to be less or equal to {{limit}}

Parameterscomparison"<=", the comparator used

exclusive"false", the given limit is allowed

limitThe greatest allowed value

maxLengthKeyi18n.validation.ajv.maxLength

DEBitte geben Sie höchstens {{limit}} Zeichen ein

FRLa longueur maximale est de {{limit}} caractères

ITInserire al massimo {{limit}} caratteri

ENAt most {{limit}} characters are supported

ParameterslimitThe greatest allowed length

minimumKeyi18n.validation.ajv.minimum

DEBitte geben Sie eine Zahl grösser oder gleich {{limit}} ein

FRLa valeur doit être supérieure ou égale à {{limit}}

ITInserire un numero maggiore o uguale {{limit}}

ENThe value has to be greater or equal to {{limit}}

Parameterscomparison">=", the comparator used

exclusive"false", the given limit is allowed

limitThe smallest allowed value

minLengthKeyi18n.validation.ajv.minLength

DEBitte geben Sie mindestens {{limit}} Zeichen ein

FRLa longueur minimale est de {{limit}} caractères

ITInserire almeno {{limit}} caratteri

ENAt least {{limit}} characters are needed

ParameterslimitThe smallest allowed length

requiredKeyi18n.validation.ajv.required

DEDieses Feld wird benötigt

FRCe champ est requis

ITCampo obbligatorio

ENThis field is required

typeKeyi18n.validation.ajv.type

DEFalscher Typ, "{{type}}" ist erwartet

FRLa valeur erronée doit être de type "{{type}}"

ITtipo di valore errato, "{{type}}" è prevista

ENBad value type, "{{type}}" is expected

ParameterstypeThe expected value type

### Directives

#### ObErrorMessagesDirective
When applied to a `mat-form-field` element, it populates the message within the `mat-error` component.

Selector

`[obErrors]`

Exported as

`obErrors`

PropertiesName

Description

`errors$: Observable<ValidationErrors>`

An observable that emits every time Angular throws a validation error on the underlying form control.

prefix: InputSignal<string>;

The translation key prefix used to resolve custom error messages. Default is `i18n.validation.`

The prefix is expected to end with a dot.
