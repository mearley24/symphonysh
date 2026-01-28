import { Wifi, Check } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { NetworkingDemo } from "@/components/service-demos/NetworkingDemo";

export default function Networking() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Home Networking",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Enterprise-grade home networking for smart homes in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const bullets = [
    "Wi‑Fi design that matches your floor plan (not guesswork)",
    "Wired backhaul where it matters",
    "Clean rack builds and labeling",
    "Network segmentation for IoT and guests",
    "Remote monitoring and support",
  ];

  return (
    <MarketingServiceLayout
      title="Networking"
      description="Reliable, enterprise-grade Wi‑Fi and wired networking built for always-on smart homes."
      keywords="home networking, WiFi, structured wiring, smart home, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Wifi}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Why it matters</h2>
          <p className="text-white/70 mt-3">
            Most “smart home problems” are actually network problems. We build the foundation so everything else stays stable.
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

        <div className="c4-tile rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Typical outcomes</h2>
          <div className="mt-3 text-white/70">
            Faster roaming, fewer dead zones, reliable streaming, and systems that don’t randomly “go offline.”
          </div>
        </div>
      </div>

      <div className="mt-8">
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
