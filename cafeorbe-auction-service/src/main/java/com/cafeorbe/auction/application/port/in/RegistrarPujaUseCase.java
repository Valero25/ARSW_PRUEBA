package com.cafeorbe.auction.application.port.in;

import java.math.BigDecimal;
import java.util.UUID;

public interface RegistrarPujaUseCase {

    Resultado registrar(RegistrarPujaCommand comando);

    record Resultado(UUID subastaId, BigDecimal montoActual, UUID liderId, boolean tiempoExtendido) {
    }
}
