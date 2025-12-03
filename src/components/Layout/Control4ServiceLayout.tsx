import { useState, ReactNode } from "react";
import { 
  Home, Music, Shield, Thermometer, Lightbulb, Settings,
  Heart, Grid3X3, Star
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../SEO";

interface Control4ServiceLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords: string;
  serviceSchema?: object;
  icon: React.ComponentType<{ className?: string }>;
  iconGradient?: string;
  subtitle?: string;
}

const Control4ServiceLayout = ({
  children,
  title,
  description,
  keywords,
  serviceSchema,
  icon: Icon,
  iconGradient = "from-purple-600 to-blue-600",
  subtitle
}: Control4ServiceLayoutProps) => {
  const location = useLocation();

  const bottomNav = [
    { icon: Home, label: "Home", path: "/services/home-integration" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Favorites", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <SEO title={title} description={description} keywords={keywords} />
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-gradient-to-br ${iconGradient}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
          </div>
        </div>
        <Link 
          to="/scheduling" 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
        >
          Schedule
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {children}
      </div>

      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                  isActive 
                    ? "text-white bg-white/10" 
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Glass Card component for consistent styling
export const GlassCard = ({ 
  children, 
  className = "", 
  onClick 
}: { 
  children: ReactNode; 
  className?: string; 
  onClick?: () => void;
}) => (
  <div 
    className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Stats Card component
export const StatsCard = ({ value, label }: { value: string; label: string }) => (
  <GlassCard className="text-center p-4">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs text-white/60">{label}</div>
  </GlassCard>
);

// Feature Card component
export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  iconColor = "text-accent"
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string;
  iconColor?: string;
}) => (
  <GlassCard className="p-4">
    <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
    <p className="text-white/60 text-xs">{description}</p>
  </GlassCard>
);

// Pricing Item component
export const PricingItem = ({ label, price }: { label: string; price: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
    <span className="text-white/80 text-sm">{label}</span>
    <span className="text-accent font-semibold text-sm">{price}</span>
  </div>
);

// CTA Card component
export const CTACard = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: { 
  title: string; 
  description: string; 
  buttonText: string; 
  buttonLink: string;
}) => (
  <GlassCard className="p-6 text-center">
    <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
    <p className="text-white/60 text-sm mb-4">{description}</p>
    <Link 
      to={buttonLink}
      className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors"
    >
      {buttonText}
    </Link>
  </GlassCard>
);

export default Control4ServiceLayout;
