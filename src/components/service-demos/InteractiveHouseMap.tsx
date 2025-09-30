import React from 'react';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InteractiveHouseMapProps {
  selectedRoom: string;
  currentScene: string;
  onRoomSelect: (roomId: string) => void;
  systemStatus: {
    lights: boolean;
  };
}

export const InteractiveHouseMap = ({ 
  selectedRoom, 
  currentScene, 
  onRoomSelect,
  systemStatus 
}: InteractiveHouseMapProps) => {
  const rooms: Room[] = [
    { id: 'living-room', name: 'Living Room', x: 10, y: 40, width: 180, height: 120 },
    { id: 'kitchen', name: 'Kitchen', x: 200, y: 40, width: 140, height: 90 },
    { id: 'bedroom', name: 'Master Bedroom', x: 10, y: 170, width: 140, height: 110 },
    { id: 'office', name: 'Home Office', x: 200, y: 140, width: 140, height: 90 }
  ];

  const getLightIntensity = (roomId: string) => {
    if (!systemStatus.lights) return 0;
    
    switch (currentScene) {
      case 'away':
        return 0;
      case 'sleep':
        return roomId === 'bedroom' ? 20 : 0;
      case 'party':
        return roomId === 'living-room' ? 100 : 40;
      case 'home':
      default:
        return roomId === 'living-room' ? 85 : roomId === 'kitchen' ? 90 : 50;
    }
  };

  const getRoomColor = (roomId: string) => {
    const intensity = getLightIntensity(roomId);
    const isSelected = selectedRoom === roomId;
    
    if (intensity === 0) {
      return isSelected 
        ? 'rgba(100, 116, 139, 0.6)' 
        : 'rgba(51, 65, 85, 0.4)';
    }
    
    const alpha = intensity / 100;
    const baseColor = currentScene === 'party' 
      ? `rgba(147, 51, 234, ${alpha * 0.6})` 
      : `rgba(251, 191, 36, ${alpha * 0.5})`;
    
    return isSelected 
      ? baseColor 
      : baseColor.replace(/[\d.]+\)$/, m => `${parseFloat(m) * 0.7})`);
  };

  const getLightGlow = (roomId: string) => {
    const intensity = getLightIntensity(roomId);
    if (intensity === 0) return 'none';
    
    const color = currentScene === 'party' 
      ? '147, 51, 234' 
      : '251, 191, 36';
    
    return `0 0 ${intensity / 5}px rgba(${color}, ${intensity / 100})`;
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-medium">Interactive Floor Plan</h4>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
            <span>Lights On</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-slate-600/50" />
            <span>Lights Off</span>
          </div>
        </div>
      </div>
      
      <svg 
        viewBox="0 0 350 290" 
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      >
        {/* House outline */}
        <rect 
          x="5" 
          y="35" 
          width="340" 
          height="250" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.15)" 
          strokeWidth="2"
          rx="4"
        />
        
        {/* Rooms */}
        {rooms.map((room) => {
          const intensity = getLightIntensity(room.id);
          const isSelected = selectedRoom === room.id;
          
          return (
            <g 
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className="cursor-pointer transition-all duration-500"
              style={{ 
                filter: `drop-shadow(${getLightGlow(room.id)})` 
              }}
            >
              {/* Room background */}
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={getRoomColor(room.id)}
                stroke={isSelected ? 'rgba(96, 165, 250, 0.8)' : 'rgba(255, 255, 255, 0.2)'}
                strokeWidth={isSelected ? '3' : '1.5'}
                rx="8"
                className="transition-all duration-500"
              />
              
              {/* Light bulb icons */}
              {intensity > 0 && (
                <>
                  <circle
                    cx={room.x + room.width / 2}
                    cy={room.y + 20}
                    r="8"
                    fill={currentScene === 'party' ? '#a855f7' : '#fbbf24'}
                    opacity={intensity / 100}
                    className="transition-opacity duration-500"
                  />
                  <circle
                    cx={room.x + room.width / 2}
                    cy={room.y + 20}
                    r="12"
                    fill="none"
                    stroke={currentScene === 'party' ? '#a855f7' : '#fbbf24'}
                    strokeWidth="1.5"
                    opacity={intensity / 200}
                    className="transition-opacity duration-500"
                  />
                </>
              )}
              
              {/* Room label */}
              <text
                x={room.x + room.width / 2}
                y={room.y + room.height / 2 + 5}
                fill="white"
                fontSize="14"
                fontWeight="500"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {room.name}
              </text>
              
              {/* Intensity indicator */}
              <text
                x={room.x + room.width / 2}
                y={room.y + room.height / 2 + 25}
                fill="rgba(255, 255, 255, 0.7)"
                fontSize="12"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {intensity}%
              </text>
            </g>
          );
        })}
        
        {/* Door indicators */}
        <line x1="170" y1="35" x2="180" y2="35" stroke="#60a5fa" strokeWidth="4" />
        <text x="175" y="25" fill="#60a5fa" fontSize="10" textAnchor="middle">Entry</text>
      </svg>
      
      <div className="mt-4 text-xs text-gray-400 text-center">
        Click on a room to control it • Scene: <span className="text-accent capitalize">{currentScene}</span>
      </div>
    </div>
  );
};
