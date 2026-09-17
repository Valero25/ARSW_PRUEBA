import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Truck,
  Check,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { MOCK_PRODUCTOS } from "../data/mockData";
import { SensoryProfile } from "../components/common/SensoryProfile";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarProducto } = useCart();
  const { mostrarToast } = useNotification();

  const producto = MOCK_PRODUCTOS.find((p) => p.id === id) || MOCK_PRODUCTOS[0];
  const { lote, precio, etiquetas, stock, pesoGramos } = producto;

  const [imagenActiva, setImagenActiva] = useState(lote.imagenPrincipal);
  const [cantidad, setCantidad] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);

  const comprarAhora = () => {
    agregarProducto(producto, cantidad);
    navigate("/carrito");
  };

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
    mostrarToast(
      "INFO",
      esFavorito ? "Eliminado de favoritos" : "Guardado en favoritos",
      `${lote.nombre} ${esFavorito ? "se quitó de" : "se añadió a"} tus favoritos.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-12">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-coffee-500">
        <Link to="/productos" className="hover:text-coffee-950 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Catálogo
        </Link>
        <span>/</span>
        <span>{lote.departamento}</span>
        <span>/</span>
        <span className="text-coffee-900 truncate">{lote.nombre}</span>
      </div>

      {/* Main Grid: Gallery & Buying Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery Section */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream-100 border border-cream-200 shadow-soft">
            <img
              src={imagenActiva}
              alt={lote.nombre}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge variant="forest">SCA {lote.puntajeCatacion} pts</Badge>
              {etiquetas.map((t) => (
                <Badge key={t} variant="earth">{t}</Badge>
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          {lote.galeriaImagenes.length > 1 && (
            <div className="flex gap-3">
              {lote.galeriaImagenes.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActiva(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    imagenActiva === img ? "border-coffee-900 scale-95 shadow-md" : "border-cream-300 opacity-70"
                  }`}
                >
                  <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buying Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-coffee-600 font-bold mb-2">
              <MapPin className="w-4 h-4 text-earth-600" />
              <span>{lote.municipio}, {lote.departamento} · {lote.altitudMsnm} msnm</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-coffee-950 tracking-tight">
              {lote.nombre}
            </h1>

            <p className="text-sm text-coffee-600 mt-2">
              Cultivado por <strong className="text-coffee-900">{lote.productorNombre}</strong> en {lote.fincaNombre}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-cream-100/70 border border-cream-200/90 space-y-2">
            <span className="text-xs text-coffee-500 uppercase font-bold tracking-wider block">
              Precio al comprador ({pesoGramos} gramos tostado en origen)
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-3xl text-forest-800">
                ${precio.toLocaleString("es-CO")}
              </span>
              <span className="text-xs text-coffee-500 font-medium">COP · Impuestos incluidos</span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Despacho directo desde el Eje Cafetero ({stock} unidades disponibles)
            </p>
          </div>

          {/* Quick Technical Specs Table */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-cream-200">
              <span className="text-coffee-400 font-bold block uppercase text-[10px]">Variedad</span>
              <span className="font-bold text-coffee-900 text-sm">{lote.variedad}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-cream-200">
              <span className="text-coffee-400 font-bold block uppercase text-[10px]">Proceso</span>
              <span className="font-bold text-coffee-900 text-sm">{lote.procesoBeneficio}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-cream-200">
              <span className="text-coffee-400 font-bold block uppercase text-[10px]">Cosecha</span>
              <span className="font-bold text-coffee-900 text-sm">{lote.fechaCosecha}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-cream-200">
              <span className="text-coffee-400 font-bold block uppercase text-[10px]">Certificación</span>
              <span className="font-bold text-coffee-900 text-sm">
                {lote.certificaciones?.[0] || "Origen Denominación"}
              </span>
            </div>
          </div>

          {/* Actions & Quantity */}
          <div className="pt-4 border-t border-cream-200 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-cream-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-9 h-9 flex items-center justify-center text-coffee-700 hover:bg-cream-100 rounded-lg text-base font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-coffee-950 font-mono">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-9 h-9 flex items-center justify-center text-coffee-700 hover:bg-cream-100 rounded-lg text-base font-bold"
                >
                  +
                </button>
              </div>

              <Button
                onClick={() => agregarProducto(producto, cantidad)}
                variant="outline"
                size="lg"
                className="flex-1"
                icon={<ShoppingBag className="w-4 h-4" />}
              >
                Agregar al Carrito
              </Button>

              <button
                onClick={toggleFavorito}
                className={`p-3.5 rounded-xl border transition-colors ${
                  esFavorito ? "bg-rose-50 border-rose-300 text-rose-600" : "bg-white border-cream-300 text-coffee-500 hover:text-coffee-900"
                }`}
                title="Favorito"
              >
                <Heart className={`w-5 h-5 ${esFavorito ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <Button
              onClick={comprarAhora}
              variant="primary"
              size="lg"
              className="w-full py-4 text-base shadow-soft-lg"
            >
              Comprar Ahora (${(precio * cantidad).toLocaleString("es-CO")} COP)
            </Button>
          </div>
        </div>
      </div>

      {/* Sensory Profile & Coffee Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-cream-200">
        <div className="lg:col-span-6">
          <SensoryProfile lote={lote} />
        </div>

        {/* Story Section */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-cream-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-lg text-coffee-950">
            Historia del Café y la Finca
          </h3>
          <p className="text-sm text-coffee-700 leading-relaxed">
            {lote.descripcion}
          </p>
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 italic text-xs text-coffee-800 leading-relaxed">
            "{lote.historiaFinca}"
            <span className="block not-italic font-bold text-coffee-950 mt-2">
              — {lote.productorNombre}, Caficultor de {lote.fincaNombre}
            </span>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs text-coffee-500">
            <span className="flex items-center gap-1.5 font-semibold text-coffee-800">
              <Truck className="w-4 h-4 text-earth-600" /> Envío nacional en 2-4 días hábiles
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-coffee-800">
              <ShieldCheck className="w-4 h-4 text-forest-600" /> Empaque trilaminado con válvula
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
