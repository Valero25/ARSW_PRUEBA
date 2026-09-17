package com.cafeorbe.auction.domain;

import java.util.UUID;

public class VendedorNoValidoException extends RuntimeException {

    public VendedorNoValidoException(UUID vendedorId) {
        super("El usuario " + vendedorId + " no está registrado como vendedor");
    }
}
