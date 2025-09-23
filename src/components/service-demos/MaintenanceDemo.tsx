import { useState, useEffect } from 'react';
import { Wrench, CheckCircle, AlertTriangle, Clock, Zap, Wifi, Shield, Calendar } from 'lucide-react';
import { iPadCard as IPadCard } from '../ui/ipad-card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export const MaintenanceDemo = () => {
  const [systemHealth, setSystemHealth] = useState(92);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [monitoring, setMonitoring] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState('lighting');

  const systems = {
    lighting: {
      name: 'Smart Lighting',
      icon: Zap,
      status: 'healthy',
      health: 95,
      lastUpdate: '2 days ago',
      devices: 24,
      issues: 0
    },
    security: {
      name: 'Security System',
      icon: Shield,
      status: 'healthy',
      health: 98,
      lastUpdate: '1 day ago',
      devices: 12,
      issues: 0
    },
    network: {
      name: 'Network',
      icon: Wifi,
      status: 'warning',
      health: 85,
      lastUpdate: '5 days ago',
      devices: 48,
      issues: 2
    },
    hvac: {
      name: 'Climate Control',
      icon: Clock,
      status: 'healthy',
      health: 90,
      lastUpdate: '3 days ago',
      devices: 8,
      issues: 1
    }
  };

  const recentTasks = [
    {
      id: 1,
      task: 'Updated lighting controller firmware',
      status: 'completed',
      time: '2 hours ago',
      system: 'lighting'
    },
    {
      id: 2,
      task: 'Performed network optimization',
      status: 'completed',
      time: '1 day ago',
      system: 'network'
    },
    {
      id: 3,
      task: 'Security camera health check',
      status: 'completed',
      time: '2 days ago',
      system: 'security'
    },
    {
      id: 4,
      task: 'HVAC filter replacement reminder',
      status: 'pending',
      time: 'Due in 3 days',
      system: 'hvac'
    }
  ];

  const upcomingMaintenance = [
    {
      id: 1,
      task: 'Quarterly system health report',
      date: 'Dec 15, 2024',
      priority: 'medium'
    },
    {
      id: 2,
      task: 'Security system annual inspection',
      date: 'Jan 8, 2025',
      priority: 'high'
    },
    {
      id: 3,
      task: 'Network equipment firmware updates',
      date: 'Dec 20, 2024',
      priority: 'low'
    }
  ];

  // Simulate system health changes
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemHealth(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(85, Math.min(99, prev + change));
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSystem = systems[selectedSystem as keyof typeof systems];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">System Maintenance</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${systemHealth > 90 ? 'bg-green-400' : systemHealth > 75 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
          <span className={systemHealth > 90 ? 'text-green-400' : systemHealth > 75 ? 'text-yellow-400' : 'text-red-400'}>
            {Math.round(systemHealth)}% Health
          </span>
        </div>
      </div>

      {/* Overall System Health */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">System Overview</h4>
            <Wrench className="w-5 h-5 text-green-400" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{Math.round(systemHealth)}%</div>
              <div className="text-xs text-gray-400">Overall Health</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">92</div>
              <div className="text-xs text-gray-400">Total Devices</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-gray-400">Active Issues</div>
            </div>
          </div>
        </div>

        {/* System Health Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ${getHealthColor(systemHealth)}`}
            style={{ width: `${systemHealth}%` }}
          ></div>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">System Status</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(systems).map(([key, system]) => (
            <button
              key={key}
              onClick={() => setSelectedSystem(key)}
              className={`p-3 rounded-lg text-left transition-all duration-300 ${
                selectedSystem === key 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <system.icon className="w-4 h-4" />
                <div className={`w-2 h-2 rounded-full ${
                  system.status === 'healthy' ? 'bg-green-400' : 
                  system.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
              </div>
              <div className="text-sm font-medium">{system.name}</div>
              <div className="text-xs opacity-75">{system.health}% • {system.devices} devices</div>
            </button>
          ))}
        </div>

        {/* Selected System Details */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-white font-medium">{currentSystem.name}</h5>
            <div className={`text-sm ${getStatusColor(currentSystem.status)} capitalize`}>
              {currentSystem.status}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span className="text-gray-400">Health:</span>
              <span className="text-white ml-2">{currentSystem.health}%</span>
            </div>
            <div>
              <span className="text-gray-400">Devices:</span>
              <span className="text-white ml-2">{currentSystem.devices}</span>
            </div>
            <div>
              <span className="text-gray-400">Issues:</span>
              <span className="text-white ml-2">{currentSystem.issues}</span>
            </div>
            <div>
              <span className="text-gray-400">Last Update:</span>
              <span className="text-white ml-2">{currentSystem.lastUpdate}</span>
            </div>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getHealthColor(currentSystem.health)}`}
              style={{ width: `${currentSystem.health}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Maintenance Settings */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Maintenance Settings</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-white text-sm">Auto Updates</div>
                <div className="text-gray-400 text-xs">Automatic system updates</div>
              </div>
            </div>
            <Switch checked={autoUpdates} onCheckedChange={setAutoUpdates} />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="text-white text-sm">24/7 Monitoring</div>
                <div className="text-gray-400 text-xs">Continuous system monitoring</div>
              </div>
            </div>
            <Switch checked={monitoring} onCheckedChange={setMonitoring} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Recent Activity</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                {task.status === 'completed' ? 
                  <CheckCircle className="w-4 h-4 text-green-400" /> : 
                  <Clock className="w-4 h-4 text-yellow-400" />
                }
                <div>
                  <div className="text-white text-sm">{task.task}</div>
                  <div className="text-gray-400 text-xs">{task.time}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                task.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {task.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="mb-4">
        <h4 className="text-white font-medium mb-3">Upcoming Maintenance</h4>
        <div className="space-y-2">
          {upcomingMaintenance.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white text-sm">{item.task}</div>
                  <div className="text-gray-400 text-xs">{item.date}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {item.priority}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="secondary" size="sm">
          Run Diagnostics
        </Button>
        <Button variant="secondary" size="sm">
          Schedule Service
        </Button>
        <Button variant="secondary" size="sm">
          Support
        </Button>
      </div>
    </IPadCard>
  );
};