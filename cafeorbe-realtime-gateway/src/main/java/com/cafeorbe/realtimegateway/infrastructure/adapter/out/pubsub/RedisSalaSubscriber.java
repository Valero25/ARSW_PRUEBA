package com.cafeorbe.realtimegateway.infrastructure.adapter.out.pubsub;

import com.cafeorbe.realtimegateway.domain.service.SalaSessionRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.UUID;

/**
 * Recibe lo que RedisSalaPublisher difundió y lo escribe en los sockets
 * locales de esta instancia. Backpressure: un cliente lento no debe bloquear
 * el fan-out del resto — ver README. Aquí se aísla el fallo por sesión; la
 * política de descarte fina (cola por sesión con backpressure real) queda
 * pendiente de implementar antes de producción.
 */
@Component
public class RedisSalaSubscriber implements MessageListener {

    private static final Logger log = LoggerFactory.getLogger(RedisSalaSubscriber.class);

    private final SalaSessionRegistry registry;

    public RedisSalaSubscriber(SalaSessionRegistry registry) {
        this.registry = registry;
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String canal = new String(message.getChannel());
        UUID subastaId = UUID.fromString(canal.substring("sala:".length()));
        TextMessage payload = new TextMessage(message.getBody());

        for (WebSocketSession session : registry.sesionesDe(subastaId)) {
            try {
                if (session.isOpen()) {
                    session.sendMessage(payload);
                }
            } catch (Exception e) {
                log.warn("No se pudo enviar a la sesión {} de la sala {}, se descarta", session.getId(), subastaId, e);
            }
        }
    }
}
