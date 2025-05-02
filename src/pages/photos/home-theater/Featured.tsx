
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const Featured = () => {
  // Find the Featured Installations category
  const category = homeTheaterCategories.find(cat => cat.title === "Featured Installations");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Featured Installations" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
    />
  );
};

export default Featured;
