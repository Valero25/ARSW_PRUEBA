package com.cafeorbe.identity.infrastructure.adapter.out.security;

import com.cafeorbe.identity.application.port.out.TokenProvider;
import com.cafeorbe.identity.domain.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * La revocación en memoria solo funciona con una sola réplica. Si el
 * servicio escala horizontalmente, esta lista debe moverse a un almacén
 * compartido (Redis) antes de ir a producción — queda como TODO explícito.
 */
@Component
class JwtTokenProvider implements TokenProvider {

    private final SecretKey clave;
    private final Duration expiracion;
    private final Set<String> tokensRevocados = ConcurrentHashMap.newKeySet();

    JwtTokenProvider(@Value("${jwt.secret}") String secreto,
                      @Value("${jwt.expiration-minutes}") long expiracionMinutos) {
        this.clave = Keys.hmacShaKeyFor(secreto.getBytes(StandardCharsets.UTF_8));
        this.expiracion = Duration.ofMinutes(expiracionMinutos);
    }

    @Override
    public String generar(Usuario usuario) {
        Instant ahora = Instant.now();
        return Jwts.builder()
                .subject(usuario.getId().toString())
                .claim("rol", usuario.getRol().name())
                .claim("correo", usuario.getCorreo())
                .issuedAt(Date.from(ahora))
                .expiration(Date.from(ahora.plus(expiracion)))
                .signWith(clave)
                .compact();
    }

    @Override
    public Optional<UUID> validar(String token) {
        if (tokensRevocados.contains(token)) {
            return Optional.empty();
        }
        try {
            Claims claims = Jwts.parser().verifyWith(clave).build().parseSignedClaims(token).getPayload();
            return Optional.of(UUID.fromString(claims.getSubject()));
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    @Override
    public void revocar(String token) {
        tokensRevocados.add(token);
    }
}
