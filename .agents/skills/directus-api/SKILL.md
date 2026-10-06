---
name: directus-api
description: 'Technical foundation for using the Directus Cloud REST API, including authentication, files, assets, items, query parameters, pagination, filters, errors, and response verification.'
---

# Directus API Foundation

Use this skill for the Directus Cloud project at `https://oblique.directus.app`.

Read the [Directus API operations reference](./references/official-api.md) before making API calls.

## Authentication

- Token gate: before every API call, read the access token and `expires_at` from `~/.agent-credentials/directus-session.json`; when the file is missing or the expiry has passed, run the `directus-auth` skill's mint step (its login step when the refresh token is missing or rejected) and read the file again.
- The account uses 2FA, so there is no static token; access tokens last ~15 min, which is why the gate runs per call.
- Directus is hosted externally, so requests go through the corporate proxy: set `NODE_USE_ENV_PROXY=1` for your own fetch calls (see the directus-auth skill's Corporate Proxy section for the mechanism).
- Keep the token out of files, prompts, commits, URLs, shell scripts, command output, and the final response.
- Send it as `Authorization: Bearer <access token>` on every request.

## Endpoints

- Use `GET /users/me` to confirm the token identifies the expected user.
- Use `GET /files` to list file metadata and `GET /files/{id}` for one file; metadata lives in the `directus_files` system collection.
- Use `GET /assets/{id}` to download a file's contents; add `?download=true` to force a download, and `?key=` or `?transforms=` for image transformations.
- Use `POST /files` (multipart, form field `file`) to upload and `POST /files/import` with `{"url": "..."}` to import from the web.
- Use `PATCH /files/{id}` with a JSON body to update metadata or replace contents; `DELETE /files/{id}` deletes the file and its contents from disk.
- Use `GET /items/{collection}` to list items and `GET /items/{collection}/{id}` for one item.
- Use `POST /items/{collection}` to create (an object for one item, an array for many), `PATCH /items/{collection}/{id}` to update, and `DELETE /items/{collection}/{id}` to delete.
- Use `GET /items/{collection}?aggregate[count]=*` for counts; singletons use `GET /items/{collection}` and return a plain object, not an array.

## Query Parameters

- Use `fields` (comma-separated, dot notation for relations, `*` wildcards) to control returned fields; request specific fields in production instead of wildcards.
- Use `filter` with JSON rules (`{"field": {"_eq": "value"}}`); combine rules with `_and`/`_or` arrays; filter relational fields by nesting (`{"author": {"name": {"_eq": "..."}}}`).
- Use `search` for a quick text search across string fields; it is less optimized than `filter`.
- Use `sort` (CSV, `-` prefix for descending), `limit` (default 100, `-1` for all), and `offset` or `page` (first page is 1) for pagination.
- Use `deep` with underscore-prefixed params to apply query parameters to nested relational data, and `alias` to fetch the same field twice under different names.

## Pagination

- Advance with `offset += limit` until a page returns fewer items than `limit`; `page` is an alternative cursor (first page is 1).
- List responses wrap items in `data`; `meta` appears when requested via the `meta` parameter.
- If `data` is missing or malformed, stop pagination and report the issue instead of guessing values.

## Verification Failure Protocol

- After creating, updating, or deleting, fetch the object back and verify its id and fields.
- Expected success codes: `200` for reads, creates, and updates; `204` for deletes.
- On `401`, the access token went stale between the gate and the call; the request was rejected before execution, so run the mint step, read the session file again, and repeat the call once (the login step when the mint fails).
- On any other non-2xx response, stop immediately, report the status code and error body (excluding credentials) to the user, and do not retry automatically.
- If the fetched object does not match what was sent:
  1. Do not retry.
  2. Inspect the Data Studio manually.
  3. Report the issue to the user before any further action.
- If the API and UI disagree, stop before retrying to avoid duplicate items or uploads.
