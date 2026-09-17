package com.cafeorbe.store.application.port.out;

import com.cafeorbe.store.domain.model.Orden;
import com.cafeorbe.store.domain.model.Producto;

import java.util.Optional;
import java.util.UUID;

public interface StoreRepository {
    Producto guardarProducto(Producto producto);
    Optional<Producto> buscarProductoPorId(UUID id);
    
    Orden guardarOrden(Orden orden);
}
