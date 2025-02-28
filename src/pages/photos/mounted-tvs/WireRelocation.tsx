
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const WireRelocation = () => {
  // Using JPG files instead of HEIC to increase compatibility
  const photos = [
    "/lovable-uploads/wiring/IMG_0611.JPG", // Use JPG instead of HEIC
    "/lovable-uploads/wiring/IMG_1551.JPG", // Additional JPG image from wiring folder
    "/lovable-uploads/wiring/IMG_1552.JPG",
    "/lovable-uploads/wiring/IMG_1733.JPG"
  ];

  return (
    <PhotoGallery 
      title="Wire Relocation" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default WireRelocation;
