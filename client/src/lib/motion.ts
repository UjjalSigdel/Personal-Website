import type { Variants } from "framer-motion";

// Shared scroll-reveal variants used by the homepage sections:
// a parent `staggerContainer` fades in and staggers its children,
// each child rising with `fadeUpItem`.

export function staggerContainer(staggerChildren = 0.2): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren },
    },
  };
}

export function fadeUpItem(duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  };
}
