package com.cafeorbe.auction.infrastructure.adapter.in.event;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    private static final String EXCHANGE_IDENTITY = "cafeorbe.identity";
    private static final String QUEUE_USUARIO_REGISTRADO = "auction-service.usuario-registrado";

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange identityExchange() {
        // Exchange declarado por identity-service; se redeclara aquí como
        // "durable" idéntico para poder enlazar la cola sin depender del
        // orden de arranque entre servicios.
        return new TopicExchange(EXCHANGE_IDENTITY, true, false);
    }

    @Bean
    public Queue usuarioRegistradoQueue() {
        return new Queue(QUEUE_USUARIO_REGISTRADO, true);
    }

    @Bean
    public Binding usuarioRegistradoBinding(Queue usuarioRegistradoQueue, TopicExchange identityExchange) {
        return BindingBuilder.bind(usuarioRegistradoQueue).to(identityExchange).with("usuario.registrado");
    }
}
