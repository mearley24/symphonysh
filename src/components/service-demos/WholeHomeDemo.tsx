import { useState } from "react";
import { Lightbulb, Volume2, Thermometer, ShieldCheck, Video } from "lucide-react";

/**
 * WholeHomeDemo — the Control4 "everything in one place" demo, done realistically.
 *
 * A coherent main-floor plan where every system a real install ties together is
 * represented and responds to scenes: lighting glows at its true per-circuit
 * level + color temperature, audio zones play, climate sets back, security arms,
 * cameras record. One scene button orchestrates all of it — which is the whole
 * point of integration. Pure SVG + CSS; no dependencies, no photos.
 */

type Temp = "cool" | "neutral" | "warm";
type Sky = "day" | "dusk" | "night";
type Sec = "Disarmed" | "Armed · Stay" | "Armed · Away";

interface Scene {
  id: string;
  label: string;
  note: string;
  lights: Record<string, number>; // circuit id → 0-100
  temp: Temp;
  sky: Sky;
  tv: boolean;
  shades: number;                 // great-room shades, 0 open → 100 closed
  audioZones: string[];           // rooms with audio playing
  climate: number;                // setpoint °F
  climateLabel: string;
  security: Sec;
  cameras: boolean;               // surveillance recording
}

// Lighting circuits, grouped by room (each is a real load on a dimmer).
const CIRCUITS = [
  { id: "gr_cans", room: "Great Room", name: "Recessed cans" },
  { id: "gr_sconce", room: "Great Room", name: "Sconces" },
  { id: "k_cans", room: "Kitchen", name: "Recessed cans" },
  { id: "k_pendants", room: "Kitchen", name: "Island pendants" },
  { id: "k_under", room: "Kitchen", name: "Undercabinet" },
  { id: "dining", room: "Dining", name: "Chandelier" },
  { id: "primary", room: "Primary", name: "Bedside + cans" },
  { id: "hall", room: "Hall / Entry", name: "Path lights" },
];

const SCENES: Scene[] = [
  {
    id: "welcome", label: "Welcome Home",
    note: "Doors unlock, a warm welcome through the main floor, climate to comfort, music ready.",
    lights: { gr_cans: 70, gr_sconce: 50, k_cans: 80, k_pendants: 70, k_under: 100, dining: 55, primary: 0, hall: 45 },
    temp: "neutral", sky: "day", tv: false, shades: 0, audioZones: ["Kitchen"], climate: 71, climateLabel: "Comfort",
    security: "Disarmed", cameras: true,
  },
  {
    id: "cooking", label: "Cooking",
    note: "Full task light over the island, music in the kitchen, everything crisp.",
    lights: { gr_cans: 40, gr_sconce: 30, k_cans: 100, k_pendants: 90, k_under: 100, dining: 30, primary: 0, hall: 30 },
    temp: "neutral", sky: "day", tv: false, shades: 0, audioZones: ["Kitchen", "Great Room"], climate: 70, climateLabel: "Comfort",
    security: "Disarmed", cameras: true,
  },
  {
    id: "dinner", label: "Dinner",
    note: "Low and warm — chandelier leads, the room settles, soft music over dinner.",
    lights: { gr_cans: 20, gr_sconce: 25, k_cans: 25, k_pendants: 30, k_under: 35, dining: 55, primary: 0, hall: 25 },
    temp: "warm", sky: "dusk", tv: false, shades: 0, audioZones: ["Dining"], climate: 70, climateLabel: "Comfort",
    security: "Disarmed", cameras: true,
  },
  {
    id: "movie", label: "Movie",
    note: "Great-room shades down, screen on, surround up, a whisper of cove light. Rest of the floor dark.",
    lights: { gr_cans: 5, gr_sconce: 0, k_cans: 0, k_pendants: 0, k_under: 0, dining: 0, primary: 0, hall: 12 },
    temp: "warm", sky: "night", tv: true, shades: 100, audioZones: ["Great Room"], climate: 71, climateLabel: "Comfort",
    security: "Disarmed", cameras: true,
  },
  {
    id: "goodnight", label: "Goodnight",
    note: "Main floor off but a path to bed, climate to night setback, doors locked and the house armed.",
    lights: { gr_cans: 0, gr_sconce: 0, k_cans: 0, k_pendants: 0, k_under: 0, dining: 0, primary: 15, hall: 10 },
    temp: "warm", sky: "night", tv: false, shades: 100, audioZones: [], climate: 66, climateLabel: "Night setback",
    security: "Armed · Stay", cameras: true,
  },
  {
    id: "away", label: "Away",
    note: "A sconce stays on so the house looks lived-in, climate sets way back, every zone armed and recording.",
    lights: { gr_cans: 0, gr_sconce: 30, k_cans: 0, k_pendants: 0, k_under: 0, dining: 0, primary: 0, hall: 20 },
    temp: "warm", sky: "night", tv: false, shades: 0, audioZones: [], climate: 62, climateLabel: "Away setback",
    security: "Armed · Away", cameras: true,
  },
];

