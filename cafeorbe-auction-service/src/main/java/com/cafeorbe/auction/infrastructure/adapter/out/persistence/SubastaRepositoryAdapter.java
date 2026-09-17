package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.model.EstadoSubasta;
import com.cafeorbe.auction.domain.model.Subasta;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
class SubastaRepositoryAdapter implements SubastaRepository {

    private final SubastaJpaRepository jpaRepository;

    SubastaRepositoryAdapter(SubastaJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    @Transactional
    public Subasta guardar(Subasta subasta) {
        SubastaEntity entity = new SubastaEntity(
                subasta.getId(), subasta.getLoteId(), subasta.getVendedorId(),
                subasta.getMontoActual(), subasta.getEstado().name());
        SubastaEntity guardada = jpaRepository.save(entity);
        return aDominio(guardada);
    }

    @Override
    public Optional<Subasta> buscarPorId(UUID id) {
        return jpaRepository.findById(id).map(this::aDominio);
    }

    @Override
    @Transactional
    public void activar(UUID subastaId, Instant deadline) {
        jpaRepository.activar(subastaId, deadline);
    }

    @Override
    @Transactional
    public void marcarCerrada(UUID subastaId) {
        jpaRepository.marcarCerrada(subastaId);
    }

    @Override
    public List<Subasta> listarActivasConDeadlineVencido(Instant ahora) {
        return jpaRepository.buscarActivasConDeadlineVencido(ahora).stream().map(this::aDominio).toList();
    }

    @Override
    @Transactional
    public boolean registrarPujaSiSupera(UUID subastaId, UUID pujadorId, BigDecimal monto) {
        return jpaRepository.registrarPujaSiSupera(subastaId, pujadorId, monto) > 0;
    }

    @Override
    @Transactional
    public void extenderDeadline(UUID subastaId, Instant nuevoDeadline) {
        jpaRepository.extenderDeadline(subastaId, nuevoDeadline);
    }

    private Subasta aDominio(SubastaEntity entity) {
        Subasta subasta = new Subasta(entity.getId(), entity.getLoteId(), entity.getVendedorId(), entity.getMontoActual());
        subasta.setDeadline(entity.getDeadline());
        subasta.setEstado(EstadoSubasta.valueOf(entity.getEstado()));
        return subasta;
    }
}
