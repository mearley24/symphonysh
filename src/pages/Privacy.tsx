import React from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-primary">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for Symphony Smart Homes - Learn how we collect, use, and protect your information."
        keywords="privacy policy, data protection, symphony smart homes, privacy"
      />
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300 text-center mb-16">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg mb-12 text-gray-300 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Symphony Smart Homes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="mt-2">
                We use your data to provide and improve our services. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p>
                <strong className="text-white">Personal Information:</strong> Name, email address, phone number, and address when you schedule appointments or contact us.
              </p>
              <p className="mt-2">
                <strong className="text-white">Calendar Information:</strong> When you connect your Google Calendar, we access your calendar data to check availability and schedule appointments. We do not store your calendar events unrelated to our services.
              </p>
              <p className="mt-2">
                <strong className="text-white">Device Information:</strong> We may collect information about your device, including IP address, browser type, and operating system.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To schedule and manage appointments</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our services</li>
                <li>To monitor the usage of our services</li>
                <li>To detect, prevent, and address technical issues</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Google Calendar Integration</h2>
              <p>
                Our service integrates with Google Calendar to check for availability and schedule appointments. We request limited access to your Google Calendar data for the sole purpose of scheduling and managing appointments.
              </p>
              <p className="mt-2">
                We only access and modify calendar events related to our services. We do not read, modify, or store other calendar events unrelated to appointments with Symphony Smart Homes.
              </p>
              <p className="mt-2">
                You can revoke our access to your Google Calendar at any time through your Google Account settings.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
              <p>
                The security of your data is important to us, but no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Services</h2>
              <p>
                We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.
              </p>
              <p className="mt-2">
                These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your Data Protection Rights</h2>
              <p>
                You have the following data protection rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>The right to access, update, or delete the information we have on you</li>
                <li>The right of rectification - the right to have your information corrected if it is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right to restriction - the right to request that we restrict the processing of your personal information</li>
                <li>The right to data portability - the right to receive a copy of your personal data in a structured, machine-readable format</li>
                <li>The right to withdraw consent at any time where we relied on your consent to process your personal information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
              </p>
              <p className="mt-2">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>By email: info@symphonysh.com</li>
                <li>By phone: (970) 519-3013</li>
                <li>By mail: 45 Aspen Glen Ct, Edwards, CO 81632</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
