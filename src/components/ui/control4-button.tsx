import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const control4ButtonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl",
    "text-sm font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95"
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-blue-600 to-blue-700",
          "text-white shadow-lg shadow-blue-600/25",
          "hover:from-blue-500 hover:to-blue-600",
          "hover:shadow-xl hover:shadow-blue-600/30",
          "border border-blue-500/20"
        ],
        secondary: [
          "bg-slate-800/80 text-slate-200",
          "border border-slate-600/50 shadow-md",
          "hover:bg-slate-700/80 hover:border-slate-500/60",
          "hover:shadow-lg backdrop-blur-sm"
        ],
        glass: [
          "bg-white/10 text-white border border-white/20",
          "backdrop-blur-xl shadow-lg shadow-black/25",
          "hover:bg-white/15 hover:border-white/30",
          "hover:shadow-xl"
        ],
        accent: [
          "bg-gradient-to-r from-purple-600 to-indigo-600",
          "text-white shadow-lg shadow-purple-600/25",
          "hover:from-purple-500 hover:to-indigo-500",
          "hover:shadow-xl hover:shadow-purple-600/30",
          "border border-purple-500/20"
        ],
        danger: [
          "bg-gradient-to-r from-red-600 to-red-700",
          "text-white shadow-lg shadow-red-600/25",
          "hover:from-red-500 hover:to-red-600",
          "hover:shadow-xl hover:shadow-red-600/30",
          "border border-red-500/20"
        ],
        ghost: [
          "text-slate-300 hover:text-white",
          "hover:bg-slate-800/40",
          "transition-colors"
        ]
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg"
      },
      glow: {
        true: "shadow-2xl",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: false
    }
  }
);

export interface Control4ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof control4ButtonVariants> {
  asChild?: boolean;
}

const Control4Button = React.forwardRef<HTMLButtonElement, Control4ButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(control4ButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Control4Button.displayName = "Control4Button";

export { Control4Button, control4ButtonVariants };