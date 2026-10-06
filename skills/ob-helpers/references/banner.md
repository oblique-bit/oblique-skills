# Banner

## Purpose

The helper Banner is a visual marker on the logo, indicating the operational state of the application, like Test, Development, etc. It ensures users, especially developers and testers, know which version they interact with, reducing potential errors.

## How to use


`import ObBannerModule from '@oblique/oblique';`

It can be embedded into any Oblique project that uses the `ObMasterLayoutComponent`. It can not be used without `ObMasterLayoutComponent`. As Oblique cannot infer the environment during runtime, you have to specify it into the `environment.ts` files:

banner: 'LOCAL'
Or if more control is needed:

banner: {
 text: 'LOCAL', // the text that will be displayed
 color: '#fff', // optional, the text's color
 bgColor: #000' // optional, the banner's background color
}

This value then needs to be passed to the [`banner`](helpers/provide-oblique-configuration-14/api#ObIObliqueConfiguration.banner) property of `provideObliqueConfiguration`.

Oblique provides default values for `color` and `background-color` for the usual environments, identified by the `text` property. Please note that there is no sample for `PROD` as the banner is not meant to be displayed in a production environment. This means that `PROD` environment will be processed as a custom banner. Below is a list of Oblique's default banners text and color:

Text
Text color
Background color

LOCAL

`$ob-white`
`var(--ob-env-local)`

DEV

`$ob-default`
`var(--ob-env-dev)`

REF

`$ob-default`
`var(--ob-env-ref)`

TEST

`$ob-white`
`var(--ob-env-test)`

ABN

`$ob-white`
`var(--ob-env-abn)`

### Constants

Injection tokens

Name
Description

`OB_BANNER: ObTBanner` Deprecated since Oblique 16.0.0. To be removed in Oblique 17.0.0. Use provideObliqueConfiguration instead.
Recommended to provide the value for this token in the app.module. By default the Banner is hidden.

### Types

 

Name
Description

`ObTBanner = string | ObIBanner | undefined; `
Type for the OB_BANNER injection Token

#### ObIBanner

The default banner configuration

Properties

Name
Description

`text?: string`
The default value for the `text` attribute.

`color?: string`
The default value for the `color` attribute.

`bgColor?: string`
The default value for the `bgColor` attribute.
