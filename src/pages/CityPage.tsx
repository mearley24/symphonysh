import { useLocation, Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin, CheckCircle2, Home, Volume2, Wifi, Lightbulb, Shield, Sun } from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import { cityPages } from "../data/cityPages";
import bgAbout from "../assets/bg-about.jpg";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE_E164,
  BUSINESS_URL,
} from "../constants/businessSchema";

const services = [
  {
    icon: Home,
    title: "Home Automation",
    description: "Control4 systems that unify lighting, audio, climate, security, and shades into one elegant interface.",
    path: "/services/home-integration",
  },
  {
    icon: Volume2,
    title: "Audio & Entertainment",
    description: "Multi-room audio, home theaters, and outdoor speakers for every kind of mountain home.",
    path: "/services/audio-entertainment",
  },
  {
    icon: Lightbulb,
    title: "Smart Lighting",
    description: "Lutron keypads, dimmers, and automated scenes throughout your home.",
    path: "/services/smart-lighting",
  },
  {
    icon: Sun,
    title: "Motorized Shades",
    description: "Automated window treatments that manage mountain sun, privacy, and energy efficiency.",
    path: "/services/shades",
  },
  {
    icon: Wifi,
    title: "Home Networking",
    description: "Enterprise-grade Wi-Fi and structured cabling built for homes with 30+ smart devices.",
    path: "/services/networking",
  },
  {
    icon: Shield,
    title: "Security Systems",
    description: "4K cameras, smart locks, and alarm monitoring integrated with your automation system.",
    path: "/services/security-systems",
  },
];

const CityPage = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, "");
  const cityData = cityPages.find((c) => c.slug === slug);

  if (!cityData) {
    return (
      <PageBackground image={bgAbout}>
        <Header />
        <section className="pt-44 pb-20 px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return Home</Link>
        </section>
        <Footer />
      </PageBackground>
    );
  }

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_NAME,
    "telephone": BUSINESS_PHONE_E164,
    "url": BUSINESS_URL,
    "description": cityData.metaDescription,
    "areaServed": [
      {
        "@type": "City",
        "name": `${cityData.city}, Colorado`,
      },
    ],
  };

  return (
    <PageBackground image={bgAbout}>
      <SEO
        title={cityData.metaTitle}
        description={cityData.metaDescription}
        canonicalUrl={`${BUSINESS_URL}/${cityData.slug}`}
        schema={citySchema}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: cityData.city, url: `/${cityData.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-accent" />
            <p className="text-accent font-medium text-sm tracking-wide uppercase">Vail Valley · Eagle County</p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            {cityData.headline}
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl hero-subtext-shadow">
            {cityData.subheadline}
          </p>
          <p className="text-white/50 text-base leading-relaxed mb-8 max-w-2xl">
            {cityData.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              onClick={trackPhoneClick}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Why this city */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Local Knowledge</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why {cityData.city}?
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-3xl">
            {cityData.localDetails}
          </p>
          {cityData.driveTime && (
            <div className="mt-6 inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span className="text-white/70 text-sm">{cityData.driveTime}</span>
            </div>
          )}
        </div>
      </section>

      {/* Common projects */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">In the Neighborhood</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Common projects in {cityData.city}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityData.commonProjects.map((project, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm leading-relaxed">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      {cityData.neighborhoods && cityData.neighborhoods.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Coverage</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Neighborhoods we serve in {cityData.city}
            </h2>
            <div className="flex flex-wrap gap-3">
              {cityData.neighborhoods.map((hood) => (
                <div
                  key={hood}
                  className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent/70 shrink-0" />
                  <span className="text-white/70 text-sm">{hood}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Services</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            How {cityData.city} homes use Symphony
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group bg-black/40 backdrop-blur-sm border border-white/8 hover:border-accent/30 rounded-xl p-5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                <p className="text-accent text-sm mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  See what's included <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">When You're Ready</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Tell us about the {cityData.city} home.
          </h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            We work this side of the valley every week. Send the property and how you live in it — we'll suggest the line that fits and walk through the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              onClick={trackPhoneClick}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default CityPage;
