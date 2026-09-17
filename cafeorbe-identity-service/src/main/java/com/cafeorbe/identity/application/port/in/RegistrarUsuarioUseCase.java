package com.cafeorbe.identity.application.port.in;

import com.cafeorbe.identity.domain.model.Usuario;

public interface RegistrarUsuarioUseCase {

    Usuario registrar(RegistrarUsuarioCommand comando);
}
