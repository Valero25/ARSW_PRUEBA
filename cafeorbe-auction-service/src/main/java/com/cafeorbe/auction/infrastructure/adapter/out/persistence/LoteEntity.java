package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "lote")
public class LoteEntity {

    @Id
    private UUID id;

    @Column(name = "vendedor_id", nullable = false)
    private UUID vendedorId;

    @Column(nullable = false)
    private String nombre;

    private String origen;
    private String variedad;

    @Column(name = "proceso_beneficio")
    private String procesoBeneficio;

    @Column(name = "puntaje_catacion")
    private Integer puntajeCatacion;

    protected LoteEntity() {
        // JPA
    }

    public LoteEntity(UUID id, UUID vendedorId, String nombre, String origen,
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
