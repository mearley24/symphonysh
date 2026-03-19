import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Shield, Camera, Lock, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const SecuritySystems = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Security Systems",
    "provider": { "@type": "LocalBusiness", "name": "Symphony Smart Homes", "telephone": "+1-970-519-3013" },
    "description": "Smart security cameras, locks, and monitoring integrated with home automation in Vail Valley.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Camera, title: "IP Camera Systems", description: "4K surveillance cameras with night vision, motion detection, and remote viewing from your phone or Control4 touchscreen." },
    { icon: Lock, title: "Smart Locks & Access", description: "Keyless entry with pin codes, fingerprint readers, and mobile access. Know who comes and goes, and lock up from anywhere." },
    { icon: AlertTriangle, title: "Alarm & Monitoring", description: "Professionally monitored alarm systems with door/window sensors, glass break detection, and 24/7 dispatch." },
    { icon: Shield, title: "Automation Integration", description: "Security tied into your smart home: cameras on the TV when someone rings the bell, lights on when motion is detected, doors locked at bedtime." },
  ];

  const faqs = [
    { q: "Do I need professional monitoring?", a: "It depends on your needs. Self-monitoring (phone alerts) works for many homeowners. Professional monitoring adds a dispatch service that contacts authorities if you don't respond to an alert. We offer both options." },
    { q: "Can I view cameras remotely?", a: "Yes. All our camera systems include remote viewing via app. You can check live feeds, review recordings, and receive motion alerts from anywhere." },
    { q: "How much does a camera system cost?", a: "A 4-camera exterior system typically starts around $2,400 installed. Larger properties with 8–16 cameras range from $4,000 to $10,000+. NVR storage and professional monitoring are additional." },
    { q: "Will this work with my existing security system?", a: "Often, yes. We can integrate many existing alarm panels and sensors into a new smart home system. We'll assess your current setup during the consultation." },
  ];

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <SEO title="Security Systems | Vail Valley" description="Smart security cameras, locks, and monitoring for Vail Valley homes. Professional installation integrated with home automation." keywords="security cameras, smart locks, home security, alarm monitoring, Vail Valley" schema={serviceSchema} />
      <Header />

      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Shield className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Security Systems</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">Know your home is secure — from anywhere.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">We install camera systems, smart locks, and alarm monitoring that integrate with your smart home. See who's at the door, lock up remotely, and get alerts when something needs your attention.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=security-systems" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base">Schedule an Assessment <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Security solutions</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((item, i) => (
              <div key={i} className="bg-secondary/80 border border-white/8 rounded-xl p-6">
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
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why It Matters</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Security that works with your lifestyle</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Peace of Mind", description: "Check on your property from your phone whether you're at work, traveling, or at the ski hill." },
              { title: "Deterrence", description: "Visible cameras and motion-triggered lighting discourage unwanted activity before it happens." },
              { title: "Smart Automation", description: "When you arm the system at night, the doors lock, the garage closes, and the exterior cameras start recording." },
              { title: "Property Protection", description: "Especially important for seasonal homes in the Vail Valley — know what's happening even when you're away for months." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div><h3 className="text-white font-semibold mb-1">{item.title}</h3><p className="text-white/50 text-sm leading-relaxed">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Security Questions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Protect what matters most.</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Let us assess your property and recommend the right security setup for your home and lifestyle.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=security-systems" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule an Assessment <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SecuritySystems;
