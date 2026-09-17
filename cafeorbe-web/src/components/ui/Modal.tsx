import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-coffee-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative w-full bg-white rounded-2xl shadow-2xl border border-cream-200/80 p-6 z-10 animate-in fade-in zoom-in-95 duration-200",
          maxWidthStyles[maxWidth]
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between pb-3 border-b border-cream-200">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-coffee-950 font-display">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-coffee-600 mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-coffee-400 hover:text-coffee-800 p-1.5 rounded-lg hover:bg-cream-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