const TEMP_COLOR: Record<Temp, string> = { warm: "#ffb86b", neutral: "#ffe6c2", cool: "#dcebff" };

// Lighting fixtures placed sensibly inside each room. Each maps to a circuit.
const FIXTURES: { x: number; y: number; r: number; circuit: string }[] = [
  // Great Room — 2×2 recessed grid
  { x: 110, y: 120, r: 30, circuit: "gr_cans" }, { x: 250, y: 120, r: 30, circuit: "gr_cans" },
  { x: 110, y: 210, r: 30, circuit: "gr_cans" }, { x: 250, y: 210, r: 30, circuit: "gr_cans" },
  // Great Room sconces (left wall)
  { x: 52, y: 130, r: 18, circuit: "gr_sconce" }, { x: 52, y: 200, r: 18, circuit: "gr_sconce" },
  // Kitchen cans
  { x: 380, y: 80, r: 24, circuit: "k_cans" }, { x: 440, y: 80, r: 24, circuit: "k_cans" },
  // Kitchen pendants over island
  { x: 405, y: 140, r: 18, circuit: "k_pendants" }, { x: 450, y: 140, r: 18, circuit: "k_pendants" }, { x: 495, y: 140, r: 18, circuit: "k_pendants" },
  // Dining chandelier
  { x: 450, y: 240, r: 26, circuit: "dining" },
  // Primary suite
  { x: 95, y: 330, r: 22, circuit: "primary" }, { x: 185, y: 330, r: 22, circuit: "primary" },
  { x: 70, y: 300, r: 14, circuit: "primary" }, { x: 210, y: 300, r: 14, circuit: "primary" },
  // Hall / entry path
  { x: 290, y: 320, r: 16, circuit: "hall" }, { x: 290, y: 390, r: 16, circuit: "hall" },
  // Office (right) — share kitchen cans visual group via hall for simplicity
  { x: 410, y: 340, r: 22, circuit: "hall" }, { x: 500, y: 340, r: 22, circuit: "hall" },
];

