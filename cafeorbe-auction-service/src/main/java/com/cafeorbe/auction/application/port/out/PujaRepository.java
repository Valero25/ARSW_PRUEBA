package com.cafeorbe.auction.application.port.out;

import com.cafeorbe.auction.domain.model.Puja;

public interface PujaRepository {

    /**
     * @return true si se guardó, false si la clave de idempotencia ya
     * existía para esta subasta (reintento de red o doble clic) — en ese
     * caso no se debe volver a registrar la puja ni republicar el evento.
     */
    boolean guardarSiEsNueva(Puja puja);
}
