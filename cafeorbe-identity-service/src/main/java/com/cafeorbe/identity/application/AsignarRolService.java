package com.cafeorbe.identity.application;

import com.cafeorbe.contracts.events.identity.RolAsignado;
import com.cafeorbe.identity.application.port.in.AsignarRolCommand;
import com.cafeorbe.identity.application.port.in.AsignarRolUseCase;
import com.cafeorbe.identity.application.port.out.EventoPublisher;
import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.identity.domain.UsuarioNoEncontradoException;
import com.cafeorbe.identity.domain.model.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class AsignarRolService implements AsignarRolUseCase {

    private final UsuarioRepository usuarioRepository;
    private final EventoPublisher eventoPublisher;

    public AsignarRolService(UsuarioRepository usuarioRepository, EventoPublisher eventoPublisher) {
        this.usuarioRepository = usuarioRepository;
        this.eventoPublisher = eventoPublisher;
    }

    @Override
    @Transactional
    public void asignarRol(AsignarRolCommand command) {
        Usuario usuario = usuarioRepository.buscarPorId(command.usuarioId())
                .orElseThrow(() -> new UsuarioNoEncontradoException("No se encontró el usuario con ID: " + command.usuarioId()));

        Usuario actualizado = usuario.cambiarRol(command.nuevoRol());
        usuarioRepository.guardar(actualizado);

        eventoPublisher.publicar(new RolAsignado(
                actualizado.getId(),
                actualizado.getRol().name(),
                Instant.now()
        ));
    }
}
