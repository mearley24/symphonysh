import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Wrench, CheckCircle2, ChevronDown, Shield, Calendar, PhoneCall } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";

import PageBackground from "../../components/PageBackground";
import ServiceDemoSection from "../../components/ServiceDemoSection";
import { MaintenanceDemo } from "../../components/service-demos/MaintenanceDemo";
import bgMaintenance from "../../assets/bg-maintenance.jpg";

const Maintenance = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Maintenance & Support",
    "provider": schemaProviderLocalBusiness,
    "description": "Professional maintenance and support for smart home systems in Vail Valley.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: PhoneCall, title: "Remote Diagnostics", description: "Many issues can be resolved remotely — a quick call or remote session often fixes the problem without a site visit." },
    { icon: Wrench, title: "On-Site Service", description: "When remote won't cut it, we come to you. Same-day and next-day appointments available for most issues." },
    { icon: Shield, title: "Firmware & Updates", description: "We keep your system software current — Control4, network equipment, cameras, and more. Updates are tested before deployment." },
    { icon: Calendar, title: "Preventive Maintenance", description: "Scheduled system check-ups to catch issues before they become problems. Battery replacements, connection checks, and performance optimization." },
  ];

  const faqs = [
    { q: "Do I need a maintenance plan?", a: "Not necessarily, but it's recommended — especially for larger systems. Plans include proactive monitoring, priority scheduling, and discounted service rates. You can also call us for one-off service anytime." },
    { q: "How quickly can you respond?", a: "For plan members, we typically respond within a few hours. For one-off service calls, we schedule within 1–2 business days in most cases. Emergency service is available 24/7." },
    { q: "What does a service call cost?", a: "One-off service calls are billed at an hourly rate plus travel. Maintenance plan members get discounted rates and may have included service hours. Contact us for current pricing." },
    { q: "Can you fix systems you didn't install?", a: "Usually, yes. We'll assess the system, diagnose the issue, and let you know what's needed. If the system was installed by another integrator, we may recommend a system audit first." },
  ];


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
    <PageBackground image={bgMaintenance}>
      <SEO title="Smart Home Repair & Support | Vail Valley" description="Smart home troubleshooting, maintenance, and system support. Remote diagnostics and on-site service in Vail Valley & Eagle County." keywords="smart home repair, system support, troubleshooting, maintenance, Vail Valley" schema={[serviceSchema, faqSchema]} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Maintenance", url: "/services/maintenance" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Wrench className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Maintenance & Support</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">When something needs attention, we're here.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">Smart home systems need ongoing care — firmware updates, troubleshooting, and the occasional repair. We provide remote diagnostics and on-site service to keep everything running smoothly.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=maintenance" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">Schedule Service <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Offer</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Support services</h2>
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

      <ServiceDemoSection title="System Health Monitor" subtitle="Interactive Demo">
        <MaintenanceDemo />
      </ServiceDemoSection>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why It Matters</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Reliable support when you need it</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "We Answer the Phone", description: "When your system has an issue, you shouldn't have to wait days for a callback. We respond quickly and take action." },
              { title: "Remote First", description: "Most issues can be diagnosed and resolved remotely — saving you time and money. We only send a tech when it's truly needed." },
              { title: "Proactive, Not Reactive", description: "Regular check-ups catch small issues before they become big problems. Prevention is always cheaper than repair." },
              { title: "Systems We Didn't Install", description: "Inherited a smart home system from a previous owner? We can take it over, audit it, and get it working properly." },
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Support Questions</h2>
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
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Need help with your system?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Whether it's a quick fix or an ongoing maintenance plan, we're here to keep your smart home running.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=maintenance" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule Service <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Maintenance;
