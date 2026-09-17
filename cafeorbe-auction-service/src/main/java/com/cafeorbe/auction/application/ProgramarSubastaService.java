package com.cafeorbe.auction.application;

import com.cafeorbe.contracts.events.auction.SubastaProgramada;
import com.cafeorbe.auction.application.port.in.ProgramarSubastaUseCase;
import com.cafeorbe.auction.application.port.out.EventoPublisher;
import com.cafeorbe.auction.application.port.out.LoteRepository;
import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.model.Lote;
import com.cafeorbe.auction.domain.model.Subasta;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ProgramarSubastaService implements ProgramarSubastaUseCase {

    private final LoteRepository loteRepository;
    private final SubastaRepository subastaRepository;
    private final EventoPublisher eventoPublisher;

    public ProgramarSubastaService(LoteRepository loteRepository, SubastaRepository subastaRepository, EventoPublisher eventoPublisher) {
        this.loteRepository = loteRepository;
        this.subastaRepository = subastaRepository;
        this.eventoPublisher = eventoPublisher;
    }

    @Override
    @Transactional
    public Subasta programar(UUID loteId, BigDecimal precioBase) {
        Lote lote = loteRepository.buscarPorId(loteId)
                .orElseThrow(() -> new NoSuchElementException("Lote no encontrado: " + loteId));

        Subasta subasta = new Subasta(UUID.randomUUID(), lote.getId(), lote.getVendedorId(), precioBase);
        Subasta guardada = subastaRepository.guardar(subasta);

        Instant ahora = Instant.now();
        eventoPublisher.publicar(new SubastaProgramada(
                guardada.getId(),
                guardada.getLoteId(),
                guardada.getVendedorId(),
                precioBase,
                ahora,
                ahora));

        return guardada;
    }
}
