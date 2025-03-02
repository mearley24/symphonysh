
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photoUtils';

const WestVailBB = () => {
  // Find the West Vail Backbox category in the mountedTVsCategories array
  const category = mountedTVsCategories.find(cat => cat.title === "West Vail Backbox");
  const photos = category ? category.photos : [];

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
