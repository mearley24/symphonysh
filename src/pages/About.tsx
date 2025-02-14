
import { Check } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">About Us</h1>
          <p className="text-xl text-gray-300 text-center mb-16">
            Leading the way in smart home automation technology
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At Symphony Smart Homes, we're dedicated to transforming houses into intelligent, 
              efficient, and comfortable living spaces. Our mission is to bring the future of 
              home automation to your doorstep with solutions that enhance your lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                {[
                  "Expert installation team",
                  "24/7 support service",
                  "Custom solutions",
                  "Latest technology",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-accent mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Our Values</h3>
              <ul className="space-y-3">
                {[
                  "Quality excellence",
                  "Customer satisfaction",
                  "Innovation focus",
                  "Reliable service",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-accent mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
