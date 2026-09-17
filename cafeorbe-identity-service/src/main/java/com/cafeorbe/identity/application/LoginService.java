package com.cafeorbe.identity.application;

import com.cafeorbe.identity.application.port.in.LoginUseCase;
import com.cafeorbe.identity.application.port.out.PasswordHasher;
import com.cafeorbe.identity.application.port.out.TokenProvider;
import com.cafeorbe.identity.application.port.out.UsuarioRepository;
import com.cafeorbe.identity.domain.CredencialesInvalidasException;
import com.cafeorbe.identity.domain.model.Usuario;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements LoginUseCase {

    private final UsuarioRepository usuarioRepository;
    private final PasswordHasher passwordHasher;
    private final TokenProvider tokenProvider;

    public LoginService(UsuarioRepository usuarioRepository, PasswordHasher passwordHasher, TokenProvider tokenProvider) {
        this.usuarioRepository = usuarioRepository;
        this.passwordHasher = passwordHasher;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public LoginResultado login(String correo, String passwordPlano) {
        Usuario usuario = usuarioRepository.buscarPorCorreo(correo)
                .orElseThrow(CredencialesInvalidasException::new);

        if (!passwordHasher.verificar(passwordPlano, usuario.getPasswordHash())) {
            throw new CredencialesInvalidasException();
        }

        String token = tokenProvider.generar(usuario);
        return new LoginResultado(token, usuario.getRol().name());
    }
}
