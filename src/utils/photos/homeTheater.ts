
/**
 * Home Theater Gallery Data
 * 
 * This file contains all photos related to home theater installations categorized by type.
 */

import { GalleryCategory } from './types';

// Home Theater Categories
export const homeTheaterCategories: GalleryCategory[] = [
  { 
    title: "Featured Installations", 
    path: "/photos/home-theater/featured", 
    image: "/lovable-uploads/home-theater/IMG_0509.JPG", 
    photos: [
      "/lovable-uploads/home-theater/IMG_0509.JPG",
      "/lovable-uploads/home-theater/IMG_0512.JPG",
    ]
  },
  { 
    title: "Eagle-Vail Theater", 
    path: "/photos/home-theater/ev-theater", 
    image: "/lovable-uploads/home-theater/IMG_0979.JPG", // Changed to image #6
    photos: [
      "/lovable-uploads/home-theater/IMG_0920.JPG",
      "/lovable-uploads/home-theater/IMG_0921.JPG",
      "/lovable-uploads/home-theater/IMG_0925.JPG",
      "/lovable-uploads/home-theater/IMG_0926.JPG",
      "/lovable-uploads/home-theater/IMG_0979.JPG",
      "/lovable-uploads/home-theater/IMG_0981.JPG",
      "/lovable-uploads/home-theater/IMG_0982.JPG"
    ]
  },
  {
    title: "Cordillera Media Room",
    path: "/photos/home-theater/cordillera-media-room",
    image: "/lovable-uploads/home-theater/IMG_0958.JPG", // Image #5
    photos: [
      "/lovable-uploads/home-theater/IMG_0958.JPG" // Image #5 moved to new gallery
    ]
  }
];
