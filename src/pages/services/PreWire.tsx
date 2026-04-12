import { Link } from "react-router-dom";
import { Cable, ArrowLeft, ArrowRight, Phone, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { schemaProviderLocalBusiness } from "@/constants/businessSchema";

import PageBackground from "@/components/PageBackground";
import bgPrewire from "../../assets/bg-prewire.jpg";

const capabilities = [
  { title: "New Construction Pre-Wire", desc: "Structured cabling installed during the rough-in phase — speaker wire, Cat6, coax, HDMI, and control wiring planned around your floor plan." },
  { title: "Retrofit & Renovation", desc: "Adding smart home wiring to an existing home. We route cables through walls, attics, and crawl spaces with minimal disruption." },
  { title: "Structured Panels & Racks", desc: "Clean, labeled termination in a central wiring closet or structured media panel — organized for easy troubleshooting and future expansion." },
  { title: "Builder & GC Coordination", desc: "We work directly with your general contractor, electrician, and architect to ensure every wire run is planned before drywall goes up." },
];

const benefits = [
  "Future-proof your home for evolving technology",
  "Eliminate visible cables and clutter",
  "Support whole-home audio, video distribution, and networking",
  "Reduce installation costs by wiring during construction",
  "Clean, labeled terminations for easy maintenance",
  "One team from pre-wire through final programming",
];

const faqs = [
  { q: "When should pre-wire happen during construction?", a: "Ideally during the rough-in phase, after framing is complete but before insulation and drywall. This gives us full access to wall cavities, ceiling joists, and conduit paths." },
  { q: "What types of cable do you install?", a: "We install Cat6/Cat6a for networking, 14/2 and 16/4 speaker wire for audio, RG6 coax for satellite/antenna, HDMI and fiber for video distribution, and low-voltage control wiring for keypads and sensors." },
  { q: "Can you add wiring to an existing home?", a: "Yes. We pre-wire and retrofit with as little drywall damage as possible. We use existing pathways, attic and crawl space access, and conduit runs to get cables where they need to go. Surface-mount raceways are only used as a last resort or when specifically requested by the client." },
  { q: "Do you work with our builder or GC?", a: "Absolutely. We coordinate directly with your construction team. We review plans, attend walk-throughs, and schedule our work around the build timeline." },
  { q: "How much does pre-wiring cost?", a: "It depends on the size of the home and scope of the system. A typical new-build pre-wire ranges from $3,000 to $15,000+. We provide a detailed proposal after reviewing your plans." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pre-Wire & Structured Wiring",
  "provider": schemaProviderLocalBusiness,
  "description": "Professional pre-wire and structured cabling for new construction and renovations in Vail Valley. Speaker wire, Cat6, HDMI, and control wiring installed during rough-in.",
  "serviceType": "Pre-Wire & Structured Wiring",
};

const PreWire = () => (
  <PageBackground image={bgPrewire}>
    <SEO
      title="Pre-Wire & Structured Cabling | Vail Valley"
      description="Pre-wiring for new construction and retrofits in Eagle County. Cat6, speaker wire, HDMI, and low-voltage cabling done right the first time."
      keywords="pre-wiring new construction, structured cabling Vail Valley, low voltage wiring Eagle County"
      schema={serviceSchema}
      breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Pre-Wire", url: "/services/prewire" }]}
    />
    <Header />

    {/* Hero */}
    <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All Services
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
            <Cable className="w-6 h-6 text-accent" />
          </div>
          <p className="text-accent font-medium text-sm tracking-wide uppercase">Pre-Wire & Structured Wiring</p>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">Pre-Wire & Structured Wiring</h1>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 hero-subtext-shadow">
          Future-proof your new build or renovation with clean, organized low-voltage wiring for audio, video, networking, and automation — installed by a team that understands the full system.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/scheduling?service=Pre-Wire" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-7 py-4 rounded-lg transition-colors text-base">
            Schedule a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium px-7 py-4 rounded-lg transition-colors text-base">
            <Phone className="w-4 h-4" /> (970) 519-3013
          </a>
        </div>
      </div>
    </section>

    {/* Capabilities */}
    <section className="py-16 sm:py-24 border-y border-white/5 bg-black/20 backdrop-blur-sm px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Do</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Wiring Done Right the First Time</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => (
            <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why It Matters</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">The Foundation of Every Great System</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 sm:py-24 bg-black/20 backdrop-blur-sm border-y border-white/5 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Common Questions</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Pre-Wire FAQ</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl">
              <summary className="flex items-center gap-3 cursor-pointer p-5 text-white font-medium text-sm sm:text-base list-none [&::-webkit-details-marker]:hidden">
                <HelpCircle className="w-4 h-4 text-accent shrink-0" />
                {faq.q}
              </summary>
              <div className="px-5 pb-5 pt-0 text-white/50 text-sm leading-relaxed pl-12">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Planning a Build?</h2>
        <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
          Let's review your plans and make sure every wire is accounted for before drywall goes up.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/scheduling?service=Pre-Wire" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-7 py-4 rounded-lg transition-colors text-base">
            Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium px-7 py-4 rounded-lg transition-colors text-base">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </PageBackground>
);

export default PreWire;