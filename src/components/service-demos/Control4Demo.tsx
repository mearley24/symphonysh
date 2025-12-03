import { useState } from "react";
import { 
  Shield, Camera, Lightbulb, Thermometer, Volume2, 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Plus, Minus, Settings, Fan, GripVertical
} from "lucide-react";
import { Slider } from "../ui/slider";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Camera feed images
import cameraFrontDoor from "@/assets/camera-front-door.jpg";
import cameraGarage from "@/assets/camera-garage.jpg";
import cameraBackyard from "@/assets/camera-backyard.jpg";
import cameraSideYard from "@/assets/camera-side-yard.jpg";

interface Control4DemoProps {
  activeTab: string;
}

// Glass Card Component
const GlassCard = ({ 
  children, 
  className = "", 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
}) => (
  <div 
    className={`bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Sortable Card Wrapper
interface SortableCardProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SortableCard = ({ id, children, className = "" }: SortableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "scale-105 shadow-xl" : ""} ${className}`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-1 right-1 z-10 p-1 bg-white/10 rounded-md cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="w-3 h-3 text-white/50" />
      </div>
      {children}
    </div>
  );
};

// Media Tile
const MediaTile = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconBg,
  image
}: { 
  title: string; 
  subtitle?: string; 
  icon?: React.ComponentType<{ className?: string }>; 
  iconBg?: string;
  image?: string;
}) => (
  <GlassCard className="p-2.5 sm:p-4 flex items-center gap-2 sm:gap-3">
    {image ? (
      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    ) : Icon && (
      <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg || "bg-accent"}`}>
        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-white font-medium text-xs sm:text-sm truncate">{title}</p>
      {subtitle && <p className="text-white/60 text-[10px] sm:text-xs truncate">{subtitle}</p>}
    </div>
  </GlassCard>
);

// Security Camera Tile
const CameraTile = ({ name, location, image }: { name: string; location: string; image?: string }) => (
  <GlassCard className="aspect-video relative overflow-hidden">
    <div className="absolute inset-0">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white/30" />
        </div>
      )}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3">
      <p className="text-white text-xs sm:text-sm font-medium">{name}</p>
      <p className="text-white/60 text-[10px] sm:text-xs">{location}</p>
    </div>
    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-white/80 text-[10px] sm:text-xs">Now</span>
    </div>
  </GlassCard>
);

// Light Control Row
const LightControl = ({ 
  name, 
  icon: Icon, 
  value, 
  onChange 
}: { 
  name: string; 
  icon: React.ComponentType<{ className?: string }>; 
  value: number; 
  onChange: (val: number) => void;
}) => (
  <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3 border-b border-white/10 last:border-0">
    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${value > 0 ? "bg-yellow-500/20" : "bg-white/10"}`}>
      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${value > 0 ? "text-yellow-400" : "text-white/50"}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white text-xs sm:text-sm mb-1 sm:mb-2">{name}</p>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="bg-white/20 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs text-white min-w-[32px] sm:min-w-[40px] text-center">
          {value}
        </div>
        <Slider
          value={[value]}
          onValueChange={(v) => onChange(v[0])}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  </div>
);

// Now Playing Bar
const NowPlayingBar = () => (
  <GlassCard className="p-3 sm:p-4 mt-auto">
    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden flex-shrink-0">
        <div className="text-[8px] sm:text-xs text-white/80 text-center p-0.5 sm:p-1">
          <div className="font-bold text-[8px] sm:text-[10px]">RAINY DAYS</div>
          <div className="text-[6px] sm:text-[8px] opacity-75">ARE FOR SLEEPING</div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-xs sm:text-sm truncate">Dripping Rain on Concrete</p>
        <p className="text-white/60 text-[10px] sm:text-xs">Bed</p>
      </div>
      <button className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
      </button>
    </div>
    
    {/* Volume Control */}
    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
      <button className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
      </button>
      <div className="flex-1 bg-white/10 rounded-full h-1">
        <div className="bg-white/40 h-full w-1/3 rounded-full" />
      </div>
      <span className="text-white/60 text-[10px] sm:text-sm min-w-[40px] sm:min-w-[50px] text-center">Vol</span>
      <button className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
      </button>
    </div>
    
    {/* Playback Controls */}
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <button className="p-1.5 sm:p-2 text-white/60 hover:text-white transition-colors">
        <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button className="p-1.5 sm:p-2 text-white/80 hover:text-white transition-colors">
        <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button className="p-2 sm:p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
        <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button className="p-1.5 sm:p-2 text-white/80 hover:text-white transition-colors">
        <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button className="p-1.5 sm:p-2 text-white/60 hover:text-white transition-colors">
        <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  </GlassCard>
);

