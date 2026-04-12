
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const BackboxFP = () => {
  const photos = [
    "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0024.JPG",
    "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0025.JPG",
    "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0026.JPG",
    "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0027.JPG",
    "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0028.JPG",
    "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0029.JPG",
  ];

  return (
    <PhotoGallery 
      title="Backbox Fireplace" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
      seoTitle="Backbox Fireplace TV Installation | Vail Valley"
      seoDescription="Professional backbox fireplace TV mounting with clean cable management in Vail Valley."
      seoKeywords="backbox TV mount, fireplace installation, cable management, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Backbox Fireplace", url: "/photos/mounted-tvs/backbox-fp" },
      ]}
    />
  );
};

export default BackboxFP;
