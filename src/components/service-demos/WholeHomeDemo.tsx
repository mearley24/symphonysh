import { useState } from "react";
import { Lightbulb, Volume2, Thermometer, ShieldCheck, Video, Wifi } from "lucide-react";

/**
 * WholeHomeDemo — a premium whole-home control surface on a real main-floor program.
 *
 * The plan mirrors how we actually lay out a high-end mountain-modern home: an
 * irregular footprint with a garage wing, an open kitchen / great-room heart, a
 * primary suite with walk-in closets, and a view deck wrapping the south + east
 * where the exterior cameras and outdoor speakers live. One scene orchestrates
 * lighting circuits, audio zones, two-zone climate, security sensors, and cameras.
 *
 * Pure SVG + CSS. No dependencies, no photos.
 */

type Temp = "cool" | "neutral" | "warm";
type Sky = "day" | "dusk" | "night";
type Sec = "Disarmed" | "Armed · Stay" | "Armed · Away";

interface Scene {
  id: string; label: string; note: string;
  lights: Record<string, number>;
  temp: Temp; sky: Sky; tv: boolean; shades: number;
  audioZones: string[];
  climateMain: number; climatePrimary: number; climateLabel: string;
  security: Sec; cameras: boolean;
}

const SCENES: Scene[] = [
  { id: "welcome", label: "Welcome Home",
    note: "Front door unlocks, a warm welcome through the entry and great room, climate to comfort, music in the kitchen.",
    lights: { gr_cans: 65, gr_cove: 40, gr_sconce: 45, k_cans: 75, k_pendants: 70, k_under: 100, dining: 55, foyer: 85, primary: 0, hall: 45, deck: 0 },
    temp: "neutral", sky: "day", tv: false, shades: 0, audioZones: ["Kitchen"], climateMain: 71, climatePrimary: 70, climateLabel: "Comfort", security: "Disarmed", cameras: true },
  { id: "cooking", label: "Cooking",
    note: "Full task light over the island, undercabinet on, music through the kitchen and great room.",
    lights: { gr_cans: 45, gr_cove: 25, gr_sconce: 30, k_cans: 100, k_pendants: 95, k_under: 100, dining: 30, foyer: 50, primary: 0, hall: 30, deck: 0 },
    temp: "neutral", sky: "day", tv: false, shades: 0, audioZones: ["Kitchen", "Great Room"], climateMain: 70, climatePrimary: 70, climateLabel: "Comfort", security: "Disarmed", cameras: true },
  { id: "dinner", label: "Dinner",
    note: "Chandelier leads, the great room settles to a warm wash, the deck glows, soft music over dinner.",
    lights: { gr_cans: 18, gr_cove: 30, gr_sconce: 25, k_cans: 22, k_pendants: 28, k_under: 35, dining: 60, foyer: 30, primary: 0, hall: 22, deck: 40 },
    temp: "warm", sky: "dusk", tv: false, shades: 0, audioZones: ["Dining", "Deck"], climateMain: 70, climatePrimary: 69, climateLabel: "Comfort", security: "Disarmed", cameras: true },
  { id: "movie", label: "Movie",
    note: "Great-room shades down, screen on, cove light at a whisper, surround up. Rest of the floor goes dark.",
    lights: { gr_cans: 4, gr_cove: 12, gr_sconce: 0, k_cans: 0, k_pendants: 0, k_under: 0, dining: 0, foyer: 8, primary: 0, hall: 12, deck: 0 },
    temp: "warm", sky: "night", tv: true, shades: 100, audioZones: ["Great Room"], climateMain: 71, climatePrimary: 68, climateLabel: "Comfort", security: "Disarmed", cameras: true },
  { id: "goodnight", label: "Goodnight",
    note: "Main floor off but a path to bed, climate to night setback, every door locked and the house armed to stay.",
    lights: { gr_cans: 0, gr_cove: 0, gr_sconce: 0, k_cans: 0, k_pendants: 0, k_under: 0, dining: 0, foyer: 0, primary: 14, hall: 10, deck: 0 },
    temp: "warm", sky: "night", tv: false, shades: 100, audioZones: [], climateMain: 66, climatePrimary: 65, climateLabel: "Night setback", security: "Armed · Stay", cameras: true },
  { id: "away", label: "Away",
    note: "A sconce and the deck lights stay on so the house looks lived-in, climate sets way back, every zone armed and all cameras recording.",
    lights: { gr_cans: 0, gr_cove: 0, gr_sconce: 28, k_cans: 0, k_pendants: 0, k_under: 0, dining: 0, foyer: 20, primary: 0, hall: 18, deck: 25 },
    temp: "warm", sky: "night", tv: false, shades: 0, audioZones: [], climateMain: 62, climatePrimary: 62, climateLabel: "Away setback", security: "Armed · Away", cameras: true },
];

