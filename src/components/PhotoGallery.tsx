
import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

interface PhotoGalleryProps {
  title: string;
  photos: string[];
  backLink?: string;
  backText?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  title, 
  photos, 
  backLink = "/projects", 
  backText = "Back to Projects" 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to={backLink} className="inline-flex items-center text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backText}
          </Link>
          <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-video rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(photo)}
              >
                <img 
                  src={photo} 
                  alt={`${title} ${index + 1}`} 
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

export default PhotoGallery;
