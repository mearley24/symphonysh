import { useMemo, useState } from "react";
import { ArrowRight, Gauge, Network, Wifi } from "lucide-react";

type TierName = "1Gb" | "2.5Gb" | "10Gb";

function clampNum(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

async function runQuickDownloadTestMBps(sampleUrl: string, bytesApprox: number) {
  // NOTE: This is an approximate test. Real-world results depend on Wi‑Fi, device, and browser.
  const start = performance.now();
  const res = await fetch(`${sampleUrl}?_=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Speed test failed");
  // Consume the body to completion
  await res.arrayBuffer();
  const end = performance.now();
  const seconds = Math.max(0.001, (end - start) / 1000);

  // bytes/sec -> megabits/sec
  const bps = bytesApprox / seconds;
  const mbps = (bps * 8) / 1_000_000;
  return mbps;
}

export default function SpeedAdvisor() {
  const [lanLink, setLanLink] = useState<TierName>("1Gb");

  const [downMbps, setDownMbps] = useState<string>("");
  const [upMbps, setUpMbps] = useState<string>("");
  const [pingMs, setPingMs] = useState<string>("");

  const [quickRunning, setQuickRunning] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  // Package placeholders — fill with your starting-at installed pricing later.
  const packages: Array<{ tier: TierName; startingAtInstalled: number | null; blurb: string }> = [
    {
      tier: "1Gb",
      startingAtInstalled: null,
      blurb: "Rock-solid gigabit switching + Wi‑Fi designed for coverage and roaming.",
    },
    {
      tier: "2.5Gb",
      startingAtInstalled: null,
      blurb: "2.5Gb backbone for high-performance homes, racks, and multiple 4K streams.",
    },
    {
      tier: "10Gb",
      startingAtInstalled: null,
      blurb: "10Gb core for large homes, media servers/NAS, and demanding workflows.",
    },
  ];

  const parsed = useMemo(() => {
    const down = clampNum(parseFloat(downMbps || "0"), 0, 100_000);
    const up = clampNum(parseFloat(upMbps || "0"), 0, 100_000);
    const ping = clampNum(parseFloat(pingMs || "0"), 0, 10_000);
    return { down, up, ping };
  }, [downMbps, upMbps, pingMs]);

  const recommendation = useMemo(() => {
    // Heuristics:
    // - LAN tier is mostly about internal bandwidth (switching/backbone).
    // - Internet speeds above ~900 Mbps benefit from at least 2.5Gb LAN in key paths.
    // - 10Gb is for heavy internal traffic: NAS/media servers, large homes, pros.
    const down = parsed.down;

    let rec: TierName = "1Gb";
    let reason = "A well-designed 1Gb network solves the majority of reliability and coverage issues.";

    if (down >= 900) {
      rec = "2.5Gb";
      reason = "If you’re paying for ~1Gb internet, 2.5Gb in the right places prevents local bottlenecks.";
    }

    if (down >= 2000) {
      rec = "10Gb";
      reason = "Multi-gig internet and/or heavy internal traffic is where a 10Gb core starts to make sense.";
    }

    // If user already has higher LAN, don’t recommend lower.
    const order: Record<TierName, number> = { "1Gb": 1, "2.5Gb": 2, "10Gb": 3 };
    if (order[lanLink] > order[rec]) {
      rec = lanLink;
      reason = "Your LAN link tier is already higher—focus on design, coverage, and stability.";
    }

    // Ping hint (doesn’t change tier, but changes messaging)
    const pingNote = parsed.ping >= 50 ? " Higher latency suggests Wi‑Fi/congestion issues we can fix with design and tuning." : "";

    return { rec, reason: reason + pingNote };
  }, [parsed.down, parsed.ping, lanLink]);

  const runQuick = async () => {
    setQuickError(null);
    setQuickRunning(true);
    try {
      // Use an existing image as a lightweight sample; approximate bytes by assuming ~3.5MB.
      // (We can replace with a dedicated asset later if you want more accuracy.)
      const url = "/lovable-uploads/home theater/IMG_0979.JPG";
      const approxBytes = 3_500_000;
      const mbps = await runQuickDownloadTestMBps(url, approxBytes);
      setDownMbps(mbps.toFixed(0));
    } catch (e: any) {
      setQuickError(e?.message || "Could not run quick test");
    } finally {
      setQuickRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="c4-tile rounded-2xl p-4">
          <div className="text-white/60 text-xs">LAN / Backbone tier</div>
          <select
            value={lanLink}
            onChange={(e) => setLanLink(e.target.value as TierName)}
            className="mt-2 w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white"
          >
            <option value="1Gb">1Gb</option>
            <option value="2.5Gb">2.5Gb</option>
            <option value="10Gb">10Gb</option>
          </select>
          <div className="text-white/50 text-xs mt-2">This is your internal network speed (switching/backbone).</div>
        </div>

        <div className="c4-tile rounded-2xl p-4">
          <div className="text-white/60 text-xs">Internet download (Mbps)</div>
          <input
            inputMode="decimal"
            value={downMbps}
            onChange={(e) => setDownMbps(e.target.value)}
            placeholder="e.g. 450"
            className="mt-2 w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30"
          />
          <button
            type="button"
            onClick={runQuick}
            disabled={quickRunning}
            className="mt-2 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/90 disabled:opacity-50"
          >
            <Gauge className="w-4 h-4" />
            {quickRunning ? "Running quick test..." : "Run quick test"}
          </button>
          {quickError ? <div className="text-red-300 text-xs mt-1">{quickError}</div> : null}
          <div className="text-white/50 text-xs mt-1">Approximate; Wi‑Fi conditions affect results.</div>
        </div>

        <div className="c4-tile rounded-2xl p-4">
          <div className="text-white/60 text-xs">Internet upload (Mbps)</div>
          <input
            inputMode="decimal"
            value={upMbps}
            onChange={(e) => setUpMbps(e.target.value)}
            placeholder="e.g. 35"
            className="mt-2 w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30"
          />
          <div className="text-white/50 text-xs mt-2">WFH, cameras, and cloud backups care about upload.</div>
        </div>

        <div className="c4-tile rounded-2xl p-4">
          <div className="text-white/60 text-xs">Ping (ms)</div>
          <input
            inputMode="decimal"
            value={pingMs}
            onChange={(e) => setPingMs(e.target.value)}
            placeholder="e.g. 18"
            className="mt-2 w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30"
          />
          <div className="text-white/50 text-xs mt-2">Lower is better for calls, gaming, and responsiveness.</div>
        </div>
      </div>

      <div className="c4-surface rounded-3xl p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
            <Network className="w-5 h-5 text-white/80" />
          </div>
          <div className="flex-1">
            <div className="text-white/60 text-sm">Recommendation</div>
            <div className="text-2xl font-semibold mt-1">{recommendation.rec} network</div>
            <div className="text-white/70 mt-2">{recommendation.reason}</div>

            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {packages.map((p) => (
                <div key={p.tier} className={`c4-tile rounded-2xl p-5 ${p.tier === recommendation.rec ? "ring-1 ring-accent/40" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{p.tier}</div>
                    <Wifi className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="text-white/60 text-sm mt-2">{p.blurb}</div>
                  <div className="mt-4 text-white/70 text-sm">
                    Starting at{" "}
                    <span className="text-white font-semibold">
                      {p.startingAtInstalled == null ? "TBD" : `$${p.startingAtInstalled.toLocaleString()}`}
                    </span>
                    {" "}installed
                  </div>
                  <div className="mt-3 text-accent inline-flex items-center gap-1 text-sm">
                    Get pricing <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-white/50 text-xs mt-4">
              Starting-at pricing depends on home layout, wiring access, construction, and required coverage. We’ll confirm after a walkthrough.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
