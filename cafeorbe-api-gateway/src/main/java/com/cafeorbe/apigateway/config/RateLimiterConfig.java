package com.cafeorbe.apigateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

@Configuration
public class RateLimiterConfig {

    /**
     * Limita por usuario autenticado (propagado por JwtAuthenticationFilter),
     * no por IP: varios compradores legítimos pueden compartir salida NAT
     * durante una subasta concurrida.
     */
    @Bean
    public KeyResolver usuarioKeyResolver() {
        return exchange -> {
            String usuarioId = exchange.getRequest().getHeaders().getFirst("X-Usuario-Id");
            return Mono.just(usuarioId != null ? usuarioId : "anonimo");
        };
    }
}
