package com.cafeorbe.auction.infrastructure.adapter.out.event;

import com.cafeorbe.contracts.events.auction.*;
import com.cafeorbe.auction.application.port.out.EventoPublisher;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
class RabbitEventoPublisher implements EventoPublisher {

    private final RabbitTemplate rabbitTemplate;

    RabbitEventoPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void publicar(SubastaProgramada evento) {
        enviar("subasta.programada", evento);
    }

    @Override
    public void publicar(SubastaIniciada evento) {
        enviar("subasta.iniciada", evento);
    }

    @Override
    public void publicar(PujaRegistrada evento) {
        enviar("puja.registrada", evento);
    }

    @Override
    public void publicar(TiempoExtendido evento) {
        enviar("tiempo.extendido", evento);
    }

    @Override
    public void publicar(SubastaCerrada evento) {
        enviar("subasta.cerrada", evento);
    }

    @Override
    public void publicar(GanadorDeclarado evento) {
        enviar("ganador.declarado", evento);
    }

    private void enviar(String routingKey, Object evento) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE_AUCTION, routingKey, evento);
    }
}
