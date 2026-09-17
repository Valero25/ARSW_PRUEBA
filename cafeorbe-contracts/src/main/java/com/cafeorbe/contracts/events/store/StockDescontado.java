package com.cafeorbe.contracts.events.store;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record StockDescontado(
        UUID productoId,
        UUID ordenId,
        int cantidad,
        int stockRestante,
        Instant fecha
) {
}
