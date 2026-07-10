import { Switch, Route } from "wouter";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";

// The foundation's application shell. Design branches keep this structure —
// LazyMotion `strict` (a full `motion.*` component is a build-time error, so
// the bundle saving can't silently regress), MotionConfig honoring the
// user's reduced-motion preference, and code-split secondary routes — and
// supply their own route table composing their pages.
function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center px-6">
      <p>404 — nothing lives at this address.</p>
    </main>
  );
}

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
