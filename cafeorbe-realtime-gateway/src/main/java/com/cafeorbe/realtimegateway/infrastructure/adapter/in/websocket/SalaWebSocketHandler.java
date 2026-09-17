package com.cafeorbe.realtimegateway.infrastructure.adapter.in.websocket;

import com.cafeorbe.realtimegateway.domain.service.SalaSessionRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.UUID;

/**
 * WS /salas/{subastaId}. La validación de la puja no vive aquí — la hace
 * cafeorbe-auction-service. Este handler solo transporta el resultado.
 */
@Component
public class SalaWebSocketHandler extends TextWebSocketHandler {

    private final SalaSessionRegistry registry;

    public SalaWebSocketHandler(SalaSessionRegistry registry) {
        this.registry = registry;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        UUID subastaId = extraerSubastaId(session);
        registry.registrar(subastaId, session);
        // TODO: pedir estado completo (deadline, líder, monto, conectados) a
        // auction-service y enviarlo como primer mensaje "estado_inicial".
        // Obligatorio en reconexión — README: "Estado completo al reconectar".
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        registry.remover(extraerSubastaId(session), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Este socket es de solo lectura hacia el cliente: las pujas entran
        // por REST a auction-service, no por este canal.
    }

    private UUID extraerSubastaId(WebSocketSession session) {
        String path = session.getUri().getPath();
        String id = path.substring(path.lastIndexOf('/') + 1);
        return UUID.fromString(id);
    }
}
