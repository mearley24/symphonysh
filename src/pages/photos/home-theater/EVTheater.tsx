
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const EVTheater = () => {
  // Find the Eagle-Vail Theater category
  const category = homeTheaterCategories.find(cat => cat.title === "Eagle-Vail Theater");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Eagle-Vail Theater" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
    />
  );
};

export default EVTheater;
