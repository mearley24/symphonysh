import { useState } from "react";
import { ArrowLeft, Home, Lightbulb, Shield, Thermometer, Music, Settings, LayoutGrid, Clock, Cog, GripVertical } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { Control4Demo } from "../../components/service-demos/Control4Demo";
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
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const SortableTab = ({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: TabItem; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  const IconComponent = tab.icon;
  
  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all duration-300 touch-none ${
        isActive
          ? "bg-white/25 text-white shadow-lg backdrop-blur-sm"
          : "bg-white/10 text-white/80 hover:bg-white/15 backdrop-blur-sm"
      } ${isDragging ? "scale-105 shadow-xl" : ""}`}
      {...attributes}
      {...listeners}
    >
      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="text-[10px] sm:text-xs font-medium">{tab.label}</span>
    </button>
  );
};

const HomeIntegration = () => {
  const [activeTab, setActiveTab] = useState("listen");
  const [categoryTabs, setCategoryTabs] = useState<TabItem[]>([
    { id: "listen", label: "Listen", icon: Music, badge: "1 Active" },
    { id: "security", label: "Security", icon: Shield },
    { id: "comfort", label: "Comfort", icon: Thermometer },
    { id: "lighting", label: "Lighting", icon: Lightbulb, badge: "1 Light" },
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCategoryTabs((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Home Integration & Automation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes",
      "image": "/og-image.png",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "priceRange": "$$"
    },
    "description": "Professional Control4 home automation and integration services for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
    "serviceType": "Smart Home Automation"
  };

  const bottomNav = [
    { id: "home", icon: Home, label: "Home", filled: true },
    { id: "rooms", icon: LayoutGrid, label: "Rooms" },
    { id: "routines", icon: Clock, label: "Routines" },
    { id: "sessions", icon: Music, label: "Sessions" },
    { id: "services", icon: Cog, label: "Services" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4a3a8c] via-[#3d5a9c] to-[#2a6a9c] flex flex-col relative overflow-hidden">
      <SEO 
        title="Home Automation & Integration | Control4 Systems"
        description="Professional Control4 home automation and integration services. Unified smart home control for lighting, climate, security, and entertainment in Vail Valley."
        keywords="home automation, Control4, smart home integration, unified control, home systems, Vail Valley"
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      {/* Status Bar Area */}
      <div className="pt-2 px-4 flex justify-between items-center text-white/80 text-sm">
        <Link to="/services" className="flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-medium text-lg text-white">Symphony Smart Homes</span>
        <div className="w-5" />
      </div>

      {/* Draggable Category Tabs */}
      <div className="px-2 sm:px-4 py-2 sm:py-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categoryTabs.map(tab => tab.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
              {categoryTabs.map((tab) => (
                <SortableTab
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-2 sm:px-4 pb-24 overflow-y-auto">
        <Control4Demo activeTab={activeTab} />
      </div>

      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a5c]/95 to-[#1a3a5c]/80 backdrop-blur-xl border-t border-white/10">
        <div className="flex justify-around items-center py-2 sm:py-3 px-2 sm:px-4 max-w-lg mx-auto">
          {bottomNav.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-300 ${
                item.filled
                  ? "text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <item.icon 
                className={`w-5 h-5 sm:w-6 sm:h-6 ${item.filled ? "fill-white" : ""}`}
                strokeWidth={item.filled ? 0 : 1.5}
              />
              <span className="text-[10px] sm:text-xs">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Home Indicator */}
        <div className="flex justify-center pb-1.5 sm:pb-2">
          <div className="w-24 sm:w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default HomeIntegration;
