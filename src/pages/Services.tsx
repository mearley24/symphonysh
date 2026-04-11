import { Link } from "react-router-dom";
import { ArrowRight, Phone, Volume2, Shield, Lightbulb, Thermometer, Wifi, Wrench, Sun, Home, Cable, ScanLine, Smartphone, CheckCircle2, ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgServices from "../assets/bg-services.jpg";
import { schemaProviderLocalBusiness } from "../constants/businessSchema";

const Services = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: Home,
      title: "Home Automation & Control",
      description: "Unified smart home control through Control4 — lighting, climate, audio, security, and shades managed from one interface.",
      link: "/services/home-integration",
    },
    {
      icon: Volume2,
      title: "Audio & Home Theater",
      description: "Multi-room audio distribution, dedicated home theaters with Dolby Atmos, and outdoor speaker systems.",
      link: "/services/audio-entertainment",
    },
    {
      icon: Shield,
      title: "Security & Surveillance",
      description: "IP camera systems, smart locks, video doorbells, and integrated alarm monitoring for complete peace of mind.",
      link: "/services/security-systems",
    },
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Lutron and Control4 lighting control — keypads, dimmers, scenes, and automated schedules for every room.",
      link: "/services/smart-lighting",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Smart thermostat integration with zoned HVAC control, floor heating, and automated comfort scheduling.",
      link: "/services/climate-control",
    },
    {
      icon: Wifi,
      title: "Home Networking",
      description: "Enterprise-grade Wi-Fi, structured cabling, managed switches, and network racks for reliable connectivity.",
      link: "/services/networking",
    },
    {
      icon: Sun,
      title: "Motorized Shades",
      description: "Automated window treatments that respond to sunlight, schedules, and scenes — integrated with your smart home.",
      link: "/services/shades",
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Ongoing system maintenance, firmware updates, remote diagnostics, and on-site service when you need it.",
      link: "/services/maintenance",
    },
    {
      icon: Cable,
      title: "Pre-Wire & Structured Wiring",
      description: "Structured cabling for new construction and retrofits — Cat6, speaker wire, HDMI, and control wiring installed clean from the start.",
      link: "/services/prewire",
    },
  ];

  const alsoAvailable = [
    {
      icon: ScanLine,
      title: "Matterport 3D Scanning",
      description: "Immersive 3D virtual tours for real estate listings, construction documentation, and property records.",
      link: "/matterport",
    },
    {
      icon: Smartphone,
      title: "AVA Smart Remote",
      description: "A premium universal remote that controls your entire smart home from a single, beautifully simple interface.",
      link: "/ava",
    },
  ];

  const faqs = [
    { q: "Do I need all of these services?", a: "No. Every project is different. Some clients start with networking and audio, others want a full-home system from day one. We'll help you prioritize based on your goals and budget." },
    { q: "Can these systems work together?", a: "Yes — that's the point. We design integrated systems where lighting, audio, climate, shades, and security all communicate through a single platform like Control4." },
    { q: "Do you work with specific brands?", a: "We're brand-agnostic and recommend what works best for your situation. We frequently install Control4, Lutron, Sonos, Sonance, Araknis, and others." },
    { q: "What if I already have some smart devices?", a: "We can often incorporate existing equipment into a unified system. During the consultation, we'll assess what you have and recommend the best path forward." },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Home Services",
    "provider": schemaProviderLocalBusiness,
    "description": "Complete smart home integration services including automation, audio, security, lighting, and networking for Vail Valley homes.",
  };

  return (
    <PageBackground image={bgServices}>
      <SEO
        title="Smart Home Services | Vail Valley, CO"
        description="Full-service smart home integration: automation, audio, lighting, security, networking, and more. Serving Vail Valley & Eagle County."
        keywords="smart home services Vail Valley, home automation Eagle County, AV installation, Control4 dealer"
        schema={serviceSchema}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Our Services</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            Everything your smart home needs — designed, installed, and supported.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            From structured wiring to full-home automation, we handle every layer of smart home technology. One team, one point of contact, start to finish.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Do</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Smart Home Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
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

      {/* Also Available */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Also Available</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Additional Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {alsoAvailable.map((item, i) => (
              <Link key={i} to={item.link} className="group">
                <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-black/50 transition-all duration-200">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Integrated */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Advantage</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why an integrated system matters</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "One App, One Interface", description: "Control everything — lights, music, locks, cameras, shades, thermostats — from a single touchscreen, phone, or remote." },
              { title: "Systems That Talk to Each Other", description: "When you leave the house, the lights turn off, the thermostat adjusts, the doors lock, and the cameras arm — automatically." },
              { title: "Easier to Maintain", description: "When one team designs and installs your system, troubleshooting is straightforward. No finger-pointing between vendors." },
              { title: "Built to Grow", description: "Start with what you need now. Add capabilities later without ripping anything out. We plan for expansion from day one." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-white/10 transition-colors">
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
          <div className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Questions</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors" aria-expanded={openFaq === i}>
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
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Not sure where to start?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Give us a call or schedule a walkthrough. We'll help you figure out what makes sense for your home — no pressure, no sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Services;
