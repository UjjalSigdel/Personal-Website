# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read first

- `FOUNDATION.md` — **the architectural contract.** Before any change, identify
  which layer it belongs to (foundation / design system / theme / content /
  design branch); if unclear, stop and ask. Changes flow one way:
  `main` → design branches. Never edit foundation files on a design branch;
  never merge a design branch into `main`.
- `VISION.md` (purpose and design philosophy), `ARCHITECTURE.md` (current
  structure), `WORKFLOW.md` (process — feature branches, approval for large
  changes), `ROADMAP.md`, `CHANGELOG.md` (update it for significant changes).

## Branch model

- `main` = the engineering foundation: `api/`, `client/src/lib/` (site
  config, shared contact schema, navigation/SEO/motion helpers, content
  data), hooks, token-driven `components/ui/` primitives, the theme contract
  in `index.css`/`tailwind.config.ts`, build config, and docs. It renders a
  placeholder page only.
- Design branches (production is built from `redesign`) add the visual
  identity: `components/sections/*`, `Header`, `Footer`, `SubPageLayout`,
  `components/ui/terminal-*` and `project-card`, the real pages, their route
  table in `App.tsx`, and their theme token values.
- Key vision rule: avoid generic "AI-generated portfolio" aesthetics; the
  homepage is a single-page experience and `/projects` (full archive) is a
  deliberate secondary destination, never a primary-nav item.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server (client only)
npm run build     # production build (outputs to dist/public)
npm run preview   # preview the production build locally
npm run check     # type-check with tsc (no emit)
```

There is no lint script and no test runner configured in this repo.

## Architecture notes (both branches)

- Vite + React 18 SPA, `wouter` routing, separate Vercel serverless backend
  (`api/contact.ts` — zod validation from the shared
  `client/src/lib/contact.schema.ts`, honeypot, Nodemailer/Gmail via
  `EMAIL_USER`/`EMAIL_PASS`; no database). `api/` imports shared modules by
  **relative path** — Vercel's bundler doesn't resolve the `@/` alias.
- Path alias `@/*` → `client/src/*` (defined in `vite.config.ts` and
  `tsconfig.json`). Build outputs to `dist/public`.
- Framer Motion is loaded via `LazyMotion`/`m` with `strict` — always use
  `m.div` etc., never `motion.div` (the full component throws). Wrap-level
  `MotionConfig reducedMotion="user"` must survive any redesign.
- **Theme tokens:** semantic CSS custom properties in `client/src/index.css`
  (mapping comment at the top), consumed as Tailwind classes. Never hardcode
  a color in a component — use token classes (`bg-surface`, `text-accent`,
  `text-faint`, `border-border-strong`, `text-success`, …). Retheming means
  editing `index.css` values.
- **Tailwind content-scan gotcha:** every file under `client/src/` is
  scanned as text, and a bare word in a comment that matches a utility class
  (`inline`, `ring`, …) emits a phantom CSS rule. Watch comment wording;
  verify with a build when in doubt.
- Owner/deployment facts come from `client/src/lib/site.config.ts` — never
  hardcode the email/URL/socials. The static `client/index.html` head and
  `public/sitemap.xml` duplicate some values (static files can't import TS);
  change them together.
- Site-wide focus-visible treatment: `components/ui/focus-ring.ts`.

## Design-branch specifics (`redesign`)

- Routes: `/` (section composition), `/projects` (archive with DIP-switch
  category filters), `/projects/:slug` (detail pages — only for projects
  with an `overview`; others redirect), `/blog` (under-construction state
  until `lib/posts.ts` has entries), catch-all 404. Secondary pages render
  inside `SubPageLayout` and are code-split via `React.lazy`.
- Header/Footer take a single `onNavigate(section)` prop; `NAV_ITEMS` and
  the `#section`-hash protocol (producer `useHomeSectionNavigate`, consumer
  `useSectionScroll`) live in `lib/navigation.ts`.
- The terminal identity (`TerminalWindow`, `terminalButton` cva factory,
  blueprint `ProjectCard`/`StatusStamp`) lives in `components/ui/` on that
  branch; `STATUS_META` is exported for the detail page.
