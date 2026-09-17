package com.cafeorbe.auction.application;

import com.cafeorbe.auction.application.port.in.ConsultarLoteUseCase;
import com.cafeorbe.auction.application.port.in.PublicarLoteCommand;
import com.cafeorbe.auction.application.port.in.PublicarLoteUseCase;
import com.cafeorbe.auction.application.port.out.LoteRepository;
import com.cafeorbe.auction.application.port.out.VendedorValidator;
import com.cafeorbe.auction.domain.VendedorNoValidoException;
import com.cafeorbe.auction.domain.model.Lote;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class PublicarLoteService implements PublicarLoteUseCase, ConsultarLoteUseCase {

    private final LoteRepository loteRepository;
    private final VendedorValidator vendedorValidator;

    public PublicarLoteService(LoteRepository loteRepository, VendedorValidator vendedorValidator) {
        this.loteRepository = loteRepository;
        this.vendedorValidator = vendedorValidator;
    }

    @Override
    public Lote publicar(PublicarLoteCommand comando) {
        if (!vendedorValidator.esVendedorValido(comando.vendedorId())) {
            throw new VendedorNoValidoException(comando.vendedorId());
        }

        Lote lote = new Lote(
                UUID.randomUUID(),
                comando.vendedorId(),
                comando.nombre(),
                comando.origen(),
                comando.variedad(),
                comando.procesoBeneficio(),
                comando.puntajeCatacion());

        return loteRepository.guardar(lote);
    }

    @Override
    public Lote obtener(UUID loteId) {
        return loteRepository.buscarPorId(loteId)
                .orElseThrow(() -> new NoSuchElementException("Lote no encontrado: " + loteId));
    }
}
