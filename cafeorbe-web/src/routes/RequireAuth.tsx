import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { estaAutenticado, cargandoSesion } = useAuth();

  if (cargandoSesion) {
    return null;
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
