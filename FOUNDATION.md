# Foundation Specification

The architectural contract for this repository, for human contributors and AI
assistants alike. It defines the layers the codebase is divided into, who
owns each layer, and the rules that keep engineering separate from visual
design.

Scope: this document covers principles, ownership, and boundaries only.
What the site is for lives in `VISION.md`; how work is done in `WORKFLOW.md`;
what is planned in `ROADMAP.md`; what currently exists in `ARCHITECTURE.md`.
This document intentionally contains no roadmap and prescribes no
implementations — it should still be true after the frontend has been
rewritten more than once.

---

## 1. Purpose

The engineering of this site outlives any of its designs. The visual identity
is expected to be replaced repeatedly over the years; the backend, routing,
validation, accessibility, performance, and SEO work should not be rebuilt
each time — and fixes earned in one design should carry into the next.

Therefore the codebase is split into a design-blind **foundation** and
replaceable **designs**. The separation lives primarily in the code itself
(semantic tokens, shared configuration, shared logic) and secondarily in
branches (one branch per visual identity). Code-level separation comes first
because Git merges files, not concepts: the cleaner the file-level boundary,
the cheaper it is to flow foundation improvements into every design.

## 2. Layers and Ownership

Every file belongs to exactly one layer. The layer determines where it lives
and who may change it.

### Foundation — lives on `main`

Design-blind engineering:

- Backend logic (contact handling, validation, abuse defenses).
- Routing mechanics and the application shell *pattern*. The concrete route
  table is the one shell piece each design branch owns, because routes
  compose that design's pages; `main` carries a minimal placeholder table.
- Shared logic: utilities, hooks, validation schemas, metadata management,
  data-access helpers.
- Shared configuration (see §6) and shared types.
- Accessibility *behavior*: focus management, dialog semantics, assistive-
  technology wiring, document structure correctness.
- Performance and SEO infrastructure: loading patterns, asset conventions,
  crawler and metadata plumbing.
- Build and tooling configuration.
- Project documentation, including this file.
- The theme contract — token *names* and their meanings (§5).

The foundation never contains: color or font values, copywriting or voice,
branding, layout decisions, animation styles, or any assumption about what
the site looks like. Foundation code must make sense for a design that does
not exist yet.

### Design system — lives on `main`

Reusable primitives that own **behavior** and expose **appearance**: styled
exclusively through theme tokens, variant props, and content slots, so a
design branch can restyle them without editing them. Their accessibility
behavior is part of the foundation guarantee and survives any restyling.

There is no fixed inventory of primitives. One is extracted only when it has
two real consumers or removes a genuine sync hazard — never speculatively.

### Theme — contract on `main`, values on design branches

`main` defines the semantic token vocabulary (§5) with defaults sufficient to
build and develop against. Each design branch supplies its own values:
colors, typefaces and weights, spacing and radius scale, motion, shadows,
icon choices.

### Content — shared on `main`, presented by designs

Shared content is whatever is true of the person rather than of a particular
design: project data, writing, credentials, the CV, photos, contact details,
social links, metadata text. It belongs to the foundation so it is maintained
once and stays correct no matter which design is live.

Designs are not required to present all of it, or to present it identically.
A design branch may select from, reorganize, and frame shared content in its
own way, and may add presentation-specific content of its own (section
copy, microcopy, design-specific imagery). What it may not do is fork the
shared facts: corrections and additions to shared content happen on `main`.

### Design branches — one per visual identity

Everything a visitor experiences as "the design": layouts, page composition,
navigation structure and interaction patterns, typography, color values,
animations, branding assets (wordmark, social images, favicons), copy and
voice, and design-specific components built on the primitives. Design
branches exist for experimentation — a branch may change all of this
completely, and that must never require touching foundation code.

This contract governs branches created from `main` after it was adopted.
A design branch that predates the contract (currently `redesign` — see
`ARCHITECTURE.md`) is preserved as-is and is exempt until deliberately
migrated; it is not an engineering source either way.

## 3. Boundary Rules

These rules are the contract. They apply to human contributors and AI
assistants equally.

1. **Changes flow one way: `main` → design branches.** Design branches
   inherit from `main`; never merge or cherry-pick a design branch into
   `main`.
