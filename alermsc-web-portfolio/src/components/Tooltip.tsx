// Tooltip.tsx
import React from 'react';

interface TooltipProps {
  title: string;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ title, position }) => {
  return (
    <div
      className='fixed text-white bg-black px-2 py-1 rounded text-sm pointer-events-none'
      style={{
        left: position.x + 15, // Posición del tooltip relativa al cursor
        top: position.y + 15, // Posición del tooltip relativa al cursor
      }}
    >
      {title}
    </div>
  );
};

export default Tooltip;
