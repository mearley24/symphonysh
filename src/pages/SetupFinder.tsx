import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgHomeIntegration from "../assets/bg-home-integration.jpg";

type ProjectType = "new-build" | "remodel" | "existing-service";
type ControlItem =
  | "lighting"
  | "shades"
  | "music"
  | "tvs"
  | "theater"
  | "wifi"
  | "climate"
  | "security";
type RoomScope =
  | "one-room"
  | "main-living"
  | "whole-home"
  | "multiple-properties";
type WallStatus = "open" | "finished" | "mixed";
type ExistingSystem =
  | "control4"
  | "homeworks"
  | "lutron"
  | "sonos"
  | "ava"
  | "other"
  | "none";
type Priority =
  | "simple"
  | "reliable"
  | "luxury-finish"
  | "retrofit-friendly"
  | "builder-ready"
  | "easy-service";

interface Answers {
  projectType: ProjectType | null;
  controls: ControlItem[];
  rooms: RoomScope | null;
  walls: WallStatus | null;
  existing: ExistingSystem[];
  priority: Priority | null;
}

const INITIAL: Answers = {
  projectType: null,
  controls: [],
  rooms: null,
  walls: null,
  existing: [],
  priority: null,
};

interface Recommendation {
  title: string;
  summary: string;
  pieces: { label: string; path?: string }[];
  notes: string[];
}

