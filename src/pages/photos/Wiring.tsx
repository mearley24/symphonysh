
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

const Wiring = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    "/lovable-uploads/56480a40-adc0-4a59-912b-0309634ebf44.png",
    "/lovable-uploads/860a30b2-c8df-4e9e-b327-3efecb18a16f.png",
    "/lovable-uploads/df55cc4d-3261-458d-92d3-7acaae21361e.png"
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-4xl font-bold text-white mb-8">Wiring</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-video rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Wiring Installation ${index + 1}`} 
                  className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-size image modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size view" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Wiring;
