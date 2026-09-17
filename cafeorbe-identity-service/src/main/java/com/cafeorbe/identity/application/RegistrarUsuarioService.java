package com.cafeorbe.identity.application;

import com.cafeorbe.contracts.events.identity.UsuarioRegistrado;
import com.cafeorbe.identity.application.port.in.RegistrarUsuarioCommand;
import com.cafeorbe.identity.application.port.in.RegistrarUsuarioUseCase;
import com.cafeorbe.identity.application.port.out.EventoPublisher;
import com.cafeorbe.identity.application.port.out.PasswordHasher;
import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.identity.domain.CorreoYaRegistradoException;
import com.cafeorbe.identity.domain.model.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
public class RegistrarUsuarioService implements RegistrarUsuarioUseCase {

    private final UsuarioRepository usuarioRepository;
    private final PasswordHasher passwordHasher;
    private final EventoPublisher eventoPublisher;

    public RegistrarUsuarioService(UsuarioRepository usuarioRepository, PasswordHasher passwordHasher, EventoPublisher eventoPublisher) {
        this.usuarioRepository = usuarioRepository;
        this.passwordHasher = passwordHasher;
        this.eventoPublisher = eventoPublisher;
    }

    @Override
    @Transactional
    public Usuario registrar(RegistrarUsuarioCommand comando) {
        if (usuarioRepository.existePorCorreo(comando.correo())) {
            throw new CorreoYaRegistradoException(comando.correo());
        }

        Usuario usuario = new Usuario(
                UUID.randomUUID(),
                comando.correo(),
                passwordHasher.hashear(comando.passwordPlano()),
                comando.nombreCompleto(),
                comando.residencia(),
                comando.celular(),
                comando.codigoPostal(),
                comando.rol(),
                Instant.now());

        Usuario guardado = usuarioRepository.guardar(usuario);

        eventoPublisher.publicar(new UsuarioRegistrado(
                guardado.getId(),
                guardado.getCorreo(),
                guardado.getNombreCompleto(),
                guardado.getRol().name(),
                guardado.getFechaRegistro()));

        return guardado;
    }
}
