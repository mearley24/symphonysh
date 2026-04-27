import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import { localLandingPages } from "../data/localLandingPages";
import bgAbout from "../assets/bg-about.jpg";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE_E164,
  BUSINESS_URL,
  BUSINESS_AREA_SERVED_PLACES,
} from "../constants/businessSchema";

const LocalLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = localLandingPages.find((p) => p.slug === slug);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  const canonical = `${BUSINESS_URL}/service-areas/${page.slug}`;

  const localBusinessSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    url: BUSINESS_URL,
    telephone: BUSINESS_PHONE_E164,
    description: page.metaDescription,
    areaServed: BUSINESS_AREA_SERVED_PLACES,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const schedulingHref = page.schedulingService
    ? `/scheduling?service=${encodeURIComponent(page.schedulingService)}`
    : "/scheduling";

  return (
    <PageBackground image={bgAbout}>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription}
        canonicalUrl={canonical}
        schema={[localBusinessSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: page.metaTitle, url: `/service-areas/${page.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-accent" />
            <p className="text-accent font-medium text-sm tracking-wide uppercase">
              {page.eyebrow}
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            {page.headline}
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            {page.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={schedulingHref}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              onClick={trackPhoneClick}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Best fit */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Best fit
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Who this page is for
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.bestFit.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-white/75 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Local context
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why it matters in the Vail Valley
          </h2>
          <p className="text-white/65 text-base leading-relaxed max-w-3xl mb-10">
            {page.localContext}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {page.localScenarios.map((scenario, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border border-white/6 bg-white/[0.02]"
              >
                <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-1" />
                <p className="text-white/65 text-sm leading-relaxed">{scenario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related platforms / services */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Related
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Platforms and services we use here
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group bg-black/40 backdrop-blur-sm border border-white/8 hover:border-accent/40 rounded-xl p-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    {link.label}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors mt-1 shrink-0" />
                </div>
                {link.description && (
                  <p className="text-white/55 text-sm leading-relaxed">
                    {link.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Questions
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Frequently asked
          </h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm p-5"
              >
                <summary className="flex items-start justify-between gap-3 cursor-pointer text-white font-medium text-base list-none">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-1 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-white/65 text-sm leading-relaxed mt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            When you're ready
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Tell us about the project.
          </h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            We work this side of the valley every week. Send the property and how you live in it — we'll suggest the line that fits and walk through the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={schedulingHref}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              onClick={trackPhoneClick}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default LocalLandingPage;
