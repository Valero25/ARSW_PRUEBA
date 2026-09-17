import { httpClient, ApiError } from "./httpClient";
import { Rol, Usuario } from "../types";

// El backend (cafeorbe-identity-service) usa "ADMINISTRADOR"; el front usa "ADMIN".
type RolBackend = "COMPRADOR" | "VENDEDOR" | "ADMINISTRADOR";

function rolABackend(rol: Rol): RolBackend {
  return rol === "ADMIN" ? "ADMINISTRADOR" : rol;
}

function rolAFront(rol: RolBackend): Rol {
  return rol === "ADMINISTRADOR" ? "ADMIN" : rol;
}

export interface RegistroInput {
  correo: string;
  password: string;
  nombreCompleto: string;
  residencia: string;
  celular: string;
  codigoPostal: string;
  rol: Rol;
}

interface UsuarioResponseDTO {
  id: string;
  correo: string;
  nombreCompleto: string;
  rol: RolBackend;
  fechaRegistro: string;
}

interface LoginResponseDTO {
  token: string;
  rol: RolBackend;
}

function usuarioDesdeDTO(dto: UsuarioResponseDTO, extra?: Partial<Usuario>): Usuario {
  return {
    id: dto.id,
    nombre: dto.nombreCompleto,
    email: dto.correo,
    celular: extra?.celular ?? "",
    direccion: extra?.direccion ?? "",
    municipio: extra?.municipio ?? "",
    departamento: extra?.departamento ?? "",
    codigoPostal: extra?.codigoPostal,
    rol: rolAFront(dto.rol),
    token: extra?.token,
  };
}

/** Mensaje legible a partir del error devuelto por identity-service (400/401/409). */
export function mensajeDeError(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    if (error.body && typeof error.body === "object") {
      const body = error.body as Record<string, string>;
      if (body.error) return body.error;
      const primerCampo = Object.values(body)[0];
      if (primerCampo) return primerCampo;
    }
    if (error.status === 401) return "Correo o contraseña incorrectos.";
    if (error.status === 409) return "Ese correo ya está registrado.";
  }
  return fallback;
}

export const authService = {
  async registrar(datos: RegistroInput): Promise<Usuario> {
    const dto = await httpClient.post<UsuarioResponseDTO>("/auth/registro", {
      correo: datos.correo,
      password: datos.password,
      nombreCompleto: datos.nombreCompleto,
      residencia: datos.residencia,
      celular: datos.celular,
      codigoPostal: datos.codigoPostal,
      rol: rolABackend(datos.rol),
    });
    return usuarioDesdeDTO(dto, { celular: datos.celular, direccion: datos.residencia, codigoPostal: datos.codigoPostal });
  },

  async login(correo: string, password: string): Promise<Usuario> {
    const { token } = await httpClient.post<LoginResponseDTO>("/auth/login", { correo, password });
    localStorage.setItem("cafeorbe_token", token);
    const dto = await httpClient.get<UsuarioResponseDTO>("/usuarios/me");
    return usuarioDesdeDTO(dto, { token });
  },

  async obtenerUsuarioActual(): Promise<Usuario> {
    const dto = await httpClient.get<UsuarioResponseDTO>("/usuarios/me");
    return usuarioDesdeDTO(dto, { token: localStorage.getItem("cafeorbe_token") ?? undefined });
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem("cafeorbe_token");
    if (!token) return;
    try {
      await httpClient.post<void>("/auth/logout");
    } catch {
      // si el token ya expiró o el servicio no responde, igual limpiamos sesión local
    }
  },
};
