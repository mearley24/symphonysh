import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Lightbulb, Clock, Eye, Palette, CheckCircle2, ChevronDown, Layers, Sliders, SquareStack, Sun, Blinds } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";

import PageBackground from "../../components/PageBackground";
import ProjectProof from "../../components/ProjectProof";
import bgLighting from "../../assets/bg-lighting.jpg";
import SceneLightingDemo from "../../components/smart-lighting/SceneLightingDemo";

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
    { icon: Lightbulb, title: "Keypads on the wall", description: "Control4 keypads as the default. Lutron Sunnata or hand-crafted HomeWorks keypads when the home calls for Lutron-grade lighting." },
    { icon: Palette, title: "Named Scenes", description: "Goodmorning, Welcome, Movie, Goodnight, Away — one-touch scenes labeled in plain English." },
    { icon: Clock, title: "Astronomic Schedules", description: "Lights that follow sunrise and sunset on their own — gentle mornings, warm dinners, soft path lights overnight." },
    { icon: Eye, title: "Tunable-white LED & Motion", description: "Tunable-white LED for warm-dim ambiance plus motion in hallways, baths, and closets." },
  ];

  const faqs = [
    { q: "What's the difference between smart bulbs and a real lighting system?", a: "Smart bulbs ride on Wi-Fi — fine for a lamp, frustrating across a house. Control4 and Lutron use dedicated dimmers and keypads on a system that stays solid even if the internet is acting up." },
    { q: "Which lighting platform do you usually start with?", a: "Control4 is our default for whole-home lighting and scenes. Lutron RadioRA3 is the right call for finished-home retrofits or when the home wants the Lutron keypad and dimming feel. HomeWorks fits luxury new builds with Ketra, Lumaris, and Palladiom." },
    { q: "Can you retrofit a finished home?", a: "Yes. Control4 dimmers and keypads or Lutron RadioRA3 Sunnata keypads both retrofit cleanly into existing switch boxes — no opened walls." },
    { q: "What does smart lighting cost?", a: "A single room with smart dimmers and a keypad usually starts around $1,200. Whole-home projects range from $6,000 to $25,000+ depending on circuit count and how custom the keypads are." },
    { q: "Will guests know it's a smart system?", a: "Probably not. Keypads look and feel like premium switches, scenes are labeled in plain English, and a single button still turns the room on or off without an app." },
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
      <SEO title="Smart Lighting & Control | Vail Valley" description="Control4 lighting and keypads by default for Vail Valley homes — Lutron RadioRA3 or HomeWorks when the home calls for it. Scenes, dimmers, and automated schedules." keywords="smart lighting Vail Valley, Control4 lighting Eagle County, Lutron RadioRA3, HomeWorks, lighting control, keypads" schema={[serviceSchema, faqSchema]} breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Smart Lighting", url: "/services/smart-lighting" }]} />
      <Header />

      <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        {/* Hero scrim — keeps white text readable over brighter areas of the photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"
        />
        <div className="relative max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> All Services</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-accent" /></div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Smart Lighting</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">Lighting that quietly sets the room.</h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">Control4 lighting and scenes by default — Lutron RadioRA3 or HomeWorks when the home calls for it. Named scenes, warm mornings, soft amber overnight, no phone in hand.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=smart-lighting" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Walkthrough <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"><Phone className="w-4 h-4" /> (970) 519-3013</a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Interactive scene demo */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">See It Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Tap a scene. Watch the room respond.</h2>
            <p className="text-white/55 text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              This is how a real system behaves — one button sets every light to its own level and color
              temperature, fades the room, and moves the shades. Not one global dimmer.
            </p>
          </div>
          <SceneLightingDemo />
        </div>
      </section>

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

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/10 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Lighting Path</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What a real lighting system has to answer.</h2>
          <p className="text-white/55 text-base leading-relaxed mb-12 max-w-2xl">Five questions worth getting right before the first switch goes in. Control4 is our default for the whole-home story; Lutron RadioRA3 or HomeWorks step in when the home calls for them.</p>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { step: "01", icon: Layers, title: "Control layer", body: "Where the brain lives. Control4 by default — keypads, scenes, and one app that ties lighting to shades, audio, and climate. Lutron RadioRA3 or HomeWorks for Lutron-grade dimming and architectural finishes." },
              { step: "02", icon: Sliders, title: "Dimming & load type", body: "Dimmers matched to the bulb — LED, low-voltage, halogen, or hybrid. The right driver and trim mean smooth fades, no flicker, and bulbs that actually last." },
              { step: "03", icon: SquareStack, title: "Keypads & scenes", body: "Goodmorning, Welcome, Movie, Goodnight, Away — labeled in plain English on a keypad anyone can read at a glance. One button still turns the room on or off without an app." },
              { step: "04", icon: Sun, title: "Accent & tunable lighting", body: "Tunable-white LED for warm-dim mornings and cool-bright tasks. Astronomic schedules follow sunrise and sunset on their own — soft amber overnight, no phone in hand." },
              { step: "05", icon: Blinds, title: "Shades & daylight", body: "Lighting and shades on the same system. Morning sun lifts the shades; afternoon glare drops them; evening scenes warm the room. Daylight does most of the work, the lights fill in." },
            ].map((s, i) => (
              <li key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent/70 font-mono text-xs tracking-widest">{s.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-accent" aria-hidden="true" /></div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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

      <ProjectProof
        setKey="lightingControl"
        eyebrow="Lighting in real rooms"
        headline="Scenes you'd actually use, in homes we delivered."
        subhead="Control4 lighting and Lutron keypads run the rooms below. Same one-button feel — theater, great room, media room, bedrooms."
        footerLink={{ to: "/projects", label: "Browse every project" }}
      />

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
              { title: "Control4", description: "Our default for whole-home lighting and control — keypads, scenes, and one app.", path: "/platforms/control4" },
              { title: "Lutron RadioRA3", description: "Lutron lighting option for finished-home retrofits.", path: "/platforms/lutron-radiora3" },
              { title: "Motorized Shades", description: "Lighting and shades that work together for ambiance, privacy, and energy savings.", path: "/services/shades" },
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
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">Control4 lighting is our default. RadioRA3 retrofits cleanly into finished homes; HomeWorks fits luxury new builds with Ketra and Palladiom. We'll help you tell which fits.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=smart-lighting" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Schedule a Walkthrough <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/platforms" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">Compare Platforms</Link>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            Not sure which? <Link to="/setup-finder" className="text-white/70 hover:text-accent transition-colors">Try the Setup Finder</Link> · <Link to="/resources/control4-vs-lutron-lighting" className="text-white/70 hover:text-accent transition-colors">Read Control4 vs Lutron</Link>
          </p>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default SmartLighting;
