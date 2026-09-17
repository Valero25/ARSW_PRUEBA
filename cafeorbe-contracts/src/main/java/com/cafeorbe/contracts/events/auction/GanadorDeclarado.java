package com.cafeorbe.contracts.events.auction;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record GanadorDeclarado(
        UUID subastaId,
        UUID loteId,
        UUID ganadorId,
        UUID vendedorId,
        BigDecimal montoFinal,
        Instant fecha
) {
}
