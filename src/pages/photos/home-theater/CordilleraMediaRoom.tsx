
import React from 'react';
import PhotoGallery from '../../../components/PhotoGallery';
import { homeTheaterCategories } from '../../../utils/photos';

const CordilleraMediaRoom = () => {
  const category = homeTheaterCategories.find(cat => cat.title === "Cordillera Media Room");
  const photos = category ? category.photos : [];

  return (
    <PhotoGallery 
      title="Cordillera Media Room" 
      photos={photos} 
      backLink="/photos/home-theater" 
      backText="Back to Home Theater"
      seoTitle="Cordillera Media Room Installation | Vail Valley"
      seoDescription="Media room integration in a Cordillera mountain residence — architectural speakers, clean sight lines, and smart home automation."
      seoKeywords="Cordillera media room, architectural speakers, smart home, Vail Valley"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Our Work", url: "/projects" },
        { name: "Home Theater", url: "/photos/home-theater" },
        { name: "Cordillera Media Room", url: "/photos/home-theater/cordillera-media-room" },
      ]}
    />
  );
};

export default CordilleraMediaRoom;
