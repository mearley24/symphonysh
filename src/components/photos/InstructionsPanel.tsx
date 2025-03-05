
import React from 'react';

const InstructionsPanel = () => {
  return (
    <div className="mt-8 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-medium mb-2">Instructions:</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Drag and drop photos to reorder them within a gallery.</li>
        <li>Use the buttons that appear when hovering a photo to move it to another gallery.</li>
        <li>Click "Generate Code" when you're done to generate the code to update wiring.ts.</li>
        <li>Copy the generated code and replace the contents of wiring.ts with it.</li>
      </ol>
    </div>
  );
};

export default InstructionsPanel;
