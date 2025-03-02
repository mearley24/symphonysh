
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const WireRelocation = () => {
  // Use properly encoded paths with spaces properly encoded
  const photos = [
    "/lovable-uploads/wiring/IMG_0611.JPG",
    "/lovable-uploads/wiring/IMG_1551.JPG",
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
