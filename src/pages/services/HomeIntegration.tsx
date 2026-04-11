import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Home, Lightbulb, Shield, Thermometer, Volume2, Sun, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";

import PageBackground from "../../components/PageBackground";
import ServiceDemoSection from "../../components/ServiceDemoSection";
import { HomeAutomationDemo } from "../../components/service-demos/HomeAutomationDemo";
import bgHomeIntegration from "../../assets/bg-home-integration.jpg";

const HomeIntegration = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Home Automation & Integration",
    "provider": schemaProviderLocalBusiness,
    "description": "Professional Control4 home automation and integration services for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Lightbulb, title: "Lighting Control", description: "Keypads, dimmers, and automated scenes throughout your home — all from one platform." },
    { icon: Thermometer, title: "Climate Integration", description: "Smart thermostats and zoned HVAC tied into your automation system for effortless comfort." },
    { icon: Volume2, title: "Audio & Video", description: "Multi-room music, home theater control, and source switching from a single interface." },
    { icon: Shield, title: "Security & Access", description: "Cameras, smart locks, and alarm systems integrated into your daily routines." },
    { icon: Sun, title: "Motorized Shades", description: "Automated window treatments that respond to time of day, scenes, and manual control." },
    { icon: Home, title: "Whole-Home Scenes", description: "'Good Morning,' 'Movie Night,' 'Away' — one tap sets everything to the right state." },
  ];

  const faqs = [
    { q: "What is Control4?", a: "Control4 is a professional home automation platform that unifies lighting, audio, video, climate, security, and shades into a single control system. It's designed for reliability and is programmed by certified dealers like us." },
    { q: "Can I control everything from my phone?", a: "Yes. Control4 has a mobile app for iOS and Android that gives you full control from anywhere. You can also use in-wall touchscreens, keypads, and remotes." },
    { q: "Do I need to automate my entire home at once?", a: "No. Many clients start with one or two systems — like lighting and audio — and add more over time. Control4 is designed to scale." },
    { q: "How much does a Control4 system cost?", a: "It depends on the scope. A single-room setup might start around $3,000–$5,000, while a whole-home system for a large property can range from $20,000 to $100,000+. We provide detailed proposals after a consultation." },
  ];

  return (
    <PageBackground image={bgHomeIntegration}>
      <SEO title="Control4 Home Automation Installer | Vail Valley" description="Certified Control4 dealer in Eagle County. Whole-home automation — lighting, audio, climate, security, and shades. Book a consultation." keywords="Control4 installer Eagle County, home automation Vail Valley, smart home integrator" schema={serviceSchema} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Home Automation", url: "/services/home-integration" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Home className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Home Automation</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">One system to control your entire home.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">We design and install Control4 automation systems that bring lighting, climate, audio, security, and shades together into a single, intuitive interface. One app, one remote, one experience.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=home-integration" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">What you can control</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((item, i) => (
              <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3"><item.icon className="w-5 h-5 text-accent" /></div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceDemoSection title="See Automation in Action" subtitle="Interactive Demo">
        <HomeAutomationDemo />
      </ServiceDemoSection>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Benefits</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Why homeowners choose automation</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Simplicity", description: "No more juggling five remotes and three apps. Everything works from one place." },
              { title: "Reliability", description: "Control4 is a hardwired, professionally programmed system — not a DIY stack of consumer gadgets." },
              { title: "Daily Convenience", description: "Automated routines handle the repetitive stuff: lights at sunset, thermostat at bedtime, doors locked when you leave." },
              { title: "Resale Value", description: "A professionally installed automation system adds real value to your home — especially in the Vail Valley market." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-white/10 transition-colors">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Automation Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
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

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's design your system.</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Tell us about your home and how you want it to work. We'll put together a plan that fits your goals and budget.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=home-integration" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default HomeIntegration;
