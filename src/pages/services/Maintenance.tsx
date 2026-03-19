import { Wrench, Check, List, AlertCircle, Clock, Shield, Phone, Calendar } from "lucide-react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";

const Maintenance = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Troubleshooting & Maintenance",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Professional maintenance and support services for smart home systems.",
    "areaServed": "Vail Valley, Colorado"
  };

  const serviceTypes = [
    { icon: Wrench, title: "Diagnostics", desc: "System health checks", status: "Available" },
    { icon: Check, title: "Preventive", desc: "Regular maintenance", status: "Scheduled" },
    { icon: AlertCircle, title: "Emergency", desc: "24/7 urgent support", status: "Active" },
    { icon: List, title: "Updates", desc: "Software & firmware", status: "Auto" },
  ];

  const supportPlans = [
    { 
      name: "Basic Support",
      features: ["Email support", "Business hours", "Remote diagnostics"],
      price: "$49/mo"
    },
    { 
      name: "Priority Support",
      features: ["Phone & email", "Extended hours", "Same-day response"],
      price: "$99/mo"
    },
    { 
      name: "Premium Support",
      features: ["24/7 availability", "On-site visits", "Priority scheduling"],
      price: "$199/mo"
    }
  ];

  return (
    <Control4ServiceLayout
      title="Maintenance"
      description="Professional maintenance and support services to keep your smart home running smoothly."
      keywords="smart home maintenance, troubleshooting, support, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Wrench}
      iconGradient="from-orange-500 to-red-500"
      subtitle="Keep your system running smoothly"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="<2hr" label="Response" />
          <StatsCard value="24/7" label="Support" />
          <StatsCard value="99%" label="Resolution" />
          <StatsCard value="5★" label="Rating" />
        </div>

        {/* Service Types */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Service Types</h3>
          <div className="grid grid-cols-2 gap-3">
            {serviceTypes.map((service) => (
              <div key={service.title} className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm">{service.title}</h4>
                  <p className="text-white/60 text-xs mb-1">{service.desc}</p>
                  <span className="text-green-400 text-[10px] bg-green-500/20 px-2 py-0.5 rounded-full">
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Support Plans */}
        <div className="space-y-3">
          <h3 className="text-white font-medium px-1">Support Plans</h3>
          {supportPlans.map((plan) => (
            <GlassCard key={plan.name} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">{plan.name}</h4>
                <span className="text-accent font-bold">{plan.price}</span>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard
            icon={Phone}
            title="Direct Line"
            description="Talk to real technicians"
            iconColor="text-blue-400"
          />
          <FeatureCard
            icon={Calendar}
            title="Scheduled"
            description="Regular check-ups"
            iconColor="text-green-400"
          />
          <FeatureCard
            icon={Shield}
            title="Protected"
            description="Extended warranties"
            iconColor="text-purple-400"
          />
        </div>

        {/* CTA */}
        <CTACard
          title="Keep Your System Running"
          description="Contact us to learn more about our maintenance plans and support services."
          buttonText="Schedule Service"
          buttonLink="/scheduling?service=maintenance"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default Maintenance;
