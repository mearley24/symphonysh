
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const WestVailBB = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/West Vail BB/IMG_1717.JPG",
    "/lovable-uploads/mounted tvs/West Vail BB/IMG_1718.JPG",
  ];

  return (
    <PhotoGallery 
      title="West Vail Backbox" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default WestVailBB;
