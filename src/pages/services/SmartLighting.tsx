import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Lightbulb, Clock, Eye, Palette, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";

import PageBackground from "../../components/PageBackground";
import ServiceDemoSection from "../../components/ServiceDemoSection";
import { HomeAutomationDemo } from "../../components/service-demos/HomeAutomationDemo";
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
    { icon: Lightbulb, title: "Sunnata & Hand-crafted Keypads", description: "Lutron Sunnata for RadioRA3 and hand-crafted Alisse, Architectural, or Signature keypads for HomeWorks — clean walls, premium feel, scenes labeled for how you live." },
    { icon: Palette, title: "Named Scenes", description: "Goodmorning, Welcome, Movie, Goodnight, Away — one-touch scenes built into the keypad and the app, in the order they actually run." },
    { icon: Clock, title: "Astronomic Schedules", description: "Lights that follow sunrise and sunset on their own — gentle in the morning, warm at dinner, soft path lights overnight without anyone touching anything." },
    { icon: Eye, title: "Lumaris LED & Motion", description: "Native Lumaris tunable-white LED for warm-dim ambiance, plus motion in hallways, baths, and closets so the right room lights itself when you walk in." },
  ];

  const faqs = [
    { q: "What's the difference between smart bulbs and a real lighting system?", a: "Smart bulbs ride on Wi-Fi and apps — fine for a lamp, frustrating across a whole house. Lutron HomeWorks and RadioRA3 use dedicated dimmers, keypads, and a Clear Connect mesh that stays solid even if the internet is acting up." },
    { q: "Can you retrofit a finished home?", a: "Yes. RadioRA3 is built for it — Sunnata keypads and dimmers go in where the existing switches are, no opened walls. HomeWorks fits new builds and deep remodels where the design calls for hand-crafted keypads and a coordinated wired backbone." },
    { q: "What does smart lighting cost?", a: "A single room with smart dimmers and a keypad usually starts around $1,200. Whole-home RadioRA3 or HomeWorks projects typically range from $6,000 to $25,000+ depending on circuit count, fixtures, and how custom the keypads are." },
    { q: "Will guests know it's a smart system?", a: "Probably not. The keypads look and feel like premium switches, scenes are labeled in plain English, and you can still hit a single button to turn a room on or off without any app." },
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
    <PageBackground image={bgLighting}>
      <SEO title="Smart Lighting & Lutron Control | Vail Valley" description="Lutron and Control4 smart lighting for Vail Valley homes. Keypads, dimmers, scenes, and automated schedules. Expert installation." keywords="smart lighting Vail Valley, Lutron installer Eagle County, lighting control, keypads" schema={[serviceSchema, faqSchema]} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Smart Lighting", url: "/services/smart-lighting" }]} />
      <Header />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Smart Lighting</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">Lighting that quietly sets the room.</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">Lutron HomeWorks and RadioRA3 keypads on the wall, named scenes for the way you actually live, and lighting that warms in the morning and softens at night without anyone reaching for a phone.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=smart-lighting" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Walkthrough <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> (970) 519-3013</a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Lighting Layer</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Keypads, scenes, and schedules that disappear into the day.</h2>
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

      <ServiceDemoSection title="Lighting Control Demo" subtitle="Interactive Demo">
        <HomeAutomationDemo />
      </ServiceDemoSection>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What It Changes</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Daylight, dinner, movie, sleep — without thinking about it.</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "A house that uses the right light", description: "Bright and cool through the morning, warm and dim through dinner, soft amber overnight. The room sets itself; you stop noticing the switch on the wall." },
              { title: "Energy that follows occupancy", description: "Dimming to 75% cuts a surprising amount of draw. Schedules and away modes make sure nothing's on when nobody's home." },
              { title: "Quiet security", description: "Vacation mode cycles interior scenes on a believable schedule. Motion-triggered exterior lights along the driveway and entries — lit when you arrive, dark when the house is asleep." },
              { title: "Walls you actually like looking at", description: "Sunnata or hand-crafted keypads in place of a row of mismatched switches. Clean lines, coordinated finishes, labels that read like English." },
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Lighting Questions</h2>
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

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Explore More</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Related Services</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Lutron RadioRA3", description: "Our most-installed lighting platform — deeper dive into keypads, dimmers, and scene programming.", path: "/platforms/lutron-radiora3" },
              { title: "Motorized Shades", description: "Lighting and shades that work together for perfect ambiance, privacy, and energy savings.", path: "/services/shades" },
              { title: "Control4", description: "When lighting, audio, climate, and shades should all live behind one interface.", path: "/platforms/control4" },
              { title: "Not sure what you need?", description: "Answer a few questions and we will suggest a starting point for your home.", path: "/setup-finder" },
            ].map((s, i) => (
              <Link key={i} to={s.path} className="group flex items-start justify-between gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div>
                  <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Start with one room or rethink the whole house.</h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">RadioRA3 retrofits cleanly into finished homes; HomeWorks is the right line when the design calls for hand-crafted keypads and Ketra. We'll help you tell which fits.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=smart-lighting" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Walkthrough <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> (970) 519-3013</a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default SmartLighting;
