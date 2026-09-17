package com.cafeorbe.auction.application.port.in;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public interface ConsultarEstadoSubastaUseCase {

    EstadoSubastaView consultar(UUID subastaId);

    record EstadoSubastaView(
            UUID subastaId,
            String estado,
            BigDecimal montoActual,
            UUID liderId,
            Instant deadline,
            Instant horaServidor
    ) {
    }
}
