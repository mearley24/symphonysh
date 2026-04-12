
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photos';

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
      seoTitle="Samsung Frame TV Fireplace Mount | Vail Valley"
      seoDescription="Samsung Frame TV mounted above a fireplace — art mode display with clean, concealed installation."
      seoKeywords="Samsung Frame TV, fireplace mount, art mode, concealed installation, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Fireplace Frame", url: "/photos/mounted-tvs/fp-frame" },
      ]}
    />
  );
};

export default FPFrame;
