
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import SortablePhoto, { GalleryType } from './SortablePhoto';
import { TabsContent } from "../ui/tabs";

interface GalleryDisplayProps {
  photos: Record<GalleryType, string[]>;
  activeTab: GalleryType;
  onDragEnd: (event: DragEndEvent) => void;
  onMoveToGallery: (photoId: string, targetGallery: GalleryType) => void;
}

const GalleryDisplay = ({ photos, activeTab, onDragEnd, onMoveToGallery }: GalleryDisplayProps) => {
  // Set up drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      {(['general', 'rackWiring', 'shadeWiring'] as GalleryType[]).map(galleryType => (
        <TabsContent key={galleryType} value={galleryType}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext 
              items={photos[galleryType]} 
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos[galleryType].map((photo, index) => {
                  // Calculate which galleries this photo can be moved to
                  const availableGalleries = Object.keys(photos).filter(
                    (gallery) => gallery !== galleryType
                  ) as GalleryType[];
                  
                  return (
                    <SortablePhoto 
                      key={photo}
                      id={photo} 
                      url={photo}
                      index={index}
                      galleryType={galleryType}
                      onMoveToGallery={onMoveToGallery}
                      availableGalleries={availableGalleries}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </TabsContent>
      ))}
    </>
  );
};

export default GalleryDisplay;
