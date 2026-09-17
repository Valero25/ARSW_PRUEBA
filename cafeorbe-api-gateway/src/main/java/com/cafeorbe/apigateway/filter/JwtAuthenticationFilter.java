package com.cafeorbe.apigateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Valida la firma del JWT una sola vez por request y propaga la identidad
 * resuelta a los servicios de dominio vía cabeceras. La emisión del token no
 * vive aquí — la hace cafeorbe-identity-service.
 */
@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private static final List<String> RUTAS_PUBLICAS = List.of("/auth/registro", "/auth/login");

    private final SecretKey clave;

    public JwtAuthenticationFilter(@Value("${jwt.secret}") String secreto) {
        this.clave = Keys.hmacShaKeyFor(secreto.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        if (RUTAS_PUBLICAS.stream().anyMatch(path::startsWith)) {
            return chain.filter(exchange);
        }

        String header = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return rechazar(exchange);
        }

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(clave)
                    .build()
                    .parseSignedClaims(header.substring(7))
                    .getPayload();

            ServerHttpRequest mutada = exchange.getRequest().mutate()
                    .header("X-Usuario-Id", claims.getSubject())
                    .header("X-Usuario-Rol", String.valueOf(claims.get("rol")))
                    .build();

            return chain.filter(exchange.mutate().request(mutada).build());
        } catch (JwtException e) {
            return rechazar(exchange);
        }
    }

    private Mono<Void> rechazar(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
