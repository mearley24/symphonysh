import { Link } from "react-router-dom";
import { ArrowRight, Award, Calendar, Check, Shield, Star, Users } from "lucide-react";
import SEO from "../components/SEO";
import Header from "@/components/Header";

const stats = [
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "500+", label: "Projects Completed", icon: Star },
  { value: "24/7", label: "Support", icon: Shield },
  { value: "Local", label: "Vail Valley", icon: Users },
];

const bullets = [
  "Control4 expertise (design + install + support)",
  "Clean installs: wiring, racks, and finishes done right",
  "Reliable networking built for always-on systems",
  "Thoughtful UX: simple scenes, predictable behavior",
  "Long-term support and maintenance",
];

export default function About() {
  return (
    <div className="min-h-screen c4-gradient text-white">
      <SEO
        title="About - Symphony Smart Homes"
        description="Learn about Symphony Smart Homes—Control4 smart home design, installation, and support in Vail Valley, Colorado."
        keywords="about, smart home, Control4, home automation, Vail Valley"
      />

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="c4-surface rounded-3xl p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">About Symphony</h1>
            <p className="text-white/70 mt-3 max-w-3xl">
              We build Control4 systems that feel effortless. That means reliable infrastructure, clean installs,
              and support after the install—because smart homes aren’t "set it and forget it." They’re living systems.
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

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="c4-tile rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold">{s.value}</div>
                    <div className="text-white/60 text-sm">{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="c4-surface rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">What we care about</h2>
              <p className="text-white/70 mt-2">
                The goal isn’t more gadgets—it’s a home that behaves predictably and is easy to live with.
              </p>
              <div className="mt-5 space-y-3">
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5" />
                    <div className="text-white/75">{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="c4-surface rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Next step</h2>
              <p className="text-white/70 mt-2">
                A quick consultation gets us aligned on goals, budget, and timeline.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  Message us
                </Link>
                <Link
                  to="/scheduling"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  Schedule
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-6 text-white/50 text-sm">
                Serving Vail Valley, Colorado.
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pb-16">
          <div className="text-center text-xs text-white/50">© {new Date().getFullYear()} Symphony Smart Homes</div>
        </section>
      </main>
    </div>
  );
}
