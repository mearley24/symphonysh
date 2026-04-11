import { ReactNode } from "react";

interface ServiceDemoSectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const ServiceDemoSection = ({ title, subtitle, children }: ServiceDemoSectionProps) => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/10 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">{subtitle}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        </div>
        <div className="rounded-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ServiceDemoSection;
