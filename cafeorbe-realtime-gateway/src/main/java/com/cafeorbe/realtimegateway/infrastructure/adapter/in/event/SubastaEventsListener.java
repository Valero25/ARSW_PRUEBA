package com.cafeorbe.realtimegateway.infrastructure.adapter.in.event;

import com.cafeorbe.contracts.events.auction.PujaRegistrada;
import com.cafeorbe.contracts.events.auction.SubastaCerrada;
import com.cafeorbe.contracts.events.auction.TiempoExtendido;
import com.cafeorbe.contracts.events.streaming.TransmisionIniciada;
import com.cafeorbe.realtimegateway.infrastructure.adapter.out.pubsub.RedisSalaPublisher;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * Consumidor puro del bus de eventos: traduce eventos de dominio a mensajes
 * de socket. No publica nada hacia el dominio — ver README.
 */
@Component
public class SubastaEventsListener {

    private final RedisSalaPublisher publisher;
    private final ObjectMapper objectMapper;

    public SubastaEventsListener(RedisSalaPublisher publisher, ObjectMapper objectMapper) {
        this.publisher = publisher;
        this.objectMapper = objectMapper;
    }

    @RabbitListener(queues = "${rabbitmq.queues.puja-registrada:realtime-gateway.puja-registrada}")
    public void onPujaRegistrada(PujaRegistrada evento) throws Exception {
        publicar(evento.subastaId(), "puja_registrada", evento);
    }

    @RabbitListener(queues = "${rabbitmq.queues.tiempo-extendido:realtime-gateway.tiempo-extendido}")
    public void onTiempoExtendido(TiempoExtendido evento) throws Exception {
        publicar(evento.subastaId(), "tiempo_extendido", evento);
    }

    @RabbitListener(queues = "${rabbitmq.queues.subasta-cerrada:realtime-gateway.subasta-cerrada}")
    public void onSubastaCerrada(SubastaCerrada evento) throws Exception {
        publicar(evento.subastaId(), "subasta_cerrada", evento);
    }

    @RabbitListener(queues = "${rabbitmq.queues.transmision-iniciada:realtime-gateway.transmision-iniciada}")
    public void onTransmisionIniciada(TransmisionIniciada evento) throws Exception {
        publicar(evento.subastaId(), "transmision_iniciada", evento);
    }

    private void publicar(java.util.UUID subastaId, String tipo, Object datos) throws Exception {
        String json = objectMapper.writeValueAsString(new MensajeSaliente(tipo, datos));
        publisher.publicar(subastaId, json);
    }
}
