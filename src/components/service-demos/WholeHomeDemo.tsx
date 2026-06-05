import { useState } from "react";
import {
  Lightbulb, Volume2, Thermometer, ShieldCheck, Video, Wifi, Blinds, Tv,
  Grip, DoorClosed, Radio, Radar, Flame, Droplet, Cpu, Tablet,
} from "lucide-react";
import { VIEWBOX, ROOMS, DEVICES, FIXTURES } from "@/data/wholeHomeLayout";

/**
 * WholeHomeDemo — whole-home control on the REAL blueprint.
 *
 * Base = the actual main-level drawing (recessed to a calm backdrop). Rooms and
 * every device come from the project markup via agents/symphony_demo (exact
 * placement; wall devices snapped flush to walls). Devices render as labelled
 * icon pins, one system layer at a time. Lighting emanates from a designed
 * downlight grid. The engraved keypad runs the whole-home scenes.
 */

type Temp = "cool" | "neutral" | "warm";
type Sky = "day" | "dusk" | "night";
type Sec = "Disarmed" | "Armed · Stay" | "Armed · Away";

const IMG = "/lovable-uploads/home-integration/blueprint/base.jpg";
const [VBW, VBH] = VIEWBOX;

interface Scene {
  id: string; label: string; note: string;
  lights: Record<string, number>;
  temp: Temp; sky: Sky; tv: boolean; shades: number;
  audioZones: string[]; climateMain: number; climatePrimary: number; security: Sec; cameras: boolean;
}

const SCENES: Scene[] = [
  { id: "welcome", label: "Welcome Home",
    note: "A warm welcome through the entry, kitchen and living room. Climate to comfort, music in the kitchen.",
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
    note: "A light at the entry and deck stay on so the house looks lived-in. Climate way back, every zone armed, cameras recording.",
    lights: { "Front Entry": 22, "Mudroom": 12, "Deck": 28 },
    temp: "warm", sky: "night", tv: false, shades: 0, audioZones: [], climateMain: 62, climatePrimary: 62, security: "Armed · Away", cameras: true },
];

const TEMP_COLOR: Record<Temp, string> = { warm: "#ffb060", neutral: "#ffe0b0", cool: "#cfe2ff" };

// category → icon + label + base colour
const CAT_META: Record<string, { icon: typeof Tv; label: string; color: string }> = {
  keypad: { icon: Grip, label: "Keypad", color: "#ca9f5c" },
  speaker: { icon: Volume2, label: "Speaker", color: "#6f9bff" },
  contact: { icon: DoorClosed, label: "Door / Window", color: "#34d399" },
  glassbreak: { icon: Radio, label: "Glass Break", color: "#34d399" },
  motion: { icon: Radar, label: "Motion", color: "#34d399" },
  safety: { icon: Flame, label: "Smoke / CO", color: "#ef4444" },
  water: { icon: Droplet, label: "Water", color: "#38bdf8" },
  panel: { icon: Cpu, label: "Controller", color: "#9aa6c7" },
  touchpanel: { icon: Tablet, label: "Touch Panel", color: "#5b8fc0" },
  tv: { icon: Tv, label: "TV", color: "#5b8fc0" },
  shade: { icon: Blinds, label: "Shade", color: "#9aa3b8" },
};

const LAYERS = [
  { id: "lighting", label: "Lighting", icon: Lightbulb, cats: ["keypad"] },
  { id: "audio", label: "Audio", icon: Volume2, cats: ["speaker"] },
  { id: "security", label: "Security", icon: ShieldCheck, cats: ["contact", "glassbreak", "motion", "safety", "water", "panel", "touchpanel"] },
  { id: "shades", label: "Shades", icon: Blinds, cats: ["shade"] },
  { id: "video", label: "Video", icon: Video, cats: ["tv"] },
] as const;

const CAMERAS = [
  { x: 26, y: 24, fov: 45, label: "NW · Driveway" },
  { x: VBW - 26, y: 24, fov: 135, label: "NE · Front Entry" },
  { x: VBW - 26, y: VBH - 24, fov: 225, label: "SE · View Deck" },
  { x: 26, y: VBH - 24, fov: 315, label: "SW · South Yard" },
];

