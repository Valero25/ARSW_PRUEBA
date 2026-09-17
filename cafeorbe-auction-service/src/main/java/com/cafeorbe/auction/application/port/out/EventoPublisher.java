package com.cafeorbe.auction.application.port.out;

import com.cafeorbe.contracts.events.auction.*;

public interface EventoPublisher {

    void publicar(SubastaProgramada evento);

    void publicar(SubastaIniciada evento);

    void publicar(PujaRegistrada evento);

    void publicar(TiempoExtendido evento);

    void publicar(SubastaCerrada evento);

    void publicar(GanadorDeclarado evento);
}
