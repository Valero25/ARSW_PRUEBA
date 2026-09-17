package com.cafeorbe.auction.application.port.in;

public interface CerrarSubastasVencidasUseCase {

    /**
     * @return cuántas subastas se cerraron en esta pasada.
     */
    int cerrarVencidas();
}
