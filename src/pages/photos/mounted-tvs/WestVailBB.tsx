
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { mountedTVsCategories } from '../../../utils/photos';

const WestVailBB = () => {
  const category = mountedTVsCategories.find(cat => cat.title === "West Vail Backbox");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="West Vail Backbox" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
      seoTitle="West Vail Backbox TV Install | Vail Valley"
      seoDescription="Backbox TV mounting installation in West Vail — clean behind-wall wiring with a professional finish."
      seoKeywords="West Vail backbox, TV mounting, behind-wall wiring, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "West Vail Backbox", url: "/photos/mounted-tvs/west-vail-bb" },
      ]}
    />
  );
};

export default WestVailBB;
