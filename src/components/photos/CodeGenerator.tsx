
import React from 'react';
import { Button } from "../ui/button";
import { Code } from 'lucide-react';
import { cn } from '../../lib/utils';
import { toast } from "../../hooks/use-toast";
import { GalleryType } from './SortablePhoto';

interface CodeGeneratorProps {
  photos: Record<GalleryType, string[]>;
  hasChanges: boolean;
  onShowCode: () => void;
}

const CodeGenerator = ({ photos, hasChanges, onShowCode }: CodeGeneratorProps) => {
  // Generate code for updating wiring.ts
  const generateWiringTsCode = () => {
    return `
// Wiring Gallery
export const wiringPhotos = {
  general: [
${photos.general.map(photo => `    "${photo}",`).join('\n')}
  ],
  rackWiring: [
${photos.rackWiring.map(photo => `    "${photo}",`).join('\n')}
  ],
  shadeWiring: [
${photos.shadeWiring.map(photo => `    "${photo}",`).join('\n')}
  ]
};`;
  };

  // Save changes - now only generates code, doesn't use localStorage
  const saveChanges = () => {
    onShowCode();
    toast({
      title: "Code generated!",
      description: "Copy the code below to update wiring.ts directly.",
    });
  };

  return (
    <>
      <Button 
        variant="default" 
        onClick={saveChanges}
        disabled={!hasChanges}
        className={cn(!hasChanges && "opacity-50")}
      >
        <Code className="mr-2 w-4 h-4" />
        Generate Code
      </Button>
    </>
  );
};

export default CodeGenerator;
