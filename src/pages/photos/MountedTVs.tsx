
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ArrowLeft, ImageOff } from 'lucide-react';

const MountedTVs = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const categories = [
    { title: "BC Condo Fireplace", path: "/photos/mounted-tvs/bc-condo-fp", image: "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0610.JPG" },
    { title: "Backbox Fireplace", path: "/photos/mounted-tvs/backbox-fp", image: "/lovable-uploads/mounted tvs/Backbox FP/IMG_0024.JPG" },
    { title: "Fireplace Frame", path: "/photos/mounted-tvs/fp-frame", image: "/lovable-uploads/mounted tvs/FP Frame/IMG_2189.JPG" },
    { title: "Frame & Sonos", path: "/photos/mounted-tvs/frame-sonos", image: "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0022.JPG" },
    { title: "HP Installations", path: "/photos/mounted-tvs/hp", image: "/lovable-uploads/mounted tvs/HP/IMG_0179.JPG" },
    { title: "Home Installations", path: "/photos/mounted-tvs/home", image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG" },
    { title: "Mantel Mount", path: "/photos/mounted-tvs/mantel-mount", image: "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1090.JPG" },
    { title: "Misc Installations", path: "/photos/mounted-tvs/misc", image: "/lovable-uploads/mounted tvs/Misc/IMG_0224.JPG" },
    { title: "Singletree Fireplace", path: "/photos/mounted-tvs/singletree-fp", image: "/lovable-uploads/mounted tvs/Singletree FP/IMG_1185.JPG" },
    { title: "West Vail Backbox", path: "/photos/mounted-tvs/west-vail-bb", image: "/lovable-uploads/mounted tvs/West Vail BB/IMG_1717.JPG" },
    { title: "Wood Media", path: "/photos/mounted-tvs/wood-media", image: "/lovable-uploads/mounted tvs/Wood Media/IMG_0510.JPG" },
  ];

  // Fix image path issues - Updated to properly handle spaces in URLs
  const getFixedImagePath = (path: string) => {
    try {
      // Make sure path starts with a slash
      let cleanPath = path.startsWith('/') ? path : `/${path}`;
      
      // Remove any double slashes that aren't part of protocol
      cleanPath = cleanPath.replace(/([^:])\/+/g, '$1/');
      
      // URL encode the path properly - don't encode spaces as %20, leave them as spaces
      // This is crucial for the server to correctly interpret the paths
      return cleanPath;
    } catch (error) {
      console.error(`Error fixing image path: ${path}`, error);
      return '';
    }
  };

  const handleImageLoad = (image: string) => {
    console.log(`Successfully loaded image: ${image}`);
    setLoadedImages(prev => ({ ...prev, [image]: true }));
  };

  const handleImageError = (image: string) => {
    console.error(`Failed to load image: ${image}`);
    setLoadedImages(prev => ({ ...prev, [image]: false }));
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
          <h1 className="text-4xl font-bold text-white mb-8">Mounted TVs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className="bg-secondary/50 rounded-lg overflow-hidden group hover:bg-secondary/80 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-secondary/30">
                  {loadedImages[category.image] === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageOff className="w-12 h-12 mb-2" />
                      <p className="text-sm text-center">{category.title}</p>
                    </div>
                  ) : (
                    <img 
                      src={getFixedImagePath(category.image)} 
                      alt={category.title} 
                      className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                      onLoad={() => handleImageLoad(category.image)}
                      onError={() => handleImageError(category.image)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MountedTVs;
