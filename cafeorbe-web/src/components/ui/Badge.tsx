import React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "coffee" | "forest" | "earth" | "amber" | "rose" | "outline";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  dot = false,
  ...props
}) => {
  const variantStyles = {
    default: "bg-cream-200/80 text-coffee-900 border-cream-300",
    coffee: "bg-coffee-100 text-coffee-900 border-coffee-200",
    forest: "bg-forest-100 text-forest-900 border-forest-200",
    earth: "bg-earth-100 text-earth-900 border-earth-200",
    amber: "bg-amber-100 text-amber-900 border-amber-200",
    rose: "bg-rose-100 text-rose-800 border-rose-200",
    outline: "border border-coffee-200 text-coffee-800 bg-white/50",
  };

  const dotStyles = {
    default: "bg-coffee-600",
    coffee: "bg-coffee-800",
    forest: "bg-forest-600 animate-pulse",
    earth: "bg-earth-600",
    amber: "bg-amber-600 animate-pulse",
    rose: "bg-rose-600",
    outline: "bg-coffee-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[variant])} />}
      {children}
    </span>
  );
};
