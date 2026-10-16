# Skill Authoring

How skills in this repo are written. Read this before creating or editing a
`SKILL.md`, whether installable (`skills/`) or working (`.agents/skills/`).

## Anatomy

- One directory per skill, named after the skill. The `name` frontmatter
  field matches the directory name.
- Installable skills carry the `ob-` prefix (`ob-components`, `ob-helpers`,
  `ob-ax`) so they group together wherever skills are listed.
- Frontmatter stays within the spec's six fields (`name`, `description`,
  `license`, `compatibility`, `metadata`, `allowed-tools`) so skills work
  across agents and survive claude.ai upload.
- `SKILL.md` stays under 500 lines. Deep material moves into `references/`
  (one level deep), executable helpers into `scripts/`.

## The description is a context pointer

The description is the only part of a skill that stays loaded at all times.
Its wording decides when the agent reaches the material:

- Front-load the leading word; the first words do the triggering.
- State what the skill does, then the branches that should trigger it, with
  trigger keywords. A branch is a distinct case the skill handles.
- One trigger per branch. Synonyms that rename one branch are one branch
  written twice; collapse them.
- Cut identity the body already carries. Every word costs on every turn.

## Invocation

- Model-invoked (default): keep the description so the agent can fire the
  skill on its own and other skills can reach its reference. Pick this when
  the agent must reach the skill unprompted, or another skill needs it.
- User-invoked: set `disable-model-invocation: true` when the skill only
  ever fires by hand. This removes the context load; the human must remember
  the skill exists. The description becomes a one-line human-facing summary.
- When user-invoked skills multiply past what a human remembers, add a
  router skill: one skill that names the others and when to reach each. A
  router can also be model-invoked and map outcome-style prompts to skills
  whose descriptions only match thing-style prompts; then it adds selection
  on top and gates nothing.

## Information hierarchy

Rank material by how immediately the agent needs it:

1. In-file steps: what the agent does, in order.
2. In-file reference: definitions and rules consulted on demand.
3. Disclosed reference: pushed into `references/` behind a pointer, loaded
   only when the pointer fires.

Inline what every run needs. Push behind a pointer what only some branches
reach; branching is the disclosure test. Keep a concept's definition, rules,
and caveats under one heading, so reading one part brings its neighbours.

## Steps end on completion criteria

Every step ends on a condition that tells the agent the work is done. Make
it checkable and demanding: "every modified file accounted for" forces
thorough work where "produce a change list" does not. A vague bound invites
premature completion.

## Pruning

- One meaning, one source of truth. Duplication costs maintenance and tokens.
- The environment is a source of truth too. A document that restates
  `--help` output or a directory layout is a cache; cache only what the
  agent cannot find by looking: conventions, reasons, gotchas.
- Check every line for relevance. Delete whole sentences that fail the test,
  rather than trimming words from them.
- Prompt the positive. State the target behaviour so the unwanted one stays
  out of context. A prohibition earns its place only as a hard guardrail.

## Leading words

A leading word is a compact concept the model already knows that anchors
behaviour in few tokens. Collapse spelled-out triads into one word: "fast,
deterministic, low-overhead" becomes tight. Coin a new word only with a
clear definition; a pretrained word recruits priors for free.

## Creation and evaluation loop

Use this loop for every new skill and every meaningful change to an existing
skill. Scale the evaluation effort to the skill's risk and observable output.

1. **Capture intent**: state what the skill enables, when it should trigger,
  what it should produce, and how success can be recognized. Resolve these
  decisions before writing test prompts.
2. **Research**: inspect the repository, available tools, primary sources,
  and neighbouring skills. Record conventions and edge cases the agent
  cannot discover reliably at runtime.
3. **Draft**: write the smallest useful `SKILL.md`. Put trigger conditions in
  `description`, workflow steps in the body, and branch-specific detail in
  referenced files. Explain why a non-obvious step matters.
4. **Test**: create two or three realistic prompts that cover the main paths
  and at least one boundary case. For skills with objectively verifiable
  output, add concrete assertions. For reference-only skills, inspect whether
  the agent selected and applied the right guidance. Store the prompts in
  `evals/evals.json` with `skill_name`, `id`, `prompt`, and `expected_output`.
5. **Compare**: run the prompts with the skill and against a baseline. For an
  existing skill, use the previous version as the baseline. Check usefulness,
  correctness, unnecessary work, token cost, and trigger behavior.
6. **Review**: inspect the full transcripts, not only final artifacts. Look
  for repeated work that belongs in a script or reference, missed branches,
  and instructions that cause wasted motion.
7. **Iterate**: generalize from failures instead of overfitting to one
  prompt. Re-run the complete test set after each meaningful revision and
  stop when the user is satisfied or further changes produce no clear gain.

### Trigger evaluation

The description is the primary trigger mechanism. Test it separately with a
balanced set of realistic should-trigger and near-miss should-not-trigger
prompts. Include outcome-style wording, casual wording, and prompts that
mention a competing skill. Prefer substantive tasks that genuinely benefit
from the skill; trivial one-step prompts are weak trigger tests.

### Completion criteria

A skill is ready when its frontmatter validates, its referenced files exist,
its main test prompts produce the intended behavior, boundary prompts do not
cause inappropriate activation, and the user has reviewed the result. Package
the skill only after this gate passes.

## Source material for Oblique skills

- The Directus docs project (`https://oblique.directus.app`) holds the doc
  content: `TabbedPage` (component and helper pages with `api`, `ui_ux`,
  `accessibility`, and `deprecation` fields), `TextPage`, `Category`, and
  `Version`. Read the `directus-api` working skill before querying it.
- The documentation site (`https://oblique.bit.admin.ch`) shows the rendered
  docs.
- The monorepo at `OUI/oblique` and the oblique MCP server, when configured,
  supply code structure.

## Docs-skill conventions

The installable docs skills (`oblique`, `ob-toolchain`, `ob-components`,
`ob-helpers`, `ob-ax`, and the later category skills) follow these conventions on top of
the rules above:

- One reference file per docs page, named by the page's slug. Every
  reference file is announced in its skill's `SKILL.md` with what it
  contains and when to load it.
- Component and helper references follow a fixed section order: Import,
  Purpose, Usage rules, How to use, Accessibility, Migration, Related,
  Example. Sections with no content are omitted, never emitted empty.
  Example, when present, is the closing section: it never interrupts the
  API docs. TextPage references are free-form prose with no fixed template.
- Current-version pages remain directly under `references/`. Each category
  skill carries a versioned migration guide at
  `references/migrations/<from>-to-<to>.md`, assembled from the `deprecation`
  fields and the deltas between those generations.
- Accessibility is layered: component references carry their component-
  specific a11y rules (the fallback when `ob-ax` is absent), each category
  `SKILL.md` carries a short inline list of the cross-cutting MUSTs, and
  `ob-ax` adds the full spec. Angular anti-patterns are adapted from
  github/awesome-copilot (MIT, attributed) and extended with Oblique
  specifics.
- Rules read in normative MUST/SHOULD form. WCAG 2.2 AA is named as the
  conformance target, never pasted in full.
- One line in each docs skill's `SKILL.md`: when an Oblique MCP server is
  available, its information overrules these references on API specifics
  only, never on semantics.
- References are generated once by hand and committed. Updates are made by
  hand when the docs change; no generation script.
- The router skill is named `oblique` (no `ob-` prefix: it is the front
  door, not a category skill).
