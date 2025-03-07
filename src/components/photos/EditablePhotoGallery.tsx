
import React from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import SortablePhotoItem from './SortablePhotoItem';
import PhotoGalleryGrid from './PhotoGalleryGrid';

export type GalleryType = 'general' | 'rackWiring' | 'shadeWiring';

interface EditablePhotoGalleryProps {
  selectedGallery: GalleryType;
  photos: {
    general: string[];
    rackWiring: string[];
    shadeWiring: string[];
  };
  setPhotos: React.Dispatch<React.SetStateAction<{
    general: string[];
    rackWiring: string[];
    shadeWiring: string[];
  }>>;
  isEditMode: boolean;
  loadedImages: Record<string, boolean>;
  onImageLoad: (image: string) => void;
  onImageError: (image: string) => void;
}

const EditablePhotoGallery = ({
  selectedGallery,
  photos,
  setPhotos,
  isEditMode,
  loadedImages,
  onImageLoad,
  onImageError
}: EditablePhotoGalleryProps) => {
  // DND sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end to reorder photos
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setPhotos(currentPhotos => {
        const currentGalleryPhotos = [...currentPhotos[selectedGallery]];
        const oldIndex = currentGalleryPhotos.findIndex(photo => photo === active.id);
        const newIndex = currentGalleryPhotos.findIndex(photo => photo === over.id);
        
        return {
          ...currentPhotos,
          [selectedGallery]: arrayMove(currentGalleryPhotos, oldIndex, newIndex),
        };
      });
    }
  };

  if (isEditMode) {
    return (
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={photos[selectedGallery]}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos[selectedGallery].map((photo, index) => (
              <SortablePhotoItem 
                key={photo} 
                photo={photo} 
                index={index} 
                isEditMode={isEditMode} 
                loadedImages={loadedImages}
                handleImageLoad={onImageLoad}
                handleImageError={onImageError}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <PhotoGalleryGrid 
      photos={photos[selectedGallery]}
      galleryName={selectedGallery === 'general' ? 'General Wiring' : 
                  selectedGallery === 'rackWiring' ? 'Rack Wiring' : 'Shade Wiring'}
      loadedImages={loadedImages}
      onImageLoad={onImageLoad}
      onImageError={onImageError}
    />
  );
};

export default EditablePhotoGallery;
