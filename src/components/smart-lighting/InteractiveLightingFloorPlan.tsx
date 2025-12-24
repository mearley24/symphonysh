import { useState } from 'react';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lights: Array<{ x: number; y: number; name: string }>;
}

interface InteractiveLightingFloorPlanProps {
  brightness: number;
  colorTemp: number;
  selectedRoom: string;
  onRoomSelect: (roomId: string) => void;
}

export const InteractiveLightingFloorPlan = ({
  brightness,
  colorTemp,
  selectedRoom,
  onRoomSelect
}: InteractiveLightingFloorPlanProps) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const rooms: Room[] = [
    {
      id: 'living',
      name: 'Living Room',
      x: 20,
      y: 20,
      width: 120,
      height: 90,
      lights: [
        { x: 50, y: 50, name: 'Recessed' },
        { x: 90, y: 50, name: 'Recessed' },
        { x: 70, y: 80, name: 'Lamp' },
      ]
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      x: 140,
      y: 20,
      width: 100,
      height: 60,
      lights: [
        { x: 170, y: 40, name: 'Pendant' },
        { x: 210, y: 40, name: 'Under Cab' },
      ]
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      x: 140,
      y: 80,
      width: 100,
      height: 70,
      lights: [
        { x: 170, y: 105, name: 'Ceiling' },
        { x: 210, y: 105, name: 'Bedside' },
      ]
    },
    {
      id: 'office',
      name: 'Office',
      x: 20,
      y: 110,
      width: 80,
      height: 60,
      lights: [
        { x: 50, y: 135, name: 'Desk' },
        { x: 75, y: 135, name: 'Overhead' },
      ]
    },
    {
      id: 'hall',
      name: 'Hall',
      x: 100,
      y: 110,
      width: 40,
      height: 60,
      lights: [
        { x: 120, y: 140, name: 'Hall' },
      ]
    }
  ];

  // Convert color temp (2200K-6500K) to RGB-ish color
  const getLightColor = () => {
    // Warm (2200K) = orange/amber, Cool (6500K) = blue-white
    const normalized = (colorTemp - 2200) / (6500 - 2200);
    const hue = 30 - (normalized * 30); // 30 (warm amber) to 0 (red) then shift to blue
    const saturation = 100 - (normalized * 50); // Less saturated as it gets cooler
    
    if (normalized < 0.5) {
      // Warm range: amber to white
      return `hsl(${30 - normalized * 30}, ${100 - normalized * 60}%, ${50 + normalized * 30}%)`;
    } else {
      // Cool range: white to blue-white
      return `hsl(${200 + (normalized - 0.5) * 40}, ${30 + (normalized - 0.5) * 40}%, ${70 + (normalized - 0.5) * 15}%)`;
    }
  };

  const lightColor = getLightColor();
  const glowIntensity = brightness / 100;

  const getRoomFill = (room: Room) => {
    const isSelected = selectedRoom === room.id;
    const isHovered = hoveredRoom === room.id;
    
    if (isSelected) {
      return `rgba(255, 255, 255, ${0.08 + glowIntensity * 0.12})`;
    }
    if (isHovered) {
      return 'rgba(255, 255, 255, 0.08)';
    }
    return 'rgba(255, 255, 255, 0.03)';
  };

  return (
    <div className="relative">
      <svg 
        viewBox="0 0 260 190" 
        className="w-full h-auto rounded-lg"
        style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      >
        {/* Grid Pattern */}
        <defs>
          <pattern id="lightGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrid)" />

        {/* Rooms */}
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;
          
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
                fill="rgba(255, 255, 255, 0.6)"
                fontSize="7"
                fontWeight="500"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {room.name}
              </text>

              {/* Light fixtures */}
              {room.lights.map((light, idx) => {
                const isRoomSelected = selectedRoom === room.id;
                const lightOpacity = isRoomSelected ? glowIntensity : glowIntensity * 0.5;
                
                return (
                  <g key={`${room.id}-light-${idx}`}>
                    {/* Light glow effect */}
                    <circle
                      cx={light.x}
                      cy={light.y}
                      r={8 + brightness / 10}
                      fill={lightColor}
                      opacity={lightOpacity * 0.4}
                      className="transition-all duration-500"
                      style={{
                        filter: `blur(${4 + brightness / 20}px)`
                      }}
                    />
                    
                    {/* Light fixture */}
                    <circle
                      cx={light.x}
                      cy={light.y}
                      r={4}
                      fill={lightColor}
                      opacity={0.3 + lightOpacity * 0.7}
                      className="transition-all duration-300"
                    />
                    
                    {/* Light center */}
                    <circle
                      cx={light.x}
                      cy={light.y}
                      r={2}
                      fill="white"
                      opacity={lightOpacity}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Brightness indicator */}
        <text
          x="130"
          y="185"
          fill="rgba(255, 255, 255, 0.4)"
          fontSize="6"
          textAnchor="middle"
          className="pointer-events-none"
        >
          Tap rooms to control • {brightness}% brightness
        </text>
      </svg>
    </div>
  );
};
