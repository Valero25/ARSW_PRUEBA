package com.cafeorbe.identity.application.port.in;

import com.cafeorbe.identity.domain.model.Rol;

public record RegistrarUsuarioCommand(
        String correo,
        String passwordPlano,
        String nombreCompleto,
        String residencia,
        String celular,
        String codigoPostal,
        Rol rol
) {
}
