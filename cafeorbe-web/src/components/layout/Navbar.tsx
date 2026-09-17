import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Coffee,
  ShoppingBag,
  Bell,
  User,
  Menu,
  X,
  Gavel,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";
import { Rol } from "../../types";
import { cn } from "../../utils/cn";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const { usuario, rol, cambiarRol, estaAutenticado } = useAuth();
  const { totalCantidad } = useCart();
  const { notificaciones, totalNoLeidas, marcarTodasLeidas } = useNotification();
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Cafés de Especialidad", path: "/productos" },
    { name: "Subastas en Vivo", path: "/subastas", isAuction: true },
  ];

  const rolesDisponibles: { key: Rol; label: string; desc: string }[] = [
    { key: "COMPRADOR", label: "Comprador / Catador", desc: "Pujar y comprar lotes de café" },
    { key: "VENDEDOR", label: "Caficultor / Vendedor", desc: "Gestionar fincas, lotes y subastas" },
    { key: "ADMIN", label: "Administrador", desc: "Métricas del sistema y auditoría" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo CafeOrbe */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-coffee-900 to-coffee-800 flex items-center justify-center text-cream-50 shadow-soft group-hover:scale-105 transition-transform">
              <Coffee className="w-6 h-6 stroke-[1.8] text-earth-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-2xl tracking-tight text-coffee-950 flex items-center gap-1.5">
                CafeOrbe
                <span className="w-2 h-2 rounded-full bg-forest-600"></span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-earth-600 -mt-1">
                Eje Cafetero · Especialidad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-cream-200/50 p-1.5 rounded-2xl border border-cream-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
                  isActive(link.path)
                    ? "bg-white text-coffee-950 shadow-soft"
                    : "text-coffee-700 hover:text-coffee-950 hover:bg-white/50",
                  link.isAuction && "text-coffee-900"
                )}
              >
                {link.isAuction && <Gavel className="w-3.5 h-3.5 text-forest-600 animate-pulse" />}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Role Selector, Cart, Notifications & Auth */}
          <div className="flex items-center gap-2.5">
            {/* Fast Demo Role Switcher */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-earth-100/80 text-earth-900 border border-earth-200 hover:bg-earth-200 transition-colors"
                title="Cambiar perspectiva para demostración"
              >
                <Sparkles className="w-3.5 h-3.5 text-earth-600" />
                <span>Vista: <strong className="capitalize">{rol.toLowerCase()}</strong></span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-cream-200 p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-coffee-400 uppercase tracking-wider">
                    Conmutador de Rol Demo
                  </div>
                  {rolesDisponibles.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => {
                        cambiarRol(r.key);
                        setRoleMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-colors flex flex-col gap-0.5",
                        rol === r.key
                          ? "bg-coffee-900 text-cream-50"
                          : "hover:bg-cream-100 text-coffee-900"
                      )}
                    >
                      <span className="font-bold">{r.label}</span>
                      <span className={cn("text-[10px]", rol === r.key ? "text-cream-200" : "text-coffee-500")}>
                        {r.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2.5 rounded-xl bg-white border border-cream-200/80 text-coffee-800 hover:bg-cream-100 transition-colors"
                aria-label="Notificaciones"
              >
                <Bell className="w-5 h-5" />
                {totalNoLeidas > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {totalNoLeidas}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-cream-200 p-3 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setNotifDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-cream-100">
                    <span className="font-display font-bold text-sm text-coffee-950">
                      Notificaciones ({totalNoLeidas})
                    </span>
                    {totalNoLeidas > 0 && (
                      <button
                        onClick={marcarTodasLeidas}
                        className="text-[11px] text-earth-700 hover:underline font-semibold"
                      >
                        Marcar todas leídas
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notificaciones.length === 0 ? (
                      <p className="text-xs text-coffee-500 text-center py-6">
                        No tienes notificaciones pendientes.
                      </p>
                    ) : (
                      notificaciones.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "p-2.5 rounded-xl text-left border transition-colors",
                            n.leida
                              ? "bg-cream-50/50 border-cream-100 text-coffee-600"
                              : "bg-cream-100/60 border-earth-200 text-coffee-900"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-display">{n.titulo}</span>
                            <span className="text-[10px] text-coffee-400">{n.fecha}</span>
                          </div>
                          <p className="text-xs mt-0.5 leading-relaxed">{n.mensaje}</p>
                          {n.enlace && (
                            <Link
                              to={n.enlace}
                              onClick={() => setNotifDropdownOpen(false)}
                              className="inline-block mt-1 text-[11px] font-bold text-earth-700 hover:underline"
                            >
                              Ver subasta en vivo →
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              to="/carrito"
              className="relative p-2.5 rounded-xl bg-white border border-cream-200/80 text-coffee-800 hover:bg-cream-100 transition-colors flex items-center justify-center"
              aria-label="Carrito de compra"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCantidad > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-forest-700 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalCantidad}
                </span>
              )}
            </Link>

            {/* User Profile / Dashboard link */}
            {estaAutenticado ? (
              <Link
                to={rol === "ADMIN" || rol === "VENDEDOR" ? "/admin" : "/perfil"}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-coffee-900 text-cream-50 hover:bg-coffee-800 transition-colors shadow-soft"
              >
                <div className="w-7 h-7 rounded-lg bg-coffee-800 overflow-hidden flex items-center justify-center border border-coffee-700">
                  {usuario?.avatarUrl ? (
                    <img src={usuario.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-earth-400" />
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight truncate max-w-[110px]">
                    {usuario?.nombre?.split(" ")[0] || "Mi Cuenta"}
                  </span>
                  <span className="text-[10px] text-earth-300 font-medium">
                    {rol === "ADMIN" ? "Panel Admin" : rol === "VENDEDOR" ? "Panel Caficultor" : "Mi Panel"}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-coffee-900 text-cream-50 hover:bg-coffee-800 transition-colors"
              >
                Ingresar
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white border border-cream-200 text-coffee-900"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cream-200 px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between",
                  isActive(link.path)
                    ? "bg-coffee-900 text-cream-50"
                    : "bg-cream-50 text-coffee-900 hover:bg-cream-100"
                )}
              >
                <span>{link.name}</span>
                {link.isAuction && <Gavel className="w-4 h-4 text-earth-400" />}
              </Link>
            ))}
          </nav>

          {/* Mobile Role Switcher */}
          <div className="pt-3 border-t border-cream-200">
            <label className="block text-xs font-bold text-coffee-500 uppercase tracking-wider mb-2">
              Cambiar Perspectiva Demo:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {rolesDisponibles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    cambiarRol(r.key);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "py-2 px-1 text-center rounded-xl text-xs font-bold border transition-colors",
                    rol === r.key
                      ? "bg-coffee-900 text-cream-50 border-coffee-900"
                      : "bg-cream-50 text-coffee-800 border-cream-300"
                  )}
                >
                  {r.key === "COMPRADOR" ? "Comprador" : r.key === "VENDEDOR" ? "Caficultor" : "Admin"}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-cream-200 flex flex-col gap-2">
            <Link
              to={rol === "ADMIN" || rol === "VENDEDOR" ? "/admin" : "/perfil"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-xl bg-forest-800 text-cream-50 font-bold text-sm"
            >
              Ir a mi Dashboard ({rol})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
