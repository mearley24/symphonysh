import { Wrench, Check } from "lucide-react";
import MarketingServiceLayout from "@/components/Layout/MarketingServiceLayout";
import { MaintenanceDemo } from "@/components/service-demos/MaintenanceDemo";

export default function Maintenance() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Maintenance & Support",
    provider: { "@type": "LocalBusiness", name: "Symphony Smart Homes" },
    description: "Ongoing smart home support and maintenance in Vail Valley, Colorado.",
    areaServed: "Vail Valley, Colorado",
  };

  const bullets = [
    "Troubleshooting and service calls",
    "System health checks and updates",
    "Network monitoring (when applicable)",
    "Scene tweaks and refinements",
    "New device additions and upgrades",
  ];

  return (
    <MarketingServiceLayout
      title="Maintenance & Support"
      description="Smart homes change over time. We keep your system stable, secure, and easy to use."
      keywords="smart home support, maintenance, Control4 service, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Wrench}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="c4-surface rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">What we handle</h2>
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
          <h2 className="text-2xl font-semibold">How we work</h2>
          <p className="text-white/70 mt-3">
            Fast response, clear communication, and fixes that stick. No mystery “reboot and hope.”
          </p>
        </div>
      </div>

      <div className="mt-8">
        <details className="c4-surface rounded-3xl p-6 sm:p-8">
          <summary className="cursor-pointer select-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">See a demo (optional)</div>
                <div className="text-white/70 mt-1">Secondary preview of support flow.</div>
              </div>
              <span className="text-white/50 text-sm">Expand</span>
            </div>
          </summary>
          <div className="mt-6">
            <MaintenanceDemo />
          </div>
        </details>
      </div>
    </MarketingServiceLayout>
  );
}
