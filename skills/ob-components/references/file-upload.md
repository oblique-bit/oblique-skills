# FileUpload and DropZone

## Import

`import {ObFileUploadModule} from '@oblique/oblique';`

## Purpose

The FileUpload component allows users to select one or more files (images, documents, etc.) to upload to a server.

## Usage rules

General:
- Place the file upload section where it contextually fits within the flow of the form.
- Communicate the purpose of the upload.
- Set the maximum size and supported file type. Consider the balance between user needs, the nature of the content, server limitations, and security concerns. For example, the maximum file size for a CV should be at most 5 MB, and the file type should be PDF only.

## How to use

### Angular 22 and fetch
Angular 22 uses fetch instead of XHR for HTTP requests by default. Since the fetch API does not support progress events, this breaks the progress component of the file upload feature. To avoid this, use `withXhr()` in your`provideHttpClient()` to fix it.

### How to use
This customizable feature is build iteratively to allow for a wide range of use cases. This means that some parts of this feature can be replaced by custom code according to one's needs. With the file-upload feature you can:

- chose the files to be uploaded;

- validate the chosen files;

- upload the validated files to a server;

- display information about the uploaded files in a table;

- select rows in the information table;

- delete files from a server.

First, the `ob-drop-zone` component provides a drop zone where files can be dragged and dropped onto. This zone also reacts on mouse click and enter key (while the focus is on the component) for improved accessibility. Files provided to this component will be validated and the `uploadEvent` output will emit an event with the list of chosen files that do match all the file restrictions in place. An error notification will show filtered out files.

Then, to actually perform the upload, the `ob-file-upload` component should be used instead. It wraps the `ob-drop-zone` component providing the exact same file choice and validation capabilities. The validated files will be automatically uploaded to the `uploadUrl` POST url if provided. The `singleRequest` option controls the number of actual HTTP requests. When enabled, all files will be grouped together in a single request. Otherwise, each file will be sent through its own request.

Finally, the uploaded files can be visualised with the help of the independent `ob-file-info` component. It will fetch files from the server by calling the `getUploadedFilesUrl` GET url. This call expects a list of objects with, at least, a `name` property, but additional ones are accepted. The component then displays a simple table with one row per file and one column per field in the response. The hit list can be tweaked with the `mapFunction` that will be called in rxjs's `map` operator. Two additional columns are available to select and delete files. Files deletion is only available if a `deleteUrl` is provided and happens through a DELETE request to that url. File names are passed directly in the url as a base64 encoded list of strings. If more control is needed, then a custom file list should be built.

Each of these components exposes a `uploadEvent` output that informs about its actual status. It emits `ObIUploadEvent` events that contain two properties: `type` and `files`. Each event type is described below:

Description of upload events

- `ObEUploadEventType.CHOSEN` is emitted by both the `ob-drop-zone` and the `ob-file-upload` components when files have been chosen and validated. Its `files` property contains an array of `File`s that are valid according to the configured restrictions.

- `ObEUploadEventType.UPLOADED` is emitted by the `ob-file-upload` component when the upload process is complete. I.e. all chosen files are either uploaded, canceled or couldn't be uploaded due to an HTTP error. Its `files` property contains an array of `File`s that have actually been uploaded to the server.

- `ObEUploadEventType.ERRORED` is emitted by the `ob-drop-zone`, the `ob-file-upload` and the `ob-file-info` components when files are invalid (did not match one of the restrictions) or couldn't be processed due to an HTTP error. Its `files` property contains either an array of `File`s or an array of the name of the files. An additional `error` property provide the actual HTTP error.

- `ObEUploadEventType.CANCELED` is emitted by the `ob-file-info` component when the upload of one or more files is canceled. Its `files` property contains an array of the name of the files whose upload have been canceled.

- `ObEUploadEventType.DELETED` is emitted by the `ob-file-info` component when one or more uploaded files are deleted. The event is emitted after the DELETE request has returned. Its `files` property contains an array of the name of the files that have been deleted.

- `ObEUploadEventType.SELECTED` is emitted by the `ob-file-info` component when its file selection has changed. Its `files` property contains an array of the name of the files that are currently selected.

### Services

#### ObFileUploadService
The service that handles file management.

PropertiesName

Description

`uploadComplete$: Observable`

An observable that emits when an upload is completed.

MethodsName

Description

`delete(deleteUrl: string, files: string[]): Observable`

Sends a DELETE HTTP request with a serialized array of file names.

Parameters

`deleteUrl: string`

The endpoint URL

`files: string[]`

Array of filenames

Name

Description

`getUploadedFiles(getUploadedFilesUrl: string): Observable`

Loads a list of files with a GET HTTP request. The result is expected to be a list of objects with at least a name property.

Parameters

`getUploadedFilesUrl: string`

The endpoint URL

Name

Description

`multiUpload(uploadUrl: string, files: File[]): Observable>`

Uploads multiple files with one HTTP POST request. Event type `User` denotes an error.

Parameters

`uploadUrl: string`

The endpoint URL

`files: File[]`

