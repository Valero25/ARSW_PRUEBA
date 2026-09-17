import React, { useState } from "react";
import {
  TrendingUp,
  Boxes,
  PlusCircle,
  Gavel,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { MOCK_LOTES, COFFEE_IMAGES } from "../data/mockData";
import { Lote, ProcesoBeneficio } from "../types";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { useNotification } from "../context/NotificationContext";

export const AdminDashboardPage: React.FC = () => {
  const { mostrarToast } = useNotification();
  const [lotes, setLotes] = useState<Lote[]>(MOCK_LOTES);
  const [modalNuevoLoteAbierto, setModalNuevoLoteAbierto] = useState(false);
  const [modalNuevaSubastaAbierto, setModalNuevaSubastaAbierto] = useState(false);

  // Form states for new Lot
  const [nombreLote, setNombreLote] = useState("");
  const [finca, setFinca] = useState("Finca La Pradera");
  const [municipio, setMunicipio] = useState("Pijao");
  const [departamento] = useState("Quindío");
  const [altitud] = useState(1780);
  const [variedad, setVariedad] = useState("Geisha");
  const [proceso, setProceso] = useState<ProcesoBeneficio>("Natural");
  const [puntaje, setPuntaje] = useState(89.5);
  const [notas, setNotas] = useState("Flor de café, Miel, Manzana verde");

  const guardarNuevoLote = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevo: Lote = {
      id: `lote-${Date.now()}`,
      nombre: nombreLote || `${variedad} ${proceso} ${finca}`,
      productorId: "u-vendedor-01",
      productorNombre: "Don Hernando Gómez",
      fincaNombre: finca,
      origen: `${municipio}, ${departamento}`,
      municipio,
      departamento,
      altitudMsnm: Number(altitud),
      variedad,
      procesoBeneficio: proceso,
      puntajeCatacion: Number(puntaje),
      perfilSensorial: { aroma: 9.0, acidez: 8.8, cuerpo: 8.5, dulzor: 9.2, balance: 8.9 },
      notasSensoriales: notas.split(",").map((s) => s.trim()),
      descripcion: "Lote de alta montaña cultivado con prácticas agroecológicas sustentables.",
      historiaFinca: "Caficultura tradicional con innovación en procesos de fermentación controlada.",
      fechaCosecha: "Marzo 2026",
      imagenPrincipal: COFFEE_IMAGES.plantation,
      galeriaImagenes: [COFFEE_IMAGES.plantation],
    };

    setLotes([nuevo, ...lotes]);
    setModalNuevoLoteAbierto(false);
    mostrarToast(
      "PUJA_EXITOSA",
      "Lote Publicado Exitosamente",
      `El lote "${nuevo.nombre}" ya está registrado y listo para subasta o venta directa.`
    );
  };

  return (
    <DashboardLayout activeTab="metricas">
      <div className="space-y-8 text-left">
        {/* Top Metric Cards */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-forest-700 font-bold block">
              Panel Administrativo y Caficultor
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-coffee-950 mt-0.5">
              Gestión de Lotes y Subastas
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setModalNuevoLoteAbierto(true)}
              variant="primary"
              size="sm"
              icon={<PlusCircle className="w-4 h-4" />}
            >
              Registrar Lote
            </Button>
            <Button
              onClick={() => setModalNuevaSubastaAbierto(true)}
              variant="forest"
              size="sm"
              icon={<Gavel className="w-4 h-4" />}
            >
              Programar Subasta
            </Button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft">
            <div className="flex items-center justify-between text-coffee-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Ventas Acumuladas</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display font-black text-2xl text-coffee-950">$8.450.000 COP</div>
            <span className="text-[10px] text-emerald-700 font-bold">+24% vs mes anterior</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft">
            <div className="flex items-center justify-between text-coffee-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Subastas en Vivo</span>
              <Gavel className="w-4 h-4 text-earth-600" />
            </div>
            <div className="font-display font-black text-2xl text-forest-800">2 Activas</div>
            <span className="text-[10px] text-coffee-500">Promedio 16 pujas/lote</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft">
            <div className="flex items-center justify-between text-coffee-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Lotes Registrados</span>
              <Boxes className="w-4 h-4 text-coffee-700" />
            </div>
            <div className="font-display font-black text-2xl text-coffee-950">{lotes.length} Lotes</div>
            <span className="text-[10px] text-coffee-500">100% Catados SCA</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft">
            <div className="flex items-center justify-between text-coffee-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Liquidación Directa</span>
              <CheckCircle2 className="w-4 h-4 text-forest-700" />
            </div>
            <div className="font-display font-black text-2xl text-forest-800">98.5%</div>
            <span className="text-[10px] text-coffee-500">Cero intermediarios</span>
          </div>
        </div>

        {/* Lotes Table */}
        <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-coffee-950 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-earth-600" /> Lotes de Finca Disponibles
            </h3>
            <span className="text-xs text-coffee-500 font-semibold">{lotes.length} registros</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-cream-200 text-coffee-400 uppercase text-[10px] font-bold">
                  <th className="pb-3">Nombre del Lote</th>
                  <th className="pb-3">Finca / Origen</th>
                  <th className="pb-3">Variedad</th>
                  <th className="pb-3">Proceso</th>
                  <th className="pb-3">Altitud</th>
                  <th className="pb-3">Catación</th>
                  <th className="pb-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {lotes.map((l) => (
                  <tr key={l.id} className="hover:bg-cream-50/70 transition-colors">
                    <td className="py-3 font-bold text-coffee-950">{l.nombre}</td>
                    <td className="py-3 text-coffee-600">{l.fincaNombre} ({l.municipio})</td>
                    <td className="py-3 font-semibold text-coffee-800">{l.variedad}</td>
                    <td className="py-3 text-coffee-600">{l.procesoBeneficio}</td>
                    <td className="py-3 font-mono">{l.altitudMsnm} m</td>
                    <td className="py-3">
                      <Badge variant="forest">SCA {l.puntajeCatacion}</Badge>
                    </td>
                    <td className="py-3">
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Listo para Subasta
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Publicar Nuevo Lote */}
      <Modal
        isOpen={modalNuevoLoteAbierto}
        onClose={() => setModalNuevoLoteAbierto(false)}
        title="Registrar Nuevo Lote de Café"
        description="Ingresa la información técnica de catación y trazabilidad de la cosecha."
        maxWidth="lg"
      >
        <form onSubmit={guardarNuevoLote} className="space-y-4 text-left">
          <Input
            label="Nombre Comercial del Lote"
            value={nombreLote}
            onChange={(e) => setNombreLote(e.target.value)}
            placeholder="Ej: Geisha Honey Reserva Finca La Pradera"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nombre de la Finca"
              value={finca}
              onChange={(e) => setFinca(e.target.value)}
              required
            />
            <Input
              label="Municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Variedad"
              value={variedad}
              onChange={(e) => setVariedad(e.target.value)}
            >
              <option value="Geisha">Geisha</option>
              <option value="Bourbon Rosado">Bourbon Rosado</option>
              <option value="Castillo">Castillo</option>
              <option value="Caturra Chiroso">Caturra Chiroso</option>
              <option value="Wush Wush">Wush Wush</option>
              <option value="Maragogype">Maragogype</option>
            </Select>

            <Select
              label="Proceso"
              value={proceso}
              onChange={(e) => setProceso(e.target.value as ProcesoBeneficio)}
            >
              <option value="Lavado">Lavado</option>
              <option value="Natural">Natural</option>
              <option value="Honey">Honey</option>
              <option value="Anaeróbico">Anaeróbico</option>
              <option value="Fermentación Carbónica">Fermentación Carbónica</option>
            </Select>

            <Input
              label="Puntaje SCA"
              type="number"
              step="0.1"
              value={puntaje}
              onChange={(e) => setPuntaje(Number(e.target.value))}
              required
            />
          </div>

          <Input
            label="Notas Sensoriales (separadas por coma)"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Jazmín, Panela, Frutos rojos"
          />

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalNuevoLoteAbierto(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Publicar Lote
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Programar Subasta */}
      <Modal
        isOpen={modalNuevaSubastaAbierto}
        onClose={() => setModalNuevaSubastaAbierto(false)}
        title="Programar Subasta en Vivo"
        description="Define el precio base y la fecha de inicio para el lote seleccionado."
      >
        <div className="space-y-4 text-left">
          <Select label="Seleccionar Lote">
            {lotes.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nombre} (SCA {l.puntajeCatacion})
              </option>
            ))}
          </Select>

          <Input
            label="Precio Base de Apertura (COP)"
            type="number"
            defaultValue={1500000}
            placeholder="1500000"
          />

          <Input
            label="Incremento Mínimo por Puja (COP)"
            type="number"
            defaultValue={50000}
            placeholder="50000"
          />

          <div className="flex gap-3 pt-3">
            <Button
              variant="outline"
              onClick={() => setModalNuevaSubastaAbierto(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="forest"
              onClick={() => {
                setModalNuevaSubastaAbierto(false);
                mostrarToast(
                  "PUJA_EXITOSA",
                  "Subasta Programada",
                  "La subasta ha sido calendarizada y se notificará a los compradores suscritos."
                );
              }}
              className="flex-1"
            >
              Activar Subasta
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
