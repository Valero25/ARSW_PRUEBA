package com.cafeorbe.auction.infrastructure.adapter.out.event;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * El bean MessageConverter (JSON) se declara una sola vez para todo el
 * módulo, en infrastructure.adapter.in.event.RabbitMqConfig — declararlo
 * también aquí produciría dos beans con el mismo nombre.
 */
@Configuration
public class RabbitMqConfig {

    public static final String EXCHANGE_AUCTION = "cafeorbe.auction";

    @Bean
    public TopicExchange auctionExchange() {
        return new TopicExchange(EXCHANGE_AUCTION, true, false);
    }
}
