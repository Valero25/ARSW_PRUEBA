package com.cafeorbe.store.application.port.in;

import java.math.BigDecimal;
import java.util.UUID;

public record PublicarProductoCommand(
        UUID vendedorId,
        String nombre,
        BigDecimal precio,
        int stock
) {
}
