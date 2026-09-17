package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import com.cafeorbe.auction.application.port.in.ConsultarEstadoSubastaUseCase.EstadoSubastaView;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * deadline y horaServidor viajan juntos a propósito: el front calcula el
 * desfase una sola vez y desde ahí cuenta hacia abajo localmente — nunca
 * vuelve a preguntar cuánto tiempo queda. Ver README de cafeorbe-web.
 */
public record EstadoSubastaResponse(
        UUID subastaId,
        String estado,
        BigDecimal montoActual,
        UUID liderId,
        Instant deadline,
        Instant horaServidor
) {
    public static EstadoSubastaResponse desde(EstadoSubastaView view) {
        return new EstadoSubastaResponse(
                view.subastaId(), view.estado(), view.montoActual(),
                view.liderId(), view.deadline(), view.horaServidor());
    }
}
