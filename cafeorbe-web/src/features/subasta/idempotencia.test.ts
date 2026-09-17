import { describe, it, expect } from "vitest";
import { generarClaveIdempotencia } from "./idempotencia";

describe("generarClaveIdempotencia", () => {
  it("debe generar un UUID v4 válido", () => {
    const clave = generarClaveIdempotencia();
    expect(clave).toBeDefined();
    expect(typeof clave).toBe("string");
    // Formato UUID: 8-4-4-4-12 caracteres hexadecimales
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(clave).toMatch(uuidRegex);
  });

  it("debe generar claves únicas en cada llamada", () => {
    const clave1 = generarClaveIdempotencia();
    const clave2 = generarClaveIdempotencia();
    expect(clave1).not.toBe(clave2);
  });
});
