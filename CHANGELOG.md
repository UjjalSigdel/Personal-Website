# Changelog

This file records significant project changes.

Follow the format below.

---

## Unreleased

### Added

- `/projects` page: the full project archive with category filtering (Electronics / Programming / Web Development), per `ROADMAP.md` Phase 4 and `VISION.md`'s homepage/archive split.
- `client/src/lib/projects.ts`: single shared, typed project data source used by both the homepage's featured section and the new archive page (replaces the duplicated inline project array).

### Changed

- `api/contact.ts` now types the request/response with `@vercel/node` instead of `next`, matching the actual deployment target.
- Homepage's Projects section is now "Featured Projects" (still the same 3 projects, all marked featured) with a "View all projects →" link — the only entry point to `/projects`.
- Header/Footer "Projects" nav item stays a same-page scroll link to the homepage's Featured Projects section (matches `VISION.md`'s new Navigation section: `/projects` is a deliberate secondary destination, not a primary-nav target). All nav items (Home/About/Skills/Projects/Contact) now behave consistently from any page: on the homepage they scroll directly, from another page (e.g. `/projects`) they navigate back to `/` and scroll to the matching section via a `#section` hash that `Home.tsx` picks up on mount. Both `Home.tsx` and `Projects.tsx` scroll to top on mount when there's no hash, to counter `wouter`'s client-side navigation preserving scroll position across route changes.
- `ProjectCard` now takes an icon key (`"circuit-board" | "code" | "globe"`) instead of raw JSX, so project data can be plain, serializable objects shared across pages.
- `VISION.md`: added a Navigation section documenting the nav-scrolls-vs-page-navigates split above; corrected the Backend section's stale mention of Express (removed in the Phase 1 cleanup).
- Contact section: replaced the right-hand "Contact Information" / "Connect with Me" cards, which duplicated the footer's email/phone/location/socials verbatim, with a single "Before you send that message" FAQ card (open to internships? what to put in the subject line? response time?). That panel was also `hidden` below `md` — it's now visible on mobile too, stacked below the form, since it no longer repeats what's already in the footer. The form column is now wider (`3fr` vs `2fr`) to give it more room.

### Fixed

- Header's "Home" nav button, mobile "Home" link, and logo all hardcoded `window.scrollTo(top)` instead of calling the `onHomeClick` prop passed in. Harmless on the homepage (same visual result), but on `/projects` it meant clicking "Home" or the logo just scrolled that page instead of navigating back to `/`. Now all three call `onHomeClick`.

### Removed

- Phase 1 cleanup: removed dependencies left over from earlier Express/Passport/Railway backend iterations with no remaining imports (`express`, `passport`, `passport-local`, `express-session`, `connect-pg-simple`, `memorystore`, `cors`, `express-rate-limit`, `gh-pages`, `patch-package`, and their `@types/*` packages).
- Removed the unused Postgres/Drizzle persistence layer (`shared/schema.ts`, `migrations/`, `drizzle.config.ts`, `drizzle-orm`, `drizzle-zod`, `drizzle-kit`, `@neondatabase/serverless`, `pg`, `postgres`, `dotenv`, `DATABASE_URL`) — the contact form only ever emailed submissions and never read/wrote this schema.
- Removed the `next` dependency (only used for two type imports) and the `ws`/`bufferutil` dependencies (unused, previously transitive to the removed backend).
- Removed the duplicate, unused `client/src/pages/not-found.tsx` (the app routes 404s through `NotFound.tsx`).
- Removed `client/src/components/ui/section-heading.tsx` and its dead imports from the section components — it was never rendered and didn't match the current design.
- Removed the `@server/*` tsconfig path alias and `server/**/*` include, which pointed at a directory that no longer exists.

---

## YYYY-MM-DD

### Added

-

### Changed

-

### Fixed

-

### Removed

-

