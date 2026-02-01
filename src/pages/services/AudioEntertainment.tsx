import { Volume2, Check, ArrowRight } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { AudioEntertainmentDemo } from "@/components/service-demos/AudioEntertainmentDemo";
import ServicePackages from "@/components/ServicePackages";

export default function AudioEntertainment() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Audio & Entertainment",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Multi-room audio and home theater design + installation in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const items = [
    { t: "Home theater", d: "Display/projector, surround sound, acoustics, calibration." },
    { t: "Whole-home audio", d: "Zones that stay in sync, easy source selection, simple control." },
    { t: "Clean installs", d: "Hidden wiring, tidy racks, and serviceable layouts." },
    { t: "Control4 integration", d: "Tie AV into scenes so the room behaves the way you expect." },
  ];

  const deliverables = [
    "System design + equipment selection",
    "Installation + calibration",
    "Programming + scenes",
    "Support and upgrades",
  ];

  return (
    <MarketingServiceLayout
      title="Audio & Entertainment"
      description="Home theaters and multi-room audio systems designed for simple control and long-term reliability."
      keywords="home theater, multi-room audio, Control4, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Volume2}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">What we install</h2>
          <div className="mt-5 grid gap-3">
            {items.map((i) => (
              <div key={i.t} className="c4-tile rounded-2xl p-5">
                <div className="font-medium">{i.t}</div>
                <div className="text-white/60 text-sm mt-1">{i.d}</div>
              </div>
            ))}
          </div>
        </div>

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
          <div className="mt-6 text-white/70">
            Want to see some installs? <a className="text-accent" href="/projects">View projects</a> <ArrowRight className="w-4 h-4 inline" />
          </div>
        </div>
      </div>

      {/* Packages (secondary) */}
      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">Packages + starting prices (optional)</div>
                <div className="text-white/70 mt-1">Two common starting points (MSRP-based).</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <ServicePackages
              packages={[
                {
                  name: "Essential",
                  tagline: "Clean sound + reliable control",
                  msrpBaseline: 3500,
                  includes: [
                    "Living room TV + sound system",
                    "Streaming/source integration",
                    "Professional install + calibration",
                  ],
                },
                {
                  name: "Signature",
                  tagline: "Theater-first experience",
                  msrpBaseline: 7500,
                  includes: [
                    "Dedicated home theater / media room",
                    "Surround sound + tuning",
                    "Control4 scene integration (if applicable)",
                  ],
                },
              ]}
            />
          </div>
        </details>
      </div>

      {/* Demo (secondary) */}
      <div className="mt-6">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">See a demo (optional)</div>
                <div className="text-white/70 mt-1">Interactive preview—secondary to the info above.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <AudioEntertainmentDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
