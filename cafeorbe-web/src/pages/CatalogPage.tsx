import React, { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { MOCK_PRODUCTOS } from "../data/mockData";
import { CoffeeCard } from "../components/common/CoffeeCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Badge } from "../components/ui/Badge";

export const CatalogPage: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [departamento, setDepartamento] = useState("TODOS");
  const [variedad, setVariedad] = useState("TODAS");
  const [proceso, setProceso] = useState("TODOS");
  const [puntajeMinimo, setPuntajeMinimo] = useState(0);
  const [ordenarPor, setOrdenarPor] = useState("relevancia");
  const [filtrosMovilAbiertos, setFiltrosMovilAbiertos] = useState(false);

  const resetFiltros = () => {
    setBusqueda("");
    setDepartamento("TODOS");
    setVariedad("TODAS");
    setProceso("TODOS");
    setPuntajeMinimo(0);
    setOrdenarPor("relevancia");
  };

  const productosFiltrados = useMemo(() => {
    return MOCK_PRODUCTOS.filter((p) => {
      const matchBusqueda =
        busqueda === "" ||
        p.lote.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.lote.productorNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.lote.origen.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.lote.variedad.toLowerCase().includes(busqueda.toLowerCase());

      const matchDepto = departamento === "TODOS" || p.lote.departamento === departamento;
      const matchVariedad = variedad === "TODAS" || p.lote.variedad === variedad;
      const matchProceso = proceso === "TODOS" || p.lote.procesoBeneficio === proceso;
      const matchPuntaje = puntajeMinimo === 0 || p.lote.puntajeCatacion >= puntajeMinimo;

      return matchBusqueda && matchDepto && matchVariedad && matchProceso && matchPuntaje;
    }).sort((a, b) => {
      if (ordenarPor === "precio_asc") return a.precio - b.precio;
      if (ordenarPor === "precio_desc") return b.precio - a.precio;
      if (ordenarPor === "puntaje_desc") return b.lote.puntajeCatacion - a.lote.puntajeCatacion;
      return 0;
    });
  }, [busqueda, departamento, variedad, proceso, puntajeMinimo, ordenarPor]);

  const departamentos = ["TODOS", "Huila", "Quindío", "Risaralda", "Caldas", "Nariño"];
  const procesos = ["TODOS", "Lavado", "Honey", "Anaeróbico", "Fermentación Carbónica", "Doble Fermentación"];
  const variedades = ["TODAS", "Geisha", "Bourbon Rosado", "Castillo", "Caturra Chiroso", "Wush Wush", "Maragogype"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      {/* Page Title & Search Bar */}
      <div className="mb-10 space-y-6">
        <div>
          <Badge variant="earth" className="mb-2">Vitrina de Especialidad</Badge>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-coffee-950">
            Explorador de Cafés
          </h1>
          <p className="text-sm text-coffee-600 mt-1">
            Encuentra microlotes con trazabilidad certificada, directo de caficultores colombianos.
          </p>
        </div>

        {/* Global Search & Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-lg">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Busca cafés, productores, regiones o notas sensoriales..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-cream-300 text-coffee-950 placeholder:text-coffee-300 text-sm focus:outline-none focus:ring-2 focus:ring-earth-400 shadow-sm"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setFiltrosMovilAbiertos(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-cream-300 text-sm font-semibold text-coffee-800 shadow-sm"
            >
              <Filter className="w-4 h-4 text-earth-600" />
              <span>Filtros</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-coffee-500 whitespace-nowrap hidden sm:inline">
                Ordenar por:
              </span>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-coffee-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-earth-400 shadow-sm"
              >
                <option value="relevancia">Más Relevantes</option>
                <option value="precio_asc">Precio: Menor a Mayor</option>
                <option value="precio_desc">Precio: Mayor a Menor</option>
                <option value="puntaje_desc">Mejor Puntaje SCA</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-cream-200/90 shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div className="flex items-center gap-2 text-coffee-950 font-display font-bold text-base">
                <SlidersHorizontal className="w-4 h-4 text-earth-600" />
                <span>Filtros Avanzados</span>
              </div>
              <button
                onClick={resetFiltros}
                className="text-xs text-coffee-500 hover:text-coffee-900 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Limpiar
              </button>
            </div>

            {/* Departamento */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-coffee-800 uppercase tracking-wider">
                Región de Origen
              </label>
              <div className="space-y-1">
                {departamentos.map((dep) => (
                  <button
                    key={dep}
                    onClick={() => setDepartamento(dep)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      departamento === dep
                        ? "bg-coffee-900 text-cream-50 font-bold"
                        : "hover:bg-cream-100 text-coffee-700"
                    }`}
                  >
                    {dep === "TODOS" ? "Todas las regiones" : dep}
                  </button>
                ))}
              </div>
            </div>

            {/* Variedad */}
            <div className="space-y-2 pt-3 border-t border-cream-100">
              <label className="block text-xs font-bold text-coffee-800 uppercase tracking-wider">
                Variedad de Café
              </label>
              <div className="space-y-1">
                {variedades.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariedad(v)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      variedad === v
                        ? "bg-coffee-900 text-cream-50 font-bold"
                        : "hover:bg-cream-100 text-coffee-700"
                    }`}
                  >
                    {v === "TODAS" ? "Todas las variedades" : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Proceso */}
            <div className="space-y-2 pt-3 border-t border-cream-100">
              <label className="block text-xs font-bold text-coffee-800 uppercase tracking-wider">
                Proceso de Beneficio
              </label>
              <div className="space-y-1">
                {procesos.map((proc) => (
                  <button
                    key={proc}
                    onClick={() => setProceso(proc)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      proceso === proc
                        ? "bg-earth-500 text-white font-bold"
                        : "hover:bg-cream-100 text-coffee-700"
                    }`}
                  >
                    {proc === "TODOS" ? "Todos los procesos" : proc}
                  </button>
                ))}
              </div>
            </div>

            {/* Puntaje Mínimo */}
            <div className="space-y-2 pt-3 border-t border-cream-100">
              <label className="block text-xs font-bold text-coffee-800 uppercase tracking-wider">
                Puntaje SCA Mínimo
              </label>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {[0, 88, 90].map((pts) => (
                  <button
                    key={pts}
                    onClick={() => setPuntajeMinimo(pts)}
                    className={`py-1.5 rounded-lg border font-bold text-center transition-colors ${
                      puntajeMinimo === pts
                        ? "bg-forest-800 text-cream-50 border-forest-800"
                        : "bg-white text-coffee-700 border-cream-300 hover:bg-cream-50"
                    }`}
                  >
                    {pts === 0 ? "Todos" : `${pts}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-coffee-600 font-semibold px-1">
            <span>Mostrando {productosFiltrados.length} lotes de especialidad</span>
            {(departamento !== "TODOS" || proceso !== "TODOS" || puntajeMinimo > 0 || busqueda) && (
              <span className="text-earth-700">Filtros aplicados</span>
            )}
          </div>

          {productosFiltrados.length === 0 ? (
            <EmptyState
              title="No encontramos cafés con estos filtros"
              description="Intenta seleccionando otra región, proceso o relajando los términos de búsqueda."
              actionText="Restablecer filtros"
              onAction={resetFiltros}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.map((producto) => (
                <CoffeeCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {filtrosMovilAbiertos && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-coffee-950/60 backdrop-blur-sm"
            onClick={() => setFiltrosMovilAbiertos(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 z-10 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-display font-bold text-lg text-coffee-950">Filtros de Catálogo</h3>
              <button
                onClick={() => setFiltrosMovilAbiertos(false)}
                className="p-1 rounded-lg text-coffee-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-coffee-800 uppercase">Región</label>
              <div className="grid grid-cols-2 gap-1.5">
                {departamentos.map((dep) => (
                  <button
                    key={dep}
                    onClick={() => setDepartamento(dep)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border ${
                      departamento === dep ? "bg-coffee-900 text-cream-50" : "bg-cream-50"
                    }`}
                  >
                    {dep}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setFiltrosMovilAbiertos(false)}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Aplicar ({productosFiltrados.length} resultados)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
