import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Copy, Check } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Simple markdown-to-HTML converter (content is trusted)
function markdownToHtml(md: string): string {
  const lines = md.trim().split("\n");
  const html: string[] = [];
  let inList = false;

  const applyInline = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h2 class="text-white font-bold text-xl mt-8 mb-3">${line.slice(3)}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html.push('<ul class="list-disc list-inside space-y-1.5 mb-4 text-white/60 text-sm leading-relaxed">');
        inList = true;
      }
      html.push(`<li>${applyInline(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      if (inList) { html.push("</ul>"); inList = false; }
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<p class="text-white/60 text-sm leading-relaxed mb-4">${applyInline(line)}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const revealRef = useScrollReveal();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { "@type": "Person", name: "Matt Earley" },
        publisher: {
          "@type": "Organization",
          name: "Symphony Smart Homes",
          url: "https://symphonysh.com",
        },
      }
    : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-primary text-primary-foreground relative">
        <Header />
        <div className="pt-44 pb-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent hover:text-accent/80 text-sm transition-colors">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-primary-foreground relative">
      <SEO
        title={post.title}
        description={post.excerpt}
        ogType="article"
        schema={articleSchema}
        canonicalUrl={`https://symphonysh.com/blog/${post.slug}`}
      />

      <div className="relative z-10" ref={revealRef}>
        <Header />

        <article className="pt-36 sm:pt-44 pb-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">

            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Meta */}
            <div data-reveal className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/30 text-xs">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span className="text-white/30 text-xs">{formatDate(post.date)}</span>
            </div>

            {/* Title */}
            <h1 data-reveal className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            {/* Content */}
            <div
              data-reveal
              className="prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />

            {/* Share */}
            <div data-reveal className="mt-10 pt-8 border-t border-white/8 flex items-center justify-between flex-wrap gap-4">
              <span className="text-white/40 text-sm">Found this helpful?</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/50 hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="pb-20 px-4 sm:px-6 border-t border-white/8">
            <div className="max-w-2xl mx-auto pt-12">
              <h2 className="text-white font-semibold text-lg mb-6">More from the blog</h2>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group flex items-start gap-4 bg-black/30 border border-white/8 rounded-xl p-4 hover:border-accent/30 transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm leading-snug group-hover:text-white/80 transition-colors">
                        {p.title}
                      </p>
                      <p className="text-white/40 text-xs mt-1">{p.readTime}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-accent rotate-180 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
