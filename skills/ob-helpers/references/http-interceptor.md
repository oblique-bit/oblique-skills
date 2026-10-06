# Http interceptor 

## How to use


A custom http interceptor for Oblique. It displays a spinner on API calls and a notification on errors. It also add the `X-Requested-With` HTTP header to let eIAM know that the request comes from an SPA. This is used in case of an expired session to let eIAM answer with a `401 - Unauthorized Access` error instead of the login page. Unfortunately this header triggers a pre-flight request that is subject to CORS. To avoid this, the `ObHttpApiInterceptor` needs to ignore calls to outside sources such as PAMS. This can be achieved by limiting the interceptor to the back-end calls through the [api.url](https://oblique.bit.admin.ch/helpers/http-interceptor/api#ObHttpApiInterceptor.api.url) property.

### Usage

- Add `{provide: HTTP_INTERCEPTORS, useClass: ObHttpApiInterceptor, multi:
 true},` to the list of providers

Now the interceptor should be running. By default every api call is intercepted.

### Configuration

To configure the interceptor use `ObHttpApiInterceptorConfig` (Usually in the app.module).Example:

constructor( readonly interceptorConfig: ObHttpApiInterceptorConfig) {
 interceptorConfig.api.url = 'www.someurl.com';
}

To subscribe to the events emitted by the interceptor use `ObHttpApiInterceptorEvents`.Example:

constructor( private readonly interceptorEvents: ObHttpApiInterceptorEvents ) {
 this.interceptorEvents.sessionExpired.subscribe(() => {
 this.notificationService.warning('The session has expired');
 });
}

### Services

#### ObHttpApiInterceptorConfig

Should be injected, typically in the AppModule. It configures the `ObHttpApiInterceptor`.

Properties

Name
Description

`api.url: string = ''`
URLs that match fully or partially this property will be treated as API calls and thus affected by this interceptor.

`api.spinner: boolean = true`
Defines if a spinner should be activated whenever an API call starts.

`api.notification.active: boolean = true`
Defines if a notification should be displayed in case of API error response.

`api.notification.severity: ObENotificationType = ObENotificationType.ERROR`
Defines the notification's severity.

`api.notification.title: string = undefined`
Defines the notification's title.

`api.notification.text: string = undefined`
Defines the notification's text.

`api.notification.sticky: boolean = undefined`
Defines whether the notification is sticky.

`timeout: number = 15000`
In milliseconds, the timeout delay to wait before a request will be considered as failed. A notification will be issued to warn the user about request timeout, but the request itself won't be cancelled. If the timeout is zero, null or undefined, no warning will be issued.

#### ObHttpApiInterceptorEvents

Should be injected, in order to subscribe to the events emitted by `ObHttpApiInterceptor`.

Properties

Name
Description

`requestIntercepted:Observable<ObIHttpApiRequest>`
This observable emits events before the request is sent to the server and can be used to tweak the behavior of the interceptor.

`sessionExpired:Observable<void>`
This observable emits when the server respond with a 401 error, which is typically the case with an expired eIAM session.

Methods

Name
Description

`sessionExpire(): void`
Fire an "expire" event.

Name
Description

`requestIntercept(request: ObIHttpApiRequest): void`
Fire a "requested" event.

Parameters

`request: ObIHttpApiRequest`
[ObIHttpApiRequest](helpers/http-interceptor/api#ObIHttpApiRequest)

Name
Description

`deactivateSpinnerOnNextAPICalls(number = 1): void`
No spinner will be activated on the next `number` API calls.

Parameters

`number = 1`
Number of API Calls before deactivation

Name
Description

`deactivateNotificationOnNextAPICalls(number = 1): void`
No notification will be activated on the next `number` API calls.

Parameters

`number = 1`
Number of API Calls before deactivation

Name
Description

`deactivateOnNextAPICalls(number = 1): void`
Neither spinner nor notification will be activated on the next `number` API calls.

Parameters

`number = 1`
Number of API Calls before deactivation

### Interfaces

#### ObIHttpApiRequest

The behavior of the Http interceptor

Properties

Name
Description

`notification: ObIHttpApiRequestNotification`
Notification

`spinner: boolean`
Is spinner active.

#### ObIHttpApiRequestNotification

The notification used in the Http interceptor

Properties

Name
Description

`active: boolean`
Is the notification active.

`severity: ObENotificationType`
The severity of notification.

`title: string`
Title text of the notification.

`text: string`
Message text of the notification.

`sticky: boolean`
Is the notification sticky (does not automatically close).

#### ObIObliqueHttpErrorResponse

The format of the error response

Properties

Name
Description

`error: [HttpErrorResponse](https://angular.dev/api/common/http/HttpErrorResponse)`
A response that represents an error or failure, either from a non-successful HTTP status, an error while executing the request, or some other failure which occurred during the parsing of the response.

`handled: boolean`
Flag indicating that the error has been handled by the interceptor
