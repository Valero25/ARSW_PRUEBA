package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "subasta")
public class SubastaEntity {

    @Id
    private UUID id;

    @Column(name = "lote_id", nullable = false)
    private UUID loteId;

    @Column(name = "vendedor_id", nullable = false)
    private UUID vendedorId;

    @Column(name = "monto_actual", nullable = false)
    private BigDecimal montoActual;

    @Column(name = "lider_id")
    private UUID liderId;

    @Column(name = "deadline")
    private Instant deadline;

    @Column(name = "estado", nullable = false)
    private String estado;

    protected SubastaEntity() {
        // JPA
    }

    public SubastaEntity(UUID id, UUID loteId, UUID vendedorId, BigDecimal montoActual, String estado) {
        this.id = id;
        this.loteId = loteId;
        this.vendedorId = vendedorId;
        this.montoActual = montoActual;
        this.estado = estado;
    }

    public UUID getLoteId() {
        return loteId;
    }

    public UUID getVendedorId() {
        return vendedorId;
    }

    public UUID getId() {
        return id;
    }

    public BigDecimal getMontoActual() {
        return montoActual;
    }

    public UUID getLiderId() {
        return liderId;
    }

    public Instant getDeadline() {
        return deadline;
    }

    public String getEstado() {
        return estado;
    }
}