function buildRecommendation(a: Answers): Recommendation {
  const wantsLighting = a.controls.includes("lighting");
  const wantsShades = a.controls.includes("shades");
  const wantsMusic = a.controls.includes("music");
  const wantsTvs = a.controls.includes("tvs") || a.controls.includes("theater");
  const wantsTheater = a.controls.includes("theater");
  const wantsWifi = a.controls.includes("wifi");
  const wantsClimate = a.controls.includes("climate");
  const wantsSecurity = a.controls.includes("security");

  const wholeHome =
    a.rooms === "whole-home" || a.rooms === "multiple-properties";
  const open = a.walls === "open";
  const newBuild = a.projectType === "new-build";
  const existingService = a.projectType === "existing-service";

  const hasControl4 = a.existing.includes("control4");
  const hasHomeWorks = a.existing.includes("homeworks");
  const hasLutron = a.existing.includes("lutron");
  const hasSonos = a.existing.includes("sonos");
  const hasAva = a.existing.includes("ava");

  // Networking-only cleanup
  const onlyWifi =
    wantsWifi &&
    !wantsLighting &&
    !wantsShades &&
    !wantsTheater &&
    !wantsSecurity &&
    !wantsClimate &&
    a.controls.filter((c) => c !== "wifi" && c !== "tvs" && c !== "music")
      .length === 0;

  if (onlyWifi || a.priority === "reliable" && existingService && !wantsLighting && !wantsShades) {
    return {
      title: "Networking-first cleanup",
      summary:
        "Before anything else, the network has to be solid. We start with enterprise-grade Wi-Fi and structured cabling so every other system (streaming, cameras, Sonos, Control4) actually stays online.",
      pieces: [
        { label: "Home Networking", path: "/services/networking" },
        ...(wantsMusic || hasSonos
          ? [{ label: "Sonos audio", path: "/services/audio-entertainment" }]
          : []),
        ...(wantsTvs
          ? [{ label: "TV mounting / AV cleanup", path: "/services/audio-entertainment" }]
          : []),
      ],
      notes: [
        "Usually a one- to two-visit job.",
        "Fixes the most common complaint: 'the Wi-Fi is fine, but the system keeps dropping.'",
      ],
    };
  }

  // Pre-wire plan for new build with open walls
  if (newBuild && open) {
    return {
      title: "Pre-wire plan (new build)",
      summary:
        "While the walls are open, plan for everything you might ever want — network drops, speaker pre-wire, shade wiring, TV backboxes, and a proper rack. Pulling cable now costs almost nothing; pulling it later costs everything.",
      pieces: [
        { label: "Pre-Wire & Structured Wiring", path: "/services/prewire" },
        { label: "Home Networking", path: "/services/networking" },
        ...(wantsLighting && a.priority === "luxury-finish"
          ? [{ label: "Lutron HomeWorks", path: "/platforms/lutron-homeworks" }]
          : wantsLighting
          ? [{ label: "Control4 lighting", path: "/platforms/control4" }]
          : []),
        ...(wholeHome || wantsTheater || wantsClimate || wantsSecurity
          ? [{ label: "Control4 automation", path: "/platforms/control4" }]
          : []),
        ...(wantsShades
          ? [{ label: "Motorized shades", path: "/services/shades" }]
          : []),
      ],
      notes: [
        "We want to be on site before insulation.",
        "Final platform choices can be decided closer to trim.",
      ],
    };
  }

  // Lutron HomeWorks — only when explicitly luxury-finish lighting on a large architectural project
  const homeWorksFit =
    hasHomeWorks ||
    (wholeHome &&
      wantsLighting &&
      a.priority === "luxury-finish" &&
      (newBuild || a.projectType === "remodel"));

  if (homeWorksFit) {
    return {
      title: "Lutron HomeWorks (lighting) + Control4",
      summary:
        "Lutron's flagship lighting line — Ketra, Lumaris, Palladiom shading, hand-crafted keypads. Control4 ties the rest of the house (audio, climate, security, shades) behind one app.",
      pieces: [
        { label: "Lutron HomeWorks", path: "/platforms/lutron-homeworks" },
        { label: "Control4 automation", path: "/platforms/control4" },
        ...(wantsShades
          ? [{ label: "Motorized shades (Palladiom / Sivoia)", path: "/services/shades" }]
          : []),
        ...(wantsMusic || hasSonos
          ? [{ label: "Whole-home audio", path: "/services/audio-entertainment" }]
          : []),
        { label: "Home Networking", path: "/services/networking" },
        ...(wantsSecurity
          ? [{ label: "Security & cameras", path: "/services/security-systems" }]
          : []),
        ...(newBuild || open
          ? [{ label: "Pre-Wire & Structured Wiring", path: "/services/prewire" }]
          : []),
      ],
      notes: [
        "Designed with the architect and lighting designer.",
        "Phased delivery is normal — primary wing first.",
      ],
    };
  }

  // RadioRA3 — explicit Lutron-friendly retrofit signal
  const radioRA3Fit =
    hasLutron ||
    (wantsLighting &&
      a.walls === "finished" &&
      a.priority === "retrofit-friendly");

  if (radioRA3Fit && !wholeHome) {
    return {
      title: "Lutron RadioRA3 + a strong network",
      summary:
        "A lighting-first retrofit with Sunnata keypads and Lumaris dimming. RadioRA3 installs cleanly in finished walls and grows one room at a time.",
      pieces: [
        { label: "Lutron RadioRA3", path: "/platforms/lutron-radiora3" },
        ...(wantsShades
          ? [{ label: "Motorized shades", path: "/services/shades" }]
          : []),
        ...(wantsMusic || hasSonos
          ? [{ label: "Sonos audio", path: "/services/audio-entertainment" }]
          : []),
        { label: "Home Networking", path: "/services/networking" },
      ],
      notes: [
        "Good for finished homes where we cannot easily open walls.",
        "Can expand into Control4 later if more automation is wanted.",
      ],
    };
  }

  // AVA — only when scope is room-first or media-first AND user signals simple/easy-service
  const mediaForward =
    !wholeHome &&
    (wantsTvs || wantsTheater || wantsMusic) &&
    !wantsSecurity &&
    !wantsClimate &&
    !wantsShades &&
    (a.priority === "simple" || a.priority === "easy-service" || hasAva);

  if (mediaForward) {
    return {
      title: "AVA + Sonos" + (hasControl4 ? " + Control4" : ""),
      summary:
        "A simple, room-first setup focused on TV and audio. AVA gives one physical remote the household can use; Sonos handles the music" +
        (hasControl4 ? "; your existing Control4 stays in place for anything more advanced." : "."),
      pieces: [
        { label: "AVA remote", path: "/platforms/ava" },
        { label: "Sonos / whole-home audio", path: "/services/audio-entertainment" },
        ...(wantsTheater
          ? [{ label: "Media room / theater", path: "/services/audio-entertainment" }]
          : []),
        { label: "Home Networking", path: "/services/networking" },
        ...(hasControl4
          ? [{ label: "Control4 (keep existing)", path: "/platforms/control4" }]
          : []),
      ],
      notes: [
        "No lighting scenes or shade control at this level.",
        "Can be upgraded to Control4 later without replacing TV or audio gear.",
      ],
    };
  }

  // Control4 default — whole-home lighting and control
  const bigScope =
    wholeHome ||
    (wantsLighting && wantsShades) ||
    wantsTheater ||
    wantsClimate ||
    wantsSecurity ||
    hasControl4 ||
    a.priority === "luxury-finish" ||
    a.priority === "builder-ready";

  if (bigScope) {
    return {
      title: "Control4 (lighting + control)",
      summary:
        "Control4 as the default for whole-home lighting, scenes, audio, climate, security, and shades — one app, one keypad family across the house.",
      pieces: [
        { label: "Control4 automation", path: "/platforms/control4" },
        ...(wantsShades
          ? [{ label: "Motorized shades", path: "/services/shades" }]
          : []),
        ...(wantsMusic || hasSonos
          ? [{ label: "Whole-home audio", path: "/services/audio-entertainment" }]
          : []),
        { label: "Home Networking", path: "/services/networking" },
        ...(wantsSecurity
          ? [{ label: "Security & cameras", path: "/services/security-systems" }]
          : []),
      ],
      notes: [
        existingService && hasControl4
          ? "We can often take over an existing Control4 system without starting from scratch."
          : "Designed to grow one room at a time.",
        "If the home calls for Lutron-grade lighting, we can layer HomeWorks or RadioRA3 in.",
      ],
    };
  }

  // Lighting-first fallback when user wants lighting but didn't trigger anything else
  if (wantsLighting) {
    return {
      title: "Control4 lighting + a strong network",
      summary:
        "Start with Control4 lighting and scenes on the rooms you use most. Add audio, shades, or full automation later without replacing what's there.",
      pieces: [
        { label: "Control4 lighting", path: "/platforms/control4" },
        ...(wantsShades
          ? [{ label: "Motorized shades", path: "/services/shades" }]
          : []),
        ...(wantsMusic || hasSonos
          ? [{ label: "Sonos audio", path: "/services/audio-entertainment" }]
          : []),
        { label: "Home Networking", path: "/services/networking" },
      ],
      notes: [
        "Lutron RadioRA3 is an option if you want the Lutron keypad and dimming feel specifically.",
      ],
    };
  }

  // Default fallback
  return {
    title: "Start with networking + the one room you use most",
    summary:
      "Not enough signal yet for a specific system recommendation. A good default is to solidify the network and then tackle whichever room you use most every day — usually the great room or primary bedroom.",
    pieces: [
      { label: "Home Networking", path: "/services/networking" },
      { label: "All Services", path: "/services" },
    ],
    notes: [
      "A 15-minute call will narrow this down quickly.",
    ],
  };
}

