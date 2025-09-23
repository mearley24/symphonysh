import React from "react";
import { ArrowLeft, Music, Speaker, Radio, Wifi, Settings, Volume2, Play, SkipForward, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { iPadLayout as IPadLayout } from "../../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../../components/ui/ipad-button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { Slider } from "../../components/ui/slider";

const InteractiveAudioZones = () => {
  const [selectedZones, setSelectedZones] = useState(['living-room']);
  const [volume, setVolume] = useState([65]);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const zones = [
    { id: 'living-room', name: 'Living Room', active: true },
    { id: 'kitchen', name: 'Kitchen', active: false },
    { id: 'bedroom', name: 'Bedroom', active: false },
    { id: 'outdoor', name: 'Outdoor', active: false },
    { id: 'office', name: 'Office', active: false },
    { id: 'basement', name: 'Basement', active: false }
  ];

  const songs = [
    { title: "Chill Vibes", artist: "Ambient Collection", duration: "3:42" },
    { title: "Morning Jazz", artist: "Jazz Essentials", duration: "4:15" },
    { title: "Rock Classics", artist: "Greatest Hits", duration: "3:58" }
  ];

  const toggleZone = (zoneId: string) => {
    setSelectedZones(prev => 
      prev.includes(zoneId) 
        ? prev.filter(id => id !== zoneId)
        : [...prev, zoneId]
    );
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  return (
    <IPadCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Multi-Zone Audio Control</h3>
      
      {/* Zone Selection */}
      <div className="mb-6">
        <h4 className="text-sm text-gray-300 mb-3">Select Audio Zones</h4>
        <div className="grid grid-cols-3 gap-2">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className={`p-3 rounded-lg text-xs transition-all duration-300 ${
                selectedZones.includes(zone.id)
                  ? 'bg-accent text-white shadow-lg' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Speaker className="w-4 h-4 mx-auto mb-1" />
              {zone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Now Playing */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm">{songs[currentSong].title}</h4>
            <p className="text-gray-300 text-xs">{songs[currentSong].artist}</p>
          </div>
          <span className="text-gray-300 text-xs">{songs[currentSong].duration}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mb-3">
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Heart className="w-4 h-4 text-gray-300" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-accent hover:bg-accent/90 transition-colors"
          >
            <Play className="w-5 h-5 text-white" />
          </button>
          <button onClick={nextSong} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <SkipForward className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-1 mb-3">
          <div 
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: isPlaying ? '45%' : '30%' }}
          />
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Volume</span>
          <span className="text-sm text-white">{volume[0]}%</span>
        </div>
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Active Zones Indicator */}
      <div className="text-center">
        <p className="text-xs text-gray-300">
          Playing in {selectedZones.length} zone{selectedZones.length !== 1 ? 's' : ''}
        </p>
      </div>
    </IPadCard>
  );
};

const ProjectShowcase = () => {
  const projects = [
    {
      title: "Mountain View Theater",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80",
      description: "7.2.4 Dolby Atmos system with custom acoustics",
      features: ["Dolby Atmos", "Custom Seating", "Acoustic Treatment"]
    },
    {
      title: "Multi-Room Audio",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80",
      description: "Whole-home audio with outdoor entertainment area",
      features: ["8 Zones", "Outdoor Audio", "Smart Controls"]
    },
    {
      title: "Modern Media Room",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80",
      description: "Integrated AV system with automated lighting",
      features: ["4K Projection", "Automated Controls", "Smart Lighting"]
    }
  ];

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index}>
              <IPadCard className="p-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold mb-1">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.features.map((feature, idx) => (
                        <span key={idx} className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </IPadCard>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

const AudioEntertainment = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: Speaker,
      title: "Multi-Room Audio",
      description: "Synchronized music throughout your home with independent zone control",
      details: "Stream different music to each room or sync them all together. Control volume, source, and playback from any device."
    },
    {
      icon: Radio,
      title: "Streaming Integration",
      description: "Access Spotify, Apple Music, Pandora, and more from one interface",
      details: "Connect all your favorite streaming services and switch between them seamlessly. Voice control compatible."
    },
    {
      icon: Settings,
      title: "Custom Audio Scenes",
      description: "Pre-configured settings for different activities and moods",
      details: "Create scenes for dinner parties, relaxation, workout sessions, or movie nights with one-touch activation."
    },
    {
      icon: Wifi,
      title: "Wireless Freedom",
      description: "Stream high-quality audio wirelessly throughout your home",
      details: "No more running cables everywhere. Enjoy CD-quality sound streaming to every room wirelessly."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IPadLayout>
      <SEO 
        title="Audio Entertainment Systems | Multi-Room Audio Solutions"
        description="Premium home audio and entertainment systems. Multi-room audio, home theaters, and streaming integration for Vail Valley homes."
        keywords="multi-room audio, home theater, audio entertainment, streaming systems, smart audio, Vail Valley"
      />
      
      <section className="pt-4 pb-8">
        <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Audio Entertainment</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Transform your home into a personal concert hall with premium audio systems that deliver exceptional sound quality in every room.
          </p>
        </div>

        {/* Interactive Demo & Project Showcase */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <InteractiveAudioZones />
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Featured Projects</h3>
            <ProjectShowcase />
          </div>
        </div>

        {/* Animated Features Section */}
        <IPadCard className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Audio Solutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-accent/20 border border-accent/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activeFeature === index ? 'bg-accent text-white' : 'bg-white/10 text-accent'
                    }`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/5 rounded-lg p-6">
              <div className="mb-4">
                <div className={`p-3 rounded-lg bg-accent/20 w-fit mb-4`}>
                  {React.createElement(features[activeFeature].icon, {
                    className: "w-8 h-8 text-accent"
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {features[activeFeature].details}
                </p>
              </div>
              
              {/* Progress indicators */}
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeFeature === index ? 'bg-accent flex-1' : 'bg-white/20 w-4'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </IPadCard>

        {/* Solution Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <IPadCard className="text-center p-6 hover:border-accent/30 transition-all duration-300">
            <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Speaker className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-semibold mb-2">Whole Home Audio</h3>
            <p className="text-gray-300 text-sm mb-4">
              Music throughout your entire home with individual room control and wireless streaming capabilities.
            </p>
            <div className="text-accent font-semibold text-sm">Starting at $2,500</div>
          </IPadCard>

          <IPadCard className="text-center p-6 hover:border-accent/30 transition-all duration-300">
            <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-semibold mb-2">Home Theater</h3>
            <p className="text-gray-300 text-sm mb-4">
              Immersive cinema experience with surround sound, 4K projection, and acoustic optimization.
            </p>
            <div className="text-accent font-semibold text-sm">Starting at $8,500</div>
          </IPadCard>

          <IPadCard className="text-center p-6 hover:border-accent/30 transition-all duration-300">
            <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-white font-semibold mb-2">Outdoor Entertainment</h3>
            <p className="text-gray-300 text-sm mb-4">
              Weather-resistant speakers and entertainment systems for patios, pools, and outdoor living spaces.
            </p>
            <div className="text-accent font-semibold text-sm">Starting at $1,800</div>
          </IPadCard>
        </div>

        {/* Call to Action */}
        <IPadCard className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Hear the Difference?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Experience how premium audio can transform your home's atmosphere. From background music to cinematic entertainment, we'll design the perfect system for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scheduling?service=audio-entertainment">
              <IPadButton size="md">
                Schedule Audio Demo
              </IPadButton>
            </Link>
            <Link to="/projects">
              <IPadButton variant="secondary" size="md">
                View Our Work
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default AudioEntertainment;