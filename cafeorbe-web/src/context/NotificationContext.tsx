import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Info, X, Bell } from "lucide-react";
import { Notificacion, TipoNotificacion } from "../types";
import { cn } from "../utils/cn";

interface ToastItem {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
}

interface NotificationContextType {
  toasts: ToastItem[];
  notificaciones: Notificacion[];
  totalNoLeidas: number;
  mostrarToast: (tipo: TipoNotificacion, titulo: string, mensaje: string) => void;
  removerToast: (id: string) => void;
  marcarLeida: (id: string) => void;
  marcarTodasLeidas: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: "notif-01",
      tipo: "SISTEMA",
      titulo: "Bienvenido a CafeOrbe",
      mensaje: "Explora cafés de especialidad o participa en subastas en vivo del Eje Cafetero.",
      fecha: "Hace 5 minutos",
      leida: false,
    },
    {
      id: "notif-02",
      tipo: "SUBASTA_POR_CERRAR",
      titulo: "Subasta en vivo activa",
      mensaje: "El lote Geisha Honey Finca El Paraíso está en sus últimos minutos.",
      fecha: "Hace 2 minutos",
      leida: false,
      enlace: "/subastas/subasta-activa-01",
    }
  ]);

  const removerToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const mostrarToast = useCallback(
    (tipo: TipoNotificacion, titulo: string, mensaje: string) => {
      const id = crypto.randomUUID();
      const nuevoToast: ToastItem = { id, tipo, titulo, mensaje };

      setToasts((prev) => [...prev, nuevoToast]);

      // Guardar también en el historial
      const nuevaNotif: Notificacion = {
        id: crypto.randomUUID(),
        tipo,
        titulo,
        mensaje,
        fecha: "Justo ahora",
        leida: false,
      };
      setNotificaciones((prev) => [nuevaNotif, ...prev]);

      // Auto-eliminar toast a los 4.5 segundos
      setTimeout(() => {
        removerToast(id);
      }, 4500);
    },
    [removerToast]
  );

  const marcarLeida = (id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const marcarTodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  const totalNoLeidas = notificaciones.filter((n) => !n.leida).length;

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        notificaciones,
        totalNoLeidas,
        mostrarToast,
        removerToast,
        marcarLeida,
        marcarTodasLeidas,
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.tipo === "PUJA_EXITOSA" || toast.tipo === "PEDIDO_ENVIADO";
          const isWarning = toast.tipo === "PUJA_SUPERADA" || toast.tipo === "SUBASTA_POR_CERRAR" || toast.tipo === "TIEMPO_EXTENDIDO";

          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-soft-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5",
                isSuccess
                  ? "bg-forest-900/95 text-cream-50 border-forest-700"
                  : isWarning
                  ? "bg-coffee-950/95 text-cream-50 border-earth-600/80"
                  : "bg-white/95 text-coffee-950 border-cream-300"
              )}
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess ? (
                  <CheckCircle2 className="w-5 h-5 text-forest-300" />
                ) : isWarning ? (
                  <Bell className="w-5 h-5 text-earth-400 animate-bounce" />
                ) : (
                  <Info className="w-5 h-5 text-coffee-600" />
                )}
              </div>
              <div className="flex-1 text-left pr-2">
                <h4 className="text-sm font-bold font-display">{toast.titulo}</h4>
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{toast.mensaje}</p>
              </div>
              <button
                onClick={() => removerToast(toast.id)}
                className="shrink-0 p-1 opacity-60 hover:opacity-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe usarse dentro de un NotificationProvider");
  }
  return context;
};
