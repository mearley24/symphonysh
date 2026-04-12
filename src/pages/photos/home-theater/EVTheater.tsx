
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const EVTheater = () => {
  const category = homeTheaterCategories.find(cat => cat.title === "Eagle-Vail Theater");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Eagle-Vail Theater" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
      seoTitle="Eagle-Vail Home Theater Build | Vail Valley"
      seoDescription="Photos from our dedicated home theater build in Eagle-Vail — acoustic treatment, projection, surround sound, and Control4 integration."
      seoKeywords="Eagle-Vail theater, home theater build, surround sound, projector, Control4, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Home Theater", url: "/photos/home-theater" },
        { name: "Eagle-Vail Theater", url: "/photos/home-theater/ev-theater" },
      ]}
    />
  );
};

export default EVTheater;
