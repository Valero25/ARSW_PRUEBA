package com.cafeorbe.contracts.events.streaming;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record TransmisionIniciada(
        UUID transmisionId,
        UUID subastaId,
        UUID vendedorId,
        Instant fechaInicio
) {
}
