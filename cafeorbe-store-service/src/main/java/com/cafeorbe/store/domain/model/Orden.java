package com.cafeorbe.store.domain.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class Orden {
    private final UUID id;
    private final UUID compradorId;
    private final UUID productoId;
    private final int cantidad;
    private final BigDecimal montoTotal;
    private final Instant fecha;

    public Orden(UUID id, UUID compradorId, UUID productoId, int cantidad, BigDecimal montoTotal, Instant fecha) {
        this.id = id;
        this.compradorId = compradorId;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.montoTotal = montoTotal;
        this.fecha = fecha;
    }

    public UUID getId() { return id; }
    public UUID getCompradorId() { return compradorId; }
    public UUID getProductoId() { return productoId; }
    public int getCantidad() { return cantidad; }
    public BigDecimal getMontoTotal() { return montoTotal; }
    public Instant getFecha() { return fecha; }
}
