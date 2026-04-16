import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Blog = () => {
  const revealRef = useScrollReveal();

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground relative">
      <SEO
        title="Blog | Smart Home Tips for Vail Valley"
        description="Smart home tips, pre-wire guides, and AV integration insights for homeowners and builders in Vail Valley and Eagle County, Colorado."
        keywords="smart home blog, pre-wire guide, home automation tips, Vail Valley, Eagle County"
        canonicalUrl="https://symphonysh.com/blog"
      />

      <div className="relative z-10" ref={revealRef}>
        <Header />

        {/* Page header */}
        <section className="pt-36 sm:pt-44 pb-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="mb-10">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Resources</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Blog</h1>
              <p className="text-white/50 text-base max-w-xl">
                Smart home tips, pre-wire guides, and AV insights for homeowners and builders in the Vail Valley.
              </p>
            </div>

            {/* Post cards */}
            <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 hover:bg-gradient-to-br hover:from-accent/5 hover:to-transparent transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white/30 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-white/90 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <p>No posts yet — check back soon.</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;
