import React, { createContext, useContext, useState, useCallback } from "react";
import { Subasta, Puja } from "../types";
import { MOCK_SUBASTAS } from "../data/mockData";
import { useNotification } from "./NotificationContext";
import { useAuth } from "./AuthContext";
import { generarClaveIdempotencia } from "../features/subasta/idempotencia";
import { httpClient } from "../services/httpClient";

interface AuctionContextType {
  subastas: Subasta[];
  obtenerSubasta: (id: string) => Subasta | undefined;
  obtenerHistorialPujas: (subastaId: string) => Puja[];
  registrarPuja: (subastaId: string, monto: number) => Promise<boolean>;
  esLiderActual: (subastaId: string) => boolean;
  simularPujaRival: (subastaId: string) => void;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subastas, setSubastas] = useState<Subasta[]>(MOCK_SUBASTAS);
  const [historialPujas, setHistorialPujas] = useState<Record<string, Puja[]>>({
    "subasta-activa-01": [
      {
        id: "puja-01",
        subastaId: "subasta-activa-01",
        pujadorId: "u-ext-01",
        pujadorNombre: "Specialty Imports Seattle",
        monto: 1600000,
        fechaHora: new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        claveIdempotencia: crypto.randomUUID()
      },
      {
        id: "puja-02",
        subastaId: "subasta-activa-01",
        pujadorId: "u-ext-02",
        pujadorNombre: "Kaffehaus Berlin",
        monto: 1750000,
        fechaHora: new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        claveIdempotencia: crypto.randomUUID()
      },
      {
        id: "puja-03",
        subastaId: "subasta-activa-01",
        pujadorId: "u-comprador-01",
        pujadorNombre: "Carlos Mendoza (Tú)",
        monto: 1850000,
        fechaHora: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        claveIdempotencia: crypto.randomUUID()
      }
    ]
  });

  const { mostrarToast } = useNotification();
  const { usuario } = useAuth();

  const obtenerSubasta = useCallback((id: string) => {
    return subastas.find((s) => s.id === id);
  }, [subastas]);

  const obtenerHistorialPujas = useCallback((subastaId: string) => {
    return historialPujas[subastaId] || [];
  }, [historialPujas]);

  const esLiderActual = useCallback((subastaId: string) => {
    const subasta = subastas.find((s) => s.id === subastaId);
    if (!subasta || !usuario) return false;
    return subasta.liderId === usuario.id;
  }, [subastas, usuario]);

  // Simular puja de competidor para demostrar interactividad en vivo
  const simularPujaRival = useCallback((subastaId: string) => {
    const nombresRivales = [
      "Blue Bottle Coffee",
      "Kyoto Specialty Lab",
      "Café de Paris Roasters",
      "Stockholm Artisan Coffee",
      "Melbourne Brew Co."
    ];
    const nombre = nombresRivales[Math.floor(Math.random() * nombresRivales.length)];

    setSubastas((prev) =>
      prev.map((s) => {
        if (s.id !== subastaId) return s;
        const nuevoMonto = s.precioActual + s.incrementoMinimo;
        const deadlineDate = new Date(s.deadline).getTime();
        const ahora = Date.now();
        const segundosRestantes = Math.round((deadlineDate - ahora) / 1000);

        let nuevoDeadline = s.deadline;
        // Regla anti-sniping si faltan menos de 30 segundos
        if (segundosRestantes <= 30 && segundosRestantes > 0) {
          nuevoDeadline = new Date(ahora + 60 * 1000).toISOString();
          mostrarToast(
            "TIEMPO_EXTENDIDO",
            "Regla Anti-sniping Aplicada",
            "Un competidor pujó al final: se han extendido +60 segundos al temporizador."
          );
        }

        return {
          ...s,
          precioActual: nuevoMonto,
          liderId: "rival-" + Date.now(),
          liderNombre: nombre,
          totalPujas: s.totalPujas + 1,
          deadline: nuevoDeadline
        };
      })
    );

    const pujaNueva: Puja = {
      id: crypto.randomUUID(),
      subastaId,
      pujadorId: "rival-id",
      pujadorNombre: nombre,
      monto: (subastas.find((s) => s.id === subastaId)?.precioActual || 0) + 50000,
      fechaHora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      claveIdempotencia: crypto.randomUUID()
    };

    setHistorialPujas((prev) => ({
      ...prev,
      [subastaId]: [pujaNueva, ...(prev[subastaId] || [])]
    }));

    mostrarToast(
      "PUJA_SUPERADA",
      "¡Has sido superado en la subasta!",
      `${nombre} ha realizado una nueva puja líder por $${pujaNueva.monto.toLocaleString("es-CO")} COP.`
    );
  }, [subastas, mostrarToast]);

  const registrarPuja = async (subastaId: string, monto: number): Promise<boolean> => {
    const subasta = subastas.find((s) => s.id === subastaId);
    if (!subasta) return false;

    if (monto <= subasta.precioActual) {
      mostrarToast("INFO", "Monto insuficiente", "Tu puja debe ser mayor al precio actual.");
      return false;
    }

    const clave = generarClaveIdempotencia();
    const pujadorId = usuario?.id || "u-comprador-01";
    const pujadorNombre = usuario?.nombre ? `${usuario.nombre} (Tú)` : "Tú";

    // Intento contra API Gateway si está disponible
    try {
      await httpClient.post(`/subastas/${subastaId}/pujas`, {
        monto,
        claveIdempotencia: clave,
      });
    } catch {
      // Backend desconectado o en modo autónomo: continuar con optimismo reactivo
    }

    const deadlineDate = new Date(subasta.deadline).getTime();
    const ahora = Date.now();
    const segundosRestantes = Math.round((deadlineDate - ahora) / 1000);

    let nuevoDeadline = subasta.deadline;
    if (segundosRestantes <= 30 && segundosRestantes > 0) {
      // Regla Anti-sniping: extender 60 segundos
      nuevoDeadline = new Date(ahora + 60 * 1000).toISOString();
      mostrarToast(
        "TIEMPO_EXTENDIDO",
        "Regla Anti-Sniping",
        "Puja en últimos 30 segundos. El reloj se ha extendido +60s automáticamente."
      );
    }

    setSubastas((prev) =>
      prev.map((s) =>
        s.id === subastaId
          ? {
              ...s,
              precioActual: monto,
              liderId: pujadorId,
              liderNombre: pujadorNombre,
              totalPujas: s.totalPujas + 1,
              deadline: nuevoDeadline,
            }
          : s
      )
    );

    const nuevaPuja: Puja = {
      id: crypto.randomUUID(),
      subastaId,
      pujadorId,
      pujadorNombre,
      monto,
      fechaHora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      claveIdempotencia: clave,
    };

    setHistorialPujas((prev) => ({
      ...prev,
      [subastaId]: [nuevaPuja, ...(prev[subastaId] || [])],
    }));

    mostrarToast(
      "PUJA_EXITOSA",
      "¡Puja aceptada exitosamente!",
      `Eres el nuevo líder de la subasta con $${monto.toLocaleString("es-CO")} COP.`
    );

    return true;
  };

  return (
    <AuctionContext.Provider
      value={{
        subastas,
        obtenerSubasta,
        obtenerHistorialPujas,
        registrarPuja,
        esLiderActual,
        simularPujaRival,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error("useAuction debe usarse dentro de un AuctionProvider");
  }
  return context;
};
