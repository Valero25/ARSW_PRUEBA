import React from "react";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "forest" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      icon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-coffee-900 text-cream-50 hover:bg-coffee-800 focus:ring-coffee-700 shadow-sm hover:shadow-soft",
      secondary:
        "bg-earth-500 text-white hover:bg-earth-600 focus:ring-earth-400 shadow-sm",
      forest:
        "bg-forest-800 text-cream-50 hover:bg-forest-700 focus:ring-forest-600 shadow-sm",
      outline:
        "border border-coffee-200 text-coffee-900 bg-white/70 hover:bg-cream-100 focus:ring-coffee-500",
      ghost:
        "text-coffee-800 hover:bg-cream-200/50 focus:ring-coffee-400",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
