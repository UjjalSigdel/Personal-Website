import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

// The site's terminal-window chrome: three dots + a monospace title bar
// above dark content. Used for read-only "file" content (skills.yaml,
// faq.log, the Hero status terminal) — not for things visitors fill in.
export default function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div className={cn("rounded-lg border border-[#1f3a2b] bg-[#0B1710] overflow-hidden", className)}>
      <div className="flex items-center gap-2 px-4 py-3 bg-[#122318] border-b border-[#1f3a2b]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
        <span className="font-mono text-sm text-[#74a68a] ml-2">{title}</span>
      </div>
      {children}
    </div>
  );
}
