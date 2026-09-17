package com.cafeorbe.auction.application.port.in;

import java.math.BigDecimal;
import java.util.UUID;

public record RegistrarPujaCommand(
        UUID subastaId,
        UUID pujadorId,
        BigDecimal monto,
        String claveIdempotencia
) {
}
