# Authentication

## How to use


`import {ObAuthenticationModule} from '@oblique/oblique';`

Provides helper services that wraps the functionality of the `angular-oauth2-oidc` library. For more information about `angular-oauth2-oidc` see [https://github.com/manfredsteyer/angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc).

### Usage

- Import the `ObAuthenticationModule` with the `forRoot` method in the application's root module.

- Use the `ObAuthenticationConfigService` to configure the `angular-oauth2-oidc` library. It's recommended to perform the configuration in the application's root module.

- Use the `ObAuthenticationService` to perform login, logout or get identity informations.

### Configuration

`OAuthModuleConfig` and `ValidationHandler` should be passed as parameters of the `forRoot` method of the `ObAuthenticationModule`.

@NgModule({
 ...
 imports: [
 ...
 ObAuthenticationModule.forRoot({
 resourceServer: {
 allowedUrls: ['https://oblique.bit.admin.ch/training'],
 sendAccessToken: true
 },
 CustomValidationHandlerClass // Placeholder for the effective class
 })
 ],
 ...
})
 
For more information about the `OAuthModuleConfig` or the `ValidationHandler` see:

- [OAuthModuleConfig](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/OAuthModuleConfig.html#info)

- [ValidationHandler](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/ValidationHandler.html)

You can configure the OpenID Connect flow, the use of a discovery document or the automatic silent refresh of the token with the `ObAuthenticationConfigService`. It's recommended to perform the configuration in the application's root module.

export class AppModule {
 constructor(readonly authConfigService: ObAuthenticationConfigService) {
 authConfigService.useDiscoveryDocument = true;

 authConfigService.setupAutomaticSilentRefresh = true;

 authConfigService.configureFlow({
 issuer: 'https://idsvr4.azurewebsites.net', // Url of the Identity Provider
 redirectUri: window.location.origin + '/index.html', // URL of the SPA to redirect the user to after login
 clientId: 'spa', // The SPA's id. The SPA is registerd with this id at the auth-server
 responseType: 'code',
 scope: 'openid profile email offline_access', // set the scope for the permissions the client should request
 });
 }
}

The `ObAuthenticationConfigService` uses the `AuthConfig` of the `angular-oauth2-oidc` library in order to configure the library. For more information about the properties of the `AuthConfig` see its [documentation](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/AuthConfig.html#info).

### Extended usage

You can directly access the `OAuthService` of the `angular-oauth2-oidc` library through the `ObAuthenticationService`. This allows you to use functionalities of the `OAuthService` that are not wrapped by the `ObAuthenticationService`.

### Services

#### ObAuthenticationService

Wrapper service to interact with the `OAuthService` of the `angular-oauth2-oidc` library.

Properties

Name
Description

`oAuthService`
Provides direct access to the `OAuthService` of the `angular-oauth2-oidc` library. It can be useful for methods that are not wrapped by Oblique.

Methods

Name
Description

`getAllResourceAccessRoles(): ObIResourceAccessRoles[]`

Returns the user's roles as defined in its jwt by the key "resource_access".

Deprecated since Oblique 13. Please use an API endpoint to get the user roles (or any data stored in the token), see [https://www.rfc-editor.org/rfc/rfc9068.html#name-privacy-considerations](https://www.rfc-editor.org/rfc/rfc9068.html#name-privacy-considerations) for more details.

Return value

`ObIResourceAccessRoles[]`
Array of ObIResourceAccessRoles

Name
Description

`getIdentityClaims(): object`

Returns the received claims about the user.

Deprecated since Oblique 13. Please use an API endpoint to get the user roles (or any data stored in the token), see [https://www.rfc-editor.org/rfc/rfc9068.html#name-privacy-considerations](https://www.rfc-editor.org/rfc/rfc9068.html#name-privacy-considerations) for more details.

Return value

`object`
the received claims about the user. As in : [OAuthService -getIdentityClaims()](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/injectables/OAuthService.html#getIdentityClaims)

Name
Description

`performLogin(additionalState?: string,params?: any): void`
Removes all tokens and logs the user out. If a logout url is configured, the user is redirected to it with an optional state parameter.

Parameters

`additionalState?: string`
[OAuthService.html - getIdentityClaims()](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/injectables/OAuthService.html#getIdentityClaims)

`params?: any`
[OAuthService.html - getIdentityClaims()](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/injectables/OAuthService.html#getIdentityClaims)

Name
Description

`performLogout(): void`
Removes all tokens and logs the user out. If a logout url is configured, the user is redirected to it with an optional state parameter.

#### ObAuthenticationConfigService

Wrapper service to configure the `angular-oauth2-oidc` library.

Properties

Name
Description

`oAuthService`
Provides direct access to the `OAuthService` of the `angular-oauth2-oidc` library. It can be useful for methods that are not wrapped by Oblique.

Methods

Name
Description

`configureFlow(authFlowConfig: AuthConfig, tokenValidationHandler?: ValidationHandler): Observable<boolean>`
Helper method to configure the OAuthService of the angular-oauth2-oidc library.

Parameters

`authFlowConfig: AuthConfig`
[manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/AuthConfig.html#source](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/AuthConfig.html#source)

`tokenValidationHandler?: ValidationHandler`
[manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/ValidationHandler.html#source](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/ValidationHandler.html#source)

Return value

`Observable<boolean>`
