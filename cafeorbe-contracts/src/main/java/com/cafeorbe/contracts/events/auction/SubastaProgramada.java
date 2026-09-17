package com.cafeorbe.contracts.events.auction;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record SubastaProgramada(
        UUID subastaId,
        UUID loteId,
        UUID vendedorId,
        BigDecimal precioBase,
        Instant fechaProgramada,
        Instant fechaCreacion
) {
}
