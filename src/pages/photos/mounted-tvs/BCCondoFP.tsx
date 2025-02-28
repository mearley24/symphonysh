
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';

const BCCondoFP = () => {
  const photos = [
    "/lovable-uploads/mounted tvs/BC Condo FP/70551934893__F08E6641-B90D-4FE9-96CB-B6043C9EFBB7.jpg",
    "/lovable-uploads/mounted tvs/BC Condo FP/70682259838__CA09AB38-91D5-434E-9D12-D8D3BEC77650.JPG",
    "/lovable-uploads/mounted tvs/BC Condo FP/70682261617__B029C99B-C48B-4344-B91B-06B9B4921F7C.JPG",
    "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0610.JPG",
    "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0677.JPG",
    "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0678.JPG",
    "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0679.JPG",
  ];

  return (
    <PhotoGallery 
      title="BC Condo Fireplace" 
      photos={photos} 
      backLink="/photos/mounted-tvs" 
      backText="Back to Mounted TVs"
    />
  );
};

export default BCCondoFP;
