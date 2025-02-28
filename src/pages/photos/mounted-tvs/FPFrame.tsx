
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const FPFrame = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/FP Frame/IMG_2189.JPG",
    "/lovable-uploads/mounted tvs/FP Frame/IMG_2190.JPG",
    "/lovable-uploads/mounted tvs/FP Frame/IMG_2191.JPG",
  ];

  return (
    <PhotoGallery 
      title="Fireplace Frame" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default FPFrame;
