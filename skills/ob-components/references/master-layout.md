# Master-layout

## Import

`import{ObMasterLayoutModule} from '@oblique/oblique';`

## Purpose

The Master layout takes care of the page's structure. It provides:

- A perception of trust and credibility (Swiss Confederation logo, Footer...).

- Orientation and access to content via navigation.

- Functional and visual flexibility via configuration of the sub-components:

Header

- Main Navigation

- Footer

- Controls

## How to use

This component takes care of the page's structure. It contains the header and footer, manages off-canvas and spinner, and displays notifications.

It is fully live configurable and its default values can be tweaked through the `MasterLayoutConfig` injectable. Padding is added per default to the `main-layout` and can be removed with the `layout.hasLayout` variable.

### Header variants

Our design system offers two header variants for desktop screens: 

#### Standard Header (Default)

The Standard Oblique Header features the _federal logo_ &mdash; the _Coat of Arms_ of Switzerland along with the nation's name in four languages &mdash;, in strict accordance with the CD Bund brand guidelines.

#### Small Header

The small header variant offers a compact view, similar to the mobile version. It includes only the _coat of arms_, omitting the nation's name in four languages. It is ideal for pages where users perform tasks that require optimal use of screen space.

While this approach emphasizes content, it also ensures that essential application controls remain easily accessible.

#### Brand Consistency Requirement

The _federal logo_, with both the _Coat of Arms_ and the designation of the Swiss Confederation in four languages, must be used. Either on a login, the main-, start-, or welcome- page before transitioning to pages where space-saving is a key factor.

### Main navigation

The main navigation is generated from the `ObINavigationLink` input. It supports url fragments and query parameters as well as external links. External links will be automatically opened in a new tab, but they can be forced in the current one with the `sameTarget` property.

Main navigation entries can also be enhanced with an icon that will be displayed on the left hand side of the link (the other side being reserved for the dropdown toggle). The label, while mandatory for accessibility reasons, can be hidden through the `iconOnly` property. For consistency reasons, it is advised to either use icons for all entries or none of them.

### Service navigation

Oblique 10.1.0 introduces the `ob-service-navigation` component that replaces the whole right hand area of the header (the part where the language selection and the projected `obHeaderControl` elements are located).

This component intends to replace the Header Widget without the need of a Web Component. The change is currently opt-in and can be activated through the `OB_ACTIVATE_SERVICE_NAVIGATION` injection token.

### Skip links

Skip links are an accessibility feature that allows screen readers and keyboard users to directly access specific parts of the application. Oblique features 2 skip links out of the box and accepts an array of additional ones.

The first skip link is "Skip to main content", which targets the first `H1` in the `main` element or the `main` element itself if there is no `H1`. It is the project's responsibility to ensure an `H1` is present and placed on top of the page.

The second skip link is "Skip to main navigation", which targets the main navigation. This skip link is only present if there is a main navigation.

### Back to top

Oblique features a "Back to Top" button that appears as soon as the main content is scrolled down. Clicking on this button has the same effect as clicking on the first skip link described above.

### Services

#### ObMasterLayoutConfig

This is the default configuration of the master layout. Values can be tweaked by injecting this service into `app.module.ts` to customize the global structure of the application.

Properties

Name
Description

`homePageRoute: string = '/home'`
The home page route. A click on the confederation logos or on the application's title will trigger this route.

`scrollToTopDuration: number = 200`
Duration, in milliseconds, of the scroll to top feature.

`showAccessibilityTitle: boolean = true`

When set to `true`, the accessibility page will display Oblique translation of `i18n.oblique.accessibility-statement.statement.title` in the browser tab, in the current language.

`locale.locales: (string | LocaleObject)[] = ['de-CH', 'fr-CH', 'it-CH']`
A list of supported locales, conforming to the ISO 639-1 standard. An optional country code conforming to the ISO 3166-1 alpha-2 standard can be appended with a hyphen.

