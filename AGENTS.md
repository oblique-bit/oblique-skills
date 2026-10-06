# Repository Guidelines

This repo authors installable agent skills for the Oblique ecosystem. The
installable skills live in `skills/`; the working skills agents use in this
repo live in `.agents/skills/`.

## Layout

- `skills/` — installable skills, one directory per skill with a `SKILL.md`.
  This is what `npx skills add oblique-bit/oblique-skills` discovers.
- `.agents/skills/` — working skills for agents authoring and maintaining the
  installable skills. They are not published or installed.

## Working Skills (`.agents/skills/`)

- `directus-api` — technical foundation for the Directus Cloud REST API used
  by the Oblique docs project. Read it before making Directus API calls.
- `directus-auth` — authenticate to Directus: one-time interactive login and
  minting short-lived access tokens. Use when Directus API calls fail with 401
  or time out.
- `credential-storage` — storage contract for API credentials on this machine.
  Read it when a skill reads or writes credentials.
- `skill-authoring` — create, review, evaluate, and improve Agent Skills in
  this repository. Read it before creating or editing any `SKILL.md`.

## Authoring Skills

How skills in this repo are written lives in `.agents/skill-authoring.md`.
Read it before creating or editing any `SKILL.md`, installable or working.
