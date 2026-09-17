package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import com.cafeorbe.auction.application.port.in.RegistrarPujaUseCase;

import java.math.BigDecimal;
import java.util.UUID;

public record PujaResponse(UUID subastaId, BigDecimal montoActual, UUID liderId, boolean tiempoExtendido) {

    public static PujaResponse desde(RegistrarPujaUseCase.Resultado resultado) {
        return new PujaResponse(resultado.subastaId(), resultado.montoActual(), resultado.liderId(), resultado.tiempoExtendido());
    }
}
