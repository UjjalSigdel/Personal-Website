import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Secondary pages are code-split — only the homepage ships in the main bundle.
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <span className="font-mono text-sm text-faint">$ loading…</span>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    // `strict` makes any leftover full `motion.*` component a build-time error,
    // so the LazyMotion bundle saving can't silently regress.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Router />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
