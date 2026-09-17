package com.cafeorbe.realtimegateway.infrastructure.adapter.in.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final SalaWebSocketHandler salaWebSocketHandler;

    public WebSocketConfig(SalaWebSocketHandler salaWebSocketHandler) {
        this.salaWebSocketHandler = salaWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(salaWebSocketHandler, "/salas/*")
                .setAllowedOriginPatterns("*");
    }
}
