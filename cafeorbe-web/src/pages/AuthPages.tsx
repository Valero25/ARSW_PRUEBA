import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Rol } from "../types";
import { mensajeDeError } from "../services/authService";

export const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const { mostrarToast } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const u = await login(correo, password);
      mostrarToast("SISTEMA", "Sesión iniciada", "Bienvenido de nuevo a CafeOrbe.");
      navigate(u.rol === "ADMIN" || u.rol === "VENDEDOR" ? "/admin" : "/perfil");
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo iniciar sesión. Intenta de nuevo."));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-cream-200 shadow-soft-lg text-left space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-coffee-900 text-cream-50 flex items-center justify-center mx-auto shadow-sm">
            <Coffee className="w-6 h-6 text-earth-400" />
          </div>
          <h1 className="font-display font-black text-2xl text-coffee-950">Iniciar Sesión</h1>
          <p className="text-xs text-coffee-500">Accede a tus pujas, subastas y cafés favoritos</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Correo Electrónico"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-rose-600 text-center">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={cargando}>
            Ingresar a CafeOrbe
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-cream-100 text-xs text-coffee-500">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/registro" className="font-bold text-earth-700 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [celular, setCelular] = useState("");
  const [departamento, setDepartamento] = useState("Quindío");
  const [municipio, setMunicipio] = useState("Armenia");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [rol, setRol] = useState<Rol>("COMPRADOR");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const { registrar } = useAuth();
  const { mostrarToast } = useNotification();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await registrar({
        correo,
        password,
        nombreCompleto,
        celular,
        codigoPostal,
        residencia: `${municipio}, ${departamento}`,
        rol,
      });
      mostrarToast("PUJA_EXITOSA", "Registro completado", `Bienvenido a CafeOrbe como ${rol === "VENDEDOR" ? "caficultor" : "comprador"}.`);
      navigate(rol === "VENDEDOR" ? "/admin" : "/perfil");
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo completar el registro. Intenta de nuevo."));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-cream-200 shadow-soft-lg text-left space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-cream-50 flex items-center justify-center mx-auto shadow-sm">
            <UserCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="font-display font-black text-2xl text-coffee-950">Crear Cuenta</h1>
          <p className="text-xs text-coffee-500">Únete a la plataforma de café de especialidad de Colombia</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1.5">
              Tipo de Perfil:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRol("COMPRADOR")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  rol === "COMPRADOR"
                    ? "bg-coffee-900 text-cream-50 border-coffee-900"
                    : "bg-cream-50 text-coffee-700 border-cream-200"
                }`}
              >
                Comprador / Catador
              </button>
              <button
                type="button"
                onClick={() => setRol("VENDEDOR")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  rol === "VENDEDOR"
                    ? "bg-coffee-900 text-cream-50 border-coffee-900"
                    : "bg-cream-50 text-coffee-700 border-cream-200"
                }`}
              >
                Caficultor / Productor
              </button>
            </div>
          </div>

          <Input
            label="Nombre Completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            placeholder="Ej: Hernando Gómez"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Correo Electrónico"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              minLength={8}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              placeholder="+57 300 000 0000"
              required
            />
            <Input
              label="Código Postal"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              placeholder="Ej: 630004"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              placeholder="Ej: Huila, Quindío"
              required
            />
            <Input
              label="Municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              placeholder="Ej: Pitalito, Armenia"
              required
            />
          </div>

          {error && <p className="text-sm text-rose-600 text-center">{error}</p>}

          <Button type="submit" variant="forest" size="lg" className="w-full" isLoading={cargando}>
            Registrarme en CafeOrbe
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-cream-100 text-xs text-coffee-500">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-bold text-earth-700 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
