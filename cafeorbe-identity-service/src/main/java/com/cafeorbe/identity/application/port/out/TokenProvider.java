package com.cafeorbe.identity.application.port.out;

import com.cafeorbe.identity.domain.model.Usuario;

import java.util.Optional;
import java.util.UUID;

public interface TokenProvider {

    String generar(Usuario usuario);

    /**
     * @return el id del usuario si el token es válido y no ha sido revocado.
     */
    Optional<UUID> validar(String token);

    void revocar(String token);
}
