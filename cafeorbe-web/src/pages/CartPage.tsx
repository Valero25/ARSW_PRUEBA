import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";

export const CartPage: React.FC = () => {
  const { items, totalCantidad, subtotal, costoEnvio, total, actualizarCantidad, removerProducto, limpiarCarrito } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Tu carrito está vacío"
          description="Aún no has agregado cafés de especialidad. Explora nuestra vitrina y descubre lotes recién tostados en el Eje Cafetero."
          icon={<ShoppingBag className="w-8 h-8 text-coffee-600" />}
          actionText="Explorar Cafés"
          onAction={() => navigate("/productos")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream-200">
        <div>
          <h1 className="font-display font-black text-3xl text-coffee-950">Carrito de Compra</h1>
          <p className="text-xs text-coffee-600 mt-0.5">
            Tienes {totalCantidad} paquete(s) de café de especialidad seleccionado(s)
          </p>
        </div>

        <button
          onClick={limpiarCarrito}
          className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Vaciar carrito
        </button>
      </div>

      {/* Grid: Cart Items List vs Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ producto, cantidad, subtotal: itemSubtotal }) => (
            <div
              key={producto.id}
              className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft flex flex-col sm:flex-row items-center gap-5 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={producto.lote.imagenPrincipal}
                  alt={producto.lote.nombre}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-cream-100"
                />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-coffee-500 font-bold uppercase tracking-wider">
                    {producto.lote.departamento} · {producto.lote.procesoBeneficio}
                  </span>
                  <h3 className="font-display font-bold text-base text-coffee-950">
                    {producto.lote.nombre}
                  </h3>
                  <p className="text-xs text-coffee-500">
                    Empaque: {producto.pesoGramos}g · SCA {producto.lote.puntajeCatacion}
                  </p>
                  <span className="text-xs font-mono font-bold text-coffee-800 sm:hidden block pt-1">
                    ${producto.precio.toLocaleString("es-CO")} COP c/u
                  </span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-cream-100">
                <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 p-0.5">
                  <button
                    onClick={() => actualizarCantidad(producto.id, cantidad - 1)}
                    className="w-8 h-8 flex items-center justify-center text-coffee-700 hover:bg-cream-200 rounded-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-coffee-950 font-mono">
                    {cantidad}
                  </span>
                  <button
                    onClick={() => actualizarCantidad(producto.id, cantidad + 1)}
                    className="w-8 h-8 flex items-center justify-center text-coffee-700 hover:bg-cream-200 rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <span className="font-display font-black text-base text-coffee-950 block">
                    ${itemSubtotal.toLocaleString("es-CO")}
                  </span>
                  <span className="text-[10px] text-coffee-400 font-medium">COP</span>
                </div>

                <button
                  onClick={() => removerProducto(producto.id)}
                  className="p-2 text-coffee-400 hover:text-rose-600 transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/productos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-earth-700 hover:underline pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Seguir explorando otros cafés
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft-lg space-y-6 sticky top-28">
            <h3 className="font-display font-bold text-lg text-coffee-950 pb-3 border-b border-cream-100">
              Resumen del Pedido
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-coffee-600">
                <span>Subtotal productos</span>
                <span className="font-mono font-bold text-coffee-950">
                  ${subtotal.toLocaleString("es-CO")} COP
                </span>
              </div>

              <div className="flex justify-between text-coffee-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-earth-600" />
                  Envío nacional asegurado
                </span>
                <span className="font-mono font-bold text-coffee-950">
                  ${costoEnvio.toLocaleString("es-CO")} COP
                </span>
              </div>

              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                🌿 Despacho garantizado en 2 a 4 días hábiles desde la finca tostadora.
              </p>
            </div>

            <div className="pt-4 border-t border-cream-200 flex justify-between items-baseline">
              <span className="font-display font-bold text-base text-coffee-950">Total</span>
              <div className="text-right">
                <span className="font-display font-black text-2xl text-forest-800">
                  ${total.toLocaleString("es-CO")}
                </span>
                <span className="text-xs text-coffee-500 block">COP</span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/checkout")}
              variant="primary"
              size="lg"
              className="w-full justify-center group"
            >
              <span>Continuar con el Pago</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-coffee-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-forest-600" />
              <span>Transacción protegida por CafeOrbe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