const WholeHomeDemo = () => {
  const [active, setActive] = useState("welcome");
  const [layer, setLayer] = useState<string>("lighting");
  const s = SCENES.find((x) => x.id === active) || SCENES[0];
  const lc = TEMP_COLOR[s.temp];
  const g = (v: number) => Math.pow(v / 100, 0.7);
  const lvl = (room: string) => s.lights[room] ?? 0;
  const litRooms = ROOMS.filter((r) => lvl(r.name) > 0).length;
  const interiorMax = Math.max(0, ...ROOMS.filter((r) => r.name !== "Deck").map((r) => lvl(r.name)));
  const dim = 1 - g(interiorMax);
  const armed = s.security !== "Disarmed";
  const lyr = LAYERS.find((l) => l.id === layer) || LAYERS[0];
  const shownDevices = DEVICES.filter((d) => (lyr.cats as readonly string[]).includes(d.cat));
  const showCameras = layer === "security";

  const systems = [
    { icon: Lightbulb, label: "Lighting", value: `${litRooms} of ${ROOMS.length} rooms lit` },
    { icon: Volume2, label: "Audio", value: s.audioZones.length ? s.audioZones.join(" · ") : "All zones quiet" },
    { icon: Thermometer, label: "Climate", value: `Main ${s.climateMain}° · Primary ${s.climatePrimary}°` },
    { icon: ShieldCheck, label: "Security", value: s.security },
    { icon: Video, label: "Surveillance", value: s.cameras ? "4 cameras · recording" : "Idle" },
    { icon: Wifi, label: "Network", value: "Online · 1.2 Gbps" },
  ];

  const cone = (cx: number, cy: number, deg: number) => {
    const sp = 42, len = 560, a = (deg * Math.PI) / 180;
    const a1 = a - (sp * Math.PI) / 180, a2 = a + (sp * Math.PI) / 180;
    return `M ${cx} ${cy} L ${cx + len * Math.cos(a1)} ${cy + len * Math.sin(a1)} L ${cx + len * Math.cos(a2)} ${cy + len * Math.sin(a2)} Z`;
  };

  // pin colour + active state per device for the current scene
  const pinState = (d: typeof DEVICES[number]) => {
    const meta = CAT_META[d.cat];
    let color = meta.color, on = false;
    if (d.cat === "keypad") { on = d.room ? lvl(d.room) > 0 : false; color = on ? "#ca9f5c" : "#6b6457"; }
    else if (d.cat === "speaker") { on = d.room ? s.audioZones.includes(d.room) : false; color = on ? "#6f9bff" : "#41506f"; }
    else if (d.cat === "tv") { on = s.tv && d.room === "Living Room"; color = on ? "#5b9bf0" : "#3c536f"; }
    else if (d.cat === "shade") { on = s.shades > 50; color = "#9aa3b8"; }
    else if (["contact", "glassbreak", "motion"].includes(d.cat)) { on = armed; color = armed ? "#f59e0b" : "#34d399"; }
    return { meta, color, on };
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

      {/* layer selector */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 overflow-x-auto">
        <span className="text-white/35 text-[0.62rem] tracking-widest uppercase mr-1 shrink-0">View</span>
        {LAYERS.map((l) => {
          const on = l.id === layer;
          const count = DEVICES.filter((d) => (l.cats as readonly string[]).includes(d.cat)).length;
          return (
            <button key={l.id} onClick={() => setLayer(l.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                on ? "bg-accent/15 text-accent border border-accent/40" : "text-white/55 hover:text-white/80 border border-transparent"
              }`}>
              <l.icon className="w-3.5 h-3.5" /> {l.label}
              <span className={on ? "text-accent/70" : "text-white/30"}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* ───────── Full-width blueprint ───────── */}
      <div className="p-3">
        <div className="relative rounded-lg overflow-hidden" style={{ background: "#05070b" }}>
          <img src={IMG} alt="Main-floor plan" className="w-full h-auto block select-none" draggable={false} />

          {/* lighting + camera cones (SVG, non-interactive) */}
          <svg viewBox={`0 0 ${VBW} ${VBH}`} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <defs>
              <radialGradient id="wh-fix">
                <stop offset="0%" stopColor={lc} stopOpacity="0.9" />
                <stop offset="45%" stopColor={lc} stopOpacity="0.28" />
                <stop offset="100%" stopColor={lc} stopOpacity="0" />
              </radialGradient>
              <linearGradient id="wh-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5b8cff" stopOpacity="0.2" /><stop offset="100%" stopColor="#5b8cff" stopOpacity="0" /></linearGradient>
            </defs>
            <rect x="0" y="0" width={VBW} height={VBH} fill="#04050a" opacity={0.55 * dim} style={{ transition: "opacity 1s" }} />
            <g style={{ mixBlendMode: "screen" } as React.CSSProperties}>
              {FIXTURES.map((f, i) => {
                const v = lvl(f.room);
                if (v <= 0) return null;
                const r = 18 + 26 * g(v);
                return <circle key={i} cx={f.x} cy={f.y} r={r} fill="url(#wh-fix)" opacity={0.6 * g(v)} style={{ transition: "opacity 0.9s" }} />;
              })}
            </g>
            {FIXTURES.map((f, i) => {
              const v = lvl(f.room);
              return <circle key={"fc" + i} cx={f.x} cy={f.y} r="1.5" fill={v > 0 ? "#fff7e8" : "#39425a"} opacity={v > 0 ? 0.5 + 0.5 * g(v) : 0.28} style={{ transition: "opacity 0.9s" }} />;
            })}
            {showCameras && CAMERAS.map((c, i) => (
              <path key={i} d={cone(c.x, c.y, c.fov)} fill="url(#wh-cone)" />
            ))}
          </svg>

          {/* device pins (HTML, labelled, hoverable) */}
          {shownDevices.map((d, i) => {
            const { meta, color, on } = pinState(d);
            const Icon = meta.icon;
            return (
              <div key={i} className="absolute group" style={{ left: `${(d.x / VBW) * 100}%`, top: `${(d.y / VBH) * 100}%`, transform: "translate(-50%,-50%)" }}>
                <div className="flex items-center justify-center rounded-full border backdrop-blur-[1px] transition-all duration-300"
                  style={{ width: 18, height: 18, background: "rgba(7,10,17,0.8)", borderColor: color, boxShadow: on ? `0 0 8px 1px ${color}aa` : "0 1px 3px rgba(0,0,0,0.6)" }}>
                  <Icon style={{ width: 9.5, height: 9.5, color }} className={on && d.cat === "speaker" ? "animate-pulse" : ""} />
                </div>
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-md bg-black/90 border border-white/10 px-2 py-0.5 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  {meta.label}{d.room ? <span className="text-white/45"> · {d.room}</span> : null}
                </div>
              </div>
            );
          })}

          {/* corner cameras (security view) as pins */}
          {showCameras && CAMERAS.map((c, i) => (
            <div key={"cam" + i} className="absolute group" style={{ left: `${(c.x / VBW) * 100}%`, top: `${(c.y / VBH) * 100}%`, transform: "translate(-50%,-50%)" }}>
              <div className="flex items-center justify-center rounded-full border" style={{ width: 24, height: 24, background: "rgba(7,10,17,0.9)", borderColor: "#9aa6c7" }}>
                <Video style={{ width: 12, height: 12, color: s.cameras ? "#f87171" : "#6b7280" }} className={s.cameras ? "animate-pulse" : ""} />
              </div>
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-md bg-black/90 border border-white/10 px-2 py-0.5 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                Camera · {c.label}
              </div>
            </div>
          ))}

          {/* scene caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
            <p className="text-accent text-[0.7rem] font-semibold tracking-widest uppercase">{s.label}</p>
            <p className="text-white/85 text-sm mt-0.5 leading-snug max-w-2xl">{s.note}</p>
          </div>
        </div>

        <p className="text-white/35 text-[0.68rem] mt-2.5 px-1">
          Showing the <span className="text-white/60">{lyr.label.toLowerCase()}</span> layer — {shownDevices.length} devices, placed from the project drawings. Hover any device to identify it; switch layers above.
        </p>
      </div>

      {/* ───────── Controls below ───────── */}
      <div className="grid md:grid-cols-[300px_1fr] gap-6 px-5 pb-5 pt-2 border-t border-white/10 bg-white/[0.015]">
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-white/40 text-[0.7rem] tracking-widest uppercase">Entry Keypad</p>
            <p className="text-white/25 text-[0.6rem] tracking-widest uppercase">Engraved · 6-button</p>
          </div>
          <div className="rounded-xl p-3 bg-gradient-to-b from-[#2b2d34] to-[#15161b] border border-black/60 shadow-[0_12px_34px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]">
            <div className="grid grid-cols-2 gap-2">
              {SCENES.map((sc) => {
                const on = sc.id === active;
                return (
                  <button key={sc.id} onClick={() => setActive(sc.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-left border transition-all duration-150 ${
                      on
                        ? "bg-gradient-to-b from-[#34373f] to-[#212329] border-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]"
                        : "bg-gradient-to-b from-[#212329] to-[#16181d] border-black/40 hover:from-[#272a32] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
                    }`}>
                    <span className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                      style={{ background: on ? "#ca9f5c" : "#2a2e38", boxShadow: on ? "0 0 9px 1px #ca9f5c" : "inset 0 0 2px rgba(0,0,0,0.8)" }} />
                    <span className="flex-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] leading-tight"
                      style={{ color: on ? "#f0e2c8" : "#878d9c", textShadow: "0 1px 0 rgba(0,0,0,0.7)" }}>
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
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
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
          <p className="text-white/30 text-[0.68rem] leading-relaxed mt-4">
            Actual main-level plan · {DEVICES.length} devices across {ROOMS.length} rooms, placed from the project drawings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WholeHomeDemo;
