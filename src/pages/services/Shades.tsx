import { Sun, Check } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { ShadesDemo } from "@/components/service-demos/ShadesDemo";

export default function Shades() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automated Shades",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Automated window shades integrated with Control4 in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const bullets = [
    "Glare control for TVs and living spaces",
    "Privacy scenes (Night, Away)",
    "Sun-tracking and schedule automation",
    "Integration with climate and lighting",
    "Clean install + tidy wiring",
  ];

  return (
    <MarketingServiceLayout
      title="Automated Shades"
      description="Automated window treatments that improve comfort, privacy, and energy efficiency—integrated into your smart home."
      keywords="automated shades, smart shades, Control4, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Sun}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Common goals</h2>
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
          <h2 className="text-2xl font-semibold">Why it’s worth it</h2>
          <p className="text-white/70 mt-3">
            Shades are one of the highest-impact automations: comfort, privacy, and lighting control—without thinking about it.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">See a demo (optional)</div>
                <div className="text-white/70 mt-1">Secondary preview of shade scenes.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <ShadesDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
