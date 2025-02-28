
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const FrameSonos = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0022.JPG",
    "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0023.JPG",
    "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0030.JPG",
  ];

  return (
    <PhotoGallery 
      title="Frame & Sonos" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default FrameSonos;
