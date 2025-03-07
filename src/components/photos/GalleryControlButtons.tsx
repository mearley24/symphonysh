
import React from 'react';
import { Link } from 'react-router-dom';
import { GripVertical, Save, Settings } from 'lucide-react';
import { Button } from '../ui/button';

interface GalleryControlButtonsProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isLovableDevEnvironment: boolean;
}

const GalleryControlButtons = ({ 
  isEditMode, 
  toggleEditMode, 
  isLovableDevEnvironment 
}: GalleryControlButtonsProps) => {
  if (!isLovableDevEnvironment) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button 
        variant={isEditMode ? "default" : "outline"} 
        size="sm" 
        className="text-white" 
        onClick={toggleEditMode}
      >
        {isEditMode ? (
          <>
            <Save className="mr-2 w-4 h-4" />
            Save Order
          </>
        ) : (
          <>
            <GripVertical className="mr-2 w-4 h-4" />
            Reorder Photos
          </>
        )}
      </Button>
      
      <Link to="/photos/wiring-manager">
        <Button variant="outline" size="sm" className="text-white">
          <Settings className="mr-2 w-4 h-4" />
          Manage Photos
        </Button>
      </Link>
    </div>
  );
};

export default GalleryControlButtons;
