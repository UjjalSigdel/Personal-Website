import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useHomeSectionNavigate } from "@/lib/navigation";

interface SubPageLayoutProps {
  children: ReactNode;
  /** Where `$ cd ..` goes — defaults to the homepage. */
  backTo?: string;
  /** Document title for this page. */
  title?: string;
}

// Shared shell for secondary pages (/projects, /blog, ...): Header/Footer
// wired to navigate back to the homepage's sections, a `$ cd ..` back link,
// and scroll-to-top on mount (client-side routing otherwise preserves the
// previous page's scroll position).
export default function SubPageLayout({ children, backTo, title }: SubPageLayoutProps) {
  const navigate = useHomeSectionNavigate();
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <div className="text-gray-800 bg-[#0F172A] min-h-screen">
      <Header onNavigate={navigate} />

      <main id="main-content" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => (backTo ? setLocation(backTo) : navigate("home"))}
            className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-[#4ADE80] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            $ cd ..
          </button>

          {children}
        </div>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
