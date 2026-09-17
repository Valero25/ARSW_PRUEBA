package com.cafeorbe.identity.domain.model;

import java.time.Instant;
import java.util.UUID;

public class Usuario {

    private final UUID id;
    private final String correo;
    private final String passwordHash;
    private final String nombreCompleto;
    private final String residencia;
    private final String celular;
    private final String codigoPostal;
    private final Rol rol;
    private final Instant fechaRegistro;

    public Usuario(UUID id, String correo, String passwordHash, String nombreCompleto,
                   String residencia, String celular, String codigoPostal, Rol rol, Instant fechaRegistro) {
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

    public Rol getRol() {
        return rol;
    }

    public Instant getFechaRegistro() {
        return fechaRegistro;
    }

    public Usuario cambiarRol(Rol nuevoRol) {
        return new Usuario(id, correo, passwordHash, nombreCompleto, residencia, celular, codigoPostal, nuevoRol, fechaRegistro);
    }
}
