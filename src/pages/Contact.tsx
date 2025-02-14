import { Mail, Phone, MapPin } from "lucide-react";
import Header from "../components/Header";

const ContactInfo = ({ icon: Icon, title, content }: { icon: any; title: string; content: string }) => (
  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent" />
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-300 whitespace-pre-line">{content}</p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 text-center mb-16">
            Get in touch with our team of home automation experts
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <ContactInfo
                icon={Phone}
                title="Phone"
                content="(970) 519-3013"
              />
              <ContactInfo
                icon={Mail}
                title="Email"
                content="info@symphonysh.com"
              />
              <ContactInfo
                icon={MapPin}
                title="Address"
                content={`45 Aspen Glen Ct\nEdwards, CO 81632`}
              />
            </div>

            <form className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent h-32"
                  ></textarea>
                </div>
                <button className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Send Message
                </button>
              </div>
            </form>
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

export default Contact;
