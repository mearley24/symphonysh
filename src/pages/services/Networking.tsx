import { Wifi, Network, Router, Globe, Cloud, Signal, Shield, Zap } from "lucide-react";
import { useState } from "react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";

const Networking = () => {
  const [activeDevices] = useState(47);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Home Networking",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Enterprise-grade networking for reliable smart home connectivity.",
    "areaServed": "Vail Valley, Colorado"
  };

  const networkStats = [
    { label: "Download", value: "940 Mbps", icon: Zap, color: "text-green-400" },
    { label: "Upload", value: "880 Mbps", icon: Zap, color: "text-blue-400" },
    { label: "Latency", value: "3 ms", icon: Signal, color: "text-yellow-400" },
    { label: "Uptime", value: "99.9%", icon: Shield, color: "text-purple-400" },
  ];

  const devices = [
    { name: "Smart TVs", count: 6, status: "online" },
    { name: "Thermostats", count: 4, status: "online" },
    { name: "Cameras", count: 8, status: "online" },
    { name: "Speakers", count: 12, status: "online" },
    { name: "Lights", count: 15, status: "online" },
    { name: "Other", count: 2, status: "online" },
  ];

  return (
    <Control4ServiceLayout
      title="Home Networking"
      description="Enterprise-grade networking that powers your entire smart home without breaking a sweat."
      keywords="home networking, wifi, mesh network, smart home network, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Wifi}
      iconGradient="from-green-500 to-teal-500"
      subtitle="Enterprise-grade connectivity"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="1 Gbps" label="Speed" />
          <StatsCard value={String(activeDevices)} label="Devices" />
          <StatsCard value="100%" label="Coverage" />
          <StatsCard value="24/7" label="Monitoring" />
        </div>

        {/* Network Status */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Network Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">All Systems Online</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {networkStats.map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-white font-semibold">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Connected Devices */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Connected Devices</h3>
          <div className="grid grid-cols-3 gap-2">
            {devices.map((device) => (
              <div key={device.name} className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-white">{device.count}</div>
                <div className="text-white/60 text-xs">{device.name}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-green-400 text-[10px]">online</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard
            icon={Router}
            title="Pro Hardware"
            description="Business-class equipment"
            iconColor="text-blue-400"
          />
          <FeatureCard
            icon={Globe}
            title="Full Coverage"
            description="No dead zones anywhere"
            iconColor="text-green-400"
          />
          <FeatureCard
            icon={Cloud}
            title="Smart Mgmt"
            description="Remote monitoring & updates"
            iconColor="text-purple-400"
          />
        </div>

        {/* Pricing */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Network Packages</h3>
          <PricingItem label="Basic (2,500 sq ft)" price="$1,200+" />
          <PricingItem label="Standard (5,000 sq ft)" price="$2,400+" />
          <PricingItem label="Premium (10,000+ sq ft)" price="$4,500+" />
        </GlassCard>

        {/* CTA */}
        <CTACard
          title="Bulletproof Connectivity"
          description="Build the network foundation your smart home deserves."
          buttonText="Schedule Assessment"
          buttonLink="/scheduling?service=networking"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default Networking;
