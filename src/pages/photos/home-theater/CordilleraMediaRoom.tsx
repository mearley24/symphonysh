
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const CordilleraMediaRoom = () => {
  // Find the Cordillera Media Room category
  const category = homeTheaterCategories.find(cat => cat.title === "Cordillera Media Room");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Cordillera Media Room" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
    />
  );
};

export default CordilleraMediaRoom;
