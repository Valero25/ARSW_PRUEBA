package com.cafeorbe.identity.application.port.out;

/**
 * El dominio pide "hashear" y "verificar" sin saber que detrás hay BCrypt.
 * README: "Contraseñas con hash y salt. Nunca reversible, nunca en logs".
 */
public interface PasswordHasher {

    String hashear(String passwordPlano);

    boolean verificar(String passwordPlano, String passwordHash);
}
