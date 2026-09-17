package com.cafeorbe.auction.domain.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class Puja {

    private final UUID id;
    private final UUID subastaId;
    private final UUID pujadorId;
    private final BigDecimal monto;
    private final String claveIdempotencia;
    private final Instant fecha;

    public Puja(UUID id, UUID subastaId, UUID pujadorId, BigDecimal monto, String claveIdempotencia, Instant fecha) {
        this.id = id;
        this.subastaId = subastaId;
        this.pujadorId = pujadorId;
        this.monto = monto;
        this.claveIdempotencia = claveIdempotencia;
        this.fecha = fecha;
    }

    public UUID getId() {
        return id;
    }

    public UUID getSubastaId() {
        return subastaId;
    }

    public UUID getPujadorId() {
        return pujadorId;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public String getClaveIdempotencia() {
        return claveIdempotencia;
    }

    public Instant getFecha() {
        return fecha;
    }
}
