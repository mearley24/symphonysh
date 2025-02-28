
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';

const HomeTheater = () => {
  const photos = [
    "/lovable-uploads/646c1725-c4e5-4cf9-9670-0d9633402150.png",
    "/lovable-uploads/df55cc4d-3261-458d-92d3-7acaae21361e.png",
    "/lovable-uploads/82ceba00-9f66-4905-b5a8-be6979b7f744.png",
    "/lovable-uploads/home theater/IMG_0509.JPG",
    "/lovable-uploads/home theater/IMG_0512.JPG",
    "/lovable-uploads/home theater/IMG_0920.JPG",
    "/lovable-uploads/home theater/IMG_0921.JPG",
    "/lovable-uploads/home theater/IMG_0925.JPG",
    "/lovable-uploads/home theater/IMG_0926.JPG",
    "/lovable-uploads/home theater/IMG_0958.JPG",
    "/lovable-uploads/home theater/IMG_0979.JPG",
    "/lovable-uploads/home theater/IMG_0980.JPG",
    "/lovable-uploads/home theater/IMG_0981.JPG",
    "/lovable-uploads/home theater/IMG_0982.JPG",
  ];

  return <PhotoGallery title="Home Theater" photos={photos} />;
};

export default HomeTheater;
