
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { mountedTVsCategories, getFixedImagePath } from '../../utils/photoUtils';

const MountedTVs = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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
            {mountedTVsCategories.map((category, index) => (
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
