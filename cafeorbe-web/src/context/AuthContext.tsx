import React, { createContext, useContext, useState, useEffect } from "react";
import { Usuario, Rol } from "../types";
import { MOCK_USUARIOS } from "../data/mockData";
import { authService, RegistroInput } from "../services/authService";

interface AuthContextType {
  usuario: Usuario | null;
  rol: Rol;
  estaAutenticado: boolean;
  cargandoSesion: boolean;
  cambiarRol: (nuevoRol: Rol) => void;
  login: (correo: string, password: string) => Promise<Usuario>;
  registrar: (datos: RegistroInput) => Promise<Usuario>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rol, setRol] = useState<Rol>(() => {
    return (localStorage.getItem("cafeorbe_demo_rol") as Rol) || "COMPRADOR";
  });

  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem("cafeorbe_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return null;
  });

  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    localStorage.setItem("cafeorbe_demo_rol", rol);
  }, [rol]);

  // Al montar, si hay un token guardado, se valida contra el backend real
  // (cafeorbe-identity-service vía cafeorbe-api-gateway) en lugar de confiar
  // ciegamente en lo que quedó en localStorage.
  useEffect(() => {
    const token = localStorage.getItem("cafeorbe_token");
    if (!token) {
      setCargandoSesion(false);
      return;
    }
    authService
      .obtenerUsuarioActual()
      .then((u) => {
        setUsuario(u);
        setRol(u.rol);
        localStorage.setItem("cafeorbe_user", JSON.stringify(u));
      })
      .catch(() => {
        setUsuario(null);
        localStorage.removeItem("cafeorbe_user");
        localStorage.removeItem("cafeorbe_token");
      })
      .finally(() => setCargandoSesion(false));
  }, []);

  const cambiarRol = (nuevoRol: Rol) => {
    setRol(nuevoRol);
    if (nuevoRol === "COMPRADOR") {
      setUsuario(MOCK_USUARIOS.comprador);
    } else if (nuevoRol === "VENDEDOR") {
      setUsuario(MOCK_USUARIOS.vendedor);
    } else {
      setUsuario(MOCK_USUARIOS.admin);
    }
  };

  const login = async (correo: string, password: string) => {
    const u = await authService.login(correo, password);
    setUsuario(u);
    setRol(u.rol);
    localStorage.setItem("cafeorbe_user", JSON.stringify(u));
    return u;
  };

  const registrar = async (datos: RegistroInput) => {
    await authService.registrar(datos);
    return login(datos.correo, datos.password);
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
    localStorage.removeItem("cafeorbe_user");
    localStorage.removeItem("cafeorbe_token");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        rol,
        estaAutenticado: !!usuario,
        cargandoSesion,
        cambiarRol,
        login,
        registrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
