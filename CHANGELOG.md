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
- Hero section redesigned: dropped the gradient-blob background, floating bounce icons, and tri-color tag/card clutter the old hero leaned on. New version is a two-column "status terminal" layout — a byline (photo + name/program), a monospace headline ("// still compiling") with a blinking cursor, a first-person narrative paragraph, a pull-quote line, and terminal-style CTAs, paired with a `whoami`-style status panel (identity/affiliation only — no skills/tools content, to avoid duplicating the Skills section per `VISION.md`'s new Content Strategy section). The terminal card stretches to match the left column's height, with its rows centered vertically, instead of leaving a flat gap of empty background. The "Explore More" bounce-arrow scroll cue is kept as-is from the previous design. Removed the unused `isDarkTheme` state/matchMedia listener that never affected rendering.
- Corrected age (19 → 20) in the new Hero copy and in `AboutSection.tsx`; program label corrected from an invented "EICE" abbreviation to "BEI".
- Hero follow-up pass: the section previously forced `min-h-[95vh]` with the grid vertically centered inside it, which left large dead margins above and below a comparatively short, small-type content block. Dropped the forced min-height in favor of generous but content-driven padding (`py-24 md:py-32`), and scaled up type throughout (headline back to `text-4xl`–`text-6xl`, byline/body/quote/terminal text and the terminal's internal padding all increased) so the hero fills its space with real content and hierarchy rather than empty background.
- Hero: fixed the byline (photo + name/college) not scaling up at wider breakpoints like the rest of the hero, so it looked undersized next to the large headline on big screens. Added an `uptime` row to the terminal — calculated as calendar-accurate elapsed time since birth (June 23, 2006), e.g. `20y 0mo 16d`, recalculated on each render rather than a live-ticking session timer, per your call that a meaningful "journey" stat was preferable to a gimmick that resets on refresh. Added a small "// next up" card below the terminal referencing the real in-progress circuit-simulation project (without repeating its exact card title, to stay clear of the Skills/Projects redundancy `VISION.md`'s Content Strategy section warns against) — together these fill the terminal column's extra space on wide screens with real content instead of empty background.
- Hero polish pass: replaced the primary CTA "$ learn --more" (which scrolled to About — the same destination as "Explore More", making the two redundant) with "$ view --projects", scrolling to the homepage's Featured Projects section instead (`HeroSection` gained an `onProjectsClick` prop, wired in `Home.tsx` to the existing `projectsRef`). Fixed the blinking cursor next to the headline, which used Tailwind's `animate-pulse` (a smooth fade to 50% opacity) instead of a real on/off blink — added a proper `blink` keyframe/animation to `tailwind.config.ts` (hard cut via `steps(1)`, matching a real terminal cursor) and switched the cursor to use it. Reduced the hero's top padding (`pt-14 md:pt-20` instead of a symmetric `py-24 md:py-32`) to close the oversized gap under the sticky header.

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

