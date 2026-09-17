package com.cafeorbe.auction.application;

import com.cafeorbe.contracts.events.auction.SubastaIniciada;
import com.cafeorbe.auction.application.port.in.IniciarSubastaUseCase;
import com.cafeorbe.auction.application.port.out.EventoPublisher;
import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.EstadoInvalidoException;
import com.cafeorbe.auction.domain.SubastaNoEncontradaException;
import com.cafeorbe.auction.domain.model.Subasta;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Service
public class IniciarSubastaService implements IniciarSubastaUseCase {

    private final SubastaRepository subastaRepository;
    private final EventoPublisher eventoPublisher;
    private final Duration duracion;

    public IniciarSubastaService(SubastaRepository subastaRepository, EventoPublisher eventoPublisher,
                                  @Value("${subasta.duracion-minutos:10}") long duracionMinutos) {
        this.subastaRepository = subastaRepository;
        this.eventoPublisher = eventoPublisher;
        this.duracion = Duration.ofMinutes(duracionMinutos);
    }

    @Override
    @Transactional
    public void iniciar(UUID subastaId) {
        Subasta subasta = subastaRepository.buscarPorId(subastaId)
                .orElseThrow(() -> new SubastaNoEncontradaException(subastaId));

        if (!subasta.puedeIniciar()) {
            throw new EstadoInvalidoException("La subasta " + subastaId + " no está en estado PROGRAMADA");
        }

        Instant deadline = Instant.now().plus(duracion);
        subastaRepository.activar(subastaId, deadline);

        eventoPublisher.publicar(new SubastaIniciada(subastaId, deadline, Instant.now()));
    }
}
