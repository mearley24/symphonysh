import { Home, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { Control4Demo } from "@/components/service-demos/Control4Demo";

export default function HomeIntegration() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Control4 Home Automation",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Control4 smart home automation design and installation in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const benefits = [
    {
      t: "One interface",
      d: "Lighting, climate, AV, and security—controlled from one place.",
    },
    {
      t: "Reliable by design",
      d: "We build the underlying network and wiring so the system stays stable.",
    },
    {
      t: "Scenes that make sense",
      d: "Good automation is predictable—" +
        "not a science project you have to babysit.",
    },
    {
      t: "Support after install",
      d: "We maintain and refine your system as your home changes.",
    },
  ];

  const deliverables = [
    "System design + equipment recommendations",
    "Structured wiring + rack build (as needed)",
    "Control4 programming + scenes",
    "Testing, handoff, and ongoing support",
  ];

  return (
    <MarketingServiceLayout
      title="Control4 Home Automation"
      description="Unified smart home control that feels effortless—designed, installed, and supported for Vail Valley homes."
      keywords="Control4, home automation, smart home integration, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Home}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">What you get</h2>
          <div className="mt-5 space-y-3">
            {deliverables.map((d) => (
              <div key={d} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent mt-0.5" />
                <div className="text-white/75">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/projects" className="text-accent inline-flex items-center gap-2">
              View examples <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          {benefits.map((b) => (
            <div key={b.t} className="c4-tile rounded-2xl p-5">
              <div className="font-medium">{b.t}</div>
              <div className="text-white/60 text-sm mt-1">{b.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo (secondary) */}
      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">See a demo (optional)</div>
                <div className="text-white/70 mt-1">A small interactive preview—just to show the feel.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <Control4Demo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
