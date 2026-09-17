package com.cafeorbe.identity.domain;

public class CorreoYaRegistradoException extends RuntimeException {

    public CorreoYaRegistradoException(String correo) {
        super("Ya existe un usuario registrado con el correo " + correo);
    }
}
