import { useState } from "react";

/**
 * SceneLightingDemo — "tap a scene, watch the room respond."
 *
 * A realistic model of how a Control4 / Lutron lighting system actually behaves:
 * a single scene button sets EVERY load to its own level + color temperature,
 * not one global brightness. Tapping a keypad button fades the room and updates
 * a live per-circuit readout — so the layout genuinely matches the loads.
 *
 * Pure SVG + CSS transitions. No dependencies, no real photos needed.
 */

type Temp = "cool" | "neutral" | "warm";
type Sky = "day" | "dusk" | "night";

interface Scene {
  id: string;
  label: string;
  note: string;
  // per-load levels, 0–100
  cans: number;        // recessed ceiling cans
  pendants: number;    // island pendants
  undercab: number;    // undercabinet
  cove: number;        // cove / indirect
  sconces: number;     // wall sconces (also the path light)
  temp: Temp;
  sky: Sky;
  tv: boolean;
  shades: number;      // 0 = up/open, 100 = fully down
}

const SCENES: Scene[] = [
  { id: "morning",  label: "Goodmorning", note: "Bright and cool to start the day — shades open, full task light.",
    cans: 75, pendants: 55, undercab: 100, cove: 0, sconces: 40, temp: "cool", sky: "day", tv: false, shades: 0 },
  { id: "cooking",  label: "Cooking",     note: "Full output over the island, everything crisp and even.",
    cans: 100, pendants: 85, undercab: 100, cove: 0, sconces: 60, temp: "neutral", sky: "day", tv: false, shades: 0 },
  { id: "dinner",   label: "Dinner",      note: "Low and warm for the table — pendants lead, cans drop back.",
    cans: 22, pendants: 45, undercab: 35, cove: 25, sconces: 30, temp: "warm", sky: "dusk", tv: false, shades: 0 },
  { id: "movie",    label: "Movie",       note: "Shades down, screen on, a whisper of cove light to find the popcorn.",
    cans: 4, pendants: 0, undercab: 0, cove: 14, sconces: 0, temp: "warm", sky: "night", tv: true, shades: 100 },
  { id: "goodnight", label: "Goodnight",  note: "Everything off but an 8% path light to bed. The house powers down.",
    cans: 0, pendants: 0, undercab: 0, cove: 0, sconces: 8, temp: "warm", sky: "night", tv: false, shades: 100 },
  { id: "away",     label: "Away",        note: "One tap on the way out — every load off, the house is empty.",
    cans: 0, pendants: 0, undercab: 0, cove: 0, sconces: 0, temp: "cool", sky: "day", tv: false, shades: 0 },
];

// warm→cool light color by temperature
const TEMP_COLOR: Record<Temp, string> = {
  warm: "#ffb86b",     // ~2700K
  neutral: "#ffe6c2",  // ~3500K
  cool: "#dCEBff",     // ~4000K+
};

const SKY: Record<Sky, [string, string]> = {
  day:   ["#9ec7e8", "#cfe4f2"],
  dusk:  ["#3a2a4a", "#b06a4a"],
  night: ["#0a0e1a", "#141a2e"],
};

const LOADS = [
  { key: "cans" as const, name: "Recessed cans", count: "×8" },
  { key: "pendants" as const, name: "Island pendants", count: "×3" },
  { key: "undercab" as const, name: "Undercabinet", count: "LED tape" },
  { key: "cove" as const, name: "Cove / accent", count: "perimeter" },
  { key: "sconces" as const, name: "Sconces / path", count: "×2" },
];

