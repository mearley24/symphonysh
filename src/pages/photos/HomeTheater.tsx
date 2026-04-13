
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { homeTheaterCategories, getFixedImagePath } from '../../utils/photos';
import SEO from '../../components/SEO';
import PageBackground from '../../components/PageBackground';
import bgProjects from '../../assets/bg-projects.jpg';

const HomeTheater = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (image: string) => {
    setLoadedImages(prev => ({ ...prev, [image]: true }));
  };

  const handleImageError = (image: string) => {
    setLoadedImages(prev => ({ ...prev, [image]: false }));
  };

  return (
    <PageBackground image={bgProjects}>
      <SEO
        title="Custom Home Theater Installations in Vail Valley"
        description="Browse our portfolio of custom home theater installations. We design and install premium home cinema systems throughout Vail Valley, Colorado."
        keywords="home theater installation, custom home cinema, surround sound, projector installation, media room design, Vail Valley, Colorado"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Our Work", url: "/projects" },
          { name: "Home Theater", url: "/photos/home-theater" },
        ]}
      />
      <Header />

      <section className="pt-36 sm:pt-44 pb-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Photo Gallery</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3 text-white hero-text-shadow">
            Home Theater
          </h1>
          <p className="text-white/60 text-base leading-relaxed hero-subtext-shadow">
            Dedicated theaters, media rooms, and cinema-grade AV installations across the Vail Valley.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      <section className="py-8 sm:py-12 px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homeTheaterCategories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl overflow-hidden hover:border-accent/30 hover:bg-black/50 transition-all duration-200"
              >
                <div className="aspect-video overflow-hidden bg-black/20 relative">
                  {loadedImages[category.image] === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-4">
                      <ImageOff className="w-10 h-10 mb-2" />
                      <p className="text-sm text-center">{category.title}</p>
                    </div>
                  ) : (
                    <img
                      src={getFixedImagePath(category.image)}
                      alt={`${category.title} — home theater installation in Vail Valley`}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                      onLoad={() => handleImageLoad(category.image)}
                      onError={() => handleImageError(category.image)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-base mb-0.5">{category.title}</h3>
                  <p className="text-white/40 text-xs">
                    {category.photos.length} {category.photos.length === 1 ? 'photo' : 'photos'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default HomeTheater;
