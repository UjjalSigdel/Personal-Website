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

This is a Vite + React SPA with a **separate serverless backend** deployed on Vercel — there is no long-running Express server despite `express` still being a dependency (see history below).

### Frontend (`client/`)

- Entry: `client/index.html` → `client/src/main.tsx` → `client/src/App.tsx`.
- Routing uses `wouter`, not react-router. `App.tsx` defines routes with `<Switch>`/`<Route>`; currently just `/` (`pages/Home.tsx`) and a catch-all 404.
- `pages/Home.tsx` composes the whole page from section components (`components/sections/HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ContactSection`) plus `Header`/`Footer`. Navigation is same-page scrolling via refs passed down as `onXClick` handlers, not routed sub-pages.
- `components/ui/` is a shadcn/ui-style component library (Radix primitives + `class-variance-authority` + `tailwind-merge`). Treat these as generic building blocks, not page-specific code.
- Animation conventions live in `client/src/lib/animation.ts` (Framer Motion `Variants` factories like `fadeIn(direction, delay)`, `staggerContainer`, `textVariant`) — reuse these rather than hand-rolling new variants.
- Data fetching uses `@tanstack/react-query`; `client/src/lib/queryClient.ts` sets up a shared `QueryClient` and `apiRequest`/`getQueryFn` helpers used for any calls to the `/api/*` endpoints.
- Path aliases (defined in both `vite.config.ts` and `tsconfig.json`): `@/*` → `client/src/*`, `@shared/*` → `shared/*`. `tsconfig.json` also declares `@server/*` → `server/*`, but no `server/` directory currently exists — it's a holdover from an earlier Express-based layout.
- Known duplication: `pages/NotFound.tsx` (used by `App.tsx`, has a "return home" button) and `pages/not-found.tsx` (unused leftover) both exist — be aware when touching 404 behavior.

### Backend (`api/`)

- `api/contact.ts` is a Vercel serverless function (Next.js-style `NextApiRequest`/`NextApiResponse` handler) handling `POST` for the contact form. It validates input with `zod` inline and sends mail directly via `nodemailer` (Gmail SMTP, credentials from `EMAIL_USER`/`EMAIL_PASS` env vars). It does **not** touch the database — form submissions are emailed, not persisted, despite the schema below.
- `shared/schema.ts` defines Drizzle ORM tables (`users`, `contact_submissions`) and Zod insert schemas via `drizzle-zod`, intended for a Postgres (Neon) database (`DATABASE_URL` env var, config in `drizzle.config.ts`, migrations in `migrations/`). This schema/migration setup exists but is **not currently wired up** to any live code path — the project is mid-migration away from an Express+session+Postgres backend toward lightweight Vercel functions (see `CHANGELOG.md`/git history: "Backend change from Railway to Vercel No Express but Serverless", "Trying to make database work"). Don't assume the DB is actually in use; verify before building on top of it.
- Deployment target is Vercel (see `.vercel/`, `homepage` field in `package.json`, custom domain via `public/CNAME`). `vite build` outputs the static client to `dist/public`; `api/*.ts` files are deployed as Vercel serverless functions.

### Config files worth knowing about

- `vite.config.ts` sets `root` to `client/`, `publicDir` to the top-level `public/`, and build output to `dist/public`. Several plugins (`@replit/vite-plugin-*`) are Replit-environment integrations from the project's original Replit-based scaffolding and are conditionally loaded only when `REPL_ID` is set.
- `theme.json` / `tailwind.config.ts` drive the shadcn/ui theme tokens used across `components/ui/`.
