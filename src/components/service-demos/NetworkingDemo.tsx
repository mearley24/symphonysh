import { useState, useEffect } from 'react';
import { Wifi, Router, Smartphone, Laptop, Tv, Shield, Activity, Settings } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export const NetworkingDemo = () => {
  const [selectedDevice, setSelectedDevice] = useState('router-main');
  const [guestNetwork, setGuestNetwork] = useState(true);
  const [parentalControls, setParentalControls] = useState(false);
  const [networkLoad, setNetworkLoad] = useState(45);

  const devices = {
    'router-main': {
      name: 'Main Router',
      type: 'router',
      icon: Router,
      status: 'online',
      bandwidth: '1 Gbps',
      connected: 24,
      location: 'Network Closet'
    },
    'ap-living': {
      name: 'Living Room AP',
      type: 'access-point',
      icon: Wifi,
      status: 'online',
      bandwidth: '867 Mbps',
      connected: 8,
      location: 'Living Room'
    },
    'ap-bedroom': {
      name: 'Master Bedroom AP',
      type: 'access-point',
      icon: Wifi,
      status: 'online',
      bandwidth: '867 Mbps',
      connected: 4,
      location: 'Master Bedroom'
    },
    'switch-main': {
      name: 'Main Switch',
      type: 'switch',
      icon: Activity,
      status: 'online',
      bandwidth: '1 Gbps',
      connected: 12,
      location: 'Network Closet'
    }
  };

  const connectedDevices = [
    { name: 'iPhone 14 Pro', type: 'smartphone', icon: Smartphone, signal: 95, bandwidth: '150 Mbps' },
    { name: 'MacBook Pro', type: 'laptop', icon: Laptop, signal: 88, bandwidth: '300 Mbps' },
    { name: 'Apple TV 4K', type: 'streaming', icon: Tv, signal: 92, bandwidth: '80 Mbps' },
    { name: 'iPad Air', type: 'tablet', icon: Smartphone, signal: 90, bandwidth: '120 Mbps' },
    { name: 'Smart Thermostat', type: 'iot', icon: Settings, signal: 75, bandwidth: '5 Mbps' },
    { name: 'Security Cameras', type: 'security', icon: Shield, signal: 85, bandwidth: '45 Mbps' }
  ];

  // Simulate network activity
  useEffect(() => {
    const timer = setInterval(() => {
      setNetworkLoad(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(20, Math.min(90, prev + change));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentDevice = devices[selectedDevice as keyof typeof devices];
  const getSignalStrength = (signal: number) => {
    if (signal >= 80) return { bars: 4, color: 'text-green-400' };
    if (signal >= 60) return { bars: 3, color: 'text-yellow-400' };
    if (signal >= 40) return { bars: 2, color: 'text-orange-400' };
    return { bars: 1, color: 'text-red-400' };
  };

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Network Management</h3>
        <div className="flex items-center space-x-2">
          <Wifi className="w-5 h-5 text-green-400" />
          <span className="text-green-400 text-xs">All Systems Online</span>
        </div>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Network Load</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{Math.round(networkLoad)}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                networkLoad > 80 ? 'bg-red-500' : networkLoad > 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${networkLoad}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Connected Devices</span>
            <Smartphone className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{connectedDevices.length + 18}</div>
          <div className="text-xs text-gray-400">{connectedDevices.length} active now</div>
        </div>
      </div>

      {/* Network Infrastructure */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Network Infrastructure</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(devices).map(([key, device]) => (
            <button
              key={key}
              onClick={() => setSelectedDevice(key)}
              className={`p-3 rounded-lg text-left transition-all duration-300 ${
                selectedDevice === key 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <device.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{device.name}</span>
              </div>
              <div className="text-xs opacity-75">{device.connected} connected</div>
            </button>
          ))}
        </div>

        {/* Device Details */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-white font-medium">{currentDevice.name}</h5>
            <div className={`w-2 h-2 rounded-full ${
              currentDevice.status === 'online' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Location:</span>
              <span className="text-white ml-2">{currentDevice.location}</span>
            </div>
            <div>
              <span className="text-gray-400">Bandwidth:</span>
              <span className="text-white ml-2">{currentDevice.bandwidth}</span>
            </div>
            <div>
              <span className="text-gray-400">Connected:</span>
              <span className="text-white ml-2">{currentDevice.connected} devices</span>
            </div>
            <div>
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 ml-2 capitalize">{currentDevice.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Devices */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Connected Devices</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {connectedDevices.map((device, index) => {
            const signal = getSignalStrength(device.signal);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <device.icon className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-white text-sm">{device.name}</div>
                    <div className="text-gray-400 text-xs">{device.bandwidth}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex space-x-1 ${signal.color}`}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-current rounded-full ${
                          i < signal.bars ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{ height: `${(i + 1) * 3 + 2}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{device.signal}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network Features */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Network Features</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-white text-sm">Guest Network</div>
                <div className="text-gray-400 text-xs">Separate network for visitors</div>
              </div>
            </div>
            <Switch checked={guestNetwork} onCheckedChange={setGuestNetwork} />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-white text-sm">Parental Controls</div>
                <div className="text-gray-400 text-xs">Content filtering and time limits</div>
              </div>
            </div>
            <Switch checked={parentalControls} onCheckedChange={setParentalControls} />
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-white">99.9%</div>
            <div className="text-xs text-blue-400">Uptime</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">847</div>
            <div className="text-xs text-blue-400">Mbps Avg</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">12ms</div>
            <div className="text-xs text-blue-400">Latency</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm">
          Speed Test
        </Button>
        <Button variant="secondary" size="sm">
          Optimize
        </Button>
        <Button variant="secondary" size="sm">
          Settings
        </Button>
      </div>
    </IPadCard>
  );
};