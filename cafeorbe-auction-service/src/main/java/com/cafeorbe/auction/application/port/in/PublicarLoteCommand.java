package com.cafeorbe.auction.application.port.in;

import java.util.UUID;

public record PublicarLoteCommand(
        UUID vendedorId,
        String nombre,
        String origen,
        String variedad,
        String procesoBeneficio,
        Integer puntajeCatacion
) {
}
