import { Shield, Check } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { SecuritySystemDemo } from "@/components/service-demos/SecuritySystemDemo";
import ServicePackages from "@/components/ServicePackages";

export default function SecuritySystems() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Security Systems",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Security cameras, access control, and monitoring integrations in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const bullets = [
    "Camera placement that actually covers what you care about",
    "Clean cabling and weather-appropriate installs",
    "Remote viewing + notifications",
    "Access control and smart locks (when appropriate)",
    "Integration into Control4 scenes",
  ];

  return (
    <MarketingServiceLayout
      title="Security Systems"
      description="Cameras, access, and alerts—installed cleanly and integrated into a system you’ll actually use."
      keywords="security cameras, access control, smart locks, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Shield}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">What we build</h2>
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
          <h2 className="text-2xl font-semibold">Goal</h2>
          <p className="text-white/70 mt-3">
            Security that’s useful—not noisy. Good coverage, sensible alerts, and an interface your family will actually open.
          </p>
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
                  tagline: "Coverage for key entry points",
                  msrpBaseline: 2200,
                  includes: [
                    "Up to 4 cameras",
                    "NVR/recording + remote viewing",
                    "Professional install + setup",
                  ],
                },
                {
                  name: "Signature",
                  tagline: "More coverage + smarter notifications",
                  msrpBaseline: 4200,
                  includes: [
                    "Up to 8 cameras",
                    "Improved retention/storage",
                    "Integration into Control4 scenes (if applicable)",
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
                <div className="text-white/70 mt-1">Secondary preview of cameras and zones.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <SecuritySystemDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
