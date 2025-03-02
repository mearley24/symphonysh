
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photoUtils';

const FPFrame = () => {
  // Find the Fireplace Frame category in the mountedTVsCategories array
  const category = mountedTVsCategories.find(cat => cat.title === "Fireplace Frame");
  const photos = category ? category.photos : [];

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
