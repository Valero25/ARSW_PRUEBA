package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import com.cafeorbe.auction.application.port.out.PujaRepository;
import com.cafeorbe.auction.domain.model.Puja;
import org.springframework.stereotype.Component;

@Component
class PujaRepositoryAdapter implements PujaRepository {

    private final PujaJpaRepository jpaRepository;

    PujaRepositoryAdapter(PujaJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    /**
     * Verificar-luego-insertar dentro de la misma transacción: la ventana
     * de carrera entre el SELECT y el INSERT queda cerrada por la
     * restricción UNIQUE de la tabla como red de seguridad — un choque
     * exacto en ese instante lanza una excepción de integridad hacia
     * arriba en vez de fallar en silencio, nunca duplica el efecto.
     */
    @Override
    public boolean guardarSiEsNueva(Puja puja) {
        if (jpaRepository.existsBySubastaIdAndClaveIdempotencia(puja.getSubastaId(), puja.getClaveIdempotencia())) {
            return false;
        }
        jpaRepository.save(new PujaEntity(
                puja.getId(), puja.getSubastaId(), puja.getPujadorId(),
                puja.getMonto(), puja.getClaveIdempotencia(), puja.getFecha()));
        return true;
    }
}
