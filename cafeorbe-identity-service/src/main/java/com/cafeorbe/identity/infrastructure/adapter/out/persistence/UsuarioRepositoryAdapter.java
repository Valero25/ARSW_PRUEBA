package com.cafeorbe.identity.infrastructure.adapter.out.persistence;

import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.identity.domain.model.Usuario;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
class UsuarioRepositoryAdapter implements UsuarioRepository {

    private final UsuarioJpaRepository jpaRepository;

    UsuarioRepositoryAdapter(UsuarioJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        UsuarioEntity entity = new UsuarioEntity(
                usuario.getId(),
                usuario.getCorreo(),
                usuario.getPasswordHash(),
                usuario.getNombreCompleto(),
                usuario.getResidencia(),
                usuario.getCelular(),
                usuario.getCodigoPostal(),
                usuario.getRol(),
                usuario.getFechaRegistro());
        UsuarioEntity guardado = jpaRepository.save(entity);
        return aDominio(guardado);
    }

    @Override
    public Optional<Usuario> buscarPorCorreo(String correo) {
        return jpaRepository.findByCorreo(correo).map(this::aDominio);
    }

    @Override
    public Optional<Usuario> buscarPorId(UUID id) {
        return jpaRepository.findById(id).map(this::aDominio);
    }

    @Override
    public boolean existePorCorreo(String correo) {
        return jpaRepository.existsByCorreo(correo);
    }

    private Usuario aDominio(UsuarioEntity entity) {
        return new Usuario(
                entity.getId(),
                entity.getCorreo(),
                entity.getPasswordHash(),
                entity.getNombreCompleto(),
                entity.getResidencia(),
                entity.getCelular(),
                entity.getCodigoPostal(),
                entity.getRol(),
                entity.getFechaRegistro());
    }
}
