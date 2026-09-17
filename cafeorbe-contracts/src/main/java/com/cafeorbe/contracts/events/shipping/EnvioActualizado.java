package com.cafeorbe.contracts.events.shipping;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record EnvioActualizado(
        UUID envioId,
        String estadoAnterior,
        String estadoNuevo,
        Instant fecha
) {
}
