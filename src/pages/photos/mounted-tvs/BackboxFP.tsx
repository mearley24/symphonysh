
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const BackboxFP = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Backbox FP/IMG_0024.JPG",
    "/lovable-uploads/mounted tvs/Backbox FP/IMG_0025.JPG",
    "/lovable-uploads/mounted tvs/Backbox FP/IMG_0026.JPG",
    "/lovable-uploads/mounted tvs/Backbox FP/IMG_0027.JPG",
    "/lovable-uploads/mounted tvs/Backbox FP/IMG_0028.JPG",
    "/lovable-uploads/mounted tvs/Backbox FP/IMG_0029.JPG",
  ];

  return (
    <PhotoGallery 
      title="Backbox Fireplace" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default BackboxFP;
