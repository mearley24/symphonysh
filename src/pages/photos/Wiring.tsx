
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, Blinds } from 'lucide-react';
import { wiringPhotos } from '../../utils/photos';
import GalleryTabButton from '../../components/photos/GalleryTabButton';
import PhotoGalleryGrid from '../../components/photos/PhotoGalleryGrid';

type GalleryType = 'general' | 'rackWiring' | 'shadeWiring';

const Wiring = () => {
  const [selectedGallery, setSelectedGallery] = useState<GalleryType>('general');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  // Get photos based on the selected gallery
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
          <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
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
