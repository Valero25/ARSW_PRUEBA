import React, { useState } from "react";
import { Gavel, Radio, Clock, AlertCircle } from "lucide-react";
import { useAuction } from "../context/AuctionContext";
import { AuctionCard } from "../components/common/AuctionCard";
import { Badge } from "../components/ui/Badge";

export const AuctionsPage: React.FC = () => {
  const { subastas } = useAuction();
  const [tabActivo, setTabActivo] = useState<"ACTIVAS" | "PROXIMAS" | "CERRADAS">("ACTIVAS");

  const subastasActivas = subastas.filter((s) => s.estado === "INICIADA");
  const subastasProximas = subastas.filter((s) => s.estado === "PROGRAMADA");
  const subastasCerradas = subastas.filter((s) => s.estado === "CERRADA");

  const listaMostrar =
    tabActivo === "ACTIVAS"
      ? subastasActivas
      : tabActivo === "PROXIMAS"
      ? subastasProximas
      : subastasCerradas;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="forest" dot>Tiempo Real</Badge>
          <Badge variant="coffee">Regla Anti-Sniping</Badge>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-coffee-950">
          Subastas de Lotes Exclusivos
        </h1>
        <p className="text-sm text-coffee-600 max-w-2xl leading-relaxed">
          Pujas abiertas en directo para microlotes de café de especialidad. El precio se define por la competencia real entre catadores y tostadores internacionales.
        </p>
      </div>

      {/* Anti-Sniping & Rules Infobox */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold font-display text-sm text-amber-950">
            Regla Técnica Anti-Sniping Activa
          </h4>
          <p className="leading-relaxed text-amber-800">
            Si se registra una puja en los <strong>últimos 30 segundos</strong> de la subasta, el temporizador se <strong>extiende automáticamente 60 segundos más</strong>. Esto garantiza que ningún bot ni corte de conexión pueda robar la subasta en el último milisegundo sin dar oportunidad de contraoferta.
          </p>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-cream-200 pb-3">
        <button
          onClick={() => setTabActivo("ACTIVAS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            tabActivo === "ACTIVAS"
              ? "bg-coffee-900 text-cream-50 shadow-sm"
              : "bg-white text-coffee-700 hover:bg-cream-100"
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${tabActivo === "ACTIVAS" ? "text-emerald-400 animate-pulse" : "text-coffee-400"}`} />
          <span>Subastas en Vivo ({subastasActivas.length})</span>
        </button>

        <button
          onClick={() => setTabActivo("PROXIMAS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            tabActivo === "PROXIMAS"
              ? "bg-coffee-900 text-cream-50 shadow-sm"
              : "bg-white text-coffee-700 hover:bg-cream-100"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Próximas ({subastasProximas.length})</span>
        </button>

        <button
          onClick={() => setTabActivo("CERRADAS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            tabActivo === "CERRADAS"
              ? "bg-coffee-900 text-cream-50 shadow-sm"
              : "bg-white text-coffee-700 hover:bg-cream-100"
          }`}
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Finalizadas ({subastasCerradas.length})</span>
        </button>
      </div>

      {/* Auctions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {listaMostrar.map((subasta) => (
          <AuctionCard key={subasta.id} subasta={subasta} />
        ))}
      </div>
    </div>
  );
};
