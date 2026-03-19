import { Link } from "react-router-dom";
import { Phone, ArrowRight, Cable, CheckCircle2, ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const packages = [
  {
    name: "Essential",
    ideal: "Single-room upgrades or small renovations",
    includes: [
      "Cat6 Ethernet drops to key rooms",
      "Coax for primary TV locations",
      "Centralized patch panel in utility area",
      "Basic labeling & documentation",
    ],
    note: "Great starting point for homeowners adding a home office, media room, or upgrading internet reliability.",
  },
  {
    name: "Whole-Home",
    ideal: "Full renovations or new builds under 5,000 sq ft",
    includes: [
      "Cat6A to every room + outdoor access points",
      "Dedicated runs for security cameras & doorbell",
      "Pre-wire for in-wall/in-ceiling speakers",
      "HDMI/conduit for TV locations",
      "Structured media enclosure with power & ventilation",
      "Full as-built wiring documentation",
    ],
    note: "The most popular package for Vail Valley homes. Covers networking, AV, security, and automation from day one.",
    featured: true,
  },
  {
    name: "Estate",
    ideal: "Large homes, multi-building properties, or spec builds",
    includes: [
      "Everything in Whole-Home, plus:",
      "Fiber backbone between buildings/floors",
      "Redundant network pathways",
      "Pre-wire for motorized shades & lighting control",
      "Dedicated home theater conduit & speaker pre-wire",
      "Rack-ready structured media closet with HVAC planning",
      "Full coordination with architect, GC & electrician",
    ],
    note: "Designed for properties where technology infrastructure needs to match the caliber of the build.",
  },
];

const faqs = [
  {
    q: "When should I start planning pre-wire?",
    a: "Ideally during the design phase — before drywall goes up. The earlier we're involved, the cleaner and more cost-effective the installation. We coordinate directly with your GC and electrician.",
  },
  {
    q: "Can you wire an existing home?",
    a: "Yes. Retrofitting is more involved, but we do it regularly. We use existing pathways, attic/crawlspace access, and conduit to minimize drywall disruption.",
  },
  {
    q: "What's the difference between Cat6 and Cat6A?",
    a: "Cat6A supports 10-gigabit speeds over longer distances and has better shielding. For new construction, we recommend Cat6A — it costs slightly more now but future-proofs your home for years.",
  },
  {
    q: "Do I really need structured wiring if I have good Wi-Fi?",
    a: "Wi-Fi depends on wired infrastructure. Access points, security cameras, and streaming devices all perform better on hardwired connections. Structured wiring is the backbone that makes wireless reliable.",
  },
  {
    q: "How much does pre-wire typically cost?",
    a: "It depends on home size and scope. A single-room project might start around $500–$1,500, while whole-home pre-wire for new construction typically ranges from $5,000–$20,000+. We provide detailed proposals after a walkthrough.",
  },
];

const Walkthrough = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Structured Wiring & Pre-Wire Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes",
      "telephone": "+1-970-519-3013",
      "areaServed": "Vail Valley, Eagle County, Colorado",
    },
    "description":
      "Future-proof structured wiring and pre-wire services for new builds and renovations in Vail Valley and Eagle County.",
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <SEO
        title="Structured Wiring & Pre-Wire | Vail Valley"
        description="Future-proof your home with professional structured wiring. Pre-wire packages for new builds and renovations in Vail Valley & Eagle County."
        keywords="structured wiring, pre-wire, low voltage wiring, Vail Valley, Eagle County, smart home wiring, Cat6"
        schema={schema}
      />

      <Header />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
              <Cable className="w-5 h-5 text-accent" />
            </div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">
              Structured Wiring
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            The infrastructure behind every reliable smart home.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            Clean, organized low-voltage wiring is the foundation of every system we build. Whether you're breaking ground on a new home or renovating an existing one, getting the wiring right means everything else — audio, video, networking, security, automation — works the way it should.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* What We Run */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What We Install
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Every wire has a purpose
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Data & Networking",
                desc: "Cat6/Cat6A Ethernet to every room, outdoor access points, and centralized switching for seamless wired and wireless coverage.",
              },
              {
                title: "Audio & Video",
                desc: "Speaker wire for in-wall and in-ceiling speakers, HDMI conduit for TV locations, and pre-wire for whole-home AV distribution.",
              },
              {
                title: "Security & Cameras",
                desc: "Dedicated PoE runs for IP cameras, doorbell cameras, and sensor wiring for alarm and access control systems.",
              },
              {
                title: "Automation & Control",
                desc: "Low-voltage wiring for motorized shades, lighting keypads, control panels, and smart thermostats — all routed cleanly to a central hub.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-secondary/80 border border-white/8 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Future-Proofing Packages
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Choose the level of infrastructure that fits your project
          </h2>
          <p className="text-white/50 text-base mb-10 max-w-2xl">
            Every home is different. These packages give you a starting framework — we customize scope and pricing after walking your property.
          </p>

          <div className="grid lg:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 flex flex-col ${
                  pkg.featured
                    ? "border-accent/40 bg-accent/5"
                    : "border-white/8 bg-secondary/80"
                }`}
              >
                {pkg.featured && (
                  <span className="text-accent text-xs font-semibold uppercase tracking-wide mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="text-white font-bold text-xl mb-1">
                  {pkg.name}
                </h3>
                <p className="text-white/40 text-sm mb-5">{pkg.ideal}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-white/40 text-xs leading-relaxed border-t border-white/5 pt-4">
                  {pkg.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Our Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            From plans to patch panel
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                title: "Site Walkthrough",
                desc: "We review blueprints or walk the property to understand your goals and construction timeline.",
              },
              {
                n: "02",
                title: "Wiring Plan",
                desc: "You receive a detailed scope showing every run, drop location, and equipment spec — with clear pricing.",
              },
              {
                n: "03",
                title: "Rough-In",
                desc: "We install all low-voltage wiring before drywall, coordinating with your GC and electrician.",
              },
              {
                n: "04",
                title: "Trim & Testing",
                desc: "After drywall, we terminate, label, test every run, and hand over complete documentation.",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="text-accent/20 text-5xl font-bold absolute -top-2 -left-1">
                  {step.n}
                </span>
                <div className="pt-10">
                  <h3 className="text-white font-semibold text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Wiring Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/8 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-white font-medium text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-white/50 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Let's plan your wiring.
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Whether you're in the design phase or mid-build, we'll walk your property, review your plans, and give you a clear scope and price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Walkthrough;
