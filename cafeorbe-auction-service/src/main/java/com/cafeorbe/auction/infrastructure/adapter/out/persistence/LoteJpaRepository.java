package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface LoteJpaRepository extends JpaRepository<LoteEntity, UUID> {
}
