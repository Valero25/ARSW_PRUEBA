package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import com.cafeorbe.auction.domain.model.Lote;

import java.util.UUID;

public record LoteResponse(
        UUID id,
        UUID vendedorId,
        String nombre,
        String origen,
        String variedad,
        String procesoBeneficio,
        Integer puntajeCatacion
) {
    public static LoteResponse desde(Lote lote) {
        return new LoteResponse(
                lote.getId(), lote.getVendedorId(), lote.getNombre(), lote.getOrigen(),
                lote.getVariedad(), lote.getProcesoBeneficio(), lote.getPuntajeCatacion());
    }
}
