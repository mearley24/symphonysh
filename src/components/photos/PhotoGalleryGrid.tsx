
import React from 'react';
import { ImageOff } from 'lucide-react';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition relative"
          onClick={() => window.open(getFixedImagePath(photo), '_blank')}
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
  );
};

export default PhotoGalleryGrid;
