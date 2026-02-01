import { ArrowRight, Calculator } from "lucide-react";

export type ServicePackage = {
  name: string;
  tagline: string;
  msrpBaseline: number; // equipment MSRP baseline (public-safe)
  includes: string[];
};

function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}

export function installedStartingAtFromMsrp(msrpTotal: number) {
  // Default public rule (can be swapped later): installed ≈ MSRP * 2.4 rounded to nearest $250
  return roundTo(msrpTotal * 2.4, 250);
}

export default function ServicePackages({
  packages,
  note,
}: {
  packages: ServicePackage[];
  note?: string;
}) {
  return (
    <div className="c4-surface rounded-3xl p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold">Example packages (optional)</div>
          <div className="text-white/70 mt-1">Two realistic starting points. Final pricing depends on scope and site conditions.</div>
        </div>
        <div className="text-white/50 text-sm inline-flex items-center gap-2">
          <Calculator className="w-4 h-4" /> MSRP-based
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {packages.map((p) => {
          const installed = installedStartingAtFromMsrp(p.msrpBaseline);
          return (
            <div key={p.name} className="c4-tile rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-white/60 text-sm mt-1">{p.tagline}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/60 text-xs">Starting at</div>
                  <div className="text-white font-semibold">${installed.toLocaleString()}</div>
                  <div className="text-white/60 text-xs">installed</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {p.includes.map((x) => (
                  <div key={x} className="text-white/70 text-sm">• {x}</div>
                ))}
              </div>

              <div className="mt-4 text-accent inline-flex items-center gap-1 text-sm">
                Get an exact quote <ArrowRight className="w-4 h-4" />
              </div>

              <div className="text-white/35 text-xs mt-2">Equipment MSRP baseline: ${p.msrpBaseline.toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      <div className="text-white/50 text-xs mt-4">
        {note ||
          "Starting-at pricing includes typical installation + configuration. Complex wiring, construction constraints, and special requirements may change final pricing."}
      </div>
    </div>
  );
}
