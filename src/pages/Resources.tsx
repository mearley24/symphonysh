import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgAbout from "../assets/bg-about.jpg";
import { resourceGuides } from "../data/resourceGuides";
import { BUSINESS_URL } from "../constants/businessSchema";

const Resources = () => {
  return (
    <PageBackground image={bgAbout}>
      <SEO
        title="Resources & Guides"
        description="Practical smart home guides for Vail Valley homeowners and builders — comparisons, pre-wire checklists, and scene design from Symphony Smart Homes."
        canonicalUrl={`${BUSINESS_URL}/resources`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-accent" />
            <p className="text-accent font-medium text-sm tracking-wide uppercase">
              Resources & guides
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Short, useful guides for picking the right setup.
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
            Practical comparisons, checklists, and scene design from real Vail Valley projects. Pick what's relevant — none of these are long reads.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Guides
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Pick a topic
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {resourceGuides.map((g) => (
              <Link
                key={g.slug}
                to={`/resources/${g.slug}`}
                className="group bg-black/40 backdrop-blur-sm border border-white/8 hover:border-accent/40 rounded-xl p-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    {g.hubLabel || g.headline}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors mt-1 shrink-0" />
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  {g.hubDescription || g.subheadline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Not sure where to start
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Try the Setup Finder.
          </h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            Six questions about the house. We'll point you at the platform direction that fits the home you actually have.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Find the Right Setup <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Resources;
