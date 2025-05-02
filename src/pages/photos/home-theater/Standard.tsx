
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const Standard = () => {
  // Find the Standard Installations category
  const category = homeTheaterCategories.find(cat => cat.title === "Standard Installations");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Standard Installations" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
    />
  );
};

export default Standard;
