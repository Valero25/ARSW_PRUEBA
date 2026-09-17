package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import com.cafeorbe.auction.application.port.out.LoteRepository;
import com.cafeorbe.auction.domain.model.Lote;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
class LoteRepositoryAdapter implements LoteRepository {

    private final LoteJpaRepository jpaRepository;

    LoteRepositoryAdapter(LoteJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Lote guardar(Lote lote) {
        LoteEntity entity = new LoteEntity(
                lote.getId(), lote.getVendedorId(), lote.getNombre(), lote.getOrigen(),
                lote.getVariedad(), lote.getProcesoBeneficio(), lote.getPuntajeCatacion());
        LoteEntity guardado = jpaRepository.save(entity);
        return aDominio(guardado);
    }

    @Override
    public Optional<Lote> buscarPorId(UUID id) {
        return jpaRepository.findById(id).map(this::aDominio);
    }

    private Lote aDominio(LoteEntity entity) {
        return new Lote(
                entity.getId(), entity.getVendedorId(), entity.getNombre(), entity.getOrigen(),
                entity.getVariedad(), entity.getProcesoBeneficio(), entity.getPuntajeCatacion());
    }
}
