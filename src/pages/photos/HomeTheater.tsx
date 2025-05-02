
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { homeTheaterPhotos } from '../../utils/photos';
import SEO from '../../components/SEO';
import GalleryControlButtons from '../../components/photos/GalleryControlButtons';
import { getFixedImagePath } from '../../utils/photos';

const HomeTheater = () => {
  // Split the photos into two categories
  const firstSetPhotos = homeTheaterPhotos.slice(0, 2);
  const secondSetPhotos = homeTheaterPhotos.slice(2);
  
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLovableDevEnvironment, setIsLovableDevEnvironment] = useState(false);
  const [showButtons, setShowButtons] = useState(false); // Buttons hidden by default
  
  // Check if we're in the Lovable.dev preview environment
  useEffect(() => {
    const hostname = window.location.hostname;
    // More inclusive check for Lovable.dev environments, also checking for preview URLs
    const isDev = hostname.includes('lovable.dev') || 
                 hostname.includes('localhost') || 
                 hostname.includes('preview--');
    console.log('Current hostname:', hostname, 'isDev:', isDev);
    setIsLovableDevEnvironment(isDev);
    
    // Function to toggle button visibility via URL parameter
    const checkUrlForButtonVisibility = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hideButtons = urlParams.get('hideButtons');
      if (hideButtons === 'true') {
        setShowButtons(false);
      } else if (hideButtons === 'false') {
        setShowButtons(true);
      }
    };
    
    // Check URL parameters on initial load
    checkUrlForButtonVisibility();
    
    // Listen for URL changes (for SPA navigation)
    const handleUrlChange = () => {
      checkUrlForButtonVisibility();
    };
    
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);
  
  // Function to toggle button visibility programmatically
  const toggleButtonVisibility = (visible: boolean) => {
    setShowButtons(visible);
  };
  
  // Expose the toggle function to the window object for external access
  useEffect(() => {
    (window as any).toggleHomeTheaterButtons = toggleButtonVisibility;
    
    return () => {
      delete (window as any).toggleHomeTheaterButtons;
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
    <div className="min-h-screen bg-primary">
      <SEO 
        title="Custom Home Theater Installations in Vail Valley"
        description="Browse our portfolio of custom home theater installations. We design and install premium home cinema systems throughout Vail Valley, Colorado."
        keywords="home theater installation, custom home cinema, surround sound, projector installation, media room design, Vail Valley, Colorado"
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
          
          <h1 className="text-4xl font-bold text-white mb-8">Home Theater</h1>
          
          {/* First Gallery - Photos #1-2 */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6">Featured Installations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {firstSetPhotos.map((photo, index) => (
                <div 
                  key={`first-${index}`} 
                  className="aspect-video rounded-lg overflow-hidden cursor-pointer group bg-secondary/20 relative"
                >
                  {loadedImages[photo] === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageOff className="w-12 h-12 mb-2" />
                      <p className="text-sm text-center">Image could not be loaded</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm z-10">
                        #{index + 1}
                      </div>
                      <img 
                        src={getFixedImagePath(photo)} 
                        alt={`Home Theater ${index + 1}`} 
                        className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                        onLoad={() => handleImageLoad(photo)}
                        onError={() => handleImageError(photo)}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Second Gallery - Photos #3-11 */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">More Home Theater Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondSetPhotos.map((photo, index) => (
                <div 
                  key={`second-${index}`} 
                  className="aspect-video rounded-lg overflow-hidden cursor-pointer group bg-secondary/20 relative"
                >
                  {loadedImages[photo] === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageOff className="w-12 h-12 mb-2" />
                      <p className="text-sm text-center">Image could not be loaded</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm z-10">
                        #{index + 3}
                      </div>
                      <img 
                        src={getFixedImagePath(photo)} 
                        alt={`Home Theater ${index + 3}`} 
                        className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                        onLoad={() => handleImageLoad(photo)}
                        onError={() => handleImageError(photo)}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeTheater;
