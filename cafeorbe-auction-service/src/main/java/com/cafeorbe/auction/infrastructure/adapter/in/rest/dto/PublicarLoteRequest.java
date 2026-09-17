package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * vendedorId no viaja en el body: se toma de X-Usuario-Id, propagada por
 * api-gateway tras validar el JWT. Confiar en un vendedorId del body
 * permitiría a cualquiera publicar lotes a nombre de otro usuario.
 */
public record PublicarLoteRequest(
        @NotBlank String nombre,
        String origen,
        String variedad,
        String procesoBeneficio,
        Integer puntajeCatacion
) {
}
