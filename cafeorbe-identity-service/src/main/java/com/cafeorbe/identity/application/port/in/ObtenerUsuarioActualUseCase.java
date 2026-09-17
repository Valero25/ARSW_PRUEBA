package com.cafeorbe.identity.application.port.in;

import com.cafeorbe.identity.domain.model.Usuario;

import java.util.UUID;

public interface ObtenerUsuarioActualUseCase {

    Usuario obtener(UUID usuarioId);
}
