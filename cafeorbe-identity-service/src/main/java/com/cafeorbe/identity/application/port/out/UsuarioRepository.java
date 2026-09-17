package com.cafeorbe.identity.application.port.out;

import com.cafeorbe.identity.domain.model.Usuario;

import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository {

    Usuario guardar(Usuario usuario);

    Optional<Usuario> buscarPorCorreo(String correo);

    Optional<Usuario> buscarPorId(UUID id);

    boolean existePorCorreo(String correo);
}
