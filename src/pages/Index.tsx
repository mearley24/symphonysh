
import { ArrowRight } from "lucide-react";

const Feature = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300">
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative py-20 px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-up mb-6 leading-tight">
            Symphony <br />Solutions
          </h1>
          <p className="text-xl text-gray-300 animate-fade-up [animation-delay:200ms] mb-8 max-w-2xl mx-auto">
            Delivering excellence in industrial automation and control systems
          </p>
          <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-medium inline-flex items-center gap-2 transition-colors animate-fade-up [animation-delay:400ms]">
            Explore Our Solutions
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-primary to-primary/95">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Industry-Leading Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              title="Advanced Automation"
              description="Cutting-edge automation solutions designed for maximum efficiency and reliability."
            />
            <Feature
              title="Control Systems"
              description="Precision-engineered control systems that deliver exceptional performance."
            />
            <Feature
              title="24/7 Support"
              description="Round-the-clock technical support and maintenance services for your systems."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
