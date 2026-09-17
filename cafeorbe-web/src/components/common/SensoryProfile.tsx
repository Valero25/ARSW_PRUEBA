import React from "react";
import { Lote } from "../../types";
import { Award, Sparkles } from "lucide-react";

export const SensoryProfile: React.FC<{ lote: Lote }> = ({ lote }) => {
  const { perfilSensorial, notasSensoriales, puntajeCatacion } = lote;

  const atributos = [
    { nombre: "Aroma / Fragancia", valor: perfilSensorial.aroma, color: "bg-earth-500" },
    { nombre: "Acidez Cítrica", valor: perfilSensorial.acidez, color: "bg-amber-500" },
    { nombre: "Cuerpo y Textura", valor: perfilSensorial.cuerpo, color: "bg-coffee-700" },
    { nombre: "Dulzor Natural", valor: perfilSensorial.dulzor, color: "bg-earth-600" },
    { nombre: "Balance en Taza", valor: perfilSensorial.balance, color: "bg-forest-600" },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-cream-200/90 shadow-soft text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-cream-100">
        <div>
          <h3 className="font-display font-bold text-lg text-coffee-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-earth-500" />
            Perfil Sensorial y Catación
          </h3>
          <p className="text-xs text-coffee-600 mt-0.5">
            Análisis estandarizado según el protocolo de la Specialty Coffee Association (SCA)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-forest-900 text-cream-50 shrink-0 shadow-sm">
          <Award className="w-4 h-4 text-emerald-400" />
          <div className="text-left">
            <span className="text-[10px] block opacity-75 uppercase font-bold">Puntaje SCA</span>
            <span className="font-display font-black text-base leading-none text-emerald-300">
              {puntajeCatacion} pts
            </span>
          </div>
        </div>
      </div>

      {/* Sensory Bars */}
      <div className="space-y-3.5">
        {atributos.map((attr) => (
          <div key={attr.nombre} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-coffee-800">
              <span>{attr.nombre}</span>
              <span className="font-mono text-coffee-950">{attr.valor.toFixed(1)} / 10</span>
            </div>
            <div className="h-2 w-full bg-cream-200/80 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${attr.color}`}
                style={{ width: `${(attr.valor / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tasting notes */}
      <div className="pt-4 border-t border-cream-100">
        <span className="block text-xs font-bold text-coffee-400 uppercase tracking-wider mb-2.5">
          Notas de Cata Identificadas:
        </span>
        <div className="flex flex-wrap gap-2">
          {notasSensoriales.map((nota) => (
            <span
              key={nota}
              className="px-3 py-1 rounded-lg bg-cream-100/90 text-coffee-900 font-semibold text-xs border border-cream-300/80"
            >
              ☕ {nota}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
