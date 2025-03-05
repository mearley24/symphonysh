
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowRight, ImageOff } from 'lucide-react';
import { Button } from "../ui/button";
import { getFixedImagePath } from '../../utils/photos/types';

// Define the types for the gallery photos
export type GalleryType = 'general' | 'rackWiring' | 'shadeWiring';

interface SortablePhotoProps {
  id: string;
  url: string;
  index: number;
  galleryType: GalleryType;
  onMoveToGallery: (photoId: string, targetGallery: GalleryType) => void;
  availableGalleries: GalleryType[];
}

const SortablePhoto = ({ 
  id, 
  url, 
  index, 
  galleryType, 
  onMoveToGallery,
  availableGalleries 
}: SortablePhotoProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean | null>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    console.error(`Failed to load image: ${url}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full p-2 flex items-center justify-between z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="bg-black/70 text-white px-2 py-1 rounded-md text-sm">
          #{index + 1}
        </div>
        <div 
          {...listeners} 
          className="cursor-grab active:cursor-grabbing bg-primary/80 text-white p-1 rounded-md"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </div>
      </div>

      {imageLoaded === false ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
          <ImageOff className="w-12 h-12 mb-2" />
          <p className="text-sm text-center">Image could not be loaded</p>
        </div>
      ) : (
        <img
          src={getFixedImagePath(url)}
          alt={`Photo ${index + 1}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      )}

      {/* Move to gallery buttons that appear on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
        {availableGalleries.map((gallery) => (
          <Button 
            key={gallery} 
            variant="secondary" 
            size="sm" 
            className="text-xs py-1 h-auto"
            onClick={() => onMoveToGallery(id, gallery)}
          >
            Move to {gallery === 'general' ? 'General' : gallery === 'rackWiring' ? 'Rack' : 'Shade'}
            <ArrowRight className="ml-1 w-3 h-3" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SortablePhoto;
