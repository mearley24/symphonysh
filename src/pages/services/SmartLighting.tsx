import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Lightbulb, Clock, Eye, Palette, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";

import PageBackground from "../../components/PageBackground";
import bgLighting from "../../assets/bg-lighting.jpg";

const SmartLighting = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Lighting Systems",
    "provider": schemaProviderLocalBusiness,
    "description": "Intelligent lighting control for comfort, convenience, and energy savings in Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Lightbulb, title: "Dimming & Keypads", description: "Lutron and Control4 dimmers, keypads, and scene controllers that replace standard switches for elegant, intuitive control." },
    { icon: Palette, title: "Scene Programming", description: "Create lighting scenes for any occasion — dinner, movie night, entertaining, bedtime — activated with a single button." },
    { icon: Clock, title: "Automated Schedules", description: "Lights that adjust automatically based on time of day, sunrise/sunset, or occupancy. Set it and forget it." },
    { icon: Eye, title: "Motion & Occupancy", description: "Hallways, bathrooms, and closets that light up when you walk in and turn off when you leave." },
  ];

  const faqs = [
    { q: "What's the difference between smart bulbs and a real lighting system?", a: "Smart bulbs rely on Wi-Fi and apps — they're fine for a lamp or two but don't scale well. A professional system like Lutron or Control4 uses dedicated dimmers and switches that work reliably regardless of Wi-Fi status." },
    { q: "Can you retrofit my existing home?", a: "Yes. Lutron Caseta and RadioRA work wirelessly and can replace existing switches without new wiring. For new construction, we recommend hardwired systems for maximum reliability." },
    { q: "How much does smart lighting cost?", a: "A single room with smart dimmers and a keypad might start around $1,200. Whole-home lighting for a new build typically ranges from $6,000 to $25,000+ depending on the number of circuits and features." },
    { q: "Can I still use regular light switches?", a: "Yes — Lutron and Control4 keypads look and feel like premium switches. They work manually and through automation. Guests won't even know they're smart." },
  ];

  return (
    <PageBackground image={bgLighting}>
      <SEO title="Smart Lighting & Lutron Control | Vail Valley" description="Lutron and Control4 smart lighting for Vail Valley homes. Keypads, dimmers, scenes, and automated schedules. Expert installation." keywords="smart lighting Vail Valley, Lutron installer Eagle County, lighting control, keypads" schema={serviceSchema} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Smart Lighting", url: "/services/smart-lighting" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Smart Lighting</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">Lighting that sets the right mood — automatically.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">We install professional lighting control systems that let you dim, schedule, and automate every light in your home. Keypads on the wall, scenes at a touch, and schedules that run themselves.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=smart-lighting" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Lighting control solutions</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((item, i) => (
              <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3"><item.icon className="w-5 h-5 text-accent" /></div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Benefits</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Why smart lighting matters</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Energy Savings", description: "Dimming lights to 75% cuts energy use significantly. Automated schedules ensure nothing stays on when it shouldn't." },
              { title: "Better Living", description: "The right light at the right time improves sleep, productivity, and ambiance. Warm in the evening, bright in the morning." },
              { title: "Home Security", description: "Vacation mode simulates occupancy by cycling lights on and off. Motion-triggered exterior lights deter unwanted visitors." },
              { title: "Clean Aesthetics", description: "Lutron keypads are beautiful. No more walls cluttered with mismatched switches — just clean, coordinated control." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div><h3 className="text-white font-semibold mb-1">{item.title}</h3><p className="text-white/50 text-sm leading-relaxed">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Lighting Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors" aria-expanded={openFaq === i}>
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 pt-0"><p className="text-white/50 text-sm leading-relaxed">{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to upgrade your lighting?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Whether it's one room or every room, we'll help you find the right system for your home.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=smart-lighting" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default SmartLighting;
