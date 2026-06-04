import { useState } from "react";
import { Lightbulb, Volume2, Thermometer, ShieldCheck, Video, Wifi } from "lucide-react";

/**
 * WholeHomeDemo — whole-home control rendered on the REAL blueprint.
 *
 * The floor plan is the actual main-level architectural drawing for a Symphony
 * project (rendered straight from the source PDF, title block cropped off). The
 * per-room light pools are positioned from the project markup via the affine
 * transform that aligns markup space to the drawing, so every scene lights the
 * true rooms. One engraved keypad orchestrates lighting, audio, climate,
 * security, and cameras — the same lighting-scene model used on the Smart
 * Lighting page, here across the whole floor.
 *
 * Pure <img> + SVG + CSS. No dependencies.
 */

type Temp = "cool" | "neutral" | "warm";
type Sky = "day" | "dusk" | "night";
type Sec = "Disarmed" | "Armed · Stay" | "Armed · Away";

const IMG = "/lovable-uploads/home-integration/blueprint/base.jpg";
const VBW = 1600, VBH = 1577; // base.jpg dimensions

// Per-room light pools, aligned to the blueprint (markup → drawing transform).
const GLOWS: { name: string; cx: number; cy: number; rx: number; ry: number }[] = [
  { name: "Garage", cx: 482, cy: 193, rx: 220, ry: 300 },
  { name: "Mudroom", cx: 300, cy: 484, rx: 85, ry: 120 },
  { name: "Office 2", cx: 466, cy: 506, rx: 75, ry: 120 },
  { name: "Office", cx: 650, cy: 626, rx: 94, ry: 150 },
  { name: "Front Entry", cx: 806, cy: 692, rx: 73, ry: 92 },
  { name: "Stairwell", cx: 934, cy: 635, rx: 59, ry: 150 },
  { name: "Dining", cx: 115, cy: 926, rx: 84, ry: 180 },
  { name: "Kitchen", cx: 382, cy: 1013, rx: 167, ry: 300 },
  { name: "Hearth", cx: 360, cy: 1380, rx: 150, ry: 150 },
  { name: "Living Room", cx: 852, cy: 1059, rx: 257, ry: 330 },
  { name: "Primary Bath", cx: 1152, cy: 596, rx: 167, ry: 230 },
  { name: "Primary Bed", cx: 1206, cy: 1217, rx: 189, ry: 360 },
  { name: "Deck", cx: 879, cy: 1560, rx: 315, ry: 120 },
];

interface Scene {
  id: string; label: string; note: string;
  lights: Record<string, number>;
  temp: Temp; sky: Sky; tv: boolean; shades: number;
  audioZones: string[]; climateMain: number; climatePrimary: number; security: Sec; cameras: boolean;
}

const SCENES: Scene[] = [
  { id: "welcome", label: "Welcome Home",
    note: "Front door unlocks, a warm welcome through the entry, kitchen and living room, climate to comfort, music in the kitchen.",
    lights: { "Front Entry": 90, "Mudroom": 55, "Office": 35, "Office 2": 25, "Stairwell": 35, "Kitchen": 80, "Dining": 55, "Living Room": 70, "Hearth": 45 },
    temp: "neutral", sky: "day", tv: false, shades: 0, audioZones: ["Kitchen"], climateMain: 71, climatePrimary: 70, security: "Disarmed", cameras: true },
  { id: "cooking", label: "Cooking",
    note: "Full task light over the island, the hearth and living room come up, music through the kitchen and living room.",
    lights: { "Kitchen": 100, "Dining": 45, "Living Room": 50, "Hearth": 55, "Mudroom": 30, "Front Entry": 50, "Stairwell": 20 },
    temp: "neutral", sky: "day", tv: false, shades: 0, audioZones: ["Kitchen", "Living Room"], climateMain: 70, climatePrimary: 70, security: "Disarmed", cameras: true },
  { id: "dinner", label: "Dinner",
    note: "Dining leads, the living room settles to a warm wash, the deck glows, soft music inside and out.",
    lights: { "Dining": 80, "Kitchen": 25, "Living Room": 35, "Hearth": 40, "Deck": 55, "Front Entry": 30, "Stairwell": 15 },
    temp: "warm", sky: "dusk", tv: false, shades: 0, audioZones: ["Dining", "Deck"], climateMain: 70, climatePrimary: 69, security: "Disarmed", cameras: true },
  { id: "movie", label: "Movie",
    note: "Living-room shades down, screen on, just enough path light, surround up. The rest of the floor goes dark.",
    lights: { "Living Room": 8, "Hearth": 6, "Stairwell": 8, "Front Entry": 6 },
    temp: "warm", sky: "night", tv: true, shades: 100, audioZones: ["Living Room"], climateMain: 71, climatePrimary: 68, security: "Disarmed", cameras: true },
  { id: "goodnight", label: "Goodnight",
    note: "Main floor off but a soft path to bed, climate to night setback, every door locked and the house armed to stay.",
    lights: { "Primary Bed": 16, "Stairwell": 12 },
    temp: "warm", sky: "night", tv: false, shades: 100, audioZones: [], climateMain: 66, climatePrimary: 65, security: "Armed · Stay", cameras: true },
  { id: "away", label: "Away",
    note: "A light at the entry and the deck stay on so the house looks lived-in, climate sets way back, every zone armed and all cameras recording.",
    lights: { "Front Entry": 22, "Mudroom": 12, "Deck": 28 },
    temp: "warm", sky: "night", tv: false, shades: 0, audioZones: [], climateMain: 62, climatePrimary: 62, security: "Armed · Away", cameras: true },
];

