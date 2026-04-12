
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowLeft, Blinds } from 'lucide-react';
import { wiringPhotos } from '../../utils/photos';
import GalleryTabButton from '../../components/photos/GalleryTabButton';
import { toast } from 'sonner';
import GalleryControlButtons from '../../components/photos/GalleryControlButtons';
import EditablePhotoGallery, { GalleryType } from '../../components/photos/EditablePhotoGallery';

import PageBackground from "../../components/PageBackground";
import bgPrewire from "../../assets/bg-prewire.jpg";

const Wiring = () => {
  const [selectedGallery, setSelectedGallery] = useState<GalleryType>('general');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isLovableDevEnvironment, setIsLovableDevEnvironment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [photos, setPhotos] = useState({
    general: wiringPhotos.general,
    rackWiring: wiringPhotos.rackWiring,
    shadeWiring: wiringPhotos.shadeWiring
  });
  
  useEffect(() => {
    const hostname = window.location.hostname;
    const isDev = hostname.includes('lovable.dev') || 
                 hostname.includes('localhost') || 
                 hostname.includes('preview--');
    console.log('Current hostname:', hostname, 'isDev:', isDev);
    setIsLovableDevEnvironment(isDev);
    
    const checkUrlForButtonVisibility = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hideButtons = urlParams.get('hideButtons');
      if (hideButtons === 'true') {
        setShowButtons(false);
      } else if (hideButtons === 'false') {
        setShowButtons(true);
      }
    };
    
    checkUrlForButtonVisibility();
    
    const handleUrlChange = () => {
      checkUrlForButtonVisibility();
    };
    
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);
  
  const toggleButtonVisibility = (visible: boolean) => {
    setShowButtons(visible);
  };
  
  useEffect(() => {
    (window as any).toggleGalleryButtons = toggleButtonVisibility;
    
    return () => {
      delete (window as any).toggleGalleryButtons;
    };
  }, []);
  
  const handleImageLoad = (image: string) => {
    console.log(`Successfully loaded image: ${image}`);
    setLoadedImages(prev => ({ ...prev, [image]: true }));
  };

  const handleImageError = (image: string) => {
    console.error(`Failed to load image: ${image}`);
    setLoadedImages(prev => ({ ...prev, [image]: false }));
  };

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
    <PageBackground image={bgPrewire}>
      <SEO
        title="Structured Wiring & Rack Photos | Vail Valley"
        description="See our structured wiring, rack installations, and shade wiring work across Vail Valley homes. Clean cable management and professional low-voltage wiring."
        keywords="structured wiring, rack wiring, shade wiring, low voltage, cable management, Vail Valley"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Our Work", url: "/projects" },
          { name: "Wiring", url: "/photos/wiring" },
        ]}
      />
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
              showButtons={showButtons}
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-8">Wiring</h1>
          
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
    </PageBackground>
  );
};

export default Wiring;