const WholeHomeDemo = () => {
  const [active, setActive] = useState("welcome");
  const s = SCENES.find((x) => x.id === active) || SCENES[0];
  const lc = TEMP_COLOR[s.temp];
  const skyFill = s.sky === "day" ? "#9ec7e8" : s.sky === "dusk" ? "#7a4a5a" : "#0d1326";
  const g = (lvl: number) => Math.pow(lvl / 100, 0.7);
  const lvl = (c: string) => s.lights[c] ?? 0;
  const overallDim = 1 - g(Math.max(...Object.values(s.lights)));

  const systems = [
    { icon: Lightbulb, label: "Lighting", value: `${Object.values(s.lights).filter((v) => v > 0).length} circuits on` },
    { icon: Volume2, label: "Audio", value: s.audioZones.length ? s.audioZones.join(", ") : "Quiet" },
    { icon: Thermometer, label: "Climate", value: `${s.climate}° · ${s.climateLabel}` },
    { icon: ShieldCheck, label: "Security", value: s.security },
    { icon: Video, label: "Surveillance", value: s.cameras ? "All cameras recording" : "Idle" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* ───────── Floor plan ───────── */}
        <div className="relative p-3">
          <svg viewBox="0 0 560 440" className="w-full h-auto block rounded-lg" style={{ background: "#0b0d14" }}>
            <defs>
              <radialGradient id="wh-glow"><stop offset="0%" stopColor={lc} stopOpacity="0.85" /><stop offset="100%" stopColor={lc} stopOpacity="0" /></radialGradient>
            </defs>

            {/* room footprints (tiled, sharing walls = coherent) */}
            {[
              { x: 40, y: 50, w: 300, h: 230, label: "Great Room" },
              { x: 340, y: 50, w: 200, h: 150, label: "Kitchen" },
              { x: 340, y: 200, w: 200, h: 80, label: "Dining" },
              { x: 40, y: 280, w: 220, h: 130, label: "Primary Suite" },
              { x: 260, y: 280, w: 80, h: 130, label: "Hall" },
              { x: 340, y: 280, w: 200, h: 130, label: "Office" },
            ].map((rm) => (
              <g key={rm.label}>
                <rect x={rm.x} y={rm.y} width={rm.w} height={rm.h} fill="#12151f" stroke="#2a2f42" strokeWidth="1.5" />
                <text x={rm.x + 8} y={rm.y + 16} className="fill-white/35" style={{ fontSize: 10, letterSpacing: 0.5 }}>{rm.label.toUpperCase()}</text>
              </g>
            ))}

            {/* kitchen island */}
            <rect x="390" y="125" width="120" height="34" rx="3" fill="#171b27" stroke="#2a2f42" />
            {/* great-room TV + shades (south wall) */}
            <rect x="150" y="52" width="84" height="10" fill={s.tv ? "#1b3a6b" : "#0a0d14"} style={{ transition: "fill 0.8s" }} />
            {/* window on great room west wall with sky + shade */}
            <rect x="40" y="95" width="8" height="90" fill={skyFill} style={{ transition: "fill 1.2s" }} />
            <rect x="40" y="95" width="8" height={0.9 * s.shades} fill="#191c28" style={{ transition: "height 1.2s" }} />

            {/* lighting fixtures — glow at real per-circuit level */}
            {FIXTURES.map((f, i) => {
              const v = lvl(f.circuit);
              return (
                <g key={i}>
                  <circle cx={f.x} cy={f.y} r={f.r} fill="url(#wh-glow)" opacity={g(v)} style={{ transition: "opacity 1s" }} />
                  <circle cx={f.x} cy={f.y} r={3.5} fill={lc} opacity={0.3 + 0.7 * g(v)} style={{ transition: "opacity 1s, fill 1s" }} />
                </g>
              );
            })}

            {/* undercabinet strip glow */}
            <rect x="392" y="159" width="116" height="6" fill={lc} opacity={0.7 * g(lvl("k_under"))} style={{ transition: "opacity 1s, fill 1s" }} />

            {/* ── device markers (the other systems) ── */}
            {/* speakers (audio) — pulse when their zone plays */}
            {[
              { x: 315, y: 70, room: "Great Room" }, { x: 525, y: 65, room: "Kitchen" },
              { x: 525, y: 240, room: "Dining" }, { x: 60, y: 395, room: "Primary" },
            ].map((sp, i) => {
              const on = s.audioZones.includes(sp.room);
              return (
                <g key={i} opacity={on ? 1 : 0.3} style={{ transition: "opacity 0.6s" }}>
                  <circle cx={sp.x} cy={sp.y} r="7" fill="none" stroke="#5b8cff" strokeWidth="1.5" />
                  <circle cx={sp.x} cy={sp.y} r="2.5" fill="#5b8cff" className={on ? "animate-pulse" : ""} />
                </g>
              );
            })}
            {/* thermostat (climate) */}
            <g>
              <rect x="300" y="150" width="34" height="18" rx="4" fill="#0f1420" stroke="#2a3550" />
              <text x="317" y="163" textAnchor="middle" className="fill-emerald-300" style={{ fontSize: 10 }}>{s.climate}°</text>
            </g>
            {/* cameras (surveillance) at entries/corners */}
            {[{ x: 300, y: 295 }, { x: 50, y: 60 }, { x: 530, y: 60 }].map((c, i) => (
              <g key={i} opacity={s.cameras ? 1 : 0.25} style={{ transition: "opacity 0.6s" }}>
                <circle cx={c.x} cy={c.y} r="5.5" fill="#0f1420" stroke="#9aa6c7" strokeWidth="1" />
                <circle cx={c.x} cy={c.y} r="2" fill={s.cameras ? "#f87171" : "#3a3f4e"} className={s.cameras ? "animate-pulse" : ""} />
              </g>
            ))}
            {/* entry door lock (security) */}
            <g>
              <rect x="282" y="404" width="16" height="6" rx="1" fill={s.security === "Disarmed" ? "#34d399" : "#f59e0b"} style={{ transition: "fill 0.6s" }} />
            </g>

            {/* night darkening wash */}
            <rect x="0" y="0" width="560" height="440" fill="#05060a" opacity={0.5 * overallDim} style={{ transition: "opacity 1s" }} pointerEvents="none" />
          </svg>

          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase">{s.label}</p>
            <p className="text-white/80 text-sm mt-0.5">{s.note}</p>
          </div>
        </div>

        {/* ───────── Control surface ───────── */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col gap-5">
          <div>
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase mb-3">Scenes</p>
            <div className="rounded-xl bg-gradient-to-b from-[#1a1d28] to-[#0e1018] border border-white/10 p-2.5 space-y-1.5">
              {SCENES.map((sc) => {
                const on = sc.id === active;
                return (
                  <button key={sc.id} onClick={() => setActive(sc.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200 ${on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                      style={{ background: on ? "#ca9f5c" : "#3a3f4e", boxShadow: on ? "0 0 8px 1px #ca9f5c" : "none" }} />
                    <span className={`text-sm font-medium tracking-wide ${on ? "text-white" : "text-white/55"}`}>{sc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase mb-2.5">Systems</p>
            <div className="space-y-2.5">
              {systems.map((sys) => (
                <div key={sys.label} className="flex items-center gap-3">
                  <sys.icon className="w-4 h-4 text-accent/80 shrink-0" />
                  <div className="flex-1 min-w-0 flex justify-between items-baseline gap-2">
                    <span className="text-white/70 text-xs">{sys.label}</span>
                    <span className="text-white/45 text-xs text-right truncate">{sys.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-[0.7rem] leading-relaxed mt-4">
              One scene, every system — that's what integration means. Lighting, audio, climate, security, and
              cameras moving together on one button.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeHomeDemo;
