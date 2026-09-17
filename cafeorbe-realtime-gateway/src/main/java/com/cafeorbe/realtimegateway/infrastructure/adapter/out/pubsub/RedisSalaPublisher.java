package com.cafeorbe.realtimegateway.infrastructure.adapter.out.pubsub;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Publica en el canal pub/sub de la sala. Cada instancia de este gateway
 * está suscrita a "sala:*"; así una puja que entra por la instancia 2 llega
 * también a los sockets abiertos en la instancia 1 y la 3.
 */
@Component
public class RedisSalaPublisher {

    private final StringRedisTemplate redisTemplate;

    public RedisSalaPublisher(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void publicar(UUID subastaId, String payloadJson) {
        redisTemplate.convertAndSend("sala:" + subastaId, payloadJson);
    }
}
