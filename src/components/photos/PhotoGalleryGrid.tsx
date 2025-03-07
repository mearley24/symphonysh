
import React, { useState } from 'react';
import { ImageOff, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFixedImagePath } from '../../utils/photos/types';

interface PhotoGalleryGridProps {
  photos: string[];
  galleryName: string;
  loadedImages: Record<string, boolean>;
  onImageLoad: (image: string) => void;
  onImageError: (image: string) => void;
}

const PhotoGalleryGrid: React.FC<PhotoGalleryGridProps> = ({
  photos,
  galleryName,
  loadedImages,
  onImageLoad,
  onImageError
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    const currentIndex = photos.indexOf(selectedImage);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedImage(photos[prevIndex]);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    const currentIndex = photos.indexOf(selectedImage);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(photos[nextIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevImage(e as unknown as React.MouseEvent);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextImage(e as unknown as React.MouseEvent);
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition relative"
            onClick={() => loadedImages[photo] && setSelectedImage(photo)}
          >
            {loadedImages[photo] === false ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                <ImageOff className="w-12 h-12 mb-2" />
                <p className="text-sm text-center">Image could not be loaded</p>
              </div>
            ) : (
              <>
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm z-10">
                  #{index + 1}
                </div>
                <img 
                  src={getFixedImagePath(photo)}
                  alt={`${galleryName} ${index + 1}`}
                  className="w-full h-full object-contain"
                  onLoad={() => onImageLoad(photo)}
                  onError={() => onImageError(photo)}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen image modal with navigation */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-full max-h-[90vh]">
            <img 
              src={getFixedImagePath(selectedImage)}
              alt="Full size view" 
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error(`Failed to load full size image: ${selectedImage}`);
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
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
              #{photos.indexOf(selectedImage) + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGalleryGrid;