const SetupFinder = () => {
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const rec = useMemo(() => buildRecommendation(answers), [answers]);

  const toggleControl = (c: ControlItem) =>
    setAnswers((a) => ({
      ...a,
      controls: a.controls.includes(c)
        ? a.controls.filter((x) => x !== c)
        : [...a.controls, c],
    }));

  const toggleExisting = (e: ExistingSystem) =>
    setAnswers((a) => {
      if (e === "none") {
        return { ...a, existing: a.existing.includes("none") ? [] : ["none"] };
      }
      const withoutNone = a.existing.filter((x) => x !== "none");
      return {
        ...a,
        existing: withoutNone.includes(e)
          ? withoutNone.filter((x) => x !== e)
          : [...withoutNone, e],
      };
    });

  const reset = () => {
    setAnswers(INITIAL);
    setSubmitted(false);
  };

  const ready =
    answers.projectType &&
    answers.controls.length > 0 &&
    answers.rooms &&
    answers.walls &&
    answers.existing.length > 0 &&
    answers.priority;

  return (
    <PageBackground image={bgHomeIntegration}>
      <SEO
        title="Find the Right Setup"
        description="HomeWorks, RadioRA3, Control4, AVA, or just a better network? Six quick questions about your Vail Valley home and we suggest a starting point — no pressure to commit."
        keywords="smart home recommendation, HomeWorks vs RadioRA3, Control4 vs Lutron, AVA vs Control4, Vail Valley smart home"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Setup Finder", url: "/setup-finder" },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            Setup Finder
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Walk through the options in three minutes.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl hero-subtext-shadow">
            Six questions about the house. We'll suggest a starting point — Control4, Lutron HomeWorks, RadioRA3, AVA, Sonos, or a pre-wire plan if the walls are still open.
          </p>
          <p className="text-white/40 text-sm italic">
            A starting point, not a final design — the real plan comes from walking the house.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Form */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Q1 */}
          <Question label="1. What kind of project is this?">
            <OptionRow>
              <Choice
                selected={answers.projectType === "new-build"}
                onClick={() =>
                  setAnswers((a) => ({ ...a, projectType: "new-build" }))
                }
                label="New build"
              />
              <Choice
                selected={answers.projectType === "remodel"}
                onClick={() =>
                  setAnswers((a) => ({ ...a, projectType: "remodel" }))
                }
                label="Remodel / addition"
              />
              <Choice
                selected={answers.projectType === "existing-service"}
                onClick={() =>
                  setAnswers((a) => ({
                    ...a,
                    projectType: "existing-service",
                  }))
                }
                label="Existing home needing service"
              />
            </OptionRow>
          </Question>

          {/* Q2 */}
          <Question label="2. What do you want to control?">
            <OptionRow wrap>
              {(
                [
                  ["lighting", "Lighting"],
                  ["shades", "Shades"],
                  ["music", "Music"],
                  ["tvs", "TVs"],
                  ["theater", "Theater"],
                  ["wifi", "Wi-Fi / network"],
                  ["climate", "Climate"],
                  ["security", "Security"],
                ] as [ControlItem, string][]
              ).map(([k, label]) => (
                <Choice
                  key={k}
                  selected={answers.controls.includes(k)}
                  onClick={() => toggleControl(k)}
                  label={label}
                />
              ))}
            </OptionRow>
            <p className="text-white/40 text-xs mt-2">Choose any that apply.</p>
          </Question>

          {/* Q3 */}
          <Question label="3. How much of the house?">
            <OptionRow>
              {(
                [
                  ["one-room", "One room"],
                  ["main-living", "Main living areas"],
                  ["whole-home", "Whole home"],
                  ["multiple-properties", "Multiple properties"],
                ] as [RoomScope, string][]
              ).map(([k, label]) => (
                <Choice
                  key={k}
                  selected={answers.rooms === k}
                  onClick={() => setAnswers((a) => ({ ...a, rooms: k }))}
                  label={label}
                />
              ))}
            </OptionRow>
          </Question>

          {/* Q4 */}
          <Question label="4. Are the walls open or finished?">
            <OptionRow>
              {(
                [
                  ["open", "Open (framing stage)"],
                  ["finished", "Finished (retrofit)"],
                  ["mixed", "Mixed / not sure"],
                ] as [WallStatus, string][]
              ).map(([k, label]) => (
                <Choice
                  key={k}
                  selected={answers.walls === k}
                  onClick={() => setAnswers((a) => ({ ...a, walls: k }))}
                  label={label}
                />
              ))}
            </OptionRow>
          </Question>

          {/* Q5 */}
          <Question label="5. What is already in the house?">
            <OptionRow wrap>
              {(
                [
                  ["control4", "Control4"],
                  ["homeworks", "Lutron HomeWorks"],
                  ["lutron", "Lutron RadioRA3 / other Lutron"],
                  ["sonos", "Sonos"],
                  ["ava", "AVA"],
                  ["other", "Other"],
                  ["none", "Nothing yet"],
                ] as [ExistingSystem, string][]
              ).map(([k, label]) => (
                <Choice
                  key={k}
                  selected={answers.existing.includes(k)}
                  onClick={() => toggleExisting(k)}
                  label={label}
                />
              ))}
            </OptionRow>
            <p className="text-white/40 text-xs mt-2">Choose any that apply.</p>
          </Question>

          {/* Q6 */}
          <Question label="6. What matters most?">
            <OptionRow wrap>
              {(
                [
                  ["simple", "Simple to use"],
                  ["reliable", "Reliable / stays working"],
                  ["luxury-finish", "Luxury finish"],
                  ["retrofit-friendly", "Retrofit-friendly"],
                  ["builder-ready", "Builder-ready plan"],
                  ["easy-service", "Easy to service later"],
                ] as [Priority, string][]
              ).map(([k, label]) => (
                <Choice
                  key={k}
                  selected={answers.priority === k}
                  onClick={() =>
                    setAnswers((a) => ({ ...a, priority: k }))
                  }
                  label={label}
                />
              ))}
            </OptionRow>
          </Question>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setSubmitted(true)}
              disabled={!ready}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Show my starting recommendation <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <RotateCcw className="w-4 h-4" /> Start over
            </button>
          </div>
          {!ready && (
            <p className="text-white/40 text-xs">
              Answer all six questions to see a recommendation.
            </p>
          )}
        </div>
      </section>

      {/* Result */}
      {submitted && ready && (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              Starting Recommendation
            </p>
            <div className="bg-black/40 backdrop-blur-sm border border-accent/30 rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {rec.title}
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed">
                    {rec.summary}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-accent font-medium text-xs tracking-wide uppercase mb-3">
                  Pieces we would combine
                </p>
                <ul className="space-y-2">
                  {rec.pieces.map((p, i) => (
                    <li key={i}>
                      {p.path ? (
                        <Link
                          to={p.path}
                          className="group flex items-center justify-between gap-3 p-3 rounded-lg border border-white/8 bg-black/30 hover:border-accent/30 transition-colors"
                        >
                          <span className="inline-flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                            <span className="text-white text-sm font-medium group-hover:text-accent transition-colors">
                              {p.label}
                            </span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-accent transition-colors" />
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-white/8 bg-black/30">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          <span className="text-white text-sm font-medium">
                            {p.label}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {rec.notes.length > 0 && (
                <div className="mt-6 space-y-2">
                  {rec.notes.map((n, i) => (
                    <p
                      key={i}
                      className="text-white/50 text-sm leading-relaxed"
                    >
                      — {n}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-white/40 text-xs italic mt-8">
                This is a starting recommendation, not a final design. The real plan depends on walking the house and looking at the actual rooms, gear, and wiring.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
              <a
                href="tel:+19705193013"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" /> Call (970) 519-3013
              </a>
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
              >
                Send photos & details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {!submitted && (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/40 text-sm italic">
              Would rather just talk?{" "}
              <a
                href="tel:+19705193013"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Call (970) 519-3013
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <Footer />
    </PageBackground>
  );
};

const Question = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-white font-semibold text-base sm:text-lg mb-4">
      {label}
    </h3>
    {children}
  </div>
);

const OptionRow = ({
  children,
  wrap,
}: {
  children: React.ReactNode;
  wrap?: boolean;
}) => (
  <div
    className={
      wrap
        ? "flex flex-wrap gap-2"
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
    }
  >
    {children}
  </div>
);

const Choice = ({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors text-left ${
      selected
        ? "border-accent bg-accent/10 text-white"
        : "border-white/10 bg-black/30 text-white/70 hover:border-white/20 hover:text-white"
    }`}
    aria-pressed={selected}
  >
    {label}
  </button>
);

export default SetupFinder;
