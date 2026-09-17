package com.cafeorbe.auction.domain;

import java.math.BigDecimal;

public class PujaInsuficienteException extends RuntimeException {

    public PujaInsuficienteException(BigDecimal montoOfrecido, BigDecimal montoActual) {
        super("La puja de " + montoOfrecido + " no supera el monto actual de " + montoActual);
    }
}
