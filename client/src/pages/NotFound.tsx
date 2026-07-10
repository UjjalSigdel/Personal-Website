import { Link, useLocation } from "wouter";
import { usePageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site.config";
import TerminalWindow from "@/components/ui/terminal-window";
import { terminalButton } from "@/components/ui/terminal-button";

export default function NotFound() {
  const [location] = useLocation();

  usePageMeta({
    title: `404 — ${SITE.owner.name}`,
    description: "This page doesn't exist.",
    path: location,
    noindex: true,
  });

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] px-4">
      <TerminalWindow title="ujjal@sagarmatha:~" className="w-full max-w-xl">
        <div className="px-6 py-7 font-mono text-sm leading-loose">
          <p>
            <span className="text-[#4ADE80]">$</span>{" "}
            <span className="text-[#DCEFE3]">cd {location}</span>
          </p>
          <p className="text-[#f0a8a8]">
            bash: cd: {location}: No such file or directory
          </p>
          <p className="text-5xl font-bold text-white mt-4 mb-1">404</p>
          <p className="text-[#5f8a71] text-xs mb-6">
            // nothing lives at this address — it may have moved, or never existed
          </p>
          <p className="flex items-center">
            <Link href="/" className={terminalButton({ tone: "solid" })}>
              $ cd ~
            </Link>
            <span
              aria-hidden="true"
              className="inline-block w-2 h-4 bg-[#4ADE80] ml-2 animate-blink motion-reduce:animate-none"
            />
          </p>
        </div>
      </TerminalWindow>
    </main>
  );
}