const TEMP_COLOR: Record<Temp, string> = { warm: "#ffb86b", neutral: "#ffe6c2", cool: "#dcebff" };

// Rooms — varied sizes form the irregular footprint (not a uniform grid).
const ROOMS: { x: number; y: number; w: number; h: number; label: string }[] = [
  { x: 70, y: 40, w: 150, h: 120, label: "GARAGE" },
  { x: 220, y: 70, w: 90, h: 70, label: "MUD" },
  { x: 310, y: 70, w: 130, h: 110, label: "OFFICE" },
  { x: 440, y: 70, w: 70, h: 55, label: "POWDER" },
  { x: 440, y: 125, w: 70, h: 55, label: "PANTRY" },
  { x: 510, y: 70, w: 130, h: 110, label: "BATH" },
  { x: 70, y: 180, w: 150, h: 120, label: "DINING" },
  { x: 220, y: 140, w: 220, h: 160, label: "KITCHEN" },
  { x: 440, y: 180, w: 100, h: 100, label: "HALL" },
  { x: 540, y: 180, w: 100, h: 100, label: "W. CLOSET" },
  { x: 70, y: 300, w: 380, h: 140, label: "GREAT ROOM" },
  { x: 450, y: 280, w: 190, h: 160, label: "PRIMARY SUITE" },
];

// Lighting fixtures mapped to dimmer circuits, placed in real rooms.
const FIX: { x: number; y: number; r: number; c: string }[] = [
  // Great room — 3×2 recessed grid
  { x: 150, y: 340, r: 24, c: "gr_cans" }, { x: 260, y: 340, r: 24, c: "gr_cans" }, { x: 370, y: 340, r: 24, c: "gr_cans" },
  { x: 150, y: 405, r: 24, c: "gr_cans" }, { x: 260, y: 405, r: 24, c: "gr_cans" }, { x: 370, y: 405, r: 24, c: "gr_cans" },
  // Great room sconces (flanking media wall, west)
  { x: 86, y: 345, r: 13, c: "gr_sconce" }, { x: 86, y: 410, r: 13, c: "gr_sconce" },
  // Kitchen recessed
  { x: 270, y: 178, r: 19, c: "k_cans" }, { x: 395, y: 178, r: 19, c: "k_cans" },
  // Island pendants
  { x: 292, y: 226, r: 13, c: "k_pendants" }, { x: 332, y: 226, r: 13, c: "k_pendants" }, { x: 372, y: 226, r: 13, c: "k_pendants" },
  // Dining chandelier
  { x: 145, y: 235, r: 22, c: "dining" },
  // Office / foyer
  { x: 375, y: 120, r: 18, c: "foyer" },
  // Primary suite (recessed + bed sconces)
  { x: 510, y: 365, r: 18, c: "primary" }, { x: 590, y: 365, r: 18, c: "primary" },
  { x: 478, y: 312, r: 11, c: "primary" }, { x: 622, y: 312, r: 11, c: "primary" },
  // Hall / mud / pantry / closet path
  { x: 265, y: 105, r: 14, c: "hall" }, { x: 475, y: 152, r: 14, c: "hall" }, { x: 590, y: 230, r: 14, c: "hall" },
  // Exterior deck soffit lights
  { x: 200, y: 462, r: 16, c: "deck" }, { x: 450, y: 462, r: 16, c: "deck" }, { x: 678, y: 320, r: 16, c: "deck" },
];

// In-ceiling speakers by audio zone (interior + outdoor deck).
const SPEAKERS = [
  { x: 200, y: 360, z: "Great Room" }, { x: 380, y: 360, z: "Great Room" },
  { x: 330, y: 210, z: "Kitchen" }, { x: 145, y: 240, z: "Dining" },
  { x: 545, y: 360, z: "Primary" }, { x: 230, y: 462, z: "Deck" }, { x: 470, y: 462, z: "Deck" },
];

