
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const HP = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/HP/IMG_0179.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0180.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0181.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0182.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0959.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0993.JPG",
  ];

  return (
    <PhotoGallery 
      title="HP Installations" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default HP;
