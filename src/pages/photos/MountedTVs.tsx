import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SEO from '../../components/SEO';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { mountedTVsCategories, getFixedImagePath } from '../../utils/photoUtils';
import GalleryControlButtons from '../../components/photos/GalleryControlButtons';

import PageBackground from "../../components/PageBackground";
import bgProjects from "../../assets/bg-projects.jpg";

const MountedTVs = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLovableDevEnvironment, setIsLovableDevEnvironment] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
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
    (window as any).toggleMountedTVButtons = toggleButtonVisibility;
    
    return () => {
      delete (window as any).toggleMountedTVButtons;
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
  
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      console.log("Photo order would be saved here");
    }
  };

  return (
    <PageBackground image={bgProjects}>
      <SEO
        title="Mounted TV Installations | Vail Valley Photo Gallery"
        description="Browse our portfolio of professional TV mounting installations across Vail Valley — fireplace mounts, backbox installs, and concealed wiring solutions."
        keywords="TV mounting, mounted TV, fireplace TV, backbox install, concealed wiring, Vail Valley"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Our Work", url: "/projects" },
          { name: "Mounted TVs", url: "/photos/mounted-tvs" },
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
          
          <h1 className="text-4xl font-bold text-white mb-8">Mounted TVs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mountedTVsCategories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className="bg-secondary/50 rounded-lg overflow-hidden group hover:bg-black/40 backdrop-blur-sm transition-all duration-300 relative"
              >
                <div className="aspect-video overflow-hidden bg-black/20 backdrop-blur-sm relative">
                  {loadedImages[category.image] === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageOff className="w-12 h-12 mb-2" />
                      <p className="text-sm text-center">{category.title}</p>
                    </div>
                  ) : (
                    <img 
                      src={getFixedImagePath(category.image)} 
                      alt={category.title} 
                      className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-110"
                      loading="lazy"
                      onLoad={() => handleImageLoad(category.image)}
                      onError={() => handleImageError(category.image)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                  <p className="text-xs text-gray-300">{category.photos.length} photos</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageBackground>
  );
};

export default MountedTVs;
