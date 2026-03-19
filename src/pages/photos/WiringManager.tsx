
import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PhotoManager from '../../components/photos/PhotoManager';

import PageBackground from "../../components/PageBackground";
import bgPrewire from "../../assets/bg-prewire.jpg";

const WiringManager = () => {
  return (
    <PageBackground image={bgPrewire}>
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/photos/wiring" className="inline-flex items-center text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wiring Gallery
          </Link>
          
          <PhotoManager />
        </div>
      </section>
    </PageBackground>
  );
};

export default WiringManager;
