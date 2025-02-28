
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const MantelMount = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Mantel Mount/70311390744__4AD111C8-188E-494E-84A7-03CB45F8EB0E.JPG",
    "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1090.JPG",
    "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1091.JPG",
    "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1092.JPG",
    "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1093.JPG",
    "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1519.JPG",
  ];

  return (
    <PhotoGallery 
      title="Mantel Mount" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default MantelMount;
