import SubPageLayout from "@/components/SubPageLayout";
import { terminalButton } from "@/components/ui/terminal-button";
import { cn } from "@/lib/utils";
import { useHomeSectionNavigate } from "@/lib/navigation";
import { posts } from "@/lib/posts";

export default function Blog() {
  const navigate = useHomeSectionNavigate();

  return (
    <SubPageLayout title="Blog — Ujjal Sigdel">
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
            onClick={() => navigate("contact")}
            className={cn(terminalButton({ tone: "solid", size: "lg" }), "text-sm")}
          >
            $ contact --me
          </button>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <span className="inline-block font-mono text-xs tracking-wider uppercase text-[#4ADE80] mb-2">
              The Blog
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">
              Notes &amp; Writing
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#1E293B] rounded-lg p-6 border border-gray-800 flex flex-col"
              >
                <time className="text-xs text-gray-500 mb-2">{post.date}</time>
                <h2 className="text-lg font-semibold text-white mb-2">
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
    </SubPageLayout>
  );
}
