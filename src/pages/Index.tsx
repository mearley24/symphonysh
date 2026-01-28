import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Phone, Shield, Star, Tv, Wifi, Lightbulb, Home } from "lucide-react";
import SEO from "../components/SEO";
import Header from "@/components/Header";

const services = [
  { icon: Home, title: "Control4 Automation", desc: "One interface for your whole home", href: "/services/home-integration" },
  { icon: Tv, title: "Home Theaters", desc: "Design + install + calibration", href: "/services/audio-entertainment" },
  { icon: Wifi, title: "Networking", desc: "Reliable, enterprise-grade Wi‑Fi", href: "/services/networking" },
  { icon: Lightbulb, title: "Lighting", desc: "Scenes, dimming, and smart control", href: "/services/smart-lighting" },
  { icon: Shield, title: "Security", desc: "Cameras, access, and alerts", href: "/services/security-systems" },
];

export default function Index() {
  return (
    <div className="min-h-screen c4-gradient text-white">
      <SEO
        title="Symphony Smart Homes - Control4 Home Automation in Vail Valley"
        description="Control4 smart home design and installation in Vail Valley, Colorado. Home theaters, lighting, networking, security, and ongoing support."
        keywords="smart home automation, Control4, home theater, Vail Valley, Colorado, networking, smart lighting, security systems"
      />

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-white/70 text-sm mb-3 c4-pill rounded-full px-3 py-1.5">
                <MapPin className="w-4 h-4" />
                <span>Vail Valley, Colorado</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                Control4 smart home automation,
                <span className="text-white/80"> installed right.</span>
              </h1>

              <p className="text-white/70 mt-4 text-base sm:text-lg leading-relaxed">
                Symphony Smart Homes designs and installs Control4 systems that feel effortless: reliable networking,
                clean installs, and support that actually answers.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/scheduling"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a consultation
                </Link>
                <a
                  href="tel:+19705193013"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call (970) 519-3013
                </a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "500+", label: "Projects" },
                  { value: "15+", label: "Years" },
                  { value: "5★", label: "Rating" },
                ].map((s) => (
                  <div key={s.label} className="c4-tile rounded-2xl px-3 py-3">
                    <div className="text-lg font-semibold">{s.value}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="c4-surface rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src="/lovable-uploads/home theater/IMG_0979.JPG"
                  alt="Symphony Smart Homes - Home Theater Installation"
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white/70 text-xs">Featured project</div>
                  <div className="text-white font-semibold">Home Theater Installation</div>
                  <Link to="/projects" className="inline-flex items-center gap-2 text-accent text-sm mt-1">
                    View portfolio <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">Services</h2>
              <p className="text-white/70 mt-2">A complete smart home stack—from wiring to UI.</p>
            </div>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-2 text-white/80 hover:text-white">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.title} to={s.href} className="block">
                <div className="c4-tile rounded-2xl p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-white/60 mt-1">{s.desc}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <Link to="/services" className="block sm:hidden">
              <div className="c4-tile rounded-2xl p-5 text-center hover:bg-white/5 transition-colors">
                <span className="text-white/80">View all services</span>
              </div>
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              { n: "1", t: "Consult", d: "Walkthrough + goals + budget" },
              { n: "2", t: "Design", d: "Plan, equipment, and wiring" },
              { n: "3", t: "Install", d: "Clean execution + testing" },
              { n: "4", t: "Support", d: "Ongoing service + upgrades" },
            ].map((step) => (
              <div key={step.n} className="c4-tile rounded-2xl p-5">
                <div className="text-white/60 text-sm">Step {step.n}</div>
                <div className="font-medium mt-1">{step.t}</div>
                <div className="text-sm text-white/60 mt-1">{step.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 pb-16">
          <div className="c4-surface rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Ready to get started?</h2>
              <p className="text-white/70 mt-2">Book a free consultation and we’ll map the right approach for your home.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
              >
                Send a message
              </Link>
            </div>
          </div>

          <div className="text-center text-xs text-white/50 mt-6">
            © {new Date().getFullYear()} Symphony Smart Homes
          </div>
        </section>
      </main>
    </div>
  );
}
