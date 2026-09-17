package com.cafeorbe.auction.application.port.in;

import com.cafeorbe.auction.domain.model.Lote;

import java.util.UUID;

public interface ConsultarLoteUseCase {

    Lote obtener(UUID loteId);
}
