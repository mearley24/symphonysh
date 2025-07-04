
import React from 'react';
import { cn } from '@/lib/utils';

interface iPadGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const iPadGrid = ({ 
  children, 
  columns = 2, 
  gap = 'md',
  className = ""
}: iPadGridProps) => {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };
  
  const gaps = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6"
  };

  return (
    <div className={cn(
      "grid",
      gridColumns[columns],
      gaps[gap],
      className
    )}>
      {children}
    </div>
  );
};

export default iPadGrid;
