
import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MountedTVs = () => {
  const photos = [
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-4xl font-bold text-white mb-8">Mounted TVs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-video rounded-lg overflow-hidden group cursor-pointer"
              >
                <img 
                  src={photo} 
                  alt={`Mounted TV Installation ${index + 1}`} 
                  className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MountedTVs;
