
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, Blinds, Settings, GripVertical, Save } from 'lucide-react';
import { wiringPhotos } from '../../utils/photos';
import GalleryTabButton from '../../components/photos/GalleryTabButton';
import PhotoGalleryGrid from '../../components/photos/PhotoGalleryGrid';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
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
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type GalleryType = 'general' | 'rackWiring' | 'shadeWiring';

const Wiring = () => {
  const [selectedGallery, setSelectedGallery] = useState<GalleryType>('general');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isLovableDevEnvironment, setIsLovableDevEnvironment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [photos, setPhotos] = useState({
    general: wiringPhotos.general,
    rackWiring: wiringPhotos.rackWiring,
    shadeWiring: wiringPhotos.shadeWiring
  });
  
  // Check if we're in the Lovable.dev preview environment
  useEffect(() => {
    const hostname = window.location.hostname;
    const isDev = hostname.includes('lovable.dev') || hostname.includes('localhost');
    console.log('Current hostname:', hostname, 'isDev:', isDev);
    setIsLovableDevEnvironment(isDev);
  }, []);
  
  // DND sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleImageLoad = (image: string) => {
    console.log(`Successfully loaded image: ${image}`);
    setLoadedImages(prev => ({ ...prev, [image]: true }));
  };

  const handleImageError = (image: string) => {
    console.error(`Failed to load image: ${image}`);
    setLoadedImages(prev => ({ ...prev, [image]: false }));
  };

  // Preview images for each gallery
  const previewImages = {
    general: photos.general[0],
    rackWiring: photos.rackWiring[0],
    shadeWiring: photos.shadeWiring[0]
  };

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

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      toast.success("Photo order saved!");
    }
  };

  const SortablePhotoItem = ({ photo, index }: { photo: string; index: number }) => {
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
            <div className="w-12 h-12 mb-2">Image could not be loaded</div>
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
              onLoad={() => handleImageLoad(photo)}
              onError={() => handleImageError(photo)}
              onClick={() => !isEditMode && window.open(photo, '_blank')}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            
            <div className="flex gap-2">
              {isLovableDevEnvironment && (
                <>
                  <Button 
                    variant={isEditMode ? "default" : "outline"} 
                    size="sm" 
                    className="text-white" 
                    onClick={toggleEditMode}
                  >
                    {isEditMode ? (
                      <>
                        <Save className="mr-2 w-4 h-4" />
                        Save Order
                      </>
                    ) : (
                      <>
                        <GripVertical className="mr-2 w-4 h-4" />
                        Reorder Photos
                      </>
                    )}
                  </Button>
                  
                  <Link to="/photos/wiring-manager">
                    <Button variant="outline" size="sm" className="text-white">
                      <Settings className="mr-2 w-4 h-4" />
                      Manage Photos
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-8">Wiring</h1>
          
          {/* Gallery selection tabs */}
          <div className="flex mb-8 border-b border-gray-700 overflow-x-auto">
            <GalleryTabButton 
              isActive={selectedGallery === 'general'}
              onClick={() => setSelectedGallery('general')}
              previewImage={previewImages.general}
              title="General Wiring"
            />
            
            <GalleryTabButton 
              isActive={selectedGallery === 'rackWiring'}
              onClick={() => setSelectedGallery('rackWiring')}
              previewImage={previewImages.rackWiring}
              title="Rack Wiring"
            />
            
            <GalleryTabButton 
              isActive={selectedGallery === 'shadeWiring'}
              onClick={() => setSelectedGallery('shadeWiring')}
              previewImage={previewImages.shadeWiring}
              title="Shade Wiring"
              icon={Blinds}
            />
          </div>
          
          {/* Render the selected gallery */}
          {isEditMode ? (
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
                    <SortablePhotoItem key={photo} photo={photo} index={index} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <PhotoGalleryGrid 
              photos={photos[selectedGallery]}
              galleryName={selectedGallery === 'general' ? 'General Wiring' : 
                          selectedGallery === 'rackWiring' ? 'Rack Wiring' : 'Shade Wiring'}
              loadedImages={loadedImages}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Wiring;
