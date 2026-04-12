import { useState } from 'react';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { iPadCard as IPadCard } from '../ui/ipad-card';

interface LightingFixture {
  id: string;
  name: string;
  type: 'recessed' | 'pendant' | 'sconce' | 'keypad' | 'strip' | 'chandelier';
  brand: string;
  wattage: number;
  lumens: number;
  colorTemp: string;
  dimmable: boolean;
  price: number;
  features: string[];
}

interface LightingFixtureLibraryProps {
  onFixtureSelect: (fixture: LightingFixture) => void;
  selectedFixtures: string[];
}

// 2D Fixture Representation Component
const FixtureIcon = ({ type, color = '#ffffff' }: { type: string; color?: string }) => {
  const getFixtureDisplay = () => {
    switch (type) {
      case 'recessed':
        return (
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
              <div className="w-8 h-8 rounded-full bg-yellow-300 shadow-lg" style={{ backgroundColor: color }}></div>
            </div>
            <div className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white px-1 rounded">LED</div>
          </div>
        );
      case 'pendant':
        return (
          <div className="relative">
            <div className="w-16 h-20 flex flex-col items-center">
              <div className="w-1 h-6 bg-gray-400"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-300 to-gray-600 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
              </div>
            </div>
          </div>
        );
      case 'sconce':
        return (
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg flex items-center justify-center">
              <div className="w-8 h-2 rounded" style={{ backgroundColor: color }}></div>
            </div>
          </div>
        );
      case 'keypad':
        return (
          <div className="relative">
            <div className="w-16 h-20 bg-gray-800 rounded-lg p-2 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <div className="w-3 h-3 bg-red-400 rounded"></div>
              </div>
              <div className="text-xs text-center text-gray-300">CTRL</div>
            </div>
          </div>
        );
      case 'strip':
        return (
          <div className="relative">
            <div className="w-16 h-4 bg-gray-700 rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.8 }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
            </div>
          </div>
        );
      case 'chandelier':
        return (
          <div className="relative">
            <div className="w-16 h-20 flex flex-col items-center">
              <div className="w-1 h-4 bg-gray-400"></div>
              <div className="relative">
                <div className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
                </div>
                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-yellow-300"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-300"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-yellow-300"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-yellow-300"></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }}></div>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {getFixtureDisplay()}
    </div>
  );
};

export const LightingFixtureLibrary = ({ onFixtureSelect, selectedFixtures }: LightingFixtureLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');
  const [previewFixture, setPreviewFixture] = useState<LightingFixture | null>(null);

  const fixtures: LightingFixture[] = [
    {
      id: 'rec-1',
      name: 'Ultra Slim LED Recessed Light',
      type: 'recessed',
      brand: 'Philips Hue',
      wattage: 9,
      lumens: 800,
      colorTemp: '2200K-6500K',
      dimmable: true,
      price: 49.99,
      features: ['Color Changing', 'Smart Control', 'Energy Star']
    },
    {
      id: 'pen-1',
      name: 'Modern Glass Pendant',
      type: 'pendant',
      brand: 'LIFX',
      wattage: 11,
      lumens: 1100,
      colorTemp: '2500K-9000K',
      dimmable: true,
      price: 89.99,
      features: ['WiFi Built-in', '16M Colors', 'Voice Control']
    },
    {
      id: 'sco-1',
      name: 'Architectural Wall Sconce',
      type: 'sconce',
      brand: 'Lutron',
      wattage: 8,
      lumens: 600,
      colorTemp: '3000K',
      dimmable: true,
      price: 129.99,
      features: ['Tunable White', 'Motion Sensor', 'Weather Resistant']
    },
    {
      id: 'key-1',
      name: 'Caseta Smart Keypad',
      type: 'keypad',
      brand: 'Lutron',
      wattage: 0,
      lumens: 0,
      colorTemp: 'N/A',
      dimmable: false,
      price: 79.99,
      features: ['6 Button Control', 'Wireless', 'Programmable Scenes']
    },
    {
      id: 'str-1',
      name: 'Flexible LED Light Strip',
      type: 'strip',
      brand: 'Govee',
      wattage: 24,
      lumens: 1600,
      colorTemp: '2700K-6500K',
      dimmable: true,
      price: 34.99,
      features: ['Cuttable', 'Adhesive Backing', 'Music Sync']
    },
    {
      id: 'cha-1',
      name: 'Smart Crystal Chandelier',
      type: 'chandelier',
      brand: 'Nanoleaf',
      wattage: 60,
      lumens: 4800,
      colorTemp: '1200K-6500K',
      dimmable: true,
      price: 299.99,
      features: ['Modular Design', 'Touch Sensitive', 'App Control']
    }
  ];

  const categories = ['all', 'recessed', 'pendant', 'sconce', 'keypad', 'strip', 'chandelier'];

  const filteredFixtures = fixtures.filter(fixture => {
    const matchesSearch = fixture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fixture.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fixture.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <IPadCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Lighting Fixture Library</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === '3d' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('3d')}
            >
              3D
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search fixtures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </IPadCard>

      {/* Fixture Display */}
      <IPadCard className="p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFixtures.map((fixture) => (
              <div
                key={fixture.id}
                className={`bg-white/5 rounded-lg p-4 border transition-all duration-300 cursor-pointer ${
                  selectedFixtures.includes(fixture.id)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-white/30'
                }`}
                onClick={() => onFixtureSelect(fixture)}
              >
                <div className="flex justify-between items-start mb-3">
                  <FixtureIcon type={fixture.type} color={fixture.type === 'keypad' ? '#4F46E5' : '#FFE4B5'} />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewFixture(fixture);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                <h4 className="text-white font-medium text-sm mb-1">{fixture.name}</h4>
                <p className="text-gray-400 text-xs mb-2">{fixture.brand}</p>

                <div className="grid grid-cols-2 gap-1 text-xs mb-3">
                  <div>
                    <span className="text-gray-400">Power:</span>
                    <span className="text-white ml-1">{fixture.wattage}W</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Output:</span>
                    <span className="text-white ml-1">{fixture.lumens}lm</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Color Temp:</span>
                    <span className="text-white ml-1">{fixture.colorTemp}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {fixture.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">${fixture.price}</span>
                  <Button size="sm" variant="secondary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFixtures.map((fixture) => (
              <div key={fixture.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium text-sm mb-2">{fixture.name}</h4>
                <div className="h-40 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FixtureIcon type={fixture.type} color={fixture.type === 'keypad' ? '#4F46E5' : '#FFE4B5'} />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{fixture.brand}</span>
                  <Button size="sm" onClick={() => onFixtureSelect(fixture)}>
                    Select
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </IPadCard>

      {/* Preview Modal */}
      {previewFixture && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white text-lg font-semibold">{previewFixture.name}</h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPreviewFixture(null)}
                >
                  ×
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-60 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FixtureIcon type={previewFixture.type} color={previewFixture.type === 'keypad' ? '#4F46E5' : '#FFE4B5'} />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Brand:</span>
                        <span className="text-white">{previewFixture.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Power:</span>
                        <span className="text-white">{previewFixture.wattage}W</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lumens:</span>
                        <span className="text-white">{previewFixture.lumens}lm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Color Temp:</span>
                        <span className="text-white">{previewFixture.colorTemp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Dimmable:</span>
                        <span className="text-white">{previewFixture.dimmable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewFixture.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white text-lg font-semibold">${previewFixture.price}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        onFixtureSelect(previewFixture);
                        setPreviewFixture(null);
                      }}
                    >
                      Add to Floor Plan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};