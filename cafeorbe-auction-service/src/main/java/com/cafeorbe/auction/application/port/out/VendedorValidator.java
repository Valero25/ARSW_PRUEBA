package com.cafeorbe.auction.application.port.out;

import java.util.UUID;

/**
 * auction-service no llama síncronamente a identity-service para esto —
 * mantiene su propia proyección, alimentada por el evento UsuarioRegistrado
 * (ver README: "Consume: UsuarioRegistrado, para validar el rol del
 * vendedor"). Así el motor de subastas sigue funcionando aunque identity
 * esté caído en el momento de publicar un lote.
 */
public interface VendedorValidator {

    boolean esVendedorValido(UUID usuarioId);
}
