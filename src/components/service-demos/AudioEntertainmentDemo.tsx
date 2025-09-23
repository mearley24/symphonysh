import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Tv, Headphones } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

export const AudioEntertainmentDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState([65]);
  const [selectedZone, setSelectedZone] = useState('living-room');
  const [progress, setProgress] = useState([23]);
  const [audioSource, setAudioSource] = useState('spotify');

  const tracks = [
    { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
    { title: 'Sweet Child O Mine', artist: 'Guns N Roses', duration: '5:03' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' }
  ];

  const zones = {
    'living-room': { name: 'Living Room', speakers: 4, volume: 65 },
    'kitchen': { name: 'Kitchen', speakers: 2, volume: 45 },
    'bedroom': { name: 'Master Bedroom', speakers: 2, volume: 30 },
    'patio': { name: 'Outdoor Patio', speakers: 6, volume: 80 },
    'theater': { name: 'Home Theater', speakers: 9, volume: 75 }
  };

  const audioSources = {
    spotify: { name: 'Spotify', icon: Music, color: 'bg-green-500' },
    apple: { name: 'Apple Music', icon: Music, color: 'bg-gray-600' },
    tv: { name: 'Apple TV', icon: Tv, color: 'bg-black' },
    vinyl: { name: 'Turntable', icon: Headphones, color: 'bg-amber-600' }
  };

  // Auto progress for demo
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev[0] + 1;
          if (newProgress >= 100) {
            setCurrentTrack((prev) => (prev + 1) % tracks.length);
            return [0];
          }
          return [newProgress];
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const currentZone = zones[selectedZone as keyof typeof zones];
  const currentSource = audioSources[audioSource as keyof typeof audioSources];

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Multi-Room Audio System</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs">Playing</span>
        </div>
      </div>

      {/* Now Playing */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">{tracks[currentTrack].title}</h4>
              <p className="text-gray-300 text-sm">{tracks[currentTrack].artist}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`px-2 py-1 rounded-full text-xs text-white ${currentSource.color}`}>
                  <currentSource.icon className="w-3 h-3 inline mr-1" />
                  {currentSource.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{Math.floor((progress[0] / 100) * 355)}s</span>
            <span>{tracks[currentTrack].duration}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <VolumeX className="w-4 h-4 text-gray-400" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <Volume2 className="w-4 h-4 text-gray-400" />
          <span className="text-white text-sm w-8">{volume[0]}</span>
        </div>
      </div>

      {/* Audio Sources */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Audio Sources</h4>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(audioSources).map(([key, source]) => (
            <button
              key={key}
              onClick={() => setAudioSource(key)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                audioSource === key 
                  ? `${source.color} text-white` 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <source.icon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">{source.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Zone Selection */}
      <div className="mb-4">
        <h4 className="text-white font-medium mb-3">Audio Zones</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(zones).map(([key, zone]) => (
            <button
              key={key}
              onClick={() => setSelectedZone(key)}
              className={`p-3 rounded-lg text-left transition-all duration-300 ${
                selectedZone === key 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="text-sm font-medium">{zone.name}</div>
              <div className="text-xs opacity-75">{zone.speakers} speakers • {zone.volume}%</div>
            </button>
          ))}
        </div>

        {/* Zone Control */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-white font-medium">{currentZone.name}</h5>
            <span className="text-gray-300 text-sm">{currentZone.speakers} speakers</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <VolumeX className="w-4 h-4 text-gray-400" />
            <Slider
              value={[currentZone.volume]}
              onValueChange={() => {}}
              max={100}
              step={1}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm w-8">{currentZone.volume}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm">
          Party Mode
        </Button>
        <Button variant="secondary" size="sm">
          All Zones
        </Button>
        <Button variant="secondary" size="sm">
          Sleep Timer
        </Button>
      </div>
    </IPadCard>
  );
};