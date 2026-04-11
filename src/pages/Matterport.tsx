import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, ScanLine, Home, Building2, Building, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgMatterport from "../assets/bg-matterport.jpg";

const Matterport = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const useCases = [
    { icon: Home, title: "Real Estate Listings", description: "Give buyers an immersive virtual walkthrough before they ever step foot on the property. Reduces unnecessary showings and attracts serious buyers." },
    { icon: Building2, title: "Construction Documentation", description: "Capture the state of a build at every phase — framing, rough-in, pre-drywall — for a permanent, navigable 3D record." },
    { icon: Building, title: "Property Records", description: "Create a detailed digital twin of your home for insurance, renovation planning, or property management." },
    { icon: ScanLine, title: "Short-Term Rentals", description: "Stand out on Airbnb and VRBO with a 3D tour that lets guests explore every room before booking." },
  ];

  const faqs = [
    { q: "What is a Matterport scan?", a: "It's a 3D capture of a physical space using a specialized camera. The result is an interactive, dollhouse-style model that anyone can explore from a browser — no app required." },
    { q: "How long does a scan take?", a: "Most homes can be scanned in 2–4 hours depending on size. Larger or multi-building properties may take a full day." },
    { q: "What do I get when it's done?", a: "You receive a hosted 3D virtual tour link, a floor plan, and optional photography. The tour can be embedded on your website or shared directly." },
    { q: "How much does it cost?", a: "Pricing depends on the size of the space. Contact us for a quote — we offer packages for real estate agents, builders, and homeowners." },
  ];

  return (
    <PageBackground image={bgMatterport}>
      <SEO
        title="Matterport 3D Scanning | Vail Valley, CO"
        description="Professional Matterport 3D virtual tours for Vail Valley real estate, construction documentation, and pre-construction planning."
        keywords="Matterport Vail Valley, 3D scanning Eagle County, virtual tour, pre-construction scan"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Matterport", url: "/matterport" }]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-accent" />
            </div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Matterport 3D Scanning</p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            Turn any space into an interactive 3D experience.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We capture immersive 3D virtual tours for real estate listings, construction documentation, and property records using professional Matterport technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=matterport-scan" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Scan <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Use Cases</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Who benefits from 3D scanning</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {useCases.map((item, i) => (
              <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">How it works</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Schedule", desc: "Book a scan date. We'll confirm timing based on property size and your needs." },
              { n: "02", title: "Capture", desc: "Our technician scans your space room by room using professional Matterport equipment." },
              { n: "03", title: "Deliver", desc: "Within a few business days, you receive your hosted 3D tour, floor plan, and shareable link." },
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="text-accent/20 text-5xl font-bold absolute -top-2 -left-1">{step.n}</span>
                <div className="pt-10">
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Questions about Matterport</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors" aria-expanded={openFaq === i}>
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to scan your space?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Contact us for pricing and availability. We serve the entire Vail Valley and Eagle County area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=matterport-scan" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Scan <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Matterport;
