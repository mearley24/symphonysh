
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const WireRelocation = () => {
  // The HEIC file seems to be causing issues, let's try using a different image format if available
  // or use a different image from the same category
  const photos = [
    "/lovable-uploads/wiring/Wire Relocation/IMG_2841.HEIC", // Path might need adjustment
    "/lovable-uploads/wiring/IMG_0611.JPG", // Alternative JPG format
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
