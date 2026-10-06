# RxJs operators

## Import

`import {obPauseWhenPageHidden} from '@oblique/oblique';`

## How to use

### Functions

#### obPauseWhenPageHidden

Like any other RxJs operator, it needs to be imported:  and then passed to the `pipe` function: `someObservable$.pipe(obPauseWhenPageHidden())`

`obPauseWhenPageHidden(doc: Document): (source$: Observable<T>) => Observable<T>)`
This is a custom pipeable RxJs operator that relies on the [page visibility API](ttps://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to stop streams when the page is not visible anymore. The stream is then restarted when the page become visible again. This is typically used to step polling when the page isn't even displayed.

Parameters

`doc?: Document`
The Document object, only useful when Server-Side Rendering is used.
