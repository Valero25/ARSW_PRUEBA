package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import com.cafeorbe.auction.application.port.out.VendedorProyeccionWriter;
import com.cafeorbe.auction.application.port.out.VendedorValidator;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
class VendedorValidatorAdapter implements VendedorValidator, VendedorProyeccionWriter {

    private final VendedorProyeccionJpaRepository jpaRepository;

    VendedorValidatorAdapter(VendedorProyeccionJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public boolean esVendedorValido(UUID usuarioId) {
        return jpaRepository.existsByUsuarioIdAndRol(usuarioId, "VENDEDOR");
    }

    @Override
    public void actualizar(UUID usuarioId, String rol) {
        jpaRepository.save(new VendedorProyeccionEntity(usuarioId, rol));
    }
}
