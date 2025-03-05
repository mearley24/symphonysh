
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, Blinds, Settings } from 'lucide-react';
import { wiringPhotos } from '../../utils/photos';
import GalleryTabButton from '../../components/photos/GalleryTabButton';
import PhotoGalleryGrid from '../../components/photos/PhotoGalleryGrid';
import { Button } from '../../components/ui/button';

type GalleryType = 'general' | 'rackWiring' | 'shadeWiring';

const Wiring = () => {
  const [selectedGallery, setSelectedGallery] = useState<GalleryType>('general');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isLovableDevEnvironment, setIsLovableDevEnvironment] = useState(false);
  
  // Check if we're in the Lovable.dev preview environment
  useEffect(() => {
    const hostname = window.location.hostname;
    const isDev = hostname.includes('lovable.dev') || hostname.includes('localhost');
    console.log('Current hostname:', hostname, 'isDev:', isDev);
    setIsLovableDevEnvironment(isDev);
  }, []);
  
  // Use the photos directly from the imported module
  const photos = {
    general: wiringPhotos.general,
    rackWiring: wiringPhotos.rackWiring,
    shadeWiring: wiringPhotos.shadeWiring
  };

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
            
            {isLovableDevEnvironment && (
              <Link to="/photos/wiring-manager">
                <Button variant="outline" size="sm" className="text-white">
                  <Settings className="mr-2 w-4 h-4" />
                  Manage Photos
                </Button>
              </Link>
            )}
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
          <PhotoGalleryGrid 
            photos={photos[selectedGallery]}
            galleryName={selectedGallery === 'general' ? 'General Wiring' : 
                        selectedGallery === 'rackWiring' ? 'Rack Wiring' : 'Shade Wiring'}
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
