import React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  ...props
}) => {
  const variantStyles = {
    text: "h-4 w-full rounded-md",
    rectangular: "rounded-xl",
    circular: "rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-cream-200/70",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