`locale.defaultLanguage: string = 'de'`
The default language, used when none is actually chosen or if the chosen one is not valid.

`locale.disabled: boolean = false`
Let Oblique handles locales (false) or completely disables Oblique language management (true). In ths case, the application have to provide a default language as well as a change language mechanism.

`layout.hasCover: boolean = false`
Use regular layout (false) or cover layout (true). The cover layout uses only part of the available width and displays a background image on the unused space.

`layout.hasLayout: boolean = true`
Apply default padding (true) to the `main-layout` or no padding at all (false).

`layout.hasMainNavigation: boolean = true`
Shows (true) or hides (false) Oblique's main navigation.

`layout.hasOffCanvas: boolean = true`
Add an off-canvas on the main content level (true) or removes it. An off-canvas is a collapsible sidebar that partially takes the place of the contend if activated.

`layout.hasMaxWidth: boolean = false`
Limit the width of the `main` element on very big screens.

`header.isSticky: boolean = true`
The header is always shown above the content (true) or hidden when scrolled away (false).

`header.isSmall: boolean = false`
Forces the small variant of the header.

`header.isCustom: boolean = false`
Use Oblique's default header (false) or a custom one (true). The custom header has to be projected with [`[obHeader]`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutComponent.obHeader). Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

`header.serviceNavigation: ObIServiceNavigationConfig =
 { profileLinks: [], infoLinks: [], infoContact:{}, displayLanguages: true, pamsAppId: undefined, infoDescription: undefined, infoHelpText: undefined, infoContactText: undefined, useInfoBackend: false, eportalLanguageSynchronization : false, ``handleLogout: true}`

The default configuration for the service navigation. This property is `readonly` to ensure no option is set to `undefined`.

`navigation.isFullWidth: boolean = false`
Should drop-downs main navigation menus take the full available width or only use the needed space.

`navigation.scrollMode: ObEScrollMode = ObEScrollMode.AUTO`
Controls the main navigation's scroll mode, i.e. how to handle the elements outside of the visible area. They can either be hidden or the navigation bar can be made scrollable to display those elements. If the navigation is dynamic, the [`ObMasterLayoutNavigationService.refresh`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutNavigationService.refresh) function must be called each time the navigation changes.

`navigation.scrollDelta: number = 95`
The size, in pixels, of a scroll increment for a scrollable navigation.

`navigation.activeClass: string = 'active'`
The class that will be automatically added on active links.

`navigation.links: ObINavigationLink[] = []`
The main navigation links. It is an alternative to the [`navigation`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutComponent.navigation) input with a lesser priority.

`footer.isSmall: boolean = false`
Forces the small variant of the footer.

`footer.isCustom: boolean = false`
Use Oblique's default footer (false) or a custom one (true). The custom footer has to be projected with [`[obFooter]`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutComponent.obFooter). Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

`footer.isSticky: boolean = false`
The footer is always shown at the bottom of the content (true) or hidden when scrolled away (false).

#### ObMasterLayoutService

A service to configure the master layout. The changes are live.

Properties

Name
Description

`homePageRouteChange$: Observable`
Emits every time the `homePageRoute` property changes.

`homePageRoute: string`
The route to the home page that is used in the header and footer.

`header: ObMasterLayoutHeaderService`
A reference to the service that configures the header (see [ObMasterLayoutHeaderService](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutHeaderService))

`footer: ObMasterLayoutFooterService`
A reference to the service that configures the footer (see [ObMasterLayoutFooterService](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutFooterService))

`navigation: ObMasterLayoutNavigationService`
A reference to the service that configures the navigation (see [ObMasterLayoutNavigationService](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutNavigationService))

