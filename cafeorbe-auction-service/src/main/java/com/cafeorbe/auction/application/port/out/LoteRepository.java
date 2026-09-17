package com.cafeorbe.auction.application.port.out;

import com.cafeorbe.auction.domain.model.Lote;

import java.util.Optional;
import java.util.UUID;

public interface LoteRepository {

    Lote guardar(Lote lote);

    Optional<Lote> buscarPorId(UUID id);
}