const TEMP_COLOR: Record<Temp, string> = { warm: "#ffb070", neutral: "#ffe2b8", cool: "#cfe2ff" };

const CAMERAS = [
  { x: 30, y: 28, fov: 45, label: "NW · Driveway" },
  { x: VBW - 30, y: 28, fov: 135, label: "NE · Front Entry" },
  { x: VBW - 30, y: VBH - 28, fov: 225, label: "SE · View Deck" },
  { x: 30, y: VBH - 28, fov: 315, label: "SW · South Yard" },
];

const WholeHomeDemo = () => {
  const [active, setActive] = useState("welcome");
  const [hoverCam, setHoverCam] = useState<string | null>(null);
  const s = SCENES.find((x) => x.id === active) || SCENES[0];
  const lc = TEMP_COLOR[s.temp];
  const g = (v: number) => Math.pow(v / 100, 0.7);
  const lvl = (room: string) => s.lights[room] ?? 0;
  const litRooms = GLOWS.filter((r) => lvl(r.name) > 0).length;
  const interiorMax = Math.max(0, ...GLOWS.filter((r) => r.name !== "Deck").map((r) => lvl(r.name)));
  const dim = 1 - g(interiorMax);

  const systems = [
    { icon: Lightbulb, label: "Lighting", value: `${litRooms} of ${GLOWS.length} rooms lit` },
    { icon: Volume2, label: "Audio", value: s.audioZones.length ? s.audioZones.join(" · ") : "All zones quiet" },
    { icon: Thermometer, label: "Climate", value: `Main ${s.climateMain}° · Primary ${s.climatePrimary}°` },
    { icon: ShieldCheck, label: "Security", value: s.security },
    { icon: Video, label: "Surveillance", value: s.cameras ? "4 cameras · recording" : "Idle" },
    { icon: Wifi, label: "Network", value: "Online · 1.2 Gbps" },
  ];

  const cone = (cx: number, cy: number, deg: number) => {
    const sp = 42, len = 620, a = (deg * Math.PI) / 180;
    const a1 = a - (sp * Math.PI) / 180, a2 = a + (sp * Math.PI) / 180;
    return `M ${cx} ${cy} L ${cx + len * Math.cos(a1)} ${cy + len * Math.sin(a1)} L ${cx + len * Math.cos(a2)} ${cy + len * Math.sin(a2)} Z`;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1119] to-[#0a0c12] overflow-hidden shadow-2xl">
      {/* header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" />
          <span className="text-white/90 text-sm font-semibold tracking-wide">Main Floor</span>
          <span className="text-white/30 text-xs hidden sm:inline">· Whole-Home Control</span>
        </div>
        <span className="text-white/40 text-xs tabular-nums">{s.sky === "day" ? "2:14 PM" : s.sky === "dusk" ? "6:48 PM" : "10:32 PM"} · 28°F</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* ───────── Real blueprint + lighting overlay ───────── */}
        <div className="p-3">
          <div className="relative rounded-lg overflow-hidden" style={{ background: "#07090e" }}>
            <img src={IMG} alt="Main-floor plan" className="w-full h-auto block select-none" draggable={false} />
            <svg viewBox={`0 0 ${VBW} ${VBH}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <filter id="wh-soft" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="26" />
                </filter>
                <linearGradient id="wh-cone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.22" /><stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* night wash over the drawing */}
              <rect x="0" y="0" width={VBW} height={VBH} fill="#04050a" opacity={0.62 * dim} style={{ transition: "opacity 1s" }} />

              {/* per-room light pools */}
              <g filter="url(#wh-soft)" style={{ mixBlendMode: "screen" } as React.CSSProperties}>
                {GLOWS.map((r) => {
                  const v = lvl(r.name);
                  return <ellipse key={r.name} cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry} fill={lc}
                    opacity={0.85 * g(v)} style={{ transition: "opacity 1s, fill 1s" }} />;
                })}
              </g>

              {/* camera coverage cones */}
              {CAMERAS.map((c, i) => (
                <path key={i} d={cone(c.x, c.y, c.fov)} fill="url(#wh-cone)"
                  opacity={s.cameras ? (hoverCam === null || hoverCam === c.label ? 1 : 0.18) : 0.07}
                  style={{ transition: "opacity 0.5s" }} />
              ))}
              {/* corner cameras */}
              {CAMERAS.map((c, i) => (
                <g key={"c" + i} onMouseEnter={() => setHoverCam(c.label)} onMouseLeave={() => setHoverCam(null)} className="cursor-pointer">
                  <circle cx={c.x} cy={c.y} r="13" fill="#0c1320" stroke="#9aa6c7" strokeWidth="2.5" />
                  <circle cx={c.x} cy={c.y} r="5" fill={s.cameras ? "#f87171" : "#3a3f4e"} className={s.cameras ? "animate-pulse" : ""} />
                  {hoverCam === c.label && (
                    <text x={c.x < VBW / 2 ? c.x + 20 : c.x - 20} y={c.y < VBH / 2 ? c.y + 30 : c.y - 20}
                      textAnchor={c.x < VBW / 2 ? "start" : "end"} className="fill-white" style={{ fontSize: 26, fontWeight: 600 }}>{c.label}</text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-3 px-1">
            <p className="text-accent text-[0.7rem] font-semibold tracking-widest uppercase">{s.label}</p>
            <p className="text-white/80 text-sm mt-0.5 leading-snug">{s.note}</p>
            <p className="text-white/30 text-[0.68rem] mt-2">Actual main-level plan from a Symphony project · lighting scenes mapped to the real rooms.</p>
          </div>
        </div>

        {/* ───────── Control surface ───────── */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col gap-5 bg-white/[0.015]">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-white/40 text-[0.7rem] tracking-widest uppercase">Entry Keypad</p>
              <p className="text-white/25 text-[0.6rem] tracking-widest uppercase">Engraved · 6-button</p>
            </div>
            <div className="rounded-xl p-3 bg-gradient-to-b from-[#2b2d34] to-[#15161b] border border-black/60 shadow-[0_12px_34px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]">
              <div className="space-y-2">
                {SCENES.map((sc) => {
                  const on = sc.id === active;
                  return (
                    <button key={sc.id} onClick={() => setActive(sc.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-left border transition-all duration-150 ${
                        on
                          ? "bg-gradient-to-b from-[#34373f] to-[#212329] border-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]"
                          : "bg-gradient-to-b from-[#212329] to-[#16181d] border-black/40 hover:from-[#272a32] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
                      }`}>
                      <span className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                        style={{ background: on ? "#ca9f5c" : "#2a2e38", boxShadow: on ? "0 0 9px 1px #ca9f5c" : "inset 0 0 2px rgba(0,0,0,0.8)" }} />
                      <span className="flex-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: on ? "#f0e2c8" : "#878d9c", textShadow: "0 1px 0 rgba(0,0,0,0.7), 0 -0.5px 0 rgba(255,255,255,0.05)" }}>
                        {sc.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-white/35 text-[0.7rem] mt-2.5 leading-relaxed">
              Every button is a one-press scene — lighting, shades, audio, climate and security move together.
            </p>
          </div>

          <div>
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase mb-2.5">Systems</p>
            <div className="space-y-2.5">
              {systems.map((sys) => (
                <div key={sys.label} className="flex items-center gap-3">
                  <sys.icon className="w-4 h-4 text-accent/80 shrink-0" />
                  <div className="flex-1 min-w-0 flex justify-between items-baseline gap-2">
                    <span className="text-white/65 text-xs">{sys.label}</span>
                    <span className="text-white/45 text-xs text-right truncate">{sys.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeHomeDemo;
