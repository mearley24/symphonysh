import { Link } from "react-router-dom";
import { Phone, ArrowRight, Cable, Home, Wrench, ScanLine, CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import SocialProof from "../components/SocialProof";
import SEO from "../components/SEO";
import heroImage from "../assets/hero-smart-home.jpg";
import { localBusinessHomePageSchema } from "../constants/businessSchema";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const revealRef = useScrollReveal();

  const services = [
    {
      icon: Home,
      title: "Smart Home Integration",
      description: "Full-home automation with Control4 — lighting, audio, climate, security, and shades all working together from one interface.",
      link: "/services",
    },
    {
      icon: Cable,
      title: "Pre-Wire & New Construction",
      description: "Future-proof your new build or renovation with clean, organized low-voltage wiring for audio, video, networking, and automation.",
      link: "/services/prewire",
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Keep your systems running smoothly. We diagnose issues, update firmware, and resolve problems — on-site or remotely.",
      link: "/services/maintenance",
    },
    {
      icon: ScanLine,
      title: "Matterport 3D Scanning",
      description: "Immersive 3D virtual tours for real estate listings, construction documentation, and property records.",
      link: "/matterport",
    },
  ];

  const steps = [
    { number: "01", title: "Consultation", description: "We discuss your goals, walk the property, and understand how you actually live in your home." },
    { number: "02", title: "Design & Proposal", description: "You receive a clear scope of work with transparent pricing — no surprises." },
    { number: "03", title: "Installation", description: "Our team handles wiring, mounting, and programming with minimal disruption to your schedule." },
    { number: "04", title: "Training & Handoff", description: "We walk you through everything until you're comfortable, then provide ongoing support." },
  ];

  const differentiators = [
    { title: "Local to Vail Valley", description: "We live and work here. We understand mountain construction, altitude challenges, and the expectations of homeowners in this market." },
    { title: "One Point of Contact", description: "You work directly with us from start to finish — no subcontractors, no finger-pointing, no runaround." },
    { title: "Built for the Long Term", description: "We design systems that are easy to maintain and upgrade. No proprietary lock-in, no orphaned technology." },
    { title: "Responsive Support", description: "When something needs attention, we answer the phone. Remote diagnostics and on-site service when you need it." },
  ];

  const faqs = [
    { q: "How much does a smart home project usually run?", a: "It really comes down to scope. A focused room or two might land around $1,500+, while a full new-build system often falls in the $15,000–$80,000+ range. After we walk the job and understand what you want, we'll put numbers in a proposal so you're not guessing." },
    { q: "Do you work with builders and GCs?", a: "Yes — a lot of what we do is pre-wire and rough-in during construction. We'll line up with your GC, electrician, and architect so low-voltage isn't an afterthought." },
    { q: "Can you work in an existing home, or only new construction?", a: "Both. Retrofits are common here. Sometimes we're fishing wire through attics and crawl spaces; other times it's cleaner. We've done everything from condos to large mountain homes." },
    { q: "What brands do you install?", a: "We're not married to one logo. We pick what fits the house and how you'll use it. You'll see a lot of Control4, Sonos, Lutron, Sonance, Araknis, and others — whatever matches the job and budget." },
    { q: "How long does an install take?", a: "Small jobs — a TV mount, a few speakers — can be a few hours. A whole-home job on a build is phased: pre-wire early, then trim-out and programming as the house comes together. Ballpark 3–6 months from rough-in to final handoff on a full system, depending on the build schedule." },
    { q: "Do you offer ongoing support?", a: "Yes. We have maintenance options and we're available for one-off service when something acts up. Quite a bit we can sort out remotely before we roll a truck." },
    { q: "Where do you work?", a: "Vail Valley and Eagle County — Vail, Beaver Creek, Avon, Edwards, Eagle, Minturn, and nearby. If you're close and not sure, ask." },
  ];

  const serviceSchema = localBusinessHomePageSchema();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground relative">
      <SEO
        title="Smart Home Integration in Vail Valley"
        description="Professional smart home pre-wire, installation, and maintenance in Vail Valley & Eagle County. Trusted local integrators for new builds and existing homes."
        keywords="smart home installation, pre-wire, home automation, Vail Valley, Eagle County, Control4, TV mounting, home theater"
        schema={[serviceSchema, faqSchema]}
      />

      {/* Full-page background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/75 to-primary/90" />
      </div>

      <div className="relative z-10" ref={revealRef}>
        <Header />

        {/* Hero + Trust Strip pinned to window top/bottom */}
        <div className="relative min-h-screen flex flex-col">
          {/* Hero — pinned to top of window */}
          <section className="relative pt-24 sm:pt-28 overflow-hidden">
            <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-32">
              <div className="max-w-2xl mx-auto text-center">
                <p className="animate-hero-eyebrow text-accent font-semibold text-sm tracking-widest uppercase mb-4 inline-flex items-center gap-2">
                  <span className="w-8 h-px bg-accent" />
                  Vail Valley Smart Home Integrator
                  <span className="w-8 h-px bg-accent" />
                </p>
                <h1 className="animate-fade-in text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-6 text-white hero-text-shadow [animation-delay:100ms]">
                  We build smart homes that just work.
                </h1>
                <p className="animate-fade-in text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto hero-subtext-shadow [animation-delay:200ms]">
                  One team from pre-wire to programming — reliable technology for homeowners and builders across Eagle County.
                </p>
              </div>
            </div>
          </section>

          {/* CTA + Location — just above trust strip */}
          <div className="animate-fade-in flex flex-col items-center gap-3 px-4 sm:px-6 pb-6 [animation-delay:300ms]">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/scheduling"
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-all text-base shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="tel:+19705193013"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-all text-base backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                (970) 519-3013
              </a>
            </div>
            <div className="inline-flex items-center gap-2 mt-2 text-white/40 text-sm">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Vail · Beaver Creek · Edwards · Avon · Eagle</span>
            </div>
          </div>

          {/* Trust Strip — pinned to bottom of window */}
          <section data-reveal className="mt-auto border-y border-white/10 py-6 sm:py-8 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-white font-semibold text-lg">Local</p>
                  <p className="text-white/50 text-sm">Based in the valley</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Licensed</p>
                  <p className="text-white/50 text-sm">& fully insured</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Full-Service</p>
                  <p className="text-white/50 text-sm">Wire to support</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Responsive</p>
                  <p className="text-white/50 text-sm">We answer the phone</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SocialProof />

        {/* Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-6" id="services">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Do</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Core Services</h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <Link key={i} to={service.link} className="group">
                  <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-black/50 transition-all duration-200">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Our Process</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">How It Works</h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <span className="text-accent/20 text-5xl font-bold absolute -top-2 -left-1">{step.number}</span>
                  <div className="pt-10">
                    <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Why Symphony */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why Us</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Homeowners Choose Symphony</h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
              {differentiators.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/8 hover:border-white/10 transition-colors bg-black/40 backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Questions</h2>
            </div>
            <div data-reveal-children className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
              Whether you're building new, renovating, or just need something fixed — reach out. No pressure, no sales pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+19705193013"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
