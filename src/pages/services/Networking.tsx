import { Wifi } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { NetworkingDemo } from "@/components/service-demos/NetworkingDemo";
import SpeedAdvisor from "@/components/SpeedAdvisor";

export default function Networking() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Home Networking",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Enterprise-grade home networking for smart homes in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const tiles = [
    {
      t: "Wi‑Fi design",
      d: "AP placement based on your floor plan—not guesswork.",
    },
    {
      t: "Wired where it matters",
      d: "Backhaul and hardwired drops for stability.",
    },
    {
      t: "Rack + labeling",
      d: "Clean builds that are serviceable later.",
    },
    {
      t: "Segmentation",
      d: "IoT + guest separation for reliability/security.",
    },
    {
      t: "Monitoring",
      d: "Proactive support when something degrades.",
    },
    {
      t: "Smart-home ready",
      d: "Foundation for Control4, cameras, AV, and more.",
    },
  ];

  return (
    <MarketingServiceLayout
      title="Networking"
      description="Reliable, enterprise-grade Wi‑Fi and wired networking built for always-on smart homes."
      keywords="home networking, WiFi, structured wiring, smart home, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Wifi}
    >
      {/* Keep tiles first (smaller, calmer) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((x) => (
          <div key={x.t} className="c4-tile rounded-2xl p-4">
            <div className="font-medium text-sm">{x.t}</div>
            <div className="text-white/60 text-sm mt-1 leading-relaxed">{x.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Why it matters</h2>
          <p className="text-white/70 mt-3">
            Most “smart home problems” are actually network problems. We build the foundation so everything else stays stable.
          </p>
        </div>

        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Typical outcomes</h2>
          <p className="text-white/70 mt-3">
            Faster roaming, fewer dead zones, reliable streaming, and systems that don’t randomly “go offline.”
          </p>
        </div>
      </div>

      {/* Speed test + recommendation (secondary) */}
      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">Test your speeds (optional)</div>
                <div className="text-white/70 mt-1">Internet + LAN → recommended upgrades.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <SpeedAdvisor />
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
                <div className="text-white/70 mt-1">A quick visual—secondary.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <NetworkingDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
