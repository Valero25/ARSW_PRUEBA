package com.cafeorbe.realtimegateway.domain.service;

import com.cafeorbe.realtimegateway.infrastructure.adapter.in.event.MensajeSaliente;
import com.cafeorbe.realtimegateway.infrastructure.adapter.out.pubsub.RedisSalaPublisher;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * "El conteo de conectados va con freno": emitir un mensaje por cada cambio
 * satura el canal justo cuando más se necesita para las pujas. Se agrega y
 * emite cada pocos segundos en vez de en cada conexión/desconexión.
 *
 * Nota: conectadosLocal() solo cuenta los sockets de esta instancia. El
 * conteo agregado real entre instancias requiere sumar vía Redis
 * (INCR/DECR o similar) antes de llevar esto a producción con más de un
 * réplica del gateway.
 */
@Component
public class ConteoConectadosScheduler {

    private final SalaSessionRegistry registry;
    private final RedisSalaPublisher publisher;
    private final ObjectMapper objectMapper;

    public ConteoConectadosScheduler(SalaSessionRegistry registry, RedisSalaPublisher publisher, ObjectMapper objectMapper) {
        this.registry = registry;
        this.publisher = publisher;
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedRateString = "${cafeorbe.conteo-conectados.intervalo-ms:2500}")
    public void emitirConteos() {
        for (UUID subastaId : registry.salasActivas()) {
            int conectados = registry.conectadosLocal(subastaId);
            try {
                String json = objectMapper.writeValueAsString(new MensajeSaliente("conectados", conectados));
                publisher.publicar(subastaId, json);
            } catch (Exception ignored) {
                // Se reintenta en el siguiente ciclo; no bloquear el scheduler por una sala.
            }
        }
    }
}
