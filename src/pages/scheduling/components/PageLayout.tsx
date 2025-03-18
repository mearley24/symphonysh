
import React from "react";
import Header from "@/components/Header";
import { BackNavigation } from "@/components/scheduling/BackNavigation";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackNavigation />
            <h1 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h1>
            <p className="text-lg text-gray-300 mb-8">
              Book a time to discuss your smart home project with our experts.
            </p>
          </div>

          {children}
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
