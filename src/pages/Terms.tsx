
import React from "react";
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
      <section className="pt-48 md:pt-56 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-400">
            Last updated: June 1, 2024
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-lg text-gray-300 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to Symphony Smart Homes. By using our services, you agree to these Terms of Service. Please read them carefully.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Use of Services</h2>
              <p>
                Our services are designed to help you automate and enhance your home environment. You agree to use these services only for lawful purposes and in accordance with these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
              <p>
                Some of our services require you to register for an account. You agree to provide accurate information during the registration process and to keep your account information updated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Service Availability</h2>
              <p>
                We strive to maintain the availability of our services, but they may be occasionally interrupted for maintenance, upgrades, or factors beyond our control. We are not liable for any interruptions or downtime.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
              <p>
                All content, designs, and software used in our services are the property of Symphony Smart Homes or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. User Content</h2>
              <p>
                You retain ownership of any content you submit through our services. By submitting content, you grant us a non-exclusive license to use, modify, and display that content in connection with our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Third-Party Services</h2>
              <p>
                Our services may integrate with third-party services, such as Google Calendar. Your use of these third-party services is subject to their respective terms and privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our services at any time for violations of these Terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Symphony Smart Homes shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will provide notice of significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the state of Colorado, without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at info@symphonysh.com.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </PageBackground>
  );
};

export default Terms;
