
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const WireRelocation = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Wire Relocation/IMG_2841.HEIC", // Using the one that worked in MountedTVs 
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
