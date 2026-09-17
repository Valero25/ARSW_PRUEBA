package com.cafeorbe.auction.application.port.out;

import java.util.UUID;

/**
 * Puerto de escritura de la proyección local de vendedores, alimentada por
 * el evento UsuarioRegistrado del bus. Separado de VendedorValidator
 * (lectura) porque los consumidores son distintos: el listener de eventos
 * escribe, los casos de uso de negocio solo leen.
 */
public interface VendedorProyeccionWriter {

    void actualizar(UUID usuarioId, String rol);
}
