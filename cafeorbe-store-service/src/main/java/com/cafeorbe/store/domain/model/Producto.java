package com.cafeorbe.store.domain.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class Producto {
    private final UUID id;
    private final UUID vendedorId;
    private final String nombre;
    private final BigDecimal precio;
    private int stock;
    private final Instant fechaPublicacion;

    public Producto(UUID id, UUID vendedorId, String nombre, BigDecimal precio, int stock, Instant fechaPublicacion) {
        this.id = id;
        this.vendedorId = vendedorId;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.fechaPublicacion = fechaPublicacion;
    }

    public UUID getId() { return id; }
    public UUID getVendedorId() { return vendedorId; }
    public String getNombre() { return nombre; }
    public BigDecimal getPrecio() { return precio; }
    public int getStock() { return stock; }
    public Instant getFechaPublicacion() { return fechaPublicacion; }

    public void descontarStock(int cantidad) {
        if (cantidad <= 0) throw new IllegalArgumentException("Cantidad debe ser mayor a 0");
        if (this.stock < cantidad) throw new IllegalStateException("Stock insuficiente");
        this.stock -= cantidad;
    }
}
