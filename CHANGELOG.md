# Changelog

This file records significant project changes.

Follow the format below.

---

## Unreleased

### Added

- `/projects` page: the full project archive with category filtering (Electronics / Programming / Web Development), per `ROADMAP.md` Phase 4 and `VISION.md`'s homepage/archive split.
- `client/src/lib/projects.ts`: single shared, typed project data source used by both the homepage's featured section and the new archive page (replaces the duplicated inline project array).
- `/blog` page: shows an honest "under construction" state (no fake posts) with a link back to Contact for post suggestions. `client/src/lib/posts.ts` defines a typed, empty `BlogPost[]` — the page automatically switches to a real post grid once entries are added, mirroring the `lib/projects.ts` pattern. No new nav entry, consistent with `VISION.md`'s Navigation section: reachable only via the new blog card in About.

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
- Header redesigned ("Status Bar" direction): the plain `border-gray-800` bottom border is now a green-tinted `border-[#1f4a34]`, echoing the terminal's accent elsewhere on the site. A small green status dot (matching the terminal's `status: learning` indicator) now sits before the logo. Nav items dropped the gray hover-pill background in favor of a small monospace `>` marker that fades in on hover, on both the desktop nav and the mobile dropdown. No blinking/motion added here deliberately, since the blinking cursor is already used in the Hero and doesn't need repeating in a persistent, always-visible element.
- Header logo replaced with `~/ujjal` in the same monospace font as the Hero, dropping the two-tone gradient "U"/"S" treatment (a generic template-logo pattern that didn't tie into anything else on the site).
- Mobile nav rebuilt as a right-side sliding drawer with a dismissible backdrop, replacing the old inline dropdown that pushed content down from the top (hard to reach one-handed on tall phones). Body scroll locks while the drawer is open. Found and fixed a real bug during this: the drawer/backdrop were originally nested inside `<header>`, but the header's `backdrop-blur-sm` (a `backdrop-filter`) makes it a containing block for `fixed`-positioned descendants — this silently confined the "full-screen" backdrop to the header's own ~60px bounding box instead of the viewport, so clicking outside the drawer did nothing. Fixed by moving the backdrop and drawer to be siblings of `<header>` instead of children.
- Footer redesigned ("Sign-off / EOF" direction): the first column repeated the exact "second-year Electronic and Information Communication Engineering student..." sentence already said in Hero and About, under the same two-tone gradient name treatment Header just moved away from. Replaced with `~/ujjal` (matching the header wordmark) plus a small monospace sign-off (`$ echo "thanks for scrolling this far"` / `// EOF`), and the Resume link is now styled as a terminal-style command button (`$ download --resume`) instead of a plain text+icon link. Quick Links now get the header's green `>` hover marker in place of the old `hover:translate-x-1` slide, for consistency between the two navs. Contact, Connect With Me, and the copyright line are untouched per your call that they were already good. Removed the now-unused `Download` icon import.
- About section redesigned ("Split Panel"): the bio paragraph and "Education" card repeated facts (age, program, college, SEIS) already stated in the Hero terminal, and the "Technical Focus Areas" 4-icon grid overlapped Skills — flagged by `VISION.md`'s Content Strategy section ("About should introduce who I am, my interests, and my goals without repeating my resume"). "Who am I?" is kept but trimmed to 2–3 lines, followed by two first-person numbered statements about how I work (dropping the "Interests" card and the icon grid entirely). The right column is now the new "// the blog" teaser card linking to `/blog`, sized to its own content (`items-start`, not stretched to match the taller left column — an artificial "increase to fill empty space" I initially got wrong and corrected).
- About section follow-up: kept the "MY JOURNEY IN TECH" eyebrow as-is, but replaced the "Unleashing potential through learning" heading copy (generic, and paired with a decorative underline bar left over from the pre-redesign template) with "Still figuring things out" — no bar, and it echoes "still figuring out" already used in the paragraph right below it. "A few things about me" is now a real prominent heading (was small gray label text) followed by the full proposed subtitle line ("...if not yet about what I've built."). The résumé link is now styled as the same terminal command button (`$ download --resume`) used in the footer, replacing the old bordered icon+text link. "Who am I?" also changed from the leftover blue (`#3B82F6`) to the site's single accent green (`#4ADE80`), matching the eyebrow, numbered markers, and every other accent on the page.
- `/projects` and `/blog` had no way back to the homepage other than the browser's own back button. Added a `$ cd ..` link (with a left arrow) at the top-left of both pages' content, styled consistently with the terminal-command language used everywhere else on the site.
- Contact section restyled to match the current theme (no structural changes to the form or FAQ content, per your call). Dropped the eyebrow+heading+underline-bar pattern's decorative bar, same as Hero/About. The form stays a conventional card — green-tinted input borders/focus rings and a command-styled submit button (`$ send --message` / `$ sending...` / `$ message sent`) — since it's something visitors fill in and shouldn't be disguised as a terminal. The FAQ card became a full terminal window (`faq.log` title bar, `Q:`/answer log-line styling) since it's read-only content, safe to be more playful. While wiring the focus ring color, found that shadcn's `Input`/`Textarea` set their own default via `focus-visible:ring-ring`, and my first pass used the `focus:` variant instead of `focus-visible:` — same property, different variant, so `tailwind-merge` didn't dedupe them and the old blue ring kept winning the cascade. Fixed by matching the component's own `focus-visible:` variant.
- `faq.log` card text bumped up a size across the board (title bar `text-xs`→`text-sm`, questions `text-xs`→`text-sm`, answers `text-sm`→`text-base`) — it read a little small next to the form.

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

