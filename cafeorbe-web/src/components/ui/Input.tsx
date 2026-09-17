import React from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-coffee-800 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-coffee-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-xl bg-white border border-cream-300 text-coffee-950 placeholder:text-coffee-300 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-earth-400 focus:border-transparent disabled:bg-cream-100 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-rose-400 focus:ring-rose-400",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 text-coffee-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-coffee-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
