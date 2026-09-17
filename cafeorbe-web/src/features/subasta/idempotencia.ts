/**
 * Cada puja lleva clave de idempotencia (README): un doble clic o un
 * reintento de red no debe registrar dos pujas. Se genera una clave nueva
 * por cada intento de puja, no por sesión.
 */
export function generarClaveIdempotencia(): string {
  return crypto.randomUUID();
}
