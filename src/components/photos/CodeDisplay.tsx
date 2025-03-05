
import React from 'react';
import { GalleryType } from './SortablePhoto';

interface CodeDisplayProps {
  photos: Record<GalleryType, string[]>;
  showCode: boolean;
}

const CodeDisplay = ({ photos, showCode }: CodeDisplayProps) => {
  if (!showCode) return null;

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

  return (
    <div className="mb-8 p-4 bg-gray-900 rounded-lg overflow-auto">
      <h2 className="text-lg font-medium mb-2">Copy this code to update wiring.ts:</h2>
      <pre className="text-sm text-gray-300 overflow-x-auto p-4 bg-black rounded">
        {generateWiringTsCode()}
      </pre>
      <p className="mt-4 text-sm text-gray-400">Replace the entire content of the wiring.ts file with this code.</p>
    </div>
  );
};

export default CodeDisplay;
