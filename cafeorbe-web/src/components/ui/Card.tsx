import React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white/90 backdrop-blur-sm border border-cream-200/80 rounded-2xl p-5 shadow-soft transition-all duration-300",
        hoverEffect && "hover:shadow-soft-lg hover:-translate-y-1 hover:border-earth-300/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
