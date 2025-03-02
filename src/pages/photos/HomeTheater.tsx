
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';
import { homeTheaterPhotos } from '../../utils/photos';
import SEO from '../../components/SEO';

const HomeTheater = () => {
  return (
    <>
      <SEO 
        title="Custom Home Theater Installations in Vail Valley"
        description="Browse our portfolio of custom home theater installations. We design and install premium home cinema systems throughout Vail Valley, Colorado."
        keywords="home theater installation, custom home cinema, surround sound, projector installation, media room design, Vail Valley, Colorado"
      />
      <PhotoGallery title="Home Theater" photos={homeTheaterPhotos} />
    </>
  );
};

export default HomeTheater;
