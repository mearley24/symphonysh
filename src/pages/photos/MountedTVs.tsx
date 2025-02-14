
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

const MountedTVs = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
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
          <h1 className="text-4xl font-bold text-white mb-8">Mounted TVs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-video rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Mounted TV Installation ${index + 1}`} 
                  className="w-full h-full object-cover"
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

export default MountedTVs;
