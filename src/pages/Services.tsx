import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Home,
  Lightbulb,
  Shield,
  Thermometer,
  Volume2,
  Wifi,
  Sun,
  Wrench,
} from "lucide-react";
import SEO from "../components/SEO";
import Header from "@/components/Header";

const services = [
  {
    icon: Home,
    title: "Control4 Automation",
    description: "Unified smart home control with clean, reliable installs.",
    link: "/services/home-integration",
  },
  {
    icon: Volume2,
    title: "Audio & Entertainment",
    description: "Multi-room audio, home theaters, and whole-home AV.",
    link: "/services/audio-entertainment",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Cameras, access control, and smart alerts.",
    link: "/services/security-systems",
  },
  {
    icon: Lightbulb,
    title: "Smart Lighting",
    description: "Lighting scenes, dimming, and intuitive control.",
    link: "/services/smart-lighting",
  },
  {
    icon: Thermometer,
    title: "Climate Control",
    description: "Comfort automation and smart temperature management.",
    link: "/services/climate-control",
  },
  {
    icon: Wifi,
    title: "Networking",
    description: "Enterprise-grade Wi‑Fi built for reliability.",
    link: "/services/networking",
  },
  {
    icon: Sun,
    title: "Shades",
    description: "Automated window treatments that just work.",
    link: "/services/shades",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Ongoing support, service calls, and upgrades.",
    link: "/services/maintenance",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen c4-gradient text-white">
      <SEO
        title="Smart Home Services - Symphony Smart Homes"
        description="Control4 automation, home theaters, security, lighting, networking, and more in Vail Valley, Colorado."
        keywords="smart home services, Control4, home automation, home theater, security systems, smart lighting, networking, Vail Valley"
      />

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="c4-surface rounded-3xl p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Services</h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Complete smart home design + installation—from wiring and networking to Control4 programming and support.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Schedule a consultation
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
              >
                View our work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.title} to={s.link} className="block">
                <div className="c4-tile rounded-2xl p-5 hover:bg-white/5 transition-colors h-full">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-white/60 mt-1">{s.description}</div>
                      <div className="text-sm text-accent mt-3 inline-flex items-center gap-1">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pb-16">
          <div className="c4-surface rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Not sure what you need?</h2>
              <p className="text-white/70 mt-2">Tell us your goals and we’ll recommend the cleanest path.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
              >
                Send a message
              </Link>
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
