package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/**
 * claveIdempotencia es obligatoria: un doble clic o un reintento de red no
 * debe registrar dos pujas. La genera el cliente, no el servidor.
 */
public record PujaRequest(
        @NotNull @DecimalMin(value = "0.01") BigDecimal monto,
        @NotBlank String claveIdempotencia
) {
}
