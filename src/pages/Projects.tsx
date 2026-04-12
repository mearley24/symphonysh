import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgProjects from "../assets/bg-projects.jpg";
import { projects, projectCategories } from "../data/projects";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayedProjects, setDisplayedProjects] = useState(projects);
  const [animatingOut, setAnimatingOut] = useState(false);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  const handleFilterChange = useCallback(
    (slug: string) => {
      if (slug === activeFilter) return;
      setAnimatingOut(true);

      // After exit animation, swap data and animate in
      setTimeout(() => {
        setActiveFilter(slug);
        const next =
          slug === "all"
            ? projects
            : projects.filter((p) => p.categories.includes(slug));
        setDisplayedProjects(next);
        setAnimatingOut(false);
      }, 200);
    },
    [activeFilter],
  );

  // IntersectionObserver for card fade-in on scroll
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  useEffect(() => {
    setVisibleCards(new Set());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLAnchorElement);
            if (idx !== -1) {
              setVisibleCards((prev) => new Set(prev).add(idx));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "60px" },
    );
    // Small delay so refs are populated after render
    requestAnimationFrame(() => {
      cardRefs.current.forEach((el) => {
        if (el) observer.observe(el);
      });
    });
    return () => observer.disconnect();
  }, [displayedProjects]);

  return (
    <PageBackground image={bgProjects}>
      <SEO
        title="Our Work | Smart Home Projects in Vail Valley"
        description="Browse our portfolio of smart home installations: home theaters, TV mounting, and structured wiring across Vail Valley and Eagle County."
        keywords="smart home portfolio, home theater, TV mounting, wiring, Vail Valley"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Our Work", url: "/projects" }]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Our Work</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Real projects. Real homes. Vail Valley.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl hero-subtext-shadow">
            Browse photos from recent installations across Eagle County — home theaters, TV mounts,
            and structured wiring for new construction and renovations.
          </p>
        </div>
      </section>

      {/* Hero-to-content divider */}
      <div className="hero-divider w-full" />

      {/* Filter + Project Cards */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {projectCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleFilterChange(cat.slug)}
                className={`px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.slug
                    ? "bg-accent text-white shadow-md shadow-accent/20"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/8"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {displayedProjects.map((project, i) => (
              <Link
                key={project.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                to={`/projects/${project.slug}`}
                className={`group block bg-black/40 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300
                  border-white/8 hover:border-accent/20
                  hover:shadow-xl hover:shadow-black/30
                  ${animatingOut
                    ? "opacity-0 scale-95"
                    : visibleCards.has(i)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                style={{
                  transitionDelay: animatingOut ? "0ms" : `${i * 50}ms`,
                  transitionDuration: animatingOut ? "200ms" : "300ms",
                }}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={project.heroPhoto}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/50 group-hover:via-black/10" />
                  {/* Category tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {project.categories.map((cat) => {
                      const found = projectCategories.find((c) => c.slug === cat);
                      return found ? (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 rounded bg-accent/80 text-white font-medium backdrop-blur-sm"
                        >
                          {found.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-1">{project.name}</h3>
                  <p className="text-white/45 text-xs flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">{project.scope}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    View project <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            {displayedProjects.length === 0 && (
              <div className="col-span-2 text-center py-12 text-white/40 text-sm">
                No projects in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start your project?
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Whether it's a single TV mount or a full-home system, we'd love to help. Get in touch
            to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/walkthrough"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Projects;
