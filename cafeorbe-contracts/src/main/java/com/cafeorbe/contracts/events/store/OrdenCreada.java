package com.cafeorbe.contracts.events.store;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record OrdenCreada(
        UUID ordenId,
        UUID compradorId,
        UUID productoId,
        int cantidad,
        BigDecimal montoTotal,
        Instant fecha
) {
}
