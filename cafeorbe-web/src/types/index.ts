export type Rol = "COMPRADOR" | "VENDEDOR" | "ADMIN";

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  celular: string;
  direccion: string;
  municipio: string;
  departamento: string;
  codigoPostal?: string;
  rol: Rol;
  token?: string;
  avatarUrl?: string;
}

export type ProcesoBeneficio =
  | "Lavado"
  | "Natural"
  | "Honey"
  | "Anaeróbico"
  | "Fermentación Carbónica"
  | "Doble Fermentación";

export interface Lote {
  id: string;
  nombre: string;
  productorId: string;
  productorNombre: string;
  fincaNombre: string;
  origen: string; // Ej: "Huila, Colombia"
  municipio: string;
  departamento: string;
  altitudMsnm: number; // Metros sobre el nivel del mar
  variedad: string; // Geisha, Bourbon Rosado, Castillo, etc.
  procesoBeneficio: ProcesoBeneficio;
  puntajeCatacion: number; // Escala SCA (80 - 100)
  perfilSensorial: {
    aroma: number; // 1 - 10
    acidez: number; // 1 - 10
    cuerpo: number; // 1 - 10
    dulzor: number; // 1 - 10
    balance: number; // 1 - 10
  };
  notasSensoriales: string[]; // Ej: "Jazmín", "Panela", "Cerezo", "Miel"
  descripcion: string;
  historiaFinca: string;
  fechaCosecha: string;
  certificaciones?: string[];
  imagenPrincipal: string;
  galeriaImagenes: string[];
}

export interface Producto {
  id: string;
  lote: Lote;
  precio: number; // En COP
  pesoGramos: number; // 250g, 500g, 1000g
  stock: number;
  etiquetas: ("Especialidad" | "Microlote" | "Nuevo" | "Más vendido" | "Edición Limitada")[];
  disponible: boolean;
  calificacionPromedio: number;
  totalResenas: number;
}

export type EstadoSubasta = "PROGRAMADA" | "INICIADA" | "CERRADA";

export interface Subasta {
  id: string;
  loteId: string;
  lote: Lote;
  precioBase: number;
  precioActual: number;
  incrementoMinimo: number;
  liderId: string | null;
  liderNombre: string | null;
  fechaInicio: string;
  deadline: string; // ISO 8601 absoluto del servidor
  totalPujas: number;
  estado: EstadoSubasta;
  streamActivo: boolean;
  espectadoresConectados: number;
}

export interface Puja {
  id: string;
  subastaId: string;
  pujadorId: string;
  pujadorNombre: string;
  monto: number;
  fechaHora: string;
  claveIdempotencia: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

export interface DatosEnvio {
  nombreCompleto: string;
  email: string;
  celular: string;
  departamento: string;
  municipio: string;
  direccion: string;
  barrio?: string;
  codigoPostal?: string;
  notasEntrega?: string;
}

export type MetodoPago = "TARJETA" | "PSE" | "TRANSFERENCIA";
export type MetodoEnvio = "ESTANDAR_EJE_CAFETERO" | "EXPRESS";

export type EstadoPedido =
  | "PENDIENTE"
  | "PAGADO"
  | "EN_PREPARACION"
  | "ENVIADO"
  | "ENTREGADO";

export interface Pedido {
  id: string;
  codigoOrden: string;
  usuarioId: string;
  items: ItemCarrito[];
  subtotal: number;
  costoEnvio: number;
  total: number;
  datosEnvio: DatosEnvio;
  metodoPago: MetodoPago;
  metodoEnvio: MetodoEnvio;
  estado: EstadoPedido;
  fechaCreacion: string;
  numeroGuia?: string;
  transportadora?: string;
}

export type TipoNotificacion =
  | "PUJA_SUPERADA"
  | "PUJA_EXITOSA"
  | "SUBASTA_POR_CERRAR"
  | "SUBASTA_GANADA"
  | "TIEMPO_EXTENDIDO"
  | "PEDIDO_ENVIADO"
  | "PEDIDO_ENTREGADO"
  | "SISTEMA"
  | "INFO";

export interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  enlace?: string;
}

export interface FiltrosCatalogo {
  busqueda: string;
  departamento: string;
  variedad: string;
  proceso: string;
  puntajeMinimo: number;
  precioMaximo: number;
  soloDisponibles: boolean;
  ordenarPor: "relevancia" | "precio_asc" | "precio_desc" | "puntaje_desc" | "recientes";
}
