
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import bgContact from "@/assets/bg-contact.jpg";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <PageBackground image={bgContact}>
      <Header />

      {/* Page hero */}
      <section className="pt-36 sm:pt-44 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            Book a Consultation
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3 text-white hero-text-shadow">
            Schedule a Walkthrough
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl hero-subtext-shadow">
            Pick a date and time that works for you — we'll confirm within a few hours.
          </p>
        </div>
      </section>

      {/* Form area */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border border-white/8 rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
}
