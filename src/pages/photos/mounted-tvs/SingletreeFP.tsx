
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const SingletreeFP = () => {
  const photos = [
    "/lovable-uploads/mounted-tvs/singletree-fp/71933685675__F16DF3ED-FB5F-4C31-9CC8-BD0646AB5261.JPG",
    "/lovable-uploads/mounted-tvs/singletree-fp/71934395331__485C1403-1DFC-4709-B065-646D9517109C.JPG",
    "/lovable-uploads/mounted-tvs/singletree-fp/71934400537__62DC73D0-4A52-4166-8D67-EA8E25C0E2EB.JPG",
    "/lovable-uploads/mounted-tvs/singletree-fp/IMG_1185.JPG",
  ];

  return (
    <PhotoGallery 
      title="Singletree Fireplace" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
      seoTitle="Singletree Fireplace TV Mount | Vail Valley"
      seoDescription="Fireplace TV installation in Singletree — clean stone-surround mount with concealed wiring."
      seoKeywords="Singletree TV mount, fireplace installation, stone surround, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Mounted TVs", url: "/photos/mounted-tvs" },
        { name: "Singletree Fireplace", url: "/photos/mounted-tvs/singletree-fp" },
      ]}
    />
  );
};

export default SingletreeFP;
