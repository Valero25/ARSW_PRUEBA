import React from "react";
import { Link } from "react-router-dom";
import { Award, MapPin, Eye, ShoppingCart } from "lucide-react";
import { Producto } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useCart } from "../../context/CartContext";

export const CoffeeCard: React.FC<{ producto: Producto }> = ({ producto }) => {
  const { agregarProducto } = useCart();
  const { lote, precio, etiquetas, stock } = producto;

  return (
    <div className="group bg-white rounded-2xl border border-cream-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left">
      {/* Top Image with Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={lote.imagenPrincipal}
          alt={lote.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
          <Badge variant="forest" className="shadow-sm">
            <Award className="w-3 h-3 mr-1" />
            SCA {lote.puntajeCatacion}
          </Badge>
          {etiquetas.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="earth" className="shadow-sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Process Pill */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-lg bg-coffee-950/80 backdrop-blur-md text-cream-50 text-[11px] font-bold">
            {lote.procesoBeneficio}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Origin and Producer */}
          <div className="flex items-center gap-1.5 text-xs text-coffee-600 font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-earth-500 shrink-0" />
            <span className="truncate">{lote.origen} · {lote.altitudMsnm} msnm</span>
          </div>

          {/* Coffee Title */}
          <Link to={`/productos/${producto.id}`}>
            <h3 className="font-display font-bold text-base text-coffee-950 hover:text-earth-700 transition-colors line-clamp-1">
              {lote.nombre}
            </h3>
          </Link>

          <p className="text-xs text-coffee-500 mt-0.5">
            Por <strong className="text-coffee-800">{lote.productorNombre}</strong> ({lote.fincaNombre})
          </p>

          {/* Tasting Notes */}
          <div className="flex flex-wrap gap-1 mt-3">
            {lote.notasSensoriales.slice(0, 3).map((nota) => (
              <span
                key={nota}
                className="px-2 py-0.5 rounded-md bg-cream-100 text-coffee-800 text-[10px] font-semibold"
              >
                {nota}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-cream-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-coffee-400 uppercase font-bold tracking-wider block">
              Precio ({producto.pesoGramos}g)
            </span>
            <span className="font-display font-extrabold text-lg text-coffee-950">
              ${precio.toLocaleString("es-CO")} <span className="text-xs font-normal text-coffee-500">COP</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link to={`/productos/${producto.id}`}>
              <Button variant="ghost" size="sm" className="p-2" title="Ver detalles">
                <Eye className="w-4 h-4 text-coffee-700" />
              </Button>
            </Link>
            <Button
              onClick={() => agregarProducto(producto, 1)}
              variant="primary"
              size="sm"
              icon={<ShoppingCart className="w-3.5 h-3.5" />}
              disabled={stock <= 0}
            >
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
