
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const Home = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Home/71355776563__D3C0B111-3E4E-4B32-A4BB-7B60F151C39A.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0663.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0665.JPG",
    "/lovable-uploads/mounted tvs/Home/IMG_0668.JPG",
  ];

  return (
    <PhotoGallery 
      title="Home Installations" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
      seoTitle="Home TV Installations | Vail Valley"
      seoDescription="Residential TV mounting and home entertainment installations across Vail Valley — clean mounts, concealed wiring, and premium setups."
      seoKeywords="home TV installation, residential TV mount, entertainment setup, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Home Installations", url: "/photos/mounted-tvs/home" },
      ]}
    />
  );
};

export default Home;
