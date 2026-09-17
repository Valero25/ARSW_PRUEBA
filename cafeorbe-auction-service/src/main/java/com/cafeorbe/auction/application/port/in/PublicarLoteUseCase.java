package com.cafeorbe.auction.application.port.in;

import com.cafeorbe.auction.domain.model.Lote;

public interface PublicarLoteUseCase {

    Lote publicar(PublicarLoteCommand comando);
}
