import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Sun, SunDim, Clock, Smartphone, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

import PageBackground from "../../components/PageBackground";
import bgShades from "../../assets/bg-shades.jpg";

const Shades = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Motorized Shades",
    "provider": { "@type": "LocalBusiness", "name": "Symphony Smart Homes", "telephone": "+1-970-519-3013" },
    "description": "Automated window treatments for privacy, comfort, and energy efficiency in Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Sun, title: "Motorized Roller Shades", description: "Clean, modern roller shades with quiet motors. Available in a wide range of fabrics from blackout to sheer." },
    { icon: SunDim, title: "Solar & Glare Control", description: "Sun-tracking automation that adjusts shades based on time of day and sun position — protecting furniture and reducing heat gain." },
    { icon: Clock, title: "Scheduled Automation", description: "Shades that open with your morning alarm, close at sunset, or respond to 'Movie Night' and 'Away' scenes." },
    { icon: Smartphone, title: "Smart Integration", description: "Control from the wall, your phone, voice, or automatically through your Control4 system. Works with scenes and routines." },
  ];

  const faqs = [
    { q: "What brands do you install?", a: "We work with several manufacturers depending on the application and budget. Popular options include Lutron Palladiom and Sivoia, QMotion, and Hunter Douglas PowerView. We'll recommend the best fit for your windows and needs." },
    { q: "Can motorized shades be retrofitted?", a: "Yes. Battery-powered and hardwired options are available. For new construction, we pre-wire for hardwired motors. For existing homes, battery-powered shades are a clean, wire-free solution." },
    { q: "How much do motorized shades cost?", a: "Pricing varies by window size, fabric, and motor type. A single motorized shade typically starts around $450–$800 installed. Whole-home packages offer better per-window pricing." },
    { q: "How long do the batteries last?", a: "Battery-powered shades typically last 1–2 years between charges or battery replacements, depending on usage frequency. Hardwired shades don't have this limitation." },
  ];

  return (
    <PageBackground image={bgShades}>
      <SEO title="Motorized Shades & Blinds | Vail Valley, CO" description="Automated motorized shades for Vail Valley homes. Lutron, QMotion, and Hunter Douglas. Integrated with Control4 home automation." keywords="motorized shades Vail Valley, automated blinds Eagle County, Lutron shades, window treatments" schema={serviceSchema} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Shades", url: "/services/shades" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Sun className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Motorized Shades</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">Shades that move with your day.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">Motorized window treatments that open with your morning routine, block afternoon glare, and close at sunset — all automatically. Controlled from the wall, your phone, or your voice.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=shades" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Shade solutions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Why motorized shades make sense</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "UV & Furniture Protection", description: "Mountain sun is intense. Automated shades protect your furniture, flooring, and art from UV damage — even when you're not home." },
              { title: "Energy Savings", description: "Shades that close during peak sun reduce cooling costs in summer. In winter, they add an insulating layer against cold glass." },
              { title: "Privacy on Demand", description: "One tap closes every shade in the house. Perfect for bedtime, movie night, or when you want privacy without walking room to room." },
              { title: "Hard-to-Reach Windows", description: "Tall windows, skylights, and angled glass are perfect candidates for motorized shades — no ladders, no cords, no hassle." },
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Shade Questions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to automate your windows?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Let us measure your windows and recommend the right shades for your home.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=shades" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Shades;
