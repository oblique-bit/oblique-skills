# Document meta

## Import

`import {ObDocumentMetaModule} from '@oblique/oblique';`

## How to use

This service is used to get, set and add page meta information:

- `content` attribute of `<meta name="description">`.

- content of the `<title>` tag.

To activate it, import it in the `AppModule`.

### Description

The description can be defined either:

- globally on the `ObDocumentMetaService`.

- per route within the data object on routes definition ( i.e `{path: 'home', component: HomeComponent, data: {description: 'Description'}}`).

The given string will be translated in both cases. The description is updated each time a page is loaded.

### Title

The title is composed of three parts: the `page`, a `separator` and a `suffix`. If either the page or the suffix is missing, then the separator will be omitted as well. If both the page and the suffix are missing, then the title will not be changed.

The page is defined per route within the data object on routes definition: `{path: 'home', component: HomeComponent, data: {title: 'Title'}}` and will be translated. If a route has no page defined, then the suffix will be shown instead.

Both the separator and the suffix can be set on the `ObDocumentMetaService` and will be used on all pages. The suffix will also be translated and typically reflects the application's name.

### Services

#### ObDocumentMetaService

Get, set and add page meta information such as the `content` attribute of `<meta name="description">` and the content of the `<title>` tag.

Properties

Name
Description

`titleSeparator: string = ' &middot; '`
The separator between the dynamic title and static `titleSuffix` in the `title` attribute.

`titleSuffix: string = ''`
The suffix (an i18n key) that will be displayed after the `titleSeparator`.

`description: string = ''`
The description of the current page (an i18n key) that will be displayed in the `title` attribute.

Methods

Name
Description

`setTitle(title: string, separator: string = this.titleSeparator, suffix: string = this.titleSuffix): void`
Updates the `title` attribute.

Parameters

`title: string`
The title to be set for the current HTML document. The default value is ''.

`separator: string = this.titleSeparator`
separates title and suffix. The default value is ' &middot; '

`suffix: string = this.titleSuffix`
A suffix to be set the title of the current HTML document. The default value is ' &middot; '.

Name
Description

`getMetaDescription(): string`
Gets the document page description, i.e. the content of the `meta type="description"` tag.**Since:** 2.0.0

Name
Description

`setDescription(description: string): void`
Updates the document page description, i.e. the content of the `meta type="description"` tag.

Parameters

`description: string`
The description to be set for the current HTML document. The default value is ''.
