
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const Featured = () => {
  const category = homeTheaterCategories.find(cat => cat.title === "Featured Installations");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Featured Installations" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
      seoTitle="Featured Home Theater Installations | Vail Valley"
      seoDescription="Browse featured home theater and media room installations by Symphony Smart Homes across Vail Valley, Colorado."
      seoKeywords="featured home theater, media room, Vail Valley, smart home"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Home Theater", url: "/photos/home-theater" },
        { name: "Featured", url: "/photos/home-theater/featured" },
      ]}
    />
  );
};

export default Featured;
