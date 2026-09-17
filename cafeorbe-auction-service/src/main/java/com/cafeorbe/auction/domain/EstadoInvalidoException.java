package com.cafeorbe.auction.domain;

public class EstadoInvalidoException extends RuntimeException {

    public EstadoInvalidoException(String mensaje) {
        super(mensaje);
    }
}
