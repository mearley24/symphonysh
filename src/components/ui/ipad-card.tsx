
import React from 'react';
import { cn } from '@/lib/utils';

interface iPadCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const iPadCard = ({ 
  children, 
  className = "", 
  onClick,
  hover = true 
}: iPadCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8",
        "border border-white/10 shadow-lg",
        hover && "transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default iPadCard;
