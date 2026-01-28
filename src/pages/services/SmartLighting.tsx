import { Lightbulb, Check } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { HomeAutomationDemo } from "@/components/service-demos/HomeAutomationDemo";

export default function SmartLighting() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Smart Lighting",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Smart lighting scenes and control systems for Vail Valley homes.",
    areaServed: "Vail Valley, Colorado",
  };

  const bullets = [
    "Scenes for real life (Morning, Dinner, Movie, Away)",
    "Dimming + keypads done cleanly",
    "Whole-home consistency (no random one-off switches)",
    "Integration with security + AV",
    "Serviceable wiring and documentation",
  ];

  return (
    <MarketingServiceLayout
      title="Smart Lighting"
      description="Lighting that supports your routines—scenes, dimming, and control that’s consistent across the home."
      keywords="smart lighting, lighting scenes, Control4, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Lightbulb}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Common requests</h2>
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
          <h2 className="text-2xl font-semibold">The difference</h2>
          <p className="text-white/70 mt-3">
            Smart lighting isn’t just “app control.” It’s designing the experience so your home behaves predictably.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">See a demo (optional)</div>
                <div className="text-white/70 mt-1">Secondary preview of scenes.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <HomeAutomationDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
