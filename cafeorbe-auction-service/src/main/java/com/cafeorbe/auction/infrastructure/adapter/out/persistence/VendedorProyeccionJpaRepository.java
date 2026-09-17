package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface VendedorProyeccionJpaRepository extends JpaRepository<VendedorProyeccionEntity, UUID> {

    boolean existsByUsuarioIdAndRol(UUID usuarioId, String rol);
}
