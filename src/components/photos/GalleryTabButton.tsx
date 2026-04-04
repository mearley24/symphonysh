
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getFixedImagePath } from '../../utils/photos/types';

interface GalleryTabButtonProps {
  isActive: boolean;
  onClick: () => void;
  previewImage: string;
  title: string;
  icon?: LucideIcon;
}

const GalleryTabButton: React.FC<GalleryTabButtonProps> = ({
  isActive,
  onClick,
  previewImage,
  title,
  icon: Icon
}) => {
  const [imageLoaded, setImageLoaded] = React.useState<boolean | null>(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    console.error(`Failed to load preview image: ${previewImage}`);
  };

  return (
    <button 
      className={`px-4 py-2 mr-4 font-medium ${isActive ? 'text-primary-foreground border-b-2 border-primary-foreground' : 'text-gray-400 hover:text-white'}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded overflow-hidden mr-2 bg-secondary/30">
          {previewImage ? (
            <img 
              src={getFixedImagePath(previewImage)} 
              alt={`${title} Preview`} 
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : Icon ? (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          ) : null}
        </div>
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {title}
      </div>
    </button>
  );
};

export default GalleryTabButton;
