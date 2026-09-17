package com.cafeorbe.contracts.events.auction;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record SubastaIniciada(
        UUID subastaId,
        Instant deadline,
        Instant fechaInicio
) {
}
