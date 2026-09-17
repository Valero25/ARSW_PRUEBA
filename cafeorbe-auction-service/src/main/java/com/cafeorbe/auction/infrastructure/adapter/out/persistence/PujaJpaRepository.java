package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface PujaJpaRepository extends JpaRepository<PujaEntity, UUID> {

    boolean existsBySubastaIdAndClaveIdempotencia(UUID subastaId, String claveIdempotencia);
}
