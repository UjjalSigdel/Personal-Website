# Roadmap

What has been done, what the repository is now, and what remains genuinely
future. Completed work is recorded here for context — the detailed record
lives in `CHANGELOG.md`.

---

## Completed — original site roadmap (Phases 1–7)

All seven phases of the original roadmap are done, executed on the design
line and recorded in the changelog:

1. **Cleanup** — unused dependencies, dead code, and unused components removed.
2. **Architecture** — component structure, reuse, and complexity improvements.
3. **UI Refresh** — the terminal/engineering-bench visual identity replaced
   the generic template look.
4. **Projects** — `/projects` archive, category filtering, project detail pages.
5. **Performance** — bundle reduction, LazyMotion, route code-splitting,
   asset optimization.
6. **Accessibility** — Lighthouse 100 on all routes; keyboard, focus,
   reduced-motion, and screen-reader work.
7. **SEO** — per-route metadata, Open Graph, structured data, robots/sitemap.

## Completed — foundation architecture (M2–M10, 2026-07)

The engineering/design separation defined in `FOUNDATION.md` was implemented
and promoted onto `main`: repository cleanup, shared configuration
(`site.config.ts`), a single shared validation schema, behavior hooks, the
semantic theme-token contract and full token migration, justified primitive
extraction, the foundation promotion itself, and CI guardrails
(`.github/workflows/ci.yml` + `scripts/check-foundation.mjs`).

## Current state

- `main` — the stable v2 engineering foundation (see `FOUNDATION.md` and
  `ARCHITECTURE.md`).
- `redesign` — the current production design. It predates the foundation
  contract and is intentionally preserved as-is; see `ARCHITECTURE.md`.
- `v1.0-original` — frozen historical archive of the first site.

---

## Future work (unscheduled, in rough priority order)

- **Content** — real blog posts (the `/blog` plumbing is ready), richer
  project detail content, certificates.
- **Deferred product decisions** — rate-limiting the contact endpoint beyond
  the honeypot; a browser-tested Content-Security-Policy header.
- **Token debt** — reconcile the stale legacy tokens (`--foreground`,
  `--muted`, `--card`, `--secondary`, `--input`) with visual verification,
  then shrink the hex-holdout allowlist in `scripts/check-foundation.mjs`.
- **Major dependency migrations** — React 19, Tailwind 4, zod 4,
  framer-motion 12: a dedicated, tested effort, not a mechanical bump.
- **Next redesign** — starts from `main`, per `FOUNDATION.md`. The
  fully-tokenized variant of the terminal design is preserved in `main`'s
  history if it's wanted as a starting point.

## Guiding principles

Roadmap items are not fixed requirements; the order may change as the
project evolves. Quality and maintainability always take priority over
completing roadmap items quickly.
