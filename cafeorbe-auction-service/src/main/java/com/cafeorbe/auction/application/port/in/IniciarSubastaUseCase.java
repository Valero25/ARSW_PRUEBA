package com.cafeorbe.auction.application.port.in;

import java.util.UUID;

public interface IniciarSubastaUseCase {

    void iniciar(UUID subastaId);
}
