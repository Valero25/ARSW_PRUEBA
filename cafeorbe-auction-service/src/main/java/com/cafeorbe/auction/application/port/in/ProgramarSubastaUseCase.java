package com.cafeorbe.auction.application.port.in;

import com.cafeorbe.auction.domain.model.Subasta;

import java.math.BigDecimal;
import java.util.UUID;

public interface ProgramarSubastaUseCase {

    Subasta programar(UUID loteId, BigDecimal precioBase);
}
