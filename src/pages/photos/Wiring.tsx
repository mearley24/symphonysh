
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, Blinds } from 'lucide-react';
import { wiringPhotos } from '../../utils/photos';
import GalleryTabButton from '../../components/photos/GalleryTabButton';
import { toast } from 'sonner';
import GalleryControlButtons from '../../components/photos/GalleryControlButtons';
import EditablePhotoGallery, { GalleryType } from '../../components/photos/EditablePhotoGallery';

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

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      toast.success("Photo order saved!");
    }
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
            
            <GalleryControlButtons 
              isEditMode={isEditMode} 
              toggleEditMode={toggleEditMode} 
              isLovableDevEnvironment={isLovableDevEnvironment} 
            />
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
          <EditablePhotoGallery
            selectedGallery={selectedGallery}
            photos={photos}
            setPhotos={setPhotos}
            isEditMode={isEditMode}
            loadedImages={loadedImages}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
          />
        </div>
      </section>
    </div>
  );
};

export default Wiring;
