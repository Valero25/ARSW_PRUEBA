import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Truck,
  CreditCard,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { MetodoPago } from "../types";

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, costoEnvio, total, limpiarCarrito } = useCart();
  const { usuario } = useAuth();
  const { mostrarToast } = useNotification();

  const [pasoActual, setPasoActual] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [nombre, setNombre] = useState(usuario?.nombre || "Carlos Mendoza");
  const [email, setEmail] = useState(usuario?.email || "carlos.mendoza@cafeorbe.com");
  const [celular, setCelular] = useState(usuario?.celular || "+57 312 456 7890");
  const [departamento, setDepartamento] = useState(usuario?.departamento || "Cundinamarca");
  const [municipio, setMunicipio] = useState(usuario?.municipio || "Bogotá D.C.");
  const [direccion, setDireccion] = useState(usuario?.direccion || "Carrera 7 # 115-45, Apto 802");
  const [codigoPostal, setCodigoPostal] = useState(usuario?.codigoPostal || "110111");

  const [metodoPago, setMetodoPago] = useState<MetodoPago>("PSE");
  const [bancoPSE, setBancoPSE] = useState("Bancolombia");
  const [procesando, setProcesando] = useState(false);
  const [codigoOrdenGenerada, setCodigoOrdenGenerada] = useState("");

  const finalizarPedido = () => {
    setProcesando(true);
    setTimeout(() => {
      const codigo = `CO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setCodigoOrdenGenerada(codigo);
      setProcesando(false);
      setPasoActual(4);
      limpiarCarrito();
      mostrarToast(
        "PEDIDO_ENVIADO",
        "¡Pedido confirmado exitosamente!",
        `Tu orden ${codigo} ha sido generada y está lista para preparación.`
      );
    }, 1200);
  };

  const pasos = [
    { num: 1, label: "Envío" },
    { num: 2, label: "Entrega" },
    { num: 3, label: "Pago" },
    { num: 4, label: "Confirmación" },
  ];

  if (items.length === 0 && pasoActual !== 4) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold font-display text-coffee-950">No hay productos en el checkout</h2>
        <p className="text-xs text-coffee-600">Por favor agrega cafés al carrito antes de proceder.</p>
        <Link to="/productos">
          <Button variant="primary">Ir al Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-10">
      {/* Step Indicators */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 h-0.5 bg-cream-200 -z-0" />
          {pasos.map((paso) => (
            <div key={paso.num} className="flex flex-col items-center gap-1 z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                  pasoActual >= paso.num
                    ? "bg-forest-800 text-white border-forest-800 shadow-md"
                    : "bg-white text-coffee-400 border-cream-300"
                }`}
              >
                {pasoActual > paso.num ? <CheckCircle2 className="w-5 h-5" /> : paso.num}
              </div>
              <span className={`text-[11px] font-bold ${pasoActual >= paso.num ? "text-coffee-950" : "text-coffee-400"}`}>
                {paso.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Form Steps vs Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* PASO 1: Información de Envío */}
          {pasoActual === 1 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-6">
              <h2 className="font-display font-bold text-xl text-coffee-950">
                1. Información de Envío
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre Completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre completo"
                />
                <Input
                  label="Celular de Contacto"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  placeholder="+57 300 000 0000"
                />
              </div>

              <Input
                label="Correo Electrónico para Facturación"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  placeholder="Ej: Cundinamarca, Antioquia"
                />
                <Input
                  label="Municipio / Ciudad"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  placeholder="Ej: Bogotá, Medellín"
                />
                <Input
                  label="Código Postal"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  placeholder="Ej: 110111"
                />
              </div>

              <Input
                label="Dirección de Residencia y Apto / Casa"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle / Carrera # 00 - 00, Apartamento / Edificio"
              />

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setPasoActual(2)} variant="primary" size="lg">
                  <span>Continuar a Método de Entrega</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* PASO 2: Método de Entrega */}
          {pasoActual === 2 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-6">
              <h2 className="font-display font-bold text-xl text-coffee-950">
                2. Método de Despacho Logístico
              </h2>

              <div className="p-4 rounded-2xl border-2 border-forest-700 bg-forest-50/50 flex items-start gap-4">
                <Truck className="w-6 h-6 text-forest-700 mt-1 shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-sm text-forest-950">
                      Envío Asegurado desde el Eje Cafetero
                    </h4>
                    <span className="font-mono font-bold text-forest-900">$12.000 COP</span>
                  </div>
                  <p className="text-xs text-forest-800 leading-relaxed">
                    Despacho directo desde el origen en camiones climatizados con trazabilidad satelital. Tiempo estimado de entrega: 2 a 4 días hábiles nacionales.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={() => setPasoActual(1)} variant="outline" size="md">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Datos
                </Button>
                <Button onClick={() => setPasoActual(3)} variant="primary" size="lg">
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* PASO 3: Método de Pago */}
          {pasoActual === 3 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-6">
              <h2 className="font-display font-bold text-xl text-coffee-950">
                3. Método de Pago Seguro
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setMetodoPago("PSE")}
                  className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all ${
                    metodoPago === "PSE" ? "border-coffee-900 bg-cream-100" : "border-cream-300 bg-white"
                  }`}
                >
                  <Building2 className="w-5 h-5 text-coffee-800" />
                  <span className="font-bold text-sm block text-coffee-950">PSE</span>
                  <span className="text-[10px] text-coffee-500 block">Débito bancario en línea</span>
                </button>

                <button
                  onClick={() => setMetodoPago("TARJETA")}
                  className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all ${
                    metodoPago === "TARJETA" ? "border-coffee-900 bg-cream-100" : "border-cream-300 bg-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-coffee-800" />
                  <span className="font-bold text-sm block text-coffee-950">Tarjeta</span>
                  <span className="text-[10px] text-coffee-500 block">Crédito o débito</span>
                </button>

                <button
                  onClick={() => setMetodoPago("TRANSFERENCIA")}
                  className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all ${
                    metodoPago === "TRANSFERENCIA" ? "border-coffee-900 bg-cream-100" : "border-cream-300 bg-white"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-forest-700" />
                  <span className="font-bold text-sm block text-coffee-950">Bancolombia</span>
                  <span className="text-[10px] text-coffee-500 block">Transferencia directa</span>
                </button>
              </div>

              {metodoPago === "PSE" && (
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
                  <label className="block text-xs font-bold text-coffee-800 uppercase">
                    Selecciona tu entidad financiera:
                  </label>
                  <select
                    value={bancoPSE}
                    onChange={(e) => setBancoPSE(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white text-xs font-semibold"
                  >
                    <option value="Bancolombia">Bancolombia</option>
                    <option value="Davivienda">Davivienda</option>
                    <option value="Banco de Bogotá">Banco de Bogotá</option>
                    <option value="Nequi">Nequi</option>
                    <option value="Daviplata">Daviplata</option>
                    <option value="BBVA Colombia">BBVA Colombia</option>
                  </select>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button onClick={() => setPasoActual(2)} variant="outline" size="md">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Entrega
                </Button>
                <Button
                  onClick={finalizarPedido}
                  variant="forest"
                  size="lg"
                  isLoading={procesando}
                >
                  Confirmar y Pagar (${total.toLocaleString("es-CO")} COP)
                </Button>
              </div>
            </div>
          )}

          {/* PASO 4: Confirmación Exitosa */}
          {pasoActual === 4 && (
            <div className="p-8 rounded-3xl bg-white border border-cream-200 shadow-soft-lg text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold text-forest-700 block">
                  ¡Transacción Aprobada!
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-coffee-950">
                  Gracias por apoyar al caficultor colombiano
                </h2>
                <p className="text-xs text-coffee-600">
                  Tu orden ha sido registrada en el sistema y notificada a la finca en el Eje Cafetero.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 max-w-sm mx-auto font-mono text-left space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-coffee-500">Número de Orden:</span>
                  <span className="font-bold text-coffee-950">{codigoOrdenGenerada}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-500">Total Liquidado:</span>
                  <span className="font-bold text-forest-800">${total.toLocaleString("es-CO")} COP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-500">Destino:</span>
                  <span className="font-bold text-coffee-950 truncate max-w-[170px]">{municipio}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link to="/perfil">
                  <Button variant="primary" size="md">
                    Ver en Mis Pedidos
                  </Button>
                </Link>
                <Link to="/productos">
                  <Button variant="outline" size="md">
                    Volver a la Tienda
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Persistent Order Summary */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft sticky top-28 space-y-5">
            <h3 className="font-display font-bold text-base text-coffee-950 pb-3 border-b border-cream-100">
              Resumen de Compra
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map(({ producto, cantidad, subtotal: s }) => (
                <div key={producto.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={producto.lote.imagenPrincipal}
                    alt={producto.lote.nombre}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 bg-cream-100"
                  />
                  <div className="flex-1 truncate">
                    <span className="font-bold text-coffee-900 block truncate">{producto.lote.nombre}</span>
                    <span className="text-coffee-500 text-[10px]">{cantidad} un. × ${producto.precio.toLocaleString("es-CO")}</span>
                  </div>
                  <span className="font-mono font-bold text-coffee-950">${s.toLocaleString("es-CO")}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-cream-100 space-y-2 text-xs">
              <div className="flex justify-between text-coffee-600">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-coffee-950">${subtotal.toLocaleString("es-CO")}</span>
              </div>
              <div className="flex justify-between text-coffee-600">
                <span>Envío nacional</span>
                <span className="font-mono font-bold text-coffee-950">${costoEnvio.toLocaleString("es-CO")}</span>
              </div>
              <div className="pt-2 border-t border-cream-200 flex justify-between text-sm font-display font-bold text-coffee-950">
                <span>Total a pagar</span>
                <span className="text-forest-800 text-lg font-black">${total.toLocaleString("es-CO")} COP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
