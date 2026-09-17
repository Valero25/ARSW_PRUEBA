package com.cafeorbe.identity.infrastructure.adapter.out.security;

import com.cafeorbe.identity.application.port.out.PasswordHasher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
class BCryptPasswordHasher implements PasswordHasher {

    private final PasswordEncoder passwordEncoder;

    BCryptPasswordHasher(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String hashear(String passwordPlano) {
        return passwordEncoder.encode(passwordPlano);
    }

    @Override
    public boolean verificar(String passwordPlano, String passwordHash) {
        return passwordEncoder.matches(passwordPlano, passwordHash);
    }
}