// Exterior cameras with field-of-view cones (degrees the cone points; SVG y-down).
const CAMERAS = [
  { x: 265, y: 24, fov: 90, label: "Front Entry" },   // above front door, looks down (south)
  { x: 40, y: 50, fov: 35, label: "Driveway" },        // NW corner, looks SE at garage
  { x: 300, y: 478, fov: 270, label: "Deck" },         // south deck, looks up (north)
  { x: 690, y: 300, fov: 180, label: "View Deck" },    // east deck, looks west
];

const WholeHomeDemo = () => {
  const [active, setActive] = useState("welcome");
  const [hoverCam, setHoverCam] = useState<string | null>(null);
  const s = SCENES.find((x) => x.id === active) || SCENES[0];
  const lc = TEMP_COLOR[s.temp];
  const skyFill = s.sky === "day" ? "#9ec7e8" : s.sky === "dusk" ? "#7a4a5a" : "#0d1326";
  const g = (lvl: number) => Math.pow(lvl / 100, 0.7);
  const lv = (c: string) => s.lights[c] ?? 0;
  const interiorMax = Math.max(...Object.entries(s.lights).filter(([k]) => k !== "deck").map(([, v]) => v));
  const dim = 1 - g(interiorMax);

  const systems = [
    { icon: Lightbulb, label: "Lighting", value: `${Object.values(s.lights).filter((v) => v > 0).length} of ${Object.keys(s.lights).length} circuits on` },
    { icon: Volume2, label: "Audio", value: s.audioZones.length ? s.audioZones.join(" · ") : "All zones quiet" },
    { icon: Thermometer, label: "Climate", value: `Main ${s.climateMain}° · Primary ${s.climatePrimary}°` },
    { icon: ShieldCheck, label: "Security", value: s.security },
    { icon: Video, label: "Surveillance", value: s.cameras ? "4 cameras · recording" : "Idle" },
    { icon: Wifi, label: "Network", value: "Online · 1.2 Gbps" },
  ];

  const cone = (cx: number, cy: number, deg: number) => {
    const sp = 28, len = 88, a = (deg * Math.PI) / 180;
    const a1 = a - (sp * Math.PI) / 180, a2 = a + (sp * Math.PI) / 180;
    return `M ${cx} ${cy} L ${cx + len * Math.cos(a1)} ${cy + len * Math.sin(a1)} L ${cx + len * Math.cos(a2)} ${cy + len * Math.sin(a2)} Z`;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1119] to-[#0a0c12] overflow-hidden shadow-2xl">
      {/* header bar — premium control-surface chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" />
          <span className="text-white/90 text-sm font-semibold tracking-wide">Aspen Ridge Residence</span>
          <span className="text-white/30 text-xs hidden sm:inline">· Main Floor</span>
        </div>
        <span className="text-white/40 text-xs tabular-nums">{s.sky === "day" ? "2:14 PM" : s.sky === "dusk" ? "6:48 PM" : "10:32 PM"} · 28°F</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_290px]">
        {/* ───────── Architectural floor plan ───────── */}
        <div className="relative p-3">
          <svg viewBox="0 0 760 520" className="w-full h-auto block rounded-lg" style={{ background: "radial-gradient(120% 120% at 50% 0%, #0f1320, #090b11)" }}>
            <defs>
              <radialGradient id="wh-glow"><stop offset="0%" stopColor={lc} stopOpacity="0.85" /><stop offset="100%" stopColor={lc} stopOpacity="0" /></radialGradient>
              <linearGradient id="cam-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5b8cff" stopOpacity="0.3" /><stop offset="100%" stopColor="#5b8cff" stopOpacity="0" /></linearGradient>
            </defs>

            {/* wrapping view deck (exterior, south + east) */}
            <path d="M 78 440 L 640 440 L 640 200 L 706 200 L 706 500 L 78 500 Z" fill="#0c0f17" stroke="#262c3d" strokeWidth="1.5" />
            {[...Array(7)].map((_, i) => <line key={i} x1={120 + i * 80} y1="445" x2={120 + i * 80} y2="495" stroke="#1a1f2c" strokeWidth="1" />)}

            {/* exterior camera coverage cones (behind house) */}
            {CAMERAS.map((c, i) => (
              <path key={i} d={cone(c.x, c.y, c.fov)} fill="url(#cam-cone)"
                opacity={s.cameras ? (hoverCam === null || hoverCam === c.label ? 1 : 0.2) : 0.1}
                style={{ transition: "opacity 0.5s" }} />
            ))}

            {/* ── rooms (varied sizes = architectural footprint) ── */}
            {ROOMS.map((r) => (
              <rect key={r.label} x={r.x} y={r.y} width={r.w} height={r.h} rx="2" fill="#10131d" stroke="#39405a" strokeWidth="2" />
            ))}
            {/* outer shell accent */}
            <rect x="70" y="40" width="570" height="400" fill="none" stroke="#454d6b" strokeWidth="2.5" rx="3" pointerEvents="none" />

            {/* room labels */}
            {ROOMS.map((r) => (
              <text key={r.label + "t"} x={r.x + 6} y={r.y + 15} className="fill-white/30" style={{ fontSize: 8.5, letterSpacing: 0.8 }}>{r.label}</text>
            ))}

            {/* ── furniture silhouettes ── */}
            <g fill="#1a1f2e" stroke="#2a3145" strokeWidth="1">
              {/* garage — two car bays */}
              <rect x="90" y="70" width="50" height="80" rx="4" /><rect x="150" y="70" width="50" height="80" rx="4" />
              {/* office desk */}
              <rect x="320" y="140" width="80" height="22" rx="3" />
              {/* dining table + chairs */}
              <rect x="105" y="210" width="80" height="48" rx="6" />
              {[0, 1, 2, 3].map((i) => <rect key={i} x={108 + (i % 2) * 70} y={212 + Math.floor(i / 2) * 30} width="9" height="18" rx="3" />)}
              {/* kitchen island + perimeter counter + stools */}
              <rect x="262" y="210" width="140" height="32" rx="3" />
              <rect x="222" y="140" width="216" height="18" />
              {[0, 1, 2].map((i) => <circle key={i} cx={292 + i * 40} cy={254} r="5" />)}
              {/* great room: media wall + TV, sectional, coffee table */}
              <rect x="70" y="330" width="11" height="100" rx="2" />
              <rect x="74" y="355" width="7" height="60" fill={s.tv ? "#1b3a6b" : "#0a0d14"} stroke="none" style={{ transition: "fill 0.8s" }} />
              <rect x="150" y="390" width="180" height="34" rx="8" />
              <rect x="150" y="355" width="44" height="40" rx="8" />
              <rect x="185" y="350" width="100" height="28" rx="5" />
              {/* primary bed + nightstands */}
              <rect x="500" y="312" width="120" height="86" rx="4" />
              <rect x="478" y="312" width="18" height="22" rx="2" /><rect x="624" y="312" width="14" height="22" rx="2" />
            </g>

            {/* great-room window + shade on west exterior wall */}
            <rect x="70" y="305" width="6" height="20" fill={skyFill} style={{ transition: "fill 1.2s" }} />
            {/* great-room south windows to the deck */}
            <rect x="120" y="437" width="260" height="6" fill={skyFill} style={{ transition: "fill 1.2s" }} />
            <rect x="120" y="437" width={2.6 * s.shades} height="6" fill="#191c28" style={{ transition: "width 1.2s" }} />
            {/* cove light band (great room ceiling) */}
            <rect x="78" y="305" width="364" height="7" rx="3.5" fill={lc} opacity={0.5 * g(lv("gr_cove"))} style={{ transition: "opacity 1s, fill 1s" }} />

            {/* lighting fixtures glow at real circuit levels */}
            {FIX.map((f, i) => {
              const v = lv(f.c);
              return (
                <g key={i}>
                  <circle cx={f.x} cy={f.y} r={f.r} fill="url(#wh-glow)" opacity={g(v)} style={{ transition: "opacity 1s" }} />
                  <circle cx={f.x} cy={f.y} r={2.6} fill={lc} opacity={0.28 + 0.72 * g(v)} style={{ transition: "opacity 1s, fill 1s" }} />
                </g>
              );
            })}
            {/* undercabinet strip */}
            <rect x="226" y="158" width="208" height="5" fill={lc} opacity={0.7 * g(lv("k_under"))} style={{ transition: "opacity 1s, fill 1s" }} />

            {/* ── devices ── */}
            {/* in-ceiling speakers */}
            {SPEAKERS.map((sp, i) => {
              const on = s.audioZones.includes(sp.z);
              return (
                <g key={i} opacity={on ? 1 : 0.26} style={{ transition: "opacity 0.6s" }}>
                  <circle cx={sp.x} cy={sp.y} r="6" fill="none" stroke="#5b8cff" strokeWidth="1.2" />
                  <circle cx={sp.x} cy={sp.y} r="2" fill="#5b8cff" className={on ? "animate-pulse" : ""} />
                </g>
              );
            })}
            {/* wall keypads at room entries */}
            {[[312, 175], [240, 158], [444, 300], [452, 320]].map(([x, y], i) => (
              <rect key={i} x={(x as number) - 4} y={(y as number) - 6} width="8" height="12" rx="1.5" fill="#1a2030" stroke="#3a4663" strokeWidth="0.8" />
            ))}
            {/* thermostats — main + primary zones */}
            {[{ x: 446, y: 240, t: s.climateMain }, { x: 452, y: 360, t: s.climatePrimary }].map((th, i) => (
              <g key={i}>
                <rect x={th.x - 15} y={th.y - 9} width="30" height="18" rx="4" fill="#0c1320" stroke="#234" strokeWidth="1" />
                <text x={th.x} y={th.y + 4} textAnchor="middle" className="fill-emerald-300" style={{ fontSize: 9 }}>{th.t}°</text>
              </g>
            ))}
            {/* door/window contact sensors on the perimeter */}
            {[[265, 70], [70, 360], [380, 440], [640, 300], [510, 70]].map(([x, y], i) => (
              <circle key={i} cx={x as number} cy={y as number} r="3" fill={s.security === "Disarmed" ? "#34d399" : "#f59e0b"} style={{ transition: "fill 0.6s" }} />
            ))}

            {/* exterior cameras (outside the walls) */}
            {CAMERAS.map((c, i) => (
              <g key={i} onMouseEnter={() => setHoverCam(c.label)} onMouseLeave={() => setHoverCam(null)} className="cursor-pointer">
                <circle cx={c.x} cy={c.y} r="7" fill="#0c1320" stroke="#9aa6c7" strokeWidth="1.2" />
                <circle cx={c.x} cy={c.y} r="2.4" fill={s.cameras ? "#f87171" : "#3a3f4e"} className={s.cameras ? "animate-pulse" : ""} />
                {hoverCam === c.label && (
                  <text x={c.x} y={c.y - 12} textAnchor="middle" className="fill-white" style={{ fontSize: 9 }}>{c.label}</text>
                )}
              </g>
            ))}

            {/* night darkening wash over interior only */}
            <rect x="70" y="40" width="570" height="400" fill="#05060a" opacity={0.5 * dim} style={{ transition: "opacity 1s" }} pointerEvents="none" />
          </svg>

          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-accent text-[0.7rem] font-semibold tracking-widest uppercase">{s.label}</p>
            <p className="text-white/80 text-sm mt-0.5 leading-snug">{s.note}</p>
          </div>
        </div>

        {/* ───────── Control surface ───────── */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col gap-5 bg-white/[0.015]">
          <div>
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase mb-3">Scenes</p>
            <div className="rounded-xl bg-gradient-to-b from-[#1a1d28] to-[#0e1018] border border-white/10 p-2.5 space-y-1.5 shadow-inner">
              {SCENES.map((sc) => {
                const on = sc.id === active;
                return (
                  <button key={sc.id} onClick={() => setActive(sc.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200 ${on ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}>
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
                    <span className="text-white/65 text-xs">{sys.label}</span>
                    <span className="text-white/45 text-xs text-right truncate">{sys.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-[0.7rem] leading-relaxed mt-4">
              One scene moves every system at once — lighting, audio, climate, security, and cameras. That orchestration
              is what a high-end install delivers; the individual products are just the parts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeHomeDemo;
