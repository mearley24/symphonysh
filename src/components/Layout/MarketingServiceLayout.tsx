import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import SEO from "../SEO";
import Header from "@/components/Header";

interface MarketingServiceLayoutProps {
  title: string;
  description: string;
  keywords: string;
  serviceSchema?: object;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}

export default function MarketingServiceLayout({
  title,
  description,
  keywords,
  serviceSchema,
  icon: Icon,
  children,
}: MarketingServiceLayoutProps) {
  return (
    <div className="min-h-screen c4-gradient text-white">
      <SEO title={title} description={description} keywords={keywords} />
      {serviceSchema && (
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      )}

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="c4-surface rounded-3xl p-6 sm:p-10">
            <div className="flex items-start gap-4">
              {Icon ? (
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white/80" />
                </div>
              ) : null}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
                <p className="text-white/70 mt-3 max-w-3xl">{description}</p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/scheduling"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule a consultation
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
                  >
                    Get a quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pb-16">{children}</section>
      </main>
    </div>
  );
}
