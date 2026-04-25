import { Link } from "react-router-dom";
import {
  Phone, ArrowRight, Cable, Home, Wrench, CheckCircle2, ChevronDown, MapPin,
  Lightbulb, Music, Shield, Wifi, Sun, Thermometer,
} from "lucide-react";
import { useState } from "react";
import { trackPhoneClick } from "../utils/tracking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import ClientTestimonials from "../components/ClientTestimonials";
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
      title: "Smart Home Automation",
      description: "Whole-home control across lighting, AV, comfort, and security from one interface.",
      link: "/services/home-integration",
    },
    {
      icon: Lightbulb,
      title: "Lighting Control",
      description: "Architectural and retrofit lighting — Lutron HomeWorks, RadioRA3, and Control4 scenes.",
      link: "/services/smart-lighting",
    },
    {
      icon: Music,
      title: "Audio & Home Theater",
      description: "Multi-room audio and dedicated theaters with calibrated sound and clean sightlines.",
      link: "/services/audio-entertainment",
    },
    {
      icon: Shield,
      title: "Security & Cameras",
      description: "Cameras, access, and monitoring that integrate with the rest of the home.",
      link: "/services/security-systems",
    },
    {
      icon: Wifi,
      title: "Networking & Wi-Fi",
      description: "Reliable, fast coverage built for whole-home automation, streaming, and remote work.",
      link: "/services/networking",
    },
    {
      icon: Sun,
      title: "Motorized Shades",
      description: "Lutron shades that follow the sun, scenes, and time of day — quiet and reliable.",
      link: "/services/shades",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Thermostats and zones that match how you actually use the house through the seasons.",
      link: "/services/climate-control",
    },
    {
      icon: Cable,
      title: "Pre-Wire & Structured Cabling",
      description: "Future-proof low-voltage rough-in for new builds and major remodels.",
      link: "/services/prewire",
    },
    {
      icon: Wrench,
      title: "Ongoing Service & Support",
      description: "Same-day response, remote diagnostics, and on-site service when something needs attention.",
      link: "/services/maintenance",
    },
  ];

  const platforms = [
    { name: "Lutron HomeWorks", desc: "Architectural luxury lighting in new builds and deep remodels.", href: "/platforms/lutron-homeworks" },
    { name: "Lutron RadioRA3",  desc: "Wireless lighting and shades for existing homes and phased upgrades.", href: "/platforms/lutron-radiora3" },
    { name: "Control4",         desc: "Whole-home control across lighting, AV, comfort, security, and more.", href: "/platforms/control4" },
    { name: "AVA",              desc: "Elegant room-first control for media spaces and simple everyday use.", href: "/platforms/ava" },
  ];

  const scenes = [
    { label: "Goodmorning",    copy: "The shades rise slowly. The lights come up warm. Your home wakes up before the first lift spins." },
    { label: "Goodbye / Away", copy: "One tap on the way out — lights off, doors locked, cameras active, thermostats set back." },
    { label: "Welcome",        copy: "You pull in after a long drive. The entry lights are on, the music is low, and the house feels ready." },
    { label: "Movie / Relax",  copy: "The lights dim, the room quiets down, and the system gets out of the way." },
    { label: "Goodnight",      copy: "One button at the nightstand. Lights fade, shades close, doors lock, and the house winds down." },
  ];

  const steps = [
    { number: "01", title: "Walkthrough", description: "We discuss your goals, walk the property, and understand how you actually live in your home." },
    { number: "02", title: "Design & Proposal", description: "You receive a clear scope of work with transparent pricing — no surprises." },
    { number: "03", title: "Installation", description: "Our team handles wiring, mounting, and programming with minimal disruption to your schedule." },
    { number: "04", title: "Training & Handoff", description: "We walk you through everything until you're comfortable, then provide ongoing support." },
  ];

  const differentiators = [
    {
      title: "Mountain homes aren't suburban homes.",
      description: "Altitude, snow load, second-home patterns, sun exposure, and seasonal occupancy all change how systems are specified, installed, and supported. We design for that reality.",
    },
    {
      title: "One accountable local team.",
      description: "Symphony is a local Eagle County integration team. You work with the same people from first walkthrough through final training and ongoing support.",
    },
    {
      title: "Built for second-home schedules.",
      description: "Remote diagnostics, owner and property-manager coordination, and seasonal check-ins. We answer the phone in season and out.",
    },
    {
      title: "Documented systems, no lock-in.",
      description: "Clear as-builts, labeled racks, and platform choices that can be updated and serviced over time — by us or by anyone qualified.",
    },
  ];

  const faqs = [
    { q: "How much does a smart home project usually run?", a: "It really comes down to scope. A focused room or two might land around $1,500+, while a full new-build system often falls in the $15,000–$80,000+ range. After we walk the job and understand what you want, we'll put numbers in a proposal so you're not guessing." },
    { q: "Do you work with builders and GCs?", a: "Yes — a lot of what we do is pre-wire and rough-in during construction. We'll line up with your GC, electrician, and architect so low-voltage isn't an afterthought." },
    { q: "Can you work in an existing home, or only new construction?", a: "Both. Retrofits are common here. Sometimes we're fishing wire through attics and crawl spaces; other times it's cleaner. We've done everything from condos to large mountain homes." },
    { q: "What brands do you install?", a: "We're not married to one logo. We pick what fits the house and how you'll use it. You'll see a lot of Control4, Sonos, Lutron, Sonance, Araknis, and others — whatever matches the job and budget." },
    { q: "How long does an install take?", a: "Small jobs — a TV mount, a few speakers — can be a few hours. A whole-home job on a build is phased: pre-wire early, then trim-out and programming as the house comes together. Ballpark 3–6 months from rough-in to final handoff on a full system, depending on the build schedule." },
    { q: "Do you offer ongoing support?", a: "Yes. We have maintenance options and we're available for one-off service when something acts up. Quite a bit we can sort out remotely before we roll a truck." },
    { q: "Where do you work?", a: "Vail Valley and Eagle County — Vail, Beaver Creek, Avon, Edwards, Eagle, Minturn, and nearby. If you're close and not sure, ask." },
    { q: "Do you service second homes?", a: "Yes. We support seasonal occupancy with remote diagnostics, scheduled in-season check-ins, and coordination with owners and property managers. When something needs urgent attention, we answer the phone — not a call center." },
    { q: "Can you coordinate with our architect, GC, or interior designer?", a: "Yes. On most builds we're working alongside an architect, GC, electrician, and interior designer from rough-in through finish. We'll line up pre-wire, device placement, fixture selection, and change orders so low-voltage isn't an afterthought." },
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
        description="Smart home automation in the Vail Valley — lighting, audio, security, climate, and shades, designed and installed by a local Eagle County team. Lutron, Control4, AVA."
        keywords="smart home installation, pre-wire, home automation, Vail Valley, Eagle County, Control4, Lutron, AVA, home theater"
        schema={[serviceSchema, faqSchema]}
      />

      {/* Full-page background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt="Smart home automation control panel in a modern Vail Valley residence"
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
          <section className="relative pt-36 sm:pt-44 overflow-hidden">
            {/* Right blob */}
            <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
            {/* Left blob — second layer with delay */}
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_2s_infinite]" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-0 sm:pt-2 pb-12 sm:pb-20">
              <div className="max-w-2xl mx-auto text-center">
                <p className="animate-hero-eyebrow text-accent font-semibold text-sm tracking-widest uppercase mb-4 inline-flex items-center gap-2">
                  <span className="w-8 h-px bg-accent" />
                  Vail Valley Smart Home Integrator
                  <span className="w-8 h-px bg-accent" />
                </p>
                <h1 className="animate-fade-in text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-6 text-white hero-text-shadow [animation-delay:100ms]">
                  We build smart homes that just work.
                </h1>
                <p className="animate-fade-in text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto hero-subtext-shadow [animation-delay:200ms]">
                  Lighting, audio, security, and climate — all working together, controlled
                  from one app or a button on the wall. Designed, installed, and supported
                  by the same local team, start to finish.
                </p>
              </div>
            </div>
          </section>

          {/* CTA + Location — directly above trust strip */}
          <div className="animate-fade-in mt-auto flex flex-col items-center gap-3 px-4 sm:px-6 pb-4 [animation-delay:300ms]">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/scheduling"
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-all text-base shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Schedule a Free Walkthrough
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="tel:+19705193013"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-all text-base backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                (970) 519-3013
              </a>
            </div>
            <div className="inline-flex items-center gap-2 mt-1 text-white/40 text-sm">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Vail · Beaver Creek · Edwards · Avon · Eagle</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hidden sm:flex justify-center py-3">
            <ChevronDown className="w-5 h-5 text-white animate-bounce opacity-40" />
          </div>

          {/* Trust Strip — pinned to bottom of window */}
          <section data-reveal className="border-y border-white/10 py-6 sm:py-8 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-white font-semibold text-lg">10+ Years</p>
                  <p className="text-white/50 text-sm">In the valley</p>
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
                  <p className="text-white font-semibold text-lg">Same-Day Response</p>
                  <p className="text-white/50 text-sm">We answer the phone</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Lifestyle Vignettes — The Symphony Home */}
        <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Symphony Home</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">A day, in scenes.</h2>
              <p className="text-white/50 text-base mt-3 max-w-2xl mx-auto">
                Five moments where the house quietly does the right thing.
              </p>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {scenes.map((scene, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent/10 via-black/40 to-black/60" />
                  <div className="p-5">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">{scene.label}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{scene.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Install */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5" id="services">
          <div className="max-w-6xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Systems we design, install, and support.</h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => (
                <Link key={i} to={service.link} className="group">
                  <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-gradient-to-br hover:from-accent/5 hover:to-transparent transition-all duration-200">
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
            <div className="text-center mt-10">
              <Link to="/services" className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm font-medium">
                See all services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* The Platforms We Install */}
        <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What's Running Underneath</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">The platforms we install.</h2>
              <p className="text-white/50 text-base mt-3 max-w-2xl mx-auto">
                We pick the right brain for the house — not the other way around.
              </p>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {platforms.map((p, i) => (
                <Link key={i} to={p.href} className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-all">
                  <h3 className="text-white font-semibold text-lg mb-2">{p.name}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/platforms" className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm font-medium">
                Compare all platforms <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Setup Finder teaser */}
        <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Decision Support</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Not sure where to start?</h2>
            <p className="text-white/55 text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Answer a few questions about your home and what you want it to do. We'll point you toward
              the right platform, service path, or first fix.
            </p>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-all text-base shadow-lg shadow-accent/20"
            >
              Try the Setup Finder
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
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

        {/* Client Testimonials */}
        <ClientTestimonials />

        {/* Featured / Recent Work */}
        <Testimonials />

        {/* Why Symphony */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why a local integrator</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Symphony</h2>
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

        {/* Meet the Team */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="grid sm:grid-cols-2 gap-10 items-center">
              {/* Left: text */}
              <div>
                <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Team</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">One Accountable Team. Every Project.</h2>
                <p className="text-white/50 text-base leading-relaxed mb-6">
                  Symphony is a local Eagle County integration team, led by founder Matt Earley. We keep every project organized from first wire to final walkthrough — clear ownership from planning through support.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  Learn more about us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {/* Right: stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "100+", label: "Projects Completed" },
                  { value: "10+", label: "Years in the Valley" },
                  { value: "Same Day", label: "Response Time" },
                ].map((stat, i) => (
                  <div key={i} className="bg-black/40 border border-white/8 rounded-xl p-4 text-center">
                    <p className="text-white font-bold text-2xl mb-1">{stat.value}</p>
                    <p className="text-white/40 text-xs leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
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
                    <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready when you are.</h2>
            <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
              Whether you're breaking ground, mid-renovation, or just need something fixed —
              reach out. No pressure, no pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                Schedule a Free Walkthrough
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+19705193013"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                <Phone className="w-4 h-4" />
                (970) 519-3013
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
