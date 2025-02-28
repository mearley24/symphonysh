
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const WoodMedia = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Wood Media/IMG_0340.JPG",
    "/lovable-uploads/mounted tvs/Wood Media/IMG_0510.JPG",
    "/lovable-uploads/mounted tvs/Wood Media/IMG_0511.JPG",
  ];

  return (
    <PhotoGallery 
      title="Wood Media" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default WoodMedia;
