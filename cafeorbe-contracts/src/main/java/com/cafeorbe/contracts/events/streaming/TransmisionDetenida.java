package com.cafeorbe.contracts.events.streaming;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record TransmisionDetenida(
        UUID transmisionId,
        UUID subastaId,
        Instant fechaFin
) {
}
