package com.cafeorbe.contracts.events.auction;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record TiempoExtendido(
        UUID subastaId,
        Instant nuevoDeadline,
        int segundosExtendidos
) {
}
