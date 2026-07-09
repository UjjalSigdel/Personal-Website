import { cva, type VariantProps } from "class-variance-authority";

// Class factory for the site's `$ command`-style buttons and links.
// A factory rather than a component so it works on <button>, <a>, and
// wouter's <Link> alike; pair with cn() when adding per-case overrides.
export const terminalButton = cva(
  "inline-flex items-center justify-center font-mono rounded-md border transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      tone: {
        solid: "bg-[#173626] text-[#6EE7A8] border-[#2b5940] hover:bg-[#173626]/70",
        soft: "bg-[#122318] text-[#6EE7A8] border-[#2b5940] hover:bg-[#173626]",
        outline: "text-[#6EE7A8] border-[#2b5940] hover:bg-[#173626]/40",
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
