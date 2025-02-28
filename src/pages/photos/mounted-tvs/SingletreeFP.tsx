
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const SingletreeFP = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/Singletree FP/71933685675__F16DF3ED-FB5F-4C31-9CC8-BD0646AB5261.JPG",
    "/lovable-uploads/mounted tvs/Singletree FP/71934395331__485C1403-1DFC-4709-B065-646D9517109C.JPG",
    "/lovable-uploads/mounted tvs/Singletree FP/71934400537__62DC73D0-4A52-4166-8D67-EA8E25C0E2EB.JPG",
    "/lovable-uploads/mounted tvs/Singletree FP/IMG_1185.JPG",
  ];

  return (
    <PhotoGallery 
      title="Singletree Fireplace" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default SingletreeFP;
