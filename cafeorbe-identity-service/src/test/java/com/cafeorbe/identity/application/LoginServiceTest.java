package com.cafeorbe.identity.application;

import com.cafeorbe.identity.application.port.in.LoginUseCase;
import com.cafeorbe.identity.application.port.out.PasswordHasher;
import com.cafeorbe.identity.application.port.out.TokenProvider;
import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.identity.domain.CredencialesInvalidasException;
import com.cafeorbe.identity.domain.model.Rol;
import com.cafeorbe.identity.domain.model.Usuario;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginServiceTest {

    @Mock
    UsuarioRepository usuarioRepository;
    @Mock
    PasswordHasher passwordHasher;
    @Mock
    TokenProvider tokenProvider;

    @InjectMocks
    LoginService service;

    private final Usuario usuario = new Usuario(
            UUID.randomUUID(), "comprador@cafeorbe.co", "hash-almacenado",
            "Ana Ruiz", "Pereira, Risaralda", "3009876543", "660001", Rol.COMPRADOR, Instant.now());

    @Test
    void rechaza_correo_inexistente() {
        when(usuarioRepository.buscarPorCorreo("no-existe@cafeorbe.co")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.login("no-existe@cafeorbe.co", "cualquier-cosa"))
                .isInstanceOf(CredencialesInvalidasException.class);
    }

    @Test
    void rechaza_password_incorrecta() {
        when(usuarioRepository.buscarPorCorreo(usuario.getCorreo())).thenReturn(Optional.of(usuario));
        when(passwordHasher.verificar("clave-mala", usuario.getPasswordHash())).thenReturn(false);

        assertThatThrownBy(() -> service.login(usuario.getCorreo(), "clave-mala"))
                .isInstanceOf(CredencialesInvalidasException.class);
    }

    @Test
    void devuelve_token_y_rol_con_credenciales_validas() {
        when(usuarioRepository.buscarPorCorreo(usuario.getCorreo())).thenReturn(Optional.of(usuario));
        when(passwordHasher.verificar("clave-correcta", usuario.getPasswordHash())).thenReturn(true);
        when(tokenProvider.generar(usuario)).thenReturn("token-jwt-simulado");

        LoginUseCase.LoginResultado resultado = service.login(usuario.getCorreo(), "clave-correcta");

        assertThat(resultado.token()).isEqualTo("token-jwt-simulado");
        assertThat(resultado.rol()).isEqualTo("COMPRADOR");
    }
}
