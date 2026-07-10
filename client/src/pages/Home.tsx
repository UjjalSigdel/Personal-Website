import { usePageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site.config";

// main's placeholder page. The engineering foundation deliberately has no
// visual identity (FOUNDATION.md §7) — design branches replace this route
// with their own composition. This page only needs to build, render
// legibly, and say what main is.
export default function Home() {
  usePageMeta({ path: "/" });

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background text-foreground font-sans px-6 py-16"
    >
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">{SITE.title}</h1>
        <p>
          This is the <code>main</code> branch — the engineering foundation of
          this repository: backend, shared logic and configuration,
          design-system primitives, the theme contract, and content. No visual
          identity lives here.
        </p>
        <p>
          The public website is built from a design branch. See{" "}
          <code>FOUNDATION.md</code> for the architecture and{" "}
          <code>ARCHITECTURE.md</code> for the current structure.
        </p>
      </div>
    </main>
  );
}
