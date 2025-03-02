
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ArrowLeft } from 'lucide-react';

const HomeTheater = () => {
  // Updated the image paths to match the correct file structure and casing
  const photos = [
    "/lovable-uploads/home%20theater/71259801449__B2A9737E-29AD-4653-AA65-F42764D18D92.JPG",
    "/lovable-uploads/home%20theater/IMG_0509.JPG",
    "/lovable-uploads/home%20theater/IMG_0512.JPG"
  ];

  return <PhotoGallery title="Home Theater" photos={photos} />;
};

export default HomeTheater;
