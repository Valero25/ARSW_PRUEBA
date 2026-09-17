package com.cafeorbe.auction.infrastructure.adapter.in.event;

import com.cafeorbe.contracts.events.identity.UsuarioRegistrado;
import com.cafeorbe.auction.application.port.out.VendedorProyeccionWriter;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class UsuarioEventsListener {

    private final VendedorProyeccionWriter vendedorProyeccionWriter;

    public UsuarioEventsListener(VendedorProyeccionWriter vendedorProyeccionWriter) {
        this.vendedorProyeccionWriter = vendedorProyeccionWriter;
    }

    @RabbitListener(queues = "auction-service.usuario-registrado")
    public void onUsuarioRegistrado(UsuarioRegistrado evento) {
        vendedorProyeccionWriter.actualizar(evento.usuarioId(), evento.rol());
    }
}
