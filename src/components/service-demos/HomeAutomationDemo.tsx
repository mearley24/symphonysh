import { useState, useEffect } from 'react';
import React from 'react';
import { Home, Lightbulb, Thermometer, Shield, Volume2, Smartphone, Power, Settings } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

export const HomeAutomationDemo = () => {
  const [selectedRoom, setSelectedRoom] = useState('living-room');
  const [currentScene, setCurrentScene] = useState('home');
  const [systemStatus, setSystemStatus] = useState({
    security: true,
    lights: true,
    climate: true,
    entertainment: false
  });
  const [isAutoMode, setIsAutoMode] = useState(false);

  const rooms = {
    'living-room': { name: 'Living Room', temp: 72, lights: 85, devices: 8 },
    'kitchen': { name: 'Kitchen', temp: 70, lights: 90, devices: 5 },
    'bedroom': { name: 'Master Bedroom', temp: 68, lights: 45, devices: 6 },
    'office': { name: 'Home Office', temp: 71, lights: 100, devices: 4 }
  };

  const scenes = {
    home: { name: 'Welcome Home', icon: Home, color: 'bg-green-500' },
    away: { name: 'Away Mode', icon: Shield, color: 'bg-orange-500' },
    sleep: { name: 'Goodnight', icon: Home, color: 'bg-blue-500' },
    party: { name: 'Entertainment', icon: Volume2, color: 'bg-purple-500' }
  };

  const currentRoom = rooms[selectedRoom as keyof typeof rooms];

  // Auto scene changes for demo
  useEffect(() => {
    if (isAutoMode) {
      const sceneKeys = Object.keys(scenes);
      let currentIndex = sceneKeys.indexOf(currentScene);
      const timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % sceneKeys.length;
        setCurrentScene(sceneKeys[currentIndex]);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isAutoMode, currentScene]);

  const handleSceneChange = (scene: string) => {
    setCurrentScene(scene);
    // Simulate system responses
    if (scene === 'away') {
      setSystemStatus({ security: true, lights: false, climate: false, entertainment: false });
    } else if (scene === 'home') {
      setSystemStatus({ security: true, lights: true, climate: true, entertainment: false });
    } else if (scene === 'party') {
      setSystemStatus({ security: true, lights: true, climate: true, entertainment: true });
    }
  };

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Control4 Home Automation</h3>
        <div className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-accent" />
          <span className="text-green-400 text-xs">Connected</span>
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Current Scene */}
        <div className="col-span-2 bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Active Scene</h4>
            <Button
              variant={isAutoMode ? "default" : "secondary"}
              size="sm"
              onClick={() => setIsAutoMode(!isAutoMode)}
            >
              {isAutoMode ? 'Auto' : 'Manual'}
            </Button>
          </div>
          
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${scenes[currentScene as keyof typeof scenes]?.color || 'bg-gray-500'}`}>
            {scenes[currentScene as keyof typeof scenes] && (
              <>
                {React.createElement(scenes[currentScene as keyof typeof scenes].icon, { className: "w-6 h-6 text-white" })}
                <span className="text-white font-medium">{scenes[currentScene as keyof typeof scenes].name}</span>
              </>
            )}
          </div>
        </div>

        {/* Scene Selector */}
        <div className="col-span-2 grid grid-cols-4 gap-2">
          {Object.entries(scenes).map(([key, scene]) => (
            <button
              key={key}
              onClick={() => handleSceneChange(key)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                currentScene === key 
                  ? `${scene.color} text-white` 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <scene.icon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">{scene.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">System Status</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(systemStatus).map(([system, active]) => (
            <div key={system} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                {system === 'security' && <Shield className="w-4 h-4 text-green-400" />}
                {system === 'lights' && <Lightbulb className="w-4 h-4 text-yellow-400" />}
                {system === 'climate' && <Thermometer className="w-4 h-4 text-blue-400" />}
                {system === 'entertainment' && <Volume2 className="w-4 h-4 text-purple-400" />}
                <span className="text-white text-sm capitalize">{system}</span>
              </div>
              <Switch 
                checked={active} 
                onCheckedChange={(checked) => 
                  setSystemStatus(prev => ({ ...prev, [system]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Room Selection */}
      <div className="mb-4">
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
              <div className="text-xs opacity-75">{room.devices} devices</div>
            </button>
          ))}
        </div>

        {/* Room Details */}
        <div className="bg-white/5 rounded-lg p-4">
          <h5 className="text-white font-medium mb-3">{currentRoom.name} Controls</h5>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Temperature</span>
                <span className="text-white text-sm">{currentRoom.temp}°F</span>
              </div>
              <Slider
                value={[currentRoom.temp]}
                onValueChange={() => {}}
                min={60}
                max={80}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Lighting</span>
                <span className="text-white text-sm">{currentRoom.lights}%</span>
              </div>
              <Slider
                value={[currentRoom.lights]}
                onValueChange={() => {}}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm" className="flex items-center space-x-1">
          <Power className="w-4 h-4" />
          <span>All Off</span>
        </Button>
        <Button variant="secondary" size="sm" className="flex items-center space-x-1">
          <Home className="w-4 h-4" />
          <span>Lock All</span>
        </Button>
        <Button variant="secondary" size="sm" className="flex items-center space-x-1">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Button>
      </div>
    </IPadCard>
  );
};