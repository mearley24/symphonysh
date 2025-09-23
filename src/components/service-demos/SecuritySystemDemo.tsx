import { useState, useEffect } from 'react';
import { Shield, Camera, Lock, Unlock, Eye, AlertTriangle, CheckCircle, Home } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export const SecuritySystemDemo = () => {
  const [systemArmed, setSystemArmed] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('front-door');
  const [alerts, setAlerts] = useState<Array<{id: string, type: string, message: string, time: string}>>([]);
  const [doorLocks, setDoorLocks] = useState({
    'front-door': true,
    'back-door': true,
    'garage': false,
    'side-gate': true
  });

  const cameras = {
    'front-door': { name: 'Front Door', status: 'online', motion: false },
    'driveway': { name: 'Driveway', status: 'online', motion: true },
    'backyard': { name: 'Backyard', status: 'online', motion: false },
    'garage': { name: 'Garage', status: 'offline', motion: false },
    'living-room': { name: 'Living Room', status: 'online', motion: false }
  };

  const locks = {
    'front-door': { name: 'Front Door', battery: 85 },
    'back-door': { name: 'Back Door', battery: 92 },
    'garage': { name: 'Garage Entry', battery: 76 },
    'side-gate': { name: 'Side Gate', battery: 88 }
  };

  // Simulate alerts and motion detection
  useEffect(() => {
    const alertTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        const alertTypes = [
          { type: 'motion', message: 'Motion detected at Front Door', icon: '👁️' },
          { type: 'door', message: 'Back Door opened', icon: '🚪' },
          { type: 'system', message: 'System armed successfully', icon: '🛡️' }
        ];
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const newAlert = {
          id: Date.now().toString(),
          type: randomAlert.type,
          message: randomAlert.message,
          time: new Date().toLocaleTimeString()
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(alertTimer);
  }, []);

  const currentCamera = cameras[selectedCamera as keyof typeof cameras];

  const toggleLock = (lockId: string) => {
    setDoorLocks(prev => ({ ...prev, [lockId]: !prev[lockId as keyof typeof prev] }));
    
    const lockName = locks[lockId as keyof typeof locks].name;
    const action = doorLocks[lockId as keyof typeof doorLocks] ? 'unlocked' : 'locked';
    
    setAlerts(prev => [{
      id: Date.now().toString(),
      type: 'door',
      message: `${lockName} ${action}`,
      time: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 4)]);
  };

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Security System</h3>
        <div className="flex items-center space-x-2">
          {systemArmed ? (
            <>
              <Shield className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-xs">Armed</span>
            </>
          ) : (
            <>
              <Home className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-xs">Disarmed</span>
            </>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg transition-all duration-300 ${
          systemArmed ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Shield className={`w-6 h-6 ${systemArmed ? 'text-red-400' : 'text-green-400'}`} />
              <span className="text-white font-medium">
                System {systemArmed ? 'Armed' : 'Disarmed'}
              </span>
            </div>
            <Switch 
              checked={systemArmed} 
              onCheckedChange={setSystemArmed}
            />
          </div>
          <p className="text-gray-300 text-sm">
            {systemArmed 
              ? 'All sensors active. Motion detection enabled.' 
              : 'Home mode. Entry sensors only.'
            }
          </p>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Security Cameras</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(cameras).map(([key, camera]) => (
            <button
              key={key}
              onClick={() => setSelectedCamera(key)}
              className={`p-3 rounded-lg text-left transition-all duration-300 relative ${
                selectedCamera === key 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{camera.name}</div>
                  <div className={`text-xs ${camera.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                    {camera.status}
                  </div>
                </div>
                {camera.motion && (
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <Camera className="w-4 h-4 mt-2" />
            </button>
          ))}
        </div>

        {/* Selected Camera View */}
        <div className="bg-black rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-white font-medium">{currentCamera.name}</h5>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${currentCamera.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-gray-300 text-xs">{currentCamera.status}</span>
            </div>
          </div>
          
          <div className="aspect-video bg-gray-800 rounded flex items-center justify-center relative">
            <Camera className="w-12 h-12 text-gray-600" />
            {currentCamera.motion && (
              <div className="absolute top-2 right-2">
                <div className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                  <Eye className="w-3 h-3" />
                  <span>Motion</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
              Live View
            </div>
          </div>
        </div>
      </div>

      {/* Door Locks */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Smart Locks</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(locks).map(([key, lock]) => {
            const isLocked = doorLocks[key as keyof typeof doorLocks];
            return (
              <div key={key} className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">{lock.name}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleLock(key)}
                    className={isLocked ? 'text-red-400' : 'text-green-400'}
                  >
                    {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Battery: {lock.battery}%</span>
                  <span className={isLocked ? 'text-red-400' : 'text-green-400'}>
                    {isLocked ? 'Locked' : 'Unlocked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="mb-4">
        <h4 className="text-white font-medium mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {alerts.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm">
              No recent activity
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  {alert.type === 'motion' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                  {alert.type === 'door' && <Lock className="w-4 h-4 text-blue-400" />}
                  {alert.type === 'system' && <CheckCircle className="w-4 h-4 text-green-400" />}
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-gray-400 text-xs">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm">
          Lock All
        </Button>
        <Button variant="secondary" size="sm">
          View All
        </Button>
        <Button variant="secondary" size="sm">
          Settings
        </Button>
      </div>
    </IPadCard>
  );
};