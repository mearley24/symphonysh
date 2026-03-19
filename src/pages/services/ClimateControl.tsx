import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Thermometer, Sun, Wind, BarChart, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

import PageBackground from "../../components/PageBackground";
import bgClimate from "../../assets/bg-climate.jpg";

const ClimateControl = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Climate Control Systems",
    "provider": { "@type": "LocalBusiness", "name": "Symphony Smart Homes", "telephone": "+1-970-519-3013" },
    "description": "Smart thermostat and HVAC integration for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Thermometer, title: "Smart Thermostats", description: "Intelligent thermostats that learn your schedule, respond to occupancy, and integrate with your automation system." },
    { icon: Sun, title: "Zoned Climate Control", description: "Independent temperature control for different rooms and floors — no more fighting over the thermostat." },
    { icon: Wind, title: "Ventilation & Air Quality", description: "Fresh air exchange systems and air quality monitoring to keep your indoor environment healthy." },
    { icon: BarChart, title: "Energy Monitoring", description: "Track heating and cooling usage patterns. Understand where your energy goes and optimize for savings." },
  ];

  const faqs = [
    { q: "What smart thermostats do you install?", a: "We work with several brands depending on the system. For Control4 homes, we integrate compatible thermostats directly. We also install standalone smart thermostats from brands like ecobee for simpler setups." },
    { q: "Can you control climate by zone?", a: "Yes — if your HVAC system supports zoning. We can add zone controllers and smart dampers to existing forced-air systems, or integrate with radiant floor heating for precise room-by-room control." },
    { q: "Does this actually save energy?", a: "Yes. Automated setback schedules, occupancy-based control, and integration with shades and lighting can reduce heating and cooling costs significantly — especially in mountain homes where the climate swings daily." },
    { q: "Can I control it remotely?", a: "Absolutely. Adjust temperatures, check current readings, and set schedules from your phone or Control4 app — whether you're home or traveling." },
  ];

  return (
    <PageBackground image={bgClimate}>
      <SEO title="Smart Climate Control | Vail Valley, CO" description="Smart thermostat and HVAC integration for Vail Valley mountain homes. Zoned heating, cooling schedules, and energy monitoring." keywords="smart thermostat Vail Valley, climate control Eagle County, HVAC integration, zoned heating" schema={serviceSchema} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Climate Control", url: "/services/climate-control" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Thermometer className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Climate Control</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">Comfortable in every room. Efficient all year.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">We integrate smart thermostats and HVAC controls into your home automation system for precise, room-by-room comfort — with automated schedules that save energy without sacrificing warmth.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=climate-control" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Climate solutions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Why smart climate control matters in the mountains</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Mountain Temperature Swings", description: "Vail Valley can see 40°F temperature swings in a single day. Smart scheduling adapts to these changes automatically." },
              { title: "Seasonal Homes", description: "Arriving to a cold house? Set your thermostat remotely before you get there. Pipe freeze protection monitors temperatures while you're away." },
              { title: "Energy Efficiency", description: "Automated setbacks when you leave and pre-conditioning before you arrive mean you're only heating or cooling when it matters." },
              { title: "Integrated Comfort", description: "Climate works with your shades and lighting — shades close to block afternoon sun, reducing cooling load automatically." },
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Climate Questions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready for smarter comfort?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Let us evaluate your HVAC system and recommend the right smart climate solution for your home.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=climate-control" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default ClimateControl;
