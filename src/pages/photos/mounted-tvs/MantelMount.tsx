
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const MantelMount = () => {
  const photos = [
    "/lovable-uploads/mounted-tvs/mantel-mount/70311390744__4AD111C8-188E-494E-84A7-03CB45F8EB0E.JPG",
    "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1090.JPG",
    "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1091.JPG",
    "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1092.JPG",
    "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1093.JPG",
    "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1519.JPG",
  ];

  return (
    <PhotoGallery 
      title="Mantel Mount" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
      seoTitle="MantelMount TV Installation | Vail Valley"
      seoDescription="MantelMount pull-down TV installations — watch at eye level with a motorized mount that lowers your TV from above the fireplace."
      seoKeywords="MantelMount, pull-down TV mount, fireplace TV, motorized mount, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Mantel Mount", url: "/photos/mounted-tvs/mantel-mount" },
      ]}
    />
  );
};

export default MantelMount;
