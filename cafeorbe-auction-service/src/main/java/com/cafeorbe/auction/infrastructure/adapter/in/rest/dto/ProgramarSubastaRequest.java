package com.cafeorbe.auction.infrastructure.adapter.in.rest.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record ProgramarSubastaRequest(
        @NotNull UUID loteId,
        @NotNull @DecimalMin(value = "0.01") BigDecimal precioBase
) {
}
