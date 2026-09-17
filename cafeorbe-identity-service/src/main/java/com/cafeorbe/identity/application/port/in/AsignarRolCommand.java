package com.cafeorbe.identity.application.port.in;

import com.cafeorbe.identity.domain.model.Rol;
import java.util.UUID;

public record AsignarRolCommand(
        UUID usuarioId,
        Rol nuevoRol
) {
}
