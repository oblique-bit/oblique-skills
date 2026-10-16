---
name: directus-auth
description: 'Authenticate to the Directus Cloud project: one-time interactive login (email + password + OTP) that stores a refresh token, and minting a short-lived access token per session. Use when Directus API calls fail with 401 or time out, when the refresh token expired, or when setting up Directus credentials.'
compatibility: 'Requires Node 24+ and curl. Commands are written for a POSIX shell.'
---

# Directus Auth

Authenticate to the Directus Cloud project at `https://oblique.directus.app`. The agent performs the API calls; the user performs the interactive login.

Read the [credential storage contract](../credential-storage/SKILL.md) for where credentials live and their safety rules.

The commands in this skill are written for a POSIX shell. On another OS, keep the HTTP logic, URLs, and file paths identical and translate only the invocation: environment-variable setting, prompts, and line continuations.

## Why This Flow

- The account has 2FA (email + password + OTP), so static tokens are unavailable and the password cannot be stored.
- Login happens once: the user runs the login request in their own terminal, and only the long-lived **refresh token** is stored in the env file.
- Every session, the agent exchanges the refresh token for a short-lived **access token** (~15 min) in `~/.agent-credentials/directus-session.json`. Directus rotates the refresh token on every refresh; the agent writes the new one back and is its single writer.
- When the refresh token expires (~7 days), the user runs the login request again.

## Corporate Proxy

- Directus is hosted externally, so its connection goes through the corporate proxy (`https_proxy=http://proxy-bvcol.admin.ch:8080`). Node's fetch honors the proxy env vars only when `NODE_USE_ENV_PROXY=1` (Node 24+); set the flag for every fetch call this skill makes.
- The corporate proxy intercepts TLS with its own CA, which `NODE_EXTRA_CA_CERTS` (the internal CA bundle from the ca-trust skill) already covers. `NO_PROXY` excludes `*.admin.ch`, so internal endpoints keep bypassing the proxy.
- On `no response (TimeoutError)`, the request bypassed the proxy and the firewall blocked it: confirm `NODE_USE_ENV_PROXY=1` is set, then retry.
- On `SELF_SIGNED_CERT_IN_CHAIN`, the CA bundle is missing or stale: re-run the ca-trust skill, then retry.

## Procedure

1. Check what is stored: read `~/.agent-credentials/env` for the refresh token and `~/.agent-credentials/directus-session.json` for the access token and its expiry. A missing refresh token means login; an expired access token means mint.
   Done when you know whether this is a first setup or a re-mint.
2. Login (first setup or expired refresh token only): give the user this command to run in their own terminal, and have them fill in the values at the prompts:
   ```shell
   read -p "Email: " DIRECTUS_EMAIL && read -s -p "Password: " DIRECTUS_PASSWORD && echo && read -s -p "OTP: " DIRECTUS_OTP && echo && curl -s -X POST https://oblique.directus.app/auth/login -H "Content-Type: application/json" -d "{\"email\": \"$DIRECTUS_EMAIL\", \"password\": \"$DIRECTUS_PASSWORD\", \"mode\": \"json\", \"otp\": \"$DIRECTUS_OTP\"}"
   ```
   The response contains `data.refresh_token`. Have the user write it to `~/.agent-credentials/env` as `DIRECTUS_REFRESH_TOKEN=<value>` (create the file with `600` permissions when missing).
   Done when the refresh token is stored and no password, OTP, or token appeared in chat output.
3. Mint (every session): read the refresh token from the env file, then run this Node script from the shell:
   ```shell
   NODE_USE_ENV_PROXY=1 node -e '
   const {readFileSync, writeFileSync, mkdirSync} = require("node:fs");
   const {join} = require("node:path");
   const {homedir} = require("node:os");
   const dir = join(homedir(), ".agent-credentials");
   const env = readFileSync(join(dir, "env"), "utf8");
   const refresh = env.match(/^DIRECTUS_REFRESH_TOKEN=(.*)$/m)[1].trim();
   const base = "https://oblique.directus.app";
   fetch(base + "/auth/refresh", {
     method: "POST",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify({refresh_token: refresh, mode: "json"})
   }).then(async r => {
     const body = await r.json();
     if (!r.ok) throw new Error("refresh failed: HTTP " + r.status + " (" + (body.errors?.[0]?.extensions?.code ?? "UNKNOWN") + ")");
     mkdirSync(dir, {recursive: true});
     writeFileSync(join(dir, "env"), env.replace(/^DIRECTUS_REFRESH_TOKEN=.*$/m, "DIRECTUS_REFRESH_TOKEN=" + body.data.refresh_token));
     const session = {token: body.data.access_token, expires_at: new Date(Date.now() + body.data.expires).toISOString(), base_url: base};
     writeFileSync(join(dir, "directus-session.json"), JSON.stringify(session, null, 2));
     console.log("access token minted, expires", session.expires_at);
   }).catch(e => { console.error(e.message); process.exit(1); });
   '
   ```
   Directus rotates the refresh token on every refresh; the script writes the new one back to the env file and stores the access token with its expiry in the session file.
   Done when the script prints `access token minted`.
4. Verify without exposing secrets: read the session file and confirm the access token expiry is in the future. Then call `GET /users/me` with the minted access token and check the response identifies the user.
   Done when `/users/me` returns the user's identity and no token appeared in output.
5. Record the outcome in repo memory: what is stored, the session-file path, and the verification date.
   Done when the next session can find the setup facts without re-asking the user.

## Failure Protocol

- If the mint script fails with a TypeError, or the env file or `DIRECTUS_REFRESH_TOKEN` is missing, treat it as a first setup and run the login step. If the response is not JSON, report the HTTP status and stop.
- On `refresh failed: HTTP 401 (INVALID_CREDENTIALS)` or similar, the refresh token expired or was revoked: re-run the login step.
- On any other non-2xx response, stop and report the status code and error code (excluding credentials) to the user.
- A password or OTP that appeared in chat is compromised: have the user change the password and re-run login.

## Credential Safety

- The password and OTP enter only through the user's own terminal prompts; the agent never asks for them in chat and writes no credential into any file it produces.
- Keep the refresh and access tokens out of prompts, commits, URLs, shell scripts, command output, and the final response; the only files that hold them are the env file and the session file from the storage contract.
- The agent is the single writer of the refresh token; concurrent refreshes invalidate each other, so mint once per session, not per request.
