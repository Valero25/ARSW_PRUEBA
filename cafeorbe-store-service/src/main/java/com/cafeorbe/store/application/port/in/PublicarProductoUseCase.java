package com.cafeorbe.store.application.port.in;

import com.cafeorbe.store.domain.model.Producto;

public interface PublicarProductoUseCase {
    Producto publicar(PublicarProductoCommand command);
}
