import { useState, useEffect } from 'react';
import { Thermometer, Snowflake, Sun, Wind, Leaf, Clock, Home, MapPin } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

export const ClimateControlDemo = () => {
  const [selectedZone, setSelectedZone] = useState('living-room');
  const [systemMode, setSystemMode] = useState('auto');
  const [ecoMode, setEcoMode] = useState(true);
  const [schedule, setSchedule] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(72);
  const [targetTemp, setTargetTemp] = useState([72]);
  const [outsideTemp, setOutsideTemp] = useState(45);

  const zones = {
    'living-room': { 
      name: 'Living Room', 
      temp: 72, 
      target: 72, 
      humidity: 45, 
      airflow: 60,
      occupied: true 
    },
    'kitchen': { 
      name: 'Kitchen', 
      temp: 74, 
      target: 70, 
      humidity: 50, 
      airflow: 80,
      occupied: false 
    },
    'bedroom': { 
      name: 'Master Bedroom', 
      temp: 68, 
      target: 68, 
      humidity: 42, 
      airflow: 40,
      occupied: false 
    },
    'office': { 
      name: 'Home Office', 
      temp: 71, 
      target: 70, 
      humidity: 48, 
      airflow: 70,
      occupied: true 
    }
  };

  const modes = {
    heat: { name: 'Heat', icon: Sun, color: 'bg-red-500' },
    cool: { name: 'Cool', icon: Snowflake, color: 'bg-blue-500' },
    auto: { name: 'Auto', icon: Thermometer, color: 'bg-green-500' },
    off: { name: 'Off', icon: Wind, color: 'bg-gray-500' }
  };

  // Simulate temperature changes
  useEffect(() => {
    const timer = setInterval(() => {
      if (systemMode !== 'off') {
        setCurrentTemp(prev => {
          const diff = targetTemp[0] - prev;
          if (Math.abs(diff) > 0.5) {
            return prev + (diff > 0 ? 0.5 : -0.5);
          }
          return prev;
        });
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [targetTemp, systemMode]);

  const currentZone = zones[selectedZone as keyof typeof zones];
  const currentMode = modes[systemMode as keyof typeof modes];
  const tempDiff = currentTemp - targetTemp[0];

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Smart Climate Control</h3>
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-accent" />
          <span className="text-white text-sm">{currentTemp}°F</span>
        </div>
      </div>

      {/* Current Status */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Inside</span>
              <Home className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-white">{currentTemp}°F</div>
            <div className="text-xs text-gray-400">Target: {targetTemp[0]}°F</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Outside</span>
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-white">{outsideTemp}°F</div>
            <div className="text-xs text-gray-400">Partly Cloudy</div>
          </div>
        </div>

        {/* Temperature Status Indicator */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${
          Math.abs(tempDiff) < 1 
            ? 'bg-green-500/20 border-green-500/30' 
            : tempDiff > 1 
              ? 'bg-blue-500/20 border-blue-500/30' 
              : 'bg-red-500/20 border-red-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">
              {Math.abs(tempDiff) < 1 ? 'Temperature Optimal' : 
               tempDiff > 1 ? 'Cooling to Target' : 'Heating to Target'}
            </span>
            <div className={`w-2 h-2 rounded-full ${
              Math.abs(tempDiff) < 1 ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
            }`}></div>
          </div>
        </div>
      </div>

      {/* System Mode */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">System Mode</h4>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(modes).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => setSystemMode(key)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                systemMode === key 
                  ? `${mode.color} text-white` 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <mode.icon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">{mode.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Control */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-white font-medium">Target Temperature</h4>
          <span className="text-white text-lg font-semibold">{targetTemp[0]}°F</span>
        </div>
        <Slider
          value={targetTemp}
          onValueChange={setTargetTemp}
          min={60}
          max={80}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>60°F</span>
          <span>80°F</span>
        </div>
      </div>

      {/* Zone Selection */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Climate Zones</h4>
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
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{zone.name}</span>
                {zone.occupied && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              <div className="text-xs opacity-75">
                {zone.temp}°F → {zone.target}°F
              </div>
            </button>
          ))}
        </div>

        {/* Zone Details */}
        <div className="bg-white/5 rounded-lg p-4">
          <h5 className="text-white font-medium mb-3">{currentZone.name} Details</h5>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-white">{currentZone.temp}°F</div>
              <div className="text-xs text-gray-400">Current</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{currentZone.humidity}%</div>
              <div className="text-xs text-gray-400">Humidity</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{currentZone.airflow}%</div>
              <div className="text-xs text-gray-400">Airflow</div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Features */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Smart Features</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-white text-sm">Eco Mode</div>
                <div className="text-gray-400 text-xs">Save energy automatically</div>
              </div>
            </div>
            <Switch checked={ecoMode} onCheckedChange={setEcoMode} />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-white text-sm">Smart Schedule</div>
                <div className="text-gray-400 text-xs">Automated temperature control</div>
              </div>
            </div>
            <Switch checked={schedule} onCheckedChange={setSchedule} />
          </div>
        </div>
      </div>

      {/* Energy Savings */}
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3">
          <Leaf className="w-6 h-6 text-green-400" />
          <div>
            <h5 className="text-white font-medium">Today's Savings</h5>
            <p className="text-green-400 text-sm">$4.32 saved • 18% less energy</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm">
          Away Mode
        </Button>
        <Button variant="secondary" size="sm">
          Sleep Mode
        </Button>
        <Button variant="secondary" size="sm">
          Optimize
        </Button>
      </div>
    </IPadCard>
  );
};