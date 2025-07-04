
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
  const baseClasses = "font-semibold rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white shadow-xl hover:shadow-2xl border-accent/20 hover:border-accent/30",
    secondary: "bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-white/30 backdrop-blur-sm",
    ghost: "hover:bg-white/10 text-white border-transparent hover:border-white/20"
  };
  
  const sizes = {
    sm: "px-6 py-3 text-sm min-h-[44px]",
    md: "px-8 py-4 text-base min-h-[52px]",
    lg: "px-10 py-5 text-lg min-h-[60px]"
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
