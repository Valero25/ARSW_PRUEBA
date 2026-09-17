package com.cafeorbe.realtimegateway.infrastructure.adapter.in.event;

/**
 * Envoltorio de los mensajes salientes por WebSocket, documentados en el
 * README: puja_registrada, tiempo_extendido, conectados, subasta_cerrada,
 * estado_inicial.
 */
public record MensajeSaliente(String tipo, Object datos) {
}
