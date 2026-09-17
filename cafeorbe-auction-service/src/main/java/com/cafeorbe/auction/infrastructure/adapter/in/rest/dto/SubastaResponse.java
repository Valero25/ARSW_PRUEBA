package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import com.cafeorbe.auction.domain.model.Subasta;

import java.math.BigDecimal;
import java.util.UUID;

public record SubastaResponse(
        UUID id,
        UUID loteId,
        UUID vendedorId,
        BigDecimal montoActual,
        String estado
) {
    public static SubastaResponse desde(Subasta subasta) {
        return new SubastaResponse(
                subasta.getId(), subasta.getLoteId(), subasta.getVendedorId(),
                subasta.getMontoActual(), subasta.getEstado().name());
    }
}
