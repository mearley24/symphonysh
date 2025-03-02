
import React, { useState } from 'react';
import PhotoGallery from '../../components/PhotoGallery';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Wiring = () => {
  const [selectedGallery, setSelectedGallery] = useState<'general' | 'relocation'>('general');
  
  const generalPhotos = [
    "/lovable-uploads/wiring/71674303475__8894E961-8D43-47AC-906F-6F5262138D13.JPG",
    "/lovable-uploads/wiring/71674305301__BF3FF410-BB0F-4285-B21C-A7F9EDEBA8B3.JPG",
    "/lovable-uploads/wiring/71934397485__8C49F301-AD94-46A1-86EB-A779999B757F.JPG",
    "/lovable-uploads/wiring/IMG_0080.JPG",
    "/lovable-uploads/wiring/IMG_0136.JPG",
    "/lovable-uploads/wiring/IMG_0137.JPG",
    "/lovable-uploads/wiring/IMG_0228%202.JPG", // URL encoded space
    "/lovable-uploads/wiring/IMG_0578.JPG",
    "/lovable-uploads/wiring/IMG_1138.JPG",
    "/lovable-uploads/wiring/IMG_1139.JPG",
    "/lovable-uploads/wiring/IMG_1161.JPG",
    "/lovable-uploads/wiring/IMG_1311.JPG",
    "/lovable-uploads/wiring/IMG_1312.JPG",
    "/lovable-uploads/wiring/IMG_1313.JPG",
    "/lovable-uploads/wiring/IMG_1320.JPG",
    "/lovable-uploads/wiring/IMG_1321.JPG",
    "/lovable-uploads/wiring/IMG_1322.JPG",
    "/lovable-uploads/wiring/IMG_1323.JPG",
    "/lovable-uploads/wiring/IMG_1324.JPG",
    "/lovable-uploads/wiring/IMG_1499.JPG",
    "/lovable-uploads/wiring/IMG_1755.JPG"
  ];

  // Photos that were specifically in the Wire Relocation gallery
  const wireRelocationPhotos = [
    "/lovable-uploads/wiring/IMG_0611.JPG",
    "/lovable-uploads/wiring/IMG_1551.JPG",
    "/lovable-uploads/wiring/IMG_1552.JPG",
    "/lovable-uploads/wiring/IMG_1733.JPG"
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
          
          {/* Gallery selection tabs */}
          <div className="flex mb-8 border-b border-gray-700">
            <button 
              className={`px-4 py-2 mr-4 font-medium ${selectedGallery === 'general' ? 'text-primary-foreground border-b-2 border-primary-foreground' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setSelectedGallery('general')}
            >
              General Wiring
            </button>
            <button 
              className={`px-4 py-2 font-medium ${selectedGallery === 'relocation' ? 'text-primary-foreground border-b-2 border-primary-foreground' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setSelectedGallery('relocation')}
            >
              Wire Relocation
            </button>
          </div>
          
          {/* Conditional rendering based on selected gallery */}
          {selectedGallery === 'general' ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generalPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition"
                    onClick={() => window.open(photo, '_blank')}
                  >
                    <img 
                      src={photo}
                      alt={`General Wiring ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wireRelocationPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition"
                    onClick={() => window.open(photo, '_blank')}
                  >
                    <img 
                      src={photo}
                      alt={`Wire Relocation ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wiring;
