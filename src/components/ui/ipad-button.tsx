
import React from 'react';
import { cn } from '@/lib/utils';

interface iPadButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const iPadButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = "",
  onClick,
  disabled = false,
  type = 'button'
}: iPadButtonProps) => {
  const baseClasses = "font-semibold rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1";
  
  const variants = {
    primary: "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    ghost: "hover:bg-white/10 text-white"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]"
  };

  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default iPadButton;
