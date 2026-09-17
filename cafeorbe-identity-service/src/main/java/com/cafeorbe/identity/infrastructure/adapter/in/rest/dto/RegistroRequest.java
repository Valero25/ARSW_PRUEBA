package com.cafeorbe.identity.infrastructure.adapter.in.rest.dto;

import com.cafeorbe.identity.domain.model.Rol;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
        @NotBlank @Email String correo,
        @NotBlank @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") String password,
        @NotBlank String nombreCompleto,
        @NotBlank String residencia,
        @NotBlank String celular,
        @NotBlank String codigoPostal,
        @NotNull Rol rol
) {
}
