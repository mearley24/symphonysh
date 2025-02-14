
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Scheduling = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h1>
            <p className="text-lg text-gray-300">
              Book a time to discuss your smart home project with our experts.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 aspect-[3/4]">
            {/* Replace the src URL below with your actual Acuity Scheduling embed URL */}
            <iframe
              src="YOUR_ACUITY_SCHEDULING_EMBED_URL"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-md"
            />
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

export default Scheduling;
