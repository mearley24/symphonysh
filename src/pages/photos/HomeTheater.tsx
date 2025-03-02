
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ArrowLeft } from 'lucide-react';

const HomeTheater = () => {
  const photos = [
    "/lovable-uploads/home%20theater/IMG_0509.JPG",
    "/lovable-uploads/home%20theater/IMG_0512.JPG",
    "/lovable-uploads/home%20theater/IMG_0920.JPG",
    "/lovable-uploads/home%20theater/IMG_0921.JPG",
    "/lovable-uploads/home%20theater/IMG_0925.JPG",
    "/lovable-uploads/home%20theater/IMG_0926.JPG",
    "/lovable-uploads/home%20theater/IMG_0958.JPG",
    "/lovable-uploads/home%20theater/IMG_0979.JPG",
    "/lovable-uploads/home%20theater/IMG_0980.JPG",
    "/lovable-uploads/home%20theater/IMG_0981.JPG",
    "/lovable-uploads/home%20theater/IMG_0982.JPG"
  ];

  return <PhotoGallery title="Home Theater" photos={photos} />;
};

export default HomeTheater;
