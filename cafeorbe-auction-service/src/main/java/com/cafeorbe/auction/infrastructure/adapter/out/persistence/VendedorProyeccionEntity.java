package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

/**
 * Proyección local, alimentada por el evento UsuarioRegistrado. auction-
 * service no llama síncronamente a identity-service para validar el rol
 * del vendedor — ver README, "Consume: UsuarioRegistrado".
 */
@Entity
@Table(name = "vendedor_proyeccion")
public class VendedorProyeccionEntity {

    @Id
    @Column(name = "usuario_id")
    private UUID usuarioId;

    @Column(nullable = false)
    private String rol;

    protected VendedorProyeccionEntity() {
        // JPA
    }

    public VendedorProyeccionEntity(UUID usuarioId, String rol) {
        this.usuarioId = usuarioId;
        this.rol = rol;
    }

    public UUID getUsuarioId() {
        return usuarioId;
    }

    public String getRol() {
        return rol;
    }
}
