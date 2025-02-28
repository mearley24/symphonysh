
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
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (photo: string) => {
    setLoadedImages(prev => ({ ...prev, [photo]: true }));
  };

  const handleImageError = (photo: string) => {
    console.error(`Failed to load image: ${photo}`);
    // Mark the image as failed to load
    setLoadedImages(prev => ({ ...prev, [photo]: false }));
  };

  // Filter out images that failed to load after attempting to load them
  const filteredPhotos = photos.filter(photo => loadedImages[photo] !== false);

  // Fix image path - ensure it doesn't have double slashes and is properly encoded
  const getFixedImagePath = (path: string) => {
    // Remove any double slashes that aren't part of protocol
    const cleanPath = path.replace(/([^:])\/+/g, '$1/');
    // Encode the path properly for URLs
    return encodeURI(cleanPath);
  };

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
          
          {filteredPhotos.length === 0 ? (
            <div className="text-center text-white p-8 bg-secondary/30 rounded-lg">
              <p>No images available to display.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="aspect-video rounded-lg overflow-hidden cursor-pointer group bg-secondary/20"
                  onClick={() => loadedImages[photo] && setSelectedImage(photo)}
                >
                  <img 
                    src={getFixedImagePath(photo)} 
                    alt={`${title} ${index + 1}`} 
                    className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                    onLoad={() => handleImageLoad(photo)}
                    onError={() => handleImageError(photo)}
                  />
                </div>
              ))}
            </div>
          )}
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
            src={getFixedImagePath(selectedImage)} 
            alt="Full size view" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              console.error(`Failed to load full size image: ${selectedImage}`);
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
