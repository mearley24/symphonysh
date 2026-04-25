import { Award, MapPin, Home, Layers } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "Eagle County",
    label: "Based & operating locally",
  },
  {
    icon: Layers,
    value: "Lutron · Control4 · AVA",
    label: "Real platforms, no lock-in",
  },
  {
    icon: Home,
    value: "Vail Valley",
    label: "& Eagle County",
  },
  {
    icon: Award,
    value: "Control4",
    label: "Authorized Dealer",
  },
];

const SocialProof = () => {
  return (
    <section data-reveal className="py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-1">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-white font-bold text-xl sm:text-2xl leading-tight">{stat.value}</p>
              <p className="text-white/45 text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
