import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Volume2, Music, Tv, Headphones, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

import PageBackground from "../../components/PageBackground";
import bgAudio from "../../assets/bg-audio.jpg";

const AudioEntertainment = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Audio & Entertainment Systems",
    "provider": { "@type": "LocalBusiness", "name": "Symphony Smart Homes", "telephone": "+1-970-519-3013" },
    "description": "Premium multi-room audio and home theater systems for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  const capabilities = [
    { icon: Music, title: "Multi-Room Audio", description: "Stream music to any room — or every room — from Spotify, Apple Music, or your own library. Independent volume and source per zone." },
    { icon: Tv, title: "Home Theater", description: "Dedicated cinema rooms with 4K projection, Dolby Atmos surround sound, acoustic treatment, and automated lighting and shades." },
    { icon: Volume2, title: "Outdoor Audio", description: "Weather-rated speakers for patios, pools, and decks. Landscape speakers that blend into your yard." },
    { icon: Headphones, title: "Streaming Integration", description: "Sonos, Apple AirPlay, Spotify Connect, and more — all controllable from your phone or Control4 interface." },
  ];

  const faqs = [
    { q: "What speakers do you recommend?", a: "It depends on the application. We frequently install Sonance for in-wall/in-ceiling, Sonos for flexible multi-room, and dedicated theater speakers from brands like Monitor Audio and JBL Synthesis for cinema rooms." },
    { q: "Can I use my existing speakers?", a: "Often, yes. We'll evaluate what you have and determine if it makes sense to keep, supplement, or replace. We don't push unnecessary upgrades." },
    { q: "How much does a home theater cost?", a: "A solid dedicated theater starts around $15,000 for a basic Atmos setup with projection. High-end rooms with acoustic treatment, 4K laser projection, and premium seating can range from $40,000 to $150,000+." },
    { q: "Can you add speakers to an existing home?", a: "Yes. In-ceiling speakers are relatively easy to retrofit. We can also use wireless solutions like Sonos for rooms where running new wire isn't practical." },
  ];

  return (
    <PageBackground image={bgAudio}>
      <SEO title="Audio & Home Theater | Vail Valley" description="Multi-room audio, home theaters, and outdoor speakers. Professional installation in Vail Valley and Eagle County." keywords="home theater, multi-room audio, Sonos, Dolby Atmos, Vail Valley" schema={serviceSchema} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Volume2 className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Audio & Entertainment</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">Music in every room. Cinema in your home.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">From whole-home audio distribution to dedicated Dolby Atmos theaters, we design and install systems that sound as good as they look — and are easy for everyone in the household to use.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=audio-entertainment" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Install</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Audio & theater solutions</h2>
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
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Difference</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Professional audio done right</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Designed for Your Space", description: "We account for room dimensions, materials, and furnishings to optimize speaker placement and acoustics." },
              { title: "Clean Installation", description: "Speakers disappear into walls and ceilings. Wiring is concealed. Equipment is centralized in a ventilated closet or rack." },
              { title: "Easy to Use", description: "Pick a room, pick a source, set the volume. That's it. No complicated menus or apps to navigate." },
              { title: "Expandable", description: "Start with a few zones and add more later. Pre-wire now means easy upgrades down the road." },
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Audio Questions</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to upgrade your audio?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Whether it's a single room or a full-home system, we'll help you find the right solution for your space and budget.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=audio-entertainment" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Consultation <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default AudioEntertainment;