2. **Design branches do not edit foundation or design-system files.** A
   foundation bug discovered during design work is fixed on `main` first,
   then merged down.
3. **No hardcoded visual values outside theme files.** Colors, fonts, and
   motion reach components only through the token vocabulary. A raw visual
   value in a component is a defect, not a style choice.
4. **One source of truth.** Site facts come from shared configuration;
   validation rules are defined once and shared between client and server;
   content comes from the content layer. None of these are copied into
   components.
5. **Accessibility is not restyleable.** Focus management, dialog and
   assistive-technology semantics, contrast floors, and reduced-motion
   support are part of what a primitive *is*. A theme or design that breaks
   them is invalid.
6. **Abstain from speculative abstraction.** Prefer duplication until a
   second real consumer or a sync hazard exists.
7. **Foundation code stays portfolio-agnostic.** It must remain reusable and
   free of portfolio-specific assumptions; identity enters it only through
   shared configuration and the content layer. If a change depends on the
   portfolio's identity, branding, or visual style, it belongs in a design
   branch, not in the foundation.

## 4. Decision Process

The thinking that precedes any change, before any implementation detail:

1. **Identify the layer.** Decide which layer of §2 the change belongs to.
   The layer determines where the work happens and what it may touch.
2. **If the layer is unclear, stop and ask.** Do not guess a boundary.
   This applies especially to AI assistants: before proposing or implementing
   any change, determine its layer first, and when a change could plausibly
   live in more than one place, ask the maintainer instead of assuming.
3. **If a request spans layers, split it.** Separate the engineering part
   from the design part and treat them as distinct changes, each done in its
   own layer — even when they were asked for in one sentence.
4. **Preserve boundaries even at the cost of more code.** A small
   duplication that keeps a layer clean is better than a small coupling that
   erodes it. Boundary erosion compounds; extra lines do not.

## 5. Theme Contract

The semantic vocabulary components are allowed to reference. `main` owns the
names and meanings; design branches own the values. Themes may extend the
vocabulary with additional semantic tokens, but may not bypass it.

**Components consume semantic tokens only — never raw values.** This rule is
independent of any CSS framework or styling technology: however styles are
authored, the token names and meanings are the interface, and they survive
even if the styling stack is replaced.

- `background` — the page.
- `surface` — panels and cards on the background.
- `border` — separation lines.
- `text` / `text-muted` — primary and secondary reading text.
- `accent` — the identity color: links, markers, emphasis.
- `primary` (+ foreground) — action surfaces and the text on them.
- `success` / `warning` / `danger` — status communication.
- `ring` — the focus indicator.
- `font-sans` / `font-mono` — the two typographic voices.
- `radius` — the corner scale.

Non-negotiable floors, regardless of theme: readable contrast for text
tokens, a visible focus indicator on every interactive element, and all
motion respecting the user's reduced-motion preference.

## 6. Shared Configuration

Every owner- and deployment-specific constant — site URL, owner identity,
contact details, social links, default metadata, shared asset paths — has a
single source of truth that both foundation code and design branches read
from. How that source is implemented may change; that there is exactly one
authoritative place per fact may not.

Centralized because these facts otherwise scatter through logic, markup, and
metadata — and changing an email address or domain should be a one-place
change that no design work can drift away from.

Navigation structure is deliberately **not** part of shared configuration:
which navigation exists and how it behaves belongs to each design branch,
within the intent set by `VISION.md`.

## 7. The Role of `main`

`main` is the canonical engineering foundation of the repository. Every
design branch is created from `main` and continues to inherit from it for as
long as it lives; anything worth keeping across designs must therefore exist
on `main`.

`main` is not what visitors see, and it is not required to be a polished or
complete website. Its quality bar is engineering, not presentation: it must
remain internally consistent, buildable, and maintainable — that is the
whole bar. How branches are managed day to day is `WORKFLOW.md`'s domain.

## 8. Keeping This Document True

This file describes boundaries that should hold for years. If a boundary
decision changes, update this document in the same change — per
`WORKFLOW.md`, remove outdated rules rather than leaving conflicting ones.
Anything tied to the current implementation (folder layout, component lists,
milestones) belongs in `ARCHITECTURE.md` or `ROADMAP.md`, not here.
