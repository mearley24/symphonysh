
import { ArrowRight } from "lucide-react";

const Feature = ({ title, description }: { title: string; description: string }) => (
  <div className="glass p-6 rounded-2xl card-hover">
    <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
    <p className="text-accent">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold animate-fade-up mb-6">
            Design with Purpose
          </h1>
          <p className="text-xl text-accent animate-fade-up [animation-delay:200ms] mb-8">
            Create beautiful experiences that inspire and delight
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors animate-fade-up [animation-delay:400ms]">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Crafted with Excellence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              title="Intuitive Design"
              description="Simple, clean, and easy to understand interfaces that just work."
            />
            <Feature
              title="Attention to Detail"
              description="Every pixel matters in creating a premium experience."
            />
            <Feature
              title="Performance First"
              description="Lightning-fast experiences that keep users engaged."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-accent">
        <p className="text-sm">
          Crafted with precision and care
        </p>
      </footer>
    </div>
  );
};

export default Index;
