import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgAbout from "../assets/bg-about.jpg";
import { localLandingPages } from "../data/localLandingPages";
import { cityPages } from "../data/cityPages";
import { BUSINESS_URL } from "../constants/businessSchema";

const ServiceAreasIndex = () => {
  return (
    <PageBackground image={bgAbout}>
      <SEO
        title="Service Areas — Vail Valley & Eagle County"
        description="Where Symphony Smart Homes works: Vail, Beaver Creek, Edwards, Avon, Eagle, and the surrounding Eagle County area. Local service-area pages by city and service."
        canonicalUrl={`${BUSINESS_URL}/service-areas`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
        ]}
      />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-accent" />
            <p className="text-accent font-medium text-sm tracking-wide uppercase">
              Eagle County, Colorado
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Service areas across the Vail Valley.
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
            We work the whole valley — Vail to Eagle and the towns in between. Pick the city or service nearest the project and we'll meet you there.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Service-specific local pages */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            By service
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            High-intent local pages
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {localLandingPages.map((p) => (
              <Link
                key={p.slug}
                to={`/service-areas/${p.slug}`}
                className="group bg-black/40 backdrop-blur-sm border border-white/8 hover:border-accent/40 rounded-xl p-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    {p.metaTitle}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors mt-1 shrink-0" />
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  {p.subheadline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* City pages */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            By city
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Cities we serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityPages.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="group bg-black/40 backdrop-blur-sm border border-white/8 hover:border-accent/40 rounded-xl p-5 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent text-xs uppercase tracking-wide">
                    Vail Valley
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
                  {c.city}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {c.subheadline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Ready when you are
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Tell us about the home.
          </h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            We'll meet you on-site, walk the property, and lay out what fits — no pressure to commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Find the Right Setup
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default ServiceAreasIndex;
