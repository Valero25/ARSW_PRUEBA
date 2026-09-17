package com.cafeorbe.auction.application;

import com.cafeorbe.auction.application.port.in.ConsultarEstadoSubastaUseCase;
import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.SubastaNoEncontradaException;
import com.cafeorbe.auction.domain.model.Subasta;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class ConsultarEstadoSubastaService implements ConsultarEstadoSubastaUseCase {

    private final SubastaRepository subastaRepository;

    public ConsultarEstadoSubastaService(SubastaRepository subastaRepository) {
        this.subastaRepository = subastaRepository;
    }

    @Override
    public EstadoSubastaView consultar(UUID subastaId) {
        Subasta subasta = subastaRepository.buscarPorId(subastaId)
                .orElseThrow(() -> new SubastaNoEncontradaException(subastaId));

        return new EstadoSubastaView(
                subasta.getId(),
                subasta.getEstado().name(),
                subasta.getMontoActual(),
                subasta.getLiderId(),
                subasta.getDeadline(),
                Instant.now());
    }
}
