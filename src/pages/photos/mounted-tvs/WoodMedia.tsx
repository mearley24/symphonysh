
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photoUtils';

const WoodMedia = () => {
  // Find the Wood Media category in the mountedTVsCategories array
  const category = mountedTVsCategories.find(cat => cat.title === "Wood Media");
  const photos = category ? category.photos : [];

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
