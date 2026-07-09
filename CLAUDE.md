# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project documentation (read before significant changes)

This repo maintains its own planning docs. Read them before proposing architecture, design, or workflow changes:

- `VISION.md` — purpose, target audience, design philosophy, long-term direction
- `ARCHITECTURE.md` — current structure and future direction
- `WORKFLOW.md` — how changes should be proposed and reviewed
- `ROADMAP.md` — phased plan (cleanup → architecture → UI refresh → projects → performance → a11y → SEO → future features)
- `CHANGELOG.md` — should be updated for significant changes

Key rules from `WORKFLOW.md` that apply to AI assistants specifically:
- Before making changes: understand the existing implementation, analyze affected files, explain the proposed solution, and wait for approval before major architectural/design changes.
- Large changes require approval first (with rationale, affected files, drawbacks, alternatives): folder restructuring, routing changes, major UI redesign, new libraries, backend changes, removing functionality.
- Never develop directly on `main` — use feature branches.
- Update relevant docs when architecture/workflow changes; remove outdated info rather than leaving conflicting notes.

Key points from `VISION.md`: avoid generic "AI-generated portfolio" aesthetics (centered hero with no personality, gradient-for-its-own-sake backgrounds, glassmorphism without function, repetitive feature-card grids, decorative animations that don't aid usability). The site is a single-page app today; `/projects` is planned as a full project archive with the homepage showing only featured projects.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server (client only)
npm run build     # production build (outputs to dist/public)
npm run preview   # preview the production build locally
npm run check     # type-check with tsc (no emit)
```

There is no lint script and no test runner configured in this repo.

## Architecture

This is a Vite + React SPA with a **separate serverless backend** deployed on Vercel — there is no long-running server; the earlier Express/Postgres backend was fully removed in the Phase 1 cleanup.

### Frontend (`client/`)

- Entry: `client/index.html` → `client/src/main.tsx` → `client/src/App.tsx`.
- Routing uses `wouter`, not react-router. `App.tsx` defines routes with `<Switch>`/`<Route>`; currently just `/` (`pages/Home.tsx`) and a catch-all 404.
- Routes: `/` (`pages/Home.tsx`), `/projects` (full project archive), `/projects/:slug` (project detail pages — rendered only for projects with an `overview` in `lib/projects.ts`; others redirect to the archive), `/blog` (under-construction state), and a catch-all 404 (`pages/NotFound.tsx`).
- `pages/Home.tsx` composes the homepage from section components (`components/sections/HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ContactSection`) plus `Header`/`Footer`. Header and Footer take a single `onNavigate(section)` prop (`SectionId` and the shared `NAV_ITEMS` list live in `lib/navigation.ts`); on the homepage it scrolls to section refs, on other pages it routes back to `/` with a `#section` hash that `Home.tsx` picks up on mount (via `useHomeSectionNavigate`).
- Secondary pages (`/projects`, `/blog`) render inside `components/SubPageLayout.tsx`, which provides the Header/Footer wiring, the `$ cd ..` back link, and scroll-to-top on mount.
- `components/ui/` is a small shadcn/ui-style component set (Radix primitives + `class-variance-authority` + `tailwind-merge`), pruned in the Phase 1 cleanup to only the components actually rendered: `card`, `form`, `input`, `label`, `textarea`, `toast`/`toaster`, plus the site-specific `project-card`, `terminal-window` (the three-dot terminal chrome used by Hero/Skills/Contact), and `terminal-button` (a cva factory for the `$ command`-style buttons/links). Re-add other shadcn components (and their Radix deps) only when something actually uses them.
- Shared page data lives in `client/src/lib/` (`projects.ts`, `posts.ts`) as plain typed arrays. Shared Framer Motion scroll-reveal variants (`staggerContainer`, `fadeUpItem`) live in `lib/motion.ts`.
- API calls go through the small `apiRequest` fetch helper in `client/src/lib/api.ts` (the only consumer is the contact form). There is no data-fetching library.
- Framer Motion is loaded via `LazyMotion`/`m` (App.tsx wraps everything in `<LazyMotion features={domAnimation} strict>`) — always use `m.div` etc., never `motion.div`; `strict` makes the full component throw. Secondary pages are code-split with `React.lazy` in `App.tsx`; only Home ships in the main bundle.
- Path alias (defined in both `vite.config.ts` and `tsconfig.json`): `@/*` → `client/src/*`.

### Backend (`api/`)

- `api/contact.ts` is a Vercel serverless function (typed with `@vercel/node`'s `VercelRequest`/`VercelResponse`) handling `POST` for the contact form. It validates input with `zod` inline and sends mail directly via `nodemailer` (Gmail SMTP, credentials from `EMAIL_USER`/`EMAIL_PASS` env vars). There is no database — form submissions are emailed, not persisted. The earlier Drizzle/Postgres persistence layer was removed in the Phase 1 cleanup.
- Deployment target is Vercel (see `.vercel/`, `homepage` field in `package.json`, custom domain via `public/CNAME`). `vite build` outputs the static client to `dist/public`; `api/*.ts` files are deployed as Vercel serverless functions.

### Config files worth knowing about

- `vite.config.ts` sets `root` to `client/`, `publicDir` to the top-level `public/`, and build output to `dist/public`. Several plugins (`@replit/vite-plugin-*`) are Replit-environment integrations from the project's original Replit-based scaffolding and are conditionally loaded only when `REPL_ID` is set.
- `theme.json` / `tailwind.config.ts` drive the shadcn/ui theme tokens used across `components/ui/`.
