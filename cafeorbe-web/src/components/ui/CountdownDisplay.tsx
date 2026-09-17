import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";

export interface CountdownDisplayProps {
  segundosRestantes: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  segundosRestantes,
  size = "md",
  showIcon = true,
}) => {
  const horas = Math.floor(segundosRestantes / 3600);
  const minutos = Math.floor((segundosRestantes % 3600) / 60);
  const segundos = segundosRestantes % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  const esUrgente = segundosRestantes > 0 && segundosRestantes <= 60;
  const esCritico = segundosRestantes > 0 && segundosRestantes <= 15;
  const esTerminado = segundosRestantes <= 0;

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1 gap-1.5",
    md: "text-sm px-3.5 py-1.5 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
  };

  if (esTerminado) {
    return (
      <div
        className={cn(
          "inline-flex items-center font-mono font-bold rounded-xl bg-gray-100 text-gray-600 border border-gray-200",
          sizeStyles[size]
        )}
      >
        <Clock className="w-4 h-4 text-gray-500" />
        <span>Subasta Finalizada</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center font-mono font-bold rounded-xl transition-all border",
        sizeStyles[size],
        esCritico
          ? "bg-rose-50 text-rose-700 border-rose-300 animate-pulse-subtle shadow-sm"
          : esUrgente
          ? "bg-amber-50 text-amber-800 border-amber-300 shadow-sm"
          : "bg-coffee-950 text-cream-50 border-coffee-800 shadow-sm"
      )}
    >
      {showIcon && (
        esUrgente ? (
          <AlertTriangle className={cn("w-4 h-4", esCritico ? "text-rose-600" : "text-amber-600")} />
        ) : (
          <Clock className="w-4 h-4 text-earth-400" />
        )
      )}
      <div className="flex items-center gap-1">
        {horas > 0 && (
          <>
            <span>{pad(horas)}</span>
            <span className="opacity-60">:</span>
          </>
        )}
        <span>{pad(minutos)}</span>
        <span className="opacity-60">:</span>
        <span className={cn(esCritico && "text-rose-600 font-extrabold")}>{pad(segundos)}</span>
      </div>
    </div>
  );
};
