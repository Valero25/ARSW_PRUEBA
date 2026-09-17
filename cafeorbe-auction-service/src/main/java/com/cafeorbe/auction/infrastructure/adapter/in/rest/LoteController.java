package com.cafeorbe.auction.infrastructure.adapter.in.rest;

import com.cafeorbe.auction.application.port.in.ConsultarLoteUseCase;
import com.cafeorbe.auction.application.port.in.PublicarLoteCommand;
import com.cafeorbe.auction.application.port.in.PublicarLoteUseCase;
import com.cafeorbe.auction.domain.model.Lote;
import com.cafeorbe.auction.infrastructure.adapter.in.rest.dto.LoteResponse;
import com.cafeorbe.auction.infrastructure.adapter.in.rest.dto.PublicarLoteRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/lotes")
public class LoteController {

    private final PublicarLoteUseCase publicarLoteUseCase;
    private final ConsultarLoteUseCase consultarLoteUseCase;

    public LoteController(PublicarLoteUseCase publicarLoteUseCase, ConsultarLoteUseCase consultarLoteUseCase) {
        this.publicarLoteUseCase = publicarLoteUseCase;
        this.consultarLoteUseCase = consultarLoteUseCase;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LoteResponse publicar(@RequestHeader("X-Usuario-Id") UUID vendedorId, @Valid @RequestBody PublicarLoteRequest request) {
        Lote lote = publicarLoteUseCase.publicar(new PublicarLoteCommand(
                vendedorId, request.nombre(), request.origen(),
                request.variedad(), request.procesoBeneficio(), request.puntajeCatacion()));
        return LoteResponse.desde(lote);
    }

    @GetMapping("/{id}")
    public LoteResponse obtener(@PathVariable UUID id) {
        return LoteResponse.desde(consultarLoteUseCase.obtener(id));
    }
}
