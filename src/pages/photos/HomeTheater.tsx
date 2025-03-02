
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';
import { homeTheaterPhotos, getFixedImagePath } from '../../utils/photoUtils';

const HomeTheater = () => {
  return <PhotoGallery title="Home Theater" photos={homeTheaterPhotos} />;
};

export default HomeTheater;
