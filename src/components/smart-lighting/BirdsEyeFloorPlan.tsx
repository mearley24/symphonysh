import { useState } from 'react';
import { Upload, Mic, MicOff } from 'lucide-react';
import { Button } from '../ui/button';
import { iPadCard as IPadCard } from '../ui/ipad-card';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lightColor: string;
  brightness: number;
  fixtures: LightFixture[];
}

interface LightFixture {
  id: string;
  type: 'recessed' | 'pendant' | 'sconce' | 'keypad';
  x: number;
  y: number;
  isOn: boolean;
  brightness: number;
  color: string;
}

interface BirdsEyeFloorPlanProps {
  selectedRoom: string;
  brightness: number;
  lightColor: string;
  onRoomSelect: (roomId: string) => void;
  onFixtureSelect: (fixture: LightFixture) => void;
}

export const BirdsEyeFloorPlan = ({
  selectedRoom,
  brightness,
  lightColor,
  onRoomSelect,
  onFixtureSelect
}: BirdsEyeFloorPlanProps) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [hoveredFixture, setHoveredFixture] = useState<string | null>(null);
  const [uploadedBlueprint, setUploadedBlueprint] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const defaultRooms: Room[] = [
    {
      id: 'living-room',
      name: 'Living Room',
      x: 50,
      y: 200,
      width: 200,
      height: 150,
      lightColor,
      brightness,
      fixtures: [
        { id: 'lr1', type: 'recessed', x: 100, y: 250, isOn: true, brightness, color: lightColor },
        { id: 'lr2', type: 'recessed', x: 200, y: 250, isOn: true, brightness, color: lightColor },
        { id: 'lr3', type: 'pendant', x: 150, y: 300, isOn: true, brightness, color: lightColor },
      ]
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      x: 300,
      y: 200,
      width: 150,
      height: 150,
      lightColor,
      brightness,
      fixtures: [
        { id: 'k1', type: 'recessed', x: 350, y: 230, isOn: true, brightness, color: lightColor },
        { id: 'k2', type: 'recessed', x: 400, y: 230, isOn: true, brightness, color: lightColor },
        { id: 'k3', type: 'keypad', x: 320, y: 320, isOn: true, brightness, color: lightColor },
      ]
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      x: 50,
      y: 50,
      width: 200,
      height: 120,
      lightColor,
      brightness,
      fixtures: [
        { id: 'b1', type: 'recessed', x: 100, y: 90, isOn: true, brightness, color: lightColor },
        { id: 'b2', type: 'sconce', x: 60, y: 80, isOn: true, brightness, color: lightColor },
        { id: 'b3', type: 'sconce', x: 240, y: 80, isOn: true, brightness, color: lightColor },
      ]
    },
    {
      id: 'office',
      name: 'Office',
      x: 300,
      y: 50,
      width: 150,
      height: 120,
      lightColor,
      brightness,
      fixtures: [
        { id: 'o1', type: 'recessed', x: 375, y: 90, isOn: true, brightness, color: lightColor },
        { id: 'o2', type: 'keypad', x: 320, y: 60, isOn: true, brightness, color: lightColor },
      ]
    }
  ];

  const handleBlueprintUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedBlueprint(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFixtureIcon = (type: LightFixture['type']) => {
    switch (type) {
      case 'recessed':
        return '●';
      case 'pendant':
        return '◐';
      case 'sconce':
        return '◑';
      case 'keypad':
        return '▣';
      default:
        return '●';
    }
  };

  const getRoomFill = (room: Room) => {
    const isActive = selectedRoom === room.id;
    const isHovered = hoveredRoom === room.id;
    const alpha = (room.brightness / 100) * 0.6;
    
    if (isActive) {
      return `${room.lightColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
    }
    if (isHovered) {
      return `hsl(var(--accent))40`;
    }
    return 'hsl(var(--muted))20';
  };

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Interactive Floor Plan</h3>
        
        <div className="flex items-center space-x-2">
          {/* Voice Control */}
          <Button
            variant={voiceEnabled ? "default" : "secondary"}
            size="sm"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="flex items-center space-x-1"
          >
            {voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span className="text-xs">Troy AI</span>
          </Button>

          {/* Blueprint Upload */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleBlueprintUpload}
              className="hidden"
            />
            <Button variant="secondary" size="sm" className="flex items-center space-x-1">
              <Upload className="w-4 h-4" />
              <span className="text-xs">Blueprint</span>
            </Button>
          </label>
        </div>
      </div>

      {voiceEnabled && (
        <div className="bg-accent/20 border border-accent/30 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Troy AI is listening...</span>
          </div>
          <p className="text-gray-300 text-xs mt-1">
            Try saying: "Turn on living room lights" or "Set bedroom to 30% brightness"
          </p>
        </div>
      )}

      <div className="relative">
        {/* Blueprint Background */}
        {uploadedBlueprint && (
          <img 
            src={uploadedBlueprint} 
            alt="Uploaded Blueprint" 
            className="absolute inset-0 w-full h-full object-contain opacity-30 z-0"
            loading="lazy"
          />
        )}

        {/* Interactive Floor Plan SVG */}
        <svg 
          viewBox="0 0 500 400" 
          className="w-full h-80 bg-gradient-to-b from-slate-900/20 to-slate-900/5 rounded-lg border border-white/10 relative z-10"
        >
          {/* Grid Pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Rooms */}
          {defaultRooms.map((room) => (
            <g key={room.id}>
              {/* Room Area */}
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={getRoomFill(room)}
                stroke={selectedRoom === room.id ? "hsl(var(--accent))" : "white"}
                strokeWidth={selectedRoom === room.id ? "2" : "1"}
                strokeOpacity="0.5"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                onClick={() => onRoomSelect(room.id)}
              />

              {/* Room Label */}
              <text
                x={room.x + room.width / 2}
                y={room.y + 20}
                textAnchor="middle"
                className="fill-white text-sm font-medium pointer-events-none"
                opacity={hoveredRoom === room.id || selectedRoom === room.id ? 1 : 0.7}
              >
                {room.name}
              </text>

              {/* Light Fixtures */}
              {room.fixtures.map((fixture) => (
                <g key={fixture.id}>
                  {/* Fixture Glow */}
                  {fixture.isOn && (
                    <circle
                      cx={fixture.x}
                      cy={fixture.y}
                      r={10 + (fixture.brightness / 100) * 15}
                      fill={fixture.color}
                      opacity={0.3 * (fixture.brightness / 100)}
                      className="animate-pulse"
                    />
                  )}

                  {/* Fixture Icon */}
                  <text
                    x={fixture.x}
                    y={fixture.y + 3}
                    textAnchor="middle"
                    className="fill-white text-lg cursor-pointer hover:fill-accent transition-colors"
                    onMouseEnter={() => setHoveredFixture(fixture.id)}
                    onMouseLeave={() => setHoveredFixture(null)}
                    onClick={() => onFixtureSelect(fixture)}
                  >
                    {getFixtureIcon(fixture.type)}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* Energy Flow Visualization */}
          <defs>
            <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Central Power Source */}
          <circle cx="250" cy="380" r="8" fill="hsl(var(--accent))" opacity="0.8" />
          <text x="250" y="395" textAnchor="middle" className="fill-white text-xs">Main Panel</text>
        </svg>

        {/* Fixture Details Popup */}
        {hoveredFixture && (
          <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-white/20 max-w-48">
            <h4 className="text-white font-semibold text-sm mb-1">Light Fixture</h4>
            <p className="text-gray-300 text-xs mb-2">
              Type: {hoveredFixture.charAt(0).toUpperCase() + hoveredFixture.slice(1)}
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Brightness:</span>
              <span className="text-white">{brightness}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <h4 className="text-white text-sm font-medium mb-2">Fixture Types</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-white text-lg">●</span>
            <span className="text-gray-300">Recessed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-lg">◐</span>
            <span className="text-gray-300">Pendant</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-lg">◑</span>
            <span className="text-gray-300">Wall Sconce</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-lg">▣</span>
            <span className="text-gray-300">Control Keypad</span>
          </div>
        </div>
      </div>
    </IPadCard>
  );
};