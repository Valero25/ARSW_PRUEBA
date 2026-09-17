import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Gavel,
  Heart,
  Package,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  TrendingUp,
  Boxes,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab }) => {
  const { usuario, rol, cambiarRol, logout } = useAuth();

  const esAdminOVendedor = rol === "ADMIN" || rol === "VENDEDOR";

  const compradorLinks = [
    { id: "resumen", name: "Resumen y Estadísticas", icon: <LayoutDashboard className="w-4 h-4" />, path: "/perfil" },
    { id: "compras", name: "Mis Compras y Pedidos", icon: <ShoppingBag className="w-4 h-4" />, path: "/perfil" },
    { id: "pujas", name: "Mis Pujas en Vivo", icon: <Gavel className="w-4 h-4" />, path: "/perfil" },
    { id: "favoritos", name: "Cafés Favoritos", icon: <Heart className="w-4 h-4" />, path: "/perfil" },
  ];

  const vendedorLinks = [
    { id: "metricas", name: "Panel de Ventas", icon: <TrendingUp className="w-4 h-4" />, path: "/admin" },
    { id: "lotes", name: "Mis Lotes y Fincas", icon: <Boxes className="w-4 h-4" />, path: "/admin" },
    { id: "nuevo-lote", name: "Publicar Nuevo Lote", icon: <PlusCircle className="w-4 h-4 text-forest-600" />, path: "/admin" },
    { id: "subastas-activas", name: "Gestionar Subastas", icon: <Gavel className="w-4 h-4 text-earth-600" />, path: "/admin" },
    { id: "despachos", name: "Control de Envíos", icon: <Package className="w-4 h-4" />, path: "/admin" },
  ];

  const links = esAdminOVendedor ? vendedorLinks : compradorLinks;

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-coffee-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="p-6 rounded-2xl bg-white border border-cream-200/80 shadow-soft text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-coffee-900 text-cream-50 flex items-center justify-center overflow-hidden border-2 border-earth-400/80 shrink-0">
                  {usuario?.avatarUrl ? (
                    <img src={usuario.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-7 h-7 text-earth-400" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-display font-bold text-base text-coffee-950 truncate">
                    {usuario?.nombre || "Usuario"}
                  </h3>
                  <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-cream-200 text-coffee-800 uppercase tracking-wide mt-1">
                    {rol === "ADMIN" ? "Administrador" : rol === "VENDEDOR" ? "Caficultor Oficial" : "Comprador Verificado"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-cream-100 text-xs text-coffee-600 space-y-1">
                <p className="truncate"><strong className="text-coffee-900">Email:</strong> {usuario?.email}</p>
                <p><strong className="text-coffee-900">Origen:</strong> {usuario?.municipio}, {usuario?.departamento}</p>
              </div>

              {/* Demo switch button */}
              <div className="mt-5 pt-4 border-t border-cream-100">
                <label className="block text-[10px] font-extrabold uppercase text-coffee-400 tracking-wider mb-2">
                  Cambiar Rol de Prueba:
                </label>
                <div className="flex rounded-xl p-1 bg-cream-100 text-xs font-semibold">
                  <button
                    onClick={() => cambiarRol("COMPRADOR")}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg transition-all",
                      rol === "COMPRADOR" ? "bg-coffee-900 text-cream-50 shadow-sm" : "text-coffee-700"
                    )}
                  >
                    Comprador
                  </button>
                  <button
                    onClick={() => cambiarRol("VENDEDOR")}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg transition-all",
                      rol === "VENDEDOR" ? "bg-coffee-900 text-cream-50 shadow-sm" : "text-coffee-700"
                    )}
                  >
                    Caficultor
                  </button>
                  <button
                    onClick={() => cambiarRol("ADMIN")}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg transition-all",
                      rol === "ADMIN" ? "bg-coffee-900 text-cream-50 shadow-sm" : "text-coffee-700"
                    )}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="p-3 rounded-2xl bg-white border border-cream-200/80 shadow-soft text-left space-y-1">
              <div className="px-3 py-2 text-[10px] font-bold text-coffee-400 uppercase tracking-wider">
                {esAdminOVendedor ? "Gestión de Finca & Subastas" : "Mi Espacio"}
              </div>

              {links.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                    activeTab === link.id || (!activeTab && link.id === links[0].id)
                      ? "bg-coffee-900 text-cream-50"
                      : "text-coffee-700 hover:bg-cream-100 hover:text-coffee-950"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              <div className="pt-2 border-t border-cream-100">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Dashboard Area */}
          <main className="lg:col-span-3 text-left">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
