import * as React from "react";
import { cn } from "../../lib/utils";

export interface Control4CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated";
  glow?: boolean;
}

const Control4Card = React.forwardRef<HTMLDivElement, Control4CardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "rounded-2xl border transition-all duration-300",
          
          // Variant styles
          variant === "default" && [
            "bg-slate-900/80 border-slate-700/50",
            "backdrop-blur-xl",
            "shadow-lg shadow-black/25"
          ],
          
          variant === "glass" && [
            "bg-white/5 border-white/10",
            "backdrop-blur-2xl",
            "shadow-2xl shadow-black/40"
          ],
          
          variant === "elevated" && [
            "bg-gradient-to-br from-slate-800/90 to-slate-900/90",
            "border-slate-600/30",
            "backdrop-blur-xl",
            "shadow-xl shadow-black/30"
          ],
          
          // Glow effect
          glow && [
            "ring-1 ring-blue-500/20",
            "shadow-blue-500/10 shadow-2xl"
          ],
          
          // Hover effects
          "hover:border-slate-600/60 hover:shadow-xl",
          "hover:shadow-black/40 hover:scale-[1.02]",
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Control4Card.displayName = "Control4Card";

export { Control4Card };