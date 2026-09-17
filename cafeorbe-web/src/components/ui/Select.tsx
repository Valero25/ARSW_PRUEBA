import React from "react";
import { cn } from "../../utils/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-coffee-800 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "w-full rounded-xl bg-white border border-cream-300 text-coffee-950 px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-earth-400 focus:border-transparent disabled:bg-cream-100 disabled:cursor-not-allowed appearance-none cursor-pointer",
            error && "border-rose-400 focus:ring-rose-400",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-rose-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