`layout: ObMasterLayoutComponentService`
A reference to the service that configures the master layout (see [ObMasterLayoutComponentService](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutComponentService)

#### ObMasterLayoutComponentService

A service to configure the master layout component. The changes are live.

Properties

Name
Description

`configEvents$: Observable`
Emits every time one of its property is changed

`isMenuOpened: boolean = false`
In collapsed mode, closes the hamburger menu (false) or opens it (true).

`hasCover: boolean = true`
Controls [`ObMasterLayoutConfig.layout.hasCover`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasCover) property.

`hasLayout: boolean = true`
Controls [`ObMasterLayoutConfig.layout.hasLayout`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasLayout) property.

`hasOffCanvas: boolean = false`
Controls [`ObMasterLayoutConfig.layout.hasOffCanvas`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasOffCanvas) property.

`hasMainNavigation: boolean = true`
Controls [`ObMasterLayoutConfig.layout.hasMainNavigation`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasMainNavigation) property.

`hasMaxWidth: boolean = false`
Controls [`ObMasterLayoutConfig.layout.hasMaxWidth`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasMaxWidth) property.

#### ObMasterLayoutHeaderService

A service to configure the master layout header. The changes are live.

Properties

Name
Description

`configEvents$: Observable`
Emits every time one of its property is changed

`loginState$: Observable`
Emits every time the login state changes. Returns undefined if the login state couldn't be fetched from the backend. 

`isCustom: boolean = false`
Controls [`ObMasterLayoutConfig.header.isCustom`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.header.isCustom) property. Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

`isSmall: boolean = false`
Controls [`ObMasterLayoutConfig.header.isSmall`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.header.isSmall) property.

`isSticky: boolean = false`
Controls [`ObMasterLayoutConfig.header.isSticky`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.header.isSticky) property.

`serviceNavigationConfiguration: ObIServiceNavigationConfig`

Controls [`ObMasterLayoutConfig.header.serviceNavigation`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.header.serviceNavigation) property.

#### ObMasterLayoutFooterService

A service to configure the master layout footer. The changes are live.

Properties

Name
Description

`configEvents$: Observable`
Emits every time one of its property is changed

`isSticky: boolean = false`
Controls [`ObMasterLayoutConfig.footer.isSticky`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.footer.isSticky) property.

`isCustom: boolean = false`
Controls [`ObMasterLayoutConfig.footer.isCustom`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.footer.isCustom) property.

#### ObMasterLayoutNavigationService

A service to configure the master layout navigation. The changes are live.

Properties

Name
Description

`configEvents$: Observable`
Emits every time one of its property is changed

`isFullWidth: boolean = false`
Controls [`ObMasterLayoutConfig.navigation.isFullWidth`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.navigation.isFullWidth) property.

`scrollMode: ScrollMode = ScrollMode.AUTO`
Controls [`ObMasterLayoutConfig.navigation.scrollMode`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.navigation.scrollMode) property.

`scrolled: Observable`
Emits when the navigation is scrolled. The payload is the scrolled delta in pixels

`refreshed: Observable`
Emits when the navigation is refreshed.

Methods

Name
Description

`refresh(): void`
When scrolled navigation is enabled, forces to recompute the scroll position. Useful with dynamic navigation entries.

`scrollLeft(offset?: number): void`
When scrolled navigation is enabled, will scroll the navigation to the left by the given amount or default amount if none is given.

`scrollRight(offset?: number): void`
When scrolled navigation is enabled, will scroll the navigation to the right by the given amount or default amount if none is given.

### Components

#### ObMasterLayoutComponent

This component takes care of the structure of the application and should be used in `app.component.html`

Selector
`ob-master-layout`

Exported as
`obMasterLayout`

Properties

Name
Description

` @Input() skipLinks: ObISkipLink[] = []`

A list of links to be used as additional skiplinks in order to improve accessibility. *

*Angular recommends that inputs be immutable, meaning that any changes to this input, should result in the entire array being recreated rather than directly modified. Functions like map or filter as well as the spread operator, inherently provide this behavior, as they return new arrays instead of modifying the original one

` @Input() navigation: ObINavigationLink[] = []`

A list of links to populate the primary navigation. It will override the [`links`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.navigation.links) property.

*Angular recommends that inputs be immutable, meaning that any changes to this input, should result in the entire array being recreated rather than directly modified. Functions like map or filter as well as the spread operator, inherently provide this behavior, as they return new arrays instead of modifying the original one

`@Input() version: string;`
The version of your application, will be displayed in the footer.

`@Input() collapseBreakpoint: ObICollapseBreakpoints`
The breakpoint which triggers the layout to collapse, i.e. display the application in mobile mode. Accepted values are : `xs`, `sm`, `md`, `lg` and `sl`. Default is `md`.

Content projection

Name
Description

`[obHeader]`

Content that will be projected as the main header, i.e. the logo, application title, service navigation and main navigation. The [custom header](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.header.isCustom) option needs to be enabled. Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

`[obHeaderTitle]`
Content that will be projected as the application's title within the main header.

`[obHeaderAction]`
Content that will be projected before the application's logo (only visible in expanded layout).

``
Content that will be projected as the application's logo (an `img` is expected) within the main header. It will replace the default Confederation logo. Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

`[obNavigation]`
Content that will be projected as the main navigation. It will replace the default Oblique navigation if no navigation links are provided. It is an alternative to the [`navigation`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.navigation) input but the whole navigation markup has to be provided, not only the links. Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

``
Templates that will be projected into the controls section of the main header (next to the custom control section). There must be one control per template.

``
Templates that will be projected into the controls section of the main header (next to the locales choice) for mobile layout. There must be one control per template.

`[obFooter]`

Content that will be projected as the main footer, i.e. everything in the colored parts at the bottom of the application.The [custom footer](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.footer.isCustom) option needs to be enabled. Using this option will violate the Corporate Identity which is not allowed for any application deployed on `*.admin.ch`.

`[obFooterInfo]`
Content that will be projected into the right hand side of the footer, typically used for a copyright notice.

``
Templates that will be projected into the links section in the left hand side of the main footer. There must be one link per template.

`[obOffCanvasTitle]`
Content that will be projected as the title of the main off-canvas if off canvas is enabled (see [`hasOffCanvas`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasOffCanvas)).

`[obOffCanvasContent]`
Content that will be projected as the content of the main off-canvas if off canvas is enabled (see [`hasOffCanvas`](https://oblique.bit.admin.ch/components/master-layout/api#ObMasterLayoutConfig.layout.hasOffCanvas)).

### Interfaces

#### ObINavigationLink

The structure of a link in navigation area. A label or an icon or both have to be defined

Properties

Name
Description

`label: string`
Label to show in the link. If no label should be displayed, it will serve as tooltip and accessible text.

`url?: string`
Url to navigate when clicking the link. If no url is given, the navigation will simply open the next level.

`fragment?: string`
Optional fragment to add to the URL

`queryParams?:{ [key: string]: string}`
Optional query parameters to add to the URL

`children?: ObINavigationLink[]`
Child links under the current link

`sameTarget?: boolean = false`
Optional setting to open external links in the same window

`isExternal?: boolean;`
This is an internal property that will be overridden by the master layout. You should never assign it directly.

`id?: string`
Id of the link.
If no id is provided, then ${label}-${url} is used. And if no label is provided either, then the url is used.

`routerLinkActiveOptions?: IsActiveMatchOptions =
 { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored'}`
Sets angular path-matching strategy to mark link as the active one.

`icon?: ObEIcon | string`
An icon to be displayed before the link's label. If no label is wished, the `iconOnly` option has to be activated

`iconOnly?: boolean = false`
When false, the label will be displayed normally. When true, the label will hidden while still accessible from a screen reader and placed in a tooltip.

`startOfRightSideLinks?: boolean = false`
Moves the targeted menu element, as well as the following elements, to the right side of the master layout navigation

#### ObISkipLink

The structure of a custom skiplink

Properties

Name
Description

`label: string`
An i18n key that will be translated and used as label for this skiplink

`url: string`
Url to navigate when clicking the link. When typed 'current', the link points to the current Route.

`fragment?: string`
The fragment that will be added to the URL. It should correspond to a DOM element id.

#### ObIPamsConfiguration

The PAMS configuration to allow the connection with PAMS services

Properties

Name
Description

`environment: ObEPamsEnvironment`
The PAMS environment that will be used to build the root URL for the PAMS and ePortal links.

`rootUrl?: string`
An alternate root URL for the PAMS and ePortal links. This take precedence over the root URL inferred from the environment.

#### ObIServiceNavigationConfig

The structure of the service navigation configuration

Properties

Name
Description

`profileLinks?: ObIServiceNavigationLink[]`
A list of links to be displayed in the profile widget. Each link label and url are localized.

`infoDescription?: string`
Description at the start of the info panel

`infoHelpText?: string`
Description text between the help header and the help links

`infoLinks?: ObIServiceNavigationLink[]`
A list of links to be displayed in the info widget. Each link label and url are localized.

`infoContactText?: string`
Description text between the contact header and the contact links

`infoContact?: ObIServiceNavigationContact`
An object with a contact phone, email and contact form URL.

`returnUrl?: string`
The url that will be called once the login process is complete. If not provided, the current URL will be used

`pamsAppId?: string`
The app id in which the service-navigation is used. It allows PAMS to know which login level is required. The service navigation will throw an error if the id is not provided.

`displayApplications?: boolean = false`
Indicates if the applications widget should be displayed.

`displayAuthentication?: boolean = false`
Indicates if the authentication widget should be displayed.

`displayInfo?: boolean = false`
Indicates if the info widget should be displayed.

`displayLanguages?: boolean = true`
Indicates if the language selection widget should be displayed.

`displayMessage?: boolean = false`
Indicates if the message widget should be displayed.

`displayProfile?: boolean = false`
Indicates if the profile widget should be displayed.

`eportalLanguageSynchronization?: boolean = false`
Synchronize language with ePortal/PAMS. Your frontend language will match with the one displayed on ePortal.

`useInfoBackend?: boolean = false`

Determines if the info widget should use eportal backend to fill the informations of links, email, telephone, contact form and other descriptions. If true we use eportal backend. If false we use standard fields: `infoDescription, infoContactText, infoHelpText, infoLinks, infoContact`.
You can find more details [here](https://oblique.bit.admin.ch/guidelines/service-navigation#:~:text=Info%20panel%20use%20backend).

`handleLogout?: boolean = true`
Determines if the logout should be handled in the service-navigation or not. If set to false, then the application must perform the logout itself. To do this, the logoutURL passed by the `logoutTriggered` output must be used.

#### ObIMasterLayoutEvent

The event emitted by the master layout

Properties

Name
Description

`name: ObEMasterLayoutEventValues`

The name of the event**Values: **

`ObEMasterLayoutEventValues.FOOTER_IS_CUSTOM`, `ObEMasterLayoutEventValues.FOOTER_IS_STICKY`, `ObEMasterLayoutEventValues.HEADER_IS_CUSTOM`, `ObEMasterLayoutEventValues.HEADER_IS_SMALL,`, `ObEMasterLayoutEventValues.HEADER_IS_STICKY`, `ObEMasterLayoutEventValues.IS_MENU_OPENED`, `ObEMasterLayoutEventValues.LAYOUT_HAS_COVER`, `ObEMasterLayoutEventValues.LAYOUT_HAS_DEFAULT_LAYOUT`, `ObEMasterLayoutEventValues.LAYOUT_HAS_MAIN_NAVIGATION`, `ObEMasterLayoutEventValues.LAYOUT_HAS_MAX_WIDTH`, `ObEMasterLayoutEventValues.LAYOUT_HAS_OFF_CANVAS`, `ObEMasterLayoutEventValues.NAVIGATION_IS_FULL_WIDTH`, `ObEMasterLayoutEventValues.NAVIGATION_SCROLL_MODE`, `ObEMasterLayoutEventValues.SERVICE_NAVIGATION_CONFIGURATION`

`value?: boolean`
Event value

`mode?: ObEScrollMode`
Scroll mode of the event**Values: ** `ObEScrollMode.AUTO`, `ObEScrollMode.ENABLED`, `ObEScrollMode.DISABLED`

`config?: ObIServiceNavigationConfig`
Service navigation configuration of the event

### Constants

#### Injection tokens

Name
Description

`OB_HIDE_EXTERNAL_LINKS_IN_MAIN_NAVIGATION: boolean`
Indicates if the a11y icon should be hidden in the main navigation.

`OB_PAMS_CONFIGURATION: ObIPamsConfiguration`
Provides the mandatory PAMS environment as well as an optional root url.

## Additional info

## Header variants

Our design system offers two header variants for desktop screens: 

### Standard Header (Default)

The Standard Oblique Header features the _federal logo_ &mdash; the _Coat of Arms_ of Switzerland along with the nation's name in four languages &mdash;, in strict accordance with the CD Bund brand guidelines.

### Small Header

The small header variant offers a compact view, similar to the mobile version. It includes only the _coat of arms_, omitting the nation's name in four languages. It is ideal for pages where users perform tasks that require optimal use of screen space.

While this approach emphasizes content, it also ensures that essential application controls remain easily accessible.

### Brand Consistency Requirement

The _federal logo_, with both the _Coat of Arms_ and the designation of the Swiss Confederation in four languages, must be used. Either on a login, the main-, start-, or welcome- page before transitioning to pages where space-saving is a key factor.

### Namings and terms

#### The federal logo

The logo of the Swiss Confederation is called the federal logo.

It consists the Swiss coat of arms and the name in four languages &laquo;Schweizerische Eidgenossenschaft, Conf&eacute;d&eacute;ration suisse, Confederazione Svizzera, Confederaziun svizra&raquo;.

#### Coat of arms

The Swiss coat of arms is an integral part of the federal logo.

Deriving the coat of arms
The Swiss coat of arms is an integral part of the federal logo. Its form and usage are outlined in the CD-Bund manual and must not be altered in any way as described in CD-Bund manual!

#### Customization and use of federal logo in applications

The _federal logo_, featuring the C_oat of Arms_ and the Swiss Confederation designation in four languages, must remain unchanged as outlined in the CD-Bund manual! It must be used on main-, start-, welcome- or login pages.

For application subpages, the narrow-height header can be used. Subpages without any brand logos are not permitted.

The use of the _Coat of Arms_ on subpages is governed by the CD-Bund manual. On document subpages, the Coat of Arms may be used standalone.

#### Extract of CD-Bund manual:

The coat of arms and the four-language designation form a single unit. Use is only permitted in the form explained in this manual. The only exception is the use of the Swiss coat of arms as a national emblem at border crossings and on the signs of Swiss embassies abroad, as well as the use of the coat of arms on the following pages in business correspondence.

## Usage

Master Layout provides a structural foundation for all pages. The component can be configured according to use case.

Here are some details about configuration options:

### Layout

Option
Effect

Default
Adds padding around the main content area

Cover
Adds a background image and shrinks the main content area

Maximum width
Sets a fixed width of the main content area

Main navigation
displays the main navigation

Off-canvas
Enables Off-Canvas component

### Header

Option
Effect

Sticky
Header remains fixed at the top

Small
Makes the word-mark disappear

Custom
Enables a custom header

Reduce on scroll
Reduces the logo while scrolling

### Navigation

Option
Effect

Full width
Makes the navigation full width

Scroll mode
Enables/disables horizontal scroll

### Footer

Option
Effect

Sticky
Makes the footer sticky

Custom
Enables a custom footer

Logo on scroll
Logo appears on scroll

### Controls

Option
Effect

Toggle off-canvas
Controls off-canvas display

Toggle external links
Controls display of external links in the navigation

Main navigation items display
Defines the elements of the navigation item:

- Label only

- Label & icon

- Icon only
