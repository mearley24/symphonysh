
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const HP = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/HP/IMG_0179.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0180.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0181.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0182.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0959.JPG",
    "/lovable-uploads/mounted tvs/HP/IMG_0993.JPG",
  ];

  return (
    <PhotoGallery 
      title="HP Installations" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
      seoTitle="HP TV Mounting Installations | Vail Valley"
      seoDescription="Professional TV mounting installations in HP residences across Vail Valley, Colorado."
      seoKeywords="HP TV mount, TV installation, professional mounting, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "HP Installations", url: "/photos/mounted-tvs/hp" },
      ]}
    />
  );
};

export default HP;
