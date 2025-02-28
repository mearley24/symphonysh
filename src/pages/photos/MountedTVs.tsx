
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ArrowLeft } from 'lucide-react';

const MountedTVs = () => {
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

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
    { title: "Wire Relocation", path: "/photos/mounted-tvs/wire-relocation", image: "/lovable-uploads/wiring/IMG_0611.JPG" }, // Changed to a JPG in the wiring folder
    { title: "Wood Media", path: "/photos/mounted-tvs/wood-media", image: "/lovable-uploads/mounted tvs/Wood Media/IMG_0510.JPG" },
  ];

  // Fix image path - ensure it doesn't have double slashes and is properly encoded
  const getFixedImagePath = (path: string) => {
    // Remove any double slashes that aren't part of protocol
    const cleanPath = path.replace(/([^:])\/+/g, '$1/');
    // Encode the path properly for URLs
    return encodeURI(cleanPath);
  };

  const handleImageError = (image: string) => {
    console.error(`Failed to load image: ${image}`);
    setLoadErrors(prev => ({ ...prev, [image]: true }));
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
                  <img 
                    src={getFixedImagePath(category.image)} 
                    alt={category.title} 
                    className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                    onError={() => handleImageError(category.image)}
                    style={{ display: loadErrors[category.image] ? 'none' : 'block' }}
                  />
                  {loadErrors[category.image] && (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <span>{category.title}</span>
                    </div>
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
