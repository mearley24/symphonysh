
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
        "bg-white/8 backdrop-blur-lg rounded-3xl p-6 md:p-8",
        "border border-white/15 shadow-2xl",
        "bg-gradient-to-br from-white/10 to-white/5",
        hover && "transition-all duration-500 hover:bg-white/12 hover:shadow-2xl hover:scale-[1.02] hover:border-white/25",
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
