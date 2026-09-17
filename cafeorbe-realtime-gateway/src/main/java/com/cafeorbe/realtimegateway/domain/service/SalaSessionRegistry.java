package com.cafeorbe.realtimegateway.domain.service;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * Estado en memoria de esta instancia: qué sockets están abiertos en qué
 * sala. Es efímero a propósito — README: "Cualquier persistencia de negocio
 * no vive aquí". El conteo real de conectados agrega esto entre instancias
 * vía Redis en ConteoConectadosScheduler.
 */
@Component
public class SalaSessionRegistry {

    private final ConcurrentHashMap<UUID, Set<WebSocketSession>> salas = new ConcurrentHashMap<>();

    public void registrar(UUID subastaId, WebSocketSession session) {
        salas.computeIfAbsent(subastaId, id -> new CopyOnWriteArraySet<>()).add(session);
    }

    public void remover(UUID subastaId, WebSocketSession session) {
        Set<WebSocketSession> sesiones = salas.get(subastaId);
        if (sesiones != null) {
            sesiones.remove(session);
            if (sesiones.isEmpty()) {
                salas.remove(subastaId);
            }
        }
    }

    public Set<WebSocketSession> sesionesDe(UUID subastaId) {
        return salas.getOrDefault(subastaId, Set.of());
    }

    public int conectadosLocal(UUID subastaId) {
        return sesionesDe(subastaId).size();
    }

    public Set<UUID> salasActivas() {
        return salas.keySet();
    }
}