const SceneLightingDemo = () => {
  const [active, setActive] = useState("dinner");
  const s = SCENES.find((x) => x.id === active) || SCENES[2];
  const lc = TEMP_COLOR[s.temp];
  const [sky0, sky1] = SKY[s.sky];

  // glow opacity helper (level 0–100 → 0–1, eased)
  const g = (lvl: number) => Math.pow(lvl / 100, 0.7);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* ───────── Room visualization ───────── */}
        <div className="relative">
          <svg viewBox="0 0 600 380" className="w-full h-auto block" style={{ background: "#0b0d14" }}>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sky0} style={{ transition: "stop-color 1.2s" }} />
                <stop offset="100%" stopColor={sky1} style={{ transition: "stop-color 1.2s" }} />
              </linearGradient>
              <radialGradient id="canGlow"><stop offset="0%" stopColor={lc} stopOpacity="0.9" /><stop offset="100%" stopColor={lc} stopOpacity="0" /></radialGradient>
              <radialGradient id="ambiance" cx="50%" cy="38%" r="75%">
                <stop offset="0%" stopColor={lc} stopOpacity={0.16 * g(Math.max(s.cans, s.pendants))} style={{ transition: "stop-opacity 1.2s, stop-color 1.2s" }} />
                <stop offset="100%" stopColor={lc} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* walls / floor */}
            <rect x="0" y="0" width="600" height="300" fill="#12151f" />
            <rect x="0" y="300" width="600" height="80" fill="#0a0c12" />
            <rect x="0" y="296" width="600" height="4" fill="#1c2030" />

            {/* window with sky (dims shade over it) */}
            <g>
              <rect x="40" y="70" width="150" height="150" fill="url(#sky)" />
              <rect x="40" y="70" width="150" height="150" fill="none" stroke="#2a2f42" strokeWidth="6" />
              <line x1="115" y1="70" x2="115" y2="220" stroke="#2a2f42" strokeWidth="4" />
              <line x1="40" y1="145" x2="190" y2="145" stroke="#2a2f42" strokeWidth="4" />
              {/* shade */}
              <rect x="40" y="70" width="150" height={1.5 * s.shades} fill="#191c28" opacity="0.96"
                    style={{ transition: "height 1.2s ease" }} />
            </g>

            {/* cove / indirect light — a soft band along the ceiling */}
            <rect x="0" y="40" width="600" height="26" fill={lc} opacity={0.5 * g(s.cove)}
                  style={{ transition: "opacity 1.2s, fill 1.2s" }} />

            {/* recessed cans — 4 across, glow scales with level */}
            {[140, 270, 400, 520].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="60" r="38" fill="url(#canGlow)" opacity={g(s.cans)} style={{ transition: "opacity 1.2s" }} />
                <circle cx={cx} cy="58" r="5" fill={lc} opacity={0.4 + 0.6 * g(s.cans)} style={{ transition: "opacity 1.2s, fill 1.2s" }} />
                {/* light cone to floor */}
                <polygon points={`${cx - 4},60 ${cx + 4},60 ${cx + 46},300 ${cx - 46},300`} fill={lc} opacity={0.07 * g(s.cans)} style={{ transition: "opacity 1.2s, fill 1.2s" }} />
              </g>
            ))}

            {/* kitchen island + pendants (right side) */}
            <g>
              <rect x="360" y="250" width="180" height="46" rx="4" fill="#171b27" />
              <rect x="360" y="246" width="180" height="6" fill="#22283a" />
              {[400, 450, 500].map((cx, i) => (
                <g key={i}>
                  <line x1={cx} y1="120" x2={cx} y2="150" stroke="#2a2f42" strokeWidth="2" />
                  <circle cx={cx} cy="158" r="22" fill="url(#canGlow)" opacity={g(s.pendants)} style={{ transition: "opacity 1.2s" }} />
                  <circle cx={cx} cy="156" r="6" fill={lc} opacity={0.3 + 0.7 * g(s.pendants)} style={{ transition: "opacity 1.2s, fill 1.2s" }} />
                </g>
              ))}
              {/* undercabinet glow under the island lip */}
              <rect x="362" y="250" width="176" height="10" fill={lc} opacity={0.7 * g(s.undercab)} style={{ transition: "opacity 1.2s, fill 1.2s" }} />
            </g>

            {/* sconces (left wall) + their glow */}
            {[230, 270].map((cy, i) => (
              <g key={i}>
                <circle cx="245" cy={cy} r="20" fill="url(#canGlow)" opacity={g(s.sconces)} style={{ transition: "opacity 1.2s" }} />
                <rect x="241" y={cy - 8} width="8" height="16" rx="2" fill={lc} opacity={0.3 + 0.7 * g(s.sconces)} style={{ transition: "opacity 1.2s, fill 1.2s" }} />
              </g>
            ))}

            {/* TV (back wall center-left) */}
            <g>
              <rect x="250" y="120" width="90" height="56" rx="3" fill="#05070c" stroke="#1c2030" strokeWidth="2" />
              <rect x="254" y="124" width="82" height="48" fill={s.tv ? "#1b3a6b" : "#0a0d14"} opacity={s.tv ? 0.95 : 1} style={{ transition: "fill 0.8s" }} />
              {s.tv && <rect x="254" y="124" width="82" height="48" fill="#3b6fb0" opacity="0.5" style={{ transition: "opacity 0.8s" }} />}
            </g>

            {/* sofa silhouette (foreground) */}
            <g fill="#0d1018">
              <rect x="120" y="250" width="170" height="50" rx="10" />
              <rect x="120" y="234" width="170" height="28" rx="10" />
            </g>

            {/* overall ambiance wash */}
            <rect x="0" y="0" width="600" height="380" fill="url(#ambiance)" />
            {/* night darkening when everything is low */}
            <rect x="0" y="0" width="600" height="380" fill="#05060a"
                  opacity={0.55 * (1 - g(Math.max(s.cans, s.pendants, s.cove, s.sconces, s.undercab)))}
                  style={{ transition: "opacity 1.2s" }} />
          </svg>

          {/* scene caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase">{s.label}</p>
            <p className="text-white/80 text-sm mt-0.5">{s.note}</p>
          </div>
        </div>

        {/* ───────── Keypad + live loads ───────── */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col gap-5">
          {/* engraved keypad */}
          <div>
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase mb-3">Keypad</p>
            <div className="rounded-xl bg-gradient-to-b from-[#1a1d28] to-[#0e1018] border border-white/10 p-2.5 shadow-inner space-y-1.5">
              {SCENES.map((sc) => {
                const on = sc.id === active;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setActive(sc.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                      style={{
                        background: on ? "#ca9f5c" : "#3a3f4e",
                        boxShadow: on ? "0 0 8px 1px #ca9f5c" : "none",
                      }}
                    />
                    <span className={`text-sm font-medium tracking-wide ${on ? "text-white" : "text-white/55"}`}>
                      {sc.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* live circuit readout — the loads, matching the room */}
          <div>
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase mb-2.5">Live circuits</p>
            <div className="space-y-2">
              {LOADS.map((load) => {
                const lvl = s[load.key];
                return (
                  <div key={load.key} className="flex items-center gap-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-white/70 truncate">{load.name}</span>
                        <span className="text-white/40 tabular-nums">{lvl}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${lvl}%`, background: lvl > 0 ? TEMP_COLOR[s.temp] : "transparent" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-white/40">Shades</span>
                <span className="text-white/60">{s.shades === 0 ? "Open" : s.shades === 100 ? "Closed" : `${s.shades}%`}</span>
              </div>
            </div>
            <p className="text-white/30 text-[0.7rem] leading-relaxed mt-3">
              One button sets every circuit to its own level and color temperature — that's a scene.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneLightingDemo;
