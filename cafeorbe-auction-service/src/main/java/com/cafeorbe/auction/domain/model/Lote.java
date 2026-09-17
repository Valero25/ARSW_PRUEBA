package com.cafeorbe.auction.domain.model;

import java.util.UUID;

public class Lote {

    private final UUID id;
    private final UUID vendedorId;
    private final String nombre;
    private final String origen;
    private final String variedad;
    private final String procesoBeneficio;
    private final Integer puntajeCatacion;

    public Lote(UUID id, UUID vendedorId, String nombre, String origen,
                String variedad, String procesoBeneficio, Integer puntajeCatacion) {
        this.id = id;
        this.vendedorId = vendedorId;
        this.nombre = nombre;
        this.origen = origen;
        this.variedad = variedad;
        this.procesoBeneficio = procesoBeneficio;
        this.puntajeCatacion = puntajeCatacion;
    }

    public UUID getId() {
        return id;
    }

    public UUID getVendedorId() {
        return vendedorId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getOrigen() {
        return origen;
    }

    public String getVariedad() {
        return variedad;
    }

    public String getProcesoBeneficio() {
        return procesoBeneficio;
    }

    public Integer getPuntajeCatacion() {
        return puntajeCatacion;
    }
}