export const Control4Demo = ({ activeTab }: Control4DemoProps) => {
  const [lightLevels, setLightLevels] = useState<Record<string, number>>({
    "ceiling-fan": 0,
    "sink": 0,
    "counter": 0,
    "chandelier": 0,
    "back-porch": 0,
    "ceiling": 0,
    "guest-fan": 0,
    "hall-ceiling": 0,
    "front-exterior": 100,
  });

  const [cardOrder, setCardOrder] = useState([
    "camera-feed",
    "spotify-section",
    "devices-row1",
    "devices-row2",
    "more-sources",
  ]);

  const [securityCardOrder, setSecurityCardOrder] = useState([
    "cameras-grid",
    "security-status",
  ]);

  const [comfortCardOrder, setComfortCardOrder] = useState([
    "climate-control",
    "room-temps",
  ]);

  const [lightingCardOrder, setLightingCardOrder] = useState([
    "lighting-tabs",
    "lower-tv-lights",
    "mudroom-lights",
  ]);

  const [servicesCardOrder, setServicesCardOrder] = useState([
    "consultation-cta",
    "services-grid",
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCardDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCardOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSecurityDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSecurityCardOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleComfortDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setComfortCardOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleLightingDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLightingCardOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleServicesDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setServicesCardOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateLight = (id: string, value: number) => {
    setLightLevels(prev => ({ ...prev, [id]: value }));
  };

  const renderCard = (cardId: string) => {
    switch (cardId) {
      case "camera-feed":
        return (
          <SortableCard key={cardId} id={cardId}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <CameraTile name="Front Door" location="Now" image={cameraFrontDoor} />
              <div className="space-y-2 sm:space-y-3">
                <MediaTile title="Matt's Spotify" icon={Play} iconBg="bg-green-500" />
                <MediaTile title="Living Apple TV" subtitle="Theater" icon={Play} iconBg="bg-gray-800" />
              </div>
            </div>
          </SortableCard>
        );
      case "devices-row1":
        return (
          <SortableCard key={cardId} id={cardId}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <GlassCard className="p-2.5 sm:p-4 flex items-center justify-center gap-2 sm:gap-3">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-medium">Front Door</p>
                  <p className="text-white/60 text-[10px] sm:text-xs">Studio</p>
                </div>
              </GlassCard>
              <GlassCard className="p-2.5 sm:p-4 flex items-center justify-center gap-2 sm:gap-3">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-medium">Garage</p>
                  <p className="text-white/60 text-[10px] sm:text-xs">Studio</p>
                </div>
              </GlassCard>
            </div>
          </SortableCard>
        );
      case "devices-row2":
        return (
          <SortableCard key={cardId} id={cardId}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <GlassCard className="p-2.5 sm:p-4 flex items-center justify-center gap-2 sm:gap-3">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-medium">Backyard</p>
                  <p className="text-white/60 text-[10px] sm:text-xs">Studio</p>
                </div>
              </GlassCard>
              <MediaTile title="Daily Mix 1" subtitle="Matt's Spotify" icon={Play} iconBg="bg-purple-600" />
            </div>
          </SortableCard>
        );
      case "more-sources":
        return (
          <SortableCard key={cardId} id={cardId}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <MediaTile title="Living Fire TV" subtitle="Theater" icon={Play} iconBg="bg-orange-500" />
              <MediaTile title="Plex" subtitle="Theater" icon={Play} iconBg="bg-yellow-600" />
            </div>
          </SortableCard>
        );
      default:
        return null;
    }
  };

  if (activeTab === "listen") {
    return (
      <div className="space-y-2 sm:space-y-4 flex flex-col h-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCardDragEnd}
        >
          <SortableContext items={cardOrder} strategy={rectSortingStrategy}>
            <div className="space-y-2 sm:space-y-4">
              {cardOrder.map((cardId) => renderCard(cardId))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Now Playing - Locked at bottom */}
        <div className="mt-auto pt-2 sm:pt-4">
          <NowPlayingBar />
        </div>
      </div>
    );
  }

  if (activeTab === "security") {
    const renderSecurityCard = (cardId: string) => {
      switch (cardId) {
        case "cameras-grid":
          return (
            <SortableCard key={cardId} id={cardId}>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <CameraTile name="Front Door" location="Studio" image={cameraFrontDoor} />
                <CameraTile name="Garage" location="Studio" image={cameraGarage} />
                <CameraTile name="Backyard" location="Studio" image={cameraBackyard} />
                <CameraTile name="Side Yard" location="Studio" image={cameraSideYard} />
              </div>
            </SortableCard>
          );
        case "security-status":
          return (
            <SortableCard key={cardId} id={cardId}>
              <GlassCard className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-white font-medium text-sm sm:text-base">Security Status</h3>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
                    <span className="text-green-400 text-xs sm:text-sm">Armed</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button className="bg-green-500/20 border border-green-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-green-400 text-xs sm:text-sm font-medium hover:bg-green-500/30 transition-colors">
                    Stay
                  </button>
                  <button className="bg-white/10 border border-white/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-white text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors">
                    Away
                  </button>
                  <button className="bg-white/10 border border-white/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-white text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors">
                    Night
                  </button>
                  <button className="bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-red-400 text-xs sm:text-sm font-medium hover:bg-red-500/30 transition-colors">
                    Disarm
                  </button>
                </div>
              </GlassCard>
            </SortableCard>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-2 sm:space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleSecurityDragEnd}
        >
          <SortableContext items={securityCardOrder} strategy={rectSortingStrategy}>
            <div className="space-y-2 sm:space-y-4">
              {securityCardOrder.map((cardId) => renderSecurityCard(cardId))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  if (activeTab === "comfort") {
    const renderComfortCard = (cardId: string) => {
      switch (cardId) {
        case "climate-control":
          return (
            <SortableCard key={cardId} id={cardId}>
              <GlassCard className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-white font-medium text-sm sm:text-base">Climate Control</h3>
                  <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                
                <div className="text-center py-3 sm:py-6">
                  <div className="text-4xl sm:text-6xl font-light text-white mb-1 sm:mb-2">72°</div>
                  <p className="text-white/60 text-xs sm:text-sm">Current Temperature</p>
                </div>
                
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors">
                    <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <div className="text-center">
                    <p className="text-white text-xl sm:text-2xl font-medium">70°</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">Set Point</p>
                  </div>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-white text-xs sm:text-sm hover:bg-white/20 transition-colors">
                    <Fan className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-0.5 sm:mb-1" />
                    Auto
                  </button>
                  <button className="bg-blue-500/20 border border-blue-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 text-blue-400 text-xs sm:text-sm">
                    <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-0.5 sm:mb-1" />
                    Cool
                  </button>
                  <button className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-white text-xs sm:text-sm hover:bg-white/20 transition-colors">
                    <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-0.5 sm:mb-1" />
                    Heat
                  </button>
                </div>
              </GlassCard>
            </SortableCard>
          );
        case "room-temps":
          return (
            <SortableCard key={cardId} id={cardId}>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { room: "Living Room", temp: 72 },
                  { room: "Kitchen", temp: 71 },
                  { room: "Master Bedroom", temp: 68 },
                  { room: "Office", temp: 70 },
                ].map((item) => (
                  <GlassCard key={item.room} className="p-2.5 sm:p-4">
                    <p className="text-white/60 text-[10px] sm:text-xs mb-0.5 sm:mb-1">{item.room}</p>
                    <p className="text-white text-xl sm:text-2xl font-medium">{item.temp}°</p>
                  </GlassCard>
                ))}
              </div>
            </SortableCard>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-2 sm:space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleComfortDragEnd}
        >
          <SortableContext items={comfortCardOrder} strategy={rectSortingStrategy}>
            <div className="space-y-2 sm:space-y-4">
              {comfortCardOrder.map((cardId) => renderComfortCard(cardId))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  if (activeTab === "lighting") {
    const renderLightingCard = (cardId: string) => {
      switch (cardId) {
        case "lighting-tabs":
          return (
            <SortableCard key={cardId} id={cardId}>
              <div className="flex gap-3 sm:gap-4 border-b border-white/20 pb-2">
                <button className="text-white font-medium text-xs sm:text-sm border-b-2 border-white pb-2">Lights</button>
                <button className="text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm pb-2">Scenes</button>
              </div>
            </SortableCard>
          );
        case "lower-tv-lights":
          return (
            <SortableCard key={cardId} id={cardId}>
              <div>
                <h4 className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3">LOWER TV</h4>
                <GlassCard className="p-2.5 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6">
                    <LightControl 
                      name="Ceiling Fan" 
                      icon={Fan} 
                      value={lightLevels["ceiling-fan"]} 
                      onChange={(v) => updateLight("ceiling-fan", v)} 
                    />
                    <LightControl 
                      name="Sink" 
                      icon={Lightbulb} 
                      value={lightLevels["sink"]} 
                      onChange={(v) => updateLight("sink", v)} 
                    />
                    <LightControl 
                      name="Counter" 
                      icon={Lightbulb} 
                      value={lightLevels["counter"]} 
                      onChange={(v) => updateLight("counter", v)} 
                    />
                    <LightControl 
                      name="Chandelier" 
                      icon={Lightbulb} 
                      value={lightLevels["chandelier"]} 
                      onChange={(v) => updateLight("chandelier", v)} 
                    />
                  </div>
                </GlassCard>
              </div>
            </SortableCard>
          );
        case "mudroom-lights":
          return (
            <SortableCard key={cardId} id={cardId}>
              <div>
                <h4 className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3">MUDROOM</h4>
                <GlassCard className="p-2.5 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6">
                    <LightControl 
                      name="Hall Ceiling" 
                      icon={Lightbulb} 
                      value={lightLevels["hall-ceiling"]} 
                      onChange={(v) => updateLight("hall-ceiling", v)} 
                    />
                    <LightControl 
                      name="Ceiling" 
                      icon={Lightbulb} 
                      value={lightLevels["ceiling"]} 
                      onChange={(v) => updateLight("ceiling", v)} 
                    />
                    <LightControl 
                      name="Front Exterior" 
                      icon={Lightbulb} 
                      value={lightLevels["front-exterior"]} 
                      onChange={(v) => updateLight("front-exterior", v)} 
                    />
                  </div>
                </GlassCard>
              </div>
            </SortableCard>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-2 sm:space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleLightingDragEnd}
        >
          <SortableContext items={lightingCardOrder} strategy={rectSortingStrategy}>
            <div className="space-y-2 sm:space-y-4">
              {lightingCardOrder.map((cardId) => renderLightingCard(cardId))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  // Services tab
  const renderServicesCard = (cardId: string) => {
    switch (cardId) {
      case "consultation-cta":
        return (
          <SortableCard key={cardId} id={cardId}>
            <GlassCard className="p-4 sm:p-6 text-center">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-white text-lg sm:text-xl font-medium mb-1 sm:mb-2">Professional Installation</h3>
              <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4">
                Experience the full Control4 ecosystem with professional installation from Symphony Smart Homes.
              </p>
              <button className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm font-medium transition-colors">
                Schedule Consultation
              </button>
            </GlassCard>
          </SortableCard>
        );
      case "services-grid":
        return (
          <SortableCard key={cardId} id={cardId}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { title: "Lighting", desc: "Smart scenes & schedules", icon: Lightbulb },
                { title: "Climate", desc: "Energy-efficient comfort", icon: Thermometer },
                { title: "Security", desc: "Cameras & monitoring", icon: Shield },
                { title: "Audio/Video", desc: "Multi-room entertainment", icon: Volume2 },
              ].map((service) => (
                <GlassCard key={service.title} className="p-3 sm:p-4">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2 sm:mb-3" />
                  <h4 className="text-white font-medium text-xs sm:text-sm">{service.title}</h4>
                  <p className="text-white/60 text-[10px] sm:text-xs">{service.desc}</p>
                </GlassCard>
              ))}
            </div>
          </SortableCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 sm:space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleServicesDragEnd}
      >
        <SortableContext items={servicesCardOrder} strategy={rectSortingStrategy}>
          <div className="space-y-2 sm:space-y-4">
            {servicesCardOrder.map((cardId) => renderServicesCard(cardId))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Control4Demo;