The files to upload[MDN - Web APIs - File](https://developer.mozilla.org/en-US/docs/Web/API/File)

Name

Description

`notifyUploadComplete(): void`

Emits the `uploadComplete` event.

Output

Emits `uploadComplete` event.

Name

Description

`upload(uploadUrl: string, file: File): Observable>`

Uploads one file with one HTTP POST request. Event type `User` denotes an error.

Parameters

`uploadUrl: string`

The endpoint URL

file: File

The file to upload: [MDN - Web APIs - File](https://developer.mozilla.org/en-US/docs/Web/API/File)

### Components

#### ObFileUploadComponent
The component can simple be embedded in a template

Selector

`ob-file-upload`

Exported as

`obFileUpload`

PropertiesName

Description

`accept: InputSignal(['*'])`

The allowed file extensions and/or mime types. Non matching files will be filtered out.

`maxFileSize: InputSignal(5)`

Maximum file size in Mb.

`maxFileAmount: InputSignal(0)`

Maximum amount of files to upload at a time. If exceeded, all files will be filtered out. If 0, no limit.

`multiple: InputSignal(true)`

Whether or not the component can upload multiple files. If disabled, subsequent files will be filtered out.

`singleRequest: InputSignal(true)`

Whether to upload all files through a single HTTP request or to use one per file. There will be one progressbar per HTTP request.

`uploadUrl: InputSignal()`

The POST API endpoint that will be called with the files attached. If not provided, no file will be uploaded.

`cancelConfirmation: InputSignal(true)`

Whether or not to prompt the user with a confirmation when trying to cancel an upload.

`uploadEvent: OutputEmitterRef()`

Emits when files are chosen, uploaded, canceled or errored.

MethodsName

Description

`processEvent(event: ObIUploadEvent): void`

Notifies the component of an upload event. It triggers the `uploadEvent` event emitter with the received event. Events of type `ObIUploadEvent.UPLOADED` also reset the component.

Parameters

`event: ObIUploadEvent`

[ObIUploadEvent](components/file-upload/api#ObIUploadEvent)

#### ObDropZoneComponent
The `ObDropZoneComponent`, which is part of the `ObFileUploadComponent`, can be used to select files from the file system, either by dragging and dropping them onto the zone or by clicking on it. As with the `ObFileUploadComponent`, the files will be validated against the given inputs and the invalid ones will be filtered out. Unlike the `ObFileUploadComponent`, the `ObDropZoneComponent` will not upload anything. The `ObDropZoneComponent` is an alternative to the `ObFileUploadComponent`

Selector

`ob-drop-zone`

Exported as

`obDropZone`

PropertiesName

Description

`accept: InputSignal(['*'])`

The allowed file extensions and/or mime types. Non matching files will be filtered out.

`maxFileSize: InputSignal(5)`

Maximum file size in Mb.

`maxFileAmount: InputSignal(0)`

Maximum amount of files to upload at a time. If exceeded, all files will be filtered out. If 0, no limit.

`multiple: InputSignal(true)`

Whether or not the component can upload multiple files. If disabled, subsequent files will be filtered out.

`cancelConfirmation: InputSignal(true)`

Whether or not to prompt the user with a confirmation when trying to cancel an upload.

`uploadEvent: OutputEmitterRef`

Emits when files are chosen or errored.

MethodsName

Description

`addFiles(fileList: FileList): void`

Can be used to programmatically upload files. It will trigger the `uploadEvent` event emitter.

Parameters

`fileList: FileList`

A list of files to validate: [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)

#### ObFileInfoComponent
This component can simply be embedded in a template to show a list of uploaded files. It can be used independently of either `ob-file-upload` or `ob-drop-zone`.

Selector

`ob-file-info`

Exported as

`obFileInfo`

PropertiesName

Description

`deleteUrl: InputSignal()`

The DELETE API endpoint that will be called with a serialized list of file names.

`getUploadedFilesUrl: InputSignal()`

The GET API endpoint that will be called to get the already uploaded files. Files are expected as an array of objects containing at least a `name` property.

`mapFunction: InputSignal ObIFileDescription[]>(files => files)`

A rxjs `map` function that will be applied to the list of already uploaded files.

`mapFilesToDeleteUrlFunction: InputSignal string>(files => btoa(JSON.stringify(files.map(file => file.name)))`

This function generates a string that identifies the files to be deleted, which will be appended to the delete URL.

`uploadEvent: OutputEmitterRef`

Emits when files are selected or deleted.

MethodsName

Description

`delete(files: ObIFileDescription[]): void`

Sends a DELETE HTTP request to the deleteUrl with the serialized file names appended. If the request is successful, the items are removed from the table.

Parameters

`files: ObIFileDescription[]`

array of [ObIFileDescription](components/file-upload/api#ObIFileDescription)

Name

Description

`selectOrUnselectAllItems(): void`

Unselects all items if all are currently selected. Selects all of them otherwise.

Name

Description

`toggle(row: ObIFileDescription): void`

Toggles the given item selection.

Parameters

`row: ObIFileDescription`

[ObIFileDescription](components/file-upload/api#ObIFileDescription)

### Interfaces

#### ObIFileDescription
This interface describes the files that are loaded from the server.

Name

Description

`name: string`

The name of the file. It serves as an identifier.

`Record`

Any other option that the server provides.

#### ObIUploadEvent
This interface describes the events that are emitted to inform about the upload feature status.

PropertiesName

Description

`files: File[] | string[]`

The list of `File`s or file names concerned by the event's type.

`type: ObEUploadEventType`

The event's type.

`error: HttpErrorResponse`

The HTTP error if any.
