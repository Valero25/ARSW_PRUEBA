import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Gavel,
  Radio,
  Users,
  ArrowLeft,
  ShieldCheck,
  Zap,
  AlertTriangle,
  History,
  CheckCircle2,
} from "lucide-react";
import { useAuction } from "../context/AuctionContext";
import { useAuth } from "../context/AuthContext";
import { useCountdown } from "../hooks/useCountdown";
import { CountdownDisplay } from "../components/ui/CountdownDisplay";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";

export const AuctionRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { obtenerSubasta, obtenerHistorialPujas, registrarPuja, simularPujaRival } = useAuction();
  const { usuario } = useAuth();

  const subasta = obtenerSubasta(id || "") || obtenerSubasta("subasta-activa-01")!;
  const historialPujas = obtenerHistorialPujas(subasta.id);
  const segundosRestantes = useCountdown(subasta.estado === "INICIADA" ? subasta.deadline : null);

  const [montoPersonalizado, setMontoPersonalizado] = useState("");
  const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
  const [montoAConfirmar, setMontoAConfirmar] = useState<number>(0);
  const [pujando, setPujando] = useState(false);

  const esLider = subasta.liderId === usuario?.id || subasta.liderNombre?.includes("(Tú)");
  const esTerminada = segundosRestantes <= 0 && subasta.estado === "INICIADA";

  const prepararPuja = (monto: number) => {
    setMontoAConfirmar(monto);
    setModalConfirmacionAbierto(true);
  };

  const ejecutarPujaConfirmada = async () => {
    setPujando(true);
    await registrarPuja(subasta.id, montoAConfirmar);
    setPujando(false);
    setModalConfirmacionAbierto(false);
    setMontoPersonalizado("");
  };

  const incrementosRapidos = [25000, 50000, 100000];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <Link
            to="/subastas"
            className="p-2 rounded-xl bg-white border border-cream-200 text-coffee-700 hover:bg-cream-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="forest" dot>SALA DE SUBASTA EN VIVO</Badge>
              <Badge variant="coffee">SCA {subasta.lote.puntajeCatacion} pts</Badge>
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-coffee-950 mt-1">
              {subasta.lote.nombre}
            </h1>
          </div>
        </div>

        {/* Viewers & Simulation Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-cream-200 text-xs font-bold text-coffee-800 shadow-sm">
            <Users className="w-4 h-4 text-forest-600" />
            <span>{subasta.espectadoresConectados || 42} Conectados</span>
          </div>

          <Button
            onClick={() => simularPujaRival(subasta.id)}
            variant="outline"
            size="sm"
            icon={<Zap className="w-3.5 h-3.5 text-earth-600" />}
            title="Simula que otro postor supera tu oferta para probar interactividad y anti-sniping"
          >
            Simular Postor Rival
          </Button>
        </div>
      </div>

      {/* Main Grid: Stream/Lot Panel vs Bidding/Action Room */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Stream Video Player & Lot Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Video / Simulation Container */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-coffee-950 border-2 border-coffee-800 shadow-xl flex items-center justify-center">
            <img
              src={subasta.lote.imagenPrincipal}
              alt="Transmisión en vivo"
              className="w-full h-full object-cover opacity-60"
            />

            {/* Video Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-rose-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse">
                <Radio className="w-3.5 h-3.5" /> EN DIRECTO
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-cream-100 text-xs font-semibold">
                Cámara Finca: Pitalito, Huila
              </span>
            </div>

            {/* Centered Producer Live Banner */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-cream-50 bg-gradient-to-t from-coffee-950/90 via-transparent to-black/40">
              <div className="w-16 h-16 rounded-full bg-coffee-900/80 backdrop-blur-md border border-earth-400 flex items-center justify-center mb-3">
                <Gavel className="w-8 h-8 text-earth-400" />
              </div>
              <p className="text-xs text-earth-300 font-bold uppercase tracking-widest">
                Transmisión Oficial CafeOrbe
              </p>
              <h3 className="font-display font-bold text-xl text-cream-50 mt-1">
                Lote {subasta.lote.variedad} · {subasta.lote.procesoBeneficio}
              </h3>
              <p className="text-xs text-cream-200 mt-1">
                Productor: {subasta.lote.productorNombre} ({subasta.lote.fincaNombre})
              </p>
            </div>

            {/* Watermark */}
            <div className="absolute bottom-4 right-4 text-[10px] text-cream-200/60 font-mono">
              WebRTC Live Stream · 1080p 60fps
            </div>
          </div>

          {/* Lote Technical Overview */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft text-left space-y-4">
            <h3 className="font-display font-bold text-lg text-coffee-950">
              Ficha Técnica del Lote Subastado
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <span className="text-coffee-400 uppercase font-bold text-[10px] block">Variedad</span>
                <span className="font-bold text-coffee-900 text-sm">{subasta.lote.variedad}</span>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <span className="text-coffee-400 uppercase font-bold text-[10px] block">Proceso</span>
                <span className="font-bold text-coffee-900 text-sm">{subasta.lote.procesoBeneficio}</span>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <span className="text-coffee-400 uppercase font-bold text-[10px] block">Altitud</span>
                <span className="font-bold text-coffee-900 text-sm">{subasta.lote.altitudMsnm} msnm</span>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <span className="text-coffee-400 uppercase font-bold text-[10px] block">Puntaje</span>
                <span className="font-bold text-forest-700 text-sm">{subasta.lote.puntajeCatacion} SCA</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-coffee-500 uppercase tracking-wider block mb-2">
                Notas Sensoriales Identificadas:
              </span>
              <div className="flex flex-wrap gap-2">
                {subasta.lote.notasSensoriales.map((nota) => (
                  <span
                    key={nota}
                    className="px-3 py-1 rounded-lg bg-cream-100 text-coffee-900 text-xs font-bold border border-cream-300"
                  >
                    ☕ {nota}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live Bidding Engine & Action Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Clock & Current Price Card */}
          <div className="p-6 rounded-3xl bg-coffee-950 text-cream-50 border border-coffee-800 shadow-2xl text-left space-y-5">
            {/* Clock Header */}
            <div className="flex items-center justify-between pb-4 border-b border-coffee-800">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-earth-400 font-bold block">
                  Temporizador Oficial
                </span>
                <CountdownDisplay segundosRestantes={segundosRestantes} size="lg" />
              </div>

              {esLider && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Eres el Líder!</span>
                </div>
              )}
            </div>

            {/* Price Display */}
            <div>
              <span className="text-xs uppercase tracking-wider text-coffee-300 font-bold block">
                Precio Actual de la Puja
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-black text-4xl sm:text-5xl text-emerald-400">
                  ${subasta.precioActual.toLocaleString("es-CO")}
                </span>
                <span className="text-xs text-coffee-300 font-mono">COP</span>
              </div>
              <p className="text-xs text-earth-300 font-medium mt-1">
                Líder actual: <strong className="text-cream-50">{subasta.liderNombre || "Sin pujas aún"}</strong>
              </p>
            </div>

            {/* Anti-sniping notification notice */}
            {segundosRestantes <= 30 && segundosRestantes > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-600/80 text-amber-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zona Anti-Sniping: Cada puja en los últimos 30s sumará +60s.</span>
              </div>
            )}
          </div>

          {/* Action Bidding Panel */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft text-left space-y-4">
            <h3 className="font-display font-bold text-base text-coffee-950 flex items-center gap-2">
              <Gavel className="w-4 h-4 text-forest-600" />
              Pujar por este Lote
            </h3>

            {/* Quick Bid Increment Buttons */}
            <div>
              <span className="text-[11px] font-bold text-coffee-500 uppercase tracking-wider block mb-2">
                Pujas Rápidas Predeterminadas:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {incrementosRapidos.map((inc) => {
                  const monto = subasta.precioActual + inc;
                  return (
                    <button
                      key={inc}
                      disabled={esTerminada}
                      onClick={() => prepararPuja(monto)}
                      className="p-2.5 rounded-xl border border-cream-300 bg-cream-50 hover:bg-forest-900 hover:text-white hover:border-forest-900 transition-all font-mono font-bold text-xs flex flex-col items-center justify-center gap-0.5 disabled:opacity-40"
                    >
                      <span className="text-[10px] opacity-75">+${(inc / 1000).toFixed(0)}k</span>
                      <span>${(monto / 1000).toFixed(0)}k</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2 pt-2 border-t border-cream-100">
              <label className="block text-[11px] font-bold text-coffee-500 uppercase tracking-wider">
                O introduce un monto mayor:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={montoPersonalizado}
                  onChange={(e) => setMontoPersonalizado(e.target.value)}
                  placeholder={`Mínimo $${(subasta.precioActual + subasta.incrementoMinimo).toLocaleString("es-CO")}`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-cream-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-earth-400"
                />
                <Button
                  onClick={() => {
                    const val = Number(montoPersonalizado);
                    if (val > subasta.precioActual) {
                      prepararPuja(val);
                    }
                  }}
                  variant="forest"
                  size="md"
                  disabled={!montoPersonalizado || Number(montoPersonalizado) <= subasta.precioActual || esTerminada}
                >
                  Pujar
                </Button>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-coffee-400 flex items-center justify-between">
              <span>Incremento mínimo: ${subasta.incrementoMinimo.toLocaleString("es-CO")} COP</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-forest-600" /> Clave Idempotente</span>
            </div>
          </div>

          {/* Real-time Bid History Feed */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-coffee-950 flex items-center gap-2">
                <History className="w-4 h-4 text-earth-600" />
                Historial de Pujas ({historialPujas.length})
              </h3>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Sincronizado
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
              {historialPujas.map((puja, index) => (
                <div
                  key={puja.id}
                  className={`p-3 rounded-xl flex items-center justify-between text-xs transition-colors ${
                    index === 0
                      ? "bg-forest-50 border border-forest-200 text-forest-950 font-bold"
                      : "bg-cream-50/70 border border-cream-200 text-coffee-800"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="block truncate max-w-[180px]">{puja.pujadorNombre}</span>
                    <span className="text-[10px] text-coffee-400 font-mono">{puja.fechaHora}</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-coffee-950">
                    ${puja.monto.toLocaleString("es-CO")} <span className="text-[10px] font-normal">COP</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalConfirmacionAbierto}
        onClose={() => setModalConfirmacionAbierto(false)}
        title="Confirmación de Puja Oficial"
        description="Por favor verifica el monto antes de transmitir tu oferta al servidor."
      >
        <div className="space-y-4 text-left">
          <div className="p-4 rounded-2xl bg-cream-100/70 border border-cream-200 space-y-1">
            <span className="text-xs text-coffee-500 uppercase font-bold block">
              Monto a Ofertar:
            </span>
            <div className="font-display font-black text-3xl text-forest-800">
              ${montoAConfirmar.toLocaleString("es-CO")} COP
            </div>
            <p className="text-xs text-coffee-600 mt-1">
              Lote: {subasta.lote.nombre} ({subasta.lote.variedad})
            </p>
          </div>

          <p className="text-xs text-coffee-500 leading-relaxed">
            Al confirmar, tu puja se enviará con una clave de idempotencia criptográfica única. Si eres el mayor postor al finalizar el tiempo, se iniciará el proceso de liquidación y despacho.
          </p>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setModalConfirmacionAbierto(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="forest"
              size="md"
              isLoading={pujando}
              onClick={ejecutarPujaConfirmada}
              className="flex-1"
            >
              Confirmar Puja
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
