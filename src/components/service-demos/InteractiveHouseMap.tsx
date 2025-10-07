import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lights: Array<{ x: number; y: number; load: string }>;
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
  systemStatus,
  lightLevels 
}: InteractiveHouseMapProps) => {
  // Blueprint-style connected floor plan
  const rooms: Room[] = [
    { 
      id: 'living-room', 
      name: 'Living Room', 
      x: 20, 
      y: 60, 
      width: 200, 
      height: 160,
      lights: [
        { x: 60, y: 100, load: 'Recessed 1' },
        { x: 120, y: 100, load: 'Recessed 2' },
        { x: 180, y: 100, load: 'Recessed 3' },
        { x: 90, y: 160, load: 'Accent' },
        { x: 150, y: 160, load: 'Table Lamp' }
      ]
    },
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      x: 220, 
      y: 60, 
      width: 180, 
      height: 100,
      lights: [
        { x: 270, y: 90, load: 'Under Cabinet' },
        { x: 320, y: 90, load: 'Pendant 1' },
        { x: 360, y: 90, load: 'Pendant 2' },
        { x: 310, y: 130, load: 'Overhead' }
      ]
    },
    { 
      id: 'bedroom', 
      name: 'Master Bedroom', 
      x: 20, 
      y: 220, 
      width: 140, 
      height: 120,
      lights: [
        { x: 60, y: 260, load: 'Ceiling' },
        { x: 40, y: 300, load: 'Bedside L' },
        { x: 120, y: 300, load: 'Bedside R' }
      ]
    },
    { 
      id: 'office', 
      name: 'Home Office', 
      x: 220, 
      y: 160, 
      width: 180, 
      height: 100,
      lights: [
        { x: 270, y: 190, load: 'Desk Lamp' },
        { x: 350, y: 190, load: 'Overhead' },
        { x: 310, y: 230, load: 'Reading' }
      ]
    },
    {
      id: 'hallway',
      name: 'Hallway',
      x: 160,
      y: 220,
      width: 60,
      height: 120,
      lights: [
        { x: 190, y: 250, load: 'Hall 1' },
        { x: 190, y: 300, load: 'Hall 2' }
      ]
    }
  ];

  const getLightIntensity = (roomId: string, loadIndex: number) => {
    if (!systemStatus.lights) return 0;
    
    const baseIntensities: Record<string, Record<string, number[]>> = {
      'away': {},
      'sleep': {
        'bedroom': [15, 5, 5],
        'hallway': [10, 0]
      },
      'party': {
        'living-room': [100, 100, 100, 80, 60],
        'kitchen': [70, 50, 50, 40],
        'hallway': [40, 40]
      },
      'home': {
        'living-room': [85, 85, 85, 60, 40],
        'kitchen': [90, 80, 80, 75],
        'bedroom': [50, 30, 30],
        'office': [90, 70, 50],
        'hallway': [50, 50]
      }
    };

    const sceneData = baseIntensities[currentScene];
    if (!sceneData || !sceneData[roomId]) return 0;
    
    return sceneData[roomId][loadIndex] || 0;
  };

  const getRoomColor = (roomId: string) => {
    const isSelected = selectedRoom === roomId;
    return isSelected 
      ? 'rgba(30, 41, 59, 0.95)' 
      : 'rgba(15, 23, 42, 0.85)';
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-medium">Blueprint Floor Plan</h4>
        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Lightbulb className="w-3 h-3 text-yellow-400" />
            <span>Individual Loads</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-400/50 border border-blue-400" />
            <span>Selected</span>
          </div>
        </div>
      </div>
      
      <svg 
        viewBox="0 0 420 360" 
        className="w-full h-auto"
        style={{ maxHeight: '500px', background: 'rgba(15, 23, 42, 0.8)' }}
      >
        {/* Blueprint grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="420" height="360" fill="url(#grid)" />
        
        {/* Rooms with blueprint styling */}
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
                fill={getRoomColor(room.id)}
                stroke={isSelected ? 'rgba(96, 165, 250, 0.9)' : 'rgba(148, 163, 184, 0.5)'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={room.id === 'hallway' ? '5,5' : '0'}
                className="transition-all duration-300 cursor-pointer"
                onClick={() => onRoomSelect(room.id)}
              />
              
              {/* Room label */}
              <text
                x={room.x + room.width / 2}
                y={room.y + 20}
                fill="rgba(148, 163, 184, 0.9)"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                className="pointer-events-none select-none uppercase tracking-wider"
                style={{ fontFamily: 'monospace' }}
              >
                {room.name}
              </text>
              
              {/* Individual lighting loads */}
              {room.lights.map((light, index) => {
                const intensity = getLightIntensity(room.id, index);
                const isOn = intensity > 0;
                const color = currentScene === 'party' ? '#a855f7' : '#fbbf24';
                
                return (
                  <g key={`${room.id}-light-${index}`}>
                    {/* Light fixture symbol */}
                    <circle
                      cx={light.x}
                      cy={light.y}
                      r="6"
                      fill={isOn ? color : 'rgba(71, 85, 105, 0.5)'}
                      stroke={isOn ? color : 'rgba(148, 163, 184, 0.3)'}
                      strokeWidth="1.5"
                      opacity={isOn ? intensity / 100 : 0.5}
                      className="transition-all duration-500"
                      style={{
                        filter: isOn ? `drop-shadow(0 0 ${intensity / 10}px ${color})` : 'none'
                      }}
                    />
                    
                    {/* Light rays when on */}
                    {isOn && (
                      <>
                        <line
                          x1={light.x}
                          y1={light.y - 10}
                          x2={light.x}
                          y2={light.y - 6}
                          stroke={color}
                          strokeWidth="1"
                          opacity={intensity / 150}
                          className="transition-opacity duration-500"
                        />
                        <line
                          x1={light.x}
                          y1={light.y + 10}
                          x2={light.x}
                          y2={light.y + 6}
                          stroke={color}
                          strokeWidth="1"
                          opacity={intensity / 150}
                          className="transition-opacity duration-500"
                        />
                        <line
                          x1={light.x - 10}
                          y1={light.y}
                          x2={light.x - 6}
                          y2={light.y}
                          stroke={color}
                          strokeWidth="1"
                          opacity={intensity / 150}
                          className="transition-opacity duration-500"
                        />
                        <line
                          x1={light.x + 10}
                          y1={light.y}
                          x2={light.x + 6}
                          y2={light.y}
                          stroke={color}
                          strokeWidth="1"
                          opacity={intensity / 150}
                          className="transition-opacity duration-500"
                        />
                      </>
                    )}
                    
                    {/* Load label */}
                    <text
                      x={light.x}
                      y={light.y + 20}
                      fill={isOn ? 'rgba(255, 255, 255, 0.8)' : 'rgba(148, 163, 184, 0.5)'}
                      fontSize="8"
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {light.load}
                    </text>
                    
                    {/* Intensity percentage */}
                    {isOn && (
                      <text
                        x={light.x}
                        y={light.y + 30}
                        fill={color}
                        fontSize="7"
                        fontWeight="600"
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                      >
                        {intensity}%
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Connection lines between lights (wiring) */}
              {room.lights.map((light, index) => {
                if (index === 0) return null;
                const prevLight = room.lights[index - 1];
                const intensity = getLightIntensity(room.id, index);
                const isOn = intensity > 0;
                
                return (
                  <line
                    key={`wire-${room.id}-${index}`}
                    x1={prevLight.x}
                    y1={prevLight.y}
                    x2={light.x}
                    y2={light.y}
                    stroke={isOn ? 'rgba(96, 165, 250, 0.3)' : 'rgba(71, 85, 105, 0.2)'}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    className="transition-all duration-500"
                  />
                );
              })}
            </g>
          );
        })}
        
        {/* Main entry door */}
        <rect x="195" y="50" width="30" height="8" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="210" y="45" fill="#3b82f6" fontSize="9" textAnchor="middle" fontWeight="600">ENTRY</text>
        
        {/* Dimension lines */}
        <line x1="15" y1="355" x2="405" y2="355" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
        <line x1="15" y1="352" x2="15" y2="358" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
        <line x1="405" y1="352" x2="405" y2="358" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
        <text x="210" y="350" fill="rgba(148, 163, 184, 0.6)" fontSize="8" textAnchor="middle">2400 sq ft</text>
      </svg>
      
      <div className="mt-4 text-xs text-gray-400 text-center">
        Click rooms to control • <span className="text-accent capitalize">{currentScene}</span> scene active • {systemStatus.lights ? 'System Online' : 'System Offline'}
      </div>
    </div>
  );
};
