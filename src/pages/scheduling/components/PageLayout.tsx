
import React, { useEffect } from "react";
import Header from "@/components/Header";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({
  children
}: PageLayoutProps) {
  console.log("PageLayout rendering");
  useEffect(() => {
    console.log("PageLayout mounted");
  }, []);
  
  return <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>;
}
