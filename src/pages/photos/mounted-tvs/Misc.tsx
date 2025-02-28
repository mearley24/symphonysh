
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const Misc = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Misc/67813535017__75719363-184F-4A66-B09E-31472EF7FF49.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0224.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0225.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0226.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0227.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0228.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0229.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0247.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0248.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0287.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0337.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0875.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0876.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0877.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0977.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_0978.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1083.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1346.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1347.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1348.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1549.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1550.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1713.JPG",
    "/lovable-uploads/mounted tvs/Misc/IMG_1714.JPG",
  ];

  return (
    <PhotoGallery 
      title="Misc Installations" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default Misc;
