package com.cafeorbe.contracts.events.shipping;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record EnvioEntregado(
        UUID envioId,
        Instant fechaEntrega
) {
}
