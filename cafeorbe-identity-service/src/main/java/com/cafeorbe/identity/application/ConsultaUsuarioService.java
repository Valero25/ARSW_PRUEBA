package com.cafeorbe.identity.application;

import com.cafeorbe.identity.application.port.in.ObtenerRolUseCase;
import com.cafeorbe.identity.application.port.in.ObtenerUsuarioActualUseCase;
import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.identity.domain.model.Rol;
import com.cafeorbe.identity.domain.model.Usuario;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ConsultaUsuarioService implements ObtenerUsuarioActualUseCase, ObtenerRolUseCase {

    private final UsuarioRepository usuarioRepository;

    public ConsultaUsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario obtener(UUID usuarioId) {
        return usuarioRepository.buscarPorId(usuarioId)
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado: " + usuarioId));
    }

    @Override
    public Rol obtenerRolDe(UUID usuarioId) {
        return obtener(usuarioId).getRol();
    }
}
