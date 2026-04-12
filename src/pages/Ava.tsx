import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Smartphone, Wifi, Settings, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

import PageBackground from "../components/PageBackground";
import bgHomeIntegration from "../assets/bg-home-integration.jpg";

const Ava = () => {
  return (
    <PageBackground image={bgHomeIntegration}>
      <SEO
        title="AVA Smart Remote | Symphony Smart Homes"
        description="Experience the future of home control with AVA Smart Remote — simple, intuitive, and powerful."
        keywords="smart remote, AVA remote, home automation remote, Symphony Smart Homes"
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services/home-integration" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Automation
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">AVA Smart Remote</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            One remote that controls everything.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            AVA is a premium smart remote designed for simplicity. It replaces the clutter of multiple remotes with a single, intuitive device that controls your TV, audio, lights, shades, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling?service=ava" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://ava.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              Visit AVA.com <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Product Image + Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-8">
              <img
                src="/lovable-uploads/cb28d9d7-ffb1-4fee-ad38-79069db78c59.png"
                alt="AVA Smart Remote"
                className="w-full h-auto object-contain rounded-lg"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Key Features</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why AVA</h2>
              <div className="space-y-4">
                {[
                  { icon: Smartphone, title: "Intuitive Interface", description: "Clean, simple controls that anyone in the household can use — no learning curve." },
                  { icon: Wifi, title: "Wireless Connectivity", description: "Connects to your smart home system via Wi-Fi for reliable, responsive control." },
                  { icon: Settings, title: "Fully Customizable", description: "Programmed to match your specific setup — your rooms, your devices, your preferences." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Interested in AVA?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            We can set up a demo or include AVA as part of your smart home installation. Get in touch to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling?service=ava" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Demo <ArrowRight className="w-4 h-4" />
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

export default Ava;
