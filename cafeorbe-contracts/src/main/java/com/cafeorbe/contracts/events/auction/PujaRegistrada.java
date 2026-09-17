package com.cafeorbe.contracts.events.auction;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record PujaRegistrada(
        UUID subastaId,
        UUID pujaId,
        UUID pujadorId,
        BigDecimal monto,
        String claveIdempotencia,
        Instant fecha
) {
}
