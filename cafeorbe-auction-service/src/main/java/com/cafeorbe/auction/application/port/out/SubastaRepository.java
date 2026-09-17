package com.cafeorbe.auction.application.port.out;

import com.cafeorbe.auction.domain.model.Subasta;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubastaRepository {

    Subasta guardar(Subasta subasta);

    Optional<Subasta> buscarPorId(UUID id);

    void activar(UUID subastaId, Instant deadline);

    void marcarCerrada(UUID subastaId);

    List<Subasta> listarActivasConDeadlineVencido(Instant ahora);

    /**
     * @return true si la puja prosperó (monto superaba al actual), false si
     * otra puja ya había tomado el liderato entre la lectura del cliente y
     * este intento de escritura. Regla no negociable: escritura condicional
     * atómica, nunca leer-comparar-escribir.
     */
    boolean registrarPujaSiSupera(UUID subastaId, UUID pujadorId, BigDecimal monto);

    /**
     * Extiende el deadline solo si la subasta sigue activa. Debe ejecutarse
     * en la misma transacción que registrarPujaSiSupera cuando la puja cae
     * dentro de la ventana anti-sniping.
     */
    void extenderDeadline(UUID subastaId, Instant nuevoDeadline);
}
