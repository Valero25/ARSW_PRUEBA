package com.cafeorbe.identity.infrastructure.adapter.in.rest;

import com.cafeorbe.identity.application.port.in.LoginUseCase;
import com.cafeorbe.identity.application.port.in.LogoutUseCase;
import com.cafeorbe.identity.application.port.in.RegistrarUsuarioCommand;
import com.cafeorbe.identity.application.port.in.RegistrarUsuarioUseCase;
import com.cafeorbe.identity.domain.model.Usuario;
import com.cafeorbe.identity.infrastructure.adapter.in.rest.dto.LoginRequest;
import com.cafeorbe.identity.infrastructure.adapter.in.rest.dto.LoginResponse;
import com.cafeorbe.identity.infrastructure.adapter.in.rest.dto.RegistroRequest;
import com.cafeorbe.identity.infrastructure.adapter.in.rest.dto.UsuarioResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final RegistrarUsuarioUseCase registrarUsuarioUseCase;
    private final LoginUseCase loginUseCase;
    private final LogoutUseCase logoutUseCase;

    public AuthController(RegistrarUsuarioUseCase registrarUsuarioUseCase, LoginUseCase loginUseCase, LogoutUseCase logoutUseCase) {
        this.registrarUsuarioUseCase = registrarUsuarioUseCase;
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse registro(@Valid @RequestBody RegistroRequest request) {
        Usuario usuario = registrarUsuarioUseCase.registrar(new RegistrarUsuarioCommand(
                request.correo(),
                request.password(),
                request.nombreCompleto(),
                request.residencia(),
                request.celular(),
                request.codigoPostal(),
                request.rol()));
        return UsuarioResponse.desde(usuario);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        LoginUseCase.LoginResultado resultado = loginUseCase.login(request.correo(), request.password());
        return new LoginResponse(resultado.token(), resultado.rol());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replaceFirst("(?i)^Bearer\\s+", "");
        logoutUseCase.logout(token);
        return ResponseEntity.noContent().build();
    }
}
