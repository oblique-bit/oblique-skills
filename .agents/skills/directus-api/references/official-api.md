# Directus API Operations Reference

Sources reviewed: 2026-09-29.

## Primary Sources

- [Directus API reference](https://directus.com/docs/api)
- [Authentication: access tokens, cookies, sessions](https://directus.com/docs/guides/auth/tokens-cookies)
- [Email login, refresh, logout](https://directus.com/docs/guides/auth/email-login)
- [Two-factor authentication](https://directus.com/docs/guides/auth/2fa)
- [Items endpoints](https://directus.com/docs/api/items)
- [Files endpoints](https://directus.com/docs/api/files)
- [Assets endpoints](https://directus.com/docs/api/assets)
- [Query parameters](https://directus.com/docs/guides/connect/query-parameters)
- [Filter rules](https://directus.com/docs/guides/connect/filter-rules)

## Confirmed API Behavior

- The API is dynamic: REST endpoints (`/items/{collection}`, `/files`, `/users`, ...) are generated from the connected database's schema, so input/output differs per installation. Confirm collection and field names against the project before writing.
- Authentication uses an access token passed as a bearer token: `Authorization: Bearer <token>`. Tokens are scoped to users and carry the user's permissions.
- This project's account has 2FA, so static tokens are unavailable; access tokens are minted per session from a stored refresh token (see the `directus-auth` skill).
- POST/PATCH requests should send `Content-Type: application/json` (multipart for file uploads).
- Error responses use `{"errors": [{"message": "...", "extensions": {"code": "..."}}]}`. Check `extensions.code` for the error class (`INVALID_CREDENTIALS`, `FORBIDDEN`, `INVALID_QUERY`, `RECORD_NOT_FOUND`, ...).
- Status codes: `200` OK (reads, creates, updates), `204` No Content (deletes, logout), `400` invalid query/payload, `401` missing/invalid/expired token, `403` permission denied, `404` unknown record, `429` rate limited.
- Token TTLs are Cloud-managed: access tokens are short-lived (~15 min by default), refresh tokens long-lived (~7 days by default). Confirm empirically at setup.

## Authentication Endpoints

- `POST /auth/login` with `{"email": "...", "password": "...", "mode": "json", "otp": "123456"}` — `otp` required when 2FA is enabled. Returns `{"data": {"access_token", "expires", "refresh_token"}}` (`expires` in ms).
- `POST /auth/refresh` with `{"refresh_token": "...", "mode": "json"}` — returns a NEW `access_token` AND a NEW `refresh_token` (rotation). The un-rotated refresh token becomes invalid.
- `POST /auth/logout` with `{"refresh_token": "...", "mode": "json"}` — `204`; invalidates the refresh token. Never call this in the normal flow: it destroys the stored credential.
- `GET /users/me` returns the authenticated user — the identity-verification endpoint.
- 2FA is TOTP-based: `POST /users/me/tfa/generate` (with password) returns the `secret`; `POST /users/me/tfa/enable` activates it. The OTP is required at login only, never at refresh.

## Files

- File metadata lives in the `directus_files` system collection; contents live in the storage adapter.
- `GET /files` lists metadata; query params `fields`, `limit`, `offset`, `sort`, `filter`, `search`, `meta`. Response wraps items in `data` (array) plus `meta`.
- `GET /files/{id}` returns one file's metadata (`id` is a UUID; fields include `filename_disk`, `filename_download`, `title`, `type`, `filesize`, `width`, `height`, `uploaded_on`, `folder`, `tags`).
- `POST /files` uploads as `multipart/form-data` with the form field `file` (repeat the field for multiple files, adding metadata fields alongside). Success is `200` with the new file's metadata object.
- `POST /files/import` with `{"url": "...", "data": {...}}` imports a file from the web — `200` with the metadata object.
- `PATCH /files/{id}` updates metadata and/or replaces contents (JSON body, or multipart with `file`) — `200` with the updated object.
- `DELETE /files/{id}` — `204`; deletes the metadata AND the file from disk. `DELETE /files` with an array of primary keys deletes multiple.
- TUS resumable uploads (`POST /files/tus`, chunked `PATCH /files/tus/{id}`) exist but require `TUS_ENABLED=true`; use plain uploads unless the project enables TUS.

## Assets

- `GET /assets/{id}` streams the file contents (binary). Add `?download=true` for a `Content-Disposition: attachment` response.
- Image transformations: `?key={preset}` (a configured asset size) or `?transforms=[["resize", {"width": 200}]]` (a JSON array of sharp transforms). Transformations apply to image-typed files only.
- `POST /assets/files` with `{"ids": [...]}` downloads multiple files as a ZIP; `POST /assets/folder/{id}` downloads a folder's contents as a ZIP.

## Items

- `GET /items/{collection}` lists items; `GET /items/{collection}/{id}` retrieves one. Response wraps items in `data`.
- `POST /items/{collection}` creates: a plain object for one item, an array for many — `200` with the created object(s).
- `PATCH /items/{collection}/{id}` updates one item; `PATCH /items/{collection}` updates many (body: `{"keys": [...], "data": {...}}` or `{"query": {...}, "data": {...}}`) — `200`.
- `DELETE /items/{collection}/{id}` deletes one; `DELETE /items/{collection}` with `{"keys": [...]}` or `{"query": {...}}` deletes many — `204`.
- Singletons: `GET /items/{collection}` returns a plain object (not an array); `PATCH /items/{collection}` takes a plain object body.
- System collections follow the same pattern (`/users`, `/files`, `/folders`, `/roles`, ...).
- Permissions are per-endpoint, not per-collection: the public role may read `/files` while `/items/directus_files` (the same metadata via the items endpoint) returns `403 FORBIDDEN`. When a read is forbidden, try the resource's dedicated endpoint before concluding the data is private.

## Query Parameters

- `fields`: comma-separated list; dot notation for relations (`author.name`), wildcards (`*`, `*.*`) for depth. Request specific fields in production — wildcards bloat responses.
- `filter`: JSON rules `{"field": {"_eq": "value"}}`. Operators: `_eq`, `_neq`, `_lt`, `_lte`, `_gt`, `_gte`, `_in`, `_nin`, `_null`, `_nnull`, `_contains`, `_icontains`, `_starts_with`, `_ends_with`, `_between`, `_empty`, `_nempty`, `_regex`, `_some`, `_none`, `_json`.
- Logical operators `_and`/`_or` hold arrays of rules and nest inside each other, not inside other filter rules.
- Relational filters nest field names: `{"author": {"name": {"_eq": "..."}}}`. On Many-to-Many, the filter applies to the junction table (`{"authors": {"authors_id": {"name": {"_eq": "..."}}}}`).
- Dynamic variables: `$CURRENT_USER`, `$CURRENT_ROLE`, `$NOW`, `$NOW(-1 year)`.
- `search`: text search across string fields of the collection (not related fields); less optimized than `filter`.
- `sort`: CSV of fields, `-` prefix for descending, dot notation for related fields.
- `limit`: default `100`, `-1` returns all (server caps via `QUERY_LIMIT_MAX`). `offset` skips; `page` is an alternative (first page is `1`).
- `deep`: applies query params to nested relational data with underscore-prefixed names (`{"related": {"_limit": 3, "_sort": "-rating"}}`).
- `alias`: renames fields for one request (`{"dutch": "translations"}`); cannot contain dots or apply to relational fields.
- `aggregate`/`groupBy`: `?aggregate[count]=*`, `?aggregate[sum]=views&groupBy[year]=date`; functions like `year(field)`, `month(field)`, `count(field)` work in any field position.
- `export`: `?export=csv|json|xml|yaml` saves the response in that format.
- `meta`: `*` returns all metadata (total count, filter) on list endpoints.
