package com.cafeorbe.realtimegateway.infrastructure.adapter.in.event;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Este servicio no publica al dominio (README: "consumidor puro"), así que
 * solo declara los exchanges de los servicios que sí publican, para poder
 * enlazar sus propias colas sin depender del orden de arranque entre
 * servicios.
 */
@Configuration
public class RabbitMqConfig {

    private static final String EXCHANGE_AUCTION = "cafeorbe.auction";
    private static final String EXCHANGE_STREAMING = "cafeorbe.streaming";

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange auctionExchange() {
        return new TopicExchange(EXCHANGE_AUCTION, true, false);
    }

    @Bean
    public TopicExchange streamingExchange() {
        return new TopicExchange(EXCHANGE_STREAMING, true, false);
    }

    @Bean
    public Queue pujaRegistradaQueue() {
        return new Queue("realtime-gateway.puja-registrada", true);
    }

    @Bean
    public Queue tiempoExtendidoQueue() {
        return new Queue("realtime-gateway.tiempo-extendido", true);
    }

    @Bean
    public Queue subastaCerradaQueue() {
        return new Queue("realtime-gateway.subasta-cerrada", true);
    }

    @Bean
    public Queue transmisionIniciadaQueue() {
        return new Queue("realtime-gateway.transmision-iniciada", true);
    }

    @Bean
    public Binding pujaRegistradaBinding(Queue pujaRegistradaQueue, TopicExchange auctionExchange) {
        return BindingBuilder.bind(pujaRegistradaQueue).to(auctionExchange).with("puja.registrada");
    }

    @Bean
    public Binding tiempoExtendidoBinding(Queue tiempoExtendidoQueue, TopicExchange auctionExchange) {
        return BindingBuilder.bind(tiempoExtendidoQueue).to(auctionExchange).with("tiempo.extendido");
    }

    @Bean
    public Binding subastaCerradaBinding(Queue subastaCerradaQueue, TopicExchange auctionExchange) {
        return BindingBuilder.bind(subastaCerradaQueue).to(auctionExchange).with("subasta.cerrada");
    }

    @Bean
    public Binding transmisionIniciadaBinding(Queue transmisionIniciadaQueue, TopicExchange streamingExchange) {
        return BindingBuilder.bind(transmisionIniciadaQueue).to(streamingExchange).with("transmision.iniciada");
    }
}
