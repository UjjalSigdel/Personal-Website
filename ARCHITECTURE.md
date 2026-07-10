# Project Architecture

This document describes the current, actual structure of the repository.
The boundary rules it implements live in `FOUNDATION.md`.

## Branch model

- **`main`** — the engineering foundation. Everything below describes `main`
  unless noted. `main` builds and renders a minimal placeholder page; it is
  never the public website.
- **Design branches** — one long-lived branch per visual identity. Under the
  contract, a design branch is `main` plus: section components,
  Header/Footer, the page shell, design-specific primitives, its own pages
  and route table, and its theme token values. **Future design branches are
  created from `main`.**
- Changes flow one way: `main` → design branches. See `WORKFLOW.md`.

### The `redesign` branch — read this before checking it out

`redesign` is the current production design, and it **predates the
architectural contract**. It was the codebase the foundation was *extracted
from*, and it has deliberately not been modified since:

- It does not consume the foundation modules — it carries its own inline
  copies of what `main` centralized (an inline contact schema, hardcoded
  site facts and colors, no `site.config.ts`, no CI workflow).
- This is intentional preservation, not drift: `redesign` is kept untouched
  as the stable production implementation. **No migration of the foundation
  into `redesign` is planned**; if one is ever wanted, it will be a
  deliberate, separately reviewed undertaking.
- `redesign` is therefore **not an engineering source**. Do not base new
  work on it; do not copy patterns from it into `main`.
- The next design does not start from `redesign` — it starts from `main`.
  A fully token-migrated variant of the terminal design (the code the
  foundation was distilled from) is preserved in `main`'s history as the
  second parent of the "M9" promotion merge, if a future design wants it
  as a base.

## Stack

React 18 + TypeScript + Vite (SPA, `wouter` routing, Framer Motion via
LazyMotion), Tailwind CSS, and Vercel serverless functions for the backend.
No database — the contact form emails via Nodemailer. `npm run dev|build|
preview|check` are the only scripts.

## Layout of `main`

| Path | Contents | Layer |
|---|---|---|
| `api/contact.ts` | Contact endpoint: shared-schema validation, honeypot, Nodemailer | Foundation |
| `client/src/lib/` | `site.config.ts` (single source of owner/deployment facts), `contact.schema.ts` (validation shared client/server), `navigation.ts` (section nav + `useSectionScroll`), `seo.ts` (`usePageMeta`), `api.ts`, `motion.ts`, `utils.ts` | Foundation |
| `client/src/lib/projects.ts`, `posts.ts` | Typed content data every design renders | Content |
| `client/src/hooks/` | `use-toast` | Foundation |
| `client/src/components/ui/` | Token-driven primitives: `card`, `form`, `input`, `label`, `textarea`, `toast`/`toaster`, `focus-ring` | Design system |
| `client/src/index.css` | Theme token vocabulary + default values, font faces | Theme (contract + defaults) |
| `tailwind.config.ts` | Token→utility plumbing, font families, `blink` keyframe | Theme plumbing |
| `client/src/App.tsx`, `pages/Home.tsx` | Minimal placeholder shell and route table | Foundation (pattern) |
| `client/index.html` | Document skeleton, meta/JSON-LD, font preloads | Foundation skeleton |
| `public/` | SEO files (robots, sitemap, manifest), favicons, CV, photos, og-image, self-hosted fonts | Content / default theme assets |
| `vercel.json`, `vite.config.ts`, `tsconfig.json`, `postcss.config.js` | Build, type-check, security headers | Foundation |
| `*.md` (repo root) | Project documentation | Foundation |

Path alias: `@/*` → `client/src/*` (in both `vite.config.ts` and
`tsconfig.json`). `api/` files import shared modules by relative path —
Vercel's function bundler does not resolve the alias.

## Theme

Semantic tokens are CSS custom properties in `index.css`, consumed as
Tailwind utilities via `tailwind.config.ts` (see the mapping comment atop
`index.css`). Components reference tokens only — a raw color value in a
component is a defect (`FOUNDATION.md` §3.3). `main`'s token values are
currently the terminal design's palette and IBM Plex typefaces, serving as
the build-and-develop defaults; design branches own their real values.

## Known reconciliation debt

- `--foreground`/`--muted`/`--card`/`--secondary`/`--input` still carry
  pre-redesign generated values with live consumers; reconciling them needs
  visual verification. Until then a few hex holdouts remain (e.g. `#DCEFE3`
  in `toast.tsx`) — see the M7 changelog entry for the full list.
- `SubPageLayout` (secondary-page shell) currently lives on design branches
  because it composes Header/Footer; extracting a headless shell is deferred
  until a second design needs it.

## Keeping this document updated

This file must describe the repository as it is, not as planned. Update it
in the same change as any significant structural work.
