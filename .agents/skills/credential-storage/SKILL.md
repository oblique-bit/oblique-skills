---
name: credential-storage
description: 'Storage contract for API credentials on this machine: the ~/.agent-credentials env file and session files, their permissions, read precedence, and safety rules. Use when a skill reads or writes credential env vars or minted session tokens, or when designing a new credential flow.'
---

# Credential Storage

The shared contract for API credentials on this machine. `directus-auth` and other credential skills follow it.

## Env File

- The env file is `~/.agent-credentials/env` (`~` = `$HOME` on POSIX, `%USERPROFILE%` on Windows): `KEY=VALUE` lines, one per credential, outside every repo.
- Permissions: `700` directory and `600` file on POSIX; current-user-restricted ACL on Windows.
- Read precedence: source the env file into a shell variable, or read the env var when already set in the session. The env file is the canonical store — when a value rotates, the file is updated first.
- On Windows a credential-setup skill may additionally set a persistent User env var for its services so new terminals see the value; the env file stays canonical.

## Session Files

- Short-lived tokens minted at session time (e.g. a Directus access token) go in `~/.agent-credentials/<service>-session.json` with restrictive permissions, next to the env file.
- A session file holds the token, its expiry, and the base URL it applies to. Readers check the expiry and re-mint when stale.

## Safety Rules

- Credentials enter only through hidden prompts in a terminal the user runs, or through files the user controls. A skill writes no credential into any file it produces.
- Keep credentials out of command output, files, commits, URLs, and prompts; a verbose HTTP client would print the Authorization header, so use plain requests.
- A credential that appeared in chat is compromised: revoke it on the service and re-run setup before any use.
- On a failed verification, stop and report the status code (excluding the credential) instead of retrying.
