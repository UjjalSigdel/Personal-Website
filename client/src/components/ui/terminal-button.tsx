import { cva, type VariantProps } from "class-variance-authority";

// Class factory for the site's `$ command`-style buttons and links.
// A factory rather than a component so it works on <button>, <a>, and
// wouter's <Link> alike; pair with cn() when adding per-case overrides.
export const terminalButton = cva(
  "inline-flex items-center justify-center font-mono rounded-md border transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      tone: {
        solid: "bg-primary text-primary-foreground border-border-strong hover:bg-primary/70",
        soft: "bg-surface-raised text-primary-foreground border-border-strong hover:bg-primary",
        outline: "text-primary-foreground border-border-strong hover:bg-primary/40",
      },
      size: {
        sm: "text-sm px-3 py-2",
        md: "text-sm px-4 py-3",
        lg: "text-base font-bold px-6 py-3.5",
      },
    },
    defaultVariants: {
      tone: "soft",
      size: "sm",
    },
  },
);

export type TerminalButtonVariants = VariantProps<typeof terminalButton>;
