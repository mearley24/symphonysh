
import React, { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { wiringPhotos } from '../../utils/photos/wiring';
import { GalleryType } from './SortablePhoto';
import GalleryTabs from './GalleryTabs';
import GalleryDisplay from './GalleryDisplay';
import CodeGenerator from './CodeGenerator';
import CodeDisplay from './CodeDisplay';
import InstructionsPanel from './InstructionsPanel';

// Define the types for the gallery photos
type PhotosState = Record<GalleryType, string[]>;

const PhotoManager = () => {
  // Initialize state with photos from wiring.ts
  const [photos, setPhotos] = useState<PhotosState>({
    general: [...wiringPhotos.general],
    rackWiring: [...wiringPhotos.rackWiring],
    shadeWiring: [...wiringPhotos.shadeWiring]
  });
  
  const [activeTab, setActiveTab] = useState<GalleryType>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setPhotos(currentPhotos => {
        const oldIndex = currentPhotos[activeTab].indexOf(active.id as string);
        const newIndex = currentPhotos[activeTab].indexOf(over.id as string);
        
        return {
          ...currentPhotos,
          [activeTab]: arrayMove(currentPhotos[activeTab], oldIndex, newIndex),
        };
      });
      setHasChanges(true);
    }
  };

  // Move photo to another gallery
  const handleMoveToGallery = (photoId: string, targetGallery: GalleryType) => {
    setPhotos(currentPhotos => {
      const sourceGallery = activeTab;
      const sourcePhotos = [...currentPhotos[sourceGallery]];
      const targetPhotos = [...currentPhotos[targetGallery]];
      
      const photoIndex = sourcePhotos.indexOf(photoId);
      if (photoIndex > -1) {
        sourcePhotos.splice(photoIndex, 1);
        targetPhotos.push(photoId);
        
        return {
          ...currentPhotos,
          [sourceGallery]: sourcePhotos,
          [targetGallery]: targetPhotos
        };
      }
      
      return currentPhotos;
    });
    setHasChanges(true);
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      <div className="container py-8 max-w-6xl">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">Photo Manager</h1>
          <CodeGenerator 
            photos={photos} 
            hasChanges={hasChanges} 
            onShowCode={() => setShowCode(true)} 
          />
        </div>
        
        <CodeDisplay photos={photos} showCode={showCode} />
        
        <GalleryTabs 
          photos={photos} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        >
          <GalleryDisplay
            photos={photos}
            activeTab={activeTab}
            onDragEnd={handleDragEnd}
            onMoveToGallery={handleMoveToGallery}
          />
        </GalleryTabs>
        
        <InstructionsPanel />
      </div>
    </div>
  );
};

export default PhotoManager;
