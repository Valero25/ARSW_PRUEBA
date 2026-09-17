package com.cafeorbe.auction.application;

import com.cafeorbe.contracts.events.auction.GanadorDeclarado;
import com.cafeorbe.contracts.events.auction.SubastaCerrada;
import com.cafeorbe.auction.application.port.in.CerrarSubastasVencidasUseCase;
import com.cafeorbe.auction.application.port.out.EventoPublisher;
import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.model.Subasta;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class CerrarSubastasVencidasService implements CerrarSubastasVencidasUseCase {

    private final SubastaRepository subastaRepository;
    private final EventoPublisher eventoPublisher;

    public CerrarSubastasVencidasService(SubastaRepository subastaRepository, EventoPublisher eventoPublisher) {
        this.subastaRepository = subastaRepository;
        this.eventoPublisher = eventoPublisher;
    }

    @Override
    @Transactional
    public int cerrarVencidas() {
        List<Subasta> vencidas = subastaRepository.listarActivasConDeadlineVencido(Instant.now());

        for (Subasta subasta : vencidas) {
            subastaRepository.marcarCerrada(subasta.getId());
            eventoPublisher.publicar(new SubastaCerrada(subasta.getId(), Instant.now()));

            if (subasta.getLiderId() != null) {
                eventoPublisher.publicar(new GanadorDeclarado(
                        subasta.getId(),
                        subasta.getLoteId(),
                        subasta.getLiderId(),
                        subasta.getVendedorId(),
                        subasta.getMontoActual(),
                        Instant.now()));
            }
            // Sin líder: se cierra sin GanadorDeclarado. La liquidación
            // y la relisted del lote quedan fuera de alcance de este servicio.
        }

        return vencidas.size();
    }
}
