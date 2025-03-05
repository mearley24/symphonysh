
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { GalleryType } from './SortablePhoto';

interface GalleryTabsProps {
  photos: Record<GalleryType, string[]>;
  activeTab: GalleryType;
  onTabChange: (value: GalleryType) => void;
  children: React.ReactNode;
}

const GalleryTabs = ({ photos, activeTab, onTabChange, children }: GalleryTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as GalleryType)}>
      <TabsList className="mb-6">
        <TabsTrigger value="general">General Wiring ({photos.general.length})</TabsTrigger>
        <TabsTrigger value="rackWiring">Rack Wiring ({photos.rackWiring.length})</TabsTrigger>
        <TabsTrigger value="shadeWiring">Shade Wiring ({photos.shadeWiring.length})</TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default GalleryTabs;
