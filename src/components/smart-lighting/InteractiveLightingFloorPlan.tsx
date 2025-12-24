import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

interface Light {
  id: string;
  x: number;
  y: number;
  name: string;
  type: 'recessed' | 'pendant' | 'lamp' | 'sconce' | 'under-cabinet' | 'chandelier';
}

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lights: Light[];
}

interface RoomBrightness {
  [roomId: string]: number;
}

interface LightState {
  [lightId: string]: boolean;
}

interface InteractiveLightingFloorPlanProps {
  colorTemp: number;
  selectedRoom: string;
  onRoomSelect: (roomId: string) => void;
}

export const InteractiveLightingFloorPlan = ({
  colorTemp,
  selectedRoom,
  onRoomSelect
}: InteractiveLightingFloorPlanProps) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [hoveredLight, setHoveredLight] = useState<string | null>(null);
  const [selectedLight, setSelectedLight] = useState<string | null>(null);
  const [roomBrightness, setRoomBrightness] = useState<RoomBrightness>({
    living: 80,
    kitchen: 100,
    bedroom: 40,
    office: 70,
    dining: 60,
    bathroom: 90,
    hall: 50,
  });
  const [lightStates, setLightStates] = useState<LightState>({});

  const rooms: Room[] = [
    {
      id: 'living',
      name: 'Living Room',
      x: 20,
      y: 20,
      width: 140,
      height: 100,
      lights: [
        { id: 'l1', x: 50, y: 45, name: 'Recessed 1', type: 'recessed' },
        { id: 'l2', x: 90, y: 45, name: 'Recessed 2', type: 'recessed' },
        { id: 'l3', x: 130, y: 45, name: 'Recessed 3', type: 'recessed' },
        { id: 'l4', x: 70, y: 85, name: 'Floor Lamp', type: 'lamp' },
        { id: 'l5', x: 110, y: 85, name: 'Table Lamp', type: 'lamp' },
        { id: 'l6', x: 30, y: 65, name: 'Sconce L', type: 'sconce' },
        { id: 'l7', x: 150, y: 65, name: 'Sconce R', type: 'sconce' },
      ]
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      x: 160,
      y: 20,
      width: 120,
      height: 70,
      lights: [
        { id: 'k1', x: 200, y: 40, name: 'Pendant 1', type: 'pendant' },
        { id: 'k2', x: 230, y: 40, name: 'Pendant 2', type: 'pendant' },
        { id: 'k3', x: 260, y: 40, name: 'Pendant 3', type: 'pendant' },
        { id: 'k4', x: 180, y: 70, name: 'Under Cab 1', type: 'under-cabinet' },
        { id: 'k5', x: 210, y: 70, name: 'Under Cab 2', type: 'under-cabinet' },
        { id: 'k6', x: 240, y: 70, name: 'Under Cab 3', type: 'under-cabinet' },
      ]
    },
    {
      id: 'dining',
      name: 'Dining',
      x: 160,
      y: 90,
      width: 80,
      height: 70,
      lights: [
        { id: 'd1', x: 200, y: 120, name: 'Chandelier', type: 'chandelier' },
        { id: 'd2', x: 175, y: 105, name: 'Sconce L', type: 'sconce' },
        { id: 'd3', x: 225, y: 105, name: 'Sconce R', type: 'sconce' },
      ]
    },
    {
      id: 'bedroom',
      name: 'Master Bed',
      x: 240,
      y: 90,
      width: 100,
      height: 90,
      lights: [
        { id: 'b1', x: 270, y: 115, name: 'Ceiling', type: 'recessed' },
        { id: 'b2', x: 300, y: 115, name: 'Ceiling 2', type: 'recessed' },
        { id: 'b3', x: 255, y: 150, name: 'Bedside L', type: 'lamp' },
        { id: 'b4', x: 325, y: 150, name: 'Bedside R', type: 'lamp' },
        { id: 'b5', x: 290, y: 165, name: 'Closet', type: 'recessed' },
      ]
    },
    {
      id: 'office',
      name: 'Office',
      x: 20,
      y: 120,
      width: 80,
      height: 70,
      lights: [
        { id: 'o1', x: 50, y: 145, name: 'Desk Lamp', type: 'lamp' },
        { id: 'o2', x: 80, y: 145, name: 'Overhead', type: 'recessed' },
        { id: 'o3', x: 35, y: 165, name: 'Floor Lamp', type: 'lamp' },
      ]
    },
    {
      id: 'bathroom',
      name: 'Bath',
      x: 240,
      y: 180,
      width: 60,
      height: 50,
      lights: [
        { id: 'bt1', x: 260, y: 200, name: 'Vanity L', type: 'sconce' },
        { id: 'bt2', x: 285, y: 200, name: 'Vanity R', type: 'sconce' },
        { id: 'bt3', x: 272, y: 215, name: 'Shower', type: 'recessed' },
      ]
    },
    {
      id: 'hall',
      name: 'Hall',
      x: 100,
      y: 120,
      width: 60,
      height: 110,
      lights: [
        { id: 'h1', x: 130, y: 145, name: 'Hall 1', type: 'recessed' },
        { id: 'h2', x: 130, y: 180, name: 'Hall 2', type: 'recessed' },
        { id: 'h3', x: 130, y: 215, name: 'Hall 3', type: 'recessed' },
      ]
    }
  ];

  const isLightOn = (lightId: string) => {
    return lightStates[lightId] !== false; // Default to on
  };

  const toggleLight = (lightId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightStates(prev => ({
      ...prev,
      [lightId]: !isLightOn(lightId)
    }));
    setSelectedLight(lightId);
  };

  const getLightColor = () => {
    const normalized = (colorTemp - 2200) / (6500 - 2200);
    
    if (normalized < 0.5) {
      return `hsl(${30 - normalized * 30}, ${100 - normalized * 60}%, ${50 + normalized * 30}%)`;
    } else {
      return `hsl(${200 + (normalized - 0.5) * 40}, ${30 + (normalized - 0.5) * 40}%, ${70 + (normalized - 0.5) * 15}%)`;
    }
  };

  const getLightIcon = (type: Light['type']) => {
    switch (type) {
      case 'recessed': return 'M-3,-3 L3,-3 L3,3 L-3,3 Z';
      case 'pendant': return 'M0,-4 L3,2 L0,4 L-3,2 Z';
      case 'lamp': return 'M-2,-4 L2,-4 L3,2 L-3,2 Z M-1,2 L1,2 L1,4 L-1,4 Z';
      case 'sconce': return 'M-2,-3 L2,-3 L2,3 L-2,3 Z';
      case 'under-cabinet': return 'M-4,-1 L4,-1 L4,1 L-4,1 Z';
      case 'chandelier': return 'M-4,-4 L4,-4 L4,4 L-4,4 Z M-2,-2 L2,-2 L2,2 L-2,2 Z';
      default: return 'M-3,-3 L3,-3 L3,3 L-3,3 Z';
    }
  };

  const lightColor = getLightColor();

  const getRoomFill = (room: Room) => {
    const isSelected = selectedRoom === room.id;
    const isHovered = hoveredRoom === room.id;
    const brightness = roomBrightness[room.id] || 50;
    const onLights = room.lights.filter(l => isLightOn(l.id)).length;
    const glowIntensity = (brightness / 100) * (onLights / room.lights.length);
    
    if (isSelected) {
      return `rgba(255, 255, 255, ${0.08 + glowIntensity * 0.15})`;
    }
    if (isHovered) {
      return 'rgba(255, 255, 255, 0.08)';
    }
    return `rgba(255, 255, 255, ${0.02 + glowIntensity * 0.05})`;
  };

  const handleRoomBrightnessChange = (roomId: string, value: number[]) => {
    setRoomBrightness(prev => ({
      ...prev,
      [roomId]: value[0]
    }));
  };

  const getOnLightCount = (room: Room) => {
    return room.lights.filter(l => isLightOn(l.id)).length;
  };

  return (
    <div className="space-y-4">
      {/* Floor Plan */}
      <svg 
        viewBox="0 0 360 250" 
        className="w-full h-auto rounded-lg"
        style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      >
        {/* Grid Pattern */}
        <defs>
          <pattern id="lightGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="selectedGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrid)" />

        {/* Rooms */}
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;
          const brightness = roomBrightness[room.id] || 50;
          
          return (
            <g key={room.id}>
              {/* Room outline */}
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={getRoomFill(room)}
                stroke={isSelected ? 'rgba(251, 191, 36, 0.6)' : 'rgba(255, 255, 255, 0.2)'}
                strokeWidth={isSelected ? 1.5 : 0.5}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                onClick={() => onRoomSelect(room.id)}
              />

              {/* Room label */}
              <text
                x={room.x + room.width / 2}
                y={room.y + 12}
                fill="rgba(255, 255, 255, 0.7)"
                fontSize="8"
                fontWeight="500"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {room.name}
              </text>

              {/* Brightness & light count */}
              <text
                x={room.x + room.width - 8}
                y={room.y + room.height - 6}
                fill="rgba(251, 191, 36, 0.6)"
                fontSize="7"
                fontWeight="400"
                textAnchor="end"
                className="pointer-events-none select-none"
              >
                {getOnLightCount(room)}/{room.lights.length} • {brightness}%
              </text>

              {/* Light fixtures */}
              {room.lights.map((light) => {
                const lightOn = isLightOn(light.id);
                const lightOpacity = lightOn ? brightness / 100 : 0;
                const isHoveredLight = hoveredLight === light.id;
                const isSelectedLight = selectedLight === light.id;
                
                return (
                  <g 
                    key={light.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLight(light.id)}
                    onMouseLeave={() => setHoveredLight(null)}
                    onClick={(e) => toggleLight(light.id, e)}
                  >
                    {/* Clickable area */}
                    <circle
                      cx={light.x}
                      cy={light.y}
                      r={10}
                      fill="transparent"
                      className="cursor-pointer"
                    />
                    
                    {/* Light glow effect - only when on */}
                    {lightOn && (
                      <circle
                        cx={light.x}
                        cy={light.y}
                        r={6 + brightness / 15}
                        fill={lightColor}
                        opacity={lightOpacity * 0.5}
                        className="transition-all duration-500 pointer-events-none"
                        style={{
                          filter: `blur(${3 + brightness / 25}px)`
                        }}
                      />
                    )}
                    
                    {/* Selection ring */}
                    {(isHoveredLight || isSelectedLight) && (
                      <circle
                        cx={light.x}
                        cy={light.y}
                        r={8}
                        fill="none"
                        stroke={isSelectedLight ? 'rgba(251, 191, 36, 0.8)' : 'rgba(255, 255, 255, 0.4)'}
                        strokeWidth={1.5}
                        className="transition-all duration-200 pointer-events-none"
                        filter={isSelectedLight ? 'url(#selectedGlow)' : undefined}
                      />
                    )}
                    
                    {/* Light fixture icon */}
                    <g transform={`translate(${light.x}, ${light.y})`}>
                      <path
                        d={getLightIcon(light.type)}
                        fill={lightOn ? lightColor : 'rgba(100, 100, 100, 0.5)'}
                        opacity={lightOn ? (0.4 + lightOpacity * 0.6) : 0.3}
                        className="transition-all duration-300 pointer-events-none"
                      />
                    </g>
                    
                    {/* Light center */}
                    <circle
                      cx={light.x}
                      cy={light.y}
                      r={1.5}
                      fill={lightOn ? 'white' : 'rgba(80, 80, 80, 0.8)'}
                      opacity={lightOn ? lightOpacity : 0.5}
                      className="transition-all duration-300 pointer-events-none"
                    />

                    {/* Tooltip on hover */}
                    {isHoveredLight && (
                      <g className="pointer-events-none">
                        <rect
                          x={light.x - 25}
                          y={light.y - 22}
                          width={50}
                          height={12}
                          rx={2}
                          fill="rgba(0, 0, 0, 0.8)"
                        />
                        <text
                          x={light.x}
                          y={light.y - 13}
                          fill="white"
                          fontSize="6"
                          textAnchor="middle"
                          className="select-none"
                        >
                          {light.name} ({lightOn ? 'ON' : 'OFF'})
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(20, 235)">
          <text fill="rgba(255, 255, 255, 0.4)" fontSize="6">
            <tspan>Tap fixture to toggle • Tap room to select</tspan>
          </text>
        </g>
      </svg>

      {/* Room Brightness Controls */}
      <div className="grid grid-cols-2 gap-3">
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;
          const brightness = roomBrightness[room.id] || 50;
          const onCount = getOnLightCount(room);
          
          return (
            <div 
              key={room.id}
              className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'bg-amber-500/20 border border-amber-500/40' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => onRoomSelect(room.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/80">{room.name}</span>
                <span className="text-xs text-amber-400/80">{onCount}/{room.lights.length} • {brightness}%</span>
              </div>
              <Slider
                value={[brightness]}
                onValueChange={(val) => handleRoomBrightnessChange(room.id, val)}
                max={100}
                min={0}
                step={5}
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {room.lights.map((light) => {
                  const lightOn = isLightOn(light.id);
                  return (
                    <button 
                      key={light.id} 
                      className={`text-[9px] px-1.5 py-0.5 rounded transition-all duration-200 ${
                        lightOn 
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40' 
                          : 'bg-white/5 text-white/40 border border-white/10'
                      }`}
                      onClick={(e) => toggleLight(light.id, e)}
                    >
                      {light.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};