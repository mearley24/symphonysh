import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Wifi, Router, Globe, Cloud, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

import PageBackground from "../../components/PageBackground";
import bgNetworking from "../../assets/bg-networking.jpg";

const Networking = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Home Networking",
    "provider": { "@type": "LocalBusiness", "name": "Symphony Smart Homes", "telephone": "+1-970-519-3013" },
    "description": "Enterprise-grade home networking for reliable smart home connectivity in Vail Valley.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Wifi, title: "Whole-Home Wi-Fi", description: "Commercial-grade wireless access points placed for complete coverage — no dead zones in any room, on any floor, or on the patio." },
    { icon: Router, title: "Managed Network Equipment", description: "Enterprise switches, routers, and firewalls that handle dozens of devices without breaking a sweat. Remote monitoring included." },
    { icon: Globe, title: "Structured Cabling", description: "Cat6/Cat6A Ethernet to every room, centralized in a ventilated rack or enclosure with clean cable management." },
    { icon: Cloud, title: "Remote Management", description: "We monitor your network remotely and can resolve most issues without a site visit. Firmware updates, reboots, and diagnostics handled proactively." },
  ];

  const faqs = [
    { q: "Why can't I just use a consumer router?", a: "Consumer routers are designed for small apartments with a handful of devices. Mountain homes with thick walls, multiple floors, and 30+ smart devices need enterprise-grade access points and managed switching to stay reliable." },
    { q: "How many access points do I need?", a: "It depends on your home's size, construction materials, and layout. A typical 3,000 sq ft home might need 2–3 access points. Larger homes or those with concrete/stone walls may need more. We do a site survey to determine placement." },
    { q: "What about wired connections?", a: "We run Cat6 or Cat6A Ethernet to every room during construction. This provides hardwired connections for TVs, gaming consoles, and computers — plus backhaul for your Wi-Fi access points." },
    { q: "How much does a proper network cost?", a: "A basic network for a 2,500 sq ft home starts around $1,200. Whole-home networking for a larger property with full rack, managed switches, and multiple APs typically ranges from $2,500 to $6,000+." },
  ];

  return (
    <PageBackground image={bgNetworking}>
      <SEO title="Home Networking & Wi-Fi | Vail Valley, CO" description="Enterprise-grade home networking for Vail Valley homes. Structured cabling, managed Wi-Fi, and network racks. Reliable connectivity guaranteed." keywords="home networking Vail Valley, wifi installation Eagle County, structured cabling, network rack" schema={serviceSchema} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Networking", url: "/services/networking" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Wifi className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Home Networking</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">The network is the foundation. We build it right.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">Every smart device in your home depends on a reliable network. We install enterprise-grade Wi-Fi, structured cabling, and managed switching that keeps everything connected — even with 50+ devices online.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=networking" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base">Schedule an Assessment <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Network infrastructure</h2>
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
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why It Matters</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">A proper network changes everything</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "No More Buffering", description: "Streaming, video calls, and gaming all work smoothly — even when the whole family is online." },
              { title: "Smart Devices Actually Work", description: "Smart locks, cameras, and thermostats need a reliable connection. Consumer Wi-Fi can't keep up. Ours can." },
              { title: "Future-Proof Infrastructure", description: "Cat6A cabling supports 10-gigabit speeds. You won't need to re-wire when internet speeds increase." },
              { title: "Professional Monitoring", description: "We keep an eye on your network remotely. Issues get resolved before you even notice them." },
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Networking Questions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready for bulletproof connectivity?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Let us assess your home and design a network that handles everything you throw at it.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=networking" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule an Assessment <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Networking;
