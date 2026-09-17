import React from "react";
import { Coffee } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white/60 rounded-2xl border border-dashed border-cream-300 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-cream-100 flex items-center justify-center text-coffee-600 mb-4 shadow-sm">
        {icon || <Coffee className="w-8 h-8 stroke-[1.5]" />}
      </div>
      <h3 className="text-lg font-bold text-coffee-950 font-display">{title}</h3>
      <p className="text-sm text-coffee-600 mt-1.5 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  );
};
