---
name: skill-authoring
description: Create, review, evaluate, or improve Agent Skills in this repository. Use when creating or editing a SKILL.md, designing skill structure or trigger descriptions, adding references or scripts, testing skill behavior, comparing a skill with a baseline, or refining a skill from evaluation feedback.
compatibility: Requires access to this repository's .agents/skill-authoring.md guide.
metadata:
  author: oblique-bit
  category: authoring
---

# Skill Authoring

Use the repository authoring guide as the source of truth. If it cannot be
found or read, tell the user and stop. Do not guess the repository conventions.

Read [the authoring guide](../../skill-authoring.md) before proceeding.

## Workflow

1. Capture the skill's purpose, trigger conditions, output, and success
   criteria. Resolve missing decisions before drafting test prompts.
2. Research the repository, neighbouring skills, available tools, and primary
   sources. Record conventions and runtime gaps the agent cannot discover.
3. Draft the smallest useful `SKILL.md`. Keep trigger conditions in
   frontmatter, workflow in the body, and branch-specific detail in referenced
   files.
4. Create two or three realistic prompts covering the main path and a boundary
   case. Add objective assertions when the output is objectively verifiable.
5. Compare with a baseline: no skill for a new skill, or the previous version
   for an existing skill. Check correctness, usefulness, wasted work, cost,
   and trigger behavior.
6. Review full transcripts and user feedback. Generalize failures instead of
   overfitting to one prompt, then rerun the complete test set after meaningful
   changes.

## Completion gate

Before calling a skill ready, validate its frontmatter, check every referenced
file, test should-trigger and near-miss prompts, and confirm the user has
reviewed the result. Read the full guide for the repository conventions,
progressive disclosure rules, and Agent Skills evaluation details.
