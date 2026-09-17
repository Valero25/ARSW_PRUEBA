import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Gavel,
  Package,
  Truck,
} from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useAuction } from "../context/AuctionContext";
import { MOCK_PEDIDOS } from "../data/mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const UserProfilePage: React.FC = () => {
  const { usuario } = useAuth();
  const { subastas } = useAuction();

  const subastasActivas = subastas.filter((s) => s.estado === "INICIADA");
  const pedidos = MOCK_PEDIDOS;

  return (
    <DashboardLayout activeTab="resumen">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-coffee-950 to-coffee-900 text-cream-50 shadow-soft">
          <span className="text-xs uppercase font-bold text-earth-400 tracking-wider block mb-1">
            Panel del Catador y Comprador
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-cream-50">
            ¡Hola, {usuario?.nombre?.split(" ")[0] || "Carlos"}!
          </h1>
          <p className="text-xs text-coffee-200 mt-1 max-w-xl">
            Monitorea tus lotes subastados, el estado de tus despachos desde el Eje Cafetero y tus cafés favoritos.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-coffee-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Invertido</span>
              <ShoppingBag className="w-4 h-4 text-earth-600" />
            </div>
            <div className="font-display font-black text-2xl text-coffee-950">$184.000 COP</div>
            <span className="text-[11px] text-coffee-500">Cafés de especialidad 88+</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-coffee-500">
              <span className="text-xs font-bold uppercase tracking-wider">Subastas Activas</span>
              <Gavel className="w-4 h-4 text-forest-600" />
            </div>
            <div className="font-display font-black text-2xl text-forest-800">
              {subastasActivas.length} Lotes
            </div>
            <span className="text-[11px] text-emerald-600 font-bold">1 eres el líder actual</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-coffee-500">
              <span className="text-xs font-bold uppercase tracking-wider">Despachos</span>
              <Package className="w-4 h-4 text-coffee-700" />
            </div>
            <div className="font-display font-black text-2xl text-coffee-950">1 en Camino</div>
            <span className="text-[11px] text-coffee-500">Guía Coordinadora</span>
          </div>
        </div>

        {/* Active Bids Preview */}
        <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-coffee-950 flex items-center gap-2">
              <Gavel className="w-4 h-4 text-earth-600" /> Mis Subastas en Vivo
            </h3>
            <Link to="/subastas" className="text-xs text-earth-700 font-bold hover:underline">
              Ver todas →
            </Link>
          </div>

          <div className="space-y-3">
            {subastasActivas.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl border border-cream-200 bg-cream-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.lote.imagenPrincipal}
                    alt={s.lote.nombre}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-coffee-950">{s.lote.nombre}</h4>
                    <p className="text-xs text-coffee-500">
                      Productor: {s.lote.productorNombre} · SCA {s.lote.puntajeCatacion}
                    </p>
                    <span className="inline-block text-[10px] font-bold text-emerald-700 mt-1">
                      ● Eres el mayor postor actual
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-coffee-400 font-bold block uppercase">Puja Actual</span>
                    <span className="font-mono font-bold text-sm text-coffee-950">
                      ${s.precioActual.toLocaleString("es-CO")} COP
                    </span>
                  </div>
                  <Link to={`/subastas/${s.id}`}>
                    <Button variant="primary" size="sm">
                      Entrar a Sala
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders & Shipments */}
        <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-coffee-950 flex items-center gap-2">
              <Package className="w-4 h-4 text-forest-700" /> Mis Pedidos y Envíos
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-cream-200 text-coffee-500 uppercase text-[10px] font-bold">
                  <th className="pb-3">Código Orden</th>
                  <th className="pb-3">Fecha</th>
                  <th className="pb-3">Artículos</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Estado Envío</th>
                  <th className="pb-3">Guía</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {pedidos.map((ped) => (
                  <tr key={ped.id} className="hover:bg-cream-50/70">
                    <td className="py-3 font-mono font-bold text-coffee-900">{ped.codigoOrden}</td>
                    <td className="py-3 text-coffee-600">4 Sep 2026</td>
                    <td className="py-3 text-coffee-800">
                      {ped.items.map((i) => i.producto.lote.nombre).join(", ")}
                    </td>
                    <td className="py-3 font-mono font-bold text-forest-800">
                      ${ped.total.toLocaleString("es-CO")} COP
                    </td>
                    <td className="py-3">
                      <Badge variant="forest" dot>
                        <Truck className="w-3 h-3 mr-1" /> EN CAMINO
                      </Badge>
                    </td>
                    <td className="py-3 font-mono text-coffee-500">{ped.numeroGuia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
