import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

import PageBackground from "../components/PageBackground";
import bgAbout from "../assets/bg-about.jpg";

const Terms = () => {
  return (
    <PageBackground image={bgAbout}>
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for Symphony Smart Homes."
        keywords="terms, terms of service, legal, smart home, symphony smart homes"
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">Terms of Service</h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Last updated: June 1, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 sm:p-8 text-white/70 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to Symphony Smart Homes. By using our services, you agree to these Terms of Service. Please read them carefully.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">2. Use of Services</h2>
              <p>
                Our services are designed to help you automate and enhance your home environment. You agree to use these services only for lawful purposes and in accordance with these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
              <p>
                Some of our services require you to register for an account. You agree to provide accurate information during the registration process and to keep your account information updated.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">4. Service Availability</h2>
              <p>
                We strive to maintain the availability of our services, but they may be occasionally interrupted for maintenance, upgrades, or factors beyond our control. We are not liable for any interruptions or downtime.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
              <p>
                All content, designs, and software used in our services are the property of Symphony Smart Homes or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">6. User Content</h2>
              <p>
                You retain ownership of any content you submit through our services. By submitting content, you grant us a non-exclusive license to use, modify, and display that content in connection with our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">7. Third-Party Services</h2>
              <p>
                Our services may integrate with third-party services, such as Google Calendar. Your use of these third-party services is subject to their respective terms and privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our services at any time for violations of these Terms or for any other reason at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Symphony Smart Homes shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">10. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will provide notice of significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the state of Colorado, without regard to its conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at info@symphonysh.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Terms;