
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ImageOff } from 'lucide-react';

interface SortablePhotoItemProps {
  photo: string;
  index: number;
  isEditMode: boolean;
  loadedImages: Record<string, boolean>;
  handleImageLoad: (photo: string) => void;
  handleImageError: (photo: string) => void;
}

const SortablePhotoItem = ({ 
  photo, 
  index, 
  isEditMode,
  loadedImages,
  handleImageLoad,
  handleImageError
}: SortablePhotoItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  
  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition relative group"
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
          {isEditMode && (
            <div 
              {...attributes} 
              {...listeners}
              className="absolute top-2 right-2 bg-primary/70 text-white p-1 rounded-md cursor-grab active:cursor-grabbing z-10"
            >
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          <img 
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onLoad={() => handleImageLoad(photo)}
            onError={() => handleImageError(photo)}
            onClick={() => !isEditMode && window.open(photo, '_blank')}
          />
        </>
      )}
    </div>
  );
};

export default SortablePhotoItem;
