package com.cafeorbe.identity.application.port.out;

import com.cafeorbe.contracts.events.identity.RolAsignado;
import com.cafeorbe.contracts.events.identity.UsuarioRegistrado;

public interface EventoPublisher {

    void publicar(UsuarioRegistrado evento);

    void publicar(RolAsignado evento);
}
