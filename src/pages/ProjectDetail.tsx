import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Phone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgProjects from "../assets/bg-projects.jpg";
import { projects, projectCategories, locationSlug, projectLocationFilters } from "../data/projects";

const SITE_URL = "https://symphonysh.com";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // IntersectionObserver — fade-in images as they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imgRefs.current.indexOf(entry.target as HTMLImageElement);
            if (index !== -1) {
              setVisibleImages((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "100px" }
    );

    imgRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [slug]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const categoryLabels = project.categories.map((c) => {
    const found = projectCategories.find((cat) => cat.slug === c);
    return found?.label ?? c;
  });

  const locSlug = locationSlug(project.location);
  const locationFilter = projectLocationFilters.find((l) => l.slug === locSlug);

  // Unique meta description: scope + location + first three system tags so
  // each project page has its own snippet rather than repeating the scope.
  const systemSnippet = (project.systemsInstalled ?? []).slice(0, 3).join(", ");
  const metaDescription = systemSnippet
    ? `${project.scope} ${project.location}. Systems: ${systemSnippet}.`
    : `${project.scope} ${project.location}.`;

  // Image gallery schema — ImageGallery + ImageObject per photo. Caption
  // ties each image back to the project name so search engines can index
  // them with context.
  const imageGallerySchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${project.name} — Photos`,
    "description": metaDescription,
    "url": `${SITE_URL}/projects/${project.slug}`,
    "image": project.photos.map((src, i) => ({
      "@type": "ImageObject",
      "contentUrl": `${SITE_URL}${src}`,
      "name": `${project.name} — photo ${i + 1}`,
      "caption": `${project.name}, ${project.location}`,
    })),
  };

  return (
    <PageBackground image={bgProjects}>
      <SEO
        title={`${project.name} — ${project.location}`}
        description={metaDescription}
        keywords={`${project.name}, ${categoryLabels.join(", ")}, ${project.location}, smart home installation Vail Valley`}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Our Work", url: "/projects" }, { name: project.name, url: `/projects/${project.slug}` }]}
        ogImage={project.heroPhoto}
        ogType="article"
        schema={imageGallerySchema}
      />
      <Header />

      {/* Hero text */}
      <section className="pt-36 sm:pt-44 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryLabels.map((label) => (
              <span
                key={label}
                className="text-xs px-2.5 py-1 rounded bg-accent/20 text-accent font-medium"
              >
                {label}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-white">
            {project.name}
          </h1>
          <p className="text-white/50 text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent" /> {project.location}
          </p>
        </div>
      </section>

      {/* Hero photo */}
      <div className="px-4 sm:px-6 mb-10">
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/8">
          <div className="aspect-[16/9] relative">
            <img
              src={project.heroPhoto}
              alt={`${project.name} — ${categoryLabels.join(", ")} in ${project.location}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Content: gallery + sidebar */}
      <section className="py-8 px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Photo gallery — 2/3 */}
          <div className="md:col-span-2">
            <p className="text-accent font-medium text-xs uppercase tracking-widest mb-4">
              Project Photos
            </p>
            <div className="grid grid-cols-2 gap-3">
              {project.photos.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg overflow-hidden bg-black/30 border border-white/5 group"
                >
                  <img
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    src={photo}
                    alt={`${project.name} in ${project.location} — ${categoryLabels.join(", ")} install, photo ${i + 1}`}
                    className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-110 ${
                      visibleImages.has(i) ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — 1/3 */}
          <div className="space-y-5">
            {/* Project details */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-5">
              <p className="text-accent font-medium text-xs uppercase tracking-widest mb-4">
                Project Details
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Location</p>
                  <p className="text-white text-sm font-medium">{project.location}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Category</p>
                  <p className="text-white text-sm">{categoryLabels.join(", ")}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1.5">About This Project</p>
                  <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            </div>

            {/* Systems Installed — hidden when empty */}
            {project.systemsInstalled && project.systemsInstalled.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-5">
                <p className="text-accent font-medium text-xs uppercase tracking-widest mb-3">
                  Systems Installed
                </p>
                <ul className="space-y-1.5">
                  {project.systemsInstalled.map((system, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                      <span className="text-accent mt-0.5">·</span> {system}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Testimonial — hidden when null */}
            {project.testimonial && (
              <div className="bg-black/40 backdrop-blur-sm border border-accent/20 rounded-xl p-5">
                <p className="text-accent font-medium text-xs uppercase tracking-widest mb-3">
                  Client Review
                </p>
                <blockquote className="text-white/70 text-sm leading-relaxed italic mb-3">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-white text-sm font-medium">{project.testimonial.author}</p>
                <p className="text-white/40 text-xs">{project.testimonial.title}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related services — cross-links to service/platform pages this project demonstrates */}
      {project.relatedServices && project.relatedServices.length > 0 && (
        <section className="py-12 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent font-medium text-xs uppercase tracking-widest mb-2">
              Services this project demonstrates
            </p>
            <h2 className="text-white text-xl sm:text-2xl font-bold mb-6">
              Want this in your home?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.relatedServices.map((svc) => (
                <Link
                  key={svc.to}
                  to={svc.to}
                  className="group flex items-start justify-between gap-3 bg-black/40 backdrop-blur-sm border border-white/8 rounded-lg p-4 hover:border-accent/30 transition-colors"
                >
                  <div>
                    <p className="text-white font-medium text-sm group-hover:text-accent transition-colors">
                      {svc.label}
                    </p>
                    <p className="text-white/55 text-xs mt-0.5 leading-relaxed">{svc.reason}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>

            {locationFilter?.cityPath && (
              <p className="text-white/45 text-sm mt-6">
                More smart home work in this area:{" "}
                <Link to={locationFilter.cityPath} className="text-accent hover:underline">
                  Symphony in {locationFilter.label}
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      )}

      {/* More projects — same category, excluding current */}
      {(() => {
        const related = projects
          .filter(
            (p) =>
              p.slug !== project.slug &&
              p.categories.some((c) => project.categories.includes(c)),
          )
          .slice(0, 3);
        if (related.length === 0) return null;
        return (
          <section className="py-12 px-4 sm:px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
              <p className="text-accent font-medium text-xs uppercase tracking-widest mb-2">
                More like this
              </p>
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-6">
                Other {categoryLabels[0].toLowerCase()} projects
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="group block bg-black/40 backdrop-blur-sm border border-white/8 rounded-lg overflow-hidden hover:border-accent/30 transition-colors"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={p.heroPhoto}
                        alt={`${p.name} in ${p.location}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-white font-medium text-sm leading-snug">{p.name}</p>
                      <p className="text-white/45 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {p.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Like what you see?</h2>
          <p className="text-white/50 text-base mb-7 max-w-xl mx-auto">
            Schedule a walkthrough and we'll talk through what's possible for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/scheduling"
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

export default ProjectDetail;
