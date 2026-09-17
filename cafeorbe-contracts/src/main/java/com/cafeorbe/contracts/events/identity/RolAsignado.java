package com.cafeorbe.contracts.events.identity;

import java.time.Instant;
import java.util.UUID;

/**
 * v1.0.0
 */
public record RolAsignado(
        UUID usuarioId,
        String rol,
        Instant fechaAsignacion
) {
}
