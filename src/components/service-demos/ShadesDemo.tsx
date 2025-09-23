import { useState, useEffect } from 'react';
import { Sun, Moon, Eye, EyeOff, Zap, Clock, Smartphone, ChevronUp, ChevronDown } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

export const ShadesDemo = () => {
  const [selectedRoom, setSelectedRoom] = useState('living-room');
  const [autoMode, setAutoMode] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [energySaver, setEnergySaver] = useState(true);
  const [sunPosition, setSunPosition] = useState(45);

  const rooms = {
    'living-room': {
      name: 'Living Room',
      shades: [
        { id: 1, name: 'South Window', position: 75, type: 'blackout' },
        { id: 2, name: 'West Window', position: 60, type: 'solar' },
        { id: 3, name: 'Patio Door', position: 45, type: 'sheer' }
      ]
    },
    'bedroom': {
      name: 'Master Bedroom',
      shades: [
        { id: 4, name: 'East Window', position: 90, type: 'blackout' },
        { id: 5, name: 'North Window', position: 40, type: 'cellular' }
      ]
    },
    'office': {
      name: 'Home Office',
      shades: [
        { id: 6, name: 'North Window', position: 30, type: 'solar' },
        { id: 7, name: 'East Window', position: 55, type: 'cellular' }
      ]
    },
    'kitchen': {
      name: 'Kitchen',
      shades: [
        { id: 8, name: 'South Window', position: 20, type: 'cafe' },
        { id: 9, name: 'Garden View', position: 35, type: 'sheer' }
      ]
    }
  };

  const scenes = {
    morning: { name: 'Good Morning', icon: Sun, positions: { 1: 80, 2: 70, 3: 60, 4: 85, 5: 50, 6: 40, 7: 60, 8: 30, 9: 40 } },
    day: { name: 'Daylight', icon: Sun, positions: { 1: 60, 2: 50, 3: 40, 4: 70, 5: 30, 6: 20, 7: 40, 8: 10, 9: 20 } },
    evening: { name: 'Evening', icon: Moon, positions: { 1: 90, 2: 85, 3: 80, 4: 95, 5: 80, 6: 70, 7: 85, 8: 60, 9: 70 } },
    privacy: { name: 'Privacy', icon: EyeOff, positions: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 80, 7: 90, 8: 70, 9: 90 } }
  };

  // Simulate sun position changes
  useEffect(() => {
    const timer = setInterval(() => {
      setSunPosition(prev => (prev + 2) % 360);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentRoom = rooms[selectedRoom as keyof typeof rooms];
  
  const getShadeTypeColor = (type: string) => {
    switch (type) {
      case 'blackout': return 'bg-gray-800';
      case 'solar': return 'bg-blue-600';
      case 'sheer': return 'bg-white/20';
      case 'cellular': return 'bg-green-600';
      case 'cafe': return 'bg-amber-600';
      default: return 'bg-gray-600';
    }
  };

  const adjustShade = (shadeId: number, direction: 'up' | 'down') => {
    // This would adjust individual shade positions in a real implementation
    console.log(`Adjusting shade ${shadeId} ${direction}`);
  };

  const applyScene = (sceneKey: string) => {
    // This would apply scene positions to all shades
    console.log(`Applying scene: ${sceneKey}`);
  };

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Automated Window Shades</h3>
        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 text-xs">Auto Control Active</span>
        </div>
      </div>

      {/* Sun Position Indicator */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-900 via-yellow-400 to-orange-600 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h4 className="text-white font-medium mb-2">Solar Tracking</h4>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Sun Position: {Math.round(sunPosition)}°</span>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm">UV Index: 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Scenes */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Quick Scenes</h4>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(scenes).map(([key, scene]) => (
            <button
              key={key}
              onClick={() => applyScene(key)}
              className="p-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300"
            >
              <scene.icon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">{scene.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Room Selection */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Room Control</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(rooms).map(([key, room]) => (
            <button
              key={key}
              onClick={() => setSelectedRoom(key)}
              className={`p-3 rounded-lg text-left transition-all duration-300 ${
                selectedRoom === key 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="text-sm font-medium">{room.name}</div>
              <div className="text-xs opacity-75">{room.shades.length} shades</div>
            </button>
          ))}
        </div>

        {/* Individual Shades Control */}
        <div className="space-y-3">
          {currentRoom.shades.map((shade) => (
            <div key={shade.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="text-white font-medium text-sm">{shade.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full text-white capitalize ${getShadeTypeColor(shade.type)}`}>
                    {shade.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => adjustShade(shade.id, 'up')}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => adjustShade(shade.id, 'down')}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-400 w-8">0%</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2 relative">
                  <div 
                    className="h-2 bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${shade.position}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-12">100%</span>
                <span className="text-white text-sm w-8">{shade.position}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Smart Features</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="text-white text-sm">Solar Automation</div>
                <div className="text-gray-400 text-xs">Adjust based on sun position</div>
              </div>
            </div>
            <Switch checked={autoMode} onCheckedChange={setAutoMode} />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <EyeOff className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-white text-sm">Privacy Mode</div>
                <div className="text-gray-400 text-xs">Auto-close for privacy</div>
              </div>
            </div>
            <Switch checked={privacyMode} onCheckedChange={setPrivacyMode} />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-white text-sm">Energy Saver</div>
                <div className="text-gray-400 text-xs">Optimize for efficiency</div>
              </div>
            </div>
            <Switch checked={energySaver} onCheckedChange={setEnergySaver} />
          </div>
        </div>
      </div>

      {/* Energy Savings */}
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-green-400" />
          <div>
            <h5 className="text-white font-medium">Today's Savings</h5>
            <p className="text-green-400 text-sm">$3.75 saved • 22% cooling reduction</p>
          </div>
        </div>
      </div>

      {/* Schedule Preview */}
      <div className="mb-4">
        <h4 className="text-white font-medium mb-3">Today's Schedule</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-white/5 rounded">
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-white">7:00 AM</span>
            </div>
            <span className="text-xs text-gray-400">Morning Scene</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/5 rounded">
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-white">12:00 PM</span>
            </div>
            <span className="text-xs text-gray-400">Solar Protection</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/5 rounded">
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-white">6:00 PM</span>
            </div>
            <span className="text-xs text-gray-400">Evening Scene</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm">
          All Up
        </Button>
        <Button variant="secondary" size="sm">
          All Down
        </Button>
        <Button variant="secondary" size="sm">
          Stop All
        </Button>
      </div>
    </IPadCard>
  );
};