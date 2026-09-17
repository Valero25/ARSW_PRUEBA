package com.cafeorbe.auction.domain.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * El deadline es una fecha absoluta del servidor, nunca un contador que se
 * envía al cliente. Ver README: "El temporizador es una fecha, no un contador".
 */
public class Subasta {

    private final UUID id;
    private final UUID loteId;
    private final UUID vendedorId;
    private BigDecimal montoActual;
    private UUID liderId;
    private Instant deadline;
    private EstadoSubasta estado;

    public Subasta(UUID id, UUID loteId, UUID vendedorId, BigDecimal precioBase) {
        this.id = id;
        this.loteId = loteId;
        this.vendedorId = vendedorId;
        this.montoActual = precioBase;
        this.estado = EstadoSubasta.PROGRAMADA;
    }

    public boolean estaEnVentanaAntiSniping(Instant ahora, java.time.Duration ventana) {
        return deadline != null && java.time.Duration.between(ahora, deadline).compareTo(ventana) <= 0;
    }

    public boolean puedeIniciar() {
        return estado == EstadoSubasta.PROGRAMADA;
    }

    public boolean puedeRecibirPujas() {
        return estado == EstadoSubasta.ACTIVA && deadline != null && Instant.now().isBefore(deadline);
    }

    public UUID getId() {
        return id;
    }

    public UUID getLoteId() {
        return loteId;
    }

    public UUID getVendedorId() {
        return vendedorId;
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

    public EstadoSubasta getEstado() {
        return estado;
    }

    public void setDeadline(Instant deadline) {
        this.deadline = deadline;
    }

    public void setEstado(EstadoSubasta estado) {
        this.estado = estado;
    }
}
