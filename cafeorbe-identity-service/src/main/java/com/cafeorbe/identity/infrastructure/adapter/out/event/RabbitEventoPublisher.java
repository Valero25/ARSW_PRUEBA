package com.cafeorbe.identity.infrastructure.adapter.out.event;

import com.cafeorbe.contracts.events.identity.RolAsignado;
import com.cafeorbe.contracts.events.identity.UsuarioRegistrado;
import com.cafeorbe.identity.application.port.out.EventoPublisher;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
class RabbitEventoPublisher implements EventoPublisher {

    private final RabbitTemplate rabbitTemplate;

    RabbitEventoPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void publicar(UsuarioRegistrado evento) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE_IDENTITY, "usuario.registrado", evento);
    }

    @Override
    public void publicar(RolAsignado evento) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE_IDENTITY, "rol.asignado", evento);
    }
}
