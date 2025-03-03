
import React from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-primary">
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for Symphony Smart Homes."
        keywords="terms, terms of service, legal, smart home, symphony smart homes"
      />
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-300">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
              <p>
                Welcome to Symphony Smart Homes. By using our services, you agree to these Terms of Service. Please read them carefully.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">2. Use of Services</h2>
              <p>
                Our services are designed to help you automate and enhance your home environment. You agree to use these services only for lawful purposes and in accordance with these Terms.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">3. Account Registration</h2>
              <p>
                Some of our services require you to register for an account. You agree to provide accurate information during the registration process and to keep your account information updated.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">4. Service Availability</h2>
              <p>
                We strive to maintain the availability of our services, but they may be occasionally interrupted for maintenance, upgrades, or factors beyond our control. We are not liable for any interruptions or downtime.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">5. Intellectual Property</h2>
              <p>
                All content, designs, and software used in our services are the property of Symphony Smart Homes or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">6. User Content</h2>
              <p>
                You retain ownership of any content you submit through our services. By submitting content, you grant us a non-exclusive license to use, modify, and display that content in connection with our services.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">7. Third-Party Services</h2>
              <p>
                Our services may integrate with third-party services, such as Google Calendar. Your use of these third-party services is subject to their respective terms and privacy policies.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our services at any time for violations of these Terms or for any other reason at our sole discretion.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Symphony Smart Homes shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">10. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will provide notice of significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the state of Colorado, without regard to its conflict of law principles.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at info@symphonysh.com.
              </p>
            </div>
            
            <div>
              <p className="mt-8">
                Last updated: June 1, 2024
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
