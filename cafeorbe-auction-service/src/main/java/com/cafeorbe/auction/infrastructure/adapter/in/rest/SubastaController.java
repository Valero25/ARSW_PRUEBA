package com.cafeorbe.auction.infrastructure.adapter.in.rest;

import com.cafeorbe.auction.application.port.in.*;
import com.cafeorbe.auction.domain.model.Subasta;
import com.cafeorbe.auction.infrastructure.adapter.in.rest.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/subastas")
public class SubastaController {

    private final ProgramarSubastaUseCase programarSubastaUseCase;
    private final IniciarSubastaUseCase iniciarSubastaUseCase;
    private final RegistrarPujaUseCase registrarPujaUseCase;
    private final ConsultarEstadoSubastaUseCase consultarEstadoSubastaUseCase;

    public SubastaController(ProgramarSubastaUseCase programarSubastaUseCase, IniciarSubastaUseCase iniciarSubastaUseCase,
                              RegistrarPujaUseCase registrarPujaUseCase, ConsultarEstadoSubastaUseCase consultarEstadoSubastaUseCase) {
        this.programarSubastaUseCase = programarSubastaUseCase;
        this.iniciarSubastaUseCase = iniciarSubastaUseCase;
        this.registrarPujaUseCase = registrarPujaUseCase;
        this.consultarEstadoSubastaUseCase = consultarEstadoSubastaUseCase;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SubastaResponse programar(@Valid @RequestBody ProgramarSubastaRequest request) {
        Subasta subasta = programarSubastaUseCase.programar(request.loteId(), request.precioBase());
        return SubastaResponse.desde(subasta);
    }

    @PostMapping("/{id}/iniciar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void iniciar(@PathVariable UUID id) {
        iniciarSubastaUseCase.iniciar(id);
    }

    @PostMapping("/{id}/pujas")
    public PujaResponse pujar(@PathVariable UUID id, @RequestHeader("X-Usuario-Id") UUID pujadorId,
                               @Valid @RequestBody PujaRequest request) {
        RegistrarPujaUseCase.Resultado resultado = registrarPujaUseCase.registrar(
                new RegistrarPujaCommand(id, pujadorId, request.monto(), request.claveIdempotencia()));
        return PujaResponse.desde(resultado);
    }

    @GetMapping("/{id}/estado")
    public EstadoSubastaResponse estado(@PathVariable UUID id) {
        return EstadoSubastaResponse.desde(consultarEstadoSubastaUseCase.consultar(id));
    }
}
