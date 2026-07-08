import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";

export default function Blog() {
  const [, setLocation] = useLocation();

  // Client-side routing preserves scroll position across navigations — start at
  // the top rather than wherever the previous page had scrolled to.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const goHomeSection = (hash: string) => () => setLocation(hash ? `/#${hash}` : "/");

  return (
    <div className="font-['Roboto'] text-gray-800 bg-[#0F172A] min-h-screen">
      <Header
        onHomeClick={goHomeSection("")}
        onAboutClick={goHomeSection("about")}
        onSkillsClick={goHomeSection("skills")}
        onProjectsClick={goHomeSection("projects")}
        onContactClick={goHomeSection("contact")}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={goHomeSection("")}
            className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-[#4ADE80] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            $ cd ..
          </button>

          {posts.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-16">
              <p className="font-mono text-sm text-[#5f8a71] mb-4">~/blog</p>
              <h1 className="font-mono text-3xl font-bold text-white mb-6">
                // under construction
              </h1>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Nothing published here yet — this page exists so the plumbing's
                ready for when there is. Got something you'd want me to write about?
              </p>
              <button
                onClick={goHomeSection("contact")}
                className="font-mono font-bold text-sm px-6 py-3.5 rounded-md bg-[#173626] text-[#6EE7A8] border border-[#2b5940] hover:bg-[#173626]/70 transition-colors"
              >
                $ contact --me
              </button>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <span className="inline-block text-[#4ADE80] font-medium mb-2">
                  THE BLOG
                </span>
                <h1 className="text-4xl font-['Inter'] font-bold text-white mb-4">
                  Notes &amp; Writing
                </h1>
                <div className="h-1 w-20 bg-[#4ADE80] mt-4"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-[#1E293B] rounded-lg p-6 border border-gray-800 flex flex-col"
                  >
                    <time className="text-xs text-gray-500 mb-2">{post.date}</time>
                    <h2 className="text-lg font-['Inter'] font-semibold text-white mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-[#4ADE80]/10 text-[#4ADE80]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer
        onHomeClick={goHomeSection("")}
        onAboutClick={goHomeSection("about")}
        onSkillsClick={goHomeSection("skills")}
        onProjectsClick={goHomeSection("projects")}
        onContactClick={goHomeSection("contact")}
      />
    </div>
  );
}
