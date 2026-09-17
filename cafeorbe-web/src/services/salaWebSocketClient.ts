const REALTIME_URL = import.meta.env.VITE_REALTIME_GATEWAY_URL ?? "ws://localhost:8090";

type TipoMensaje =
  | "estado_inicial"
  | "puja_registrada"
  | "tiempo_extendido"
  | "conectados"
  | "subasta_cerrada";

interface MensajeSala {
  tipo: TipoMensaje;
  datos: unknown;
}

type Handler = (datos: unknown) => void;

/**
 * Reconexión sin pérdida (README): al reconectar, el consumidor debe volver
 * a pedir el estado completo antes de repintar. Este cliente no lo hace por
 * sí solo — expone onOpen para que la vista dispare esa petición REST cada
 * vez que la conexión se (re)establece, incluida la primera.
 */
export class SalaWebSocketClient {
  private socket: WebSocket | null = null;
  private readonly handlers = new Map<TipoMensaje, Handler[]>();
  private reintentoMs = 1000;

  constructor(private readonly subastaId: string) {}

  on(tipo: TipoMensaje, handler: Handler): void {
    const lista = this.handlers.get(tipo) ?? [];
    lista.push(handler);
    this.handlers.set(tipo, lista);
  }

  conectar(onOpen: () => void): void {
    this.socket = new WebSocket(`${REALTIME_URL}/salas/${this.subastaId}`);

    this.socket.onopen = () => {
      this.reintentoMs = 1000;
      onOpen();
    };

    this.socket.onmessage = (event) => {
      const mensaje = JSON.parse(event.data) as MensajeSala;
      for (const handler of this.handlers.get(mensaje.tipo) ?? []) {
        handler(mensaje.datos);
      }
    };

    this.socket.onclose = () => {
      setTimeout(() => this.conectar(onOpen), this.reintentoMs);
      this.reintentoMs = Math.min(this.reintentoMs * 2, 15000);
    };
  }

  cerrar(): void {
    this.socket?.close();
    this.socket = null;
  }
}
