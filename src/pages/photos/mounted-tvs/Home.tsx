
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const Home = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Home/71355776563__D3C0B111-3E4E-4B32-A4BB-7B60F151C39A.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0660.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0661.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0662.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0663.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0664.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0665.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0666.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0668.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0669.JPG",
  ];

  return (
    <PhotoGallery 
      title="Home Installations" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default Home;
