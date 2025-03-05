import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getFixedImagePath } from '../../utils/photos/types';
import { ImageOff, Save, ArrowLeft, ArrowRight, Code } from 'lucide-react';
import { wiringPhotos } from '../../utils/photos/wiring';
import { cn } from '../../lib/utils';
import { toast } from "../../hooks/use-toast";

// Define the types for the gallery photos
type GalleryType = 'general' | 'rackWiring' | 'shadeWiring';
type PhotosState = Record<GalleryType, string[]>;

interface SortablePhotoProps {
  id: string;
  url: string;
  index: number;
  galleryType: GalleryType;
  onMoveToGallery: (photoId: string, targetGallery: GalleryType) => void;
}

// Individual sortable photo component
const SortablePhoto = ({ id, url, index, galleryType, onMoveToGallery }: SortablePhotoProps) => {
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

  // Calculate which galleries this photo can be moved to
  const availableGalleries = Object.keys(wiringPhotos).filter(
    (gallery) => gallery !== galleryType
  ) as GalleryType[];

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

  // Set up drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  // Generate code for updating wiring.ts
  const generateWiringTsCode = () => {
    return `
// Wiring Gallery
export const wiringPhotos = {
  general: [
${photos.general.map(photo => `    "${photo}",`).join('\n')}
  ],
  rackWiring: [
${photos.rackWiring.map(photo => `    "${photo}",`).join('\n')}
  ],
  shadeWiring: [
${photos.shadeWiring.map(photo => `    "${photo}",`).join('\n')}
  ]
};`;
  };

  // Save changes - now only generates code, doesn't use localStorage
  const saveChanges = () => {
    setShowCode(true);
    toast({
      title: "Code generated!",
      description: "Copy the code below to update wiring.ts directly.",
    });
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      <div className="container py-8 max-w-6xl">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">Photo Manager</h1>
          <Button 
            variant="default" 
            onClick={saveChanges}
            disabled={!hasChanges}
            className={cn(!hasChanges && "opacity-50")}
          >
            <Code className="mr-2 w-4 h-4" />
            Generate Code
          </Button>
        </div>
        
        {showCode && (
          <div className="mb-8 p-4 bg-gray-900 rounded-lg overflow-auto">
            <h2 className="text-lg font-medium mb-2">Copy this code to update wiring.ts:</h2>
            <pre className="text-sm text-gray-300 overflow-x-auto p-4 bg-black rounded">
              {generateWiringTsCode()}
            </pre>
            <p className="mt-4 text-sm text-gray-400">Replace the entire content of the wiring.ts file with this code.</p>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as GalleryType)}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">General Wiring ({photos.general.length})</TabsTrigger>
            <TabsTrigger value="rackWiring">Rack Wiring ({photos.rackWiring.length})</TabsTrigger>
            <TabsTrigger value="shadeWiring">Shade Wiring ({photos.shadeWiring.length})</TabsTrigger>
          </TabsList>
          
          {(['general', 'rackWiring', 'shadeWiring'] as GalleryType[]).map(galleryType => (
            <TabsContent key={galleryType} value={galleryType}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={photos[galleryType]} 
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos[galleryType].map((photo, index) => (
                      <SortablePhoto 
                        key={photo}
                        id={photo} 
                        url={photo}
                        index={index}
                        galleryType={galleryType}
                        onMoveToGallery={handleMoveToGallery}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-8 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Instructions:</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Drag and drop photos to reorder them within a gallery.</li>
            <li>Use the buttons that appear when hovering a photo to move it to another gallery.</li>
            <li>Click "Generate Code" when you're done to generate the code to update wiring.ts.</li>
            <li>Copy the generated code and replace the contents of wiring.ts with it.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;
