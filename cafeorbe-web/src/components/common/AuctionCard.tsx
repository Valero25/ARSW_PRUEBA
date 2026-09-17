import React from "react";
import { Link } from "react-router-dom";
import { Gavel, Radio, Users, MapPin, ArrowRight } from "lucide-react";
import { Subasta } from "../../types";
import { useCountdown } from "../../hooks/useCountdown";
import { CountdownDisplay } from "../ui/CountdownDisplay";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export const AuctionCard: React.FC<{ subasta: Subasta }> = ({ subasta }) => {
  const { lote, precioActual, totalPujas, estado, deadline, espectadoresConectados } = subasta;
  const segundosRestantes = useCountdown(estado === "INICIADA" ? deadline : null);

  const esActiva = estado === "INICIADA";
  const esProxima = estado === "PROGRAMADA";

  return (
    <div className="group bg-white rounded-2xl border border-cream-200/90 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between text-left">
      {/* Visual Header */}
      <div className="relative aspect-[16/9] overflow-hidden bg-coffee-950">
        <img
          src={lote.imagenPrincipal}
          alt={lote.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {esActiva ? (
            <Badge variant="forest" dot className="bg-forest-900/90 text-cream-50 border-forest-600 shadow-md">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              SUBASTA EN VIVO
            </Badge>
          ) : esProxima ? (
            <Badge variant="amber" className="shadow-md">
              Próximamente
            </Badge>
          ) : (
            <Badge variant="default" className="shadow-md">
              Finalizada
            </Badge>
          )}

          <Badge variant="coffee" className="bg-coffee-900/90 text-cream-50 border-coffee-700">
            SCA {lote.puntajeCatacion}
          </Badge>
        </div>

        {/* Viewers Pill */}
        {esActiva && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-coffee-950/80 backdrop-blur-sm text-cream-100 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-earth-400" />
            <span>{espectadoresConectados || 38} viendo</span>
          </div>
        )}

        {/* Countdown Floating Box */}
        {esActiva && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="bg-coffee-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-coffee-700/80 shadow-lg">
              <span className="text-[10px] text-earth-300 font-bold block uppercase tracking-wider">
                Tiempo Restante
              </span>
              <CountdownDisplay segundosRestantes={segundosRestantes} size="sm" showIcon={false} />
            </div>

            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-cream-200 text-xs font-bold">
              {lote.variedad} · {lote.procesoBeneficio}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-coffee-600 font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-earth-500" />
            <span>{lote.municipio}, {lote.departamento}</span>
          </div>

          <Link to={`/subastas/${subasta.id}`}>
            <h3 className="font-display font-bold text-lg text-coffee-950 hover:text-earth-700 transition-colors line-clamp-1">
              {lote.nombre}
            </h3>
          </Link>

          <p className="text-xs text-coffee-600 mt-1">
            Productor: <strong className="text-coffee-900">{lote.productorNombre}</strong> ({lote.fincaNombre})
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-cream-50 border border-cream-200 text-xs">
            <div>
              <span className="text-[10px] text-coffee-500 uppercase font-bold tracking-wider block">
                Precio Actual
              </span>
              <span className="font-display font-black text-base text-forest-800">
                ${precioActual.toLocaleString("es-CO")} <span className="text-[10px] font-normal text-coffee-500">COP</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-coffee-500 uppercase font-bold tracking-wider block">
                Pujas Registradas
              </span>
              <span className="font-display font-bold text-base text-coffee-950 flex items-center gap-1">
                <Gavel className="w-3.5 h-3.5 text-earth-600" />
                {totalPujas} ofertas
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/subastas/${subasta.id}`} className="block w-full">
          <Button
            variant={esActiva ? "forest" : "outline"}
            size="md"
            className="w-full justify-center group/btn"
          >
            <span>{esActiva ? "Entrar a Sala de Subasta" : "Ver Ficha de Subasta"}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
