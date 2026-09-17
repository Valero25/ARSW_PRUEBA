package com.cafeorbe.identity.application.port.in;

import com.cafeorbe.identity.domain.model.Rol;

import java.util.UUID;

public interface ObtenerRolUseCase {

    Rol obtenerRolDe(UUID usuarioId);
}
