
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photos';

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
      seoTitle="Wood Media Wall TV Installation | Vail Valley"
      seoDescription="TV mounted on a custom wood media wall — rustic mountain design with modern entertainment integration."
      seoKeywords="wood media wall, TV mount, rustic design, mountain home, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Wood Media", url: "/photos/mounted-tvs/wood-media" },
      ]}
    />
  );
};

export default WoodMedia;
