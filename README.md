# oblique-skills

Agent skills for working with the Oblique ecosystem, the unified frontend
ecosystem of the Swiss Confederation ([oblique.bit.admin.ch](https://oblique.bit.admin.ch)).

Skills follow the [Agent Skills](https://agentskills.io) open standard: one
directory per skill with a `SKILL.md` that gives an AI agent the knowledge and
steps for a specific task. Install them into your agent with the
[skills CLI](https://github.com/vercel-labs/skills).

## Install

```shell
npx skills add oblique-bit/oblique-skills --all
```

The `--all` flag selects every skill for every detected agent and accepts the
installation prompt. Install globally
with `-g` so every project on your machine gets them.

## Skills

The first release focuses on selecting the right Oblique guidance, managing the
project lifecycle, building UI, wiring helpers, and keeping accessibility in
scope.

| Skill | Use when |
| --- | --- |
| `oblique` | You are unsure which Oblique skill applies or the task spans several areas |
| `ob-toolchain` | Creating, installing, or updating an Oblique project |
| `ob-components` | Building or styling Oblique UI components |
| `ob-helpers` | Wiring Oblique helpers and services |
| `ob-ax` | Building or reviewing accessible Angular UI with Oblique |