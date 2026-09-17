package com.cafeorbe.identity.application;

import com.cafeorbe.identity.application.port.in.LogoutUseCase;
import com.cafeorbe.identity.application.port.out.TokenProvider;
import org.springframework.stereotype.Service;

@Service
public class LogoutService implements LogoutUseCase {

    private final TokenProvider tokenProvider;

    public LogoutService(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void logout(String token) {
        tokenProvider.revocar(token);
    }
}
