package com.cafeorbe.identity.application.port.in;

public interface LoginUseCase {

    LoginResultado login(String correo, String passwordPlano);

    record LoginResultado(String token, String rol) {
    }
}
