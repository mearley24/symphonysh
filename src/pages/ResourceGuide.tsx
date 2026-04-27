import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgAbout from "../assets/bg-about.jpg";
import { resourceGuides } from "../data/resourceGuides";
import { BUSINESS_URL } from "../constants/businessSchema";

const ResourceGuide = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = resourceGuides.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/resources" replace />;
  }

  const canonical = `${BUSINESS_URL}/resources/${guide.slug}`;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.metaTitle,
    description: guide.metaDescription,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "Symphony Smart Homes",
      url: BUSINESS_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Symphony Smart Homes",
      url: BUSINESS_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const schedulingHref = guide.schedulingService
    ? `/scheduling?service=${encodeURIComponent(guide.schedulingService)}`
    : "/scheduling";

  return (
    <PageBackground image={bgAbout}>
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonicalUrl={canonical}
        ogType="article"
        schema={[articleSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: guide.metaTitle, url: `/resources/${guide.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-accent" />
            <p className="text-accent font-medium text-sm tracking-wide uppercase">
              {guide.eyebrow}
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            {guide.headline}
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            {guide.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={schedulingHref}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Try Setup Finder
            </Link>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Quick recommendation */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Quick recommendation
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Who each one fits
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guide.recommendations.map((rec, i) => {
              const inner = (
                <>
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <h3 className="text-white font-semibold text-base sm:text-lg">
                      {rec.label}
                    </h3>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed pl-8">
                    {rec.fits}
                  </p>
                </>
              );
              const className =
                "block p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm" +
                (rec.href
                  ? " hover:border-accent/40 transition-colors"
                  : "");
              return rec.href ? (
                <Link key={i} to={rec.href} className={className}>
                  {inner}
                </Link>
              ) : (
                <div key={i} className={className}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      {guide.comparisonColumns && guide.comparisonRows && (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              At a glance
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Compare
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[640px] px-4 sm:px-0">
                <table className="w-full border-separate border-spacing-0 text-left">
                  <thead>
                    <tr>
                      {guide.comparisonColumns.map((col, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 border-b border-white/10 text-white/85 font-semibold text-sm bg-black/40 backdrop-blur-sm"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.comparisonRows.map((row, ri) => (
                      <tr key={ri}>
                        <td className="px-4 py-4 border-b border-white/8 text-white font-medium text-sm align-top bg-black/30">
                          {row.label}
                        </td>
                        {row.cells.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-4 py-4 border-b border-white/8 text-white/65 text-sm align-top leading-relaxed"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Checklist */}
      {guide.checklist && guide.checklist.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              Checklist
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              What to plan for
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {guide.checklist.map((group, gi) => (
                <div
                  key={gi}
                  className="rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm p-5"
                >
                  <h3 className="text-white font-semibold text-base mb-4">
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-white/65 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Walkthrough questions */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Walkthrough
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            What to ask during a walkthrough
          </h2>
          <p className="text-white/55 text-base mb-8 max-w-2xl">
            Bring these questions when we walk the home — or when you're talking with an architect, GC, or designer.
          </p>
          <div className="space-y-3">
            {guide.walkthroughQuestions.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border border-white/6 bg-white/[0.02]"
              >
                <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-white/75 text-sm leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Related
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Where to go next
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guide.relatedLinks.map((link) => (
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
            {guide.faqs.map((faq) => (
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
            Tell us about the home.
          </h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            Fastest path to a real answer: a walkthrough. We'll match the platform to the home and the way you actually live in it.
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
          <div className="mt-8">
            <Link
              to="/resources"
              className="text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              ← Back to all guides
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default ResourceGuide;
