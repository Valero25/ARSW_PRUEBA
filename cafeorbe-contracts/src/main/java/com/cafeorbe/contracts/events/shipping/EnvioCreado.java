package com.cafeorbe.contracts.events.shipping;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record EnvioCreado(
        UUID envioId,
        UUID ordenOrigenId,
        UUID compradorId,
        BigDecimal costoEstimado,
        Instant fecha
) {
}
