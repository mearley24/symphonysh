
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
  const [localPhotos, setLocalPhotos] = useState<typeof wiringPhotos | null>(null);
  
  // Check if we have locally stored photo order
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('wiringPhotos');
      if (savedPhotos) {
        setLocalPhotos(JSON.parse(savedPhotos));
      }
    } catch (error) {
      console.error("Error loading saved photo order:", error);
    }
  }, []);
  
  // Get photos based on the selected gallery (use local storage order if available)
  const photos = localPhotos ? {
    general: localPhotos.general,
    rackWiring: localPhotos.rackWiring,
    shadeWiring: localPhotos.shadeWiring
  } : {
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
            
            <Link to="/photos/wiring-manager">
              <Button variant="outline" size="sm" className="text-white">
                <Settings className="mr-2 w-4 h-4" />
                Manage Photos
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-8">Wiring</h1>
          
          {localPhotos && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md p-4 mb-6 text-white">
              <p className="text-sm">
                You're viewing a custom photo order saved in your browser. This order is only visible to you.
                <button 
                  onClick={() => {
                    localStorage.removeItem('wiringPhotos');
                    setLocalPhotos(null);
                  }}
                  className="ml-2 underline hover:text-yellow-300"
                >
                  Reset to default order
                </button>
              </p>
            </div>
          )}
          
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
