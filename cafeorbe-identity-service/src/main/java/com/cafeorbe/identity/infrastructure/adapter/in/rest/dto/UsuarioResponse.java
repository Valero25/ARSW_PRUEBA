package com.cafeorbe.identity.infrastructure.adapter.in.rest.dto;

import com.cafeorbe.identity.domain.model.Usuario;

import java.time.Instant;
import java.util.UUID;

public record UsuarioResponse(
        UUID id,
        String correo,
        String nombreCompleto,
        String rol,
        Instant fechaRegistro
) {
    public static UsuarioResponse desde(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getCorreo(),
                usuario.getNombreCompleto(),
                usuario.getRol().name(),
                usuario.getFechaRegistro());
    }
}
