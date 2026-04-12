
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photos';

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
      seoTitle="Samsung Frame TV & Sonos Installation | Vail Valley"
      seoDescription="Samsung Frame TV paired with Sonos soundbar — premium audio-visual installation in Vail Valley."
      seoKeywords="Samsung Frame TV, Sonos, soundbar, TV installation, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Frame & Sonos", url: "/photos/mounted-tvs/frame-sonos" },
      ]}
    />
  );
};

export default FrameSonos;
