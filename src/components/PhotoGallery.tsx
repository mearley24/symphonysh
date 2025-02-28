
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, ImageOff } from 'lucide-react';

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
  const [processedPhotos, setProcessedPhotos] = useState<string[]>([]);

  // Process photo paths on component mount
  useEffect(() => {
    // Convert any HEIC files to their JPG alternatives if available
    const processed = photos.map(photo => {
      // Replace HEIC with JPG if it exists in the path
      if (photo.toUpperCase().endsWith('.HEIC')) {
        return photo.replace(/\.HEIC$/i, '.JPG');
      }
      return photo;
    });
    
    setProcessedPhotos(processed);
  }, [photos]);

  const handleImageLoad = (photo: string) => {
    console.log(`Image loaded successfully: ${photo}`);
    setLoadedImages(prev => ({ ...prev, [photo]: true }));
  };

  const handleImageError = (photo: string) => {
    console.error(`Failed to load image: ${photo}`);
    // Mark the image as failed to load
    setLoadedImages(prev => ({ ...prev, [photo]: false }));
  };

  // Filter out images that failed to load after attempting to load them
  const filteredPhotos = processedPhotos.filter(photo => loadedImages[photo] !== false);

  // Fix image path - ensure it doesn't have double slashes, spaces encoded, and is properly encoded
  const getFixedImagePath = (path: string) => {
    try {
      // Remove any double slashes that aren't part of protocol
      let cleanPath = path.replace(/([^:])\/+/g, '$1/');
      
      // Replace spaces with %20
      cleanPath = cleanPath.replace(/ /g, '%20');
      
      // Encode the path properly for URLs
      return encodeURI(cleanPath);
    } catch (error) {
      console.error(`Error fixing image path: ${path}`, error);
      return '';
    }
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
          
          {processedPhotos.length === 0 ? (
            <div className="text-center text-white p-8 bg-secondary/30 rounded-lg">
              <p>No images available to display.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className="aspect-video rounded-lg overflow-hidden cursor-pointer group bg-secondary/20"
                  onClick={() => loadedImages[photo] && setSelectedImage(photo)}
                >
                  {loadedImages[photo] === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageOff className="w-12 h-12 mb-2" />
                      <p className="text-sm text-center">Image could not be loaded</p>
                    </div>
                  ) : (
                    <img 
                      src={getFixedImagePath(photo)} 
                      alt={`${title} ${index + 1}`} 
                      className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                      onLoad={() => handleImageLoad(photo)}
                      onError={() => handleImageError(photo)}
                    />
                  )}
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
              // Add a placeholder or fallback content
              const div = document.createElement('div');
              div.className = "flex flex-col items-center justify-center text-white";
              div.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4">
                  <line x1="2" y1="2" x2="22" y2="22"></line>
                  <path d="M10.41 10.41a2 2 0 1 1 3.18 3.18"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <p>Image could not be loaded</p>
              `;
              e.currentTarget.parentNode?.replaceChild(div, e.currentTarget);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
