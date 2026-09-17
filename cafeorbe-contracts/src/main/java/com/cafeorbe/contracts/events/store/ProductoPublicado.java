package com.cafeorbe.contracts.events.store;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record ProductoPublicado(
        UUID productoId,
        UUID vendedorId,
        String nombre,
        BigDecimal precio,
        int stock,
        Instant fechaPublicacion
) {
}
