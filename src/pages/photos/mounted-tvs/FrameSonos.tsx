
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photoUtils';

const FrameSonos = () => {
  // Find the Frame & Sonos category in the mountedTVsCategories array
  const category = mountedTVsCategories.find(cat => cat.title === "Frame & Sonos");
  const photos = category ? category.photos : [];

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
