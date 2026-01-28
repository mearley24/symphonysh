import { Thermometer, Check } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { ClimateControlDemo } from "@/components/service-demos/ClimateControlDemo";

export default function ClimateControl() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Climate Control",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Smart climate control integrations for Vail Valley, Colorado homes.",
    areaServed: "Vail Valley, Colorado",
  };

  const bullets = [
    "Smart thermostats + zoning (where appropriate)",
    "Comfort scenes (Away, Night, Vacation)",
    "Remote access and monitoring",
    "Integration with shades + occupancy",
    "Clean handoff and support",
  ];

  return (
    <MarketingServiceLayout
      title="Climate Control"
      description="Comfort automation that’s simple and predictable—integrated into your broader smart home system."
      keywords="smart thermostat, climate control, zoning, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Thermometer}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">What we do</h2>
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
          <h2 className="text-2xl font-semibold">Outcome</h2>
          <p className="text-white/70 mt-3">
            A home that stays comfortable without constant fiddling—especially important with mountain weather swings.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">See a demo (optional)</div>
                <div className="text-white/70 mt-1">Secondary preview of controls.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <ClimateControlDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
