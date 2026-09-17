package com.cafeorbe.identity.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "usuario")
public class UsuarioEntity {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false)
    private String residencia;

    @Column(nullable = false)
    private String celular;

    @Column(name = "codigo_postal", nullable = false)
    private String codigoPostal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private com.cafeorbe.identity.domain.model.Rol rol;

    @Column(name = "fecha_registro", nullable = false)
    private Instant fechaRegistro;

    protected UsuarioEntity() {
        // JPA
    }

    public UsuarioEntity(UUID id, String correo, String passwordHash, String nombreCompleto,
                          String residencia, String celular, String codigoPostal,
                          com.cafeorbe.identity.domain.model.Rol rol, Instant fechaRegistro) {
        this.id = id;
        this.correo = correo;
        this.passwordHash = passwordHash;
        this.nombreCompleto = nombreCompleto;
        this.residencia = residencia;
        this.celular = celular;
        this.codigoPostal = codigoPostal;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
    }

    public UUID getId() {
        return id;
    }

    public String getCorreo() {
        return correo;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getResidencia() {
        return residencia;
    }

    public String getCelular() {
        return celular;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public com.cafeorbe.identity.domain.model.Rol getRol() {
        return rol;
    }

    public Instant getFechaRegistro() {
        return fechaRegistro;
    }
}
