import { Link } from "react-router-dom";
import { Cable, ArrowLeft, ArrowRight, Phone, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

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
  { q: "Can you add wiring to an existing home?", a: "Yes. Retrofitting is more involved but we do it regularly. We use existing pathways, attic and crawl space access, and sometimes surface-mount raceways to get cables where they need to go." },
  { q: "Do you work with our builder or GC?", a: "Absolutely. We coordinate directly with your construction team. We review plans, attend walk-throughs, and schedule our work around the build timeline." },
  { q: "How much does pre-wiring cost?", a: "It depends on the size of the home and scope of the system. A typical new-build pre-wire ranges from $3,000 to $15,000+. We provide a detailed proposal after reviewing your plans." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pre-Wire & Structured Wiring",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Symphony Smart Homes",
    "areaServed": "Vail Valley, Eagle County, Colorado",
  },
  "description": "Professional pre-wire and structured cabling for new construction and renovations in Vail Valley. Speaker wire, Cat6, HDMI, and control wiring installed during rough-in.",
  "serviceType": "Pre-Wire & Structured Wiring",
};

const PreWire = () => (
  <PageBackground image={bgPrewire}>
    <SEO
      title="Pre-Wire & Structured Wiring | Symphony Smart Homes"
      description="Professional pre-wire and structured cabling for new builds and renovations in Vail Valley. Clean, organized low-voltage wiring for audio, video, networking, and automation."
      keywords="pre-wire, structured wiring, low voltage, new construction, Vail Valley, Eagle County, Cat6, speaker wire"
      schema={serviceSchema}
    />
    <Header />

    {/* Hero */}
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All Services
        </Link>
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
          <Cable className="w-6 h-6 text-accent" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Pre-Wire & Structured Wiring</h1>
        <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
          Future-proof your new build or renovation with clean, organized low-voltage wiring for audio, video, networking, and automation — installed by a team that understands the full system.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/scheduling?service=Pre-Wire" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Schedule a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            <Phone className="w-4 h-4" /> (970) 519-3013
          </a>
        </div>
      </div>
    </section>

    {/* Capabilities */}
    <section className="py-16 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Do</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Wiring Done Right the First Time</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => (
            <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-16 bg-black/20 backdrop-blur-sm border-y border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why It Matters</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">The Foundation of Every Great System</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Common Questions</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Pre-Wire FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl">
              <summary className="flex items-center gap-3 cursor-pointer p-5 text-white font-medium text-sm list-none [&::-webkit-details-marker]:hidden">
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
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Planning a Build?</h2>
        <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
          Let's review your plans and make sure every wire is accounted for before drywall goes up.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/scheduling?service=Pre-Wire" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </PageBackground>
);

export default PreWire;
