package com.cafeorbe.identity.infrastructure.adapter.out.event;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    public static final String EXCHANGE_IDENTITY = "cafeorbe.identity";

    @Bean
    public TopicExchange identityExchange() {
        return new TopicExchange(EXCHANGE_IDENTITY, true, false);
    }

    /**
     * JSON, no serialización Java: los consumidores son otros servicios,
     * potencialmente en otro lenguaje en el futuro.
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
