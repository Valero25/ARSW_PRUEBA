package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "puja", uniqueConstraints = @UniqueConstraint(columnNames = {"subasta_id", "clave_idempotencia"}))
public class PujaEntity {

    @Id
    private UUID id;

    @Column(name = "subasta_id", nullable = false)
    private UUID subastaId;

    @Column(name = "pujador_id", nullable = false)
    private UUID pujadorId;

    @Column(nullable = false)
    private BigDecimal monto;

    @Column(name = "clave_idempotencia", nullable = false)
    private String claveIdempotencia;

    @Column(nullable = false)
    private Instant fecha;

    protected PujaEntity() {
        // JPA
    }

    public PujaEntity(UUID id, UUID subastaId, UUID pujadorId, BigDecimal monto, String claveIdempotencia, Instant fecha) {
        this.id = id;
        this.subastaId = subastaId;
        this.pujadorId = pujadorId;
        this.monto = monto;
        this.claveIdempotencia = claveIdempotencia;
        this.fecha = fecha;
    }
}
