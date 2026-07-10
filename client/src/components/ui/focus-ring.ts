// The site-wide focus-visible treatment (the Phase 6 accessibility work),
// shared by every keyboard-focusable element that isn't a form field —
// one definition so the focus indicator can't drift between components.
// (Form inputs deliberately use a partial variant without the offset
// classes; see ContactSection's inputClass. NB: this file is in Tailwind's
// content scan — avoid bare utility-class words in comments here.)
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";
