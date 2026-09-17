package com.cafeorbe.identity.application;

import com.cafeorbe.identity.application.port.in.RegistrarUsuarioCommand;
import com.cafeorbe.identity.application.port.out.EventoPublisher;
import com.cafeorbe.identity.application.port.out.PasswordHasher;
import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.contracts.events.identity.UsuarioRegistrado;
import com.cafeorbe.identity.domain.CorreoYaRegistradoException;
import com.cafeorbe.identity.domain.model.Rol;
import com.cafeorbe.identity.domain.model.Usuario;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RegistrarUsuarioServiceTest {

    @Mock
    UsuarioRepository usuarioRepository;
    @Mock
    PasswordHasher passwordHasher;
    @Mock
    EventoPublisher eventoPublisher;

    @InjectMocks
    RegistrarUsuarioService service;

    private static final RegistrarUsuarioCommand COMANDO = new RegistrarUsuarioCommand(
            "vendedor@cafeorbe.co", "clave-secreta", "Juan Pérez",
            "Manizales, Caldas", "3001234567", "170001", Rol.VENDEDOR);

    @Test
    void rechaza_correo_ya_registrado() {
        when(usuarioRepository.existePorCorreo(COMANDO.correo())).thenReturn(true);

        assertThatThrownBy(() -> service.registrar(COMANDO))
                .isInstanceOf(CorreoYaRegistradoException.class);

        verify(usuarioRepository, never()).guardar(any());
        verifyNoInteractions(eventoPublisher);
    }

    @Test
    void registra_hashea_la_password_y_publica_el_evento() {
        when(usuarioRepository.existePorCorreo(COMANDO.correo())).thenReturn(false);
        when(passwordHasher.hashear(COMANDO.passwordPlano())).thenReturn("hash-simulado");
        when(usuarioRepository.guardar(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

        Usuario resultado = service.registrar(COMANDO);

        assertThat(resultado.getPasswordHash()).isEqualTo("hash-simulado");
        assertThat(resultado.getRol()).isEqualTo(Rol.VENDEDOR);
        verify(eventoPublisher).publicar(argThat((UsuarioRegistrado evento) -> evento.correo().equals(COMANDO.correo())));
    }
}
